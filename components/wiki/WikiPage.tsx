import Link from "next/link"
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr"

interface WikiPageProps {
  section: "Company" | "How We Work"
  title: string
  owner?: string
  team?: string
  lastUpdated?: string
  children: React.ReactNode
  pendingNote?: string
}

export default function WikiPage({
  section,
  title,
  owner = "[Maestro]",
  team = "All",
  lastUpdated = "—",
  children,
  pendingNote,
}: WikiPageProps) {
  return (
    <article style={{ maxWidth: 760, margin: "0 auto", padding: "40px 40px 80px" }}>
      <nav style={{ marginBottom: 28, display: "flex", alignItems: "center", gap: 8 }}>
        <Link
          href="/"
          style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            fontFamily: "var(--wiki-font-mono)", fontSize: 10,
            color: "var(--wiki-ink-40)", letterSpacing: "0.1em",
            textDecoration: "none", textTransform: "uppercase",
          }}
        >
          <ArrowLeft size={11} />
          Wiki home
        </Link>
        <span style={{ color: "var(--wiki-ink-20)", fontSize: 11 }}>/</span>
        <span style={{ fontFamily: "var(--wiki-font-mono)", fontSize: 10, color: "var(--wiki-ink-40)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {section}
        </span>
      </nav>

      <p className="wiki-eyebrow" style={{ marginBottom: 8, color: "var(--wiki-human)", fontSize: 10 }}>
        {section} · Wiki Page
      </p>

      <h1 style={{ fontFamily: "var(--wiki-font-display)", fontWeight: 600, fontSize: "clamp(26px, 4vw, 38px)", letterSpacing: "-0.025em", lineHeight: 1.08, color: "var(--wiki-ink)", marginBottom: 16 }}>
        {title}
      </h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 16px", marginBottom: 32, paddingBottom: 24, borderBottom: "1px solid var(--wiki-ink-12)" }}>
        {[["Owner", owner], ["Team", team], ["Last updated", lastUpdated]].map(([label, value]) => (
          <span key={label} style={{ display: "flex", gap: 5, alignItems: "center" }}>
            <span className="wiki-eyebrow" style={{ fontSize: 9 }}>{label}</span>
            <span style={{ fontFamily: "var(--wiki-font-mono)", fontSize: 11, color: "var(--wiki-ink-60)" }}>{value}</span>
          </span>
        ))}
      </div>

      {pendingNote && (
        <div style={{ border: "1px solid var(--wiki-ink-12)", borderLeft: "3px solid var(--wiki-human)", padding: "12px 16px", marginBottom: 32, background: "var(--wiki-paper)" }}>
          <p className="wiki-eyebrow" style={{ color: "var(--wiki-human)", fontSize: 9, marginBottom: 4 }}>Pending update</p>
          <p style={{ fontSize: 13.5, color: "var(--wiki-ink-60)", lineHeight: 1.55 }}>{pendingNote}</p>
        </div>
      )}

      <div className="wiki-body">{children}</div>
    </article>
  )
}
