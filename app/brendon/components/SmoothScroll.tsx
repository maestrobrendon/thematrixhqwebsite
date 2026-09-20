"use client"

import { useEffect } from "react"
import { ScrollTrigger } from "@/lib/gsap-utils"

// Native wheel/touch scrolling is inconsistent across browsers (choppy
// momentum on trackpads, address-bar-driven jumps on mobile Safari, etc.) —
// that inconsistency is what reads as "not smooth" independent of any of the
// page's own reveal animations. ScrollTrigger.normalizeScroll is GSAP's own
// fix for exactly this: it takes over low-level scroll-delta handling so the
// browser produces one consistent, smooth scroll everywhere, without
// replacing native scrolling with a virtual proxy (unlike ScrollSmoother) —
// so it doesn't disturb fixed positioning, anchor/hash navigation, or the
// existing framer-motion animations elsewhere on the page.
export function SmoothScroll() {
  useEffect(() => {
    const normalizer = ScrollTrigger.normalizeScroll(true)
    return () => {
      normalizer?.kill()
    }
  }, [])

  return null
}
