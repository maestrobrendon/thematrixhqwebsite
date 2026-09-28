"use client"

// Single toast live-region (spec §6.8). Registers chrome.showToast so any
// component can surface a message without owning its own toast UI.
import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap-utils"
import { registerChromeHandler, unregisterChromeHandler } from "../lib/chrome"

export function Toast() {
  const toastRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    const el = toastRef.current
    if (!el) return
    function show(message: string) {
      el!.textContent = message
      clearTimeout(timerRef.current)
      gsap.to(el, { opacity: 1, y: 0, duration: 0.35, ease: "expo.out", overwrite: true, startAt: { y: 12 } })
      timerRef.current = setTimeout(() => gsap.to(el, { opacity: 0, y: 8, duration: 0.3 }), 2600)
    }
    registerChromeHandler("showToast", show)
    return () => {
      unregisterChromeHandler("showToast")
      clearTimeout(timerRef.current)
    }
  }, [])

  return <div className="toast" id="toast" role="status" aria-live="polite" ref={toastRef} />
}
