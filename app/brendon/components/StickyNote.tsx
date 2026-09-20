"use client"

import type { RefObject, ReactNode, CSSProperties } from "react"
import { useEffect, useRef } from "react"
import { gsap, Draggable } from "@/lib/gsap-utils"

type StickyNoteProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  rotate?: number
  dragConstraints: RefObject<HTMLElement | null>
  zIndex?: number
  /** Gentle idle breathing loop, independent of drag/hover transforms. */
  pulse?: boolean
}

/**
 * A draggable "sticky note" — matches the reference template's hand-placed
 * canvas notes. Bounded to the section it lives in, bumps above its siblings
 * while dragged, and stays wherever it's dropped (design-tool "pin it" feel
 * rather than snapping back — confirmed from the reference recording, where
 * the dragged tag is still in its new spot after the drag ends).
 *
 * Rotation is tied to how far it's been dragged horizontally, on top of its
 * baked-in base tilt — in the reference recording, tags visibly tilt further
 * the more they're dragged rather than staying at a fixed angle.
 */
export function StickyNote({
  children,
  className = "",
  style,
  rotate = 0,
  dragConstraints,
  zIndex = 10,
  pulse = false,
}: StickyNoteProps) {
  const noteRef = useRef<HTMLDivElement>(null)
  const hoverRef = useRef<HTMLDivElement>(null)
  const pulseRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = noteRef.current
    const bounds = dragConstraints.current
    if (!el || !bounds) return

    gsap.set(el, { rotate })

    const [draggable] = Draggable.create(el, {
      type: "x,y",
      bounds,
      edgeResistance: 0.85,
      inertia: false,
      zIndexBoost: false,
      onPress() {
        gsap.to(el, { scale: 1.04, zIndex: 50, duration: 0.15 })
      },
      onDrag() {
        // Same mapping as the old useTransform(dragX, [-160, 160], [rotate-14, rotate+14]).
        const liveRotate = gsap.utils.clamp(rotate - 14, rotate + 14, gsap.utils.mapRange(-160, 160, rotate - 14, rotate + 14, this.x))
        gsap.set(el, { rotate: liveRotate })
      },
      onRelease() {
        gsap.to(el, { scale: 1, zIndex, duration: 0.2 })
      },
    })

    // Bounds computed once at drag-start time would go stale if the
    // container resizes without a drag happening in between — recompute
    // explicitly on resize so a tag dragged near an edge doesn't end up
    // clipped outside its (now differently sized) container.
    const onResize = () => draggable.applyBounds(bounds)
    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("resize", onResize)
      draggable.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!pulse || !pulseRef.current) return
    const tween = gsap.to(pulseRef.current, { scale: 1.06, duration: 1.2, repeat: -1, yoyo: true, ease: "sine.inOut" })
    return () => tween.kill()
  }, [pulse])

  return (
    <div ref={noteRef} style={{ ...style, zIndex }} className={`cursor-grab select-none touch-none ${className}`}>
      {/* Hover lift/shadow live on their own middle layer, separate from both
          the draggable outer element (Draggable owns its transform: x/y/
          rotate) and the pulse layer below (GSAP owns its scale loop) — a
          CSS transform hover sharing an element with either would silently
          lose to GSAP's inline style every time, since inline style always
          wins the cascade. */}
      <div ref={hoverRef} className="transition-shadow duration-200 hover:-translate-y-[3px] hover:shadow-[3px_5px_0_rgba(0,0,0,0.18)]">
        <div ref={pulseRef}>{children}</div>
      </div>
    </div>
  )
}
