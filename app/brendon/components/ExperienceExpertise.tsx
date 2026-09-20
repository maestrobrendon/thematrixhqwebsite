"use client"

import { useEffect, useRef, useState } from "react"
import { gsap, useReveal, useStaggerReveal } from "@/lib/gsap-utils"

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

function JobRow({ job, isOpen, onToggle }: { job: (typeof jobs)[number]; isOpen: boolean; onToggle: () => void }) {
  const chevronRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const mounted = useRef(false)

  useEffect(() => {
    // Matches framer-motion's `initial={false}` — the row that starts open
    // (expanded === 0 on first paint) should already read as open, not
    // visibly animate in the instant the page loads.
    const method = mounted.current ? gsap.to : gsap.set
    method(chevronRef.current, { rotate: isOpen ? 180 : 0, duration: 0.3, ease: "power2.inOut", transformOrigin: "50% 50%" })
    method(pathRef.current, { color: isOpen ? "var(--brendon-magenta)" : "rgba(0,0,0,0.35)", duration: 0.3 })
    mounted.current = true
  }, [isOpen])

  return (
    <div className="group border-l-2 border-black/15 pl-6 md:pl-8 pb-6 relative">
      <div
        className={`absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 -translate-x-[7px] bg-white transition-all ${
          isOpen ? "border-[var(--brendon-magenta)] scale-125" : "border-black/25"
        }`}
      />
      <button onClick={onToggle} className="w-full text-left cursor-pointer">
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-4">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-(--brendon-ink)">{job.company}</h3>
            <p className="text-sm md:text-base text-(--brendon-muted)">{job.role}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs md:text-sm font-mono-accent text-black/40">{job.period}</span>
            <svg ref={chevronRef} viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
              <path
                ref={pathRef}
                d="M3 6.2c1.8 2.4 3.2 4.1 5 4.1s3.2-1.7 5-4.1"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-black/35"
              />
            </svg>
          </div>
        </div>

        {/* CSS grid-rows collapse instead of an animated/measured "auto"
            height — no JS measurement step means no risk of a stale or
            never-applied height leaving a closed row's space reserved but
            empty (exactly the bug this replaced). */}
        <div
          className="grid transition-[grid-template-rows] duration-300 ease-in-out"
          style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <p className="text-sm md:text-base leading-relaxed pt-3 text-(--brendon-muted)">{job.description}</p>
          </div>
        </div>
      </button>
    </div>
  )
}

export function ExperienceExpertise() {
  const [expanded, setExpanded] = useState<number | null>(0)
  const headerRef = useReveal<HTMLDivElement>({ y: 20, duration: 0.6 })
  const listRef = useStaggerReveal<HTMLDivElement>(".job-row", { x: -20, y: 0, duration: 0.5, stagger: 0.08 })

  return (
    <section className="py-16 md:py-20 px-6 bg-white border-t border-black/10">
      <div className="max-w-3xl mx-auto">
        <div ref={headerRef} className="mb-12 md:mb-16 text-center">
          <span className="font-hand text-xl text-black/60">career journey</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-(--brendon-ink) mt-2">
            EXPERIENCE &amp; EXPERTISE
          </h2>
        </div>

        <div ref={listRef} className="space-y-2">
          {jobs.map((job, index) => (
            <div key={job.company} className="job-row">
              <JobRow job={job} isOpen={expanded === index} onToggle={() => setExpanded(expanded === index ? null : index)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
