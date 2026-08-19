"use client"

// ─────────────────────────────────────────────────────────────────────────────
// /why-us/creative-talent
// Design system: #0B1F17 dark · #F4F1E8 light · #D6FF5C lime
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from "react"
import {
  motion,
  AnimatePresence,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Play, Zap, Users, RefreshCw, Clock, Layers } from "lucide-react"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"

// ── Tokens ────────────────────────────────────────────────────────────────────
const BEZIER = [0.25, 0, 0, 1] as [number, number, number, number]

function Em({ children }: { children: React.ReactNode }) {
  return <span className="font-serif italic font-normal">{children}</span>
}

const containerV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0 } },
}
const fadeUpV = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: BEZIER } },
}

// ── Images ────────────────────────────────────────────────────────────────────
const IMG_HERO =
  "https://res.cloudinary.com/du5nhfcgd/image/upload/q_auto/f_auto/v1782001434/pexels-mikael-blomkvist-4153232_k0fnhi.jpg"
const IMG_TEAM =
  "https://res.cloudinary.com/du5nhfcgd/image/upload/q_auto/f_auto/v1782063545/c4f5fdeae73ba665af447d9bd9bebc04d58ff18f-2271x1244_juqkee.png"
const IMG_PLATFORM =
  "https://res.cloudinary.com/du5nhfcgd/image/upload/q_auto/f_auto/v1782064195/Screenshot_2026-06-21_184515_vk3vil.png"
const IMG_HASSLE =
  "https://res.cloudinary.com/du5nhfcgd/image/upload/q_auto/f_auto/v1782063545/28a1f76e6878dad07b97960100aa78611c4514ee-900x900_kbmsjw.png"
const IMG_CROSSLINK_AI =
  "https://res.cloudinary.com/du5nhfcgd/image/upload/q_auto/f_auto/v1782064179/9e39c26bfebcfade6f69e77af31e775f53f09c5d-1050x1200_k2hsqd.png"
const IMG_CROSSLINK_TECH =
  "https://res.cloudinary.com/du5nhfcgd/image/upload/q_auto/f_auto/v1782064180/739d30f2ecb844e9c1186e62ca63efbda518ff4a-1050x1200_dq9zvt.png"

const TALENT = [
  { src: "https://res.cloudinary.com/du5nhfcgd/image/upload/q_auto/f_auto/v1782063544/pexels-gustavo-fring-4871953_om4uaf.jpg",               specialty: "Illustration" },
  { src: "https://res.cloudinary.com/du5nhfcgd/image/upload/q_auto/f_auto/v1782063543/pexels-lucretius-mooka-2554524-28278434_q8hdzz.jpg",    specialty: "Brand Design" },
  { src: "https://res.cloudinary.com/du5nhfcgd/image/upload/q_auto/f_auto/v1782063543/pexels-jedidiahjordan-15135912_fyithm.jpg",              specialty: "Motion Design" },
  { src: "https://res.cloudinary.com/du5nhfcgd/image/upload/q_auto/f_auto/v1782063543/pexels-jonathankwuka-17259961_hhneqo.jpg",               specialty: "Web Design" },
  { src: "https://res.cloudinary.com/du5nhfcgd/image/upload/q_auto/f_auto/v1782063543/pexels-bakarii_photography-2159420192-36322500_yaii8n.jpg", specialty: "Art Direction" },
]

// ── Shared micro-interaction components ───────────────────────────────────────
function PillCTA({
  href,
  children,
  primary = true,
  external = false,
}: {
  href: string
  children: React.ReactNode
  primary?: boolean
  external?: boolean
}) {
  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
        style={
          primary
            ? { backgroundColor: "#D6FF5C", color: "#16240A" }
            : { color: "#ffffff", border: "1px solid rgba(255,255,255,0.25)" }
        }
      >
        {children}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </motion.div>
  )
}

// Count-up number with cubic ease-out
function CountUp({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const spanRef = useRef<HTMLSpanElement>(null)
  const inView  = useInView(spanRef, { once: true, margin: "-60px" })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const dur = 1600
    const t0  = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1)
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * to))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, to])

  return <span ref={spanRef}>{prefix}{val}{suffix}</span>
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. HERO
// ─────────────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-end pb-24 pt-40 overflow-hidden">
      <div className="absolute inset-0">
        <Image src={IMG_HERO} alt="" fill priority className="object-cover object-center" sizes="100vw" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(11,31,23,0.72) 0%, rgba(11,31,23,0.18) 38%, rgba(11,31,23,0.88) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 w-full">
        <motion.div variants={containerV} initial="hidden" animate="visible" className="max-w-3xl">
          <motion.span
            variants={fadeUpV}
            className="uppercase font-semibold mb-5 block"
            style={{ color: "#D6FF5C", fontSize: 11, letterSpacing: "0.15em" }}
          >
            Our creative talent
          </motion.span>

          <motion.h1
            variants={fadeUpV}
            className="text-[2.3rem] sm:text-[3rem] lg:text-[3.8rem] mb-6"
            style={{ color: "#ffffff", fontWeight: 600, lineHeight: 1.06 }}
          >
            Partner with world-class creative talent,
            <br />
            <Em>without the hassle of hiring.</Em>
          </motion.h1>

          <motion.p
            variants={fadeUpV}
            style={{ color: "#C9D6CE", fontSize: 17, lineHeight: 1.65, maxWidth: 520 }}
            className="mb-10"
          >
            A small, heavily vetted roster of senior designers, brand strategists, motion
            artists, and copywriters. Every file reviewed by an Art Director before it
            reaches you. Fast because of AI. Sharp because of people.
          </motion.p>

          <motion.div variants={fadeUpV} className="flex flex-wrap gap-3">
            <PillCTA href="https://wa.me/2347045985964" external>Work with us</PillCTA>
            <PillCTA href="/pricing" primary={false}>See pricing</PillCTA>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. STAT / QUOTE COLLAGE
// ─────────────────────────────────────────────────────────────────────────────
type StatCard  = { kind: "stat";  value: string; label: string; bg: string; fg: string }
type QuoteCard = { kind: "quote"; quote: string; attr: string }
type Card      = (StatCard | QuoteCard) & {
  rotate: number; x: string; y: string; floatDy: number; floatDur: number; delay: number
}

const CARDS: Card[] = [
  { kind: "stat",  value: "98%",  label: "Client satisfaction across all delivered projects",   bg: "#D6FF5C", fg: "#16240A", rotate: -2.5, x: "3%",  y: "8%",  floatDy: 7,  floatDur: 3.8, delay: 0    },
  { kind: "stat",  value: "150+", label: "Projects completed for founders and growth brands",   bg: "#142B22", fg: "#ffffff", rotate:  1.8, x: "35%", y: "2%",  floatDy: 6,  floatDur: 4.5, delay: 0.55 },
  { kind: "stat",  value: "30hr", label: "First draft turnaround — brief to concept in one day", bg: "#F4F1E8", fg: "#16241C", rotate: -1.2, x: "65%", y: "18%", floatDy: 5,  floatDur: 3.3, delay: 1.1  },
  // ── PLACEHOLDER — Brendon: swap the quote and attr with a real client testimonial ──
  { kind: "quote", quote: "PLACEHOLDER — replace with a real client quote before launch.", attr: "Client Name · Founder, Company", rotate:  2.2, x: "6%",  y: "58%", floatDy: 8,  floatDur: 5.0, delay: 0.3  },
  { kind: "stat",  value: "80+",  label: "Happy clients served across Nigeria and beyond",       bg: "#0B1F17", fg: "#D6FF5C", rotate: -1.8, x: "55%", y: "60%", floatDy: 6,  floatDur: 4.1, delay: 0.9  },
  { kind: "stat",  value: "6+",   label: "Years of combined senior creative experience",         bg: "#D6FF5C", fg: "#16240A", rotate:  1.4, x: "36%", y: "55%", floatDy: 7,  floatDur: 3.6, delay: 1.4  },
]

function FloatingCard({ card }: { card: Card }) {
  return (
    <motion.div
      className="absolute"
      style={{ left: card.x, top: card.y, rotate: card.rotate }}
      animate={{ y: [0, -card.floatDy, 0] }}
      transition={{ duration: card.floatDur, repeat: Infinity, ease: "easeInOut", delay: card.delay }}
      whileHover={{
        y: -4,
        scale: 1.04,
        rotate: 0,
        boxShadow: "0 20px 48px rgba(0,0,0,0.32)",
        transition: { duration: 0.22, ease: BEZIER },
      }}
    >
      {card.kind === "stat" ? (
        <div
          className="rounded-2xl px-5 py-4"
          style={{ backgroundColor: card.bg, minWidth: 155, maxWidth: 215 }}
        >
          <p className="font-serif text-[2.3rem] font-light leading-none mb-1.5" style={{ color: card.fg }}>
            {card.value}
          </p>
          <p style={{ color: card.fg, fontSize: 12, lineHeight: 1.5, opacity: 0.72 }}>{card.label}</p>
        </div>
      ) : (
        <div
          className="rounded-2xl p-5"
          style={{ backgroundColor: "#142B22", border: "1px solid #1A332A", maxWidth: 255 }}
        >
          <p className="font-serif italic mb-3" style={{ color: "#E8F0EC", fontSize: 14, lineHeight: 1.65 }}>
            &ldquo;{card.quote}&rdquo;
          </p>
          <p style={{ color: "#5C7A6A", fontSize: 11, letterSpacing: "0.06em" }}>{card.attr}</p>
          <span
            className="mt-2 inline-block text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded"
            style={{ backgroundColor: "#1A332A", color: "#5C7A6A" }}
          >
            Placeholder — real quote pending
          </span>
        </div>
      )}
    </motion.div>
  )
}

function CollageSection() {
  return (
    <section
      style={{ backgroundColor: "#0B1F17", borderTop: "1px solid #1A332A" }}
      className="py-20 md:py-28 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16 md:mb-20"
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.span
            variants={fadeUpV}
            className="uppercase font-semibold mb-4 block"
            style={{ color: "#D6FF5C", fontSize: 11, letterSpacing: "0.14em" }}
          >
            The numbers
          </motion.span>
          <motion.h2
            variants={fadeUpV}
            className="text-[2rem] md:text-[2.6rem]"
            style={{ color: "#ffffff", fontWeight: 600, lineHeight: 1.1 }}
          >
            The team behind your next brand?{" "}
            <Em>That&apos;s us.</Em>
          </motion.h2>
        </motion.div>

        {/* Desktop scattered collage */}
        <div className="hidden md:block relative" style={{ minHeight: 560 }}>
          {CARDS.map((card, i) => (
            <FloatingCard key={i} card={card} />
          ))}
        </div>

        {/* Mobile 2-col grid fallback */}
        <div className="md:hidden grid grid-cols-2 gap-4">
          {CARDS.map((card, i) =>
            card.kind === "stat" ? (
              <div key={i} className="rounded-2xl px-4 py-4" style={{ backgroundColor: card.bg }}>
                <p className="font-serif text-3xl font-light mb-1" style={{ color: card.fg }}>{card.value}</p>
                <p style={{ color: card.fg, fontSize: 12, lineHeight: 1.5, opacity: 0.72 }}>{card.label}</p>
              </div>
            ) : (
              <div
                key={i}
                className="rounded-2xl p-4 col-span-2"
                style={{ backgroundColor: "#142B22", border: "1px solid #1A332A" }}
              >
                <p className="font-serif italic mb-2" style={{ color: "#E8F0EC", fontSize: 13, lineHeight: 1.65 }}>
                  &ldquo;{card.quote}&rdquo;
                </p>
                <p style={{ color: "#5C7A6A", fontSize: 11 }}>{card.attr}</p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. GLOBAL TEAM SECTION
// ─────────────────────────────────────────────────────────────────────────────
function GlobalTeamSection() {
  const insetRef  = useRef<HTMLDivElement>(null)
  const insetView = useInView(insetRef, { once: true, margin: "-80px" })

  return (
    <section
      style={{ backgroundColor: "#F4F1E8", borderTop: "1px solid #E4E0D4" }}
      className="py-20 md:py-28 px-6 md:px-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

        {/* Image block */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: BEZIER }}
        >
          {/* Main image */}
          <div
            className="relative rounded-[20px] overflow-hidden"
            style={{ height: "clamp(300px, 44vw, 520px)", border: "1px solid #E4E0D4" }}
          >
            <Image
              src={IMG_TEAM}
              alt="Matrix HQ creative team"
              fill
              className="object-cover object-center"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>

          {/* Overlapping inset — uses hero image as candid companion shot */}
          <motion.div
            ref={insetRef}
            className="absolute -bottom-4 -right-4 sm:bottom-0 sm:right-0 sm:translate-x-5 sm:translate-y-5 rounded-2xl overflow-hidden shadow-2xl"
            style={{
              width: "clamp(110px, 26%, 170px)",
              height: "clamp(110px, 26%, 170px)",
              border: "4px solid #F4F1E8",
            }}
            initial={{ scale: 0.78, opacity: 0 }}
            animate={insetView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, ease: BEZIER, delay: 0.35 }}
          >
            <Image src={IMG_HERO} alt="Creative work in progress" fill className="object-cover" sizes="170px" />
          </motion.div>

          {/* Badge */}
          <div
            className="absolute top-5 left-5 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider"
            style={{ backgroundColor: "#D6FF5C", color: "#16240A" }}
          >
            World-class talent
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.span
            variants={fadeUpV}
            className="uppercase font-semibold mb-4 block"
            style={{ color: "#8C9A8C", fontSize: 11, letterSpacing: "0.13em" }}
          >
            Vetted and ready
          </motion.span>
          <motion.h2
            variants={fadeUpV}
            className="text-[1.9rem] md:text-[2.4rem] mb-6"
            style={{ color: "#16241C", fontWeight: 600, lineHeight: 1.1 }}
          >
            The best talent, <Em>vetted and ready</Em> the moment you need them.
          </motion.h2>
          <motion.p variants={fadeUpV} style={{ color: "#5C6B62", fontSize: 16, lineHeight: 1.75 }} className="mb-6">
            When we say world-class, we really mean it. Every creative on the Matrix HQ
            roster has been rigorously reviewed across craft, communication, and professional
            delivery. We don&apos;t hire juniors to scale — we partner with Nigeria&apos;s
            best and hold that standard.
          </motion.p>
          <motion.p variants={fadeUpV} style={{ color: "#8C9A8C", fontSize: 15, lineHeight: 1.7 }} className="mb-8">
            From brand directors and UX leads to motion designers and copywriters — your
            subscription gives you the full stack, not just one speciality.
          </motion.p>
          <motion.div variants={fadeUpV}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold"
                style={{ backgroundColor: "#16241C", color: "#ffffff" }}
              >
                About our team <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. PROCESS SECTION
// ─────────────────────────────────────────────────────────────────────────────
const CHECKLIST = [
  { icon: Clock,     title: "30-hour first draft",        desc: "Brief to first creative concept in under one business day, guaranteed." },
  { icon: Zap,       title: "AI-enhanced drafting",       desc: "Generative AI accelerates ideation — every output refined by a senior creative before it reaches you." },
  { icon: Users,     title: "Dedicated project manager",  desc: "One PM owns your brief from intake to delivery. No hand-off gaps, no chasing updates." },
  { icon: RefreshCw, title: "Consistent creative team",   desc: "Your team learns your brand over time. No re-briefing a stranger every project." },
  { icon: Layers,    title: "Unlimited iterations",       desc: "Request as many revision rounds as you need. No revision fees, ever." },
]

function ProcessSection() {
  const imgRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] })
  const imgY = useTransform(scrollYProgress, [0, 1], [24, -24])

  return (
    <section
      style={{ backgroundColor: "#0B1F17", borderTop: "1px solid #1A332A" }}
      className="py-20 md:py-28 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

        {/* Left — copy, stats, checklist */}
        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.span
            variants={fadeUpV}
            className="uppercase font-semibold mb-4 block"
            style={{ color: "#D6FF5C", fontSize: 11, letterSpacing: "0.14em" }}
          >
            How we work
          </motion.span>
          <motion.h2
            variants={fadeUpV}
            className="text-[1.9rem] md:text-[2.4rem] mb-6"
            style={{ color: "#ffffff", fontWeight: 600, lineHeight: 1.1 }}
          >
            Creative speed. <Em>Without the chaos.</Em>
          </motion.h2>
          <motion.p variants={fadeUpV} style={{ color: "#8CA89A", fontSize: 16, lineHeight: 1.7 }} className="mb-10">
            Our model was built to eliminate bottlenecks — slow briefing, unclear ownership,
            missed deadlines. Every system in our process is designed around speed,
            consistency, and quality at the same time.
          </motion.p>

          {/* Count-up pair */}
          <motion.div variants={fadeUpV} className="flex gap-10 mb-12">
            {[
              { to: 150, suffix: "+", label: "Projects delivered on time" },
              { to: 98,  suffix: "%", label: "Client satisfaction rate" },
            ].map(({ to, suffix, label }) => (
              <div key={label}>
                <p className="font-serif leading-none mb-2" style={{ color: "#D6FF5C", fontSize: "clamp(2.6rem,5vw,3.8rem)", fontWeight: 300 }}>
                  <CountUp to={to} suffix={suffix} />
                </p>
                <p style={{ color: "#5C7A6A", fontSize: 13 }}>{label}</p>
              </div>
            ))}
          </motion.div>

          {/* Checklist */}
          <div className="space-y-5 mb-10">
            {CHECKLIST.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.48, delay: i * 0.08, ease: BEZIER }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ backgroundColor: "#1A332A" }}
                >
                  <Icon className="w-4 h-4" style={{ color: "#D6FF5C" }} />
                </div>
                <div>
                  <p style={{ color: "#E8F0EC", fontSize: 14, fontWeight: 600 }} className="mb-0.5">{title}</p>
                  <p style={{ color: "#5C7A6A", fontSize: 13, lineHeight: 1.65 }}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <PillCTA href="/pricing">Start your subscription</PillCTA>
        </motion.div>

        {/* Right — platform screenshot with parallax */}
        <div ref={imgRef} className="lg:sticky lg:top-28">
          <motion.div
            style={{ y: imgY }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: BEZIER }}
            className="relative rounded-2xl overflow-hidden"
            // ── single style object prevents double-style conflict ──
            // (motion values + CSS merged together)
          >
            {/* border applied via className to avoid style conflict with motion y */}
            <div className="relative rounded-2xl overflow-hidden" style={{ border: "1px solid #1A332A" }}>
              <Image
                src={IMG_PLATFORM}
                alt="Matrix HQ workflow platform screenshot"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
            <div
              className="absolute bottom-5 left-5 rounded-xl px-4 py-3"
              style={{
                backgroundColor: "rgba(11,31,23,0.92)",
                border: "1px solid #1A332A",
                backdropFilter: "blur(8px)",
              }}
            >
              <p style={{ color: "#D6FF5C", fontSize: 10, fontWeight: 600, letterSpacing: "0.12em" }}
                className="uppercase mb-0.5">
                Live workflow
              </p>
              <p style={{ color: "#C9D6CE", fontSize: 13 }}>Brief → draft in 30 hours</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. COLLABORATE ACROSS DISCIPLINES
// ─────────────────────────────────────────────────────────────────────────────

// 3×3: 5 talent images + center logo + 3 decorative tiles
const MOSAIC_TILES = [
  { type: "img",  src: TALENT[0].src },
  { type: "img",  src: TALENT[1].src },
  { type: "img",  src: TALENT[2].src },
  { type: "img",  src: TALENT[3].src },
  { type: "logo" },
  { type: "img",  src: TALENT[4].src },
  { type: "lime", text: "Creative.\nHuman.\nFast." },
  { type: "dark", stat: "5+", label: "disciplines" },
  { type: "lime", text: "Senior\nonly." },
] as const

function MosaicGrid() {
  return (
    <div className="grid grid-cols-3 gap-2" style={{ aspectRatio: "1/1" }}>
      {MOSAIC_TILES.map((tile, i) => (
        <motion.div
          key={i}
          className="relative rounded-xl overflow-hidden group"
          style={{ aspectRatio: "1/1" }}
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: i * 0.04, ease: BEZIER }}
        >
          {tile.type === "img" && (
            <>
              <Image
                src={tile.src}
                alt=""
                fill
                className="object-cover object-center transition-transform duration-[380ms] ease-out group-hover:scale-105"
                sizes="200px"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: "rgba(11,31,23,0.4)" }}
              />
            </>
          )}
          {tile.type === "logo" && (
            <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: "#D6FF5C" }}>
              <span style={{ color: "#16240A", fontSize: "clamp(26px,5vw,40px)", fontWeight: 900 }}>M</span>
            </div>
          )}
          {tile.type === "lime" && (
            <div className="w-full h-full flex items-center justify-center p-3" style={{ backgroundColor: "#D6FF5C" }}>
              <p
                className="text-center font-semibold"
                style={{ color: "#16240A", fontSize: "clamp(12px,2vw,15px)", lineHeight: 1.3, whiteSpace: "pre-line" }}
              >
                {tile.text}
              </p>
            </div>
          )}
          {tile.type === "dark" && (
            <div className="w-full h-full flex flex-col items-center justify-center" style={{ backgroundColor: "#142B22" }}>
              <p className="font-serif font-light" style={{ color: "#D6FF5C", fontSize: "clamp(22px,4vw,32px)" }}>{tile.stat}</p>
              <p className="uppercase" style={{ color: "#5C7A6A", fontSize: 10, letterSpacing: "0.1em" }}>{tile.label}</p>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

function DisciplinesSection() {
  return (
    <section
      style={{ backgroundColor: "#F4F1E8", borderTop: "1px solid #E4E0D4" }}
      className="py-20 md:py-28 px-6 md:px-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-14"
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.span
            variants={fadeUpV}
            className="uppercase font-semibold mb-4 block"
            style={{ color: "#8C9A8C", fontSize: 11, letterSpacing: "0.14em" }}
          >
            Every creative discipline
          </motion.span>
          <motion.h2
            variants={fadeUpV}
            className="text-[2rem] md:text-[2.6rem]"
            style={{ color: "#16241C", fontWeight: 600, lineHeight: 1.1 }}
          >
            Collaborate across <Em>every discipline,</Em> from one place.
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Video placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: BEZIER }}
          >
            <motion.div
              className="relative rounded-2xl overflow-hidden flex items-center justify-center cursor-pointer"
              style={{ backgroundColor: "#0B1F17", border: "1px solid #1A332A", aspectRatio: "16/9" }}
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.3, ease: BEZIER }}
            >
              {/* Pulsing rings */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: 180 + i * 80,
                    height: 180 + i * 80,
                    border: "1px solid rgba(214,255,92,0.1)",
                    top: "50%",
                    left: "50%",
                    translateX: "-50%",
                    translateY: "-50%",
                  }}
                  animate={{ scale: [1, 1.07, 1], opacity: [0.35, 0.75, 0.35] }}
                  transition={{ duration: 3 + i * 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.9 }}
                />
              ))}

              {/* Play button */}
              <motion.div
                className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#D6FF5C" }}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.93 }}
              >
                <Play className="w-6 h-6 ml-0.5" style={{ color: "#16240A" }} />
              </motion.div>

              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                <span
                  className="uppercase font-semibold"
                  style={{ color: "#5C7A6A", fontSize: 11, letterSpacing: "0.1em" }}
                >
                  Matrix HQ — how we work
                </span>
                <span style={{ color: "#3D5E4C", fontSize: 11 }}>▶ 2:30</span>
              </div>
            </motion.div>

            <p style={{ color: "#8C9A8C", fontSize: 13, lineHeight: 1.65 }} className="mt-4">
              From brief to final assets — see how we move from kickoff to delivery in 30 hours.
            </p>
          </motion.div>

          {/* 3×3 mosaic */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: BEZIER, delay: 0.1 }}
          >
            <MosaicGrid />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. HASSLE-FREE SECTION
// ─────────────────────────────────────────────────────────────────────────────
function HassleFreeSection() {
  return (
    <section
      style={{ backgroundColor: "#0B1F17", borderTop: "1px solid #1A332A" }}
      className="py-20 md:py-28 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.span
            variants={fadeUpV}
            className="uppercase font-semibold mb-4 block"
            style={{ color: "#D6FF5C", fontSize: 11, letterSpacing: "0.14em" }}
          >
            Zero overhead
          </motion.span>
          <motion.h2
            variants={fadeUpV}
            className="text-[1.9rem] md:text-[2.4rem] mb-6"
            style={{ color: "#ffffff", fontWeight: 600, lineHeight: 1.1 }}
          >
            Get big creative muscle,{" "}
            <Em>without the growing pains.</Em>
          </motion.h2>
          <motion.p variants={fadeUpV} style={{ color: "#8CA89A", fontSize: 16, lineHeight: 1.75 }} className="mb-6">
            Hiring a creative team takes months and costs a fortune before anyone ships a
            single asset. Freelancers bring inconsistency. Agencies bring overhead and slow
            turnarounds.
          </motion.p>
          <motion.p variants={fadeUpV} style={{ color: "#5C7A6A", fontSize: 15, lineHeight: 1.7 }} className="mb-10">
            Matrix HQ flips the model. Subscribe, brief, receive. No hiring marathon,
            no onboarding overhead, no invoice surprises. Just creative output that moves
            at the speed your business actually needs.
          </motion.p>

          <motion.div variants={fadeUpV} className="space-y-3 mb-10">
            {[
              "No hiring or onboarding required",
              "No long-term contracts or lock-in",
              "No managing individual freelancers",
              "No unexpected invoices or scope creep",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <Check className="w-4 h-4 shrink-0" style={{ color: "#D6FF5C" }} />
                <span style={{ color: "#C9D6CE", fontSize: 14 }}>{item}</span>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUpV}>
            <PillCTA href="https://wa.me/2347045985964" external>Start today</PillCTA>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative rounded-[20px] overflow-hidden"
          style={{ height: "clamp(300px, 50vw, 520px)" }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: BEZIER }}
          whileHover={{ scale: 1.015 }}
        >
          <Image
            src={IMG_HASSLE}
            alt="Get big creative muscle without the growing pains"
            fill
            className="object-cover object-center transition-transform duration-[400ms] ease-out"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0B1F17]/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. CREATIVE SPECIALTIES HORIZONTAL SCROLL STRIP
//    - useMotionValue drives translateX every frame via useAnimationFrame
//    - isPaused ref toggles on mouse enter/leave — instant stop, no stutter on resume
//    - each tile has independent hover state for scale + label reveal
// ─────────────────────────────────────────────────────────────────────────────
const STRIP_W   = 300   // tile width px
const STRIP_H   = 380   // tile height px
const STRIP_MR  = 16    // margin-right per tile (creates uniform gap including at loop boundary)
const LOOP_W    = TALENT.length * (STRIP_W + STRIP_MR)   // = 5 × 316 = 1580 px

function StripTile({ src, specialty }: { src: string; specialty: string }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden shrink-0 cursor-pointer"
      style={{ width: STRIP_W, height: STRIP_H, marginRight: STRIP_MR }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      animate={{ scale: hov ? 1.04 : 1 }}
      transition={{ duration: 0.35, ease: BEZIER }}
    >
      <Image src={src} alt={specialty} fill className="object-cover" sizes={`${STRIP_W}px`} />

      {/* Permanent bottom gradient for label legibility */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{ height: "55%", background: "linear-gradient(to top, rgba(11,31,23,0.9), transparent)" }}
      />

      {/* Specialty label — slides up and brightens on hover */}
      <motion.div
        className="absolute inset-x-0 bottom-0 px-5 pb-5"
        animate={{ y: hov ? 0 : 6, opacity: hov ? 1 : 0.65 }}
        transition={{ duration: 0.28, ease: BEZIER }}
      >
        <span
          className="block uppercase font-semibold mb-0.5"
          style={{ color: "#D6FF5C", fontSize: 10, letterSpacing: "0.14em" }}
        >
          Specialty
        </span>
        <span style={{ color: "#ffffff", fontSize: 18, fontWeight: 600 }}>{specialty}</span>
      </motion.div>

      {/* Subtle tint on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: "rgba(11,31,23,0.22)" }}
        animate={{ opacity: hov ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

function TalentStrip() {
  const x        = useMotionValue(0)
  const isPaused = useRef(false)
  // 4 copies ensures seamless wrap — loop resets after exactly LOOP_W px
  const tiles    = [...TALENT, ...TALENT, ...TALENT, ...TALENT]

  useAnimationFrame((_, delta) => {
    if (isPaused.current) return
    let next = x.get() - delta * 0.055   // 55 px/s
    if (next <= -LOOP_W) next += LOOP_W
    x.set(next)
  })

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => { isPaused.current = true }}
      onMouseLeave={() => { isPaused.current = false }}
      style={{
        maskImage:       "linear-gradient(to right,transparent 0%,black 7%,black 93%,transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right,transparent 0%,black 7%,black 93%,transparent 100%)",
      }}
    >
      {/* motion.div with x motion value — no other transforms needed */}
      <motion.div style={{ x, display: "flex", width: "max-content" }}>
        {tiles.map((t, i) => (
          <StripTile key={i} src={t.src} specialty={t.specialty} />
        ))}
      </motion.div>
    </div>
  )
}

function SpecialtiesSection() {
  return (
    <section
      style={{ backgroundColor: "#F4F1E8", borderTop: "1px solid #E4E0D4" }}
      className="py-20 md:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 mb-12">
        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.span
            variants={fadeUpV}
            className="uppercase font-semibold mb-4 block"
            style={{ color: "#8C9A8C", fontSize: 11, letterSpacing: "0.14em" }}
          >
            The people behind the work
          </motion.span>
          <motion.h2
            variants={fadeUpV}
            className="text-[2rem] md:text-[2.6rem] mb-4"
            style={{ color: "#16241C", fontWeight: 600, lineHeight: 1.1 }}
          >
            The talent behind <Em>every brief.</Em>
          </motion.h2>
          <motion.p
            variants={fadeUpV}
            style={{ color: "#5C6B62", fontSize: 16, lineHeight: 1.7, maxWidth: 540 }}
          >
            Hover to pause — each creative is a specialist, not a generalist wearing too many
            hats. That&apos;s how we maintain quality across every discipline.
          </motion.p>
        </motion.div>
      </div>

      <TalentStrip />
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. CREATIVE SUPPORT SECTION
// ─────────────────────────────────────────────────────────────────────────────
function CreativeSupportSection() {
  return (
    <section
      style={{ backgroundColor: "#0B1F17", borderTop: "1px solid #1A332A" }}
      className="py-20 md:py-28 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        {/* Image — left on desktop, below text on mobile */}
        <motion.div
          className="relative rounded-[20px] overflow-hidden order-last lg:order-first"
          style={{ height: "clamp(300px, 46vw, 500px)" }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: BEZIER }}
          whileHover={{ scale: 1.015 }}
        >
          <Image
            src={IMG_TEAM}
            alt="Creative support and collaboration"
            fill
            className="object-cover object-center transition-transform duration-[400ms] ease-out"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0B1F17]/35 to-transparent" />
        </motion.div>

        {/* Text */}
        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.span
            variants={fadeUpV}
            className="uppercase font-semibold mb-4 block"
            style={{ color: "#D6FF5C", fontSize: 11, letterSpacing: "0.14em" }}
          >
            Always in your corner
          </motion.span>
          <motion.h2
            variants={fadeUpV}
            className="text-[1.9rem] md:text-[2.4rem] mb-6"
            style={{ color: "#ffffff", fontWeight: 600, lineHeight: 1.1 }}
          >
            Creative support that <Em>never drops the ball.</Em>
          </motion.h2>
          <motion.p variants={fadeUpV} style={{ color: "#8CA89A", fontSize: 16, lineHeight: 1.75 }} className="mb-6">
            You get a dedicated team who understands your brand, your tone, and your standards
            — without re-briefing every time. Your PM tracks every request, your creative
            team stays consistent, and you stay in the loop at every stage.
          </motion.p>
          <motion.p variants={fadeUpV} style={{ color: "#5C7A6A", fontSize: 15, lineHeight: 1.7 }} className="mb-10">
            Think of us less as a service and more as an extension of your in-house team —
            always available, always aligned, always delivering.
          </motion.p>
          <motion.div variants={fadeUpV} className="flex flex-wrap gap-3">
            <PillCTA href="https://wa.me/2347045985964" external>Start now</PillCTA>
            <PillCTA href="/about" primary={false}>Learn about us</PillCTA>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. CROSS-LINK ROW
// ─────────────────────────────────────────────────────────────────────────────
const WHY_US = [
  {
    href: "/why-us/creative-talent",
    label: "Our Creative Talent",
    desc:  "World-class creatives without the hiring overhead.",
    img:   null,
    active: true,
  },
  {
    href: "/why-us/ai-excellence",
    label: "AI Excellence",
    desc:  "Human creativity supercharged by AI systems.",
    img:   IMG_CROSSLINK_AI,
    active: false,
  },
  {
    href: "/why-us/our-technology",
    label: "Our Technology",
    desc:  "The platform that makes seamless delivery possible.",
    img:   IMG_CROSSLINK_TECH,
    active: false,
  },
]

function CrossLinkRow() {
  return (
    <section
      style={{ backgroundColor: "#142B22", borderTop: "1px solid #1A332A" }}
      className="py-16 md:py-20 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <p
          className="uppercase font-semibold text-center mb-8"
          style={{ color: "#5C7A6A", fontSize: 11, letterSpacing: "0.14em" }}
        >
          Why Matrix HQ
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {WHY_US.map(({ href, label, desc, img, active }) => (
            <motion.div
              key={href}
              whileHover={active ? {} : { y: -5 }}
              transition={{ duration: 0.22, ease: BEZIER }}
            >
              <Link
                href={href}
                className="relative block rounded-2xl overflow-hidden"
                style={{
                  border:         active ? "1px solid #D6FF5C" : "1px solid #1A332A",
                  pointerEvents:  active ? "none" : "auto",
                  minHeight:      160,
                }}
              >
                {/* Background image for non-active cards */}
                {img && (
                  <>
                    <Image src={img} alt="" fill className="object-cover object-center opacity-30" sizes="400px" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(11,31,23,0.3), rgba(11,31,23,0.85))" }} />
                  </>
                )}

                {/* Content */}
                <div className="relative z-10 p-6" style={{ backgroundColor: active ? "#0B1F17" : "transparent" }}>
                  {active && (
                    <span
                      className="inline-block text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded mb-3"
                      style={{ backgroundColor: "#D6FF5C", color: "#16240A" }}
                    >
                      You&apos;re here
                    </span>
                  )}
                  <p style={{ color: "#ffffff", fontSize: 15, fontWeight: 600 }} className="mb-1">{label}</p>
                  <p style={{ color: active ? "#5C7A6A" : "#8CA89A", fontSize: 13, lineHeight: 1.6 }}>{desc}</p>
                  {!active && (
                    <div className="flex items-center gap-1 mt-3" style={{ color: "#D6FF5C" }}>
                      <span style={{ fontSize: 12, fontWeight: 600 }}>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. FINAL CTA
// ─────────────────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: "50vh" }}>
      <Image src={IMG_HERO} alt="" fill className="object-cover object-center" sizes="100vw" />
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(11,31,23,0.84)" }} />

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-28 md:py-36">
        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span
            variants={fadeUpV}
            className="uppercase font-semibold mb-5 block"
            style={{ color: "#D6FF5C", fontSize: 11, letterSpacing: "0.15em" }}
          >
            Your creative team&apos;s creative team™
          </motion.span>
          <motion.h2
            variants={fadeUpV}
            className="text-[2.2rem] sm:text-[3rem] md:text-[3.6rem] mb-6 max-w-3xl mx-auto"
            style={{ color: "#ffffff", fontWeight: 600, lineHeight: 1.05 }}
          >
            World-class creative talent, <Em>on demand.</Em>
          </motion.h2>
          <motion.p
            variants={fadeUpV}
            style={{ color: "#C9D6CE", fontSize: 17, lineHeight: 1.6, maxWidth: 480 }}
            className="mx-auto mb-10"
          >
            Stop managing the talent problem. Subscribe to Matrix HQ and get a full senior
            creative team working on your brand from day one.
          </motion.p>
          <motion.div variants={fadeUpV} className="flex flex-wrap gap-4 justify-center">
            <PillCTA href="https://wa.me/2347045985964" external>Start now</PillCTA>
            <PillCTA href="/pricing" primary={false}>See pricing</PillCTA>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function CreativeTalentPage() {
  return (
    <main className="font-sans overflow-x-hidden">
      <NavigationHeader />
      <HeroSection />
      <CollageSection />
      <GlobalTeamSection />
      <ProcessSection />
      <DisciplinesSection />
      <HassleFreeSection />
      <SpecialtiesSection />
      <CreativeSupportSection />
      <CrossLinkRow />
      <FinalCTA />
      <Footer />
    </main>
  )
}
