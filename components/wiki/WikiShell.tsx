"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useCallback } from "react"
import { MagnifyingGlass, SignOut, House } from "@phosphor-icons/react"
import SearchPalette from "./SearchPalette"

const NAV = [
  {
    section: "Company",
    items: [
      { label: "What is thematrixHQ?", href: "/company/what-is-thematrixhq" },
      { label: "Compass",              href: "/company/compass" },
      { label: "Core Values",          href: "/company/core-values" },
      { label: "Talent Directory",     href: "/company/talent-directory" },
      { label: "Brand Guidelines",     href: "/company/brand-guidelines" },
      { label: "Tools and Access",     href: "/company/tools-and-access" },
    ],
  },
  {
    section: "How We Work",
    items: [
      { label: "Services",                   href: "/how-we-work/services" },
      { label: "Roles and Responsibilities", href: "/how-we-work/roles-and-responsibilities" },
      { label: "Working Principles",         href: "/how-we-work/working-principles" },
      { label: "Communication Guide",        href: "/how-we-work/communication-guide" },
      { label: "Meetings",                   href: "/how-we-work/meetings" },
      { label: "File Storage and Naming",    href: "/how-we-work/file-storage-and-naming" },
    ],
  },
  {
    section: "Sales",
    items: [
      { label: "Sales Playbook",          href: "/sales/sales-playbook" },
      { label: "Agent Agreement",         href: "/sales/sales-agent-agreement" },
      { label: "Lead Agreement",          href: "/sales/sales-lead-agreement" },
    ],
  },
]

async function handleLogout(router: ReturnType<typeof useRouter>) {
  await fetch("/api/logout", { method: "POST" })
  router.push("/access")
  router.refresh()
}

export default function WikiShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [searchOpen, setSearchOpen] = useState(false)
  const openSearch = useCallback(() => setSearchOpen(true), [])

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "var(--wiki-font-body)" }}>
      {/* Sidebar */}
      <nav style={{ width: 260, flexShrink: 0, background: "var(--wiki-paper)", borderRight: "1px solid var(--wiki-ink-12)", display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
        <div style={{ padding: "20px 18px 16px", borderBottom: "1px solid var(--wiki-ink-12)" }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 15, height: 15, background: "var(--wiki-root)", display: "inline-block", clipPath: "polygon(0 0, 70% 0, 100% 30%, 100% 100%, 30% 100%, 0 70%)", flexShrink: 0 }} />
            <span style={{ fontFamily: "var(--wiki-font-display)", fontWeight: 600, fontSize: 13, letterSpacing: "-0.02em", color: "var(--wiki-ink)" }}>thematrixHQ</span>
            <span className="wiki-eyebrow" style={{ marginLeft: 2, fontSize: 8, letterSpacing: "0.1em", color: "var(--wiki-ink-40)" }}>Wiki</span>
          </Link>
        </div>

        <button onClick={openSearch} style={{ margin: "12px 12px 8px", padding: "8px 10px", background: "var(--wiki-white)", border: "1px solid var(--wiki-ink-12)", cursor: "pointer", display: "flex", alignItems: "center", gap: 7, fontFamily: "var(--wiki-font-body)", fontSize: 12.5, color: "var(--wiki-ink-40)", textAlign: "left", width: "calc(100% - 24px)" }}>
          <MagnifyingGlass size={13} />
          Search...
          <span style={{ marginLeft: "auto", fontFamily: "var(--wiki-font-mono)", fontSize: 9, letterSpacing: "0.06em" }}>⌘K</span>
        </button>

        <div style={{ flex: 1, padding: "8px 0 20px" }}>
          {NAV.map((group) => (
            <div key={group.section} style={{ marginBottom: 4 }}>
              <p className="wiki-eyebrow" style={{ padding: "12px 18px 5px", fontSize: 9 }}>{group.section}</p>
              {group.items.map((item) => {
                const active = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} style={{ display: "block", padding: "6px 18px", fontFamily: "var(--wiki-font-body)", fontSize: 13, fontWeight: active ? 600 : 400, color: active ? "var(--wiki-ink)" : "var(--wiki-ink-60)", textDecoration: "none", background: active ? "var(--wiki-white)" : "transparent", borderLeft: active ? "2px solid var(--wiki-human)" : "2px solid transparent", transition: "all 0.12s ease" }}>
                    {item.label}
                  </Link>
                )
              })}
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid var(--wiki-ink-12)", padding: "12px 14px", display: "flex", gap: 8 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "var(--wiki-font-mono)", fontSize: 10, color: "var(--wiki-ink-40)", letterSpacing: "0.08em", textDecoration: "none", padding: "4px 6px" }}>
            <House size={12} /> Home
          </Link>
          <button onClick={() => handleLogout(router)} style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "var(--wiki-font-mono)", fontSize: 10, color: "var(--wiki-ink-40)", letterSpacing: "0.08em", background: "none", border: "none", cursor: "pointer", padding: "4px 6px" }}>
            <SignOut size={12} /> Sign out
          </button>
        </div>
      </nav>

      {/* Main */}
      <main style={{ flex: 1, minWidth: 0, background: "var(--wiki-white)" }}>
        <div style={{ borderBottom: "1px solid var(--wiki-ink-07)", padding: "10px 40px", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
          <button onClick={openSearch} style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--wiki-font-body)", fontSize: 12.5, color: "var(--wiki-ink-40)", background: "none", border: "1px solid var(--wiki-ink-12)", cursor: "pointer", padding: "5px 10px" }}>
            <MagnifyingGlass size={12} />
            Search pages...
            <span style={{ fontFamily: "var(--wiki-font-mono)", fontSize: 9, letterSpacing: "0.06em", marginLeft: 4 }}>⌘K</span>
          </button>
        </div>
        <div>{children}</div>
      </main>

      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
