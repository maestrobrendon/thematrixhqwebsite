"use client"

// Lenis-driven smooth scroll (spec §6.2), replacing v1's
// ScrollTrigger.normalizeScroll(true). Stores the instance on
// window.__brendonLenis so lib/scroll.ts's goTo()/lockScroll() and every
// interactive component (case stack, command menu, dialogs) can drive it
// without each one creating its own instance.
import { useEffect } from "react"
import Lenis from "lenis"
import { gsap, ScrollTrigger } from "@/lib/gsap-utils"

export function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const lenis = new Lenis({ lerp: 0.1, anchors: false })
    lenis.on("scroll", ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    window.__brendonLenis = lenis

    function onAnchorClick(e: MouseEvent) {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!a) return
      const id = a.getAttribute("href")
      if (!id || id.length < 2 || !document.querySelector(id)) return
      e.preventDefault()
      if (id === "#top") lenis.scrollTo(0, { duration: 1.3 })
      else lenis.scrollTo(id, { duration: 1.3 })
    }
    document.addEventListener("click", onAnchorClick)

    return () => {
      document.removeEventListener("click", onAnchorClick)
      gsap.ticker.remove(raf)
      lenis.destroy()
      window.__brendonLenis = undefined
    }
  }, [])

  return null
}
