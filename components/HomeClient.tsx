"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useAnimate, useInView } from "framer-motion"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Check, X, Users, Building2, User, Bot } from "lucide-react"
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react"
import Image from "next/image"
import Link from "next/link"
import { gsap, ScrollTrigger, revealUp, parallaxY } from "@/lib/gsap-utils"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Tick02Icon,
  BrushIcon,
  Megaphone02Icon,
  GlobeIcon,
  PlayIcon,
  PrinterIcon,
  PenTool02Icon,
  PresentationBarChart02Icon,
  PackageIcon,
} from "@hugeicons/core-free-icons"
import { type PexelsPhoto, pexelsUrl } from "@/lib/pexels"

// ── Design tokens ─────────────────────────────────────────────────────────────
// --bg-dark   : #0B1F17    --bg-light  : #F4F1E8    --accent-lime: #D6FF5C
// --dark-head : #ffffff    --dark-body : #C9D6CE    --dark-muted : #7C8C82
// --light-head: #16241C    --light-body: #5C6B62    --light-muted: #8C9A8C
// --card-dark : #142B22    --tile-a    : #244A38    --tile-b     : #1A332A

// Minimal 1×1 LQIP for placeholder="blur" on remote images
const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k="

// Fallback images if Pexels API is unavailable
const FALLBACK_DIFFERENCE_IMG =
  "https://res.cloudinary.com/du5nhfcgd/image/upload/q_auto/f_auto/v1781996512/fe55e3a4e5bfc2d1cfb86ae8877642efd8aadf0f-1044x1044-ezgif.com-avif-to-png-converter_skv5ag.png"
const FALLBACK_BOTTLENECK_BG =
  "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600"
const FALLBACK_TALENT_BG =
  "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1600"
const FALLBACK_FINAL_CTA_BG =
  "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1600"

// ── Component types ───────────────────────────────────────────────────────────
export interface HomeClientProps {
  mosaicImages: PexelsPhoto[]
  differenceImage: PexelsPhoto | null
  bottleneckBgImage: PexelsPhoto | null
  talentBgImage: PexelsPhoto | null
  finalCtaBgImage: PexelsPhoto | null
}

// ── Serif italic emphasis ─────────────────────────────────────────────────────
function Em({ children }: { children: React.ReactNode }) {
  return <span className="font-serif italic font-normal">{children}</span>
}

// ── Shared animation variants ─────────────────────────────────────────────────
const BEZIER = [0.25, 0, 0, 1] as [number, number, number, number]

const containerV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const fadeUpV = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: BEZIER } },
}
const fadeScaleV = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: BEZIER } },
}

// ── Cloudinary project images ─────────────────────────────────────────────────
const img = {
  arclly:   "https://res.cloudinary.com/dusynu0kv/image/upload/v1764280363/ifdv28cltsgypa7nhhuv.jpg",
  ledga:    "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279279/vvn9avecee8eaj9yptti.jpg",
  inaara:   "https://res.cloudinary.com/dusynu0kv/image/upload/v1764281205/yruv2nywtqxicdja6kxe.jpg",
  assura:   "https://res.cloudinary.com/dusynu0kv/image/upload/v1764281754/mnv7i1uyrl4pgfowyjrk.jpg",
  sheikh:   "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279126/kmyux5c6vnaf2hisotza.jpg",
  moods:    "https://res.cloudinary.com/dusynu0kv/image/upload/v1764281736/kpccrqsvrrqz8ew5htbt.jpg",
  alavda:   "https://res.cloudinary.com/dusynu0kv/image/upload/v1764278972/vdeiw8wlj7gdjgbsbw4s.jpg",
  wevolte:  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279295/mziuakmaaf8bsmyieuyn.png",
  penumbra: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279438/gh07foriuqoz7rfkligd.png",
}

const clientLogos = [
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764283723/gtimkbhhs72kxg0qctbp.png",
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764283759/z9jvpgg2bmqusl4vpvrt.png",
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764283687/w2nlreoxajlp57z2ndze.png",
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764283670/k7rmtutzsl5rztjaysa8.png",
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764283640/fcehfyvpcsf3ubbyvjxg.png",
]

// ── Pexels CDN helper — used as fallback when API returns no images ────────────
const px = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`

// ── Mosaic column template (labels + proportions stay fixed) ──────────────────
const MOSAIC_TEMPLATE = [
  [
    { grow: 34, label: "Brand Identity" },
    { grow: 40, label: "Packaging"      },
    { grow: 26, label: "Print Design"   },
  ],
  [
    { grow: 28, label: "Social Media"   },
    { grow: 44, label: "Motion Design"  },
    { grow: 28, label: "Web Design"     },
  ],
  [
    { grow: 22, label: "Ad Creative"    },
    { grow: 50, label: "Illustration"   },
    { grow: 28, label: "Editorial"      },
  ],
] as const

const MOSAIC_FALLBACK_IMGS = [
  px(4466420), px(7161094), px(3964452),
  px(15595043), px(14240656), px(4736047),
  px(13986019), px(35597424), px(13198553),
]

function buildMosaicCols(photos: PexelsPhoto[]) {
  let idx = 0
  return MOSAIC_TEMPLATE.map((col) =>
    col.map((tile) => {
      const photo = photos[idx]
      const fallback = MOSAIC_FALLBACK_IMGS[idx]
      idx++
      return {
        ...tile,
        img: photo ? pexelsUrl(photo, "large") : fallback,
      }
    })
  )
}

// ── Per-column scroll durations + phase offsets ───────────────────────────────
const COL_DURATIONS = [24, 19, 28]
const COL_DELAYS    = [0, -7, -12]
const MOBILE_MOSAIC_H = 280

// ─────────────────────────────────────────────────────────────────────────────
// ROOT CLIENT COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function HomeClient({ mosaicImages, differenceImage, bottleneckBgImage, talentBgImage, finalCtaBgImage }: HomeClientProps) {
  const [currency, setCurrency] = useState<"ngn" | "usd">("ngn")

  const colsData = useMemo(() => buildMosaicCols(mosaicImages), [mosaicImages])

  const differenceImageUrl = differenceImage
    ? pexelsUrl(differenceImage, "large2x")
    : FALLBACK_DIFFERENCE_IMG

  const bottleneckBgImageUrl = bottleneckBgImage ? pexelsUrl(bottleneckBgImage, "large2x") : FALLBACK_BOTTLENECK_BG
  const talentBgImageUrl = talentBgImage ? pexelsUrl(talentBgImage, "large2x") : FALLBACK_TALENT_BG
  const finalCtaBgImageUrl = finalCtaBgImage ? pexelsUrl(finalCtaBgImage, "large2x") : FALLBACK_FINAL_CTA_BG

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── HERO ENTRANCE TIMELINE ──
      const heroTl = gsap.timeline({ delay: 0.1 })
      heroTl
        .fromTo('.hero-eyebrow',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
        .fromTo('.hero-headline',
          { opacity: 0, y: 24, clipPath: 'inset(0 0 30% 0)' },
          { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.75, ease: 'power4.out' }, '-=0.2')
        .fromTo('.hero-subhead',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, '-=0.4')
        .fromTo('.hero-ctas',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, '-=0.3')
        .fromTo('.hero-value-strip',
          { opacity: 0 },
          { opacity: 1, duration: 0.4 }, '-=0.1')

      // ── HERO IMAGE MOSAIC STAGGER ──
      gsap.fromTo('.hero-mosaic-tile',
        { opacity: 0, scale: 0.9, y: 20 },
        {
          opacity: 1, scale: 1, y: 0,
          duration: 0.6, ease: 'power3.out',
          stagger: { each: 0.08, from: 'random' },
          delay: 0.4,
        })

      // ── TRUST BAR ──
      revealUp('.trust-bar-logo', { stagger: 0.05, start: 'top 92%' })

      // ── SECTION HEADLINES ──
      document.querySelectorAll('section h2, section h3').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 28, clipPath: 'inset(0 0 20% 0)' },
          {
            opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)',
            duration: 0.75, ease: 'power4.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          })
      })

      // ── FEATURE CARDS ──
      revealUp('.feature-card', { stagger: 0.12, start: 'top 85%' })

      // ── PROCESS STEPS ──
      revealUp('.process-step', { stagger: 0.15, y: 20, start: 'top 85%' })

      // ── STATS COUNTERS ──
      document.querySelectorAll('[data-count]').forEach((el) => {
        const end = parseFloat((el as HTMLElement).dataset.count || '0')
        const suffix = (el as HTMLElement).dataset.suffix || ''
        const obj = { value: 0 }
        gsap.to(obj, {
          value: end,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate: () => {
            el.textContent = `${Math.round(obj.value)}${suffix}`
          },
        })
      })

      // ── PORTFOLIO TILES ──
      revealUp('.portfolio-tile', { stagger: 0.1, y: 24, start: 'top 85%' })

      // ── TESTIMONIALS ──
      revealUp('.testimonial-card', { stagger: 0.12, start: 'top 85%' })

      // ── PARALLAX on BeyondSection image ──
      const diffImg = document.querySelector('.difference-section-image')
      if (diffImg) parallaxY(diffImg, -12)

      // ── PARALLAX on full-bleed section backgrounds ──
      document.querySelectorAll('[data-parallax-bg="true"]').forEach((el) => {
        parallaxY(el, -15)
      })

      // ── COMPARISON TABLE ROWS ──
      revealUp('.comparison-row', { stagger: 0.07, y: 12, start: 'top 88%' })

      // ── MARQUEE SECTION ──
      revealUp('.marquee-section', { duration: 0.6, start: 'top 92%' })

    })

    return () => ctx.revert()
  }, [])

  return (
    <main className="font-sans overflow-x-hidden">
      <NavigationHeader />
      <HeroSection colsData={colsData} />
      <TrustBarSection />
      <BeyondSection differenceImageUrl={differenceImageUrl} />
      <FeatureCardsSection />
      <HowItWorksSection />
      <WhatsIncludedSection />
      <ServicesSection />
      <StatsSection />
      <PortfolioSection />
      <ComparisonSection />
      <PricingSection currency={currency} setCurrency={setCurrency} />
      <TestimonialsSection />
      <TalentSection talentBgImageUrl={talentBgImageUrl} />
      <BottleneckSection bottleneckBgImageUrl={bottleneckBgImageUrl} />
      <ClosingCtaSection finalCtaBgImageUrl={finalCtaBgImageUrl} />
      <Footer />
    </main>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. HERO
// ─────────────────────────────────────────────────────────────────────────────
type ColsData = ReturnType<typeof buildMosaicCols>

function MosaicTile({ img: src, label, priority }: { img: string; label: string; priority?: boolean }) {
  return (
    <div
      className="hero-mosaic-tile relative rounded-[14px] overflow-hidden w-full h-full"
      style={{ filter: "saturate(0.85) contrast(1.05)" }}
    >
      <Image
        src={src}
        alt={label}
        fill
        className="object-cover object-center"
        sizes="(max-width:1024px) 34vw, 17vw"
        quality={80}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(11,31,23,0.84) 0%, rgba(11,31,23,0.08) 50%, transparent 100%)",
        }}
      />
      <span
        className="absolute bottom-3 left-3 text-[10px] font-semibold uppercase tracking-wider"
        style={{ color: "rgba(255,255,255,0.88)", letterSpacing: "0.1em" }}
      >
        {label}
      </span>
    </div>
  )
}

function HeroSection({ colsData }: { colsData: ColsData }) {
  return (
    <section
      style={{ backgroundColor: "#0B1F17" }}
      className="relative flex flex-col lg:flex-row min-h-screen"
    >
      {/* ── Copy ── */}
      <div className="flex-1 flex items-start lg:items-center pt-24 pb-6 lg:py-28 px-6 md:px-10 lg:pl-[clamp(80px,12vw,160px)] lg:pr-8">
        <div className="w-full max-w-[560px] lg:max-w-[600px]">
          <span
            style={{ color: "#D6FF5C", fontSize: 11, letterSpacing: "0.14em" }}
            className="hero-eyebrow uppercase font-semibold mb-5 block"
          >
            AI-powered creative subscription
          </span>

          <h1
            style={{ color: "#ffffff", lineHeight: 1.0, fontWeight: 700 }}
            className="hero-headline text-[2.8rem] sm:text-[3.6rem] lg:text-[4.4rem] xl:text-[5.2rem] mb-6 lg:mb-8 tracking-tight"
          >
            Your <Em>creative</Em>
            <br />
            team&apos;s creative
            <br />
            team.
            <span
              style={{
                fontSize: "0.36em",
                verticalAlign: "super",
                color: "#D6FF5C",
                fontWeight: 400,
                fontStyle: "normal",
                marginLeft: "0.12em",
                lineHeight: 1,
              }}
            >
              ™
            </span>
          </h1>

          <p
            style={{ color: "#C9D6CE", lineHeight: 1.65 }}
            className="hero-subhead text-[15px] lg:text-[16px] mb-8 lg:mb-10 max-w-[440px]"
          >
            We turn founders&apos; visions into brands that hold up: identity,
            websites, and digital work. AI tools compress production time.
            Every deliverable is finished by hand before it reaches you.
          </p>

          <div className="hero-ctas flex flex-wrap gap-3 mb-7">
            <Link
              href="https://wa.me/2347045985964"
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: "#D6FF5C", color: "#16240A" }}
              className="group relative overflow-hidden inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold"
            >
              <span aria-hidden="true" className="absolute inset-0 bg-black/10 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out rounded-[inherit]" />
              <span className="relative z-10 inline-flex items-center gap-2">
                Book a call
                <ArrowUpRight size={16} weight="bold" />
              </span>
            </Link>
            <Link
              href="/work"
              style={{ color: "#ffffff", border: "1px solid rgba(255,255,255,0.22)" }}
              className="btn-arrow-icon inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold bg-transparent hover:bg-white/5 transition-colors"
            >
              See our work
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="hero-value-strip flex flex-wrap gap-x-5 gap-y-1.5">
            {["No contracts", "Pause anytime", "30-hr first draft", "AI-powered"].map((f) => (
              <span key={f} style={{ color: "#5C7A6A", fontSize: 12 }}>
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile mosaic ── */}
      <div className="lg:hidden relative w-full px-4 pb-10">
        <div
          className="flex gap-2 overflow-hidden rounded-2xl"
          style={{ height: MOBILE_MOSAIC_H }}
        >
          {colsData.map((col, ci) => {
            const doubled = [...col, ...col]
            return (
              <div key={ci} className="flex-1 overflow-hidden" style={{ height: MOBILE_MOSAIC_H }}>
                <motion.div
                  className="flex flex-col"
                  animate={{ y: "-50%" }}
                  transition={{
                    duration: COL_DURATIONS[ci],
                    repeat: Infinity,
                    ease: "linear",
                    delay: COL_DELAYS[ci],
                  }}
                >
                  {doubled.map((tile, ti) => (
                    <div
                      key={ti}
                      style={{
                        height: (tile.grow / 100) * MOBILE_MOSAIC_H,
                        flexShrink: 0,
                        marginBottom: 6,
                      }}
                    >
                      <MosaicTile img={tile.img} label={tile.label} priority={ti === 0} />
                    </div>
                  ))}
                </motion.div>
              </div>
            )
          })}
        </div>
        <div
          className="absolute bottom-10 left-4 right-4 rounded-b-2xl h-20 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #0B1F17)" }}
        />
      </div>

      {/* ── Desktop mosaic ── */}
      <div
        className="hidden lg:flex gap-2 shrink-0 overflow-hidden"
        style={{ width: "52%", height: "100vh" }}
      >
        {colsData.map((col, ci) => {
          const doubled = [...col, ...col]
          return (
            <div key={ci} className="flex-1 overflow-hidden" style={{ height: "100vh" }}>
              <motion.div
                className="flex flex-col"
                animate={{ y: "-50%" }}
                transition={{
                  duration: COL_DURATIONS[ci],
                  repeat: Infinity,
                  ease: "linear",
                  delay: COL_DELAYS[ci],
                }}
              >
                {doubled.map((tile, ti) => (
                  <div
                    key={ti}
                    style={{
                      height: `${tile.grow}vh`,
                      flexShrink: 0,
                      marginBottom: 8,
                    }}
                  >
                    <MosaicTile img={tile.img} label={tile.label} priority={ti === 0} />
                  </div>
                ))}
              </motion.div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. TRUST BAR
// ─────────────────────────────────────────────────────────────────────────────
const row1Logos = Array.from({ length: 6 }, () => clientLogos).flat()
const row2Logos = [
  ...clientLogos.slice(2),
  ...clientLogos.slice(0, 2),
  ...Array.from({ length: 6 }, () => clientLogos).flat(),
]

const EDGE_MASK = {
  maskImage:
    "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
  WebkitMaskImage:
    "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
} as const

function TrustBarSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 150])

  return (
    <section
      ref={ref}
      style={{ backgroundColor: "#F4F1E8" }}
      className="py-12 md:py-16 text-center overflow-hidden"
    >
      <p
        style={{ color: "#8C9A8C", fontSize: 12, letterSpacing: "0.08em" }}
        className="uppercase mb-8 px-6"
      >
        Trusted by ambitious founders and visionary brands
      </p>

      <div className="mb-4" style={EDGE_MASK}>
        <motion.div
          className="flex items-center gap-10"
          style={{ x: x1, width: "max-content" }}
        >
          {row1Logos.map((src, i) => (
            <div key={i} className="trust-bar-logo relative h-8 w-32 shrink-0">
              <Image
                src={src}
                alt=""
                fill
                className="object-contain grayscale opacity-50"
                sizes="112px"
                quality={70}
              />
            </div>
          ))}
        </motion.div>
      </div>

      <div style={EDGE_MASK}>
        <motion.div
          className="flex items-center gap-10"
          style={{ x: x2, width: "max-content" }}
        >
          {row2Logos.map((src, i) => (
            <div key={i} className="trust-bar-logo relative h-8 w-32 shrink-0">
              <Image
                src={src}
                alt=""
                fill
                className="object-contain grayscale opacity-50"
                sizes="112px"
                quality={70}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. BEYOND
// ─────────────────────────────────────────────────────────────────────────────
function BeyondSection({ differenceImageUrl }: { differenceImageUrl: string }) {
  return (
    <section
      style={{ backgroundColor: "#F4F1E8", borderTop: "1px solid #E4E0D4" }}
      className="py-20 md:py-28 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto space-y-20 md:space-y-28">

        {/* Row 1: text left / image right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            variants={containerV}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span
              variants={fadeUpV}
              style={{ color: "#8C9A8C", fontSize: 11, letterSpacing: "0.13em" }}
              className="uppercase font-semibold mb-4 block"
            >
              The Matrix HQ difference
            </motion.span>
            <motion.h2
              variants={fadeUpV}
              style={{ color: "#16241C", fontWeight: 600, lineHeight: 1.1 }}
              className="text-[2rem] md:text-[2.5rem] mb-6"
            >
              Beyond templates.{" "}
              <Em>Real creative thinking,</Em>{" "}
              built to move your brand forward.
            </motion.h2>
            <motion.p
              variants={fadeUpV}
              style={{ color: "#5C6B62", fontSize: 17, lineHeight: 1.7, maxWidth: 480 }}
              className="mb-7"
            >
              AI tools compress production time. A senior creative reviews and
              finishes every deliverable before it reaches you. That is the
              speed of a tool, with the judgment of a person. No template work.
              No shortcuts on craft.
            </motion.p>
            <motion.div variants={fadeUpV}>
              <Link
                href="/work"
                style={{ backgroundColor: "#16241C", color: "#ffffff" }}
                className="group relative overflow-hidden inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold"
              >
                <span aria-hidden="true" className="absolute inset-0 bg-white/10 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out rounded-[inherit]" />
                <span className="relative z-10 inline-flex items-center gap-2">
                  See how we work
                  <ArrowRight size={16} />
                </span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeScaleV}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="difference-section-image relative rounded-[20px] overflow-hidden h-[300px] sm:h-[360px] md:h-[420px]"
            style={{ border: "1px solid #E4E0D4" }}
          >
            <Image
              src={differenceImageUrl}
              alt="The Matrix HQ difference — real creative thinking"
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 50vw"
              quality={85}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          </motion.div>
        </div>

        {/* Row 2: dark showcase card left / text right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            variants={fadeScaleV}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative rounded-[20px] overflow-hidden h-[240px] sm:h-[300px] md:h-[380px]"
            style={{ backgroundColor: "#0B1F17" }}
          >
            <Image
              src={img.arclly}
              alt="ARCLLY — grocery brand identity"
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 50vw"
              quality={85}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
            <div className="absolute inset-0 bg-[#0B1F17]/30 mix-blend-multiply pointer-events-none z-10" />
            <div className="absolute inset-0 bg-linear-to-t from-[#0B1F17]/70 to-transparent" />
            <div className="absolute bottom-6 left-6 z-20">
              <p
                style={{ color: "#D6FF5C", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}
                className="mb-1"
              >
                Featured work
              </p>
              <p style={{ color: "#ffffff", fontSize: 17, fontWeight: 600 }}>
                ARCLLY Grocery Branding
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={containerV}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span
              variants={fadeUpV}
              style={{ color: "#8C9A8C", fontSize: 11, letterSpacing: "0.13em" }}
              className="uppercase font-semibold mb-4 block"
            >
              Your creative advantage
            </motion.span>
            <motion.h2
              variants={fadeUpV}
              style={{ color: "#16241C", fontWeight: 600, lineHeight: 1.1 }}
              className="text-[2rem] md:text-[2.5rem] mb-6"
            >
              The creative partner your team{" "}
              <Em>has been asking for</Em>
            </motion.h2>
            <motion.p
              variants={fadeUpV}
              style={{ color: "#5C6B62", fontSize: 17, lineHeight: 1.7, maxWidth: 480 }}
            >
              Matrix HQ is your dedicated creative team with the specialized
              skills you need to execute across channels and moments that
              matter. See us as an extension of your team — freeing you to
              focus on your most impactful work.
            </motion.p>
          </motion.div>
        </div>

      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. FEATURE CARDS
// ─────────────────────────────────────────────────────────────────────────────
const featureCards: Array<{
  src: string
  alt: string
  labelBg: string
  labelColor: string
  labelNode: React.ReactNode
}> = [
  {
    src: "https://res.cloudinary.com/du5nhfcgd/image/upload/q_auto/f_auto/v1781996046/c4acc610d5f0b8ce132e4b269142682874e261da-1050x1200-ezgif.com-avif-to-png-converter_cqoqd0.png",
    alt: "Working on a creative project",
    labelBg: "#D6FF5C",
    labelColor: "#16240A",
    labelNode: <><Em>Flexible</Em> subscription model</>,
  },
  {
    src: "https://res.cloudinary.com/du5nhfcgd/image/upload/q_auto/f_auto/v1781996046/55397e9d9da1eb2f0e73a3a9053ce5b3ce205713-1050x1200-ezgif.com-avif-to-png-converter_grzhpr.png",
    alt: "Top global creative talent",
    labelBg: "#142B22",
    labelColor: "#ffffff",
    labelNode: <>Senior-level <Em>creative direction</Em></>,
  },
  {
    src: "https://res.cloudinary.com/du5nhfcgd/image/upload/q_auto/f_auto/v1781996045/2f768f155e92b3d7460d2c9d2a5569ecba5f2e19-1050x1200-ezgif.com-avif-to-png-converter_q047y0.png",
    alt: "AI-first creative systems",
    labelBg: "#F4F1E8",
    labelColor: "#16241C",
    labelNode: <><Em>AI-powered</Em> creative systems</>,
  },
]

function FeatureCardsSection() {
  const [headlineRef, animateHeadline] = useAnimate<HTMLHeadingElement>()
  const isInView = useInView(headlineRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return
    animateHeadline(
      headlineRef.current,
      { backgroundPosition: "100% 0%" },
      { duration: 1.4, ease: BEZIER },
    )
  }, [isInView, animateHeadline, headlineRef])

  return (
    <section
      style={{ backgroundColor: "#0B1F17", borderTop: "1px solid #1A332A" }}
      className="py-20 md:py-28 px-6 md:px-16 text-center"
    >
      <div className="max-w-7xl mx-auto">
        <motion.p
          variants={fadeUpV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          style={{ color: "#7C8C82", fontSize: 11, letterSpacing: "0.13em" }}
          className="uppercase font-semibold mb-5"
        >
          Easy &amp; hassle-free
        </motion.p>

        <h2
          ref={headlineRef}
          style={{
            backgroundImage:
              "linear-gradient(90deg, #7C8C82 0%, #ffffff 50%, #7C8C82 100%)",
            backgroundSize: "200% 100%",
            backgroundPosition: "0% 0%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontWeight: 600,
            lineHeight: 1.15,
          }}
          className="text-[2rem] md:text-[2.6rem] mb-12 md:mb-16 max-w-2xl mx-auto"
        >
          Real craft. Smarter systems.
          <br />
          <Em>AI tools speed up the first draft.</Em> The roster refines every file by hand before it ships.
        </h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {featureCards.map((card, i) => (
            <motion.div
              key={i}
              variants={fadeUpV}
              className="feature-card card-lift rounded-[20px] overflow-hidden"
              style={{ border: "1px solid #1A332A" }}
            >
              <div className="relative h-[240px] sm:h-[300px] md:h-[360px] lg:h-[400px]">
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 33vw"
                  quality={80}
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                />
              </div>
              <div
                className="px-6 py-4 text-left"
                style={{ backgroundColor: card.labelBg }}
              >
                <p
                  style={{
                    color: card.labelColor,
                    fontSize: 15,
                    fontWeight: 500,
                    lineHeight: 1.3,
                  }}
                >
                  {card.labelNode}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. HOW IT WORKS
// ─────────────────────────────────────────────────────────────────────────────
const steps = [
  {
    num: "01",
    title: "Discover",
    desc: "We start with your brief, your brand, and your goals. No forms to fill out twice.",
  },
  {
    num: "02",
    title: "Design",
    desc: "Your designer builds a visual identity system that matches your voice: logo, color, type, and the rules that hold it together.",
  },
  {
    num: "03",
    title: "Develop",
    desc: "We build the sites and digital assets your brand needs to work in the real world, not just in a deck.",
  },
  {
    num: "04",
    title: "Launch & Grow",
    desc: "Every deliverable is reviewed by your Art Director before it ships, then handed to you ready to use.",
  },
]

function HowItWorksSection() {
  return (
    <section
      style={{ backgroundColor: "#0B1F17", borderTop: "1px solid #1A332A" }}
      className="py-16 md:py-24 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12 md:mb-14"
        >
          <motion.span
            variants={fadeUpV}
            style={{ color: "#D6FF5C", fontSize: 12, letterSpacing: "0.12em" }}
            className="uppercase font-semibold mb-4 block"
          >
            From brief to brilliant
          </motion.span>
          <motion.h2
            variants={fadeUpV}
            style={{ color: "#ffffff", fontWeight: 600, lineHeight: 1.1, maxWidth: 560 }}
            className="text-[2rem] md:text-[2.5rem]"
          >
            From brief to <Em>brilliant</Em> — fast.
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10"
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {steps.map((step, i) => (
            <motion.div key={i} variants={fadeUpV} className="process-step card-lift rounded-xl p-4">
              <p style={{ color: "#D6FF5C", fontSize: 13, fontWeight: 700 }} className="mb-2.5">
                {step.num}
              </p>
              <h3 style={{ color: "#ffffff", fontSize: 17, fontWeight: 600 }} className="mb-2">
                {step.title}
              </h3>
              <p style={{ color: "#C9D6CE", fontSize: 14, lineHeight: 1.65 }}>{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. WHAT'S INCLUDED
// ─────────────────────────────────────────────────────────────────────────────
const included = [
  {
    title: "Unlimited requests",
    desc: "Submit as many projects as you want, queue them, prioritize them — we're always moving.",
  },
  {
    title: "Unlimited revisions",
    desc: "We iterate until it's right. No extra charges, no passive-aggressive sighs.",
  },
  {
    title: "30-hour first drafts",
    desc: "Most requests get a first draft within 30 hours, powered by AI and refined by senior creatives.",
  },
  {
    title: "Dedicated project manager",
    desc: "One point of contact, always in the loop. No vanishing acts, no ticket queues.",
  },
  {
    title: "Real-time communication",
    desc: "Always-on support, no waiting days on replies. We stay in your timezone — mentally.",
  },
  {
    title: "Full copyright & IP transfer",
    desc: "You own everything we create, fully and outright. Files, source assets, all yours.",
  },
]

function WhatsIncludedSection() {
  return (
    <section
      style={{ backgroundColor: "#F4F1E8", borderTop: "1px solid #E4E0D4" }}
      className="py-16 md:py-24 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <span
            style={{ color: "#8C9A8C", fontSize: 12, letterSpacing: "0.12em" }}
            className="uppercase font-semibold mb-4 block"
          >
            Every plan includes
          </span>
          <h2
            style={{ color: "#16241C", fontWeight: 600, lineHeight: 1.1, maxWidth: 560 }}
            className="text-[2rem] md:text-[2.5rem] mb-10 md:mb-12"
          >
            Everything you need. <Em>Nothing you don&apos;t.</Em>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {included.map((item, i) => (
            <ScrollReveal key={i} delay={i * 70}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[14px] p-6"
                style={{ backgroundColor: "#ffffff", border: "1px solid #E4E0D4" }}
              >
                <h3 style={{ fontSize: 16, color: "#16241C", fontWeight: 600 }} className="mb-2">
                  {item.title}
                </h3>
                <p style={{ color: "#5C6B62", fontSize: 13, lineHeight: 1.65 }}>{item.desc}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. SERVICES
// ─────────────────────────────────────────────────────────────────────────────
const services = [
  { label: "Brand identity",          icon: BrushIcon,                   lime: false },
  { label: "Marketing & advertising", icon: Megaphone02Icon,              lime: true  },
  { label: "Digital & web",           icon: GlobeIcon,                   lime: false },
  { label: "Motion & video",          icon: PlayIcon,                    lime: false },
  { label: "Print",                   icon: PrinterIcon,                 lime: false },
  { label: "Illustration & artwork",  icon: PenTool02Icon,               lime: true  },
  { label: "Presentations",           icon: PresentationBarChart02Icon,  lime: false },
  { label: "Product & packaging",     icon: PackageIcon,                 lime: false },
]

function ServicesSection() {
  return (
    <section
      style={{ backgroundColor: "#0B1F17", borderTop: "1px solid #1A332A" }}
      className="py-16 md:py-24 px-6 md:px-16 text-center"
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <span
            style={{ color: "#D6FF5C", fontSize: 12, letterSpacing: "0.12em" }}
            className="uppercase font-semibold mb-4 block"
          >
            One team, every discipline
          </span>
          <h2
            style={{ color: "#ffffff", fontWeight: 600, lineHeight: 1.1 }}
            className="text-[2rem] md:text-[2.5rem] mb-10"
          >
            One team. <Em>Every discipline.</Em>
          </h2>
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center flex-wrap gap-3"
        >
          {services.map((svc, i) => (
            <span
              key={i}
              className="card-lift inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full text-[13px] md:text-sm font-semibold"
              style={
                svc.lime
                  ? { backgroundColor: "#D6FF5C", color: "#16240A" }
                  : { backgroundColor: "#1A332A", color: "#ffffff" }
              }
            >
              <HugeiconsIcon icon={svc.icon} size={15} />
              {svc.label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. STATS
// ─────────────────────────────────────────────────────────────────────────────
const stats = [
  { value: "150+", count: 150, suffix: "+", label: "Projects completed for founders and brands." },
  { value: "80+",  count: 80,  suffix: "+", label: "Happy clients across Nigeria and beyond." },
  { value: "6+",   count: 6,   suffix: "+", label: "Years of combined creative experience." },
  { value: "98%",  count: 98,  suffix: "%", label: "Client satisfaction across delivered projects." },
]

function StatsSection() {
  return (
    <section
      style={{ backgroundColor: "#F4F1E8", borderTop: "1px solid #E4E0D4" }}
      className="py-16 md:py-24 px-6 md:px-16 text-center"
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <span
            style={{ color: "#8C9A8C", fontSize: 12, letterSpacing: "0.12em" }}
            className="uppercase font-semibold mb-4 block"
          >
            Numbers that speak
          </span>
          <h2
            style={{ color: "#16241C", fontWeight: 600, lineHeight: 1.1 }}
            className="text-[2rem] md:text-[2.5rem] mb-10 md:mb-14"
          >
            The best return on <Em>your investment</Em>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-left">
          {stats.map((s, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
              >
                <p style={{ fontWeight: 400, color: "#16241C", lineHeight: 1 }} className="font-serif text-[2.4rem] md:text-[2.8rem] lg:text-[3rem] mb-2.5">
                  <span data-count={s.count} data-suffix={s.suffix}>{s.value}</span>
                </p>
                <p style={{ color: "#5C6B62", fontSize: 14, lineHeight: 1.6 }}>{s.label}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. PORTFOLIO
// ─────────────────────────────────────────────────────────────────────────────
const portfolioItems = [
  { src: img.arclly,  title: "ARCLLY",           sub: "Grocery branding",   href: "https://www.behance.net/gallery/209998445/ARCLLY-Grocery-Branding",              span: 2 },
  { src: img.ledga,   title: "LEDGA Finance",     sub: "Brand identity",     href: "https://www.behance.net/gallery/209969707/LEDGA-Full-Branding-and-Identity-Design", span: 1 },
  { src: img.inaara,  title: "Inaara Woman",      sub: "Luxury fashion",     href: "https://inaarawoman.com",                                                        span: 1 },
  { src: img.assura,  title: "Assura Cash",       sub: "Fintech app",        href: "https://assuracash.com",                                                         span: 1 },
  { src: img.moods,   title: "Moods and Motion",  sub: "Studio platform",    href: "https://moodsandmotion.vercel.app",                                              span: 1 },
  { src: img.alavda,  title: "Alavda Travel",     sub: "Brand identity",     href: "https://www.behance.net/gallery/222946803/Alavda-Travel-Brand-Identity-Design",  span: 2 },
]

function PortfolioSection() {
  return (
    <section
      style={{ backgroundColor: "#F4F1E8", borderTop: "1px solid #E4E0D4" }}
      className="py-16 md:py-24 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto">

        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10"
        >
          <div>
            <motion.span
              variants={fadeUpV}
              style={{ color: "#8C9A8C", fontSize: 11, letterSpacing: "0.13em" }}
              className="uppercase font-semibold mb-3 block"
            >
              Our work
            </motion.span>
            <motion.h2
              variants={fadeUpV}
              style={{ color: "#16241C", fontWeight: 600, lineHeight: 1.1 }}
              className="text-[2rem] md:text-[2.5rem]"
            >
              See how we build brands{" "}
              <Em>that actually move people</Em>
            </motion.h2>
          </div>

          <motion.div variants={fadeUpV} className="shrink-0">
            <Link
              href="/work"
              style={{
                color: "#16241C",
                border: "1px solid #C0BAA8",
                fontSize: 13,
                fontWeight: 500,
              }}
              className="btn-arrow-icon inline-flex items-center gap-2 px-5 py-2.5 rounded-full hover:bg-[#16241C] hover:text-white hover:border-[#16241C] transition-all"
            >
              Explore all our work
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Desktop 4-col grid */}
        <motion.div
          className="hidden lg:grid gap-3"
          style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {portfolioItems.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUpV}
              className="portfolio-tile"
              style={{ gridColumn: `span ${item.span}` }}
            >
              <Link href={item.href} target="_blank" rel="noopener noreferrer" className="group block">
                <div className="relative rounded-xl overflow-hidden mb-3" style={{ height: 300 }}>
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width:1280px) 50vw, 33vw"
                    quality={85}
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                  />
                </div>
                <h3 style={{ color: "#16241C", fontSize: 15, fontWeight: 600 }} className="mb-0.5">
                  {item.title}
                </h3>
                <p style={{ color: "#8C9A8C", fontSize: 12 }}>{item.sub}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Tablet 2-col grid */}
        <div className="hidden md:grid lg:hidden gap-4" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
          {portfolioItems.map((item, i) => (
            <Link key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="group block">
              <div className="relative rounded-xl overflow-hidden mb-3" style={{ height: 240 }}>
                <Image src={item.src} alt={item.title} fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="50vw"
                  quality={80}
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                />
              </div>
              <h3 style={{ color: "#16241C", fontSize: 15, fontWeight: 600 }} className="mb-0.5">{item.title}</h3>
              <p style={{ color: "#8C9A8C", fontSize: 12 }}>{item.sub}</p>
            </Link>
          ))}
        </div>

        {/* Mobile single-column */}
        <div className="md:hidden flex flex-col gap-6">
          {portfolioItems.map((item, i) => (
            <Link key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="group block">
              <div className="relative rounded-xl overflow-hidden mb-3" style={{ height: 220 }}>
                <Image src={item.src} alt={item.title} fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="100vw"
                  quality={80}
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                />
              </div>
              <h3 style={{ color: "#16241C", fontSize: 15, fontWeight: 600 }} className="mb-0.5">{item.title}</h3>
              <p style={{ color: "#8C9A8C", fontSize: 12 }}>{item.sub}</p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. COMPARISON
// ─────────────────────────────────────────────────────────────────────────────
const compCols = ["Speed", "Flexibility", "Quality", "Scalability", "Efficiency", "AI & Strategy"]

const compEntities = [
  {
    name: "Matrix HQ",
    desc: "Senior creative direction and AI-powered systems built to move your brand forward.",
    icon: null,
    highlight: true,
    checks: [true, true, true, true, true, true],
  },
  {
    name: "In-house team",
    desc: "In-house teams don't always have the skill mix or bandwidth to handle every request that the business needs.",
    icon: <Users className="w-4 h-4" />,
    highlight: false,
    checks: [false, true, true, false, false, false],
  },
  {
    name: "Creative agencies",
    desc: "Traditional agencies can be slow, costly, and built around rigid processes that make it difficult to adapt.",
    icon: <Building2 className="w-4 h-4" />,
    highlight: false,
    checks: [false, false, true, false, false, false],
  },
  {
    name: "Freelancers",
    desc: "Freelancers can be unreliable and hard to scale, leading to inconsistent work and questionable quality.",
    icon: <User className="w-4 h-4" />,
    highlight: false,
    checks: [false, true, false, false, false, false],
  },
  {
    name: "AI tools only",
    desc: "AI tools can increase speed and efficiency, but without human judgment and brand context, they fall short on quality and strategy.",
    icon: <Bot className="w-4 h-4" />,
    highlight: false,
    checks: [true, false, false, true, true, false],
  },
]

function ComparisonSection() {
  return (
    <section
      style={{ backgroundColor: "#0B1F17", borderTop: "1px solid #1A332A" }}
      className="py-20 md:py-28 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto">

        <motion.div
          className="text-center mb-14"
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.span
            variants={fadeUpV}
            style={{ color: "#D6FF5C", fontSize: 11, letterSpacing: "0.13em" }}
            className="uppercase font-semibold mb-4 block"
          >
            Matrix HQ vs. the alternatives
          </motion.span>
          <motion.h2
            variants={fadeUpV}
            style={{ color: "#ffffff", fontWeight: 600, lineHeight: 1.1 }}
            className="text-[2rem] md:text-[2.6rem] mb-4"
          >
            Hiring or traditional outsourcing?{" "}
            <Em>Neither.</Em>
          </motion.h2>
          <motion.p
            variants={fadeUpV}
            style={{ color: "#8CA89A", fontSize: 16, lineHeight: 1.65, maxWidth: 540 }}
            className="mx-auto"
          >
            A freelancer is one person, found once, with no one checking the work. The roster is a vetted team, with an Art Director&apos;s eyes on every file, every time.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Column header row */}
          <div
            className="hidden lg:grid mb-2 px-5"
            style={{ gridTemplateColumns: "2.4fr repeat(6, 1fr)" }}
          >
            <div />
            {compCols.map((col) => (
              <div key={col} className="text-center">
                <span style={{ color: "#7C8C82", fontSize: 11, letterSpacing: "0.08em", fontWeight: 600 }}
                  className="uppercase">
                  {col}
                </span>
              </div>
            ))}
          </div>

          {/* Entity rows */}
          <div className="flex flex-col gap-2">
            {compEntities.map((entity, i) => (
              <motion.div
                key={i}
                variants={fadeUpV}
                className="comparison-row hidden lg:grid rounded-2xl px-5 py-5 items-center"
                style={{
                  gridTemplateColumns: "2.4fr repeat(6, 1fr)",
                  backgroundColor: entity.highlight ? "#D6FF5C" : "#0F2B20",
                  border: entity.highlight ? "none" : "1px solid #1A332A",
                }}
              >
                <div className="flex items-start gap-3 pr-6">
                  {entity.highlight ? (
                    <div
                      className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: "#16240A" }}
                    >
                      <span style={{ color: "#D6FF5C", fontSize: 10, fontWeight: 800, letterSpacing: "0.05em" }}>
                        MHQ
                      </span>
                    </div>
                  ) : (
                    <div
                      className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: "#1A332A", color: "#7C8C82" }}
                    >
                      {entity.icon}
                    </div>
                  )}
                  <div>
                    <p style={{
                      color: entity.highlight ? "#16240A" : "#E8F0EC",
                      fontSize: 14,
                      fontWeight: 700,
                      lineHeight: 1.2,
                    }}
                      className="mb-0.5"
                    >
                      {entity.name}
                    </p>
                    <p style={{
                      color: entity.highlight ? "#2E4A1E" : "#8CA89A",
                      fontSize: 12,
                      lineHeight: 1.5,
                    }}>
                      {entity.desc}
                    </p>
                  </div>
                </div>

                {entity.checks.map((pass, ci) => (
                  <div key={ci} className="flex items-center justify-center">
                    {pass ? (
                      <Check
                        strokeWidth={2.5}
                        className="w-4 h-4"
                        style={{ color: entity.highlight ? "#16240A" : "#C9D6CE" }}
                      />
                    ) : (
                      <X
                        strokeWidth={2}
                        className="w-4 h-4"
                        style={{ color: entity.highlight ? "#2E4A1E" : "#3D5E4C" }}
                      />
                    )}
                  </div>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Mobile + tablet fallback */}
          <div className="lg:hidden flex flex-col gap-3">
            {compEntities.map((entity, i) => (
              <div
                key={i}
                className="rounded-2xl p-5"
                style={{
                  backgroundColor: entity.highlight ? "#D6FF5C" : "#0F2B20",
                  border: entity.highlight ? "none" : "1px solid #1A332A",
                }}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div
                    className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: entity.highlight ? "#16240A" : "#1A332A", color: entity.highlight ? "#D6FF5C" : "#7C8C82" }}
                  >
                    {entity.highlight ? (
                      <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.05em" }}>MHQ</span>
                    ) : entity.icon}
                  </div>
                  <div>
                    <p style={{ color: entity.highlight ? "#16240A" : "#E8F0EC", fontSize: 14, fontWeight: 700 }} className="mb-0.5">
                      {entity.name}
                    </p>
                    <p style={{ color: entity.highlight ? "#2E4A1E" : "#8CA89A", fontSize: 12, lineHeight: 1.5 }}>
                      {entity.desc}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {compCols.map((col, ci) => (
                    <div
                      key={ci}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                      style={{ backgroundColor: entity.highlight ? "#16240A20" : "#1A332A" }}
                    >
                      {entity.checks[ci] ? (
                        <Check strokeWidth={2.5} className="w-3 h-3" style={{ color: entity.highlight ? "#16240A" : "#C9D6CE" }} />
                      ) : (
                        <X strokeWidth={2} className="w-3 h-3" style={{ color: entity.highlight ? "#2E4A1E" : "#2A4538" }} />
                      )}
                      <span style={{ color: entity.highlight ? "#16240A" : "#7C8C82", fontSize: 11, fontWeight: 500 }}>
                        {col}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 11. PRICING
// ─────────────────────────────────────────────────────────────────────────────
const tiers = [
  {
    tier: "Tier 01",
    name: "Small Business",
    desc: "For founders and small teams who need a reliable creative partner without the agency overhead.",
    ngn: "₦249,999",
    usd: "$399",
    badge: "Save ₦2.5M+ vs a Lagos agency retainer",
    requests: "2 at a time",
    revisions: "Unlimited",
    popular: false,
  },
  {
    tier: "Tier 02",
    name: "Marketing & Ads",
    desc: "For startups and growing SMBs running active campaigns who need creative at the speed of their marketing.",
    ngn: "₦499,999",
    usd: "$799",
    badge: "Equivalent to 1 junior designer's salary — but a full team",
    requests: "4 at a time",
    revisions: "Unlimited",
    popular: true,
  },
  {
    tier: "Tier 03",
    name: "Agency",
    desc: "For agencies and in-house teams who need white-label creative capacity they can scale without hiring.",
    ngn: "₦899,999",
    usd: "$1,399",
    badge: "Replace a 3-person in-house team at a fraction of the cost",
    requests: "Unlimited",
    revisions: "Unlimited",
    popular: false,
  },
]

function PricingSection({
  currency,
  setCurrency,
}: {
  currency: "ngn" | "usd"
  setCurrency: (c: "ngn" | "usd") => void
}) {
  return (
    <section
      style={{ backgroundColor: "#0B1F17", borderTop: "1px solid #1A332A" }}
      className="py-16 md:py-24 px-6 md:px-16 text-center"
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <span
            style={{ color: "#D6FF5C", fontSize: 12, letterSpacing: "0.12em" }}
            className="uppercase font-semibold mb-4 block"
          >
            Simple, transparent pricing
          </span>
          <h2
            style={{ color: "#ffffff", fontWeight: 600, lineHeight: 1.15 }}
            className="text-3xl md:text-4xl mb-3"
          >
            Choose your plan.
          </h2>
          <p style={{ color: "#C9D6CE", fontSize: 15 }} className="mb-8">
            Unlimited design. One flat rate. No surprises.
          </p>

          <div
            className="inline-flex p-1 rounded-full mb-10 max-w-full"
            style={{ backgroundColor: "#142B22", border: "1px solid #1A332A" }}
          >
            {(["ngn", "usd"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap"
                style={
                  currency === c
                    ? { backgroundColor: "#D6FF5C", color: "#16240A" }
                    : { color: "#7C8C82", background: "transparent" }
                }
              >
                {c === "ngn" ? "Nigeria (₦)" : "International ($)"}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-225 mx-auto text-left">
          {tiers.map((tier, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.09 }}
                className="relative rounded-[14px] p-6 flex flex-col h-full"
                style={{
                  backgroundColor: "#142B22",
                  border: tier.popular ? "2px solid #D6FF5C" : "1px solid #1A332A",
                }}
              >
                {tier.popular && (
                  <span
                    className="absolute -top-3 left-5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                    style={{ backgroundColor: "#D6FF5C", color: "#16240A" }}
                  >
                    Most popular
                  </span>
                )}

                <p
                  style={{ color: "#7C8C82", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em" }}
                  className="mb-2 mt-2"
                >
                  {tier.tier}
                </p>
                <h3 style={{ color: "#ffffff", fontSize: 18, fontWeight: 600 }} className="mb-1.5">
                  {tier.name}
                </h3>
                <p style={{ color: "#C9D6CE", fontSize: 12, lineHeight: 1.65 }} className="mb-4">
                  {tier.desc}
                </p>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={currency}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    style={{ color: "#ffffff", fontSize: 30, fontWeight: 700 }}
                    className="mb-0.5"
                  >
                    {currency === "ngn" ? tier.ngn : tier.usd}
                    <span style={{ fontSize: 13, color: "#7C8C82", fontWeight: 400 }}>/mo</span>
                  </motion.p>
                </AnimatePresence>

                <p style={{ color: "#D6FF5C", fontSize: 11 }} className="mb-4">
                  {tier.badge}
                </p>

                <p style={{ color: "#C9D6CE", fontSize: 13 }} className="mb-6">
                  {tier.requests} active requests · {tier.revisions} revisions
                </p>

                <div className="space-y-2 mb-7 flex-1">
                  {["30-hr first draft", "Dedicated project manager", "IP transfer on delivery"].map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <HugeiconsIcon icon={Tick02Icon} size={16} color="#D6FF5C" className="shrink-0" />
                      <span style={{ color: "#C9D6CE", fontSize: 12 }}>{f}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="https://wa.me/2347045985964"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden inline-flex items-center justify-center gap-2 w-full py-3 rounded-full text-sm font-semibold"
                  style={
                    tier.popular
                      ? { backgroundColor: "#D6FF5C", color: "#16240A" }
                      : { backgroundColor: "#244A38", color: "#ffffff" }
                  }
                >
                  <span aria-hidden="true" className={`absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out rounded-[inherit] ${tier.popular ? "bg-black/10" : "bg-white/10"}`} />
                  <span className="relative z-10 inline-flex items-center gap-2">
                    Get started
                    <ArrowUpRight size={16} weight="bold" />
                  </span>
                </Link>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={250}>
          <div className="mt-8">
            <Link
              href="/contact"
              style={{ color: "#7C8C82", fontSize: 13 }}
              className="btn-arrow-icon inline-flex items-center gap-1.5 hover:opacity-70 transition-opacity"
            >
              View full pricing &amp; compare plans
              <ArrowRight size={14} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 12. TESTIMONIALS
// ─────────────────────────────────────────────────────────────────────────────
const testimonialCards = [
  {
    quote:
      "We move fast. We never cut corners. Every pixel, every line of code, every brand decision is deliberate. Because speed without quality is just noise.",
    name: "Speed Without Compromise",
    role: "Our first principle",
  },
  {
    quote:
      "We don't just design for today. We architect systems that scale with your ambition and evolve with your business — built to last, designed to grow.",
    name: "Built for Growth",
    role: "Our second principle",
  },
  {
    quote:
      "Technology is our tool, but empathy is our foundation. We build brands that connect with real people — because great design starts with understanding who you're talking to.",
    name: "Human-Centered",
    role: "Our third principle",
  },
]

function TestimonialsSection() {
  return (
    <section
      style={{ backgroundColor: "#F4F1E8", borderTop: "1px solid #E4E0D4" }}
      className="py-16 md:py-24 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <span
            style={{ color: "#8C9A8C", fontSize: 12, letterSpacing: "0.12em" }}
            className="uppercase font-semibold mb-4 block text-center"
          >
            How we show up
          </span>
          <h2
            style={{ color: "#16241C", fontWeight: 600, lineHeight: 1.15 }}
            className="text-3xl md:text-4xl mb-10 text-center"
          >
            Creative wins, <Em>built on principle</Em>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonialCards.map((card, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                className="testimonial-card rounded-[14px] p-6"
                style={{ backgroundColor: "#ffffff", border: "1px solid #E4E0D4" }}
              >
                <p
                  style={{ color: "#16241C", fontSize: 14, lineHeight: 1.65 }}
                  className="mb-5"
                >
                  &ldquo;{card.quote}&rdquo;
                </p>
                <div>
                  <p style={{ color: "#16241C", fontSize: 13, fontWeight: 600 }}>{card.name}</p>
                  <p style={{ color: "#8C9A8C", fontSize: 12 }}>{card.role}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 13. TALENT SECTION — full-bleed editorial background
// ─────────────────────────────────────────────────────────────────────────────
function TalentSection({ talentBgImageUrl }: { talentBgImageUrl: string }) {
  return (
    <section className="noise-overlay relative min-h-[560px] lg:min-h-[640px] flex items-center overflow-hidden">
      {/* Background image + overlays */}
      <div className="absolute inset-0 z-0" data-parallax-bg="true">
        <Image
          src={talentBgImageUrl}
          alt=""
          fill
          className="object-cover object-center"
          quality={80}
          priority={false}
        />
        <div className="absolute inset-0 bg-[#0B1F17]/72" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32 w-full">
        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-xl"
        >
          <motion.div variants={fadeUpV} className="flex items-center gap-4 mb-10">
            <span
              style={{ color: "rgba(255,255,255,0.38)", fontSize: 10, letterSpacing: "0.14em", fontWeight: 600, whiteSpace: "nowrap" }}
              className="uppercase shrink-0"
            >
              Work with the best
            </span>
            <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.10)", flexGrow: 1 }} />
          </motion.div>

          <motion.h2
            variants={fadeUpV}
            style={{ color: "#F0EDE6", fontWeight: 600, lineHeight: 1.1 }}
            className="text-3xl md:text-4xl lg:text-[2.6rem] mb-8"
          >
            <span style={{ color: "#D6FF5C" }}><Em>Senior creative talent</Em></span>{" "}
            setting a higher standard
          </motion.h2>

          <motion.p
            variants={fadeUpV}
            style={{ color: "rgba(255,255,255,0.72)", fontSize: 17, lineHeight: 1.5 }}
            className="mb-4 max-w-sm"
          >
            Meet the roster behind every request.
          </motion.p>
          <motion.p
            variants={fadeUpV}
            style={{ color: "rgba(255,255,255,0.42)", fontSize: 13, lineHeight: 1.6 }}
            className="max-w-sm mb-10"
          >
            A small, heavily vetted pool of designers, matched to your brand and sharpened by AI tools
            that remove the slow parts of the job, not the thoughtful ones. Every file is reviewed by
            an Art Director before it reaches you.
          </motion.p>

          <motion.div variants={fadeUpV}>
            <Link
              href="https://wa.me/2347045985964"
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: "#D6FF5C", color: "#16240A" }}
              className="group relative overflow-hidden inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold"
            >
              <span aria-hidden="true" className="absolute inset-0 bg-black/10 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out rounded-[inherit]" />
              <span className="relative z-10 inline-flex items-center gap-2">
                Book a call
                <ArrowUpRight size={16} weight="bold" />
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 14. BOTTLENECK SECTION — full-bleed editorial background
// ─────────────────────────────────────────────────────────────────────────────
function BottleneckSection({ bottleneckBgImageUrl }: { bottleneckBgImageUrl: string }) {
  return (
    <section className="noise-overlay relative min-h-[560px] lg:min-h-[640px] flex items-center overflow-hidden">
      {/* Background image + overlays */}
      <div className="absolute inset-0 z-0" data-parallax-bg="true">
        <Image
          src={bottleneckBgImageUrl}
          alt=""
          fill
          className="object-cover object-center"
          quality={80}
          priority={false}
        />
        <div className="absolute inset-0 bg-[#0B1F17]/72" />
      </div>

      {/* Content — offset to right on desktop for visual variety */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32 w-full">
        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-xl lg:ml-auto"
        >
          <motion.div variants={fadeUpV} className="flex items-center gap-4 mb-10">
            <span
              style={{ color: "rgba(214,255,92,0.55)", fontSize: 10, letterSpacing: "0.14em", fontWeight: 600, whiteSpace: "nowrap" }}
              className="uppercase shrink-0"
            >
              Creative capacity on demand
            </span>
            <div style={{ height: 1, backgroundColor: "rgba(214,255,92,0.15)", flexGrow: 1 }} />
          </motion.div>

          <motion.h2
            variants={fadeUpV}
            style={{ color: "#ffffff", fontWeight: 600, lineHeight: 1.1 }}
            className="text-3xl md:text-4xl lg:text-[2.6rem] mb-8"
          >
            Your brand <Em>deserves better{" "}<br className="hidden lg:block" />than bottlenecks</Em>
          </motion.h2>

          <motion.p
            variants={fadeUpV}
            style={{ color: "rgba(255,255,255,0.72)", fontSize: 17, lineHeight: 1.5 }}
            className="mb-4 max-w-sm"
          >
            In-house teams are the heart of your brand — but endless requests and limited bandwidth mean
            something always slips.
          </motion.p>
          <motion.p
            variants={fadeUpV}
            style={{ color: "rgba(255,255,255,0.42)", fontSize: 13, lineHeight: 1.6 }}
            className="max-w-sm mb-10"
          >
            Matrix HQ steps in to absorb the pressure without the overhead of hiring. There&apos;s a smarter
            way to scale your creative output — and it&apos;s not another agency or more freelancers.
          </motion.p>

          <motion.div variants={fadeUpV}>
            <Link
              href="https://wa.me/2347045985964"
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: "#D6FF5C", color: "#16240A" }}
              className="group relative overflow-hidden inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold"
            >
              <span aria-hidden="true" className="absolute inset-0 bg-black/10 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out rounded-[inherit]" />
              <span className="relative z-10 inline-flex items-center gap-2">
                Book a call
                <ArrowUpRight size={16} weight="bold" />
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 15. CLOSING CTA — full-bleed editorial background, centered
// ─────────────────────────────────────────────────────────────────────────────
function ClosingCtaSection({ finalCtaBgImageUrl }: { finalCtaBgImageUrl: string }) {
  return (
    <section className="noise-overlay relative min-h-[560px] lg:min-h-[640px] flex items-center overflow-hidden text-center">
      {/* Background image + overlays */}
      <div className="absolute inset-0 z-0" data-parallax-bg="true">
        <Image
          src={finalCtaBgImageUrl}
          alt=""
          fill
          className="object-cover object-center"
          quality={80}
          priority={false}
        />
        <div className="absolute inset-0 bg-[#0B1F17]/75" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 py-24 lg:py-32 w-full">
        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.span
            variants={fadeUpV}
            style={{ color: "#D6FF5C", fontSize: 11, letterSpacing: "0.14em", fontWeight: 600 }}
            className="uppercase block mb-6"
          >
            Let&apos;s build something remarkable
          </motion.span>

          <motion.h2
            variants={fadeUpV}
            style={{ color: "#ffffff", fontWeight: 700, lineHeight: 1.05 }}
            className="text-[2.2rem] md:text-[3.2rem] lg:text-[3.8rem] mb-8 tracking-tight"
          >
            Your next brand moment
            <br />
            starts <Em>right here.</Em>
          </motion.h2>

          <motion.p
            variants={fadeUpV}
            style={{ color: "rgba(255,255,255,0.62)", fontSize: 17, lineHeight: 1.65, maxWidth: 520 }}
            className="mx-auto mb-12"
          >
            Join ambitious founders and growing brands who trust Matrix HQ to
            move faster, look sharper, and show up better — every time.
          </motion.p>

          <motion.div variants={fadeUpV} className="flex flex-wrap justify-center gap-3">
            <Link
              href="https://wa.me/2347045985964"
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: "#D6FF5C", color: "#16240A" }}
              className="group relative overflow-hidden inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold"
            >
              <span aria-hidden="true" className="absolute inset-0 bg-black/10 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out rounded-[inherit]" />
              <span className="relative z-10 inline-flex items-center gap-2">
                Book a call
                <ArrowUpRight size={16} weight="bold" />
              </span>
            </Link>
            <Link
              href="/work"
              style={{ color: "#ffffff", border: "1px solid rgba(255,255,255,0.22)" }}
              className="btn-arrow-icon inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold bg-transparent hover:bg-white/5 transition-colors"
            >
              View our work
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
