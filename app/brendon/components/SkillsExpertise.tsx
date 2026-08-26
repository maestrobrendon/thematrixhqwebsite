"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

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
  "Premiere Pro",
  "Adobe Firefly",
  "Tailwind CSS",
  "Next.js / React",
  "Webflow",
  "InDesign",
  "Framer",
  "Cursor",
  "Vercel",
]

function SkillBar({ name, percentage, delay }: { name: string; percentage: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <div ref={ref} className="mb-7">
      <div className="flex justify-between items-center mb-2.5">
        <span className="text-sm md:text-base font-medium text-(--brendon-ink)">{name}</span>
        <span className="text-sm font-semibold" style={{ color: "var(--brendon-magenta)" }}>
          {percentage}%
        </span>
      </div>
      <div className="h-2 rounded-full overflow-hidden bg-black/[0.06]">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1, delay: delay + 0.15, ease: [0.65, 0, 0.35, 1] }}
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, var(--brendon-cyan), var(--brendon-magenta))" }}
        />
      </div>
    </div>
  )
}

export function SkillsExpertise() {
  return (
    <section className="py-16 md:py-20 px-6 bg-white border-t border-black/10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16 text-center"
        >
          <span className="font-hand text-xl text-black/60">core competencies</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-(--brendon-ink) mt-2">
            SKILLS &amp; EXPERTISE
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-2">
          {skillGroups.map((group, gi) => (
            <div key={gi}>
              {group.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} delay={i * 0.08} />
              ))}
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 md:mt-20"
        >
          <h3 className="text-xl md:text-2xl font-bold mb-6 text-center text-(--brendon-ink)">Tools &amp; Technologies</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {tools.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                whileHover={{ y: -3 }}
                className="sticky-note bg-white px-4 py-2 text-sm font-medium text-(--brendon-ink)"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
