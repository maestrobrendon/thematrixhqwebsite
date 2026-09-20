'use client'

import { useEffect, useRef, type RefObject } from 'react'
import gsap from 'gsap/dist/gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import TextPlugin from 'gsap/dist/TextPlugin'
import Draggable from 'gsap/dist/Draggable'
import InertiaPlugin from 'gsap/dist/InertiaPlugin'

// Register all plugins once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin, Draggable, InertiaPlugin)
}

export { gsap, ScrollTrigger, Draggable, InertiaPlugin }

// ── Reusable scroll-reveal hooks ──────────────────────────────────────────
// The GSAP equivalent of framer-motion's `initial + whileInView +
// viewport:{once:true}` pattern — one mechanism reused across every /brendon
// component instead of each one hand-rolling its own ScrollTrigger.

type RevealOptions = {
  y?: number
  x?: number
  scale?: number
  /** Settle FROM this angle TO the element's own resting rotate (its current inline/CSS rotate). */
  rotateFrom?: number
  duration?: number
  delay?: number
  start?: string
  ease?: string
}

/** Fade + rise (or slide/scale/rotate-settle) a single element in once, on scroll into view. */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options: RevealOptions = {}): RefObject<T | null> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const { y = 0, x = 0, scale, rotateFrom, duration = 0.6, delay = 0, start = 'top 88%', ease = 'power3.out' } = options

    const fromVars: gsap.TweenVars = { opacity: 0 }
    const toVars: gsap.TweenVars = { opacity: 1, duration, delay, ease }
    if (y) {
      fromVars.y = y
      toVars.y = 0
    }
    if (x) {
      fromVars.x = x
      toVars.x = 0
    }
    if (scale !== undefined) {
      fromVars.scale = scale
      toVars.scale = 1
    }
    if (rotateFrom !== undefined) {
      // Resting rotate comes from whatever's already on the element (CSS
      // `rotate` set via className/style) — read it so "to" settles back to
      // that value instead of stomping it with an unrelated fixed number.
      const resting = gsap.getProperty(el, 'rotate') as number
      fromVars.rotate = rotateFrom
      toVars.rotate = resting
    }

    const tween = gsap.fromTo(el, fromVars, {
      ...toVars,
      scrollTrigger: { trigger: el, start, once: true },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}

/** Fade + rise every direct child matching `selector` in, staggered, once. */
export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  selector: string,
  options: RevealOptions & { stagger?: number } = {},
): RefObject<T | null> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const targets = el.querySelectorAll(selector)
    if (!targets.length) return
    const { y = 12, scale, stagger = 0.08, duration = 0.4, start = 'top 90%', ease = 'power3.out' } = options

    const fromVars: gsap.TweenVars = { opacity: 0, y }
    if (scale !== undefined) fromVars.scale = scale

    const tween = gsap.fromTo(targets, fromVars, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration,
      stagger,
      ease,
      scrollTrigger: { trigger: el, start, once: true },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}

/**
 * Scrub a tween's progress directly to scroll position across a trigger
 * element's transit. Returns a ref for the animated element; pass
 * `triggerRef` when the scroll range should be measured against a different
 * (usually larger, e.g. the whole section) ancestor element instead.
 */
export function useScrollScrub<T extends HTMLElement = HTMLDivElement>(
  fromVars: gsap.TweenVars,
  toVars: gsap.TweenVars,
  options: { start?: string; end?: string; triggerRef?: RefObject<HTMLElement | null> } = {},
): RefObject<T | null> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const { start = 'top bottom', end = 'bottom top', triggerRef } = options
    const trigger = triggerRef?.current ?? el
    const tween = gsap.fromTo(el, fromVars, {
      ...toVars,
      ease: 'none',
      scrollTrigger: { trigger, start, end, scrub: true },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}

// Reusable: fade + rise reveal for any element
export function revealUp(
  targets: string | Element | Element[],
  options: {
    delay?: number
    duration?: number
    stagger?: number
    start?: string
    y?: number
  } = {}
) {
  const {
    delay = 0,
    duration = 0.7,
    stagger = 0.1,
    start = 'top 88%',
    y = 32,
  } = options

  return gsap.fromTo(
    targets,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: typeof targets === 'string' ? targets : (targets as Element[])[0] || targets as Element,
        start,
        once: true,
      },
    }
  )
}

// Reusable: horizontal reveal for lines/words
export function revealLeft(
  targets: string | Element | Element[],
  options: { delay?: number; duration?: number; stagger?: number; start?: string } = {}
) {
  const { delay = 0, duration = 0.6, stagger = 0.08, start = 'top 88%' } = options
  return gsap.fromTo(
    targets,
    { opacity: 0, x: -24 },
    {
      opacity: 1,
      x: 0,
      duration,
      delay,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: typeof targets === 'string' ? targets : (targets as Element[])[0] || targets as Element,
        start,
        once: true,
      },
    }
  )
}

// Reusable: clip-path text reveal (line by line)
export function revealClip(
  targets: string | Element | Element[],
  options: { delay?: number; stagger?: number; start?: string } = {}
) {
  const { delay = 0, stagger = 0.12, start = 'top 85%' } = options
  return gsap.fromTo(
    targets,
    { clipPath: 'inset(0 0 100% 0)', y: 24 },
    {
      clipPath: 'inset(0 0 0% 0)',
      y: 0,
      duration: 0.8,
      delay,
      stagger,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: typeof targets === 'string' ? targets : (targets as Element[])[0] || targets as Element,
        start,
        once: true,
      },
    }
  )
}

// Reusable: parallax on scroll
export function parallaxY(
  target: string | Element,
  yPercent: number = -20,
  start: string = 'top bottom',
  end: string = 'bottom top'
) {
  return gsap.to(target, {
    yPercent,
    ease: 'none',
    scrollTrigger: {
      trigger: target as Element,
      start,
      end,
      scrub: true,
    },
  })
}

// Count-up for stats
export function countUp(
  target: Element,
  endValue: number,
  duration: number = 1.5,
  prefix: string = '',
  suffix: string = ''
) {
  const obj = { value: 0 }
  return gsap.to(obj, {
    value: endValue,
    duration,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: target,
      start: 'top 85%',
      once: true,
    },
    onUpdate: () => {
      target.textContent = `${prefix}${Math.round(obj.value)}${suffix}`
    },
  })
}
