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
const INK         = "#0A1D15"
const INK_MUTED   = "rgba(10,29,21,0.5)"
const INK_DIM     = "rgba(10,29,21,0.3)"

const NOTCH_CLIP = "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)"

const PERKS = [
  { label: "Remote-first",          description: "We judge output, not location. Work from wherever you do your best thinking." },
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

function RoleRow({ role }: { role: typeof ROLES[0] }) {
  const [hovered, setHovered] = useState(false)
  const deptColor = DEPT_COLORS[role.department]

  return (
    <Link href={`/careers/${role.slug}`} style={{ textDecoration: "none", display: "block" }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          padding: "18px 20px",
          borderBottom: `1px solid ${BORDER}`,
          background: hovered ? `${ORANGE}06` : "transparent",
          transition: "background 0.18s ease",
          cursor: "pointer",
        }}
      >
        {/* Mobile layout: title + arrow on top, pills below */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <p style={{
            flex: 1,
            fontSize: "clamp(16px, 4vw, 21px)",
            fontWeight: 700,
            color: hovered ? ORANGE : INK,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            transition: "color 0.15s ease",
          }}>
            {role.title}
          </p>

          {/* Arrow */}
          <div style={{
            flexShrink: 0,
            width: 32, height: 32,
            clipPath: NOTCH_CLIP,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: hovered ? ORANGE : `rgba(10,29,21,0.08)`,
            transition: "background 0.18s ease",
          }}>
            <ArrowRight size={13} color={hovered ? "#fff" : INK} />
          </div>
        </div>

        {/* Pills row */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          {/* Dept pill */}
          <span style={{
            padding: "4px 10px",
            background: `${deptColor}12`,
            border: `1px solid ${deptColor}40`,
            clipPath: NOTCH_CLIP,
            fontSize: 9, fontWeight: 700, letterSpacing: "0.1em",
            color: deptColor, textTransform: "uppercase",
          }}>
            {role.department}
          </span>

          {/* Type badge */}
          <span style={{
            padding: "4px 10px",
            background: BG_SURFACE,
            border: `1px solid ${BORDER}`,
            borderRadius: 2,
            fontSize: 10, fontWeight: 600,
            color: INK_MUTED, letterSpacing: "0.04em",
          }}>
            {role.type}
          </span>

          {/* Location */}
          <span style={{ fontSize: 11, color: INK_DIM, letterSpacing: "0.02em" }}>
            {role.location}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function CareersPage() {
  return (
    <main style={{ background: BG, minHeight: "100vh" }}>
      <NavigationHeader />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section style={{ paddingTop: 120, paddingBottom: 64, borderBottom: `1px solid ${BORDER}` }}>
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div style={{ maxWidth: 860 }}>
            <p style={{
              fontSize: 10, fontWeight: 700, letterSpacing: "0.18em",
              textTransform: "uppercase", color: ORANGE, marginBottom: 20,
            }}>
              {ROLES.length} open positions &nbsp;/&nbsp; Remote
            </p>

            <h1 style={{
              fontSize: "clamp(40px, 8vw, 92px)", fontWeight: 800,
              lineHeight: 0.96, letterSpacing: "-0.04em",
              color: INK, marginBottom: 28,
            }}>
              We&apos;re building
              <br />
              <span style={{ color: ORANGE }}>something real.</span>
              <br />
              Join us.
            </h1>

            <p style={{
              fontSize: "clamp(15px, 1.8vw, 19px)", color: INK_MUTED,
              maxWidth: 540, lineHeight: 1.7,
            }}>
              thematrixHQ is a creative subscription studio — one flat fee, unlimited design, and an Art Director checking every file before it ships. Small team, high standards. If you care about craft, come build it with us.
            </p>
          </div>
        </div>
      </section>

      {/* ── Ticker — CSS animation, no JS ─────────────────────────── */}
      <div style={{
        overflow: "hidden",
        borderBottom: `1px solid ${BORDER}`,
        padding: "14px 0",
        background: BG_SURFACE,
      }}>
        <div
          className="careers-ticker"
          style={{ display: "flex", gap: 40, whiteSpace: "nowrap", width: "max-content" }}
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
        </div>
      </div>

      {/* ── Open Roles ────────────────────────────────────────────── */}
      <section style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            style={{
              display: "flex", alignItems: "baseline", justifyContent: "space-between",
              flexWrap: "wrap", gap: 10, marginBottom: 28,
              paddingBottom: 16, borderBottom: `1px solid ${BORDER}`,
            }}
          >
            <h2 style={{ fontSize: "clamp(22px, 3.5vw, 38px)", fontWeight: 800, color: INK, letterSpacing: "-0.03em" }}>
              Open Positions
            </h2>
            <p style={{ fontSize: 11, color: INK_DIM, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {ROLES.length} roles available
            </p>
          </motion.div>

          <div style={{ borderTop: `1px solid ${BORDER}` }}>
            {ROLES.map((role) => (
              <RoleRow key={role.slug} role={role} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why thematrixHQ ───────────────────────────────────────── */}
      <section style={{ paddingTop: 56, paddingBottom: 56, borderTop: `1px solid ${BORDER}`, background: BG_SURFACE }}>
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: ORANGE, marginBottom: 10 }}>
              Why us
            </p>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 44px)", fontWeight: 800, color: INK, letterSpacing: "-0.03em" }}>
              What it&rsquo;s like to work here
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 1 }}>
            {PERKS.map((perk, i) => (
              <div
                key={i}
                style={{
                  padding: "24px 20px",
                  border: `1px solid ${BORDER}`,
                  background: BG,
                  clipPath: i === 0 ? NOTCH_CLIP : undefined,
                }}
              >
                <div style={{
                  width: 18, height: 18,
                  background: `${ORANGE}18`, border: `1px solid ${ORANGE}40`,
                  clipPath: NOTCH_CLIP, marginBottom: 16,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <div style={{ width: 5, height: 5, background: ORANGE, clipPath: NOTCH_CLIP }} />
                </div>
                <p style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 6, letterSpacing: "-0.015em" }}>
                  {perk.label}
                </p>
                <p style={{ fontSize: 13, color: INK_MUTED, lineHeight: 1.65 }}>
                  {perk.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open CTA ──────────────────────────────────────────────── */}
      <section style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 72, paddingBottom: 88 }}>
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div style={{ maxWidth: 640 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: INK_DIM, marginBottom: 18 }}>
              Don&apos;t see your role?
            </p>
            <h2 style={{ fontSize: "clamp(28px, 5vw, 58px)", fontWeight: 800, color: INK, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 16 }}>
              Reach out anyway.
              <br />
              <span style={{ color: ORANGE }}>We&apos;re always looking</span>
              <br />
              for exceptional people.
            </h2>
            <p style={{ fontSize: 15, color: INK_MUTED, lineHeight: 1.7, marginBottom: 32, maxWidth: 460 }}>
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
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
