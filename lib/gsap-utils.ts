'use client'

import gsap from 'gsap/dist/gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import TextPlugin from 'gsap/dist/TextPlugin'

// Register all plugins once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin)
}

export { gsap, ScrollTrigger }

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
