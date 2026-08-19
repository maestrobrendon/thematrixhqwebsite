"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react"
import {
  PaintBrush,
  ShareNetwork,
  Presentation,
  PenNib,
  BookOpen,
  EnvelopeSimple,
  FileText,
  Package,
  FilmStrip,
  Browser,
  CursorClick,
  TextAa,
  Sparkle,
  ChatCircleDots,
  Lightning,
  Flag,
  ArrowUpRight,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react"

const BEZIER = [0.25, 0, 0, 1] as [number, number, number, number]

// ── Services mega-menu data ────────────────────────────────────────────────────
const SERVICE_COLUMNS = [
  {
    id:      "creative",
    label:   "Creative design services",
    pillBg:  "#D6FF5C",
    pillFg:  "#16240A",
    services: [
      { href: "/services/brand-identity",         name: "Brand Identity",           desc: "Logos, guidelines, stationery",              icon: PaintBrush,     isNew: false },
      { href: "/services/social-media-creative",   name: "Social Media Creative",    desc: "Engaging assets for every platform",          icon: ShareNetwork,   isNew: false },
      { href: "/services/presentation-design",     name: "Presentation Design",      desc: "Decks that tell your story",                 icon: Presentation,   isNew: false },
      { href: "/services/illustration-artwork",    name: "Illustration & Artwork",   desc: "Visual storytelling for your brand",          icon: PenNib,         isNew: false },
      { href: "/services/print-design",            name: "Print Design",             desc: "Brochures, banners, packaging",              icon: BookOpen,       isNew: false },
      { href: "/services/email-newsletter-design", name: "Email & Newsletter Design",desc: "Click-worthy graphics that engage",           icon: EnvelopeSimple, isNew: false },
      { href: "/services/ebooks-report-design",    name: "Ebooks & Report Design",   desc: "Your content, supercharged",                 icon: FileText,       isNew: false },
      { href: "/services/packaging-merchandise",   name: "Packaging & Merchandise",  desc: "Bring your brand to life",                   icon: Package,        isNew: false },
    ],
  },
  {
    id:      "specialized",
    label:   "Specialized production",
    pillBg:  "#1A332A",
    pillFg:  "#8CA89A",
    services: [
      { href: "/services/motion-video",            name: "Motion & Video",           desc: "Explainer animations, reels, edits",          icon: FilmStrip,      isNew: false },
      { href: "/services/web-landing-page-design", name: "Web & Landing Page Design",desc: "Stunning sites built to convert",             icon: Browser,        isNew: false },
      { href: "/services/product-design",          name: "Product Design",           desc: "UI/UX, app screens, prototypes",              icon: CursorClick,    isNew: true  },
      { href: "/services/copywriting",             name: "Copywriting",              desc: "Persuasive words for clarity and action",     icon: TextAa,         isNew: false },
    ],
  },
  {
    id:      "ai",
    label:   "AI services",
    pillBg:  "#1A2B4A",
    pillFg:  "#7BA7E8",
    services: [
      { href: "/services/ai-powered-creative",     name: "AI-Powered Creative",      desc: "Human brilliance, accelerated by AI",         icon: Sparkle,        isNew: false },
      { href: "/services/ai-consulting",           name: "AI Consulting",            desc: "Bring AI into your creative workflow",         icon: ChatCircleDots, isNew: false },
      { href: "/services/automation",              name: "Automation",               desc: "Move fast without compromising craft",         icon: Lightning,      isNew: true  },
    ],
  },
  {
    id:      "marketing",
    label:   "Marketing services",
    pillBg:  "#2E2618",
    pillFg:  "#C8AB7A",
    services: [
      { href: "/services/campaign-strategy",       name: "Campaign Strategy",        desc: "Strategy, messaging, and concept for every campaign", icon: Flag, isNew: true },
    ],
  },
]

// ── Why Us panel data ─────────────────────────────────────────────────────────
const WHY_US_ITEMS = [
  {
    href:     "/why-us/creative-talent",
    title:    "Our Creative Talent",
    subtitle: "Meet your dedicated team",
    img:      "https://res.cloudinary.com/du5nhfcgd/image/upload/q_auto/f_auto/v1782001434/pexels-mikael-blomkvist-4153232_k0fnhi.jpg",
  },
  {
    href:     "/why-us/ai-excellence",
    title:    "AI Excellence",
    subtitle: "Your shortcut to faster, sharper creative",
    img:      "https://res.cloudinary.com/du5nhfcgd/image/upload/q_auto/f_auto/v1782081054/pexels-alinadegli-37686910_lxxm3u.jpg",
  },
  {
    href:     "/why-us/our-technology",
    title:    "Our Technology",
    subtitle: "The tools powering your creative edge",
    img:      "https://res.cloudinary.com/du5nhfcgd/image/upload/q_auto/f_auto/v1782064180/739d30f2ecb844e9c1186e62ca63efbda518ff4a-1050x1200_dq9zvt.png",
  },
]

// navLinks split so Why Us sits between Our Work and Pricing
const NAV_LEFT  = [{ label: "Our Work", href: "/work" }]
const NAV_RIGHT = [
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
]

// ── Shared single-item component for the mega-menu ───────────────────────────
function ServiceItem({
  href, name, desc, icon: Icon, isNew, onClose,
}: {
  href: string; name: string; desc: string
  icon: PhosphorIcon; isNew: boolean; onClose: () => void
}) {
  return (
    <Link
      href={href}
      className="group flex items-start justify-between gap-3 px-2.5 py-2 rounded-lg transition-colors"
      onClick={onClose}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#142B22")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
    >
      {/* Left: name + badge + description */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-[13px] font-medium transition-colors text-[#C9D6CE] group-hover:text-white">
            {name}
          </span>
          {isNew && (
            <span
              className="shrink-0 text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
              style={{ backgroundColor: "#D6FF5C", color: "#16240A" }}
            >
              New
            </span>
          )}
        </div>
        <span className="text-[11px] leading-snug text-[#5C7A6A]">{desc}</span>
      </div>
      {/* Right: Phosphor icon */}
      <Icon
        size={18}
        weight="light"
        className="shrink-0 mt-0.5 transition-colors text-[#3D5E4C] group-hover:text-[#D6FF5C]"
      />
    </Link>
  )
}

// ── NavigationHeader ──────────────────────────────────────────────────────────
export function NavigationHeader() {
  const pathname = usePathname()

  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  // Services mega-menu
  const [svcOpen, setSvcOpen]     = useState(false)
  const svcTimeout                 = useRef<ReturnType<typeof setTimeout> | null>(null)
  const svcTriggerRef              = useRef<HTMLDivElement>(null)
  const svcPanelRef                = useRef<HTMLDivElement>(null)

  // Why Us panel
  const [whyOpen, setWhyOpen]     = useState(false)
  const whyTimeout                 = useRef<ReturnType<typeof setTimeout> | null>(null)
  const whyTriggerRef              = useRef<HTMLDivElement>(null)
  const whyPanelRef                = useRef<HTMLDivElement>(null)

  // ── Hover handlers ─────────────────────────────────────────────────────────
  const openSvc = useCallback(() => {
    if (svcTimeout.current) clearTimeout(svcTimeout.current)
    setSvcOpen(true)
  }, [])
  const closeSvc = useCallback(() => {
    svcTimeout.current = setTimeout(() => setSvcOpen(false), 150)
  }, [])

  const openWhy = useCallback(() => {
    if (whyTimeout.current) clearTimeout(whyTimeout.current)
    setWhyOpen(true)
  }, [])
  const closeWhy = useCallback(() => {
    whyTimeout.current = setTimeout(() => setWhyOpen(false), 150)
  }, [])

  // ── Escape key ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setSvcOpen(false); setWhyOpen(false); setMenuOpen(false) }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  // ── Click outside ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!svcOpen && !whyOpen) return
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node
      if (svcOpen && !svcTriggerRef.current?.contains(t) && !svcPanelRef.current?.contains(t)) setSvcOpen(false)
      if (whyOpen && !whyTriggerRef.current?.contains(t) && !whyPanelRef.current?.contains(t)) setWhyOpen(false)
    }
    document.addEventListener("mousedown", onDown)
    return () => document.removeEventListener("mousedown", onDown)
  }, [svcOpen, whyOpen])

  // ── Scroll ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // ── Route change ───────────────────────────────────────────────────────────
  useEffect(() => {
    setMenuOpen(false); setSvcOpen(false); setWhyOpen(false)
  }, [pathname])

  // ── Body scroll lock ───────────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const isActive      = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)
  const isSvcActive   = pathname.startsWith("/services")
  const isWhyActive   = pathname.startsWith("/why-us")

  const NavLink = ({ label, href }: { label: string; href: string }) => (
    <Link
      href={href}
      className="link-underline relative px-3.5 py-2 rounded-lg text-sm font-medium transition-colors"
      style={{
        color:           isActive(href) ? "#ffffff" : "#C9D6CE",
        backgroundColor: isActive(href) ? "rgba(214,255,92,0.08)" : "transparent",
      }}
      onMouseEnter={(e) => { if (!isActive(href)) (e.currentTarget as HTMLElement).style.color = "#ffffff" }}
      onMouseLeave={(e) => { if (!isActive(href)) (e.currentTarget as HTMLElement).style.color = "#C9D6CE" }}
    >
      {label}
      {isActive(href) && (
        <span
          className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
          style={{ backgroundColor: "#D6FF5C" }}
        />
      )}
    </Link>
  )

  // ── Shared dropdown trigger button ────────────────────────────────────────
  const DropTrigger = ({
    label, isOpen, isActive: active, onClick,
  }: { label: string; isOpen: boolean; isActive: boolean; onClick: () => void }) => (
    <button
      className="flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors"
      style={{
        color:           isOpen || active ? "#ffffff" : "#C9D6CE",
        backgroundColor: active           ? "rgba(214,255,92,0.08)" : "transparent",
      }}
      onClick={onClick}
      aria-expanded={isOpen}
      aria-haspopup="true"
    >
      {label}
      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2, ease: BEZIER }}
      >
        <ChevronDown className="w-3.5 h-3.5" />
      </motion.span>
    </button>
  )

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          NAV BAR
      ═════════════════════════════════════════════════════════════════════ */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 w-full"
        style={{
          backgroundColor:   scrolled ? "#0B1F17" : "rgba(11,31,23,0.45)",
          backdropFilter:    scrolled ? "none"    : "blur(14px)",
          WebkitBackdropFilter: scrolled ? "none" : "blur(14px)",
          borderBottom:      "1px solid",
          borderBottomColor: scrolled ? "rgba(26,51,42,1)" : "rgba(26,51,42,0.4)",
          transition:        "background-color 350ms ease, backdrop-filter 350ms ease, border-color 350ms ease",
        }}
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

          {/* ── Desktop links ─────────────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">

            {/* Services trigger */}
            <div ref={svcTriggerRef} onMouseEnter={openSvc} onMouseLeave={closeSvc}>
              <DropTrigger
                label="Services"
                isOpen={svcOpen}
                isActive={isSvcActive}
                onClick={() => setSvcOpen((o) => !o)}
              />
            </div>

            {/* Our Work */}
            {NAV_LEFT.map(({ label, href }) => (
              <NavLink key={href} label={label} href={href} />
            ))}

            {/* Why Us trigger */}
            <div ref={whyTriggerRef} onMouseEnter={openWhy} onMouseLeave={closeWhy}>
              <DropTrigger
                label="Why us"
                isOpen={whyOpen}
                isActive={isWhyActive}
                onClick={() => setWhyOpen((o) => !o)}
              />
            </div>

            {/* Pricing · About · Contact */}
            {NAV_RIGHT.map(({ label, href }) => (
              <NavLink key={href} label={label} href={href} />
            ))}
          </div>

          {/* ── CTA + Hamburger ───────────────────────────────────────────── */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="https://wa.me/2347045985964"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden hidden md:inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold"
              style={{ backgroundColor: "#D6FF5C", color: "#16240A" }}
            >
              <span aria-hidden="true" className="absolute inset-0 bg-black/10 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out rounded-[inherit]" />
              <span className="relative z-10 inline-flex items-center gap-1.5">
                Start now <ArrowUpRight size={14} weight="bold" />
              </span>
            </Link>

            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-lg"
              style={{ color: "#ffffff" }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span key="x" initial={{ opacity: 0, rotate: -45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 45 }} transition={{ duration: 0.18 }}>
                    <X className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span key="m" initial={{ opacity: 0, rotate: 45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -45 }} transition={{ duration: 0.18 }}>
                    <Menu className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════════════════════════════════════
          SERVICES MEGA-MENU PANEL
          Fixed at top:68px, outside <nav> to avoid backdrop-filter
          stacking-context issues.
      ═════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {svcOpen && (
          <motion.div
            ref={svcPanelRef}
            key="svc-panel"
            className="fixed left-0 right-0 z-40 hidden md:block"
            style={{ top: 68 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: BEZIER }}
            onMouseEnter={openSvc}
            onMouseLeave={closeSvc}
          >
            <div
              style={{
                backgroundColor: "#0A1D15",
                borderBottom:    "1px solid #1A332A",
                boxShadow:       "0 32px 64px rgba(0,0,0,0.4)",
              }}
            >
              <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-14 py-6">
                <div className="grid grid-cols-4 gap-6 lg:gap-10">
                  {SERVICE_COLUMNS.map((col) => (
                    <div key={col.id}>
                      {/* Category pill header */}
                      <div className="mb-3">
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                          style={{ backgroundColor: col.pillBg, color: col.pillFg }}
                        >
                          {col.label}
                          <ArrowUpRight size={10} weight="bold" />
                        </span>
                      </div>
                      {/* Service items */}
                      <div className="flex flex-col gap-0.5">
                        {col.services.map((svc) => (
                          <ServiceItem
                            key={svc.href}
                            href={svc.href}
                            name={svc.name}
                            desc={svc.desc}
                            icon={svc.icon}
                            isNew={svc.isNew}
                            onClose={() => setSvcOpen(false)}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════════════
          WHY US PANEL
      ═════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {whyOpen && (
          <motion.div
            ref={whyPanelRef}
            key="why-panel"
            className="fixed left-0 right-0 z-40 hidden md:block"
            style={{ top: 68 }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: BEZIER }}
            onMouseEnter={openWhy}
            onMouseLeave={closeWhy}
          >
            <div
              style={{
                backgroundColor: "#0B1F17",
                borderBottom:    "1px solid #1A332A",
                boxShadow:       "0 24px 48px rgba(0,0,0,0.35)",
              }}
            >
              <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-14 py-7">
                <div className="grid grid-cols-3 gap-5" style={{ maxWidth: 860 }}>
                  {WHY_US_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group block"
                      onClick={() => setWhyOpen(false)}
                    >
                      <div className="relative rounded-xl overflow-hidden mb-3" style={{ aspectRatio: "16/9" }}>
                        <Image
                          src={item.img}
                          alt={item.title}
                          fill
                          className="object-cover object-center transition-transform duration-350 ease-out group-hover:scale-[1.04]"
                          sizes="280px"
                        />
                        <div
                          className="absolute inset-0 opacity-20 group-hover:opacity-10 transition-opacity duration-300"
                          style={{ backgroundColor: "#0B1F17" }}
                        />
                        {pathname.startsWith(item.href) && (
                          <div className="absolute top-2.5 left-2.5">
                            <span
                              className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded"
                              style={{ backgroundColor: "#D6FF5C", color: "#16240A" }}
                            >
                              Current
                            </span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm font-semibold mb-0.5 text-white group-hover:text-[#D6FF5C] transition-colors duration-200">
                        {item.title}
                      </p>
                      <p style={{ color: "#5C7A6A", fontSize: 12, lineHeight: 1.55 }}>
                        {item.subtitle}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════════════
          MOBILE FULL-SCREEN MENU
      ═════════════════════════════════════════════════════════════════════ */}
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
            <div className="h-17 shrink-0" />
            <div className="flex-1 px-6 py-8 flex flex-col">
              <nav className="flex flex-col gap-1 mb-8">

                {/* Services accordion */}
                <MobileServicesAccordion onClose={() => setMenuOpen(false)} pathname={pathname} />

                {/* Our Work */}
                <MobileNavLink href="/work" label="Our Work" active={isActive("/work")} delay={0.05} onClose={() => setMenuOpen(false)} />

                {/* Why Us accordion */}
                <MobileWhyUsAccordion onClose={() => setMenuOpen(false)} active={isWhyActive} pathname={pathname} />

                {/* Pricing / About / Contact */}
                {NAV_RIGHT.map(({ label, href }, i) => (
                  <MobileNavLink key={href} href={href} label={label} active={isActive(href)} delay={0.13 + i * 0.06} onClose={() => setMenuOpen(false)} />
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
                  Start now <ArrowRight className="w-4 h-4" />
                </Link>
                <p style={{ color: "#5C7A6A", fontSize: 13 }} className="text-center mt-6">
                  Or email us at{" "}
                  <a href="mailto:hello@thematrixhq.com" style={{ color: "#C9D6CE" }} className="underline underline-offset-4">
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

// ── Mobile sub-components ─────────────────────────────────────────────────────

function MobileNavLink({
  href, label, active, delay, onClose,
}: { href: string; label: string; active: boolean; delay: number; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.35, ease: BEZIER }}
    >
      <Link
        href={href}
        className="block py-4 border-b text-2xl font-semibold"
        style={{ color: active ? "#D6FF5C" : "#ffffff", borderBottomColor: "#1A332A" }}
        onClick={onClose}
      >
        {label}
      </Link>
    </motion.div>
  )
}

function MobileServicesAccordion({ onClose, pathname }: { onClose: () => void; pathname: string }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.03, duration: 0.35, ease: BEZIER }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full py-4 border-b text-2xl font-semibold"
        style={{ color: pathname.startsWith("/services") ? "#D6FF5C" : "#ffffff", borderBottomColor: "#1A332A" }}
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
            <div className="pb-4" style={{ borderBottom: "1px solid #1A332A" }}>
              {SERVICE_COLUMNS.map((col) => (
                <div key={col.id} className="mt-3">
                  {/* Mini category label */}
                  <p
                    className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider"
                    style={{ color: col.pillFg !== "#16240A" ? col.pillFg : "#D6FF5C" }}
                  >
                    {col.label}
                  </p>
                  {col.services.map((svc) => {
                    const active = pathname.startsWith(svc.href)
                    return (
                      <Link
                        key={svc.href}
                        href={svc.href}
                        className="flex items-center justify-between gap-2 py-2 px-3 rounded-lg text-sm"
                        style={{ color: active ? "#D6FF5C" : "#8CA89A" }}
                        onClick={onClose}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = active ? "#D6FF5C" : "#8CA89A")}
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: "#D6FF5C" }} />
                          {svc.name}
                        </span>
                        {svc.isNew && (
                          <span
                            className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shrink-0"
                            style={{ backgroundColor: "#D6FF5C", color: "#16240A" }}
                          >
                            New
                          </span>
                        )}
                      </Link>
                    )
                  })}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function MobileWhyUsAccordion({
  onClose, active, pathname,
}: { onClose: () => void; active: boolean; pathname: string }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.08, duration: 0.35, ease: BEZIER }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full py-4 border-b text-2xl font-semibold"
        style={{ color: active ? "#D6FF5C" : "#ffffff", borderBottomColor: "#1A332A" }}
      >
        Why us
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
              {WHY_US_ITEMS.map((item) => {
                const cur = pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 py-2.5 px-3 rounded-lg text-base"
                    style={{ color: cur ? "#D6FF5C" : "#8CA89A" }}
                    onClick={onClose}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = cur ? "#D6FF5C" : "#8CA89A")}
                  >
                    <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: "#D6FF5C" }} />
                    {item.title}
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
