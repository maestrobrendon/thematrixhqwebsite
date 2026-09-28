"use client"

// Hero (spec §5.1) — native replacement for the v1 iframe. One orchestrated
// load moment: dock drops, selection frame draws, the kinetic name rises and
// stretches open, then the statement/CTAs/photo/notes settle in.
import { useEffect, useRef, useState } from "react"
import { gsap, ScrollTrigger, SplitText, Draggable } from "@/lib/gsap-utils"
import { useKineticType } from "../lib/useKineticType"

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const nameSelRef = useRef<HTMLHeadingElement>(null)
  const sizeRef = useRef<HTMLSpanElement>(null)
  const [clock, setClock] = useState("--:--")
  const scrollSquashRef = useRef(0)
  const heroBaseRef = useRef(typeof window !== "undefined" && innerWidth < 600 ? 86 : 100)

  const { ref: nameRef, setActive } = useKineticType<HTMLSpanElement>({
    base: () => heroBaseRef.current - scrollSquashRef.current,
    gBase: 760,
    wAmp: 34,
    gAmp: 140,
  })

  // Lagos local clock (spec §5.1 status row)
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Lagos" })
    const tick = () => setClock(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 15000)
    return () => clearInterval(id)
  }, [])

  // Live W×H readout on the wordmark's selection frame
  useEffect(() => {
    const sel = nameSelRef.current
    const sizeEl = sizeRef.current
    if (!sel || !sizeEl) return
    const ro = new ResizeObserver(([e]) => {
      const b = e.borderBoxSize?.[0]
      sizeEl.textContent = `${Math.round(b ? b.inlineSize : e.contentRect.width)} × ${Math.round(b ? b.blockSize : e.contentRect.height)}`
    })
    ro.observe(sel)
    return () => ro.disconnect()
  }, [])

  // Scroll squash + kinetic pause off-screen
  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      onUpdate: (s: any) => (scrollSquashRef.current = s.progress * 44),
      onToggle: (s: any) => setActive(s.isActive || scrollY < innerHeight),
    })
    const onResize = () => (heroBaseRef.current = innerWidth < 600 ? 86 : 100)
    addEventListener("resize", onResize)
    return () => {
      st.kill()
      removeEventListener("resize", onResize)
    }
  }, [setActive])

  // Sticky notes: draggable + inertia, hero-bounded (pointer:fine only)
  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches) return
    const draggables = Draggable.create("[data-note]", {
      type: "x,y",
      bounds: heroRef.current,
      inertia: true,
      zIndexBoost: true,
      onPress() {
        gsap.to(this.target, { scale: 1.08, boxShadow: "4px 8px 0 rgba(0,0,0,.2),0 24px 40px rgba(0,0,0,.3)", duration: 0.25 })
      },
      onRelease() {
        gsap.to(this.target, { scale: 1, boxShadow: "2px 3px 0 rgba(0,0,0,.18),0 12px 24px rgba(0,0,0,.18)", duration: 0.4 })
      },
    })
    return () => draggables.forEach((d: any) => d.kill())
  }, [])

  // The one orchestrated load moment
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches
    let split: ReturnType<typeof SplitText.create> | undefined
    let tl: gsap.core.Timeline | undefined
    let cancelled = false
    const run = () => {
      if (cancelled) return
      const mob = innerWidth <= 860
      if (reduced) {
        gsap.set(".name-sel>.frame,.name-sel>.h,.name-label,.name-size", { opacity: 1 })
        return
      }
      split = SplitText.create(".statement", { type: "lines", mask: "lines", linesClass: "ln" })
      const chars = nameRef.current ? Array.from(nameRef.current.querySelectorAll(".ch")) : []
      tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.15 })
      tl.set(nameRef.current, { clipPath: "inset(-30% -12% 0% -12%)" })
        .from(".dock", { y: mob ? 24 : -24, opacity: 0, duration: 1 }, 0)
        .fromTo(".name-sel>.frame", { opacity: 1, scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 1, ease: "expo.inOut" }, 0.1)
        .from(chars, { yPercent: 115, duration: 1.2, stagger: 0.05 }, 0.35)
        .fromTo(chars, { "--w": 50 }, { "--w": heroBaseRef.current, duration: 1.4, stagger: 0.05, ease: "expo.inOut", immediateRender: false }, 0.35)
        .fromTo(".name-sel>.h", { opacity: 1, scale: 0 }, { scale: 1, duration: 0.5, stagger: 0.06, ease: "back.out(3)" }, 1.0)
        .to(".name-label,.name-size", { opacity: 1, duration: 0.4, stagger: 0.1 }, 1.15)
        .from(split.lines, { yPercent: 105, duration: 1, stagger: 0.08 }, 0.95)
        .from(".hero-cta .btn", { y: 18, opacity: 0, duration: 0.9, stagger: 0.08 }, 1.1)
        .from(".hero-photo", { y: 60, rotate: 16, opacity: 0, duration: 1.3 }, 0.7)
        .from("[data-note]", { scale: 0.4, opacity: 0, duration: 0.8, stagger: 0.12, ease: "back.out(2.2)" }, 1.35)
        .from(".hero-top > *", { opacity: 0, y: -8, duration: 0.8, stagger: 0.08 }, 0.9)
        .set(nameRef.current, { clipPath: "none" })
    }
    ;(document.fonts?.ready ?? Promise.resolve()).then(run)
    return () => {
      cancelled = true
      tl?.kill()
      split?.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <header className="hero" id="top" data-ix="Hero / Landing" ref={heroRef} data-kinetic-zone="">
      <div className="hero-guides" aria-hidden="true">
        <div className="wrap">
          {Array.from({ length: 12 }).map((_, i) => <i key={i} />)}
        </div>
      </div>

      <div className="wrap hero-top">
        <p className="status">
          <span className="dot" aria-hidden="true" />
          Open to senior brand &amp; product design roles
        </p>
        <p className="loc">
          Lagos, <span className="clock">{clock}</span> WAT, working remote worldwide
        </p>
      </div>

      <div className="wrap hero-body">
        <figure className="hero-photo" data-ix="Photo card / Polaroid">
          <img
            src="https://res.cloudinary.com/du5nhfcgd/image/upload/f_auto,q_auto,w_480/v1788116881/Cinematic_Discipline_in_the_Study_n3xoqo.png"
            alt="Brendon at his desk in Lagos"
            width={240}
            height={300}
            fetchPriority="high"
          />
          <figcaption>Lagos, 2026</figcaption>
        </figure>

        <div className="name-row">
          <h1 className="sel name-sel" id="nameSel" ref={nameSelRef}>
            <span className="frame" aria-hidden="true" />
            <span className="h" aria-hidden="true" />
            <span className="h" aria-hidden="true" />
            <span className="h" aria-hidden="true" />
            <span className="h" aria-hidden="true" />
            <span className="name-label" aria-hidden="true">Wordmark / Kinetic</span>
            <span className="name" ref={nameRef}>Brendon</span>
            <span className="sr-only"> Oleghe, senior brand and product designer</span>
            <span className="name-size" ref={sizeRef} aria-hidden="true">0 × 0</span>
          </h1>
        </div>

        <div className="hero-grid">
          <p className="statement">
            <b>I design with intent over decoration.</b>{" "}
            <span className="soft">Brand, product and motion as one system, then I build it and ship it.</span>
          </p>
          <div className="hero-cta">
            <a className="btn" href="#work" data-cursor="Scroll to work">
              <span className="roll"><span>See selected work</span><span>See selected work</span></span>
            </a>
            <a className="btn btn--ghost" href="https://www.maestrobrendon.com/BRENDON-OLEGHE-RESUME.pdf" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19h14" />
              </svg>
              <span className="roll">
                <span><span className="dl-word">Download </span>résumé</span>
                <span>PDF, 1 page</span>
              </span>
            </a>
          </div>
          <div className="note note--b" data-note aria-hidden="true">7+ years leading design</div>
        </div>
      </div>

      <div className="note note--a" data-note aria-hidden="true">80+ brands built</div>
      <a className="scroll-cue" href="#about" aria-label="Scroll to about">Scroll<i /></a>
    </header>
  )
}
