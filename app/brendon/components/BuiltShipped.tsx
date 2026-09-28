"use client"

// Built and shipped (spec §5.5) — the product-design proof.
import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap-utils"
import { sites } from "../lib/sites"

export function BuiltShipped() {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches
    let reveal: gsap.core.Tween | undefined
    if (!reduced && bgRef.current) {
      reveal = gsap.fromTo(
        bgRef.current,
        { clipPath: "inset(7% 5% 7% 5% round 28px)" },
        { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: { trigger: "#built", start: "top bottom", end: "top 15%", scrub: true } }
      )
    }

    function measure() {
      document.querySelectorAll<HTMLImageElement>(".site .viewport img").forEach((img) => {
        const vp = img.parentElement
        if (!vp) return
        const scale = (gsap.getProperty(img, "scale") as number) || 1
        const h = img.getBoundingClientRect().height / scale
        const travel = Math.min(0, vp.clientHeight - h)
        img.style.setProperty("--travel", travel + "px")
        img.style.setProperty("--zoom", travel < -20 ? "1" : "1.04")
      })
    }
    const imgs = Array.from(document.querySelectorAll<HTMLImageElement>(".site .viewport img"))
    imgs.forEach((i) => (i.complete ? measure() : i.addEventListener("load", measure)))
    addEventListener("resize", measure)

    return () => {
      reveal?.scrollTrigger?.kill()
      reveal?.kill()
      removeEventListener("resize", measure)
      imgs.forEach((i) => i.removeEventListener("load", measure))
    }
  }, [])

  return (
    <section className="built" id="built" aria-labelledby="built-h" data-ix-gap>
      <div className="built-bg" ref={bgRef} aria-hidden="true" />
      <div className="wrap">
        <div className="sec-head">
          <div style={{ gridColumn: "1 / span 7" }}>
            <p className="kick">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
              </svg>
              Designed and built by me
            </p>
            <h2 className="h2" id="built-h">Built and shipped</h2>
          </div>
          <p className="lead">I don&apos;t stop at the mockup. These are live products and sites I designed, then built with Next.js, GSAP and Claude Code.</p>
        </div>
        <div className="sites" data-ix="Card / Live site">
          {sites.map((s) => (
            <a key={s.url} className="site" href={s.href} target="_blank" rel="noopener" data-cursor="Visit live site">
              <div className="browser">
                <div className="bar-url">
                  <span className="url">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <rect x="5" y="11" width="14" height="9" rx="2" />
                      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                    </svg>
                    {s.url}
                  </span>
                  <span className="live">Live</span>
                </div>
                <div className="viewport">
                  {s.screenshot ? (
                    <img src={s.screenshot} alt={`${s.title} homepage`} loading="lazy" decoding="async" />
                  ) : (
                    <div className="placeholder-shot">
                      <div><b>{s.title}</b>Full-page screenshot goes here</div>
                    </div>
                  )}
                </div>
              </div>
              <div className="site-meta">
                <div>
                  <h3 className="h3">{s.title}</h3>
                  <p>{s.description}</p>
                </div>
                <div className="chips">{s.tags.map((t) => <span className="chip" key={t}>{t}</span>)}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
