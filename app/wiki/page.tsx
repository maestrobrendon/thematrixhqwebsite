"use client"

import { useState } from "react"
import WikiShell from "@/components/wiki/WikiShell"
import { SEARCH_INDEX } from "@/lib/wiki/searchIndex"
import {
  BuildingOffice, Compass, Heart, Users, PaintBrush, Toolbox,
  Briefcase, UsersFour, Lightbulb, ChatText, CalendarBlank, FolderOpen,
  BookOpen, FileText, Handshake,
  CaretDown,
} from "@phosphor-icons/react"
import Link from "next/link"

const ICONS: Record<string, React.ReactNode> = {
  "what-is-thematrixhq":        <BuildingOffice size={14} weight="duotone" />,
  "compass":                    <Compass size={14} weight="duotone" />,
  "core-values":                <Heart size={14} weight="duotone" />,
  "talent-directory":           <Users size={14} weight="duotone" />,
  "brand-guidelines":           <PaintBrush size={14} weight="duotone" />,
  "tools-and-access":           <Toolbox size={14} weight="duotone" />,
  "services":                   <Briefcase size={14} weight="duotone" />,
  "roles-and-responsibilities": <UsersFour size={14} weight="duotone" />,
  "working-principles":         <Lightbulb size={14} weight="duotone" />,
  "communication-guide":        <ChatText size={14} weight="duotone" />,
  "meetings":                   <CalendarBlank size={14} weight="duotone" />,
  "file-storage-and-naming":    <FolderOpen size={14} weight="duotone" />,
  "sales-playbook":             <BookOpen size={14} weight="duotone" />,
  "sales-agent-agreement":      <FileText size={14} weight="duotone" />,
  "sales-lead-agreement":       <Handshake size={14} weight="duotone" />,
}

function SectionGroup({
  label,
  entries,
  accent,
  defaultOpen = true,
}: {
  label: string
  entries: typeof SEARCH_INDEX
  accent?: string
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div style={{ borderBottom: "1px solid var(--wiki-ink-07)" }}>
      {/* Section header — click to expand/collapse */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%", display: "flex", alignItems: "center", gap: 10,
          padding: "16px 0", background: "none", border: "none", cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontFamily: "var(--wiki-font-display)", fontWeight: 600, fontSize: 15,
            letterSpacing: "-0.015em", color: accent ?? "var(--wiki-ink)", flex: 1,
          }}
        >
          {label}
        </span>
        <span className="wiki-eyebrow" style={{ fontSize: 9, marginRight: 8 }}>
          {entries.length} pages
        </span>
        <CaretDown
          size={13}
          style={{
            color: "var(--wiki-ink-40)",
            transform: open ? "rotate(0deg)" : "rotate(-90deg)",
            transition: "transform 0.18s ease",
            flexShrink: 0,
          }}
        />
      </button>

      {/* Page list */}
      {open && (
        <div style={{ paddingBottom: 12 }}>
          {entries.map((entry) => (
            <Link
              key={entry.id}
              href={entry.href}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "8px 12px", borderRadius: 2,
                  transition: "background 0.1s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--wiki-paper)" }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent" }}
              >
                <span style={{ color: "var(--wiki-ink-40)", flexShrink: 0, display: "flex" }}>
                  {ICONS[entry.id]}
                </span>
                <span
                  style={{
                    fontFamily: "var(--wiki-font-body)", fontSize: 14,
                    color: "var(--wiki-ink)", fontWeight: 500, flex: 1,
                  }}
                >
                  {entry.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default function WikiHomePage() {
  const company   = SEARCH_INDEX.filter((e) => e.section === "Company")
  const howWeWork = SEARCH_INDEX.filter((e) => e.section === "How We Work")
  const sales     = SEARCH_INDEX.filter((e) => e.section === "Sales")

  return (
    <WikiShell>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "40px 40px 80px" }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <p className="wiki-eyebrow" style={{ marginBottom: 8 }}>Internal Knowledge Base</p>
          <h1
            style={{
              fontFamily: "var(--wiki-font-display)", fontWeight: 600,
              fontSize: "clamp(24px, 4vw, 34px)", letterSpacing: "-0.025em",
              lineHeight: 1.08, color: "var(--wiki-ink)", marginBottom: 10,
            }}
          >
            thematrixHQ Wiki
          </h1>
          <p style={{ fontSize: 14.5, color: "var(--wiki-ink-60)", maxWidth: 480 }}>
            Everything the team needs to know, in one place. Use the sidebar or search{" "}
            <kbd style={{ fontFamily: "var(--wiki-font-mono)", fontSize: 10, background: "var(--wiki-paper)", border: "1px solid var(--wiki-ink-12)", padding: "1px 5px" }}>
              ⌘K
            </kbd>{" "}
            to find anything fast.
          </p>
        </div>

        {/* Collapsible sections */}
        <SectionGroup label="Company"      entries={company}   accent="var(--wiki-root)" defaultOpen={true} />
        <SectionGroup label="How We Work"  entries={howWeWork}                            defaultOpen={true} />
        <SectionGroup label="Sales"        entries={sales}     accent="var(--wiki-human)" defaultOpen={true} />

        {/* Footer */}
        <div style={{ marginTop: 40, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <p className="wiki-eyebrow" style={{ fontSize: 9 }}>{SEARCH_INDEX.length} pages &mdash; thematrixHQ Internal</p>
          <p className="wiki-eyebrow" style={{ fontSize: 9 }}>wiki.thematrixhq.com</p>
        </div>
      </div>
    </WikiShell>
  )
}
