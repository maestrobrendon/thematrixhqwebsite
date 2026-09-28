"use client"

// About / thesis + one-system diagram (spec §5.2).
import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap-utils"
import { useBrendonHref } from "../lib/useBrendonHref"

export function About() {
  const rootRef = useRef<HTMLElement>(null)
  const aboutHref = useBrendonHref("/about")

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return
    const ctx = gsap.context(() => {
      const split = SplitText.create("#thesis", { type: "words", wordsClass: "w" })
      gsap.to(split.words, {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: { trigger: "#thesis", start: "top 82%", end: "bottom 42%", scrub: true },
      })
      gsap.fromTo(
        "#thesisImg",
        { yPercent: -12 },
        { yPercent: 0, ease: "none", scrollTrigger: { trigger: ".thesis-photo", start: "top bottom", end: "bottom top", scrub: true } }
      )

      const mm = gsap.matchMedia()
      mm.add({ wide: "(min-width: 861px)", narrow: "(max-width: 860px)" }, (ctx: any) => {
        const conditions = ctx.conditions as { wide?: boolean }
        if (conditions.wide) {
          const sys = gsap.timeline({ scrollTrigger: { trigger: "#system", start: "top 78%", end: "bottom 60%", scrub: 0.5 } })
          sys
            .fromTo(".system-line", { scale: 0 }, { scale: 1, ease: "none", duration: 1 }, 0)
            .from(".node > *", { opacity: 0.2, stagger: 0.12, duration: 0.25, ease: "none" }, 0)
        } else {
          gsap.fromTo(".system-line", { scale: 0 }, { scale: 1, ease: "none", scrollTrigger: { trigger: "#system", start: "top 70%", end: "bottom 55%", scrub: 0.5 } })
          document.querySelectorAll(".node").forEach((n) => {
            gsap.from(n.children, { opacity: 0.2, ease: "none", scrollTrigger: { trigger: n, start: "top 88%", end: "top 62%", scrub: true } })
          })
        }
      })

      document.querySelectorAll<HTMLElement>(".sec-head .h2").forEach((h) => {
        gsap.fromTo(
          h,
          { "--hw": 62 } as gsap.TweenVars,
          {
            "--hw": 82,
            ease: "none",
            scrollTrigger: { trigger: h, start: "top 95%", end: "top 55%", scrub: true, refreshPriority: -1 },
            onUpdate() {
              h.style.fontVariationSettings = `"wdth" ${gsap.getProperty(h, "--hw")}`
            },
          } as gsap.TweenVars
        )
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="about" id="about" aria-labelledby="about-h" data-ix-gap ref={rootRef}>
      <div className="wrap">
        <div className="thesis">
          <div className="thesis-text">
            <h2 id="about-h" className="sr-only">About</h2>
            <p className="thesis-statement" id="thesis" data-ix="Text / Statement">
              I get excited about the harder problem, the one where brand and product have to work as one system, not two.
            </p>
            <p className="thesis-sub">
              For 7+ years I&apos;ve led design for fintech, Web3, real estate and AI companies, from boutique studio work at
              The Matrix HQ to in-house creative leadership. Also known as Maestro Brendon.{" "}
              <a href={aboutHref}>Read the full story</a>.
            </p>
          </div>
          <figure className="thesis-photo" data-ix="Image / Parallax">
            <img
              id="thesisImg"
              src="https://res.cloudinary.com/du5nhfcgd/image/upload/c_fill,g_face,ar_4:5,w_720,q_auto,f_auto/IMG_7035_z00m4t"
              alt="Brendon working in his studio"
              loading="lazy"
              width={360}
              height={450}
            />
          </figure>
        </div>

        <div className="system" id="system" data-ix="Diagram / One system">
          <span className="system-line" aria-hidden="true" />
          <div className="node">
            <h3>Brand</h3>
            <p>Identity, voice and visual language that scale. 80+ brands across fintech, Web3, e-commerce and real estate.</p>
          </div>
          <div className="node">
            <h3>Product</h3>
            <p>Interfaces, dashboards and flows, held together by design systems that stay consistent as the product grows.</p>
          </div>
          <div className="node">
            <h3>Motion</h3>
            <p>Motion systems, launch films and micro-interactions that make a brand feel alive in the product.</p>
          </div>
          <div className="node">
            <h3>Code</h3>
            <p>I prototype and ship in Next.js, GSAP and Claude Code, so the idea survives the handoff.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
