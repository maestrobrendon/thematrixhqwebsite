"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { StickyNote } from "./StickyNote"
import { aboutAssets } from "../lib/assets"

const skills = [
  { label: "Brand Identity", icon: aboutAssets.brandIdentityPng, bg: "#f2b705", text: "#1a1400" },
  { label: "Art Direction", icon: aboutAssets.artDirectionIconPng, bg: "#3fae6a", text: "#ffffff" },
  { label: "Design Systems", icon: aboutAssets.designSystemPng, bg: "#ec1561", text: "#ffffff" },
  { label: "Motion Design", icon: aboutAssets.motionDesignIconSvg, bg: "#3fc6f0", text: "#04222b" },
]

export function About() {
  const boundsRef = useRef<HTMLDivElement>(null)

  return (
    <section id="about" ref={boundsRef} className="relative py-24 md:py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto relative">
        {/* Polaroid — sits in the outer wide column so it never overlaps the text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 6 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 4 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ rotate: 0, scale: 1.03 }}
          className="hidden lg:block absolute right-0 top-28 w-36 bg-white p-2 pb-6 shadow-lg border border-black/5 z-10"
        >
          <div className="relative w-full aspect-4/5 overflow-hidden">
            <Image src={aboutAssets.workspacePhoto} alt="Brendon, 2026" fill className="object-cover" />
          </div>
          <p className="font-hand text-center text-sm mt-1 text-black/70">2026</p>
        </motion.div>

        <div className="max-w-2xl mx-auto relative text-center">
          {/* Tag row */}
          <div className="relative h-16 mb-2">
            <StickyNote dragConstraints={boundsRef} rotate={-3} className="hidden sm:block absolute left-2 md:left-8 top-0 w-32">
              <Image src={aboutAssets.aboutMeTag} alt="About me!" width={373} height={263} className="w-full h-auto" draggable={false} />
            </StickyNote>

            <StickyNote dragConstraints={boundsRef} rotate={4} className="hidden sm:block absolute right-2 md:right-8 top-1 w-32">
              <Image src={aboutAssets.startProjectButton} alt="Start a project" width={168} height={91} className="w-full h-auto" draggable={false} />
            </StickyNote>
          </div>

          {/* Statement heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-snug text-(--brendon-ink)"
          >
            I&apos;m a Designer who gets excited about the harder problem, the one where{" "}
            <span className="relative inline-flex items-center gap-1.5">
              brand
              <Image src={aboutAssets.yellowInBetween} alt="" width={48} height={68} className="inline-block h-8 w-auto align-middle" />
            </span>{" "}
            and product have to work as one system, not two
            <Image src={aboutAssets.lastIcon} alt="" width={48} height={68} className="inline-block h-8 w-auto align-middle ml-1.5" />.
          </motion.h2>

          {/* Same photo, shown inline instead of floating once there's no room to the side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:hidden mx-auto mt-6 w-28 bg-white p-2 pb-5 shadow-lg border border-black/5"
          >
            <div className="relative w-full aspect-4/5 overflow-hidden">
              <Image src={aboutAssets.workspacePhoto} alt="Brendon, 2026" fill className="object-cover" />
            </div>
            <p className="font-hand text-center text-xs mt-1 text-black/70">2026</p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 text-base md:text-lg text-(--brendon-muted) max-w-xl mx-auto"
          >
            7+ years leading design across fintech, Web3, e-commerce, and real estate. 80+ brands built. I merge
            aesthetics with strategy, so the work looks good and actually moves the business.
          </motion.p>

          {/* Skill pills */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 max-w-md mx-auto">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -3 }}
                className="flex items-stretch font-medium text-sm"
              >
                <span className="flex items-center px-4 py-2.5" style={{ backgroundColor: skill.bg, color: skill.text }}>
                  {skill.label}
                </span>
                <Image src={skill.icon} alt="" width={40} height={40} className="w-10 h-10 shrink-0 object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
