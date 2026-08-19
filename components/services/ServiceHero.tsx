"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { px } from "@/lib/data/services"
import type { ServiceEntry } from "@/lib/data/services"

const BEZIER = [0.25, 0, 0, 1] as [number, number, number, number]

const PILL_STYLES = {
  lime:  { bg: "#D6FF5C", fg: "#16240A" },
  green: { bg: "#1A332A", fg: "#8CA89A" },
  blue:  { bg: "#1A2B4A", fg: "#7BA7E8" },
  tan:   { bg: "#2E2618", fg: "#C8AB7A" },
} as const

function Em({ children }: { children: React.ReactNode }) {
  return <span className="font-serif italic font-normal">{children}</span>
}

function splitHeadline(headline: string) {
  // Find a comma or "not" to italicize the second half
  const commaIdx = headline.indexOf(", not")
  if (commaIdx > 0) {
    return {
      main: headline.slice(0, commaIdx + 1),
      em: headline.slice(commaIdx + 2),
    }
  }
  const notIdx = headline.indexOf(" not ")
  if (notIdx > 0) {
    const breakAt = headline.lastIndexOf(" ", notIdx - 1)
    return {
      main: headline.slice(0, breakAt),
      em: headline.slice(breakAt + 1),
    }
  }
  // fallback — no split
  return { main: headline, em: "" }
}

interface ServiceHeroProps {
  service: ServiceEntry
}

export function ServiceHero({ service }: ServiceHeroProps) {
  const pill = PILL_STYLES[service.categoryColor]
  const { main, em } = splitHeadline(service.headline)
  const wa = `https://wa.me/2347045985964?text=${encodeURIComponent(service.whatsappText)}`

  return (
    <section
      className="relative flex flex-col lg:flex-row overflow-hidden"
      style={{ backgroundColor: "#0B1F17", minHeight: "100vh" }}
    >
      {/* ── Copy ─────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: BEZIER }}
        className="relative z-10 flex flex-1 flex-col justify-center px-6 md:px-12 lg:pl-[clamp(64px,10vw,140px)] lg:pr-12 pt-28 pb-10 lg:py-36"
      >
        {/* Back link */}
        <Link
          href="/#services"
          className="inline-flex items-center gap-2 text-sm font-medium mb-8 w-fit transition-colors"
          style={{ color: "#5C7A6A" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#8CA89A")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#5C7A6A")}
        >
          <ArrowLeft className="w-4 h-4" />
          All services
        </Link>

        {/* Category pill */}
        <div className="mb-6">
          <span
            className="inline-block rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest"
            style={{ backgroundColor: pill.bg, color: pill.fg }}
          >
            {service.eyebrow}
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-[2.2rem] sm:text-[2.8rem] lg:text-[3.4rem] xl:text-[4.2rem] leading-[1.06] font-bold tracking-tight mb-6"
          style={{ color: "#ffffff", maxWidth: 700 }}
        >
          {em ? (
            <>
              {main} <Em>{em}</Em>
            </>
          ) : (
            main
          )}
        </h1>

        {/* Subhead */}
        <p
          className="text-base lg:text-[17px] leading-relaxed mb-10"
          style={{ color: "#8CA89A", maxWidth: 500 }}
        >
          {service.subhead}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mb-12">
          <motion.a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold"
            style={{ backgroundColor: "#D6FF5C", color: "#16240A" }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {service.cta}
            <ArrowRight className="w-4 h-4" />
          </motion.a>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold"
              style={{ color: "#ffffff", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              See pricing
            </Link>
          </motion.div>
        </div>

        {/* Inline proof tags */}
        <div className="flex flex-wrap gap-3">
          {["30hr first draft", "Art Director review", "Unlimited revisions"].map((tag) => (
            <span
              key={tag}
              className="text-[12px] font-medium"
              style={{ color: "#3D5E4C" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ── Hero image (desktop right panel) ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: BEZIER }}
        className="hidden lg:block relative flex-shrink-0"
        style={{ width: "46%", minHeight: "100vh" }}
      >
        <Image
          src={px(service.heroImage)}
          alt={service.headline}
          fill
          priority
          className="object-cover object-center"
          sizes="46vw"
        />
        {/* left-edge fade into dark bg */}
        <div
          className="absolute inset-y-0 left-0 w-28 pointer-events-none"
          style={{
            background: "linear-gradient(to right, #0B1F17, transparent)",
          }}
        />
        {/* bottom gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(11,31,23,0.6), transparent)" }}
        />
      </motion.div>

      {/* ── Hero image (mobile — below copy) ─────────────────────────────── */}
      <div
        className="lg:hidden relative w-full"
        style={{ height: 260 }}
      >
        <Image
          src={px(service.heroImage)}
          alt={service.headline}
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, #0B1F17, transparent 30%, transparent 70%, #0B1F17)" }}
        />
      </div>
    </section>
  )
}
