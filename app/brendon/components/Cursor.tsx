"use client"

// Contextual cursor (spec §6.5) — pointer:fine only, never hides the native
// cursor. Elements anywhere on the page with data-cursor="Label" swap the
// dot for a label pill on hover.
import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap-utils"
import { chrome } from "../lib/chrome"

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const fine = matchMedia("(pointer: fine)").matches
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduced) return
    const cur = cursorRef.current
    const lab = labelRef.current
    if (!cur || !lab) return

    const cx = gsap.quickTo(cur, "x", { duration: 0.35, ease: "expo.out" })
    const cy = gsap.quickTo(cur, "y", { duration: 0.35, ease: "expo.out" })
    function onMove(e: PointerEvent) {
      cx(e.clientX)
      cy(e.clientY)
    }
    addEventListener("pointermove", onMove, { passive: true })

    let current: Element | null = null
    function onOver(e: PointerEvent) {
      const t = (e.target as HTMLElement).closest("[data-cursor]")
      if (t === current) return
      current = t
      if (t && !chrome.isInspectOn?.()) {
        lab!.textContent = (t as HTMLElement).dataset.cursor ?? ""
        cur!.classList.add("has-label")
        gsap.to(lab!, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)", overwrite: true })
      } else {
        cur!.classList.remove("has-label")
        gsap.to(lab!, { opacity: 0, scale: 0.5, duration: 0.2, overwrite: true })
      }
    }
    document.addEventListener("pointerover", onOver)

    return () => {
      removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerover", onOver)
    }
  }, [])

  return (
    <div className="cursor" id="cursor" aria-hidden="true" ref={cursorRef}>
      <span className="c-dot" />
      <span className="c-lab" ref={labelRef} />
    </div>
  )
}
