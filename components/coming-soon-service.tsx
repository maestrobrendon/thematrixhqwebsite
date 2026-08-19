"use client"

// ─────────────────────────────────────────────────────────────────────────────
// Shared "Coming Soon" template for all service pages
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"

const BEZIER = [0.25, 0, 0, 1] as [number, number, number, number]

const containerV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const fadeUpV = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: BEZIER } },
}

const PILL_STYLES = {
  lime:  { bg: "#D6FF5C", fg: "#16240A" },
  green: { bg: "#1A332A", fg: "#8CA89A" },
  blue:  { bg: "#1A2B4A", fg: "#7BA7E8" },
  tan:   { bg: "#2E2618", fg: "#C8AB7A" },
} as const

export interface ComingSoonServiceProps {
  title:          string
  description:    string
  category:       string
  categoryColor?: keyof typeof PILL_STYLES
}

export function ComingSoonService({
  title,
  description,
  category,
  categoryColor = "lime",
}: ComingSoonServiceProps) {
  const pill = PILL_STYLES[categoryColor]

  return (
    <main className="font-sans overflow-x-hidden" style={{ backgroundColor: "#0B1F17", minHeight: "100vh" }}>
      <NavigationHeader />

      {/* ── Ambient gradient blobs ─────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Lime top-right bloom */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 700, height: 700,
            top: -200, right: -200,
            background: "radial-gradient(circle, rgba(214,255,92,0.07) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{ scale: [1, 1.18, 1], x: [0, 24, 0], y: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Green bottom-left bloom */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 500, height: 500,
            bottom: -100, left: -100,
            background: "radial-gradient(circle, rgba(22,36,28,0.9) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{ scale: [1, 1.12, 1], x: [0, -16, 0], y: [0, 18, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        />
      </div>

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 md:px-16 py-40">
        <div className="max-w-3xl mx-auto w-full">
          <motion.div
            variants={containerV}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center"
          >
            {/* Back link */}
            <motion.div variants={fadeUpV} className="mb-10 self-start">
              <Link
                href="/#services"
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
                style={{ color: "#5C7A6A" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#C9D6CE")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#5C7A6A")}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to all services
              </Link>
            </motion.div>

            {/* Category pill */}
            <motion.div variants={fadeUpV} className="mb-7">
              <span
                className="inline-block rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider"
                style={{ backgroundColor: pill.bg, color: pill.fg }}
              >
                {category}
              </span>
            </motion.div>

            {/* Service title */}
            <motion.h1
              variants={fadeUpV}
              className="text-[2.6rem] sm:text-[3.4rem] md:text-[4.4rem] leading-[1.04] mb-5"
              style={{ color: "#ffffff", fontWeight: 600 }}
            >
              {title}
            </motion.h1>

            {/* "Coming soon" — italic serif */}
            <motion.p
              variants={fadeUpV}
              className="font-serif italic mb-6"
              style={{ color: "#D6FF5C", fontSize: "clamp(1.2rem,3vw,1.6rem)", fontWeight: 300 }}
            >
              Coming soon.
            </motion.p>

            {/* Description */}
            <motion.p
              variants={fadeUpV}
              className="text-base md:text-lg leading-relaxed mb-12"
              style={{ color: "#8CA89A", maxWidth: 520 }}
            >
              {description} We&apos;re building this service now. Be the first to know when
              it launches.
            </motion.p>

            {/* Decorative divider */}
            <motion.div
              variants={fadeUpV}
              className="w-12 h-px mb-12"
              style={{ backgroundColor: "#1A332A" }}
            />

            {/* CTAs */}
            <motion.div variants={fadeUpV} className="flex flex-wrap gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href={`https://wa.me/2347045985964?text=Hi%2C%20I%27m%20interested%20in%20${encodeURIComponent(title)}%20%E2%80%94%20can%20you%20tell%20me%20more%3F`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold"
                  style={{ backgroundColor: "#D6FF5C", color: "#16240A" }}
                >
                  Get notified when this launches
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold"
                  style={{ color: "#ffffff", border: "1px solid rgba(255,255,255,0.22)" }}
                >
                  See our pricing
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Bottom faint tagline */}
            <motion.p
              variants={fadeUpV}
              className="mt-14"
              style={{ color: "#3D5E4C", fontSize: 13 }}
            >
              All services included in every Matrix HQ subscription tier.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
