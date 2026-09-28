"use client"

// Kinetic variable-font hook (spec §6.4) — shared by the hero name and the
// contact email. Splits text into aria-hidden char spans and lerps each
// char's `--w`/`--g` CSS custom properties toward a pointer-proximity target
// on a single gsap.ticker callback.
import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap-utils"

export type KineticOptions = {
  base?: () => number
  gBase?: number
  wAmp?: number
  gAmp?: number
  radius?: number
}

function splitChars(el: HTMLElement) {
  const text = el.textContent ?? ""
  el.setAttribute("aria-label", text)
  el.innerHTML = [...text]
    .map((ch) => `<span class="ch" aria-hidden="true">${ch === " " ? "&nbsp;" : ch}</span>`)
    .join("")
  return Array.from(el.querySelectorAll<HTMLElement>(".ch"))
}

export function useKineticType<T extends HTMLElement>(options: KineticOptions = {}) {
  const ref = useRef<T | null>(null)
  const activeRef = useRef(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fine = matchMedia("(pointer: fine)").matches
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches
    const { base = () => 100, gBase = 760, wAmp = 40, gAmp = 140, radius = 0.26 } = options

    const chars = splitChars(el)
    const state = chars.map(() => ({ w: base(), g: gBase }))
    let px: number | null = null

    const zone = (el.closest("[data-kinetic-zone]") as HTMLElement | null) ?? el
    function onMove(e: PointerEvent) {
      px = e.clientX
    }
    function onLeave() {
      px = null
    }
    if (fine && !reduced) {
      zone.addEventListener("pointermove", onMove)
      zone.addEventListener("pointerleave", onLeave)
    }

    const R = () => innerWidth * radius
    const tick = () => {
      if (!activeRef.current) return
      const b = base()
      chars.forEach((c, i) => {
        let f = 0
        if (px !== null) {
          const r = c.getBoundingClientRect()
          const d = Math.abs(px - (r.left + r.width / 2))
          f = Math.max(0, 1 - d / R())
          f = f * f * (3 - 2 * f)
        }
        const s = state[i]
        s.w += (b + wAmp * f - s.w) * 0.12
        s.g += (gBase + gAmp * f - s.g) * 0.12
        c.style.setProperty("--w", s.w.toFixed(2))
        c.style.setProperty("--g", s.g.toFixed(1))
      })
    }
    gsap.ticker.add(tick)

    return () => {
      gsap.ticker.remove(tick)
      zone.removeEventListener("pointermove", onMove)
      zone.removeEventListener("pointerleave", onLeave)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { ref, setActive: (v: boolean) => (activeRef.current = v) }
}
