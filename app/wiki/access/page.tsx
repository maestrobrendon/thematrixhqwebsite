"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AccessPage() {
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      })
      if (res.ok) {
        router.push("/")
        router.refresh()
      } else {
        setError("Access denied. Check your email and access code.")
      }
    } catch {
      setError("Something went wrong. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--wiki-ink)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40 }}>
          <span style={{ width: 20, height: 20, background: "var(--wiki-root)", display: "inline-block", clipPath: "polygon(0 0, 70% 0, 100% 30%, 100% 100%, 30% 100%, 0 70%)" }} />
          <span style={{ fontFamily: "var(--wiki-font-display)", fontWeight: 600, fontSize: 15, letterSpacing: "-0.02em", color: "var(--wiki-white)" }}>thematrixHQ</span>
          <span style={{ fontFamily: "var(--wiki-font-mono)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>Internal Wiki</span>
        </div>

        <div style={{ background: "var(--wiki-white)", clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)", padding: 32 }}>
          <p style={{ fontFamily: "var(--wiki-font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--wiki-ink-40)", marginBottom: 24 }}>
            Team access only
          </p>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ display: "block", fontFamily: "var(--wiki-font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--wiki-ink-40)", marginBottom: 6 }}>
                Email
              </label>
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                style={{ width: "100%", padding: "10px 12px", border: "1px solid var(--wiki-ink-12)", background: "var(--wiki-paper)", fontFamily: "var(--wiki-font-body)", fontSize: 14, color: "var(--wiki-ink)", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontFamily: "var(--wiki-font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--wiki-ink-40)", marginBottom: 6 }}>
                Access code
              </label>
              <input
                type="password" value={code} onChange={(e) => setCode(e.target.value)} required
                style={{ width: "100%", padding: "10px 12px", border: "1px solid var(--wiki-ink-12)", background: "var(--wiki-paper)", fontFamily: "var(--wiki-font-body)", fontSize: 14, color: "var(--wiki-ink)", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            {error && (
              <p style={{ fontFamily: "var(--wiki-font-mono)", fontSize: 11, color: "var(--wiki-human)", letterSpacing: "0.04em" }}>{error}</p>
            )}
            <button
              type="submit" disabled={loading}
              style={{ marginTop: 8, padding: "12px 20px", background: "var(--wiki-ink)", color: "var(--wiki-white)", border: "none", fontFamily: "var(--wiki-font-display)", fontWeight: 600, fontSize: 14, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1, letterSpacing: "-0.01em" }}
            >
              {loading ? "Checking..." : "Enter the wiki"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
