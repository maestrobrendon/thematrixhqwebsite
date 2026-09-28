"use client"

// Inspect mode (spec §6.7) — the signature feature. Toggles a class on the
// .brendon-scope root (not document.body, so it can't leak into other
// routes), draws a live 12-col grid + padding redlines, and shows a live
// type-spec card / token panel computed from getComputedStyle, never
// hard-coded values.
import { useEffect, useRef, useState } from "react"
import { ScrollTrigger } from "@/lib/gsap-utils"
import { chrome, registerChromeHandler, unregisterChromeHandler } from "../lib/chrome"

const TOKENS: [string, string][] = [
  ["--moss-800", "Moss 800"],
  ["--moss-900", "Moss 900"],
  ["--bone", "Bone"],
  ["--lichen", "Lichen"],
  ["--select", "Select"],
  ["--note", "Note"],
]

function toHex(rgb: string) {
  const m = rgb.match(/\d+(\.\d+)?/g)
  if (!m) return rgb
  return "#" + m.slice(0, 3).map((n) => Number(n).toString(16).padStart(2, "0")).join("").toUpperCase()
}

export function InspectMode() {
  const [tokens, setTokens] = useState<{ name: string; hex: string }[]>([])
  const specRef = useRef<HTMLDivElement>(null)
  const onRef = useRef(false)

  useEffect(() => {
    const scope = document.querySelector<HTMLElement>(".brendon-scope")
    const specEl = specRef.current
    if (!scope || !specEl) return

    const rootCS = getComputedStyle(scope)
    setTokens(TOKENS.map(([v, n]) => ({ name: n, hex: rootCS.getPropertyValue(v).trim() })))

    let ixTag: HTMLDivElement | null = null

    function drawGaps() {
      document.querySelectorAll(".ix-gap").forEach((g) => g.remove())
      if (!onRef.current) return
      scope!.querySelectorAll<HTMLElement>("[data-ix-gap]").forEach((sec) => {
        const pt = parseFloat(getComputedStyle(sec).paddingTop)
        if (!pt) return
        const r = sec.getBoundingClientRect()
        const wrapEl = sec.querySelector<HTMLElement>(".wrap")
        const wrap = wrapEl?.getBoundingClientRect()
        const g = document.createElement("div")
        g.className = "ix-gap"
        const xVal = (wrap ? wrap.left + parseFloat(getComputedStyle(wrapEl!).paddingLeft) : 24) - 12
        g.style.cssText = `top:${r.top + scrollY}px;height:${pt}px;--x:${xVal}px`
        g.innerHTML = `<span>padding-top ${Math.round(pt)}</span>`
        document.body.appendChild(g)
      })
    }

    function toggle(force?: boolean) {
      onRef.current = force ?? !onRef.current
      scope!.classList.toggle("inspect", onRef.current)
      document.getElementById("ixBtn")?.setAttribute("aria-pressed", String(onRef.current))
      drawGaps()
      if (!onRef.current) {
        specEl!.style.display = "none"
        ixTag?.remove()
        ixTag = null
      }
      chrome.showToast?.(
        onRef.current
          ? "Inspect mode on. Hover any text for its live type spec. Press I to exit."
          : "Inspect mode off"
      )
    }
    registerChromeHandler("toggleInspect", toggle)
    registerChromeHandler("isInspectOn", () => onRef.current)

    const refreshListener = () => drawGaps()
    ScrollTrigger.addEventListener("refresh", refreshListener)
    addEventListener("resize", () => onRef.current && drawGaps())

    function onPointerOver(e: PointerEvent) {
      if (!onRef.current) return
      const c = (e.target as HTMLElement).closest<HTMLElement>("[data-ix]")
      ixTag?.remove()
      ixTag = null
      if (c) {
        const r = c.getBoundingClientRect()
        ixTag = document.createElement("div")
        ixTag.className = "ix-tag"
        ixTag.textContent = `${c.dataset.ix}  ${Math.round(r.width)}×${Math.round(r.height)}`
        ixTag.style.cssText = `left:${r.left + scrollX}px;top:${Math.max(0, r.top + scrollY - 24)}px`
        document.body.appendChild(ixTag)
      }
    }
    document.addEventListener("pointerover", onPointerOver)

    function onPointerMove(e: PointerEvent) {
      if (!onRef.current) return
      const t = (e.target as HTMLElement).closest<HTMLElement>(".ch, [data-type], h1, h2, h3, p, .chip, .btn")
      if (!t || t.closest(".ix-panel,.cmd,.ix-spec")) {
        specEl!.style.display = "none"
        return
      }
      const cs = getComputedStyle(t)
      const fvs = cs.fontVariationSettings.match(/"wdth"\s*([\d.]+)/)
      specEl!.innerHTML = `<dl>
        <dt>font</dt><dd>${cs.fontFamily.split(",")[0].replace(/"/g, "")}</dd>
        <dt>size / lh</dt><dd>${Math.round(parseFloat(cs.fontSize))} / ${cs.lineHeight === "normal" ? "normal" : Math.round(parseFloat(cs.lineHeight))}</dd>
        <dt>weight</dt><dd>${Math.round(Number(cs.fontWeight))}${fvs ? `, wdth ${Math.round(Number(fvs[1]))}` : ""}</dd>
        <dt>tracking</dt><dd>${cs.letterSpacing === "normal" ? "0" : (parseFloat(cs.letterSpacing) / parseFloat(cs.fontSize)).toFixed(3) + "em"}</dd>
        <dt>color</dt><dd><span class="sw" style="background:${cs.color}"></span>${toHex(cs.color)}</dd></dl>`
      specEl!.style.display = "block"
      const x = Math.min(e.clientX + 18, innerWidth - specEl!.offsetWidth - 12)
      const y = Math.min(e.clientY + 18, innerHeight - specEl!.offsetHeight - 12)
      specEl!.style.left = x + "px"
      specEl!.style.top = y + "px"
    }
    document.addEventListener("pointermove", onPointerMove, { passive: true })

    function onKeydown(e: KeyboardEvent) {
      const typing = /input|textarea/i.test((e.target as HTMLElement).tagName)
      if (!typing && !e.metaKey && !e.ctrlKey && !e.altKey && e.key.toLowerCase() === "i" && !chrome.isCommandMenuOpen?.()) {
        toggle()
      }
      if (e.key === "Escape" && onRef.current && !chrome.isCommandMenuOpen?.() && !chrome.isSheetOpen?.()) toggle(false)
    }
    document.addEventListener("keydown", onKeydown)

    return () => {
      unregisterChromeHandler("toggleInspect")
      unregisterChromeHandler("isInspectOn")
      ScrollTrigger.removeEventListener("refresh", refreshListener)
      document.removeEventListener("pointerover", onPointerOver)
      document.removeEventListener("pointermove", onPointerMove)
      document.removeEventListener("keydown", onKeydown)
    }
  }, [])

  return (
    <>
      <div className="ix-grid" aria-hidden="true">
        <div className="wrap">
          {Array.from({ length: 12 }).map((_, i) => <i key={i} />)}
        </div>
      </div>
      <div className="ix-spec" id="ixSpec" aria-hidden="true" ref={specRef} />
      <aside className="ix-panel" id="ixPanel" aria-label="Design tokens">
        <h4>Tokens <span style={{ fontWeight: 400, opacity: 0.6 }}>click to copy</span></h4>
        <div id="ixTokens">
          {tokens.map((t) => (
            <button
              key={t.name}
              data-hex={t.hex}
              onClick={() => {
                navigator.clipboard?.writeText(t.hex).then(() => chrome.showToast?.("Copied " + t.hex))
              }}
            >
              <span className="sw" style={{ background: t.hex }} />
              {t.name}
              <code>{t.hex}</code>
            </button>
          ))}
        </div>
      </aside>
    </>
  )
}
