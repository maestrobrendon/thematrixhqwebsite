"use client"

import { useEffect, useRef } from "react"
import { gsap, useReveal, useStaggerReveal } from "@/lib/gsap-utils"

const skillGroups = [
  [
    { name: "Brand Identity Design", percentage: 95 },
    { name: "UI/UX Design", percentage: 90 },
    { name: "Design Systems", percentage: 88 },
    { name: "Motion Graphics", percentage: 85 },
  ],
  [
    { name: "Web Design", percentage: 92 },
    { name: "Art Direction", percentage: 93 },
    { name: "AI-Assisted Design", percentage: 90 },
    { name: "Prototyping", percentage: 87 },
  ],
]

const tools = [
  "Figma",
  "Photoshop",
  "Illustrator",
  "After Effects",
  "Tailwind CSS",
  "Next.js / React",
  "Framer",
  "Claude Code",
]

function SkillBar({ name, percentage, delay }: { name: string; percentage: number; delay: number }) {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = barRef.current
    if (!el) return
    const tween = gsap.fromTo(
      el,
      { width: "0%" },
      {
        width: `${percentage}%`,
        duration: 1,
        delay: delay + 0.15,
        ease: "power4.inOut",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      },
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="mb-7">
      <div className="flex justify-between items-center mb-2.5">
        <span className="text-sm md:text-base font-medium text-(--brendon-ink)">{name}</span>
        <span className="text-sm font-semibold" style={{ color: "var(--brendon-magenta)" }}>
          {percentage}%
        </span>
      </div>
      <div className="h-2 rounded-full overflow-hidden bg-black/[0.06]">
        <div
          ref={barRef}
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, var(--brendon-cyan), var(--brendon-magenta))" }}
        />
      </div>
    </div>
  )
}

export function SkillsExpertise() {
  const headerRef = useReveal<HTMLDivElement>({ y: 20, duration: 0.6 })
  const toolsHeaderRef = useReveal<HTMLDivElement>({ y: 20, duration: 0.6 })
  const toolsRef = useStaggerReveal<HTMLDivElement>(".tool-pill", { scale: 0.85, y: 0, duration: 0.35, stagger: 0.04 })

  return (
    <section className="py-16 md:py-20 px-6 bg-white border-t border-black/10">
      <div className="max-w-4xl mx-auto">
        <div ref={headerRef} className="mb-12 md:mb-16 text-center">
          <span className="font-hand text-xl text-black/60">core competencies</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-(--brendon-ink) mt-2">
            SKILLS &amp; EXPERTISE
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-2">
          {skillGroups.map((group, gi) => (
            <div key={gi}>
              {group.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} delay={i * 0.08} />
              ))}
            </div>
          ))}
        </div>

        <div ref={toolsHeaderRef} className="mt-16 md:mt-20">
          <h3 className="text-xl md:text-2xl font-bold mb-6 text-center text-(--brendon-ink)">Tools &amp; Technologies</h3>
          <div ref={toolsRef} className="flex flex-wrap justify-center gap-3">
            {tools.map((tool) => (
              <span
                key={tool}
                className="tool-pill sticky-note bg-white px-4 py-2 text-sm font-medium text-(--brendon-ink) transition-transform duration-200 hover:-translate-y-[3px]"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
