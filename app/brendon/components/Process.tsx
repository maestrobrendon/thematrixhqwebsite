"use client"

// How I work + toolkit (spec §5.8).
import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap-utils"

const STEPS = [
  { n: "Step 1", h: "Understand", p: "Business goal, users and constraints first. I audit what exists and find the one problem worth solving." },
  { n: "Step 2", h: "Define the system", p: "Positioning, principles and tokens: type, color, grid and motion rules everything else will follow." },
  { n: "Step 3", h: "Design and prototype", p: "Identity, screens and motion, tested early in real contexts, not just on artboards." },
  { n: "Step 4", h: "Build and ship", p: "A clean handoff to engineering, or I build it myself. Then I measure and iterate." },
]

export function Process() {
  const stepsRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced || !stepsRef.current) return
    const tween = gsap.to(stepsRef.current.querySelectorAll(".fill"), {
      scaleX: 1,
      stagger: 0.5,
      ease: "none",
      scrollTrigger: { trigger: stepsRef.current, start: "top 80%", end: "bottom 55%", scrub: 0.4 },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <section className="process" id="process" aria-labelledby="process-h" data-ix-gap>
      <div className="wrap">
        <div className="sec-head">
          <h2 className="h2" id="process-h">How I work</h2>
          <p className="lead">The same four stages whether it&apos;s a logo, a dashboard or a launch film.</p>
        </div>
        <ol className="steps" ref={stepsRef} data-ix="Step / Process">
          {STEPS.map((s) => (
            <li className="step" key={s.h}>
              <span className="fill" />
              <span className="n">{s.n}</span>
              <h3 className="h3">{s.h}</h3>
              <p>{s.p}</p>
            </li>
          ))}
        </ol>
        <div className="toolkit">
          <h3 className="h3">Toolkit</h3>
          <div className="tk-groups">
            <div>
              <h4>Design</h4>
              <div className="chips">
                {["Figma", "Illustrator", "Photoshop", "Framer"].map((t) => <span className="chip" key={t}>{t}</span>)}
              </div>
            </div>
            <div>
              <h4>Motion</h4>
              <div className="chips">
                {["After Effects", "GSAP", "Adobe Firefly"].map((t) => <span className="chip" key={t}>{t}</span>)}
              </div>
            </div>
            <div>
              <h4>Build</h4>
              <div className="chips">
                {["Next.js / React", "Tailwind CSS", "Claude Code", "Vercel"].map((t) => <span className="chip" key={t}>{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
