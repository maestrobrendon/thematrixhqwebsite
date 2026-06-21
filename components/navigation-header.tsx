"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react"

const BEZIER = [0.25, 0, 0, 1] as [number, number, number, number]

const services = [
  { label: "Brand Identity",          href: "/#services" },
  { label: "Marketing & Advertising", href: "/#services" },
  { label: "Digital & Web",           href: "/#services" },
  { label: "Motion & Video",          href: "/#services" },
  { label: "Print",                   href: "/#services" },
  { label: "Illustration & Artwork",  href: "/#services" },
  { label: "Presentations",           href: "/#services" },
  { label: "Product & Packaging",     href: "/#services" },
]

const navLinks = [
  { label: "Our Work", href: "/work" },
  { label: "Pricing",  href: "/pricing" },
  { label: "About",    href: "/about" },
  { label: "Contact",  href: "/contact" },
]

export function NavigationHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled]       = useState(false)
  const [menuOpen, setMenuOpen]       = useState(false)
  const [dropOpen, setDropOpen]       = useState(false)
  const dropRef                       = useRef<HTMLDivElement>(null)
  const dropTimeout                   = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── Scroll detection ──────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // ── Close mobile menu on route change ─────────────────────────────────────
  useEffect(() => { setMenuOpen(false); setDropOpen(false) }, [pathname])

  // ── Lock body scroll when mobile menu is open ─────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  // ── Hover handlers with short delay so cursor can move into panel ─────────
  const openDrop  = () => {
    if (dropTimeout.current) clearTimeout(dropTimeout.current)
    setDropOpen(true)
  }
  const closeDrop = () => {
    dropTimeout.current = setTimeout(() => setDropOpen(false), 120)
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <>
      {/* ── NAV BAR ──────────────────────────────────────────────────────── */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 w-full"
        animate={{
          backgroundColor: scrolled ? "#0B1F17" : "rgba(11,31,23,0.45)",
          backdropFilter:   scrolled ? "blur(0px)"  : "blur(14px)",
          borderBottomColor: scrolled ? "rgba(26,51,42,1)" : "rgba(26,51,42,0.4)",
        }}
        transition={{ duration: 0.35, ease: BEZIER }}
        style={{ borderBottom: "1px solid rgba(26,51,42,0.4)" }}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-14 h-17 flex items-center justify-between gap-8">

          {/* Logo */}
          <Link href="/" className="relative shrink-0 w-32.5 h-9 block" aria-label="The Matrix HQ — Home">
            <Image
              src="/images/design-mode/sswh8theoz9tocz5g2tp.png"
              alt="The Matrix HQ"
              fill
              className="object-contain object-left"
              priority
            />
          </Link>

          {/* ── Desktop links ───────────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">

            {/* Services dropdown trigger */}
            <div
              ref={dropRef}
              className="relative"
              onMouseEnter={openDrop}
              onMouseLeave={closeDrop}
            >
              <button
                className="flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{ color: dropOpen ? "#ffffff" : "#C9D6CE" }}
                onClick={() => setDropOpen((o) => !o)}
                aria-expanded={dropOpen}
                aria-haspopup="true"
              >
                Services
                <motion.span
                  animate={{ rotate: dropOpen ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: BEZIER }}
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </motion.span>
              </button>

              {/* Dropdown panel */}
              <AnimatePresence>
                {dropOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2, ease: BEZIER }}
                    onMouseEnter={openDrop}
                    onMouseLeave={closeDrop}
                    className="absolute top-[calc(100%+10px)] left-0 rounded-2xl overflow-hidden shadow-2xl z-50"
                    style={{
                      backgroundColor: "#0B1F17",
                      border: "1px solid #1A332A",
                      minWidth: 240,
                    }}
                  >
                    <div className="p-2">
                      <p
                        style={{ color: "#5C7A6A", fontSize: 10, letterSpacing: "0.13em" }}
                        className="uppercase font-semibold px-3 pt-2 pb-1"
                      >
                        What we do
                      </p>
                      {services.map((svc) => (
                        <Link
                          key={svc.label}
                          href={svc.href}
                          className="flex items-center gap-2 px-3 py-2.5 rounded-lg group transition-colors"
                          style={{ color: "#C9D6CE" }}
                          onClick={() => setDropOpen(false)}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#142B22")}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                        >
                          <span
                            className="text-sm font-medium transition-colors group-hover:text-white"
                            style={{ color: "inherit" }}
                          >
                            {svc.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other nav links */}
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="px-3.5 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{
                  color: isActive(href) ? "#ffffff" : "#C9D6CE",
                  backgroundColor: isActive(href) ? "rgba(214,255,92,0.08)" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive(href))
                    (e.currentTarget as HTMLElement).style.color = "#ffffff"
                }}
                onMouseLeave={(e) => {
                  if (!isActive(href))
                    (e.currentTarget as HTMLElement).style.color = "#C9D6CE"
                }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* ── Right: CTA + hamburger ───────────────────────────────────── */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="https://wa.me/2347045985964"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#D6FF5C", color: "#16240A" }}
            >
              Start now
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-lg transition-colors"
              style={{ color: "#ffffff" }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="x"
                    initial={{ opacity: 0, rotate: -45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ opacity: 0, rotate: 45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -45 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── MOBILE MENU ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: BEZIER }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto"
            style={{ backgroundColor: "#0B1F17" }}
          >
            {/* Top spacer for nav bar */}
            <div className="h-17 shrink-0" />

            <div className="flex-1 px-6 py-8 flex flex-col">

              {/* Primary links */}
              <nav className="flex flex-col gap-1 mb-8">
                {/* Services — expandable on mobile */}
                <MobileServicesAccordion onClose={() => setMenuOpen(false)} />

                {navLinks.map(({ label, href }, i) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.35, ease: BEZIER }}
                  >
                    <Link
                      href={href}
                      className="block py-4 border-b text-2xl font-semibold transition-colors"
                      style={{
                        color: isActive(href) ? "#D6FF5C" : "#ffffff",
                        borderBottomColor: "#1A332A",
                      }}
                      onClick={() => setMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4, ease: BEZIER }}
                className="mt-auto"
              >
                <Link
                  href="https://wa.me/2347045985964"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-full text-base font-semibold"
                  style={{ backgroundColor: "#D6FF5C", color: "#16240A" }}
                  onClick={() => setMenuOpen(false)}
                >
                  Start now
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <p
                  style={{ color: "#5C7A6A", fontSize: 13 }}
                  className="text-center mt-6"
                >
                  Or email us at{" "}
                  <a
                    href="mailto:hello@thematrixhq.com"
                    style={{ color: "#C9D6CE" }}
                    className="underline underline-offset-4"
                  >
                    hello@thematrixhq.com
                  </a>
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ── Mobile Services Accordion ─────────────────────────────────────────────────
function MobileServicesAccordion({ onClose }: { onClose: () => void }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.03, duration: 0.35, ease: BEZIER }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full py-4 border-b text-2xl font-semibold text-white"
        style={{ borderBottomColor: "#1A332A" }}
      >
        Services
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }}>
          <ChevronDown className="w-5 h-5" style={{ color: "#D6FF5C" }} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: BEZIER }}
            className="overflow-hidden"
          >
            <div className="pt-2 pb-4 flex flex-col gap-0.5" style={{ borderBottom: "1px solid #1A332A" }}>
              {services.map((svc) => (
                <Link
                  key={svc.label}
                  href={svc.href}
                  className="flex items-center gap-2 py-2.5 px-3 rounded-lg text-base"
                  style={{ color: "#8CA89A" }}
                  onClick={onClose}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#8CA89A")}
                >
                  <span
                    className="w-1 h-1 rounded-full shrink-0"
                    style={{ backgroundColor: "#D6FF5C" }}
                  />
                  {svc.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
