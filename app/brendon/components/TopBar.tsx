"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Linkedin, Twitter, ExternalLink, Sparkle, Menu, X } from "lucide-react"
import { useActiveSection } from "../lib/useActiveSection"

const navItems = [
  { label: "About", id: "about", href: "#about" },
  { label: "Work", id: "work", href: "#work" },
]

const socials = [
  { label: "Email", shortLabel: "Email", href: "mailto:maestrobrendon@gmail.com", icon: Mail },
  { label: "LinkedIn", shortLabel: "in", href: "https://linkedin.com/in/brendonoleghe", icon: Linkedin },
  { label: "Twitter / X", shortLabel: "x", href: "https://twitter.com/maestrobrendon", icon: Twitter },
  { label: "Behance", shortLabel: "Be", href: "https://behance.net/maestrobrendon", icon: ExternalLink },
]

export function TopBar() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(["about", "work", "contact"])

  return (
    <header className="selection-frame fixed top-0 inset-x-0 z-40">
      <span className="handle handle-bl" />
      <span className="handle handle-br" />
      <div className="relative mx-auto max-w-6xl px-4 md:px-6 h-20 flex items-center justify-between">
        <Link href="/brendon" className="text-sm font-semibold tracking-tight text-(--brendon-ink)">
          Brendon <span style={{ color: "var(--brendon-cyan)" }}>·</span> Oleghe
        </Link>

        {/* Absolutely centered on the viewport, not the flex remainder, so it
            stays dead-center regardless of how wide the brand/social groups are. */}
        <nav className="hidden md:flex items-center gap-3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <a
            href={navItems[0].href}
            aria-current={active === navItems[0].id ? "true" : undefined}
            className="px-5 py-2.5 rounded-full text-sm font-medium text-white bg-black/60 backdrop-blur-sm hover:bg-black/75 transition-colors"
          >
            {navItems[0].label}
          </a>

          <Link
            href="/brendon"
            aria-label="Brendon Oleghe"
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:scale-105 transition-transform"
          >
            <Sparkle className="w-4 h-4 text-black" fill="currentColor" />
          </Link>

          <a
            href={navItems[1].href}
            aria-current={active === navItems[1].id ? "true" : undefined}
            className="px-5 py-2.5 rounded-full text-sm font-medium text-white bg-black/60 backdrop-blur-sm hover:bg-black/75 transition-colors"
          >
            {navItems[1].label}
          </a>
        </nav>

        {/* Desktop: plain-text social links */}
        <div className="hidden sm:flex items-center gap-6">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={s.label}
              className="text-sm font-medium tracking-wide text-(--brendon-ink) hover:opacity-60 transition-opacity"
            >
              {s.shortLabel}
            </a>
          ))}
        </div>

        {/* Mobile: menu toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden inline-flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase text-black/70"
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
          {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="sm:hidden overflow-hidden border-t border-black/10 bg-white/95"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`text-sm font-medium ${active === item.id ? "text-(--brendon-magenta)" : "text-black/80"}`}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex items-center gap-2 pt-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-black/60 bg-black/5"
                  >
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
