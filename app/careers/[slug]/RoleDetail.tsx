"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { DEPT_COLORS, type Role } from "@/lib/careers/roles"

const BG         = "#FFFFFF"
const BG_SURFACE = "#F5F4F1"
const BORDER     = "rgba(10,29,21,0.1)"
const ORANGE     = "#E84519"
const INK        = "#0A1D15"
const INK_MUTED  = "rgba(10,29,21,0.5)"
const INK_DIM    = "rgba(10,29,21,0.28)"
const NOTCH_CLIP = "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)"

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ paddingTop: 36, paddingBottom: 36, borderTop: `1px solid ${BORDER}` }}>
      <p style={{
        fontSize: 10, fontWeight: 700, letterSpacing: "0.18em",
        textTransform: "uppercase", color: ORANGE, marginBottom: 20,
      }}>
        {label}
      </p>
      {children}
    </div>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          <div style={{ width: 10, height: 10, flexShrink: 0, marginTop: 6, background: ORANGE, clipPath: NOTCH_CLIP }} />
          <span style={{ fontSize: 15.5, color: INK_MUTED, lineHeight: 1.65 }}>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function ApplyButton({ href, label }: { href: string; label: string }) {
  const [hover, setHover] = useState(false)
  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "14px 24px", background: ORANGE, color: "#fff",
        fontWeight: 700, fontSize: 14, clipPath: NOTCH_CLIP,
        textDecoration: "none", letterSpacing: "-0.01em",
        opacity: hover ? 0.85 : 1, transition: "opacity 0.15s ease",
      }}
    >
      {label} <ArrowUpRight size={15} />
    </a>
  )
}

function ApplyButtonSmall({ href }: { href: string }) {
  const [hover, setHover] = useState(false)
  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "11px 20px", background: ORANGE, color: "#fff",
        fontWeight: 700, fontSize: 13, clipPath: NOTCH_CLIP,
        textDecoration: "none", flexShrink: 0, letterSpacing: "-0.01em",
        opacity: hover ? 0.85 : 1, transition: "opacity 0.15s ease",
      }}
    >
      Apply now <ArrowUpRight size={14} />
    </a>
  )
}

export default function RoleDetail({ role }: { role: Role }) {
  const deptColor = DEPT_COLORS[role.department]
  const applyHref = `mailto:hello@thematrixHQ.com?subject=${encodeURIComponent(role.title + " Application — thematrixHQ")}`

  return (
    <main style={{ background: BG, minHeight: "100vh" }}>
      <NavigationHeader />

      <div className="container mx-auto px-6 md:px-12 lg:px-24" style={{ paddingTop: 120, paddingBottom: 120 }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>

          {/* Back */}
          <Link href="/careers" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 11, fontWeight: 700, letterSpacing: "0.12em",
            textTransform: "uppercase", color: INK_DIM, textDecoration: "none",
            marginBottom: 52,
          }}>
            <ArrowLeft size={13} /> All positions
          </Link>

          {/* Header */}
          <div style={{ marginBottom: 44 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22, alignItems: "center" }}>
              <span style={{
                padding: "4px 12px",
                background: `${deptColor}12`, border: `1px solid ${deptColor}40`,
                clipPath: NOTCH_CLIP, fontSize: 10, fontWeight: 700,
                letterSpacing: "0.1em", textTransform: "uppercase", color: deptColor,
              }}>
                {role.department}
              </span>
              <span style={{
                padding: "4px 12px", border: `1px solid ${BORDER}`,
                background: BG_SURFACE, borderRadius: 2,
                fontSize: 10, fontWeight: 600, letterSpacing: "0.1em",
                textTransform: "uppercase", color: INK_DIM,
              }}>
                {role.type}
              </span>
              <span style={{ fontSize: 11, color: INK_DIM, letterSpacing: "0.04em" }}>
                {role.location}
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(34px, 6vw, 68px)", fontWeight: 800, color: INK,
              letterSpacing: "-0.04em", lineHeight: 0.97, marginBottom: 20,
            }}>
              {role.title}
            </h1>

            <p style={{ fontSize: "clamp(15px, 1.8vw, 18px)", color: INK_MUTED, lineHeight: 1.7, maxWidth: 560 }}>
              {role.summary}
            </p>
          </div>

          {/* Apply CTA — top */}
          <div style={{
            padding: "22px 26px",
            border: `1px solid ${ORANGE}30`, background: `${ORANGE}06`,
            clipPath: NOTCH_CLIP,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: 16, marginBottom: 52,
          }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 4 }}>Ready to apply?</p>
              <p style={{ fontSize: 12.5, color: INK_MUTED }}>
                Email portfolio + intro · subject:{" "}
                <strong style={{ color: INK }}>{role.title} Application</strong>
              </p>
            </div>
            <ApplyButtonSmall href={applyHref} />
          </div>

          {/* Content sections */}
          <Section label="About the role">
            {role.about.split("\n\n").map((para, i) => (
              <p key={i} style={{ fontSize: 15.5, color: INK_MUTED, lineHeight: 1.78, marginBottom: 16 }}>
                {para}
              </p>
            ))}
          </Section>

          <Section label="What you'll do">
            <BulletList items={role.responsibilities} />
          </Section>

          {role.wontDo && role.wontDo.length > 0 && (
            <Section label="What you won't do">
              <BulletList items={role.wontDo} />
            </Section>
          )}

          <Section label="What we're looking for">
            <BulletList items={role.requirements} />
          </Section>

          {role.niceToHave.length > 0 && (
            <Section label="Nice to have">
              <BulletList items={role.niceToHave} />
            </Section>
          )}

          <Section label="Compensation">
            <BulletList items={role.whatYouGet} />
          </Section>

          {role.successLooks && role.successLooks.length > 0 && (
            <Section label="What success looks like">
              <BulletList items={role.successLooks} />
            </Section>
          )}

          {/* Apply CTA — bottom */}
          <div style={{ marginTop: 60, paddingTop: 48, borderTop: `1px solid ${BORDER}` }}>
            <h2 style={{
              fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, color: INK,
              letterSpacing: "-0.03em", lineHeight: 1.08, marginBottom: 14,
            }}>
              Sound like you?<br />
              <span style={{ color: ORANGE }}>Let&apos;s talk.</span>
            </h2>
            <p style={{ fontSize: 14.5, color: INK_MUTED, lineHeight: 1.7, maxWidth: 440, marginBottom: 32 }}>
              Email us your portfolio and a short note on why this role. We read every application and reply within a few days.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
              <ApplyButton href={applyHref} label={`Apply for ${role.title}`} />
              <Link href="/careers" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 20px", border: `1px solid ${BORDER}`,
                color: INK_MUTED, fontWeight: 600, fontSize: 13,
                borderRadius: 2, textDecoration: "none",
              }}>
                <ArrowLeft size={13} /> View all roles
              </Link>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  )
}
