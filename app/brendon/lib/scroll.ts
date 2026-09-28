// Lenis-backed smooth scroll helper (spec §6.2). SmoothScroll.tsx creates the
// singleton and stores it on window; every other client component (case
// stack snapping, command menu "go to", dock/hash links, dialogs locking
// scroll) reads it through here instead of importing Lenis directly.
import type Lenis from "lenis"

declare global {
  interface Window {
    __brendonLenis?: Lenis
  }
}

export function getLenis(): Lenis | undefined {
  if (typeof window === "undefined") return undefined
  return window.__brendonLenis
}

export function goTo(target: string | number | Element, options?: { duration?: number }) {
  if (typeof window === "undefined") return
  const lenis = getLenis()
  if (lenis) {
    const dest = typeof target === "string" || typeof target === "number" ? target : (target as HTMLElement)
    lenis.scrollTo(dest, { duration: options?.duration ?? 1.3 })
    return
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" })
    return
  }
  const el = typeof target === "string" ? document.querySelector(target) : target
  el?.scrollIntoView({ behavior: "smooth" })
}

export function lockScroll(on: boolean) {
  if (typeof document === "undefined") return
  const lenis = getLenis()
  if (lenis) {
    if (on) lenis.stop()
    else lenis.start()
  }
  document.documentElement.style.overflow = on ? "hidden" : ""
}
