"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"

const BEZIER = [0.25, 0, 0, 1] as [number, number, number, number]

const containerV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}
const fadeUpV = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: BEZIER } },
}
const fadeInV = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: BEZIER } },
}

const PILL_STYLES = {
  lime:  { bg: "#D6FF5C", fg: "#16240A" },
  green: { bg: "#1A332A", fg: "#8CA89A" },
  blue:  { bg: "#1A2B4A", fg: "#7BA7E8" },
  tan:   { bg: "#2E2618", fg: "#C8AB7A" },
} as const

export function px(id: number) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`
}

export interface FullServicePageProps {
  category: string
  categoryColor?: keyof typeof PILL_STYLES
  headline: string
  subhead: string
  heroImage: number
  included: string[]
  galleryImages: [number, string, number, string, number, string]
  whatsappText?: string
}

export function FullServicePage({
  category,
  categoryColor = "lime",
  headline,
  subhead,
  heroImage,
  included,
  galleryImages,
  whatsappText,
}: FullServicePageProps) {
  const pill = PILL_STYLES[categoryColor]
  const wa = whatsappText
    ? `https://wa.me/2347045985964?text=${encodeURIComponent(whatsappText)}`
    : `https://wa.me/2347045985964?text=${encodeURIComponent(`Hi, I'm interested in ${category} — can you tell me more?`)}`

  return (
    <main className="font-sans overflow-x-hidden" style={{ backgroundColor: "#0B1F17" }}>
      <NavigationHeader />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden pt-20 lg:pt-0"
        style={{ backgroundColor: "#0B1F17" }}
      >
        {/* bg grid line */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 15% 50%, rgba(214,255,92,0.05) 0%, transparent 55%), radial-gradient(circle at 85% 20%, rgba(22,36,10,0.6) 0%, transparent 50%)",
          }}
        />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 xl:px-20 py-16 lg:py-24 flex flex-col lg:flex-row items-center lg:items-stretch gap-10 lg:gap-0">
          {/* Copy */}
          <motion.div
            variants={containerV}
            initial="hidden"
            animate="visible"
            className="flex-1 flex flex-col justify-center lg:pr-12 xl:pr-20"
          >
            {/* Back link */}
            <motion.div variants={fadeUpV} className="mb-8">
              <Link
                href="/#services"
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
                style={{ color: "#5C7A6A" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#8CA89A")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#5C7A6A")}
              >
                <ArrowLeft className="w-4 h-4" />
                All services
              </Link>
            </motion.div>

            {/* Category pill */}
            <motion.div variants={fadeUpV} className="mb-6">
              <span
                className="inline-block rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest"
                style={{ backgroundColor: pill.bg, color: pill.fg }}
              >
                {category}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUpV}
              className="text-[2.2rem] sm:text-[2.8rem] lg:text-[3.4rem] xl:text-[4rem] leading-[1.06] mb-6 tracking-tight"
              style={{ color: "#ffffff", fontWeight: 700, maxWidth: 680 }}
            >
              {headline}
            </motion.h1>

            {/* Subhead */}
            <motion.p
              variants={fadeUpV}
              className="text-base lg:text-lg leading-relaxed mb-10"
              style={{ color: "#8CA89A", maxWidth: 520 }}
            >
              {subhead}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUpV} className="flex flex-wrap gap-4">
              <motion.a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold"
                style={{ backgroundColor: "#D6FF5C", color: "#16240A" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Start this project
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold"
                  style={{ color: "#ffffff", border: "1px solid rgba(255,255,255,0.2)" }}
                >
                  See pricing
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Turnaround note */}
            <motion.p
              variants={fadeUpV}
              className="mt-10 text-[13px]"
              style={{ color: "#3D5E4C" }}
            >
              First draft in 30 hours &middot; Art Director review on every file &middot; Unlimited revisions
            </motion.p>
          </motion.div>

          {/* Hero image */}
          <motion.div
            variants={fadeInV}
            initial="hidden"
            animate="visible"
            className="w-full lg:w-[44%] xl:w-[46%] flex-shrink-0"
          >
            <div
              className="relative w-full overflow-hidden"
              style={{ borderRadius: 20, height: "clamp(320px,55vw,700px)" }}
            >
              <Image
                src={px(heroImage)}
                alt={category}
                fill
                className="object-cover object-center"
                sizes="(max-width:1024px) 100vw, 46vw"
                priority
              />
              {/* gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(11,31,23,0.28) 0%, transparent 60%), linear-gradient(to top, rgba(11,31,23,0.5) 0%, transparent 40%)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ──────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#F4F1E8" }} className="py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 xl:px-20">
          {/* eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: BEZIER }}
            className="text-[11px] font-bold uppercase tracking-widest mb-4"
            style={{ color: "#5C7A6A" }}
          >
            What&apos;s included
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.05, ease: BEZIER }}
            className="text-[1.8rem] sm:text-[2.4rem] lg:text-[3rem] leading-tight mb-12 tracking-tight"
            style={{ color: "#16240A", fontWeight: 700, maxWidth: 640 }}
          >
            Everything you need, nothing you don&apos;t.
          </motion.h2>

          {/* Checklist grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {included.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: BEZIER }}
                className="flex items-start gap-3 p-5 rounded-2xl"
                style={{ backgroundColor: "#E8F0EC" }}
              >
                <CheckCircle
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                  style={{ color: "#16240A" }}
                />
                <span className="text-sm leading-snug font-medium" style={{ color: "#16240A" }}>
                  {item}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Art Director note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-start gap-4 pt-8"
            style={{ borderTop: "1px solid #C9D6CE" }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
              style={{ backgroundColor: "#D6FF5C" }}
            />
            <p className="text-sm leading-relaxed" style={{ color: "#5C7A6A" }}>
              Every deliverable is reviewed by a senior Art Director before it reaches you. No template work. No shortcuts on craft. All included in your flat monthly subscription.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── GALLERY ──────────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#0B1F17" }} className="py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 xl:px-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: BEZIER }}
            className="text-[11px] font-bold uppercase tracking-widest mb-3"
            style={{ color: "#5C7A6A" }}
          >
            The work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.06, ease: BEZIER }}
            className="text-[1.6rem] sm:text-[2rem] lg:text-[2.6rem] font-bold leading-tight mb-10 tracking-tight"
            style={{ color: "#ffffff" }}
          >
            Craft over templates. Every time.
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {([0, 1, 2] as const).map((i) => {
              const id = galleryImages[i * 2] as number
              const label = galleryImages[i * 2 + 1] as string
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: BEZIER }}
                  className="relative overflow-hidden"
                  style={{ borderRadius: 16, height: "clamp(220px,32vw,420px)" }}
                >
                  <Image
                    src={px(id)}
                    alt={label}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width:640px) 100vw, 33vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(11,31,23,0.8) 0%, rgba(11,31,23,0.1) 50%, transparent 100%)",
                    }}
                  />
                  <span
                    className="absolute bottom-4 left-4 text-[11px] font-semibold uppercase tracking-wider"
                    style={{ color: "rgba(255,255,255,0.75)" }}
                  >
                    {label}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#142B22" }} className="py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 xl:px-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-bold uppercase tracking-widest mb-4"
            style={{ color: "#5C7A6A" }}
          >
            Ready to start
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.06 }}
            className="text-[2rem] sm:text-[2.8rem] lg:text-[3.6rem] font-bold tracking-tight leading-tight mb-5"
            style={{ color: "#ffffff" }}
          >
            Flat monthly price.
            <br />
            <span style={{ color: "#D6FF5C" }}>Senior creative team on demand.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="text-base lg:text-lg mb-10 max-w-lg mx-auto leading-relaxed"
            style={{ color: "#8CA89A" }}
          >
            One subscription. Unlimited design requests. No contracts, no overhead, no surprises.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <motion.a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm"
              style={{ backgroundColor: "#D6FF5C", color: "#16240A" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Start a project on WhatsApp
              <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm"
                style={{ color: "#ffffff", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                View plans & pricing
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
