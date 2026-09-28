"use client"

// Archive (spec §5.7) — filter pills + index rows, cursor-following preview.
import { useEffect, useRef, useState } from "react"
import { gsap, Flip, ScrollTrigger } from "@/lib/gsap-utils"
import { archiveItems, archiveFilters, type ArchiveTag } from "../lib/archiveItems"

const ICON_ARROW = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
)

const cld = (url: string, t = "f_auto,q_auto,w_640") =>
  url.includes("res.cloudinary.com") && !/\/upload\/(f_|c_|q_|w_)/.test(url) ? url.replace("/upload/", `/upload/${t}/`) : url

export function Archive() {
  const [filter, setFilter] = useState<(typeof archiveFilters)[number]>("All")
  const rowsRef = useRef<HTMLDivElement>(null)
  const peekRef = useRef<HTMLDivElement>(null)
  const peekImgRef = useRef<HTMLImageElement>(null)

  function handleFilter(f: (typeof archiveFilters)[number]) {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches
    const rowEls = Array.from(rowsRef.current?.querySelectorAll<HTMLElement>(".rowx") ?? [])
    if (reduced || !rowEls.length) {
      setFilter(f)
      return
    }
    const state = Flip.getState(rowEls)
    setFilter(f)
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.6,
        ease: "expo.out",
        absolute: true,
        nested: true,
        onEnter: (els: Element[]) => gsap.fromTo(els, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.03 }),
        onLeave: (els: Element[]) => gsap.to(els, { opacity: 0, duration: 0.2 }),
        onComplete: () => ScrollTrigger.refresh(),
      })
    })
  }

  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const peek = peekRef.current
    const rows = rowsRef.current
    if (!peek || !rows) return
    const qx = gsap.quickTo(peek, "x", { duration: 0.5, ease: "expo.out" })
    const qy = gsap.quickTo(peek, "y", { duration: 0.5, ease: "expo.out" })
    const qr = gsap.quickTo(peek, "rotate", { duration: 0.6, ease: "expo.out" })
    let lx = 0
    function onMove(e: PointerEvent) {
      qx(e.clientX + 24)
      qy(e.clientY - 110)
      qr(gsap.utils.clamp(-8, 8, (e.clientX - lx) * 0.6))
      lx = e.clientX
    }
    function onEnterRow(this: HTMLElement) {
      const src = this.dataset.img
      if (src && peekImgRef.current && peekImgRef.current.src !== src) peekImgRef.current.src = src
    }
    function onEnter() {
      gsap.to(peek!, { opacity: 1, scale: 1, duration: 0.4, ease: "expo.out" })
    }
    function onLeave() {
      gsap.to(peek!, { opacity: 0, scale: 0.6, duration: 0.3 })
    }
    rows.addEventListener("pointermove", onMove)
    rows.addEventListener("pointerenter", onEnter)
    rows.addEventListener("pointerleave", onLeave)
    const rowEls = Array.from(rows.querySelectorAll<HTMLElement>(".rowx"))
    rowEls.forEach((r) => r.addEventListener("pointerenter", onEnterRow))
    return () => {
      rows.removeEventListener("pointermove", onMove)
      rows.removeEventListener("pointerenter", onEnter)
      rows.removeEventListener("pointerleave", onLeave)
      rowEls.forEach((r) => r.removeEventListener("pointerenter", onEnterRow))
    }
  }, [filter])

  return (
    <section className="archive" id="archive" aria-labelledby="archive-h" data-ix-gap>
      <div className="wrap">
        <div className="sec-head">
          <h2 className="h2" id="archive-h">Archive</h2>
          <p className="lead">More brand and web work, 2019 to now. Each opens its full case study.</p>
        </div>
        <div className="filters" role="group" aria-label="Filter archive">
          {archiveFilters.map((f) => {
            const n = f === "All" ? archiveItems.length : archiveItems.filter((a) => a.tags.includes(f as ArchiveTag)).length
            return (
              <button key={f} aria-pressed={filter === f} onClick={() => handleFilter(f)}>
                {f}<span className="n">{n}</span>
              </button>
            )
          })}
        </div>
        <div className="rows" ref={rowsRef} data-ix="List / Archive row">
          {archiveItems.map((a) => {
            const visible = filter === "All" || a.tags.includes(filter as ArchiveTag)
            return (
              <a
                key={a.slug}
                className="rowx"
                href={a.href}
                target="_blank"
                rel="noopener"
                data-img={cld(a.image)}
                data-cursor="View case study"
                style={{ display: visible ? "" : "none" }}
              >
                <span className="thumb"><img src={cld(a.image, "f_auto,q_auto,w_160")} alt="" loading="lazy" /></span>
                <span className="t">{a.title}</span>
                <span className="d">{a.description}</span>
                <span className="y">{a.year}</span>
                {ICON_ARROW}
              </a>
            )
          })}
        </div>
      </div>
      <div className="peek" ref={peekRef} aria-hidden="true"><img ref={peekImgRef} alt="" /></div>
    </section>
  )
}
