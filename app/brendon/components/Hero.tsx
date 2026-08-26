"use client"

import { useRef, type MouseEvent } from "react"
import Image from "next/image"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ChevronsRight } from "lucide-react"
import { TopBar } from "./TopBar"
import { RulerBar } from "./RulerBar"
import { LiveClock } from "./LiveClock"
import { StickyNote } from "./StickyNote"
import { heroAssets } from "../lib/assets"

type Tag = {
  key: string
  src: string
  alt: string
  w: number
  h: number
  className: string
  rotate: number
  pulse?: boolean
}

// left/top are the CENTER of each tag, as a percentage of the hero container —
// matched against the reference composition — combined with a -50%/-50% translate
// so the relationship to the wordmark holds at any viewport size.
const tags: Tag[] = [
  {
    key: "branding",
    src: heroAssets.tagBranding,
    alt: "Branding",
    w: 186,
    h: 103,
    className: "left-[36%] top-[16%] w-28 md:w-32",
    rotate: 5,
  },
  {
    key: "web-design",
    src: heroAssets.tagWebDesign,
    alt: "Web Design",
    w: 188,
    h: 113,
    className: "left-[66%] top-[38%] w-28 md:w-32",
    rotate: -3,
  },
  {
    key: "motion",
    src: heroAssets.tagMotion,
    alt: "Motion",
    w: 187,
    h: 116,
    className: "left-[26%] top-[54%] w-28 md:w-32",
    rotate: -4,
  },
  {
    key: "remote",
    src: heroAssets.tagRemote,
    alt: "Remote",
    w: 342,
    h: 178,
    className: "left-[71%] top-[58%] w-28 md:w-32",
    rotate: 4,
    pulse: true,
  },
  {
    key: "art-direction",
    src: heroAssets.tagArtDirection,
    alt: "Art Direction",
    w: 449,
    h: 146,
    className: "left-[9%] top-[73%] w-32 md:w-36",
    rotate: -6,
    pulse: true,
  },
]

function HeroTag({ tag }: { tag: Tag }) {
  const boundsRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={boundsRef} className={`hidden sm:block absolute z-20 -translate-x-1/2 -translate-y-1/2 ${tag.className}`}>
      <StickyNote dragConstraints={boundsRef} rotate={tag.rotate} pulse={tag.pulse} className="w-full">
        <Image src={tag.src} alt={tag.alt} width={tag.w} height={tag.h} className="w-full h-auto" draggable={false} />
      </StickyNote>
    </div>
  )
}

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)

  // Only the ruler tracks the cursor — everything else in the hero stays put.
  const rawX = useMotionValue(0)
  const mx = useSpring(rawX, { stiffness: 120, damping: 20, mass: 0.4 })
  const rulerX = useTransform(mx, [-0.5, 0.5], [-90, 90])

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
  }

  function handleMouseLeave() {
    rawX.set(0)
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-svh overflow-hidden"
    >
      <Image src={heroAssets.sky} alt="" fill priority className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-transparent" />

      <TopBar />
      <RulerBar x={rulerX} />

      {/* Floating avatar bubbles — percentage-positioned so they hold their
          relationship to the wordmark at any viewport size. z-20 so they sit
          in front of the wordmark, which reads as sitting "behind" the canvas. */}
      <div className="absolute z-20 left-[10%] top-[32%] hidden sm:block -translate-x-1/2 -translate-y-1/2">
        <div className="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden border-2 border-white shadow-md">
          <Image src={heroAssets.avatarLeft} alt="" width={44} height={44} className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="absolute z-20 left-[86%] top-[53%] hidden sm:block -translate-x-1/2 -translate-y-1/2">
        <div className="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden border-2 border-white shadow-md">
          <Image src={heroAssets.avatarRight} alt="" width={44} height={44} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Floating draggable tags — hidden on touch/mobile. Static in place;
          only the ruler bar tracks the cursor. z-20, same reason as the avatars. */}
      {tags.map((tag) => (
        <HeroTag key={tag.key} tag={tag} />
      ))}

      {/* z-0: the wordmark inside this column must render behind the tags/avatars above. */}
      <div className="relative z-0 h-full flex flex-col items-center justify-center px-6 text-center">
        <LiveClock className="font-mono-accent text-xs text-black/60 mb-6" />

        {/* "my name is" handwritten label */}
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-hand text-2xl text-black/70 -mb-2 -rotate-2"
        >
          my name is
        </motion.p>

        {/* Wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative px-6 py-2 mt-2"
        >
          <Image
            src={heroAssets.wordmarkBorder}
            alt=""
            fill
            className="pointer-events-none select-none"
            style={{ objectFit: "fill" }}
          />
          <h1
            className="font-display tracking-tight text-(--brendon-ink)"
            style={{ fontSize: "clamp(2.75rem, 8vw, 6.5rem)" }}
          >
            BRENDON
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-4 text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-black/60 flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Multidisciplinary Designer &amp; Brand Strategist
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-6 max-w-2xl font-medium text-(--brendon-ink) flex flex-wrap items-center justify-center gap-2"
          style={{ fontSize: "clamp(1.125rem, 2.4vw, 1.875rem)" }}
        >
          I turn
          <Image src={heroAssets.iconSpiralDart} alt="" width={28} height={28} className="inline-block w-6 h-6 md:w-7 md:h-7" />
          ideas into brands people remember.
          <Image src={heroAssets.iconFlower} alt="" width={24} height={24} className="inline-block w-5 h-5 md:w-6 md:h-6" />
        </motion.p>

        <motion.a
          href="mailto:maestrobrendon@gmail.com"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="mt-8 inline-flex items-stretch bg-black text-white shadow-lg overflow-hidden"
        >
          <span className="flex items-center justify-center w-11 bg-(--brendon-cyan) text-black">
            <ChevronsRight className="w-5 h-5" />
          </span>
          <span className="flex items-center px-6 py-3 font-mono-accent text-xs font-medium uppercase tracking-wider">
            Contact Me
          </span>
        </motion.a>
      </div>
    </section>
  )
}
