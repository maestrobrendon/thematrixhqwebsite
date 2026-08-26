"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const jobs = [
  {
    company: "HEED / The Render Unit LLC",
    role: "Creative Lead",
    period: "Nov 2025 - Aug 2026 · Colorado, US (Remote)",
    description:
      "Led creative execution for HEED's real estate developer clients — brand identity, architectural visualization, and lead-generation marketing that contributed to $2M+ in estimated pre-sales. Directed floor plan renders, landing pages, and ad creative from concept to sales-ready output, and used AI tools like Adobe Firefly to produce high volumes of static, motion, and video assets on tight weekly turnarounds.",
  },
  {
    company: "Growmodo",
    role: "Senior Graphic Designer · AI Expert (Contract)",
    period: "2026 · Germany (Remote)",
    description:
      "Providing on-call senior design support to Growmodo's global client base as an independent contractor, covering brand, marketing, and digital design needs. Applying AI-assisted design workflows to accelerate creative production without compromising quality.",
  },
  {
    company: "The Matrix HQ",
    role: "Creative Director",
    period: "Aug 2019 - Oct 2024 · Lagos, Nigeria",
    description:
      "Led creative strategy and brand identity for a boutique design studio, directing work for 80+ clients across fintech, e-commerce, Web3, and logistics. Built the agency's design systems, SOPs, and contractor model from the ground up, and led complete redesigns of client websites, dashboards, and mobile apps.",
  },
  {
    company: "Quintes",
    role: "Lead Graphics Designer",
    period: "Nov 2024 - July 2025",
    description:
      "Led branding for two major token launches, securing $2M+ in seed funding through high-fidelity visual storytelling and pitch decks. Engineered viral social content that drove 200% community growth in six months, and developed motion-ready assets and mascots that lifted brand engagement by 35%.",
  },
  {
    company: "LEDGA (Contract)",
    role: "Brand Identity Designer",
    period: "May 2024 - August 2024 · Remote",
    description:
      "Developed an end-to-end brand identity system — typography, iconography, and logos — for a digital banking platform. Architected high-impact UI/UX that improved user engagement and accessibility by 22%, contributing to a 15% increase in customer acquisition.",
  },
  {
    company: "The Matrix House",
    role: "Junior Graphic Designer",
    period: "2019 - 2020 · Lagos, Nigeria",
    description:
      "Executed cross-platform design assets for corporate branding, including high-stakes presentations and product packaging. Supported UI/UX workflows on large-scale website revamps and created social content that increased click-through rates.",
  },
  {
    company: "Freelance",
    role: "Brand & Digital Designer",
    period: "2016 - 2019 · Remote",
    description:
      "Launched 20+ brand identities for startups, delivering scalable logo systems and marketing toolkits. Developed responsive landing pages and web interfaces, managing production end-to-end from concept to final output.",
  },
]

export function ExperienceExpertise() {
  const [expanded, setExpanded] = useState<number | null>(0)

  return (
    <section className="py-24 md:py-32 px-6 bg-white border-t border-black/10">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16 text-center"
        >
          <span className="font-hand text-xl text-black/60">career journey</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-(--brendon-ink) mt-2">
            EXPERIENCE &amp; EXPERTISE
          </h2>
        </motion.div>

        <div className="space-y-2">
          {jobs.map((job, index) => {
            const isOpen = expanded === index
            return (
              <motion.div
                key={job.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group border-l-2 border-black/15 pl-6 md:pl-8 pb-6 relative"
              >
                <div
                  className={`absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 -translate-x-[7px] bg-white transition-all ${
                    isOpen ? "border-[var(--brendon-magenta)] scale-125" : "border-black/25"
                  }`}
                />
                <button onClick={() => setExpanded(isOpen ? null : index)} className="w-full text-left cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-(--brendon-ink)">{job.company}</h3>
                      <p className="text-sm md:text-base text-(--brendon-muted)">{job.role}</p>
                    </div>
                    <span className="text-xs md:text-sm font-mono-accent text-black/40 shrink-0">{job.period}</span>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm md:text-base leading-relaxed pt-3 text-(--brendon-muted)">{job.description}</p>
                  </motion.div>
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
