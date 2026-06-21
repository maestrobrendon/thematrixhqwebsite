"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useAnimate, useInView } from "framer-motion"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ArrowRight, Check, X, Users, Building2, User, Bot } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// ── Design tokens (from matrixhq-redesign-mockup.html) ──────────────────────
// --bg-dark   : #0B1F17    --bg-light  : #F4F1E8    --accent-lime: #D6FF5C
// --dark-head : #ffffff    --dark-body : #C9D6CE    --dark-muted : #7C8C82
// --light-head: #16241C    --light-body: #5C6B62    --light-muted: #8C9A8C
// --card-dark : #142B22    --tile-a    : #244A38    --tile-b     : #1A332A
// --border-d  : #1A332A    --border-l  : #E4E0D4    --lime-text  : #16240A
// Font-sans: Plus Jakarta Sans (var(--font-plus-jakarta-sans), font-sans class)
// Font-serif: Source Serif 4 (var(--font-serif), font-serif class) for <Em />
// ─────────────────────────────────────────────────────────────────────────────

// Serif italic emphasis — matches the mockup's .em / Instrument Serif italic
function Em({ children }: { children: React.ReactNode }) {
  return <span className="font-serif italic font-normal">{children}</span>
}

// ── Shared animation variants ─────────────────────────────────────────────────
const BEZIER = [0.25, 0, 0, 1] as [number, number, number, number]

const containerV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const fadeUpV = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: BEZIER } },
}
const fadeScaleV = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: BEZIER } },
}
// ─────────────────────────────────────────────────────────────────────────────

// Existing project images already in this codebase (portfolio-showcase.tsx)
const img = {
  arclly:   "https://res.cloudinary.com/dusynu0kv/image/upload/v1764280363/ifdv28cltsgypa7nhhuv.jpg",
  ledga:    "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279279/vvn9avecee8eaj9yptti.jpg",
  inaara:   "https://res.cloudinary.com/dusynu0kv/image/upload/v1764281205/yruv2nywtqxicdja6kxe.jpg",
  assura:   "https://res.cloudinary.com/dusynu0kv/image/upload/v1764281754/mnv7i1uyrl4pgfowyjrk.jpg",
  sheikh:   "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279126/kmyux5c6vnaf2hisotza.jpg",
  moods:    "https://res.cloudinary.com/dusynu0kv/image/upload/v1764281736/kpccrqsvrrqz8ew5htbt.jpg",
  alavda:   "https://res.cloudinary.com/dusynu0kv/image/upload/v1764278972/vdeiw8wlj7gdjgbsbw4s.jpg",
  wevolte:  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279295/mziuakmaaf8bsmyieuyn.png",
  penumbra: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279438/gh07foriuqoz7rfkligd.png",
}

const clientLogos = [
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764283723/gtimkbhhs72kxg0qctbp.png",
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764283759/z9jvpgg2bmqusl4vpvrt.png",
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764283687/w2nlreoxajlp57z2ndze.png",
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764283670/k7rmtutzsl5rztjaysa8.png",
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764283640/fcehfyvpcsf3ubbyvjxg.png",
]

// ─────────────────────────────────────────────────────────────────────────────
// ROOT PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function Home() {
  const [currency, setCurrency] = useState<"ngn" | "usd">("ngn")

  return (
    <main className="font-sans overflow-x-hidden">
      <NavigationHeader />
      <HeroSection />
      <TrustBarSection />
      <BeyondSection />
      <FeatureCardsSection />
      <HowItWorksSection />
      <WhatsIncludedSection />
      <ServicesSection />
      <StatsSection />
      <PortfolioSection />
      <ComparisonSection />
      <PricingSection currency={currency} setCurrency={setCurrency} />
      <TestimonialsSection />
      <FinalCTASection />
      <Footer />
    </main>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. HERO — living mosaic
// ─────────────────────────────────────────────────────────────────────────────
interface TileFrame {
  color: string
  label: string
}

// 3 columns × 3 tiles; grow values set proportional heights within each column.
// Swap frame colors for real image src strings when assets are ready.
const colsData: Array<Array<{ frames: TileFrame[]; grow: number }>> = [
  // Column 1 — tall middle tile
  [
    {
      grow: 34,
      frames: [
        { color: "#244A38", label: "Brand identity" },
        { color: "#2A5040", label: "Brand identity" },
        { color: "#1E3D2E", label: "Brand identity" },
      ],
    },
    {
      grow: 40,
      frames: [
        { color: "#D6FF5C", label: "Web design" },
        { color: "#C8F050", label: "Web design" },
      ],
    },
    {
      grow: 26,
      frames: [
        { color: "#1A332A", label: "Motion" },
        { color: "#0D2418", label: "Motion" },
        { color: "#142B22", label: "Motion" },
      ],
    },
  ],
  // Column 2 — tallest middle tile
  [
    {
      grow: 28,
      frames: [
        { color: "#1A332A", label: "Packaging" },
        { color: "#0F2A1E", label: "Packaging" },
        { color: "#1E3D2E", label: "Packaging" },
      ],
    },
    {
      grow: 44,
      frames: [
        { color: "#2A5040", label: "Social media" },
        { color: "#30604D", label: "Social media" },
        { color: "#244A38", label: "Social media" },
      ],
    },
    {
      grow: 28,
      frames: [
        { color: "#142B22", label: "Illustration" },
        { color: "#1A332A", label: "Illustration" },
      ],
    },
  ],
  // Column 3 — very tall middle tile
  [
    {
      grow: 22,
      frames: [
        { color: "#0D2418", label: "Ad creative" },
        { color: "#142B22", label: "Ad creative" },
        { color: "#0F2A1E", label: "Ad creative" },
      ],
    },
    {
      grow: 50,
      frames: [
        { color: "#244A38", label: "Presentations" },
        { color: "#2A5040", label: "Presentations" },
        { color: "#1E3D2E", label: "Presentations" },
      ],
    },
    {
      grow: 28,
      frames: [
        { color: "#D6FF5C", label: "Print" },
        { color: "#C8F050", label: "Print" },
      ],
    },
  ],
]

// MosaicTile fills its parent wrapper div — parent controls height via vh units
function MosaicTile({ frames }: { frames: TileFrame[] }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const initialDelay = Math.random() * 4000
    const cycleMs      = 3000 + Math.random() * 3000
    let intervalId: ReturnType<typeof setInterval>

    const timerId = setTimeout(() => {
      intervalId = setInterval(
        () => setCurrent((p) => (p + 1) % frames.length),
        cycleMs,
      )
    }, initialDelay)

    return () => {
      clearTimeout(timerId)
      clearInterval(intervalId)
    }
  }, [frames.length])

  const isLime =
    frames[current].color === "#D6FF5C" || frames[current].color === "#C8F050"

  return (
    // Fills the parent wrapper entirely — no flexGrow, just w-full h-full
    <div className="relative rounded-[14px] overflow-hidden w-full h-full">
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0 flex items-end p-3"
          style={{ backgroundColor: frames[current].color }}
        >
          <span
            className="text-[11px] font-medium leading-none"
            style={{ color: isLime ? "#16240A" : "#4A6B58" }}
          >
            {frames[current].label}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// Per-column scroll speeds and starting phase offsets for async feel
const COL_DURATIONS = [22, 18, 26] // seconds per full loop cycle
const COL_DELAYS    = [0, -6, -10] // negative = start partway through cycle

function HeroSection() {
  return (
    <section
      style={{ backgroundColor: "#0B1F17" }}
      className="relative flex min-h-screen"
    >
      {/* ── Left: static copy, vertically centered ── */}
      {/*
        Mobile/tablet: normal horizontal padding (px-6 / md:px-10)
        Desktop lg+: large left inset (~19vw, capped at 220px) matching reference
      */}
      <div className="flex-1 flex items-center py-24 lg:py-28 px-6 md:px-10 lg:pl-[clamp(100px,19vw,220px)] lg:pr-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[560px] lg:max-w-none"
        >
          {/* Eyebrow */}
          <span
            style={{ color: "#D6FF5C", fontSize: 12, letterSpacing: "0.13em" }}
            className="uppercase font-semibold mb-5 block"
          >
            AI-powered creative · Built for brands that move fast
          </span>

          {/* Headline — forced 3-line structure with explicit <br /> */}
          <h1
            style={{ color: "#ffffff", lineHeight: 1.05, fontWeight: 600 }}
            className="text-[2.1rem] sm:text-[2.6rem] md:text-[3rem] lg:text-[3.5rem] xl:text-[4rem] mb-6 lg:mb-7"
          >
            Your entire creative team.
            <br />
            <Em>One monthly</Em>
            <br />
            <Em>price.</Em>
          </h1>

          {/* Subhead */}
          <p
            style={{ color: "#C9D6CE", fontSize: 16, lineHeight: 1.65 }}
            className="mb-8 lg:mb-10 max-w-[480px] lg:max-w-[520px]"
          >
            We turn founders&apos; visions into remarkable brands — branding,
            websites, and digital products — now powered by AI and delivered on
            a flexible monthly subscription.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-7">
            <Link
              href="https://wa.me/2347045985964"
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: "#D6FF5C", color: "#16240A" }}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Start now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/work"
              style={{ color: "#ffffff", border: "1px solid rgba(255,255,255,0.25)" }}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold bg-transparent hover:bg-white/5 transition-colors"
            >
              View work
            </Link>
          </div>

          {/* Feature labels */}
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {["No contracts", "Pause anytime", "30-hr first draft", "AI-powered speed"].map((f) => (
              <span key={f} style={{ color: "#7C8C82", fontSize: 12 }}>
                {f}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Right: continuously scrolling mosaic — each column loops at a different speed ── */}
      {/*
        Each tile wrapper has height: `${grow}vh`. Since each column's grow values
        sum to 100, one set of tiles = 100vh + 3×8px (bottom margin per tile).
        Doubling gives 200vh + 48px total. animate y to "-50%" moves exactly one
        set height → seamless invisible loop. Different durations + negative delays
        make the three columns asynchronously out of phase.
      */}
      <div
        className="hidden lg:flex gap-2 shrink-0 overflow-hidden"
        style={{ width: "48%", height: "100vh" }}
      >
        {colsData.map((col, ci) => {
          const doubled = [...col, ...col] // stack twice for seamless loop
          return (
            <div key={ci} className="flex-1 overflow-hidden" style={{ height: "100vh" }}>
              <motion.div
                className="flex flex-col"
                animate={{ y: "-50%" }}
                transition={{
                  duration: COL_DURATIONS[ci],
                  repeat: Infinity,
                  ease: "linear",
                  delay: COL_DELAYS[ci],
                }}
              >
                {doubled.map((tile, ti) => (
                  // Explicit vh height + bottom margin so the seam lines up perfectly
                  <div
                    key={ti}
                    style={{
                      height: `${tile.grow}vh`,
                      flexShrink: 0,
                      marginBottom: 8,
                    }}
                  >
                    <MosaicTile frames={tile.frames} />
                  </div>
                ))}
              </motion.div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. TRUST BAR — scroll-linked horizontal drift, opposite rows
// ─────────────────────────────────────────────────────────────────────────────
// Repeat logos enough times so the strip fills the viewport at all scroll positions
const row1Logos = Array.from({ length: 6 }, () => clientLogos).flat()
const row2Logos = [
  ...clientLogos.slice(2),
  ...clientLogos.slice(0, 2),
  ...Array.from({ length: 6 }, () => clientLogos).flat(),
]

const EDGE_MASK = {
  maskImage:
    "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
  WebkitMaskImage:
    "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
} as const

function TrustBarSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Row 1 drifts left; row 2 drifts right — opposite directions, same magnitude
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 150])

  return (
    <section
      ref={ref}
      style={{ backgroundColor: "#F4F1E8" }}
      className="py-12 md:py-16 text-center overflow-hidden"
    >
      <p
        style={{ color: "#8C9A8C", fontSize: 12, letterSpacing: "0.08em" }}
        className="uppercase mb-8 px-6"
      >
        Trusted by ambitious founders and visionary brands
      </p>

      {/* Row 1 — drifts left */}
      <div className="mb-4" style={EDGE_MASK}>
        <motion.div
          className="flex items-center gap-10"
          style={{ x: x1, width: "max-content" }}
        >
          {row1Logos.map((src, i) => (
            <div key={i} className="relative h-8 w-32 shrink-0">
              <Image
                src={src}
                alt=""
                fill
                className="object-contain grayscale opacity-50"
                sizes="112px"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Row 2 — drifts right */}
      <div style={EDGE_MASK}>
        <motion.div
          className="flex items-center gap-10"
          style={{ x: x2, width: "max-content" }}
        >
          {row2Logos.map((src, i) => (
            <div key={i} className="relative h-8 w-32 shrink-0">
              <Image
                src={src}
                alt=""
                fill
                className="object-contain grayscale opacity-50"
                sizes="112px"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. BEYOND — two-column feature rows, staggered whileInView reveals
// ─────────────────────────────────────────────────────────────────────────────
function BeyondSection() {
  return (
    <section
      style={{ backgroundColor: "#F4F1E8", borderTop: "1px solid #E4E0D4" }}
      className="py-20 md:py-28 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto space-y-20 md:space-y-28">

        {/* ── Row 1: text left / image right ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Staggered text block */}
          <motion.div
            variants={containerV}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span
              variants={fadeUpV}
              style={{ color: "#8C9A8C", fontSize: 11, letterSpacing: "0.13em" }}
              className="uppercase font-semibold mb-4 block"
            >
              The Matrix HQ difference
            </motion.span>
            <motion.h2
              variants={fadeUpV}
              style={{ color: "#16241C", fontWeight: 600, lineHeight: 1.1 }}
              className="text-[2rem] md:text-[2.5rem] mb-6"
            >
              Beyond templates.{" "}
              <Em>Real creative thinking,</Em>{" "}
              built to move your brand forward.
            </motion.h2>
            <motion.p
              variants={fadeUpV}
              style={{ color: "#5C6B62", fontSize: 17, lineHeight: 1.7, maxWidth: 480 }}
              className="mb-7"
            >
              We combine human-led creative direction with AI-powered execution
              — giving you the speed of a software tool with the quality of a
              senior creative team. No cookie-cutter solutions. No shortcuts on
              craft.
            </motion.p>
            <motion.div variants={fadeUpV}>
              <Link
                href="/work"
                style={{ backgroundColor: "#16241C", color: "#ffffff" }}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold hover:opacity-80 transition-opacity"
              >
                See how we work
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Image with scale-in */}
          <motion.div
            variants={fadeScaleV}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative rounded-[20px] overflow-hidden h-[260px] sm:h-[340px] md:h-[420px]"
            style={{ border: "1px solid #E4E0D4" }}
          >
            <Image
              src="https://res.cloudinary.com/du5nhfcgd/image/upload/q_auto/f_auto/v1781996512/fe55e3a4e5bfc2d1cfb86ae8877642efd8aadf0f-1044x1044-ezgif.com-avif-to-png-converter_skv5ag.png"
              alt="The Matrix HQ difference — real creative thinking"
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 50vw"
            />
          </motion.div>
        </div>

        {/* ── Row 2: dark showcase card left / text right ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Dark card with project image */}
          <motion.div
            variants={fadeScaleV}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative rounded-[20px] overflow-hidden h-[240px] sm:h-[300px] md:h-[380px]"
            style={{ backgroundColor: "#0B1F17" }}
          >
            <Image
              src={img.arclly}
              alt="ARCLLY — grocery brand identity"
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#0B1F17]/70 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p
                style={{ color: "#D6FF5C", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}
                className="mb-1"
              >
                Featured work
              </p>
              <p style={{ color: "#ffffff", fontSize: 17, fontWeight: 600 }}>
                ARCLLY Grocery Branding
              </p>
            </div>
          </motion.div>

          {/* Staggered text block */}
          <motion.div
            variants={containerV}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span
              variants={fadeUpV}
              style={{ color: "#8C9A8C", fontSize: 11, letterSpacing: "0.13em" }}
              className="uppercase font-semibold mb-4 block"
            >
              Your creative advantage
            </motion.span>
            <motion.h2
              variants={fadeUpV}
              style={{ color: "#16241C", fontWeight: 600, lineHeight: 1.1 }}
              className="text-[2rem] md:text-[2.5rem] mb-6"
            >
              The creative partner your team{" "}
              <Em>has been asking for</Em>
            </motion.h2>
            <motion.p
              variants={fadeUpV}
              style={{ color: "#5C6B62", fontSize: 17, lineHeight: 1.7, maxWidth: 480 }}
              className=""
            >
              Matrix HQ is your dedicated creative team with the specialized
              skills you need to execute across channels and moments that
              matter. See us as an extension of your team — freeing you to
              focus on your most impactful work.
            </motion.p>
          </motion.div>
        </div>

      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. HOW IT WORKS
// ─────────────────────────────────────────────────────────────────────────────
const steps = [
  {
    num: "01",
    title: "Discover",
    desc: "Create visual identities that align with your voice and make lasting impressions.",
  },
  {
    num: "02",
    title: "Design",
    desc: "Shape powerful experiences with purpose-driven creativity and thoughtful execution.",
  },
  {
    num: "03",
    title: "Develop",
    desc: "Build scalable solutions that bring your vision to life with precision and performance.",
  },
  {
    num: "04",
    title: "Launch & Grow",
    desc: "Introduce your brand with impact through strategic rollouts that captivate and convert.",
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// 4. FEATURE CARDS — gradient-sweep headline + staggered 3-card grid
// ─────────────────────────────────────────────────────────────────────────────
// JSX at module level is valid in .tsx; Em is hoisted via function declaration
const featureCards: Array<{
  src: string
  alt: string
  labelBg: string
  labelColor: string
  labelNode: React.ReactNode
}> = [
  {
    src: "https://res.cloudinary.com/du5nhfcgd/image/upload/q_auto/f_auto/v1781996046/c4acc610d5f0b8ce132e4b269142682874e261da-1050x1200-ezgif.com-avif-to-png-converter_cqoqd0.png",
    alt: "Working on a creative project",
    labelBg: "#D6FF5C",
    labelColor: "#16240A",
    labelNode: <><Em>Flexible</Em> subscription model</>,
  },
  {
    src: "https://res.cloudinary.com/du5nhfcgd/image/upload/q_auto/f_auto/v1781996046/55397e9d9da1eb2f0e73a3a9053ce5b3ce205713-1050x1200-ezgif.com-avif-to-png-converter_grzhpr.png",
    alt: "Top global creative talent",
    labelBg: "#142B22",
    labelColor: "#ffffff",
    labelNode: <>Senior-level <Em>creative direction</Em></>,
  },
  {
    src: "https://res.cloudinary.com/du5nhfcgd/image/upload/q_auto/f_auto/v1781996045/2f768f155e92b3d7460d2c9d2a5569ecba5f2e19-1050x1200-ezgif.com-avif-to-png-converter_q047y0.png",
    alt: "AI-first creative systems",
    labelBg: "#F4F1E8",
    labelColor: "#16241C",
    labelNode: <><Em>AI-powered</Em> creative systems</>,
  },
]

function FeatureCardsSection() {
  // useAnimate gives us both the ref for the headline AND an imperative animate fn
  const [headlineRef, animateHeadline] = useAnimate<HTMLHeadingElement>()
  const isInView = useInView(headlineRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return
    // Animate background-position via Web Animations API (backgroundPosition string → string)
    animateHeadline(
      headlineRef.current,
      { backgroundPosition: "100% 0%" },
      { duration: 1.4, ease: BEZIER },
    )
  }, [isInView, animateHeadline, headlineRef])

  return (
    <section
      style={{ backgroundColor: "#0B1F17", borderTop: "1px solid #1A332A" }}
      className="py-20 md:py-28 px-6 md:px-16 text-center"
    >
      <div className="max-w-7xl mx-auto">
        {/* Eyebrow */}
        <motion.p
          variants={fadeUpV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          style={{ color: "#7C8C82", fontSize: 11, letterSpacing: "0.13em" }}
          className="uppercase font-semibold mb-5"
        >
          Easy &amp; hassle-free
        </motion.p>

        {/* Headline — gradient sweeps from dim → bright → dim as it enters view */}
        <h2
          ref={headlineRef}
          style={{
            backgroundImage:
              "linear-gradient(90deg, #7C8C82 0%, #ffffff 50%, #7C8C82 100%)",
            backgroundSize: "200% 100%",
            backgroundPosition: "0% 0%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontWeight: 600,
            lineHeight: 1.15,
          }}
          className="text-[2rem] md:text-[2.6rem] mb-12 md:mb-16 max-w-2xl mx-auto"
        >
          World-class creative. Smarter systems.
          <br />
          Purposefully <Em>made to keep up with you.</Em>
        </h2>

        {/* Card grid — stagger left → right with staggerChildren */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {featureCards.map((card, i) => (
            <motion.div
              key={i}
              variants={fadeUpV}
              className="rounded-[20px] overflow-hidden"
              style={{ border: "1px solid #1A332A" }}
            >
              {/* Full-bleed image */}
              <div className="relative h-[240px] sm:h-[300px] md:h-[360px] lg:h-[400px]">
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
              </div>
              {/* Solid-colour label bar — lime / dark green / cream */}
              <div
                className="px-6 py-4 text-left"
                style={{ backgroundColor: card.labelBg }}
              >
                <p
                  style={{
                    color: card.labelColor,
                    fontSize: 15,
                    fontWeight: 500,
                    lineHeight: 1.3,
                  }}
                >
                  {card.labelNode}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. HOW IT WORKS
// ─────────────────────────────────────────────────────────────────────────────
function HowItWorksSection() {
  return (
    <section
      style={{ backgroundColor: "#0B1F17", borderTop: "1px solid #1A332A" }}
      className="py-16 md:py-24 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading — stagger eyebrow → h2 */}
        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12 md:mb-14"
        >
          <motion.span
            variants={fadeUpV}
            style={{ color: "#D6FF5C", fontSize: 12, letterSpacing: "0.12em" }}
            className="uppercase font-semibold mb-4 block"
          >
            From brief to brilliant
          </motion.span>
          <motion.h2
            variants={fadeUpV}
            style={{ color: "#ffffff", fontWeight: 600, lineHeight: 1.1, maxWidth: 560 }}
            className="text-[2rem] md:text-[2.5rem]"
          >
            From brief to <Em>brilliant</Em> — fast.
          </motion.h2>
        </motion.div>

        {/* Steps — parent staggers children */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10"
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {steps.map((step, i) => (
            <motion.div key={i} variants={fadeUpV}>
              <p style={{ color: "#D6FF5C", fontSize: 13, fontWeight: 700 }} className="mb-2.5">
                {step.num}
              </p>
              <h3 style={{ color: "#ffffff", fontSize: 17, fontWeight: 600 }} className="mb-2">
                {step.title}
              </h3>
              <p style={{ color: "#C9D6CE", fontSize: 14, lineHeight: 1.65 }}>{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. WHAT'S INCLUDED
// ─────────────────────────────────────────────────────────────────────────────
const included = [
  {
    title: "Unlimited requests",
    desc: "Submit as many projects as you want, queue them, prioritize them — we're always moving.",
  },
  {
    title: "Unlimited revisions",
    desc: "We iterate until it's right. No extra charges, no passive-aggressive sighs.",
  },
  {
    title: "30-hour first drafts",
    desc: "Most requests get a first draft within 30 hours, powered by AI and refined by senior creatives.",
  },
  {
    title: "Dedicated project manager",
    desc: "One point of contact, always in the loop. No vanishing acts, no ticket queues.",
  },
  {
    title: "Real-time communication",
    desc: "Always-on support, no waiting days on replies. We stay in your timezone — mentally.",
  },
  {
    title: "Full copyright & IP transfer",
    desc: "You own everything we create, fully and outright. Files, source assets, all yours.",
  },
]

function WhatsIncludedSection() {
  return (
    <section
      style={{ backgroundColor: "#F4F1E8", borderTop: "1px solid #E4E0D4" }}
      className="py-16 md:py-24 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <span
            style={{ color: "#8C9A8C", fontSize: 12, letterSpacing: "0.12em" }}
            className="uppercase font-semibold mb-4 block"
          >
            Every plan includes
          </span>
          <h2
            style={{ color: "#16241C", fontWeight: 600, lineHeight: 1.1, maxWidth: 560 }}
            className="text-[2rem] md:text-[2.5rem] mb-10 md:mb-12"
          >
            Everything you need. <Em>Nothing you don&apos;t.</Em>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {included.map((item, i) => (
            <ScrollReveal key={i} delay={i * 70}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[14px] p-6"
                style={{ backgroundColor: "#ffffff", border: "1px solid #E4E0D4" }}
              >
                <h3 style={{ fontSize: 16, color: "#16241C", fontWeight: 600 }} className="mb-2">
                  {item.title}
                </h3>
                <p style={{ color: "#5C6B62", fontSize: 13, lineHeight: 1.65 }}>{item.desc}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. SERVICES
// ─────────────────────────────────────────────────────────────────────────────
const services = [
  { label: "Brand identity",         lime: false },
  { label: "Marketing & advertising", lime: true  },
  { label: "Digital & web",          lime: false },
  { label: "Motion & video",         lime: false },
  { label: "Print",                  lime: false },
  { label: "Illustration & artwork", lime: true  },
  { label: "Presentations",          lime: false },
  { label: "Product & packaging",    lime: false },
]

function ServicesSection() {
  return (
    <section
      style={{ backgroundColor: "#0B1F17", borderTop: "1px solid #1A332A" }}
      className="py-16 md:py-24 px-6 md:px-16 text-center"
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <span
            style={{ color: "#D6FF5C", fontSize: 12, letterSpacing: "0.12em" }}
            className="uppercase font-semibold mb-4 block"
          >
            One team, every discipline
          </span>
          <h2
            style={{ color: "#ffffff", fontWeight: 600, lineHeight: 1.1 }}
            className="text-[2rem] md:text-[2.5rem] mb-10"
          >
            One team. <Em>Every discipline.</Em>
          </h2>
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center flex-wrap gap-3"
        >
          {services.map((svc, i) => (
            <span
              key={i}
              className="inline-flex items-center px-7 py-3 rounded-full text-sm font-semibold"
              style={
                svc.lime
                  ? { backgroundColor: "#D6FF5C", color: "#16240A" }
                  : { backgroundColor: "#1A332A", color: "#ffffff" }
              }
            >
              {svc.label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. STATS
// Numbers from the mockup — Brendon: update the values below with final data
// ─────────────────────────────────────────────────────────────────────────────
const stats = [
  { value: "150+", label: "Projects completed for founders and brands." },
  { value: "80+",  label: "Happy clients across Nigeria and beyond." },
  { value: "6+",   label: "Years of combined creative experience." },
  { value: "98%",  label: "Client satisfaction across delivered projects." },
]

function StatsSection() {
  return (
    <section
      style={{ backgroundColor: "#F4F1E8", borderTop: "1px solid #E4E0D4" }}
      className="py-16 md:py-24 px-6 md:px-16 text-center"
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <span
            style={{ color: "#8C9A8C", fontSize: 12, letterSpacing: "0.12em" }}
            className="uppercase font-semibold mb-4 block"
          >
            Numbers that speak
          </span>
          <h2
            style={{ color: "#16241C", fontWeight: 600, lineHeight: 1.1 }}
            className="text-[2rem] md:text-[2.5rem] mb-10 md:mb-14"
          >
            The best return on <Em>your investment</Em>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-left">
          {stats.map((s, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
              >
                <p style={{ fontWeight: 400, color: "#16241C", lineHeight: 1 }} className="font-serif text-[2.4rem] md:text-[2.8rem] lg:text-[3rem] mb-2.5">
                  {s.value}
                </p>
                <p style={{ color: "#5C6B62", fontSize: 14, lineHeight: 1.6 }}>{s.label}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. PORTFOLIO — asymmetric 4-col grid, large feature cards
// Layout: [col-span-2 | 1 | 1] row 1  /  [1 | 1 | col-span-2] row 2
// ─────────────────────────────────────────────────────────────────────────────
const portfolioItems = [
  // Row 1
  { src: img.arclly,  title: "ARCLLY",           sub: "Grocery branding",   href: "https://www.behance.net/gallery/209998445/ARCLLY-Grocery-Branding",              span: 2 },
  { src: img.ledga,   title: "LEDGA Finance",     sub: "Brand identity",     href: "https://www.behance.net/gallery/209969707/LEDGA-Full-Branding-and-Identity-Design", span: 1 },
  { src: img.inaara,  title: "Inaara Woman",      sub: "Luxury fashion",     href: "https://inaarawoman.com",                                                        span: 1 },
  // Row 2
  { src: img.assura,  title: "Assura Cash",       sub: "Fintech app",        href: "https://assuracash.com",                                                         span: 1 },
  { src: img.moods,   title: "Moods and Motion",  sub: "Studio platform",    href: "https://moodsandmotion.vercel.app",                                              span: 1 },
  { src: img.alavda,  title: "Alavda Travel",     sub: "Brand identity",     href: "https://www.behance.net/gallery/222946803/Alavda-Travel-Brand-Identity-Design",  span: 2 },
]

function PortfolioSection() {
  return (
    <section
      style={{ backgroundColor: "#F4F1E8", borderTop: "1px solid #E4E0D4" }}
      className="py-16 md:py-24 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header — eyebrow + headline left, CTA right */}
        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10"
        >
          <div>
            <motion.span
              variants={fadeUpV}
              style={{ color: "#8C9A8C", fontSize: 11, letterSpacing: "0.13em" }}
              className="uppercase font-semibold mb-3 block"
            >
              Our work
            </motion.span>
            <motion.h2
              variants={fadeUpV}
              style={{ color: "#16241C", fontWeight: 600, lineHeight: 1.1 }}
              className="text-[2rem] md:text-[2.5rem]"
            >
              See how we build brands{" "}
              <Em>that actually move people</Em>
            </motion.h2>
          </div>

          <motion.div variants={fadeUpV} className="shrink-0">
            <Link
              href="/work"
              style={{
                color: "#16241C",
                border: "1px solid #C0BAA8",
                fontSize: 13,
                fontWeight: 500,
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full hover:bg-[#16241C] hover:text-white hover:border-[#16241C] transition-all"
            >
              Explore all our work
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Asymmetric 4-column card grid — desktop only */}
        <motion.div
          className="hidden lg:grid gap-3"
          style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {portfolioItems.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUpV}
              style={{ gridColumn: `span ${item.span}` }}
            >
              <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                {/* Image */}
                <div
                  className="relative rounded-xl overflow-hidden mb-3"
                  style={{ height: 300 }}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width:1280px) 50vw, 33vw"
                  />
                </div>
                {/* Label */}
                <h3
                  style={{ color: "#16241C", fontSize: 15, fontWeight: 600 }}
                  className="mb-0.5"
                >
                  {item.title}
                </h3>
                <p style={{ color: "#8C9A8C", fontSize: 12 }}>{item.sub}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Tablet: 2-col grid */}
        <div className="hidden md:grid lg:hidden gap-4" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
          {portfolioItems.map((item, i) => (
            <Link key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="group block">
              <div className="relative rounded-xl overflow-hidden mb-3" style={{ height: 240 }}>
                <Image src={item.src} alt={item.title} fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="50vw" />
              </div>
              <h3 style={{ color: "#16241C", fontSize: 15, fontWeight: 600 }} className="mb-0.5">{item.title}</h3>
              <p style={{ color: "#8C9A8C", fontSize: 12 }}>{item.sub}</p>
            </Link>
          ))}
        </div>

        {/* Mobile: single column */}
        <div className="md:hidden flex flex-col gap-6">
          {portfolioItems.map((item, i) => (
            <Link key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="group block">
              <div className="relative rounded-xl overflow-hidden mb-3" style={{ height: 220 }}>
                <Image src={item.src} alt={item.title} fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="100vw" />
              </div>
              <h3 style={{ color: "#16241C", fontSize: 15, fontWeight: 600 }} className="mb-0.5">{item.title}</h3>
              <p style={{ color: "#8C9A8C", fontSize: 12 }}>{item.sub}</p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. COMPARISON — Superside-style attribute table
// Columns: Speed | Flexibility | Quality | Scalability | Efficiency | AI & Strategy
// ─────────────────────────────────────────────────────────────────────────────
const compCols = ["Speed", "Flexibility", "Quality", "Scalability", "Efficiency", "AI & Strategy"]

// true = ✓, false = ✗
const compEntities = [
  {
    name: "Matrix HQ",
    desc: "Senior creative direction and AI-powered systems built to move your brand forward.",
    icon: null, // uses logo mark
    highlight: true,
    checks: [true, true, true, true, true, true],
  },
  {
    name: "In-house team",
    desc: "In-house teams don't always have the skill mix or bandwidth to handle every request that the business needs.",
    icon: <Users className="w-4 h-4" />,
    highlight: false,
    checks: [false, true, true, false, false, false],
  },
  {
    name: "Creative agencies",
    desc: "Traditional agencies can be slow, costly, and built around rigid processes that make it difficult to adapt.",
    icon: <Building2 className="w-4 h-4" />,
    highlight: false,
    checks: [false, false, true, false, false, false],
  },
  {
    name: "Freelancers",
    desc: "Freelancers can be unreliable and hard to scale, leading to inconsistent work and questionable quality.",
    icon: <User className="w-4 h-4" />,
    highlight: false,
    checks: [false, true, false, false, false, false],
  },
  {
    name: "AI tools only",
    desc: "AI tools can increase speed and efficiency, but without human judgment and brand context, they fall short on quality and strategy.",
    icon: <Bot className="w-4 h-4" />,
    highlight: false,
    checks: [true, false, false, true, true, false],
  },
]

function ComparisonSection() {
  return (
    <section
      style={{ backgroundColor: "#0B1F17", borderTop: "1px solid #1A332A" }}
      className="py-20 md:py-28 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header — centered */}
        <motion.div
          className="text-center mb-14"
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.span
            variants={fadeUpV}
            style={{ color: "#D6FF5C", fontSize: 11, letterSpacing: "0.13em" }}
            className="uppercase font-semibold mb-4 block"
          >
            Matrix HQ vs. the alternatives
          </motion.span>
          <motion.h2
            variants={fadeUpV}
            style={{ color: "#ffffff", fontWeight: 600, lineHeight: 1.1 }}
            className="text-[2rem] md:text-[2.6rem]"
          >
            Hiring or traditional outsourcing?{" "}
            <Em>Neither.</Em>
          </motion.h2>
        </motion.div>

        {/* Table */}
        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Column header row */}
          <div
            className="hidden lg:grid mb-2 px-5"
            style={{ gridTemplateColumns: "2.4fr repeat(6, 1fr)" }}
          >
            <div /> {/* empty left cell */}
            {compCols.map((col) => (
              <div key={col} className="text-center">
                <span style={{ color: "#7C8C82", fontSize: 11, letterSpacing: "0.08em", fontWeight: 600 }}
                  className="uppercase">
                  {col}
                </span>
              </div>
            ))}
          </div>

          {/* Entity rows */}
          <div className="flex flex-col gap-2">
            {compEntities.map((entity, i) => (
              <motion.div
                key={i}
                variants={fadeUpV}
                className="hidden lg:grid rounded-2xl px-5 py-5 items-center"
                style={{
                  gridTemplateColumns: "2.4fr repeat(6, 1fr)",
                  backgroundColor: entity.highlight ? "#D6FF5C" : "#0F2B20",
                  border: entity.highlight ? "none" : "1px solid #1A332A",
                }}
              >
                {/* Entity name + desc */}
                <div className="flex items-start gap-3 pr-6">
                  {entity.highlight ? (
                    /* Matrix HQ logo mark */
                    <div
                      className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: "#16240A" }}
                    >
                      <span style={{ color: "#D6FF5C", fontSize: 10, fontWeight: 800, letterSpacing: "0.05em" }}>
                        MHQ
                      </span>
                    </div>
                  ) : (
                    <div
                      className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: "#1A332A", color: "#7C8C82" }}
                    >
                      {entity.icon}
                    </div>
                  )}
                  <div>
                    <p style={{
                      color: entity.highlight ? "#16240A" : "#E8F0EC",
                      fontSize: 14,
                      fontWeight: 700,
                      lineHeight: 1.2,
                    }}
                      className="mb-0.5"
                    >
                      {entity.name}
                    </p>
                    <p style={{
                      color: entity.highlight ? "#2E4A1E" : "#8CA89A",
                      fontSize: 12,
                      lineHeight: 1.5,
                    }}>
                      {entity.desc}
                    </p>
                  </div>
                </div>

                {/* Check / X cells */}
                {entity.checks.map((pass, ci) => (
                  <div key={ci} className="flex items-center justify-center">
                    {pass ? (
                      <Check
                        strokeWidth={2.5}
                        className="w-4 h-4"
                        style={{ color: entity.highlight ? "#16240A" : "#C9D6CE" }}
                      />
                    ) : (
                      <X
                        strokeWidth={2}
                        className="w-4 h-4"
                        style={{ color: entity.highlight ? "#2E4A1E" : "#3D5E4C" }}
                      />
                    )}
                  </div>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Mobile + tablet fallback — stacked cards */}
          <div className="lg:hidden flex flex-col gap-3">
            {compEntities.map((entity, i) => (
              <div
                key={i}
                className="rounded-2xl p-5"
                style={{
                  backgroundColor: entity.highlight ? "#D6FF5C" : "#0F2B20",
                  border: entity.highlight ? "none" : "1px solid #1A332A",
                }}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div
                    className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: entity.highlight ? "#16240A" : "#1A332A", color: entity.highlight ? "#D6FF5C" : "#7C8C82" }}
                  >
                    {entity.highlight ? (
                      <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.05em" }}>MHQ</span>
                    ) : entity.icon}
                  </div>
                  <div>
                    <p style={{ color: entity.highlight ? "#16240A" : "#E8F0EC", fontSize: 14, fontWeight: 700 }} className="mb-0.5">
                      {entity.name}
                    </p>
                    <p style={{ color: entity.highlight ? "#2E4A1E" : "#8CA89A", fontSize: 12, lineHeight: 1.5 }}>
                      {entity.desc}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {compCols.map((col, ci) => (
                    <div
                      key={ci}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                      style={{ backgroundColor: entity.highlight ? "#16240A20" : "#1A332A" }}
                    >
                      {entity.checks[ci] ? (
                        <Check strokeWidth={2.5} className="w-3 h-3" style={{ color: entity.highlight ? "#16240A" : "#C9D6CE" }} />
                      ) : (
                        <X strokeWidth={2} className="w-3 h-3" style={{ color: entity.highlight ? "#2E4A1E" : "#2A4538" }} />
                      )}
                      <span style={{ color: entity.highlight ? "#16240A" : "#7C8C82", fontSize: 11, fontWeight: 500 }}>
                        {col}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. PRICING
// ─────────────────────────────────────────────────────────────────────────────
const tiers = [
  {
    tier: "Tier 01",
    name: "Small Business",
    desc: "For founders and small teams who need a reliable creative partner without the agency overhead.",
    ngn: "₦249,999",
    usd: "$399",
    badge: "Save ₦2.5M+ vs a Lagos agency retainer",
    requests: "2 at a time",
    revisions: "Unlimited",
    popular: false,
  },
  {
    tier: "Tier 02",
    name: "Marketing & Ads",
    desc: "For startups and growing SMBs running active campaigns who need creative at the speed of their marketing.",
    ngn: "₦499,999",
    usd: "$799",
    badge: "Equivalent to 1 junior designer's salary — but a full team",
    requests: "4 at a time",
    revisions: "Unlimited",
    popular: true,
  },
  {
    tier: "Tier 03",
    name: "Agency",
    desc: "For agencies and in-house teams who need white-label creative capacity they can scale without hiring.",
    ngn: "₦899,999",
    usd: "$1,399",
    badge: "Replace a 3-person in-house team at a fraction of the cost",
    requests: "Unlimited",
    revisions: "Unlimited",
    popular: false,
  },
]

function PricingSection({
  currency,
  setCurrency,
}: {
  currency: "ngn" | "usd"
  setCurrency: (c: "ngn" | "usd") => void
}) {
  return (
    <section
      style={{ backgroundColor: "#0B1F17", borderTop: "1px solid #1A332A" }}
      className="py-16 md:py-24 px-6 md:px-16 text-center"
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <span
            style={{ color: "#D6FF5C", fontSize: 12, letterSpacing: "0.12em" }}
            className="uppercase font-semibold mb-4 block"
          >
            Simple, transparent pricing
          </span>
          <h2
            style={{ color: "#ffffff", fontWeight: 600, lineHeight: 1.15 }}
            className="text-3xl md:text-4xl mb-3"
          >
            Choose your plan.
          </h2>
          <p style={{ color: "#C9D6CE", fontSize: 15 }} className="mb-8">
            Unlimited design. One flat rate. No surprises.
          </p>

          {/* Currency toggle */}
          <div
            className="inline-flex p-1 rounded-full mb-10 max-w-full"
            style={{ backgroundColor: "#142B22", border: "1px solid #1A332A" }}
          >
            {(["ngn", "usd"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap"
                style={
                  currency === c
                    ? { backgroundColor: "#D6FF5C", color: "#16240A" }
                    : { color: "#7C8C82", background: "transparent" }
                }
              >
                {c === "ngn" ? "Nigeria (₦)" : "International ($)"}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-225 mx-auto text-left">
          {tiers.map((tier, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.09 }}
                className="relative rounded-[14px] p-6 flex flex-col h-full"
                style={{
                  backgroundColor: "#142B22",
                  border: tier.popular ? "2px solid #D6FF5C" : "1px solid #1A332A",
                }}
              >
                {tier.popular && (
                  <span
                    className="absolute -top-3 left-5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                    style={{ backgroundColor: "#D6FF5C", color: "#16240A" }}
                  >
                    Most popular
                  </span>
                )}

                <p
                  style={{ color: "#7C8C82", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em" }}
                  className="mb-2 mt-2"
                >
                  {tier.tier}
                </p>
                <h3 style={{ color: "#ffffff", fontSize: 18, fontWeight: 600 }} className="mb-1.5">
                  {tier.name}
                </h3>
                <p style={{ color: "#C9D6CE", fontSize: 12, lineHeight: 1.65 }} className="mb-4">
                  {tier.desc}
                </p>

                {/* Price */}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currency}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    style={{ color: "#ffffff", fontSize: 30, fontWeight: 700 }}
                    className="mb-0.5"
                  >
                    {currency === "ngn" ? tier.ngn : tier.usd}
                    <span style={{ fontSize: 13, color: "#7C8C82", fontWeight: 400 }}>/mo</span>
                  </motion.p>
                </AnimatePresence>

                <p style={{ color: "#D6FF5C", fontSize: 11 }} className="mb-4">
                  {tier.badge}
                </p>

                <p style={{ color: "#C9D6CE", fontSize: 13 }} className="mb-6">
                  {tier.requests} active requests · {tier.revisions} revisions
                </p>

                {/* Features */}
                <div className="space-y-2 mb-7 flex-1">
                  {["30-hr first draft", "Dedicated project manager", "IP transfer on delivery"].map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <Check style={{ color: "#D6FF5C" }} className="w-3.5 h-3.5 shrink-0" />
                      <span style={{ color: "#C9D6CE", fontSize: 12 }}>{f}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="https://wa.me/2347045985964"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
                  style={
                    tier.popular
                      ? { backgroundColor: "#D6FF5C", color: "#16240A" }
                      : { backgroundColor: "#244A38", color: "#ffffff" }
                  }
                >
                  Get started
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={250}>
          <div className="mt-8">
            <Link
              href="/contact"
              style={{ color: "#7C8C82", fontSize: 13 }}
              className="inline-flex items-center gap-1.5 hover:opacity-70 transition-opacity group"
            >
              View full pricing &amp; compare plans
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. TESTIMONIALS
// Content sourced from existing testimonials-section.tsx (principles + values)
// Replace cards with real client quotes once collected
// ─────────────────────────────────────────────────────────────────────────────
const testimonialCards = [
  {
    quote:
      "We move fast, but we never cut corners. Every pixel, every line of code, every brand decision is deliberate — because speed without quality is just noise.",
    name: "Speed Without Compromise",
    role: "Our first principle",
  },
  {
    quote:
      "We don't just design for today. We architect systems that scale with your ambition and evolve with your business — built to last, designed to grow.",
    name: "Built for Growth",
    role: "Our second principle",
  },
  {
    quote:
      "Technology is our tool, but empathy is our foundation. We build brands that connect with real people — because great design starts with understanding who you're talking to.",
    name: "Human-Centered",
    role: "Our third principle",
  },
]

function TestimonialsSection() {
  return (
    <section
      style={{ backgroundColor: "#F4F1E8", borderTop: "1px solid #E4E0D4" }}
      className="py-16 md:py-24 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <span
            style={{ color: "#8C9A8C", fontSize: 12, letterSpacing: "0.12em" }}
            className="uppercase font-semibold mb-4 block text-center"
          >
            How we show up
          </span>
          <h2
            style={{ color: "#16241C", fontWeight: 600, lineHeight: 1.15 }}
            className="text-3xl md:text-4xl mb-10 text-center"
          >
            Creative wins, <Em>built on principle</Em>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonialCards.map((card, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                className="rounded-[14px] p-6"
                style={{ backgroundColor: "#ffffff", border: "1px solid #E4E0D4" }}
              >
                <p
                  style={{ color: "#16241C", fontSize: 14, lineHeight: 1.65 }}
                  className="mb-5"
                >
                  &ldquo;{card.quote}&rdquo;
                </p>
                <div>
                  <p style={{ color: "#16241C", fontSize: 13, fontWeight: 600 }}>{card.name}</p>
                  <p style={{ color: "#8C9A8C", fontSize: 12 }}>{card.role}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 11. FINAL CTA — 2×2 panel grid (dark text | image / image | green text)
// ─────────────────────────────────────────────────────────────────────────────
function FinalCTASection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2">

      {/* Panel 1 — dark, top-left */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: BEZIER }}
        className="flex flex-col justify-center px-10 py-14 md:px-14 md:py-16"
        style={{ backgroundColor: "#111110", minHeight: "clamp(380px, 52vh, 600px)" }}
      >
        <div>
          {/* Eyebrow with extending line */}
          <div className="flex items-center gap-4 mb-10">
            <span
              style={{ color: "#6B6B68", fontSize: 10, letterSpacing: "0.14em", fontWeight: 600, whiteSpace: "nowrap" }}
              className="uppercase shrink-0"
            >
              Work with the best
            </span>
            <div style={{ height: 1, backgroundColor: "#2E2E2C", flexGrow: 1 }} />
          </div>

          {/* Headline */}
          <h2
            style={{ color: "#F0EDE6", fontWeight: 600, lineHeight: 1.1 }}
            className="text-3xl md:text-4xl lg:text-[2.6rem] mb-8"
          >
            <span style={{ color: "#D6FF5C" }}><Em>Senior creative talent</Em></span>{" "}
            setting a higher standard
          </h2>

          {/* Sub */}
          <p style={{ color: "#B8B5AE", fontSize: 17, lineHeight: 1.5, fontWeight: 400 }} className="mb-4 max-w-sm">
            Work with top designers, brand strategists, motion artists, copywriters, and AI-first creatives.
          </p>
          <p style={{ color: "#6B6B68", fontSize: 13, lineHeight: 1.6 }} className="max-w-sm">
            Handpicked from Nigeria&apos;s top agencies and studios, every creative brings sharp craft, strategic
            thinking, and AI-first fluency to every brief. Your dedicated project manager keeps everything
            aligned from brief to final delivery.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-10">
          <Link
            href="https://wa.me/2347045985964"
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: "#D6FF5C", color: "#16240A" }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Book a call
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </motion.div>

      {/* Panel 2 — image, top-right */}
      <div className="relative order-first md:order-none" style={{ minHeight: "clamp(280px, 52vh, 600px)" }}>
        <Image
          src="https://res.cloudinary.com/du5nhfcgd/image/upload/q_auto/f_auto/v1781997921/f00df1a79117e18a5d50dbda8f2f9769773d9531-1440x1380-ezgif.com-avif-to-png-converter_dr9r7j.png"
          alt="World-class creative talent"
          fill
          className="object-cover object-top"
          sizes="(max-width:768px) 100vw, 50vw"
        />
      </div>

      {/* Panel 3 — image, bottom-left */}
      <div className="relative" style={{ minHeight: "clamp(280px, 52vh, 600px)" }}>
        <Image
          src="https://res.cloudinary.com/du5nhfcgd/image/upload/q_auto/f_auto/v1781997921/e6d424323b337be2e81d6dda2d974e2dce50d273-1440x1380-ezgif.com-avif-to-png-converter_q0h8t3.png"
          alt="Creative capacity without the burnout"
          fill
          className="object-cover object-center"
          sizes="(max-width:768px) 100vw, 50vw"
        />
      </div>

      {/* Panel 4 — forest green, bottom-right */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: BEZIER, delay: 0.1 }}
        className="flex flex-col justify-center px-10 py-14 md:px-14 md:py-16"
        style={{ backgroundColor: "#0D4A32", minHeight: "clamp(380px, 52vh, 600px)" }}
      >
        <div>
          {/* Eyebrow with extending line */}
          <div className="flex items-center gap-4 mb-10">
            <span
              style={{ color: "#3A7A5C", fontSize: 10, letterSpacing: "0.14em", fontWeight: 600, whiteSpace: "nowrap" }}
              className="uppercase shrink-0"
            >
              Creative capacity on demand
            </span>
            <div style={{ height: 1, backgroundColor: "#1A5C3A", flexGrow: 1 }} />
          </div>

          {/* Headline */}
          <h2
            style={{ color: "#D6F0E0", fontWeight: 600, lineHeight: 1.1 }}
            className="text-3xl md:text-4xl lg:text-[2.6rem] mb-8"
          >
            Your brand <Em>deserves better{" "}<br className="hidden lg:block" />than bottlenecks</Em>
          </h2>

          {/* Sub */}
          <p style={{ color: "#8FC9A8", fontSize: 17, lineHeight: 1.5, fontWeight: 400 }} className="mb-4 max-w-sm">
            In-house teams are the heart of your brand — but endless requests and limited bandwidth mean
            something always slips.
          </p>
          <p style={{ color: "#4A7A60", fontSize: 13, lineHeight: 1.6 }} className="max-w-sm">
            Matrix HQ steps in to absorb the pressure without the overhead of hiring. There&apos;s a smarter
            way to scale your creative output — and it&apos;s not another agency or more freelancers.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-10">
          <Link
            href="https://wa.me/2347045985964"
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: "#D6FF5C", color: "#16240A" }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Book a call
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </motion.div>

    </section>
  )
}
