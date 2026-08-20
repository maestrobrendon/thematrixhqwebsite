"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { ROLES, DEPT_COLORS } from "@/lib/careers/roles"

// ── Brand tokens — white mode ─────────────────────────────────────────────────
const BG          = "#FFFFFF"
const BG_SURFACE  = "#F5F4F1"
const BORDER      = "rgba(10,29,21,0.1)"
const ORANGE      = "#E84519"
const INK         = "#0A1D15"   // brand dark green as primary text
const INK_MUTED   = "rgba(10,29,21,0.5)"
const INK_DIM     = "rgba(10,29,21,0.3)"

const NOTCH_CLIP = "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)"

const PERKS = [
  { label: "Remote-first",         description: "We judge output, not location. Work from wherever you do your best thinking." },
  { label: "Art Director standard", description: "Every file that leaves the studio gets Art Director eyes. You ship better work here." },
  { label: "Real ownership",        description: "Small team, real problems. Your decisions shape the product, not just execute a roadmap." },
  { label: "Speed as a discipline", description: "30-hour first drafts, AI-assisted where it helps, always finished by hand." },
  { label: "Client range",          description: "One week you're building a challenger brand, the next a fintech product. The range is the point." },
  { label: "No bloat",              description: "No politics, no five layers of sign-off. A small team with high standards and a direct line to the founder." },
]

const TICKER_ITEMS = [
  "Brand Identity", "Art Direction", "Motion", "UI/UX Design",
  "Creative Direction", "Project Management", "Sales", "Brand Systems",
  "Brand Identity", "Art Direction", "Motion", "UI/UX Design",
  "Creative Direction", "Project Management", "Sales", "Brand Systems",
]

function RoleRow({ role, index }: { role: typeof ROLES[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const deptColor = DEPT_COLORS[role.department]

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.38, delay: index * 0.055 }}
    >
      <Link href={`/careers/${role.slug}`} style={{ textDecoration: "none" }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            padding: "22px 28px",
            borderBottom: `1px solid ${BORDER}`,
            background: hovered ? `${ORANGE}06` : "transparent",
            transition: "background 0.18s ease",
            cursor: "pointer",
          }}
        >
          {/* Department pill — notched */}
          <div style={{
            flexShrink: 0,
            padding: "5px 12px",
            background: `${deptColor}12`,
            border: `1px solid ${deptColor}40`,
            clipPath: NOTCH_CLIP,
            fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
            color: deptColor, textTransform: "uppercase",
            minWidth: 96, textAlign: "center",
          }}>
            {role.department}
          </div>

          {/* Title + location */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              fontSize: "clamp(15px, 2.2vw, 21px)", fontWeight: 700,
              color: hovered ? ORANGE : INK,
              letterSpacing: "-0.02em", lineHeight: 1.2,
              transition: "color 0.15s ease",
            }}>
              {role.title}
            </p>
            <p style={{ fontSize: 12, color: INK_DIM, marginTop: 3, letterSpacing: "0.02em" }}>
              {role.location}
            </p>
          </div>

          {/* Type badge */}
          <div style={{
            flexShrink: 0, padding: "5px 12px",
            background: BG_SURFACE, border: `1px solid ${BORDER}`,
            borderRadius: 2, fontSize: 11, fontWeight: 600,
            color: INK_MUTED, letterSpacing: "0.04em",
          }}>
            {role.type}
          </div>

          {/* Arrow — notched */}
          <div style={{
            flexShrink: 0, width: 34, height: 34,
            clipPath: NOTCH_CLIP,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: hovered ? ORANGE : BORDER,
            transition: "background 0.18s ease",
          }}>
            <ArrowRight size={14} color={hovered ? "#fff" : INK} />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function CareersPage() {
  return (
    <main style={{ background: BG, minHeight: "100vh" }}>
      <NavigationHeader />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section style={{ paddingTop: 164, paddingBottom: 80, borderBottom: `1px solid ${BORDER}` }}>
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div style={{ maxWidth: 860 }}>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.18em",
                textTransform: "uppercase", color: ORANGE, marginBottom: 24,
              }}
            >
              {ROLES.length} open positions &nbsp;/&nbsp; Lagos &amp; Remote
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
              style={{
                fontSize: "clamp(44px, 8vw, 92px)", fontWeight: 800,
                lineHeight: 0.96, letterSpacing: "-0.04em",
                color: INK, marginBottom: 32,
              }}
            >
              We&apos;re building
              <br />
              <span style={{ color: ORANGE }}>something real.</span>
              <br />
              Join us.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
              style={{
                fontSize: "clamp(15px, 1.8vw, 19px)", color: INK_MUTED,
                maxWidth: 540, lineHeight: 1.7,
              }}
            >
              thematrixHQ is a creative subscription studio — one flat fee, unlimited design, and an Art Director checking every file before it ships. Small team, high standards. If you care about craft, come build it with us.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── Ticker ────────────────────────────────────────────────── */}
      <div style={{
        overflow: "hidden",
        borderBottom: `1px solid ${BORDER}`,
        padding: "16px 0",
        background: BG_SURFACE,
      }}>
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          style={{ display: "flex", gap: 48, whiteSpace: "nowrap", width: "max-content" }}
        >
          {TICKER_ITEMS.map((item, i) => (
            <span
              key={i}
              style={{
                fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: i % 2 === 0 ? INK_DIM : ORANGE,
              }}
            >
              {item} &nbsp;{i % 2 === 0 ? "·" : "→"}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Open Roles ────────────────────────────────────────────── */}
      <section style={{ paddingTop: 72, paddingBottom: 72 }}>
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            style={{
              display: "flex", alignItems: "baseline", justifyContent: "space-between",
              flexWrap: "wrap", gap: 10, marginBottom: 36,
              paddingBottom: 18, borderBottom: `1px solid ${BORDER}`,
            }}
          >
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 800, color: INK, letterSpacing: "-0.03em" }}>
              Open Positions
            </h2>
            <p style={{ fontSize: 11, color: INK_DIM, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {ROLES.length} roles available
            </p>
          </motion.div>

          <div style={{ borderTop: `1px solid ${BORDER}` }}>
            {ROLES.map((role, i) => (
              <RoleRow key={role.slug} role={role} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why thematrixHQ ───────────────────────────────────────── */}
      <section style={{ paddingTop: 72, paddingBottom: 72, borderTop: `1px solid ${BORDER}`, background: BG_SURFACE }}>
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            style={{ marginBottom: 48 }}
          >
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: ORANGE, marginBottom: 12 }}>
              Why us
            </p>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 44px)", fontWeight: 800, color: INK, letterSpacing: "-0.03em" }}>
              What it&rsquo;s like to work here
            </h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(272px, 1fr))", gap: 1 }}>
            {PERKS.map((perk, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.38, delay: i * 0.055 }}
                style={{
                  padding: "28px 24px",
                  border: `1px solid ${BORDER}`,
                  background: BG,
                  clipPath: i === 0 ? NOTCH_CLIP : undefined,
                }}
              >
                <div style={{
                  width: 20, height: 20,
                  background: `${ORANGE}18`, border: `1px solid ${ORANGE}40`,
                  clipPath: NOTCH_CLIP, marginBottom: 18,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <div style={{ width: 5, height: 5, background: ORANGE, clipPath: NOTCH_CLIP }} />
                </div>
                <p style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 8, letterSpacing: "-0.015em" }}>
                  {perk.label}
                </p>
                <p style={{ fontSize: 13.5, color: INK_MUTED, lineHeight: 1.65 }}>
                  {perk.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open CTA ──────────────────────────────────────────────── */}
      <section style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 80, paddingBottom: 100 }}>
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            style={{ maxWidth: 640 }}
          >
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: INK_DIM, marginBottom: 20 }}>
              Don&apos;t see your role?
            </p>
            <h2 style={{ fontSize: "clamp(30px, 5vw, 58px)", fontWeight: 800, color: INK, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 18 }}>
              Reach out anyway.
              <br />
              <span style={{ color: ORANGE }}>We&apos;re always looking</span>
              <br />
              for exceptional people.
            </h2>
            <p style={{ fontSize: 15, color: INK_MUTED, lineHeight: 1.7, marginBottom: 36, maxWidth: 460 }}>
              Send us your portfolio and a note on what you&rsquo;d want to build here. If there&rsquo;s a fit, we&rsquo;ll make it work.
            </p>
            <a
              href="mailto:hello@thematrixHQ.com?subject=Open Application — thematrixHQ"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "15px 26px", background: ORANGE,
                color: "#fff", fontWeight: 700, fontSize: 14,
                clipPath: NOTCH_CLIP, textDecoration: "none",
                letterSpacing: "-0.01em",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.88" }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1" }}
            >
              hello@thematrixHQ.com
              <ArrowUpRight size={15} />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
