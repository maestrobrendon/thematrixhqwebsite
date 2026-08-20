"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { MagnifyingGlass, X, ArrowRight } from "@phosphor-icons/react"
import Fuse from "fuse.js"
import { SEARCH_INDEX, type SearchEntry } from "@/lib/wiki/searchIndex"

const fuse = new Fuse(SEARCH_INDEX, {
  keys: [
    { name: "title",       weight: 0.5 },
    { name: "description", weight: 0.3 },
    { name: "body",        weight: 0.2 },
  ],
  threshold: 0.35,
  includeMatches: true,
  minMatchCharLength: 2,
})

function getSnippet(entry: SearchEntry, query: string): string {
  const lower = query.toLowerCase()
  const source = entry.body
  const idx = source.toLowerCase().indexOf(lower)
  if (idx === -1) return entry.description
  const start = Math.max(0, idx - 40)
  const end = Math.min(source.length, idx + 100)
  return (start > 0 ? "..." : "") + source.slice(start, end).trim() + (end < source.length ? "..." : "")
}

interface Props { open: boolean; onClose: () => void }

export default function SearchPalette({ open, onClose }: Props) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchEntry[]>([])
  const [cursor, setCursor] = useState(0)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) { setQuery(""); setResults([]); setCursor(0); setTimeout(() => inputRef.current?.focus(), 50) }
  }, [open])

  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    setResults(fuse.search(query).map((r) => r.item).slice(0, 8))
    setCursor(0)
  }, [query])

  const navigate = useCallback((entry: SearchEntry) => { onClose(); router.push(entry.href) }, [onClose, router])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") { onClose(); return }
      if (!open) return
      if (e.key === "ArrowDown") { e.preventDefault(); setCursor((c) => Math.min(c + 1, results.length - 1)) }
      if (e.key === "ArrowUp")   { e.preventDefault(); setCursor((c) => Math.max(c - 1, 0)) }
      if (e.key === "Enter" && results[cursor]) navigate(results[cursor])
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, results, cursor, navigate, onClose])

  if (!open) return null

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(10,10,10,0.45)", zIndex: 100, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "12vh" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ width: "100%", maxWidth: 560, background: "var(--wiki-white)", border: "1px solid var(--wiki-ink-12)", overflow: "hidden", boxShadow: "0 16px 48px rgba(10,10,10,0.14)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 16px", borderBottom: "1px solid var(--wiki-ink-12)" }}>
          <MagnifyingGlass size={16} style={{ color: "var(--wiki-ink-40)", flexShrink: 0 }} />
          <input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the wiki..."
            style={{ flex: 1, fontFamily: "var(--wiki-font-body)", fontSize: 15, color: "var(--wiki-ink)", border: "none", outline: "none", padding: "16px 0", background: "transparent" }} />
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--wiki-ink-40)", padding: 4, display: "flex" }}>
            <X size={14} />
          </button>
        </div>

        <div style={{ maxHeight: 380, overflowY: "auto" }}>
          {!query.trim() ? (
            <div style={{ padding: "20px 18px" }}>
              <p className="wiki-eyebrow" style={{ marginBottom: 10 }}>All pages</p>
              {SEARCH_INDEX.map((entry, i) => (
                <button key={entry.id} onClick={() => navigate(entry)}
                  style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "7px 8px", background: cursor === i ? "var(--wiki-paper)" : "transparent", border: "none", cursor: "pointer", textAlign: "left", borderRadius: 2 }}
                  onMouseEnter={() => setCursor(i)}>
                  <span style={{ fontFamily: "var(--wiki-font-body)", fontSize: 13.5, color: "var(--wiki-ink)", fontWeight: 500 }}>{entry.title}</span>
                  <span className="wiki-eyebrow" style={{ marginLeft: "auto", fontSize: 9, whiteSpace: "nowrap" }}>{entry.section}</span>
                </button>
              ))}
            </div>
          ) : results.length === 0 ? (
            <p style={{ padding: "20px 18px", fontSize: 13.5, color: "var(--wiki-ink-40)" }}>No results for &ldquo;{query}&rdquo;</p>
          ) : (
            <div style={{ padding: "8px 0" }}>
              {results.map((entry, i) => (
                <button key={entry.id} onClick={() => navigate(entry)}
                  style={{ display: "flex", alignItems: "flex-start", gap: 12, width: "100%", padding: "10px 18px", background: cursor === i ? "var(--wiki-paper)" : "transparent", border: "none", cursor: "pointer", textAlign: "left", borderLeft: cursor === i ? "2px solid var(--wiki-human)" : "2px solid transparent" }}
                  onMouseEnter={() => setCursor(i)}>
                  <ArrowRight size={14} style={{ marginTop: 3, color: "var(--wiki-ink-40)", flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                      <span style={{ fontFamily: "var(--wiki-font-body)", fontSize: 13.5, fontWeight: 600, color: "var(--wiki-ink)" }}>{entry.title}</span>
                      <span className="wiki-eyebrow" style={{ fontSize: 9 }}>{entry.section}</span>
                    </div>
                    <p style={{ fontSize: 12, color: "var(--wiki-ink-60)", lineHeight: 1.5, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                      {getSnippet(entry, query)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div style={{ borderTop: "1px solid var(--wiki-ink-07)", padding: "8px 16px", display: "flex", gap: 14 }}>
          {[["↑↓", "navigate"], ["↵", "open"], ["Esc", "close"]].map(([key, label]) => (
            <span key={key} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ fontFamily: "var(--wiki-font-mono)", fontSize: 9, background: "var(--wiki-paper)", padding: "2px 5px", color: "var(--wiki-ink-60)", letterSpacing: "0.04em" }}>{key}</span>
              <span style={{ fontFamily: "var(--wiki-font-mono)", fontSize: 9, color: "var(--wiki-ink-40)", letterSpacing: "0.06em" }}>{label}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
