"use client"

// Selected work: CaseStack (pinned deck) + CaseSheet (overlay) — spec §5.3/§5.4.
import { useEffect, useRef, useState } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap-utils"
import { cases } from "../lib/cases"
import { goTo, lockScroll } from "../lib/scroll"
import { registerChromeHandler, unregisterChromeHandler } from "../lib/chrome"
import { useBrendonHref } from "../lib/useBrendonHref"

const HANDLES = (
  <>
    <span className="frame" aria-hidden="true" />
    <span className="h" aria-hidden="true" />
    <span className="h" aria-hidden="true" />
    <span className="h" aria-hidden="true" />
    <span className="h" aria-hidden="true" />
  </>
)

export function CaseStack() {
  const stageRef = useRef<HTMLDivElement>(null)
  const deckRef = useRef<HTMLDivElement>(null)
  const [activeCase, setActiveCase] = useState(0)
  const [noPin, setNoPin] = useState(false)
  const caseSTRef = useRef<ScrollTrigger | null>(null)
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([])
  const barRefs = useRef<(HTMLSpanElement | null)[]>([])

  const [sheetOpen, setSheetOpen] = useState(false)
  const [sheetIdx, setSheetIdx] = useState(0)
  const sheetPanelRef = useRef<HTMLDivElement>(null)
  const sheetHeroImgRef = useRef<HTMLImageElement>(null)
  const sheetCloseRef = useRef<HTMLButtonElement>(null)
  const riseRefs = useRef<HTMLElement[]>([])
  const sheetReturnFocus = useRef<HTMLElement | null>(null)
  const sheetOpenRef = useRef(false)

  useEffect(() => {
    sheetOpenRef.current = sheetOpen
  }, [sheetOpen])

  // Pinned deck (desktop, motion-enabled only)
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      setNoPin(true)
      return
    }
    const mm = gsap.matchMedia()
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const cards = cardRefs.current.filter(Boolean) as HTMLButtonElement[]
      const n = cards.length
      if (!n) return
      gsap.set(cards.slice(1), { yPercent: 115, rotate: 3 })
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top top",
          end: () => "+=" + (n - 1) * innerHeight * 0.9,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          snap: { snapTo: 1 / (n - 1), duration: { min: 0.25, max: 0.7 }, ease: "power2.inOut", delay: 0.05 },
          onUpdate(s: any) {
            const p = s.progress * (n - 1)
            setActiveCase(Math.round(p))
            barRefs.current.forEach((b, i) => b && gsap.set(b, { scaleX: gsap.utils.clamp(0, 1, p + 1 - i) }))
          },
        },
      })
      cards.forEach((c, i) => {
        if (!i) return
        tl.to(c, { yPercent: 0, rotate: 0, duration: 1 }, i - 1)
          .to(cards[i - 1], { scale: 0.9, yPercent: -3, duration: 1 }, i - 1)
          .to(cards[i - 1].querySelector(".shade"), { opacity: 0.6, duration: 1 }, i - 1)
      })
      caseSTRef.current = tl.scrollTrigger ?? null
      return () => {
        caseSTRef.current = null
      }
    })
    return () => mm.revert()
  }, [])

  function jumpTo(i: number) {
    const st = caseSTRef.current
    if (!st) {
      setActiveCase(i)
      return
    }
    goTo(st.start + (st.end - st.start) * (i / (cases.length - 1)) + 2)
  }

  // ── Case sheet ────────────────────────────────────────────────────────
  function openSheet(i: number, fromEl?: Element | null) {
    sheetReturnFocus.current = document.activeElement as HTMLElement
    setSheetIdx(i)
    setSheetOpen(true)
    lockScroll(true)
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches
    requestAnimationFrame(() => {
      const heroImg = sheetHeroImgRef.current
      const rise = riseRefs.current
      const panel = sheetPanelRef.current
      if (!heroImg || !panel) return
      if (reduced) {
        gsap.set([panel, sheetCloseRef.current, rise], { opacity: 1, backgroundColor: "var(--bone)" })
        gsap.set(".sheet-scrim", { opacity: 1 })
        sheetCloseRef.current?.focus()
        return
      }
      const src = fromEl?.querySelector("img")
      const r = src?.getBoundingClientRect()
      const tl = gsap.timeline({ defaults: { ease: "expo.inOut" }, onComplete: () => sheetCloseRef.current?.focus() })
      gsap.set(panel, { backgroundColor: "rgba(233,234,227,0)", opacity: 1, y: 0 })
      gsap.set(heroImg, { opacity: 0 })
      gsap.set(rise, { opacity: 0, y: 30 })
      tl.to(".sheet-scrim", { opacity: 1, duration: 0.5 }, 0).to(panel, { backgroundColor: "rgba(233,234,227,1)", duration: 0.5 }, 0.35)
      if (r && r.width) {
        const heroBox = document.querySelector(".sheet-hero")?.getBoundingClientRect()
        if (heroBox) {
          const ghost = heroImg.cloneNode() as HTMLImageElement
          Object.assign(ghost.style, {
            position: "fixed",
            zIndex: "81",
            objectFit: "cover",
            left: r.left + "px",
            top: r.top + "px",
            width: r.width + "px",
            height: r.height + "px",
            borderRadius: "20px",
            opacity: "1",
          })
          document.body.appendChild(ghost)
          tl.to(ghost, { left: 0, top: 0, width: heroBox.width, height: heroBox.height, borderRadius: 0, duration: 0.9 }, 0).add(() => {
            gsap.set(heroImg, { opacity: 1 })
            ghost.remove()
          })
        }
      } else {
        tl.to(heroImg, { opacity: 1, duration: 0.5 }, 0)
      }
      tl.to(rise, { opacity: 1, y: 0, duration: 0.9, stagger: 0.06, ease: "expo.out" }, 0.6).to(sheetCloseRef.current, { opacity: 1, duration: 0.4 }, 0.7)
    })
  }

  function closeSheet() {
    if (!sheetOpenRef.current) return
    const panel = sheetPanelRef.current
    if (!panel) {
      setSheetOpen(false)
      lockScroll(false)
      return
    }
    gsap
      .timeline({
        onComplete() {
          setSheetOpen(false)
          lockScroll(false)
          sheetReturnFocus.current?.focus?.()
        },
      })
      .to(sheetCloseRef.current, { opacity: 0, duration: 0.2 }, 0)
      .to(panel, { y: 40, opacity: 0, duration: 0.45, ease: "expo.in" }, 0)
      .to(".sheet-scrim", { opacity: 0, duration: 0.4 }, 0.15)
  }

  useEffect(() => {
    registerChromeHandler("openSheet", openSheet)
    registerChromeHandler("closeSheet", closeSheet)
    registerChromeHandler("isSheetOpen", () => sheetOpenRef.current)
    return () => {
      unregisterChromeHandler("openSheet")
      unregisterChromeHandler("closeSheet")
      unregisterChromeHandler("isSheetOpen")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      if (e.key === "Escape" && sheetOpenRef.current) closeSheet()
    }
    document.addEventListener("keydown", onKeydown)
    return () => document.removeEventListener("keydown", onKeydown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const c = cases[activeCase]
  const sheetCase = cases[sheetIdx]
  const nextIdx = (sheetIdx + 1) % cases.length
  const sheetWorkHref = useBrendonHref(`/work/${sheetCase.slug}`)

  return (
    <section className={`work${noPin ? " no-pin" : ""}`} id="work" aria-labelledby="work-h" data-ix-gap>
      <div className="wrap">
        <div className="sec-head">
          <h2 className="h2" id="work-h">Selected work</h2>
          <p className="lead">Four projects, framed the way I&apos;d walk you through them in an interview: the problem, my role, what shipped.</p>
        </div>
      </div>
      <div className="wrap">
        <div className="stage" id="stage" ref={stageRef}>
          <div className="case-index">
            <ol className="case-list">
              {cases.map((cs, i) => (
                <li key={cs.slug}>
                  <button className={i === activeCase ? "on" : ""} onClick={() => jumpTo(i)}>
                    <span className="t">{cs.title}</span>
                    <span className="y">{cs.year}</span>
                    <span className="bar" ref={(el) => { barRefs.current[i] = el }} />
                  </button>
                </li>
              ))}
            </ol>
            <div className="case-detail" aria-live="polite">
              <div className="meta">
                <span className="chip">{c.industry}</span>
                {c.disciplines.map((d) => <span className="chip" key={d}>{d}</span>)}
              </div>
              <p className="sum">{c.summary}</p>
              {c.stats.length ? (
                <div className="outcome">
                  {c.stats.map((s) => (
                    <div key={s.label}><b>{s.value}</b><span>{s.label}</span></div>
                  ))}
                </div>
              ) : (
                <p className="muted" style={{ marginTop: 14, fontSize: "var(--fs-sm)", maxWidth: "36ch" }}>{c.role}</p>
              )}
              <button className="btn btn--dark" onClick={() => openSheet(activeCase, cardRefs.current[activeCase])}>
                <span className="roll"><span>Open case study</span><span>Problem, role, outcome</span></span>
              </button>
            </div>
          </div>
          <div className="deck" ref={deckRef} data-ix="Card / Case study">
            {cases.map((cs, i) => (
              <button
                key={cs.slug}
                className="card sel"
                ref={(el) => { cardRefs.current[i] = el }}
                data-cursor="Open case study"
                aria-label={`Open ${cs.title} case study`}
                style={{ zIndex: i + 1 }}
                onClick={() => openSheet(i, cardRefs.current[i])}
              >
                {HANDLES}
                <img src={cs.image} alt={`${cs.title}, ${cs.disciplines.join(" and ").toLowerCase()}`} loading={i ? "lazy" : undefined} decoding="async" />
                <span className="tag">{cs.disciplines.map((d) => <span className="chip" key={d}>{d}</span>)}</span>
                <span className="shade" />
              </button>
            ))}
          </div>
        </div>

        <div className="case-mobile" id="caseMobile">
          {cases.map((cs, i) => (
            <button key={cs.slug} className="cm-card" aria-label={`Open ${cs.title} case study`} onClick={() => openSheet(i, null)}>
              <span className="img"><img src={cs.image.replace("w_1600", "w_900")} alt="" loading="lazy" decoding="async" /></span>
              <span className="row">
                <span className="h3">{cs.title}</span>
                <span className="muted" style={{ fontSize: "var(--fs-xs)" }}>{cs.industry}, {cs.year}</span>
              </span>
              <p>{cs.summary}</p>
              <span className="chips">{cs.disciplines.map((d) => <span className="chip" key={d}>{d}</span>)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ▸ CaseSheet overlay */}
      <div className={`sheet${sheetOpen ? " open" : ""}`} role="dialog" aria-modal="true" aria-labelledby="sheetTitle">
        <div className="sheet-scrim" onClick={closeSheet} />
        <div className="sheet-panel" ref={sheetPanelRef} data-lenis-prevent>
          <div className="sheet-hero">
            <img ref={sheetHeroImgRef} src={sheetCase.image} alt="" />
          </div>
          <div className="wrap sheet-body">
            <div className="sheet-title" ref={(el) => { if (el) riseRefs.current[0] = el }} data-rise>
              <h2 className="h2" id="sheetTitle">{sheetCase.title}</h2>
              <div className="chips">
                <span className="chip">{sheetCase.industry}</span>
                <span className="chip">{sheetCase.year}</span>
                {sheetCase.disciplines.map((d) => <span className="chip" key={d}>{d}</span>)}
              </div>
            </div>
            <p className="sheet-sum" ref={(el) => { if (el) riseRefs.current[1] = el }} data-rise>{sheetCase.summary}</p>
            <div className="sheet-grid" ref={(el) => { if (el) riseRefs.current[2] = el }} data-rise>
              <div><h3>The problem</h3><p>{sheetCase.problem}</p></div>
              <div><h3>My role</h3><p>{sheetCase.role}</p></div>
              <div>
                <h3>What I delivered</h3>
                <ul>{sheetCase.delivered.map((d) => <li key={d}>{d}</li>)}</ul>
              </div>
              <div>
                <h3>Outcome</h3>
                {sheetCase.stats.length
                  ? sheetCase.stats.map((s) => (
                      <p key={s.label}><b style={{ color: "var(--ink)", fontSize: "1.25rem" }}>{s.value}</b> {s.label}</p>
                    ))
                  : <p>{sheetCase.outcome}</p>}
              </div>
            </div>
            <div className="sheet-foot" ref={(el) => { if (el) riseRefs.current[3] = el }} data-rise>
              <a className="btn btn--dark" href={sheetCase.href} target="_blank" rel="noopener">
                <span className="roll"><span>{sheetCase.cta}</span><span>Opens in a new tab</span></span>
              </a>
              <a className="btn btn--ghost" href={sheetWorkHref}>
                <span className="roll"><span>Full case study page</span><span>Overview, problem, role, outcome</span></span>
              </a>
              <button className="btn btn--ghost" onClick={() => setSheetIdx(nextIdx)}>
                <span className="roll"><span>Next: {cases[nextIdx].title}</span><span>Next: {cases[nextIdx].title}</span></span>
              </button>
            </div>
          </div>
        </div>
        <button className="sheet-close" ref={sheetCloseRef} onClick={closeSheet} aria-label="Close case">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
    </section>
  )
}
