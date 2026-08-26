"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight, ImageIcon } from "lucide-react"
import { projects, colorSchemes, type Project } from "../lib/projects"
import { projectCardBg } from "../lib/assets"

const APPEAR_RAMP = 0.3 // fraction of each project's own scroll dwell spent fading in

// Every card-bg PNG is a 3440px-wide canvas; only the export height differs
// (cards 1-3 are 2000px tall, card 4 is 1776px). Measured directly from the
// pixel alpha of each PNG: each card's own tab sits flush-opaque starting at
// source y=170, in a ~15.1%-wide horizontal slot whose center is listed below.
const NATURAL_ASPECT: Record<Project["color"], string> = {
  cyan: "3440 / 2000",
  black: "3440 / 2000",
  gold: "3440 / 2000",
  magenta: "3440 / 1776",
}
const SLOT_CENTER_FRAC = [0.0756, 0.314, 0.552, 0.797]
const SLOT_WIDTH_FRAC = 0.151
// Fraction of each card's own natural HEIGHT (not width) — this is a vertical
// offset, applied as a % of the aspect box's height, so it must be measured
// against source height, not source width.
const TAB_TOP_FRAC: Record<Project["color"], number> = {
  cyan: 170 / 2000,
  black: 170 / 2000,
  gold: 170 / 2000,
  magenta: 170 / 1776,
}

function TagChip({ label, bg, text }: { label: string; bg: string; text: string }) {
  return (
    <span
      className="inline-flex items-center px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide"
      style={{ backgroundColor: bg, color: text, clipPath: "polygon(9px 0, 100% 0, 100% 100%, 0 100%, 0 9px)" }}
    >
      {label}
    </span>
  )
}

function ImageBadge({ bg, text }: { bg: string; text: string }) {
  return (
    <span
      className="absolute -top-3 -right-3 z-10 inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
      style={{ backgroundColor: bg, color: text }}
    >
      <ImageIcon className="w-3 h-3" />
      IMAGE.JPG
    </span>
  )
}

// Each project's background PNG is opaque across its full body but, in the top
// TAB_HEIGHT band, only paints its own horizontal slot — everywhere else in that
// band is transparent. Stacking all four full-bleed with increasing z-index lets
// each later card's opaque body cover the ones beneath it, while their still-alpha
// top bands let earlier cards' tabs keep peeking through at their own slot. So the
// "row of accumulating tabs" comes from the real asset compositing, not a manual
// clip-path reconstruction.
function Panel({ project, index, n, scrollYProgress }: { project: Project; index: number; n: number; scrollYProgress: import("framer-motion").MotionValue<number> }) {
  const scheme = colorSchemes[project.color]
  const dwell = 1 / n
  const start = index / n
  const ramp = dwell * APPEAR_RAMP
  // Slide up to cover, rather than fade — two overlapping semi-transparent panels
  // would double-expose their text/image content, which a full-bleed slide avoids
  // since the incoming panel is physically off-screen until it arrives.
  // useTransform needs strictly-increasing input points even when index 0's
  // result below goes unused — start can't equal rampStart for card 0.
  const rampStart = Math.max(start - ramp, 0)
  const rampEnd = Math.max(start, rampStart + 0.0001)
  const y = useTransform(scrollYProgress, [rampStart, rampEnd], ["100%", "0%"])
  // Card 0 must render in place unconditionally: scrollYProgress is clamped to
  // exactly 0 before the tall stacking container scrolls into tracking range, and
  // 0 is also this transform's own lower bound, so it would otherwise sit
  // translated fully off-screen (y: 100%) for the entire scroll distance between
  // the heading and the container's top reaching the viewport top — a large dead
  // gap. Card 0 has nothing to slide in from; it's just always there.
  const finalY = index === 0 ? "0%" : y

  return (
    <motion.div
      data-panel-index={index}
      style={{ y: finalY, zIndex: index }}
      className="absolute inset-0 flex flex-col"
    >
      {/* Aspect-locked so left/top percentages always match the source PNG's own
          pixel fractions, regardless of the panel's rendered size — and left
          genuinely transparent (no fallback fill) so earlier cards' tabs, sitting
          behind at lower z-index, keep peeking through outside this card's slot. */}
      <div className="relative w-full shrink-0" style={{ aspectRatio: NATURAL_ASPECT[project.color] }}>
        <Image
          src={projectCardBg[project.color]}
          alt=""
          fill
          className="object-contain object-top pointer-events-none select-none"
          sizes="100vw"
          priority={index === 0}
        />

        <div
          className="absolute flex items-center px-3 text-[11px] font-bold uppercase tracking-widest"
          style={{
            left: `${(SLOT_CENTER_FRAC[index] - SLOT_WIDTH_FRAC / 2) * 100}%`,
            width: `${SLOT_WIDTH_FRAC * 100}%`,
            top: `${TAB_TOP_FRAC[project.color] * 100}%`,
            color: scheme.tabText,
          }}
        >
          Project {project.number}
        </div>
      </div>

      {/* Below the notch band the source PNG is already fully opaque in this
          card's own color, so this flat fill is a seamless continuation — it's
          only ever needed past where the whole width belongs to this card anyway. */}
      <div className="flex-1" style={{ backgroundColor: scheme.bg }} />

      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-10 px-6 md:px-14 pb-8 pt-20 md:pb-10">
        <div style={{ color: scheme.tabText }}>
          <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-widest opacity-70">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: scheme.tabText }} />
            {project.date}
          </div>
          <h3 className="font-sans mb-4 text-3xl md:text-5xl font-bold leading-[0.95] tracking-tight">{project.title}</h3>
          <p className="mb-6 max-w-sm text-sm md:text-base opacity-80">{project.description}</p>
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-wide underline underline-offset-4"
          >
            View Project
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <div className="mt-8 flex flex-wrap gap-2">
            {project.tags.slice(0, 2).map((tag) => (
              <TagChip key={tag} label={tag} bg={scheme.tagBg} text={scheme.tagText} />
            ))}
          </div>
        </div>

        <div className="selection-frame relative aspect-4/3 w-full">
          <Image src={project.image} alt={project.title} fill className="object-cover" sizes="(min-width: 768px) 40vw, 90vw" />
          <span className="handle handle-bl" />
          <span className="handle handle-br" />
          <ImageBadge bg={scheme.badgeBg} text={scheme.badgeText} />
        </div>
      </div>
    </motion.div>
  )
}

export function ProjectStack() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] })
  const n = projects.length

  return (
    <div ref={containerRef} data-project-stack className="relative mt-4" style={{ height: `${n * 90}vh` }}>
      <div className="sticky top-20 h-[70vh] md:h-[75vh] w-full overflow-hidden shadow-lg">
        {projects.map((project, i) => (
          <Panel key={project.slug} project={project} index={i} n={n} scrollYProgress={scrollYProgress} />
        ))}
      </div>
    </div>
  )
}
