'use client'

import { useEffect, useRef, RefObject } from 'react'
import { gsap } from '@/lib/gsap-utils'

// ── 1. MAGNETIC BUTTON HOOK ──
// Attach to any button: const ref = useMagneticButton()
// The element pulls toward the cursor within a radius
export function useMagneticButton<T extends HTMLElement>(
  strength: number = 0.3
): RefObject<T> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const distance = Math.sqrt(dx * dx + dy * dy)
      const radius = rect.width * 1.2

      if (distance < radius) {
        gsap.to(el, {
          x: dx * strength,
          y: dy * strength,
          duration: 0.4,
          ease: 'power3.out',
        })
      }
    }

    const handleLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' })
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [strength])

  return ref
}

// ── 2. BUTTON FILL SWEEP HOOK ──
// Applies to CTA buttons: a background color sweeps in from left on hover
// Usage: add className="btn-sweep" and call useSweepButtons() in your layout
export function useSweepButtons(selector: string = '.btn-sweep') {
  useEffect(() => {
    const buttons = document.querySelectorAll<HTMLElement>(selector)

    buttons.forEach((btn) => {
      // Create pseudo-fill div inside
      if (btn.querySelector('.btn-fill')) return
      const fill = document.createElement('span')
      fill.className = 'btn-fill'
      fill.style.cssText = `
        position: absolute; inset: 0; z-index: 0;
        transform: scaleX(0); transform-origin: left;
        background: #D6FF5C;
        transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        border-radius: inherit;
      `
      btn.style.position = 'relative'
      btn.style.overflow = 'hidden'
      btn.insertBefore(fill, btn.firstChild)

      // Ensure button text is above the fill
      Array.from(btn.children).forEach((child) => {
        if (child !== fill) {
          ;(child as HTMLElement).style.position = 'relative'
          ;(child as HTMLElement).style.zIndex = '1'
        }
      })

      btn.addEventListener('mouseenter', () => { fill.style.transform = 'scaleX(1)' })
      btn.addEventListener('mouseleave', () => { fill.style.transform = 'scaleX(0)' })
    })
  }, [selector])
}

// ── 3. UNDERLINE LINK ANIMATION ──
// CSS-based. Add className="link-underline" to any link.
// Export a style string to insert globally
export const underlineLinkCSS = `
  .link-underline {
    position: relative;
    text-decoration: none;
  }
  .link-underline::after {
    content: '';
    position: absolute;
    bottom: -2px; left: 0;
    width: 100%; height: 1px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .link-underline:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`

// ── 4. CARD LIFT HOVER ──
// GSAP-powered card hover: lift + border highlight
export function useCardHover(selector: string = '.card-lift') {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(selector)

    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -6,
          scale: 1.02,
          boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(214,255,92,0.2)',
          duration: 0.3,
          ease: 'power2.out',
        })
      })
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: 'none',
          duration: 0.4,
          ease: 'power3.out',
        })
      })
    })

    return () => {
      cards.forEach((card) => {
        card.replaceWith(card.cloneNode(true))
      })
    }
  }, [selector])
}

// ── 5. STAGGERED NUMBER COUNT-UP ──
export function useCountUp(selector: string = '[data-count]') {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(selector)
    elements.forEach((el) => {
      const end = parseFloat(el.dataset.count || '0')
      const suffix = el.dataset.suffix || ''
      const prefix = el.dataset.prefix || ''
      const obj = { value: 0 }
      gsap.to(obj, {
        value: end,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        onUpdate: () => {
          const display = Number.isInteger(end)
            ? Math.round(obj.value)
            : obj.value.toFixed(1)
          el.textContent = `${prefix}${display}${suffix}`
        },
      })
    })
  }, [selector])
}
