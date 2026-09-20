"use client"

import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react"
import { projects } from "../lib/projects"
import { gsap, Draggable } from "@/lib/gsap-utils"

const ROTATE_DEG = -6
const ROTATE_RAD = (Math.abs(ROTATE_DEG) * Math.PI) / 180

// Idle autoplay speed, in pixels/second — slow and steady, more "ambient
// slideshow" than a ticker. At this pace a full loop through the group takes
// well over a minute, so it reads as gentle drift rather than a race.
const AUTOPLAY_PX_PER_SEC = 26

// Card size is fixed (roughly 4:3) but scales down on narrow viewports so
// at least 4-5 cards stay visible in the window instead of 1-2 huge ones.
const CARD_WIDTH = "clamp(5.5rem, 20vw, 17rem)"

const Tile = forwardRef<HTMLAnchorElement, { project: (typeof projects)[number]; focusable: boolean }>(
  function Tile({ project, focusable }, ref) {
    return (
      <a
        ref={ref}
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        draggable={false}
        aria-hidden={!focusable}
        tabIndex={focusable ? undefined : -1}
        style={{ width: CARD_WIDTH, aspectRatio: "272 / 212" }}
        className="relative block shrink-0 overflow-hidden rounded-lg md:rounded-xl shadow-lg shadow-black/10 transition-transform hover:scale-[1.02]"
      >
        <img
          src={project.image}
          alt={focusable ? project.title : ""}
          draggable={false}
          className="h-full w-full select-none object-cover pointer-events-none"
        />
      </a>
    )
  },
)

export function WorkShowcase() {
  const rowRef = useRef<HTMLDivElement>(null)
  const windowRef = useRef<HTMLDivElement>(null)
  const firstTileRef = useRef<HTMLAnchorElement>(null)
  const copyStartRef = useRef<(HTMLDivElement | null)[]>([])
  const groupWidthRef = useRef(0)
  // Keeps re-centering on every remeasure until the visitor actually grabs
  // the row — needed because the very first layout pass can happen before
  // images have settled, so that first groupWidth reading is too small and
  // centering against it once would land outside the real content once the
  // ResizeObserver fires again with the true width.
  const userDraggedRef = useRef(false)
  // A real drag needs to suppress the click that follows it (GSAP Draggable
  // still lets the browser fire one on release) — a tap that never moved
  // shouldn't be suppressed, so this only blocks navigation once the pointer
  // has actually traveled.
  const dragDistanceRef = useRef(false)

  // Three identical copies of the row sit side by side. groupWidth is the
  // distance from the start of one copy to the start of the next (card
  // widths + gaps), measured from real layout since card width is a
  // viewport-relative clamp() rather than a constant.
  const measure = () => {
    const a = copyStartRef.current[0]
    const b = copyStartRef.current[1]
    if (!a || !b) return
    const width = b.offsetLeft - a.offsetLeft
    if (width > 0) {
      groupWidthRef.current = width
      if (!userDraggedRef.current) {
        // Start on the middle (real, focusable) copy rather than the left
        // decorative one, so keyboard/first-paint focus lands somewhere real.
        gsap.set(rowRef.current, { x: -width })
      }
    }
  }

  useLayoutEffect(() => {
    measure()
    const el = rowRef.current
    if (!el) return
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener("resize", measure)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", measure)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Seamless infinite drag: a detached proxy element absorbs the raw,
  // unbounded drag/inertia distance (so GSAP's own momentum math has no
  // artificial bounds to fight), and every update wraps that distance back
  // into the middle copy's [-groupWidth, 0] range before painting it onto
  // the actual row — the standard GSAP pattern for a looping draggable strip.
  //
  // Idle autoplay drives the same proxy the same way — it's just another
  // source of "-=x" on proxy.x, paused the instant a real drag takes over
  // and resumed once the visitor lets go (immediately for a plain release,
  // or once any momentum throw finishes coasting).
  useEffect(() => {
    const row = rowRef.current
    const windowEl = windowRef.current
    if (!row) return
    const proxy = document.createElement("div")
    let startX = 0

    // `this` inside a plain tween's onUpdate is the tween itself, not the
    // target — Draggable instances are the ones that expose a real `.x`.
    // Reading the proxy's animated position back through gsap.getProperty
    // works for both cases (a plain tween OR a Draggable-moved element).
    function updateProgress() {
      const width = groupWidthRef.current || 1
      const x = gsap.getProperty(proxy, "x") as number
      gsap.set(row, { x: gsap.utils.wrap(-width, 0, x) })
    }

    const autoplay = gsap.to(proxy, {
      x: "-=100000",
      duration: 100000 / AUTOPLAY_PX_PER_SEC,
      ease: "none",
      repeat: -1,
      onUpdate: updateProgress,
    })

    const [draggable] = Draggable.create(proxy, {
      type: "x",
      trigger: row,
      inertia: true,
      allowNativeTouchScrolling: true,
      onPress() {
        startX = this.x
        autoplay.pause()
      },
      onDragStart() {
        userDraggedRef.current = true
        dragDistanceRef.current = false
      },
      onDrag() {
        if (Math.abs(this.x - startX) > 5) dragDistanceRef.current = true
        updateProgress()
      },
      onThrowUpdate: updateProgress,
      onDragEnd() {
        // No inertia tween picked up after release (a slow/short drag) —
        // resume right away instead of waiting for a throw that isn't coming.
        if (!this.tween) autoplay.restart()
      },
      onThrowComplete() {
        autoplay.restart()
      },
    })

    // Pausing on hover is a mouse-only nicety — hovering to look closer
    // shouldn't fight a strip still drifting underneath the pointer.
    const pause = () => autoplay.pause()
    const resume = () => {
      if (!draggable.isDragging && !draggable.isThrowing) autoplay.resume()
    }
    windowEl?.addEventListener("pointerenter", pause)
    windowEl?.addEventListener("pointerleave", resume)

    return () => {
      windowEl?.removeEventListener("pointerenter", pause)
      windowEl?.removeEventListener("pointerleave", resume)
      autoplay.kill()
      draggable.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClickCapture = (e: React.MouseEvent) => {
    // GSAP Draggable still lets a click through after a drag release — only
    // let it through when the pointer barely moved (a real tap, not a drag).
    if (dragDistanceRef.current) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  // The window's width and overhang are computed from the window's actual
  // rendered width, not the raw viewport (100vw). Those aren't the same
  // thing once the strip is capped at a max-width instead of running full
  // bleed: on a wide monitor 100vw is far bigger than the (centered,
  // capped) window, so a static vw-based overhang badly undersizes itself
  // there, letting a dragged card swing out near the window's edge — far
  // from the rotation's pivot — well past what a fixed-height cap can
  // contain. Measuring the real window width (and the card's real
  // rendered height) keeps the math correct at every monitor size.
  const [metrics, setMetrics] = useState({ width: 0, cardHeight: 0 })

  useLayoutEffect(() => {
    const updateMetrics = () => {
      const width = windowRef.current?.offsetWidth ?? 0
      const cardHeight = firstTileRef.current?.offsetHeight ?? 0
      if (width > 0 && cardHeight > 0) setMetrics({ width, cardHeight })
    }
    updateMetrics()
    const ro = new ResizeObserver(updateMetrics)
    if (windowRef.current) ro.observe(windowRef.current)
    if (firstTileRef.current) ro.observe(firstTileRef.current)
    window.addEventListener("resize", updateMetrics)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", updateMetrics)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const measured = metrics.width > 0 && metrics.cardHeight > 0
  // overhang = half the window's width swept through the rotation angle —
  // how far the rotated layer's top/bottom edges need to extend beyond the
  // window to keep covering it at that width.
  const overhangPx = measured ? (metrics.width / 2) * Math.sin(ROTATE_RAD) : 0
  // windowHeight = the card's own height once tilted, plus the vertical
  // span the rotation sweeps a full window-width across — the minimum
  // window height that keeps a card anywhere in the visible width from
  // being clipped.
  const windowHeightPx = measured
    ? metrics.cardHeight * Math.cos(ROTATE_RAD) + metrics.width * Math.sin(ROTATE_RAD)
    : 0

  return (
    <div
      ref={windowRef}
      className="relative mx-auto w-full max-w-[1600px] overflow-hidden"
      style={{
        // Falls back to a plain guess before the first real measurement
        // lands, so there's no zero-height flash on first paint.
        height: measured ? `${windowHeightPx}px` : "12rem",
        touchAction: "pan-y",
      }}
    >
      <div
        className="absolute"
        style={{
          top: measured ? `-${overhangPx}px` : "-3rem",
          bottom: measured ? `-${overhangPx}px` : "-3rem",
          left: "-10%",
          width: "120%",
          transform: `rotate(${ROTATE_DEG}deg)`,
        }}
      >
        <div
          ref={rowRef}
          onClickCapture={handleClickCapture}
          className="absolute left-0 top-1/2 flex -translate-y-1/2 cursor-grab gap-2 will-change-transform active:cursor-grabbing"
        >
          {[0, 1, 2].map((copy) => (
            <div
              key={copy}
              ref={(el) => {
                copyStartRef.current[copy] = el
              }}
              className="flex shrink-0 gap-2"
            >
              {projects.map((project, i) => (
                <Tile
                  key={`${copy}-${project.slug}`}
                  ref={copy === 0 && i === 0 ? firstTileRef : undefined}
                  project={project}
                  focusable={copy === 1}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
