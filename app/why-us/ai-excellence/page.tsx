"use client"

// ─────────────────────────────────────────────────────────────────────────────
// /why-us/ai-excellence
// Design system: #0B1F17 dark · #F4F1E8 light · #D6FF5C lime
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Plus, Zap, DollarSign, TrendingUp, Eye } from "lucide-react"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"

// ── Tokens ────────────────────────────────────────────────────────────────────
const BEZIER = [0.25, 0, 0, 1] as [number, number, number, number]

function Em({ children }: { children: React.ReactNode }) {
  return <span className="font-serif italic font-normal">{children}</span>
}

const containerV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const fadeUpV = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: BEZIER } },
}

// ── Images ────────────────────────────────────────────────────────────────────
const IMG_HERO =
  "https://res.cloudinary.com/du5nhfcgd/image/upload/q_auto/f_auto/v1782081054/pexels-alinadegli-37686910_lxxm3u.jpg"
const IMG_SOLUTIONS =
  "https://res.cloudinary.com/du5nhfcgd/image/upload/q_auto/f_auto/v1782081059/b56f33865a252fb2e4f5a87df11fda0e928758ba-1792x2560_ucvtmq.png"
const IMG_CROSSLINK_TALENT =
  "https://res.cloudinary.com/du5nhfcgd/image/upload/q_auto/f_auto/v1782063545/c4f5fdeae73ba665af447d9bd9bebc04d58ff18f-2271x1244_juqkee.png"
const IMG_CROSSLINK_TECH =
  "https://res.cloudinary.com/du5nhfcgd/image/upload/q_auto/f_auto/v1782064180/739d30f2ecb844e9c1186e62ca63efbda518ff4a-1050x1200_dq9zvt.png"

// ── Video showcase ────────────────────────────────────────────────────────────
const VIDEOS = [
  { src: "https://res.cloudinary.com/du5nhfcgd/video/upload/q_auto/f_auto/v1782081053/758e481a3b18e27e6256536650736eff8f138b8e_axgx7f.mp4",  label: "Concept exploration" },
  { src: "https://res.cloudinary.com/du5nhfcgd/video/upload/q_auto/f_auto/v1782081052/d4db13db98cdf67e55c06f8b22aadf482ddada93_v2ogaa.mp4",  label: "Product visualization" },
  { src: "https://res.cloudinary.com/du5nhfcgd/video/upload/q_auto/f_auto/v1782081052/46c1d3e4d5a75078a46ce42894a236317fc95b31_qg4qak.mp4",  label: "Image enhancement" },
  { src: "https://res.cloudinary.com/du5nhfcgd/video/upload/q_auto/f_auto/v1782081052/9807a16f00fc0102ca4ec2abd293aed9e7ea2c00_cufbla.mp4",  label: "Motion & animation" },
  { src: "https://res.cloudinary.com/du5nhfcgd/video/upload/q_auto/f_auto/v1782081058/63a8eb8275b41d702115f7d322f2b8fbf44a0ffa-1160x1160_fwf0kf.mp4", label: "Brand asset production" },
]

// ── Shared components ─────────────────────────────────────────────────────────
function PillCTA({
  href,
  children,
  primary = true,
  external = false,
  dark = false,
}: {
  href: string
  children: React.ReactNode
  primary?: boolean
  external?: boolean
  dark?: boolean
}) {
  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold"
        style={
          primary
            ? { backgroundColor: "#D6FF5C", color: "#16240A" }
            : dark
            ? { color: "#16241C", border: "1px solid rgba(22,36,28,0.3)" }
            : { color: "#ffffff", border: "1px solid rgba(255,255,255,0.25)" }
        }
      >
        {children}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </motion.div>
  )
}

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
      {/* BG image */}
      <div className="absolute inset-0">
        <Image
          src={IMG_HERO}
          alt="AI-powered creative work"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(11,31,23,0.68) 0%, rgba(11,31,23,0.18) 40%, rgba(11,31,23,0.92) 100%)",
          }}
        />
      </div>

      {/* "Built with AI" badge — top right of the content area */}
      <div className="absolute top-24 right-6 md:right-16 z-10">
        <div
          className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold"
          style={{ backgroundColor: "#D6FF5C", color: "#16240A" }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "#16240A" }}
          />
          Built with AI
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 w-full">
        <motion.div
          variants={containerV}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.span
            variants={fadeUpV}
            className="uppercase font-semibold mb-5 block"
            style={{ color: "#D6FF5C", fontSize: 11, letterSpacing: "0.15em" }}
          >
            How we use AI
          </motion.span>

          <motion.h1
            variants={fadeUpV}
            className="text-[2.3rem] sm:text-[3rem] lg:text-[3.8rem] mb-6"
            style={{ color: "#ffffff", fontWeight: 600, lineHeight: 1.06 }}
          >
            Speed is no longer optional.
            <br />
            <Em>Neither is quality.</Em>
          </motion.h1>

          <motion.p
            variants={fadeUpV}
            className="mb-10"
            style={{ color: "#C9D6CE", fontSize: 17, lineHeight: 1.65, maxWidth: 540 }}
          >
            We use AI to move faster through the unglamorous parts of creative work
            — so more of our time goes into the ideas, the craft, and getting your
            brand right.
          </motion.p>

          <motion.div variants={fadeUpV}>
            <PillCTA href="#solutions">See how it works</PillCTA>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. SOLUTIONS FOR MODERN TEAMS
// ─────────────────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Zap,
    title: "Faster turnaround",
    desc:  "AI handles first-pass exploration so your designer spends time refining, not starting from zero.",
  },
  {
    icon: DollarSign,
    title: "Lower cost",
    desc:  "Fewer manual hours billed, same creative outcome — the savings go back to you.",
  },
  {
    icon: TrendingUp,
    title: "Always improving",
    desc:  "Our tools and workflows get sharper every month as models and techniques evolve.",
  },
  {
    icon: Eye,
    title: "Full transparency",
    desc:  "You see what's AI-assisted and what's hand-crafted, every single time.",
  },
]

function SolutionsSection() {
  return (
    <section
      id="solutions"
      style={{ backgroundColor: "#F4F1E8", borderTop: "1px solid #E4E0D4" }}
      className="py-20 md:py-28 px-6 md:px-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

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
            style={{ color: "#8C9A8C", fontSize: 11, letterSpacing: "0.14em" }}
          >
            Solutions for modern teams
          </motion.span>
          <motion.h2
            variants={fadeUpV}
            className="text-[1.9rem] md:text-[2.4rem] mb-6"
            style={{ color: "#16241C", fontWeight: 600, lineHeight: 1.1 }}
          >
            Your shortcut to faster, sharper creative.
          </motion.h2>
          <motion.p
            variants={fadeUpV}
            className="mb-10"
            style={{ color: "#5C6B62", fontSize: 16, lineHeight: 1.75 }}
          >
            You&apos;re under pressure to ship more, with smaller budgets and tighter
            timelines. AI lets us close that gap without cutting corners on quality.
          </motion.p>

          {/* 2x2 feature grid */}
          <motion.div
            variants={containerV}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={fadeUpV}
                className="flex items-start gap-3"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ backgroundColor: "#E4E0D4" }}
                >
                  <Icon className="w-4 h-4" style={{ color: "#16241C" }} />
                </div>
                <div>
                  <p
                    className="mb-0.5 font-semibold"
                    style={{ color: "#16241C", fontSize: 14 }}
                  >
                    {title}
                  </p>
                  <p style={{ color: "#8C9A8C", fontSize: 13, lineHeight: 1.65 }}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: BEZIER }}
          className="relative rounded-[20px] overflow-hidden"
          style={{ height: "clamp(340px, 56vw, 620px)", border: "1px solid #E4E0D4" }}
        >
          <Image
            src={IMG_SOLUTIONS}
            alt="AI-augmented creative workflow"
            fill
            className="object-cover object-center"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. VIDEO SHOWCASE GRID
// ─────────────────────────────────────────────────────────────────────────────
function VideoCard({ src, label, tall = false }: { src: string; label: string; tall?: boolean }) {
  const videoRef    = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Only play when the card is visible in the viewport — prevents all 5
  // videos buffering simultaneously and crashing mobile browser tabs.
  useEffect(() => {
    const video = videoRef.current
    const el    = containerRef.current
    if (!video || !el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.25 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={containerRef}
      className="relative rounded-2xl overflow-hidden group"
      style={{ height: tall ? "clamp(240px,36vw,440px)" : "clamp(180px,26vw,320px)" }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.35, ease: BEZIER }}
    >
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(11,31,23,0.85) 0%, rgba(11,31,23,0.1) 55%, transparent 100%)",
        }}
      />
      {/* Label */}
      <div className="absolute bottom-4 left-4">
        <span
          className="block uppercase font-semibold mb-0.5"
          style={{ color: "#D6FF5C", fontSize: 9, letterSpacing: "0.14em" }}
        >
          AI use case
        </span>
        <span style={{ color: "#ffffff", fontSize: 14, fontWeight: 600 }}>{label}</span>
      </div>
    </motion.div>
  )
}

function VideoShowcaseSection() {
  return (
    <section
      style={{ backgroundColor: "#0B1F17", borderTop: "1px solid #1A332A" }}
      className="py-20 md:py-28 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
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
            Real work, real AI
          </motion.span>
          <motion.h2
            variants={fadeUpV}
            className="text-[2rem] md:text-[2.6rem] mb-4"
            style={{ color: "#ffffff", fontWeight: 600, lineHeight: 1.1 }}
          >
            AI-powered creative production, <Em>in action.</Em>
          </motion.h2>
          <motion.p
            variants={fadeUpV}
            style={{ color: "#5C7A6A", fontSize: 15, maxWidth: 480 }}
            className="mx-auto"
          >
            No stock. No shoot. Every clip below is genuine AI-augmented production work.
          </motion.p>
        </motion.div>

        {/* Row 1: 2 tall cards — shown on all breakpoints */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          {VIDEOS.slice(0, 2).map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: BEZIER }}
            >
              <VideoCard src={v.src} label={v.label} tall />
            </motion.div>
          ))}
        </div>

        {/* Row 2: 3 shorter cards — hidden on mobile to avoid memory overload on small devices */}
        <div className="hidden sm:grid sm:grid-cols-3 gap-3">
          {VIDEOS.slice(2).map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08 + 0.1, ease: BEZIER }}
            >
              <VideoCard src={v.src} label={v.label} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. STATS
// ─────────────────────────────────────────────────────────────────────────────
const STATS = [
  { value: 30,  suffix: "hrs",  label: "Average first-draft turnaround, AI-accelerated" },
  { value: 2,   suffix: "×",    label: "Faster than the average traditional agency" },
  { value: 100, suffix: "+",    label: "Creative categories covered by one subscription" },
  { value: 98,  suffix: "%",    label: "Client satisfaction across all delivered projects" },
]

function StatsSection() {
  return (
    <section
      style={{ backgroundColor: "#0B1F17", borderTop: "1px solid #1A332A" }}
      className="py-20 md:py-28 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
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
            Real numbers
          </motion.span>
          <motion.h2
            variants={fadeUpV}
            className="text-[2rem] md:text-[2.6rem]"
            style={{ color: "#ffffff", fontWeight: 600, lineHeight: 1.1 }}
          >
            What AI-augmented speed <Em>actually looks like.</Em>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {STATS.map(({ value, suffix, label }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: BEZIER }}
              className="text-center lg:text-left"
            >
              <p
                className="font-serif font-light leading-none mb-3"
                style={{ color: "#D6FF5C", fontSize: "clamp(2.8rem,5.5vw,4rem)" }}
              >
                <CountUp to={value} suffix={suffix} />
              </p>
              <p style={{ color: "#5C7A6A", fontSize: 13, lineHeight: 1.6 }}>{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. YOUR AI, YOUR RULES
// ─────────────────────────────────────────────────────────────────────────────
type PlanCard = {
  name:     string
  badge?:   string
  items:    string[]
  accent:   "lime" | "neutral" | "light"
}

const PLANS: PlanCard[] = [
  {
    name:   "AI-accelerated",
    badge:  "Most flexible",
    accent: "lime",
    items: [
      "Fastest turnaround, lowest cost",
      "AI handles drafts, exploration & iteration",
      "Human creative director reviews every output",
      "Senior designer refines all final deliverables",
      "Full IP transfer on delivery",
    ],
  },
  {
    name:   "Hybrid",
    accent: "neutral",
    items: [
      "AI assists with research & first drafts",
      "Human-led on all final execution",
      "Balanced speed and craft",
      "Recommended for brand-critical work",
      "Priority creative director involvement",
    ],
  },
  {
    name:   "Fully human",
    accent: "light",
    items: [
      "No AI involvement at any stage",
      "Traditional hands-on creative process",
      "Longer timelines, premium tier",
      "Maximum craft and personal attention",
      "Best for heritage or luxury brands",
    ],
  },
]

function PlanCardItem({ plan }: { plan: PlanCard }) {
  const isLime  = plan.accent === "lime"
  const isLight = plan.accent === "light"

  const bg     = isLight ? "#F4F1E8" : "#142B22"
  const border  = isLime ? "#D6FF5C" : isLight ? "#E4E0D4" : "#1A332A"
  const titleC  = isLight ? "#16241C" : "#ffffff"
  const bodyC   = isLight ? "#5C6B62" : "#8CA89A"
  const checkC  = isLime  ? "#D6FF5C" : isLight ? "#16241C" : "#D6FF5C"

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 20px 48px rgba(0,0,0,0.22)" }}
      transition={{ duration: 0.25, ease: BEZIER }}
      className="relative rounded-2xl p-7 flex flex-col"
      style={{ backgroundColor: bg, border: `1px solid ${border}` }}
    >
      {plan.badge && (
        <span
          className="inline-block self-start text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full mb-4"
          style={{ backgroundColor: "#D6FF5C", color: "#16240A" }}
        >
          {plan.badge}
        </span>
      )}

      <p
        className="text-[1.25rem] font-semibold mb-5"
        style={{ color: titleC }}
      >
        {plan.name}
      </p>

      <ul className="space-y-3 flex-1">
        {plan.items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: checkC }} />
            <span style={{ color: bodyC, fontSize: 13, lineHeight: 1.6 }}>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

function AiRulesSection() {
  return (
    <section
      style={{ backgroundColor: "#F4F1E8", borderTop: "1px solid #E4E0D4" }}
      className="py-20 md:py-28 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
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
            Your choice
          </motion.span>
          <motion.h2
            variants={fadeUpV}
            className="text-[2rem] md:text-[2.6rem] mb-4"
            style={{ color: "#16241C", fontWeight: 600, lineHeight: 1.1 }}
          >
            Not every brand wants the same amount of AI.{" "}
            <Em>That&apos;s fine.</Em>
          </motion.h2>
          <motion.p
            variants={fadeUpV}
            style={{ color: "#5C6B62", fontSize: 16, lineHeight: 1.7, maxWidth: 500 }}
            className="mx-auto"
          >
            Tell your project manager your preference on your first brief — we&apos;ll
            calibrate every deliverable accordingly.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {PLANS.map((plan) => (
            <motion.div key={plan.name} variants={fadeUpV}>
              <PlanCardItem plan={plan} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: BEZIER }}
        >
          <PillCTA href="/pricing" dark>See all subscription tiers</PillCTA>
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. FAQ ACCORDION
// ─────────────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "Is my brand's content fully AI-generated?",
    a: "No. AI accelerates drafts and exploration; every deliverable is reviewed, refined, and signed off by a human creative before it reaches you.",
  },
  {
    q: "Can I opt out of AI tools entirely?",
    a: "Yes — see the “Fully human” option above. Just let your project manager know your preference at the start of any brief.",
  },
  {
    q: "Is my brand data used to train AI models?",
    a: "No. Your assets and briefs are never used to train any third-party or public AI model. Your work stays yours.",
  },
  {
    q: "How do you keep quality high while moving fast?",
    a: "AI handles the repetitive groundwork; our creative directors focus their time on judgment calls — composition, brand fit, and polish — where it actually matters.",
  },
  {
    q: "What happens if I don't like an AI-assisted draft?",
    a: "Same as any other draft — unlimited revisions, no extra charge, no different process. We iterate until it's right.",
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ borderBottom: "1px solid #1A332A" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left py-5 flex items-start justify-between gap-4"
      >
        <span
          style={{
            color: "#E8F0EC",
            fontSize: 15,
            fontWeight: 500,
            lineHeight: 1.5,
            textAlign: "left",
          }}
        >
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.22, ease: BEZIER }}
          className="shrink-0 mt-0.5"
          style={{ color: "#D6FF5C" }}
        >
          <Plus className="w-4 h-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: BEZIER }}
            className="overflow-hidden"
          >
            <p
              className="pb-5"
              style={{ color: "#8CA89A", fontSize: 14, lineHeight: 1.75 }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FAQSection() {
  return (
    <section
      style={{ backgroundColor: "#0B1F17", borderTop: "1px solid #1A332A" }}
      className="py-20 md:py-28 px-6 md:px-16"
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
            style={{ color: "#D6FF5C", fontSize: 11, letterSpacing: "0.14em" }}
          >
            Questions
          </motion.span>
          <motion.h2
            variants={fadeUpV}
            className="text-[2rem] md:text-[2.6rem]"
            style={{ color: "#ffffff", fontWeight: 600, lineHeight: 1.1 }}
          >
            Frequently asked questions <Em>about how we use AI.</Em>
          </motion.h2>
        </motion.div>

        {/* 2-column accordion grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16">
          <div>
            {/* top border on first column */}
            <div style={{ borderTop: "1px solid #1A332A" }} />
            {FAQS.slice(0, 3).map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
          <div>
            <div style={{ borderTop: "1px solid #1A332A" }} />
            {FAQS.slice(3).map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. CROSS-LINK ROW
// ─────────────────────────────────────────────────────────────────────────────
const WHY_US = [
  {
    href:   "/why-us/creative-talent",
    label:  "Our Creative Talent",
    desc:   "World-class creatives without the hiring overhead.",
    img:    IMG_CROSSLINK_TALENT,
    active: false,
  },
  {
    href:   "/why-us/ai-excellence",
    label:  "AI Excellence",
    desc:   "Human creativity supercharged by AI systems.",
    img:    null,
    active: true,
  },
  {
    href:   "/why-us/our-technology",
    label:  "Our Technology",
    desc:   "The platform that makes seamless delivery possible.",
    img:    IMG_CROSSLINK_TECH,
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
                  border:        active ? "1px solid #D6FF5C" : "1px solid #1A332A",
                  pointerEvents: active ? "none" : "auto",
                  minHeight:     160,
                }}
              >
                {img && (
                  <>
                    <Image
                      src={img}
                      alt=""
                      fill
                      className="object-cover object-center opacity-30"
                      sizes="400px"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to bottom, rgba(11,31,23,0.3), rgba(11,31,23,0.85))",
                      }}
                    />
                  </>
                )}

                <div
                  className="relative z-10 p-6"
                  style={{ backgroundColor: active ? "#0B1F17" : "transparent" }}
                >
                  {active && (
                    <span
                      className="inline-block text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded mb-3"
                      style={{ backgroundColor: "#D6FF5C", color: "#16240A" }}
                    >
                      You&apos;re here
                    </span>
                  )}
                  <p
                    className="mb-1"
                    style={{ color: "#ffffff", fontSize: 15, fontWeight: 600 }}
                  >
                    {label}
                  </p>
                  <p style={{ color: active ? "#5C7A6A" : "#8CA89A", fontSize: 13, lineHeight: 1.6 }}>
                    {desc}
                  </p>
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
// 8. FINAL CTA
// ─────────────────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: "50vh" }}>
      <Image
        src={IMG_HERO}
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(11,31,23,0.86)" }} />

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
            AI speed. Human craft.{" "}
            <Em>No compromises.</Em>
          </motion.h2>
          <motion.p
            variants={fadeUpV}
            className="mx-auto mb-10"
            style={{ color: "#C9D6CE", fontSize: 17, lineHeight: 1.6, maxWidth: 460 }}
          >
            Get a senior creative team that moves faster than your in-house team,
            costs less than an agency, and delivers every time.
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
export default function AIExcellencePage() {
  return (
    <main className="font-sans overflow-x-hidden">
      <NavigationHeader />
      <HeroSection />
      <SolutionsSection />
      <VideoShowcaseSection />
      <StatsSection />
      <AiRulesSection />
      <FAQSection />
      <CrossLinkRow />
      <FinalCTA />
      <Footer />
    </main>
  )
}
