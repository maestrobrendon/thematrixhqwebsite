"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  Check,
  ChevronDown,
  Zap,
  Users,
  RefreshCw,
  DollarSign,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"

// ── Design tokens ─────────────────────────────────────────────────────────────
// Dark bg: #0B1F17 · Light bg: #F4F1E8 · Lime: #D6FF5C · Lime text: #16240A
// Card dark: #142B22 · Border dark: #1A332A · Border light: #E4E0D4

const BEZIER = [0.25, 0, 0, 1] as [number, number, number, number]

function Em({ children }: { children: React.ReactNode }) {
  return <span className="font-serif italic font-normal">{children}</span>
}

// ── Shared animation ──────────────────────────────────────────────────────────
const containerV = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const fadeUpV = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: BEZIER } },
}

// ── Pricing data ──────────────────────────────────────────────────────────────
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
    features: [
      "30-hr first draft guarantee",
      "Dedicated project manager",
      "Full IP transfer on delivery",
      "Unlimited revisions",
      "Brand guidelines included",
      "Async Slack collaboration",
    ],
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
    features: [
      "Everything in Small Business",
      "4 concurrent active requests",
      "Motion & video production",
      "AI-accelerated first drafts",
      "Priority queue turnaround",
      "Monthly strategy review call",
    ],
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
    features: [
      "Everything in Marketing & Ads",
      "Unlimited concurrent requests",
      "White-label delivery",
      "Dedicated creative director",
      "Custom SLA & reporting",
      "On-demand capacity scaling",
    ],
  },
]

const clientLogos = [
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764283723/gtimkbhhs72kxg0qctbp.png",
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764283759/z9jvpgg2bmqusl4vpvrt.png",
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764283687/w2nlreoxajlp57z2ndze.png",
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764283670/k7rmtutzsl5rztjaysa8.png",
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764283640/fcehfyvpcsf3ubbyvjxg.png",
]

const HERO_IMG =
  "https://res.cloudinary.com/du5nhfcgd/image/upload/q_auto/f_auto/v1782001434/pexels-mikael-blomkvist-4153232_k0fnhi.jpg"
const SPLIT_IMG_1 =
  "https://res.cloudinary.com/du5nhfcgd/image/upload/q_auto/f_auto/v1782001484/c727f565c82ba533852853973ef2321609b80059-1230x1611-ezgif.com-avif-to-png-converter_lixxoz.png"
const SPLIT_IMG_2 =
  "https://res.cloudinary.com/du5nhfcgd/image/upload/q_auto/f_auto/v1782001431/ab0c6ff6860b3ec198692dc7bf5fd1a5db24bf19-1650x1380_tghrci.jpg"

const serviceCategories = [
  { label: "Brand Identity", lime: true },
  { label: "Logo Design", lime: false },
  { label: "Marketing Campaigns", lime: false },
  { label: "Social Media", lime: true },
  { label: "Pitch Decks", lime: false },
  { label: "Motion & Video", lime: false },
  { label: "Web Design", lime: true },
  { label: "Landing Pages", lime: false },
  { label: "Email Templates", lime: false },
  { label: "Product Design", lime: false },
  { label: "Illustration", lime: true },
  { label: "Packaging", lime: false },
  { label: "Print Collateral", lime: false },
  { label: "Ad Creatives", lime: true },
  { label: "Infographics", lime: false },
  { label: "Brand Guidelines", lime: false },
  { label: "Copywriting", lime: false },
  { label: "Photography Direction", lime: false },
  { label: "UX / UI Design", lime: true },
  { label: "AI Creative Systems", lime: false },
  { label: "Presentations", lime: false },
  { label: "Trade Show Graphics", lime: false },
]

const included = [
  "Unlimited design requests",
  "Unlimited revisions on every request",
  "30-hour first draft turnaround",
  "Dedicated project manager",
  "Full IP transfer on all deliveries",
  "Async Slack + Loom collaboration",
  "AI-powered creative acceleration",
  "Pause or cancel anytime",
]

const testimonials = [
  {
    quote:
      "We came with a rough brief and left with an entire brand system. The speed blew us away — first draft in under 24 hours, final assets in three days.",
    name: "Tolu A.",
    role: "Founder, Arclly Grocery",
    stat: "Brand launched in 4 days",
    workImg: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764280363/ifdv28cltsgypa7nhhuv.jpg",
  },
  {
    quote:
      "Having Matrix HQ on retainer feels like having a senior creative director in-house — but without the salary, the office, or the onboarding friction.",
    name: "Chinwe O.",
    role: "CMO, Ledga Finance",
    stat: "4× faster campaign output",
    workImg: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279279/vvn9avecee8eaj9yptti.jpg",
  },
  {
    quote:
      "We replaced two freelancers and one agency retainer with a single Matrix HQ subscription. The quality went up and the cost went down significantly.",
    name: "Emeka K.",
    role: "Brand Lead, Assura Cash",
    stat: "60% reduction in creative spend",
    workImg: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764281754/mnv7i1uyrl4pgfowyjrk.jpg",
  },
]

const faqs = [
  {
    q: "How does onboarding work?",
    a: "Once you subscribe, you'll get a welcome email with your onboarding link. Your dedicated project manager sets up a brief call (or async Loom) to understand your brand, goals, and priorities. You're submitting your first request within 24 hours.",
  },
  {
    q: "What counts as one design request?",
    a: "One request = one clearly scoped task: a logo, a landing page, a social media set, a pitch deck. Complex deliverables (e.g. a 40-page brand guide) may be scoped across multiple requests — your PM will always flag this upfront.",
  },
  {
    q: "What billing options are available?",
    a: "All plans are billed monthly. There are no long-term contracts — you can pause or cancel anytime. Annual billing with a 15% discount is available on request.",
  },
  {
    q: "What happens if I run out of my budget in a month?",
    a: "There's no creative budget to run out of — your subscription covers unlimited requests (within concurrent limits). The only constraint is how many requests are active simultaneously.",
  },
  {
    q: "What's the minimum commitment?",
    a: "Month-to-month with no lock-in. You can pause your subscription between projects and pick back up whenever you're ready.",
  },
  {
    q: "How much does a typical project cost?",
    a: "That depends on how many requests it takes. A single-screen web redesign might be one request. A full brand identity system with guidelines, assets, and templates might span 8–12 requests over a month.",
  },
  {
    q: "Does the subscription include copywriting?",
    a: "Yes — brand voice copy, ad copy, headlines, website copy, and email sequences are all included. Long-form content (blogs, whitepapers) is scoped separately.",
  },
  {
    q: "How does AI fit into the work?",
    a: "We use AI to accelerate first drafts, ideation, and asset generation — but every deliverable is reviewed, refined, and approved by a senior creative before it reaches you. AI gives us speed; humans give you quality.",
  },
]

// ── FAQ item ──────────────────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="rounded-2xl overflow-hidden cursor-pointer"
      style={{ border: "1px solid #1A332A", backgroundColor: "#0F2B20" }}
      onClick={() => setOpen((o) => !o)}
    >
      <div className="flex items-center justify-between gap-4 px-6 py-5">
        <span style={{ color: "#E8F0EC", fontSize: 14, fontWeight: 600 }}>{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: BEZIER }}
          className="shrink-0"
        >
          <ChevronDown className="w-4 h-4" style={{ color: "#D6FF5C" }} />
        </motion.div>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: BEZIER }}
            className="overflow-hidden"
          >
            <p
              className="px-6 pb-5"
              style={{ color: "#8CA89A", fontSize: 13, lineHeight: 1.7 }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Main exported client ──────────────────────────────────────────────────────
export function PricingClient({ currency }: { currency: "ngn" | "usd" }) {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  return (
    <main className="font-sans overflow-x-hidden">
      <NavigationHeader />

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section
        style={{ backgroundColor: "#0B1F17" }}
        className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden"
      >
        {/* Left — copy */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:pl-20 lg:pr-10 py-28 lg:py-32 z-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              style={{ color: "#D6FF5C", fontSize: 11, letterSpacing: "0.15em" }}
              className="uppercase font-semibold mb-5 block"
            >
              Pricing model
            </span>
            <h1
              style={{ color: "#ffffff", fontWeight: 600, lineHeight: 1.05 }}
              className="text-[2.4rem] sm:text-[3rem] lg:text-[3.6rem] xl:text-[4rem] mb-6"
            >
              Take your brand from backlog
              <br />
              to built — <Em>3× faster.</Em>
            </h1>
            <p
              style={{ color: "#C9D6CE", fontSize: 17, lineHeight: 1.65, maxWidth: 500 }}
              className="mb-8"
            >
              One flat monthly rate. A full senior creative team on demand.
              No contracts, no overhead, no surprises.
            </p>
            <div className="flex flex-wrap gap-3 mb-12">
              <Link
                href="#pricing"
                style={{ backgroundColor: "#D6FF5C", color: "#16240A" }}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                See plans <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="https://wa.me/2347045985964"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#ffffff", border: "1px solid rgba(255,255,255,0.2)" }}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold hover:bg-white/5 transition-colors"
              >
                Talk to us
              </Link>
            </div>

            {/* 3 value props */}
            <div className="flex flex-col sm:flex-row gap-6">
              {[
                { icon: DollarSign, label: "Predictable monthly pricing" },
                { icon: Users,      label: "No agency overhead" },
                { icon: Zap,        label: "Scale output, not headcount" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "#D6FF5C" }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: "#16240A" }} />
                  </div>
                  <span style={{ color: "#C9D6CE", fontSize: 13, fontWeight: 500 }}>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right — hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative lg:w-[50%] h-[45vh] lg:h-auto shrink-0"
        >
          <Image
            src={HERO_IMG}
            alt="Creative team at work"
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width:1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#0B1F17] via-[#0B1F17]/20 to-transparent lg:block hidden" />
          <div className="absolute inset-0 bg-linear-to-t from-[#0B1F17]/60 to-transparent lg:hidden" />
        </motion.div>
      </section>

      {/* ── 2. TRUST BAR ────────────────────────────────────────────────────── */}
      <section
        style={{ backgroundColor: "#F4F1E8", borderTop: "1px solid #E4E0D4" }}
        className="py-10 overflow-hidden"
      >
        <p
          style={{ color: "#8C9A8C", fontSize: 12, letterSpacing: "0.08em" }}
          className="uppercase text-center mb-7 px-6"
        >
          Trusted by ambitious founders and growing brands
        </p>
        <div
          className="relative"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          }}
        >
          <div
            className="animate-marquee flex items-center gap-12"
            style={{ width: "max-content" }}
          >
            {[...clientLogos, ...clientLogos].map((src, i) => (
              <div key={i} className="relative h-8 w-28 shrink-0">
                <Image src={src} alt="" fill className="object-contain grayscale opacity-50" sizes="112px" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. PRICING TIER CARDS ───────────────────────────────────────────── */}
      <section
        id="pricing"
        style={{ backgroundColor: "#0B1F17", borderTop: "1px solid #1A332A" }}
        className="py-20 md:py-28 px-6 md:px-16 text-center"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerV}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.span
              variants={fadeUpV}
              style={{ color: "#D6FF5C", fontSize: 12, letterSpacing: "0.13em" }}
              className="uppercase font-semibold mb-4 block"
            >
              Simple, transparent pricing
            </motion.span>
            <motion.h2
              variants={fadeUpV}
              style={{ color: "#ffffff", fontWeight: 600, lineHeight: 1.1 }}
              className="text-[2rem] md:text-[2.6rem] mb-3"
            >
              Choose your plan. <Em>No surprises.</Em>
            </motion.h2>
            <motion.p
              variants={fadeUpV}
              style={{ color: "#C9D6CE", fontSize: 15 }}
              className="mb-0"
            >
              Unlimited design. One flat rate. Pause or cancel anytime.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
            {tiers.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: BEZIER }}
                className="relative rounded-2xl p-7 flex flex-col text-left"
                style={{
                  backgroundColor: "#142B22",
                  border: tier.popular ? "2px solid #D6FF5C" : "1px solid #1A332A",
                }}
              >
                {tier.popular && (
                  <span
                    className="absolute -top-3.5 left-5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                    style={{ backgroundColor: "#D6FF5C", color: "#16240A" }}
                  >
                    Most popular
                  </span>
                )}

                <p
                  style={{ color: "#5C7A6A", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em" }}
                  className="mb-2 mt-1"
                >
                  {tier.tier}
                </p>
                <h3 style={{ color: "#ffffff", fontSize: 20, fontWeight: 600 }} className="mb-2">
                  {tier.name}
                </h3>
                <p style={{ color: "#8CA89A", fontSize: 13, lineHeight: 1.65 }} className="mb-5">
                  {tier.desc}
                </p>

                {/* Price — resolved server-side, no client toggle */}
                <p style={{ color: "#ffffff", fontWeight: 700 }} className="text-4xl mb-0.5">
                  {currency === "ngn" ? tier.ngn : tier.usd}
                  <span style={{ fontSize: 14, color: "#5C7A6A", fontWeight: 400 }}>/mo</span>
                </p>

                <p style={{ color: "#D6FF5C", fontSize: 11, lineHeight: 1.5 }} className="mb-4">
                  {tier.badge}
                </p>
                <p style={{ color: "#C9D6CE", fontSize: 13 }} className="mb-6">
                  <strong style={{ color: "#ffffff" }}>{tier.requests}</strong> active requests
                  {" · "}
                  <strong style={{ color: "#ffffff" }}>{tier.revisions}</strong> revisions
                </p>

                <div
                  className="space-y-2.5 mb-8 flex-1"
                  style={{ borderTop: "1px solid #1A332A", paddingTop: "1.25rem" }}
                >
                  {tier.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <Check
                        style={{ color: "#D6FF5C", marginTop: 2 }}
                        className="w-3.5 h-3.5 shrink-0"
                      />
                      <span style={{ color: "#C9D6CE", fontSize: 13 }}>{f}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="https://wa.me/2347045985964"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
                  style={
                    tier.popular
                      ? { backgroundColor: "#D6FF5C", color: "#16240A" }
                      : { backgroundColor: "#244A38", color: "#ffffff" }
                  }
                >
                  Get started
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center gap-2">
            <p style={{ color: "#5C7A6A", fontSize: 13 }}>
              {currency === "ngn"
                ? "Billed monthly via Paystack or Flutterwave"
                : "Billed monthly via Stripe"}
            </p>
            <p style={{ color: "#3D5E4C", fontSize: 13 }}>
              Not sure which plan fits?{" "}
              <Link href="/contact" style={{ color: "#D6FF5C" }} className="underline underline-offset-4">
                Talk to us
              </Link>{" "}
              — we&apos;ll figure it out together.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. FEATURES-INCLUDED ────────────────────────────────────────────── */}
      <section
        style={{ backgroundColor: "#F4F1E8", borderTop: "1px solid #E4E0D4" }}
        className="py-20 md:py-28 px-6 md:px-16"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            {/* Left — service category pills */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: BEZIER }}
            >
              <span
                style={{ color: "#8C9A8C", fontSize: 11, letterSpacing: "0.13em" }}
                className="uppercase font-semibold mb-4 block"
              >
                One team, every discipline
              </span>
              <h2
                style={{ color: "#16241C", fontWeight: 600, lineHeight: 1.1 }}
                className="text-[1.9rem] md:text-[2.4rem] mb-8"
              >
                One strategic partner.{" "}
                <Em>Every department covered.</Em>
              </h2>
              <p
                style={{ color: "#5C6B62", fontSize: 16, lineHeight: 1.7, maxWidth: 480 }}
                className="mb-8"
              >
                From brand identity to AI-powered ad systems — everything your
                marketing and brand team needs, delivered on one subscription.
              </p>
              <div className="flex flex-wrap gap-2.5">
                {serviceCategories.map((svc, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-4 py-2 rounded-full text-[13px] font-medium"
                    style={
                      svc.lime
                        ? { backgroundColor: "#D6FF5C", color: "#16240A" }
                        : { backgroundColor: "#ffffff", color: "#16241C", border: "1px solid #E4E0D4" }
                    }
                  >
                    {svc.label}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right — included checklist */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: BEZIER, delay: 0.1 }}
              className="rounded-2xl p-8 lg:p-10"
              style={{ backgroundColor: "#0B1F17", border: "1px solid #1A332A" }}
            >
              <p
                style={{ color: "#D6FF5C", fontSize: 11, letterSpacing: "0.13em" }}
                className="uppercase font-semibold mb-5"
              >
                Included in all plans
              </p>
              <div className="space-y-4 mb-8">
                {included.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Check
                      style={{ color: "#D6FF5C", marginTop: 3 }}
                      className="w-3.5 h-3.5 shrink-0"
                    />
                    <span style={{ color: "#C9D6CE", fontSize: 14, lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: "1px solid #1A332A" }} className="pt-6">
                <Link
                  href="https://wa.me/2347045985964"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: "#D6FF5C", color: "#16240A" }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Start your subscription
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5. TESTIMONIAL CAROUSEL ─────────────────────────────────────────── */}
      <section
        style={{ backgroundColor: "#0B1F17", borderTop: "1px solid #1A332A" }}
        className="py-20 md:py-28 px-6 md:px-16"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span
              style={{ color: "#D6FF5C", fontSize: 11, letterSpacing: "0.13em" }}
              className="uppercase font-semibold mb-4 block"
            >
              Client results
            </span>
            <h2
              style={{ color: "#ffffff", fontWeight: 600, lineHeight: 1.1 }}
              className="text-[2rem] md:text-[2.6rem]"
            >
              Real brands. <Em>Real outcomes.</Em>
            </h2>
          </div>

          {/* Avatar tabs */}
          <div className="flex justify-center gap-4 mb-10">
            {testimonials.map((t, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className="relative w-14 h-14 rounded-full overflow-hidden transition-all duration-300"
                style={{
                  border: activeTestimonial === i ? "3px solid #D6FF5C" : "3px solid #1A332A",
                  opacity: activeTestimonial === i ? 1 : 0.5,
                }}
              >
                <Image src={t.workImg} alt={t.name} fill className="object-cover" sizes="56px" />
              </button>
            ))}
          </div>

          {/* Quote card */}
          <AnimatePresence mode="wait">
            {testimonials.map((t, i) =>
              i === activeTestimonial ? (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: BEZIER }}
                  className="rounded-2xl p-8 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
                  style={{ backgroundColor: "#142B22", border: "1px solid #1A332A" }}
                >
                  {/* Quote (span 2) */}
                  <div className="md:col-span-2">
                    <p
                      style={{ color: "#E8F0EC", fontSize: 19, lineHeight: 1.6, fontWeight: 400 }}
                      className="font-serif italic mb-6"
                    >
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <p style={{ color: "#ffffff", fontSize: 14, fontWeight: 600 }}>{t.name}</p>
                    <p style={{ color: "#5C7A6A", fontSize: 13 }}>{t.role}</p>
                  </div>

                  {/* Work thumbnail + stat */}
                  <div className="flex flex-col gap-4">
                    <div className="relative rounded-xl overflow-hidden" style={{ height: 160 }}>
                      <Image
                        src={t.workImg}
                        alt={t.name}
                        fill
                        className="object-cover"
                        sizes="300px"
                      />
                    </div>
                    <div
                      className="rounded-xl p-4"
                      style={{ backgroundColor: "#0B1F17", border: "1px solid #1A332A" }}
                    >
                      <p style={{ color: "#D6FF5C", fontSize: 18, fontWeight: 700 }} className="mb-0.5">
                        {t.stat.split(" ")[0]}
                      </p>
                      <p style={{ color: "#7C8C82", fontSize: 12 }}>{t.stat.split(" ").slice(1).join(" ")}</p>
                    </div>
                  </div>
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── 6. SPLIT — "Take your creative to new heights" ──────────────────── */}
      <section
        style={{ backgroundColor: "#F4F1E8", borderTop: "1px solid #E4E0D4" }}
        className="py-20 md:py-28 px-6 md:px-16"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: BEZIER }}
            className="relative rounded-[20px] overflow-hidden h-[320px] sm:h-[420px] lg:h-[540px]"
            style={{ border: "1px solid #E4E0D4" }}
          >
            <Image
              src={SPLIT_IMG_1}
              alt="Creative team collaboration"
              fill
              className="object-cover object-center"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </motion.div>

          {/* Text + 4 feature pairs */}
          <motion.div
            variants={containerV}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.span
              variants={fadeUpV}
              style={{ color: "#8C9A8C", fontSize: 11, letterSpacing: "0.13em" }}
              className="uppercase font-semibold mb-4 block"
            >
              Our work
            </motion.span>
            <motion.h2
              variants={fadeUpV}
              style={{ color: "#16241C", fontWeight: 600, lineHeight: 1.1 }}
              className="text-[2rem] md:text-[2.4rem] mb-4"
            >
              Take your creative to new heights.{" "}
              <Em>Keep overhead lower than ever.</Em>
            </motion.h2>
            <motion.p
              variants={fadeUpV}
              style={{ color: "#5C6B62", fontSize: 16, lineHeight: 1.7 }}
              className="mb-10"
            >
              Matrix HQ gives you the creative firepower of an entire agency
              for a fraction of the cost — and without the management overhead.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { icon: Users,     title: "Dedicated studio team",       desc: "Senior creatives assigned to your brand from day one." },
                { icon: RefreshCw, title: "Subscription flexibility",    desc: "Pause, scale, or cancel anytime. No red tape." },
                { icon: Zap,       title: "30-hour first drafts",        desc: "From brief to first creative concept within a single business day." },
                { icon: DollarSign, title: "Budget control",             desc: "Flat monthly rate. No surprise invoices or scope creep." },
              ].map(({ icon: Icon, title, desc }) => (
                <motion.div key={title} variants={fadeUpV} className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: "#0B1F17" }}
                  >
                    <Icon className="w-4 h-4" style={{ color: "#D6FF5C" }} />
                  </div>
                  <div>
                    <p style={{ color: "#16241C", fontSize: 14, fontWeight: 600 }} className="mb-0.5">{title}</p>
                    <p style={{ color: "#5C6B62", fontSize: 13, lineHeight: 1.6 }}>{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 7. SPLIT — "Creative experts or AI power? Both." ────────────────── */}
      <section
        style={{ backgroundColor: "#0B1F17", borderTop: "1px solid #1A332A" }}
        className="py-20 md:py-28 px-6 md:px-16"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <motion.div
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
              Flytext
            </motion.span>
            <motion.h2
              variants={fadeUpV}
              style={{ color: "#ffffff", fontWeight: 600, lineHeight: 1.1 }}
              className="text-[2rem] md:text-[2.4rem] mb-6"
            >
              Creative experts or AI power?{" "}
              <Em>Both.</Em>
            </motion.h2>
            <motion.p
              variants={fadeUpV}
              style={{ color: "#8CA89A", fontSize: 16, lineHeight: 1.7 }}
              className="mb-4"
            >
              Think faster starts, smarter outcomes, and more repeatable wins.
            </motion.p>
            <motion.p
              variants={fadeUpV}
              style={{ color: "#5C7A6A", fontSize: 14, lineHeight: 1.7 }}
              className="mb-8"
            >
              Matrix HQ pairs AI-accelerated workflows with senior creative judgment.
              Our team uses the latest generative tools to speed up ideation and
              first drafts — then human expertise to refine every deliverable to
              brand standard before it reaches you. Speed without sacrificing quality.
            </motion.p>
            <motion.div variants={fadeUpV}>
              <Link
                href="https://wa.me/2347045985964"
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: "#D6FF5C", color: "#16240A" }}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Book a call
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: BEZIER, delay: 0.1 }}
            className="relative rounded-[20px] overflow-hidden h-[320px] sm:h-[420px] lg:h-[480px]"
            style={{ border: "1px solid #1A332A" }}
          >
            <Image
              src={SPLIT_IMG_2}
              alt="AI-powered creative team"
              fill
              className="object-cover object-center"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#0B1F17]/40 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* ── 8. FAQ ──────────────────────────────────────────────────────────── */}
      <section
        style={{ backgroundColor: "#F4F1E8", borderTop: "1px solid #E4E0D4" }}
        className="py-20 md:py-28 px-6 md:px-16"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span
              style={{ color: "#8C9A8C", fontSize: 11, letterSpacing: "0.13em" }}
              className="uppercase font-semibold mb-4 block"
            >
              Got questions?
            </span>
            <h2
              style={{ color: "#16241C", fontWeight: 600, lineHeight: 1.1 }}
              className="text-[2rem] md:text-[2.6rem]"
            >
              Frequently asked <Em>questions</Em>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: (i % 2) * 0.07, ease: BEZIER }}
              >
                <FAQItem q={faq.q} a={faq.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: "50vh" }}>
        <Image
          src={HERO_IMG}
          alt="Start your creative subscription"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(11,31,23,0.82)" }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-28 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: BEZIER }}
          >
            <span
              style={{ color: "#D6FF5C", fontSize: 11, letterSpacing: "0.15em" }}
              className="uppercase font-semibold mb-5 block"
            >
              Your creative team&apos;s creative team™
            </span>
            <h2
              style={{ color: "#ffffff", fontWeight: 600, lineHeight: 1.05 }}
              className="text-[2.2rem] sm:text-[3rem] md:text-[3.6rem] mb-6 max-w-3xl mx-auto"
            >
              Ready to move <Em>at the speed</Em> of your ambition?
            </h2>
            <p
              style={{ color: "#C9D6CE", fontSize: 17, lineHeight: 1.6, maxWidth: 500 }}
              className="mx-auto mb-10"
            >
              One subscription. A full creative team. Start building something remarkable today.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="#pricing"
                style={{ backgroundColor: "#D6FF5C", color: "#16240A" }}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                See plans <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="https://wa.me/2347045985964"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#ffffff", border: "1px solid rgba(255,255,255,0.3)" }}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-white/5 transition-colors"
              >
                Book a call
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
