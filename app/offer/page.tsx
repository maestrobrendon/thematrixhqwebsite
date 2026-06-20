"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import {
  Frown,
  Clock,
  Wallet,
  HelpCircle,
  Smartphone,
  TrendingDown,
  Palette,
  MonitorSmartphone,
  Zap,
  Search,
  MessageCircle,
  Mail,
  HeadphonesIcon,
  Info,
  Check,
  X,
  Play,
  Plus,
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  Shield,
  Package,
  CreditCard,
  FileText,
  Calendar,
  Handshake,
} from "lucide-react"
import Link from "next/link"
import { ScrollReveal } from "@/components/scroll-reveal"

const clientLogos = [
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764746373/c8202s4rpfem0urjl92e.svg",
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764746276/vm4f1rkjmjlfnxsbogk1.png",
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764746222/jpgbzpxpejxa6zphnyak.png",
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764283670/k7rmtutzsl5rztjaysa8.png",
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764283292/yvupabaaiyggfrgdacbi.png",
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764283322/g56dpyob2t0p41stqxdl.png"
]

// Double the logos for infinite scroll effect
const doubledLogos = [...clientLogos, ...clientLogos]

// ============================================
// TYPES
// ============================================
interface CountdownProps {
  variant?: "hero" | "inline"
}

interface RevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

// ============================================
// COUNTDOWN TIMER
// ============================================
const CountdownTimer: React.FC<CountdownProps> = ({ variant = "hero" }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const targetDate = new Date("2025-12-08T23:59:59").getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  if (variant === "inline") {
    return (
      <div className="inline-flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 bg-zinc-800 rounded-full text-xs sm:text-sm font-mono">
        <span className="text-zinc-400 text-[10px] sm:text-xs mr-1 hidden sm:inline">Limited time offer ends in</span>
        <span className="text-white">{String(timeLeft.days).padStart(2, "0")}</span>
        <span className="text-zinc-500">:</span>
        <span className="text-white">{String(timeLeft.hours).padStart(2, "0")}</span>
        <span className="text-zinc-500">:</span>
        <span className="text-white">{String(timeLeft.minutes).padStart(2, "0")}</span>
        <span className="text-zinc-500">:</span>
        <span className="text-white">{String(timeLeft.seconds).padStart(2, "0")}</span>
      </div>
    )
  }

  return (
    <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-1 px-3 py-2 sm:px-4 sm:py-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-full">
      <span className="text-zinc-400 text-[10px] sm:text-xs uppercase tracking-wider sm:mr-2">Offer ends in</span>
      <div className="flex items-center gap-0.5 font-mono text-sm sm:text-lg font-semibold">
        <span className="bg-white/10 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-white text-xs sm:text-base">
          {String(timeLeft.days).padStart(2, "0")}
        </span>
        <span className="text-white/50 mx-0.5">:</span>
        <span className="bg-white/10 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-white text-xs sm:text-base">
          {String(timeLeft.hours).padStart(2, "0")}
        </span>
        <span className="text-white/50 mx-0.5">:</span>
        <span className="bg-white/10 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-white text-xs sm:text-base">
          {String(timeLeft.minutes).padStart(2, "0")}
        </span>
        <span className="text-white/50 mx-0.5">:</span>
        <span className="bg-white/10 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-white text-xs sm:text-base">
          {String(timeLeft.seconds).padStart(2, "0")}
        </span>
      </div>
    </div>
  )
}

// ============================================
// REVEAL ANIMATION
// ============================================
const Reveal: React.FC<RevealProps> = ({ children, delay = 0, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// RAINDROPS COMPONENT
// ============================================
const Raindrops = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[1px] bg-gradient-to-b from-white/20 to-transparent rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            height: `${Math.random() * 40 + 20}px`,
          }}
          initial={{ y: -50, opacity: 0 }}
          animate={{
            y: ["0vh", "100vh"],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

// ============================================
// FOOTER COMPONENT
// ============================================
const Footer = () => {
  const [currentTime, setCurrentTime] = useState({
    lagos: "",
    newYork: "",
    amsterdam: "",
  })

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date()
      setCurrentTime({
        lagos: now.toLocaleTimeString("en-US", {
          timeZone: "Africa/Lagos",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        newYork: now.toLocaleTimeString("en-US", {
          timeZone: "America/New_York",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        amsterdam: now.toLocaleTimeString("en-US", {
          timeZone: "Europe/Amsterdam",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      })
    }

    updateTimes()
    const interval = setInterval(updateTimes, 1000)
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  }

  return (
    <footer className="relative bg-[#0a0a0a] border-t border-zinc-800">
      {/* Marquee Banner */}
      <div className="relative overflow-hidden bg-matrix-blue py-4 sm:py-6 md:py-8">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center mx-4 sm:mx-8 md:mx-12">
              <span className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white">
                Building Better Brands
              </span>
              <ArrowRight
                className="w-5 h-5 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 mx-4 sm:mx-8 md:mx-12 text-white"
                strokeWidth={2}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 sm:gap-12 md:gap-8"
        >
          {/* Get in touch */}
          <motion.div variants={itemVariants} className="sm:col-span-2 md:col-span-5">
            <h3 className="text-matrix-blue text-xs sm:text-sm font-medium mb-4 sm:mb-6 uppercase tracking-wider">
              Get in touch
            </h3>
            <div className="space-y-4 sm:space-y-6">
              <a
                href="mailto:hello@thematrixhq.com"
                className="block text-lg sm:text-2xl md:text-3xl lg:text-4xl font-medium text-white hover:text-matrix-blue transition-colors underline decoration-1 underline-offset-4 sm:underline-offset-8 break-all sm:break-normal"
              >
                hello@thematrixhq.com
              </a>

              <div className="space-y-1 sm:space-y-2 text-zinc-400">
                <p className="text-xs sm:text-sm uppercase tracking-wider font-medium text-matrix-blue">Location</p>
                <p className="text-sm sm:text-base text-zinc-300">Lagos, Nigeria</p>
                <p className="text-xs sm:text-sm text-zinc-500">(6.5244° N, 3.3792° E)</p>
              </div>

              <div className="space-y-2 sm:space-y-3 pt-2 sm:pt-4">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-matrix-blue" />
                  <p className="text-xs sm:text-sm uppercase tracking-wider font-medium text-matrix-blue">Local Time</p>
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  {[
                    { label: "Nigeria", time: currentTime.lagos },
                    { label: "New York", time: currentTime.newYork },
                    { label: "Amsterdam", time: currentTime.amsterdam },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex justify-between items-center text-xs sm:text-sm pb-1.5 sm:pb-2 border-b border-zinc-800"
                    >
                      <span className="text-zinc-500">{item.label}</span>
                      <span className="text-white font-mono">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={itemVariants} className="md:col-span-3">
            <h3 className="text-matrix-blue text-xs sm:text-sm font-medium mb-4 sm:mb-6 uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "/about" },
                { name: "Projects", href: "/work" },
                { name: "Services", href: "/#services" },
                { name: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-zinc-300 hover:text-matrix-blue transition-colors text-sm sm:text-lg group inline-flex items-center gap-2"
                  >
                    {item.name}
                    <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="md:col-span-4">
            <h3 className="text-matrix-blue text-xs sm:text-sm font-medium mb-4 sm:mb-6 uppercase tracking-wider">
              Connect
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { name: "Instagram", url: "https://www.instagram.com/thematrixhq/" },
                { name: "LinkedIn", url: "https://www.linkedin.com/company/thematrixhq" },
                { name: "Facebook", url: "https://web.facebook.com/thematrixxhouse" },
                { name: "Behance", url: "https://www.behance.net/maestrobrendon" },
                { name: "WhatsApp", url: "https://wa.me/2347045985964" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-300 hover:text-matrix-blue transition-colors text-sm sm:text-lg group inline-flex items-center gap-2"
                  >
                    {item.name}
                    <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 sm:mt-16 md:mt-24 pt-6 sm:pt-8 border-t border-zinc-800"
        >
          <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:justify-between md:items-center">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="relative w-24 h-8 sm:w-32 sm:h-10 md:w-40 md:h-12">
                <img
                  src="https://res.cloudinary.com/dusynu0kv/image/upload/v1764702838/zwrwxssoa618vin12l8m.avif"
                  alt="The Matrix HQ"
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="space-y-0.5 sm:space-y-1 text-zinc-500 text-xs sm:text-sm">
                <p>© {new Date().getFullYear()} The Matrix HQ</p>
                <p className="text-[10px] sm:text-xs">All rights reserved</p>
              </div>
            </div>

            <div className="text-zinc-600 text-xs sm:text-sm md:text-base italic order-last md:order-none">
              &quot;No trends. Just timeless.&quot;
            </div>

            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-matrix-blue hover:bg-matrix-blue-light flex items-center justify-center transition-colors group self-end md:self-auto"
              aria-label="Scroll to top"
            >
              <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform" />
            </motion.button>
          </div>

          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-zinc-800 flex flex-wrap gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-zinc-600">
            <Link href="/privacy" className="hover:text-matrix-blue transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-matrix-blue transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/cookies" className="hover:text-matrix-blue transition-colors">
              Cookie Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function MatrixHQOffer() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const whatsappLink =
    "https://wa.me/2347045985964?text=Hi%20Brendon!%20I'm%20interested%20in%20the%20free%20website%20offer."

  const painPoints = [
    { icon: Frown, text: "You're losing customers because they can't find you online." },
    { icon: Clock, text: "You've been 'meaning to get a website' for months (or years)." },
    { icon: Wallet, text: "Agencies quoted you ridiculous prices and timelines." },
    { icon: HelpCircle, text: "DIY website builders look cheap and unprofessional." },
    { icon: Smartphone, text: "You're sending customers to Instagram instead of a real website." },
    { icon: TrendingDown, text: "Your competitors have websites and you're falling behind." },
  ]

  const features = [
    {
      icon: Palette,
      label: "CUSTOM DESIGN",
      title: "Multi Page Website",
      desc: "Tailored to your brand. No templates. Designed from scratch.",
    },
    {
      icon: MonitorSmartphone,
      label: "MOBILE FIRST",
      title: "Fully Responsive",
      desc: "Looks perfect on phones, tablets, and desktops.",
    },
    {
      icon: Zap,
      label: "FAST DELIVERY",
      title: "10-Day Turnaround",
      desc: "From kickoff to launch in less than two weeks. No endless delays.",
    },
  ]

  const includedItems = [
    { icon: Search, label: "Analytics Setup" },
    { icon: MessageCircle, label: "WhatsApp Integration" },
    { icon: Mail, label: "Contact Form" },
    { icon: HeadphonesIcon, label: "30-Day Support" },
  ]

  const stats = [
    { value: "90+", label: "Projects Delivered", desc: "Websites built for businesses across Nigeria and beyond." },
    { value: "10", label: "Days to Launch", desc: "Our refined process delivers results fast." },
    { value: "7+", label: "Years Experience", desc: "Building premium designs since 2019." },
    { value: "100%", label: "Satisfaction", desc: "Every client leaves happy with their website." },
  ]

  const portfolio = [
    {
      title: "Inaara Woman",
      scope: "Fashion e-commerce Website",
      image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764281205/yruv2nywtqxicdja6kxe.jpg",
      link: "https://www.inaarawoman.com",
    },
    {
      title: "Moods and Motion",
      scope: "Studio Rental Website",
      image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764281736/kpccrqsvrrqz8ew5htbt.jpg",
      link: "https://www.moodsandmotion.vercel.app",
    },
    {
      title: "Assura Cash",
      scope: "Fintech Website",
      image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764281754/mnv7i1uyrl4pgfowyjrk.jpg",
      link: "https://www.assuracash.com",
    },
  ]

  const forYou = [
    "You have an existing business (6+ months)",
    "You have logo and brand assets ready",
    "You can provide content within 48 hours",
    "You're willing to give a testimonial",
    "You respond quickly during the build",
  ]

  const notForYou = [
    "You're just starting and have no branding yet",
    "You can't provide content within 48 hours",
    "You're not comfortable with testimonials",
    "You want a custom app or complex solution",
    "You expect unlimited revisions (we offer limited rounds)",
    "You need beyond 5+ pages built"
  ]

  const qualifications = [
    "Existing business (operating 6+ months)",
    "Have logo and brand materials ready",
    "Can provide content within 48 hours",
    "Willing to provide video testimonial",
    "Allow us to use as case study",
  ]

  const whatYouGet = [
    "Custom website design (Worth over ₦1M)",
    "10-day delivery",
    "Mobile responsive build",
    "Analytics setup",
    "30-day support",
  ]

  const whatYouCover = [
    { item: "Domain name", cost: "$10-30/year", note: "(e.g., yourbusiness.com)" },
    { item: "Hosting & deployment", cost: "$20 one-time", note: "" },
  ]

  const whatYouNeed = [
    "Logo files (PNG/SVG)",
    "Brand colors",
    "10-15 images (products/services)",
    "Website text (we'll provide that for you)",
  ]

  const timeline = [
    { days: "Day 1-2", task: "Share assets, purchase domain, kickoff call" },
    { days: "Day 3-5", task: "Design & feedback" },
    { days: "Day 6-10", task: "Final build & launch" },
  ]

  const agreement = [
    "A video testimonial (60 seconds)",
    "Permission to showcase in our portfolio",
    "Quick responses during the 10-day build",
    "You cover domain + hosting costs directly",
  ]

  const faqs = [
    {
      q: "What exactly do I get for free?",
      a: "A complete custom-designed website worth over ₦1M0. This includes multi pages, mobile responsive design, contact form, WhatsApp integration, Analytics, and 30 days of post-launch support.",
    },
    {
      q: "Why are you offering this for free?",
      a: "We're building our 2025 portfolio with new improved services and showcasing our rapid 10-day delivery system. In exchange, we ask for a testimonial and permission to feature your site as a case study.",
    },
    {
      q: "What do I need to have ready?",
      a: "Your business logo (PNG/SVG), brand colors, 10-15 high-quality images, and website copy (We typically provide this for you). We'll guide you through everything.",
    },
    {
      q: "How long does it really take?",
      a: "Typically 10 business days from when you submit all materials. Day 1-2: Kickoff. Day 3-5: Design & development. Day 6-10: Revisions & launch, it could be more or less depending on the scope.",
    },
    {
      q: "What's the catch?",
      a: "None. You provide content and a testimonial, we build your website. You only pay for domain (~$10-30/year) and hosting setup (~$20 one-time).",
    },
    {
      q: "Why do I need to pay for domain and hosting?",
      a: "Every website needs these to exist online. A domain is your address (yourbusiness.com), and hosting is where your site lives. These are third-party costs we don't control or profit from.",
    },
    {
      q: "Can I use my existing domain?",
      a: "Yes! If you already own a domain, you only pay the $20 hosting setup.",
    },
    {
      q: "What if I don't want to pay anything?",
      a: "We understand, but every website needs hosting infrastructure. The $20 hosting gives you professional deployment, SSL security, and reliable uptime. Without it, your site can't go online.",
    },
    {
      q: "When do I pay for domain/hosting?",
      a: "Day 1-2, before we start building. We'll guide you through purchasing directly from the providers.",
    },
    {
      q: "Are there any other hidden costs?",
      a: "No. Domain + hosting is it. No monthly fees from us, no surprise charges.",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white antialiased font-sans">
      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-16 sm:pt-20 pb-12 sm:pb-16 bg-black overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f0f1a] to-[#0a0a0a]" />

          {/* Gradient mesh blobs - smaller on mobile */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full opacity-30"
            style={{
              background: "radial-gradient(circle, rgba(0, 0, 254, 0.4) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(64, 64, 255, 0.3) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
            animate={{
              x: [0, -40, 0],
              y: [0, -40, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] rounded-full opacity-10"
            style={{
              background: "radial-gradient(circle, rgba(0, 0, 254, 0.2) 0%, transparent 60%)",
              filter: "blur(100px)",
            }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Raindrops */}
          <Raindrops />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 sm:mb-10"
          >
            <CountdownTimer variant="hero" />
          </motion.div>

          {/* Headline - Smaller text on mobile */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-4 sm:mb-6"
          >
            <span data-v0-editable="true">Get a </span>
            <span className="text-matrix-blue" data-v0-editable="true">
              FREE
            </span>
            <span data-v0-editable="true"> Professional</span>
            <br />
            <span data-v0-editable="true">Website Before 2026.</span>
          </motion.h1>

          {/* Subheadline - Smaller text on mobile */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-6 sm:mb-8 px-2"
            data-v0-editable="true"
          >
            We&apos;re selecting <span className="text-white font-semibold">a few businesses</span> to receive a custom
            website this December completely free. T&C applies. 
          </motion.p>

          {/* Social proof + CTA - Stack vertically on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center gap-4 sm:gap-4 mb-6 sm:mb-8"
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-matrix-blue text-white font-semibold rounded-xl flex items-center justify-center gap-2 sm:gap-3 hover:bg-matrix-blue-light transition-all hover:scale-[1.02] text-sm sm:text-base">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span data-v0-editable="true">Let's Get Started</span>
              </button>
            </a>

            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"].map((color, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border-2 border-black flex items-center justify-center text-[10px] sm:text-xs font-medium"
                    style={{ backgroundColor: color }}
                  >
                    {["B", "T", "A", "S"][i]}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <p className="text-xs sm:text-sm text-zinc-400">
                  <span className="text-white font-semibold" data-v0-editable="true">
                    30+ businesses
                  </span>
                </p>
                <p className="text-[10px] sm:text-xs text-zinc-500" data-v0-editable="true">
                  trust our work
                </p>
              </div>
            </div>
          </motion.div>

          {/* Spots indicator - Smaller dots on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-flex items-center gap-2 sm:gap-3 mb-8 sm:mb-12"
          >
            <div className="flex gap-0.5 sm:gap-1">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${i < 8 ? "bg-matrix-blue" : "bg-zinc-700"}`}
                />
              ))}
            </div>
            <span className="text-zinc-400 text-xs sm:text-sm">
              <span className="text-white font-semibold" data-v0-editable="true">
                8
              </span>
              <span data-v0-editable="true"> of 10 spots left</span>
            </span>
          </motion.div>

          {/* Trusted By - Smaller on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="pt-6 sm:pt-8 border-t border-zinc-800"
          >
            <p className="text-zinc-500 text-[10px] sm:text-xs uppercase tracking-wider mb-4 sm:mb-6" data-v0-editable="true">
              Trusted by leading brands
            </p>
            <div className="relative overflow-hidden">
              <motion.div
                className="flex gap-6 sm:gap-12"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                {doubledLogos.map((logo, i) => (
                  <div key={i} className="flex-shrink-0">
                    <img
                      src={logo}
                      alt="Client logo"
                      className="h-6 sm:h-8 w-auto opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PAIN POINTS */}
      {/* ============================================ */}
      <section className="py-12 sm:py-20 md:py-28 px-4 sm:px-6 bg-[#f5f5f0] text-zinc-900">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-10 sm:mb-16">
            <p
              className="text-zinc-500 text-[10px] sm:text-sm uppercase tracking-wider mb-3 sm:mb-4"
              data-v0-editable="true"
            >
              Is this you?
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              <span data-v0-editable="true">Is Your Business </span>
              <span className="text-matrix-blue" data-v0-editable="true">
                Missing Out
              </span>
              <br />
              <span data-v0-editable="true">Without a Website?</span>
            </h2>
            <p className="text-zinc-500 mt-3 sm:mt-4 text-sm sm:text-lg italic" data-v0-editable="true">
              sounds familiar?
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-x-12 sm:gap-y-10">
            {painPoints.map((item, i) => {
              const IconComponent = item.icon
              return (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 bg-zinc-100 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-sm">
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-600" strokeWidth={1.5} />
                    </div>
                    <p
                      className="text-zinc-700 text-xs sm:text-sm md:text-base leading-relaxed"
                      data-v0-editable="true"
                    >
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* THE OFFER */}
      {/* ============================================ */}
      <section id="offer" className="py-12 sm:py-20 md:py-28 px-4 sm:px-6 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-10 sm:mb-16">
            <p
              className="text-matrix-blue text-[10px] sm:text-sm uppercase tracking-wider mb-3 sm:mb-4"
              data-v0-editable="true"
            >
              What's Included
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              <span data-v0-editable="true">Here's What You Get</span>
              <br />
              <span className="text-[#FFFFFF]" data-v0-editable="true">
                (Completely Free)
              </span>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-16">
            {features.map((item, i) => {
              const IconComponent = item.icon
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl sm:rounded-2xl p-5 sm:p-6 h-full hover:border-zinc-700 transition-colors">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 bg-matrix-blue/10 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-matrix-blue" strokeWidth={1.5} />
                    </div>
                    <span
                      className="text-matrix-blue text-[10px] sm:text-xs font-semibold uppercase tracking-wider"
                      data-v0-editable="true"
                    >
                      {item.label}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold mt-1.5 sm:mt-2 mb-1.5 sm:mb-2" data-v0-editable="true">
                      {item.title}
                    </h3>
                    <p className="text-zinc-400 text-xs sm:text-sm" data-v0-editable="true">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>

          <Reveal>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl sm:rounded-2xl p-5 sm:p-8">
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-center" data-v0-editable="true">
                Also Included:
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {includedItems.map((item, i) => {
                  const IconComponent = item.icon
                  return (
                    <div key={i} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-matrix-blue/10 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-matrix-blue" strokeWidth={1.5} />
                      </div>
                      <span className="text-zinc-300 text-[11px] sm:text-sm" data-v0-editable="true">
                        {item.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>


      {/* ============================================ */}
      {/* TERMS & CONDITIONS */}
      {/* ============================================ */}
      <section id="terms" className="py-12 sm:py-20 md:py-28 px-4 sm:px-6 bg-[#f5f5f0] text-zinc-900">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-10 sm:mb-16">
            <p
              className="text-zinc-500 text-[10px] sm:text-sm uppercase tracking-wider mb-3 sm:mb-4"
              data-v0-editable="true"
            >
              The Details
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              <span data-v0-editable="true">Terms & </span>
              <span className="text-[#000000]" data-v0-editable="true">
                Conditions
              </span>
            </h2>
            <p className="text-zinc-600 mt-3 sm:mt-4 max-w-2xl mx-auto text-xs sm:text-base" data-v0-editable="true">
              Everything you need to know about the free website offer. No surprises, no hidden fees.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* WHO QUALIFIES */}
            <Reveal>
              <div className="bg-white rounded-xl sm:rounded-2xl border border-zinc-200 overflow-hidden h-full">
                <div className="bg-matrix-blue py-2.5 sm:py-3 px-4 sm:px-6 flex items-center gap-2">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  <span
                    className="text-white text-[10px] sm:text-sm font-semibold uppercase tracking-wider"
                    data-v0-editable="true"
                  >
                    Who Qualifies
                  </span>
                </div>
                <div className="p-4 sm:p-6 space-y-2.5 sm:space-y-3">
                  {qualifications.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 sm:gap-3">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-matrix-blue flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-zinc-700 text-[11px] sm:text-sm" data-v0-editable="true">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* WHAT YOU GET FREE */}
            <Reveal delay={0.1}>
              <div className="bg-white rounded-xl sm:rounded-2xl border border-zinc-200 overflow-hidden h-full">
                <div className="bg-emerald-500 py-2.5 sm:py-3 px-4 sm:px-6 flex items-center gap-2">
                  <Package className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  <span
                    className="text-white text-[10px] sm:text-sm font-semibold uppercase tracking-wider"
                    data-v0-editable="true"
                  >
                    What You Get Free
                  </span>
                </div>
                <div className="p-4 sm:p-6 space-y-2.5 sm:space-y-3">
                  {whatYouGet.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 sm:gap-3">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-zinc-700 text-[11px] sm:text-sm" data-v0-editable="true">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* WHAT YOU COVER */}
            <Reveal delay={0.2}>
              <div className="bg-white rounded-xl sm:rounded-2xl border border-zinc-200 overflow-hidden h-full">
                <div className="bg-orange-500 py-2.5 sm:py-3 px-4 sm:px-6 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  <span
                    className="text-white text-[10px] sm:text-sm font-semibold uppercase tracking-wider"
                    data-v0-editable="true"
                  >
                    What You Cover
                  </span>
                </div>
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  {whatYouCover.map((item, i) => (
                    <div key={i} className="flex justify-between items-start">
                      <div>
                        <span className="text-zinc-700 text-[11px] sm:text-sm font-medium" data-v0-editable="true">
                          {item.item}
                        </span>
                        {item.note && (
                          <p className="text-zinc-500 text-[10px] sm:text-xs" data-v0-editable="true">
                            {item.note}
                          </p>
                        )}
                      </div>
                      <span className="text-orange-600 text-[11px] sm:text-sm font-semibold" data-v0-editable="true">
                        {item.cost}
                      </span>
                    </div>
                  ))}
                  <div className="pt-3 sm:pt-4 border-t border-zinc-200">
                    <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                      <span className="text-zinc-700 text-[11px] sm:text-sm font-medium" data-v0-editable="true">
                        Total
                      </span>
                      <span className="text-matrix-blue font-bold text-xs sm:text-base" data-v0-editable="true">
                        ~$30-50 (₦45k-75k)
                      </span>
                    </div>
                    <p className="text-zinc-500 text-[10px] sm:text-xs" data-v0-editable="true">
                      Paid directly to providers (Namecheap, Hostinger). We dont profit from these. These prices are just estimates and don't reflect the final.   
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* WHAT YOU NEED READY */}
            <Reveal delay={0.3}>
              <div className="bg-white rounded-xl sm:rounded-2xl border border-zinc-200 overflow-hidden h-full">
                <div className="bg-violet-500 py-2.5 sm:py-3 px-4 sm:px-6 flex items-center gap-2">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  <span
                    className="text-white text-[10px] sm:text-sm font-semibold uppercase tracking-wider"
                    data-v0-editable="true"
                  >
                    What You Need Ready
                  </span>
                </div>
                <div className="p-4 sm:p-6 space-y-2.5 sm:space-y-3">
                  {whatYouNeed.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 sm:gap-3">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-violet-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-zinc-700 text-[11px] sm:text-sm" data-v0-editable="true">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* TIMELINE */}
            <Reveal delay={0.4}>
              <div className="bg-white rounded-xl sm:rounded-2xl border border-zinc-200 overflow-hidden h-full">
                <div className="bg-cyan-500 py-2.5 sm:py-3 px-4 sm:px-6 flex items-center gap-2">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  <span
                    className="text-white text-[10px] sm:text-sm font-semibold uppercase tracking-wider"
                    data-v0-editable="true"
                  >
                    Timeline
                  </span>
                </div>
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  {timeline.map((item, i) => (
                    <div key={i} className="flex gap-3 sm:gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-cyan-500" />
                        {i < timeline.length - 1 && <div className="w-0.5 h-full bg-cyan-200 mt-1" />}
                      </div>
                      <div className="pb-3 sm:pb-4">
                        <span
                          className="text-cyan-600 text-[10px] sm:text-xs font-semibold uppercase"
                          data-v0-editable="true"
                        >
                          {item.days}
                        </span>
                        <p className="text-zinc-700 text-[11px] sm:text-sm" data-v0-editable="true">
                          {item.task}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* THE AGREEMENT */}
            <Reveal delay={0.5}>
              <div className="bg-zinc-900 rounded-xl sm:rounded-2xl overflow-hidden h-full">
                <div className="bg-zinc-800 py-2.5 sm:py-3 px-4 sm:px-6 flex items-center gap-2">
                  <Handshake className="w-4 h-4 sm:w-5 sm:h-5 text-matrix-blue" />
                  <span
                    className="text-white text-[10px] sm:text-sm font-semibold uppercase tracking-wider"
                    data-v0-editable="true"
                  >
                    The Agreement
                  </span>
                </div>
                <div className="p-4 sm:p-6">
                  <p className="text-zinc-400 text-[11px] sm:text-sm mb-3 sm:mb-4" data-v0-editable="true">
                    FREE website design & build in exchange for:
                  </p>
                  <div className="space-y-2.5 sm:space-y-3">
                    {agreement.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 sm:gap-3">
                        <span className="text-matrix-blue font-bold text-[11px] sm:text-sm">{i + 1}.</span>
                        <span className="text-zinc-300 text-[11px] sm:text-sm" data-v0-editable="true">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* STATS */}
      {/* ============================================ */}
      <section className="py-12 sm:py-20 md:py-28 px-4 sm:px-6 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-10 sm:mb-16">
            <p
              className="text-matrix-blue text-[10px] sm:text-sm uppercase tracking-wider mb-3 sm:mb-4"
              data-v0-editable="true"
            >
              Why choose us?
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              <span data-v0-editable="true">The </span>
              <span className="text-matrix-blue" data-v0-editable="true">
                Results
              </span>
              <span data-v0-editable="true"> Speak</span>
              <br />
              <span data-v0-editable="true">for Themselves</span>
            </h2>
            <p className="text-zinc-500 mt-3 sm:mt-4 italic text-sm" data-v0-editable="true">
              this can be you
            </p>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {stats.map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center hover:border-zinc-700 transition-colors">
                  <div className="text-2xl sm:text-4xl font-bold text-matrix-blue mb-1 sm:mb-2" data-v0-editable="true">
                    {stat.value}
                  </div>
                  <div className="font-semibold text-white mb-0.5 sm:mb-1 text-xs sm:text-base" data-v0-editable="true">
                    {stat.label}
                  </div>
                  <p className="text-zinc-500 text-[10px] sm:text-sm" data-v0-editable="true">
                    {stat.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PORTFOLIO */}
      {/* ============================================ */}
      <section id="portfolio" className="py-12 sm:py-20 md:py-28 px-4 sm:px-6 bg-[#f5f5f0] text-zinc-900">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-10 sm:mb-16">
            <p
              className="text-zinc-500 text-[10px] sm:text-sm uppercase tracking-wider mb-3 sm:mb-4"
              data-v0-editable="true"
            >
              Our Work
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              <span data-v0-editable="true">Our Clients Don&apos;t Just Get Websites,</span>
              <br />
              <span className="text-[#000000]" data-v0-editable="true">
                They Get Results.
              </span>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {portfolio.map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="group block">
                  <div className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-200 mb-3 sm:mb-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                      <span
                        className="text-matrix-blue text-[10px] sm:text-xs uppercase tracking-wider"
                        data-v0-editable="true"
                      >
                        {item.scope}
                      </span>
                      <h3 className="text-white text-sm sm:text-lg font-semibold" data-v0-editable="true">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-8 sm:mt-10">
            <a
              href="https://www.behance.net/thematrixhq"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-zinc-500 hover:text-matrix-blue transition-colors text-xs sm:text-sm"
            >
              <span data-v0-editable="true">View full portfolio on Behance</span>
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ============================================ */}
      {/* THIS IS FOR YOU */}
      {/* ============================================ */}
      <section className="py-12 sm:py-20 md:py-28 px-4 sm:px-6 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-10 sm:mb-16">
            <p
              className="text-matrix-blue text-[10px] sm:text-sm uppercase tracking-wider mb-3 sm:mb-4"
              data-v0-editable="true"
            >
              Is this for you?
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              <span data-v0-editable="true">This Offer Is a </span>
              <span className="text-[#FFFFFF]" data-v0-editable="true">
                Perfect
              </span>
              <br />
              <span data-v0-editable="true">Fit If You&apos;re Ready to...</span>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <Reveal>
              <div className="bg-zinc-900 rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-800">
                <div className="bg-matrix-blue py-2.5 sm:py-3 px-4 sm:px-6">
                  <span
                    className="text-white text-[10px] sm:text-sm font-semibold uppercase tracking-wider"
                    data-v0-editable="true"
                  >
                    THIS IS FOR YOU IF:
                  </span>
                </div>
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  {forYou.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 sm:gap-3">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-matrix-blue flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-zinc-300 text-[11px] sm:text-sm" data-v0-editable="true">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="bg-zinc-950 rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-800">
                <div className="bg-zinc-800 py-2.5 sm:py-3 px-4 sm:px-6">
                  <span
                    className="text-zinc-400 text-[10px] sm:text-sm font-semibold uppercase tracking-wider"
                    data-v0-editable="true"
                  >
                    THIS IS NOT FOR YOU IF:
                  </span>
                </div>
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  {notForYou.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 sm:gap-3">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-600" strokeWidth={2} />
                      </div>
                      <span className="text-zinc-500 text-[11px] sm:text-sm" data-v0-editable="true">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* ABOUT / DESIGNER */}
      {/* ============================================ */}
      <section className="py-12 sm:py-20 md:py-28 px-4 sm:px-6 bg-[#f5f5f0] text-zinc-900">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-10 sm:mb-16">
            <p
              className="text-zinc-500 text-[10px] sm:text-sm uppercase tracking-wider mb-3 sm:mb-4"
              data-v0-editable="true"
            >
              Meet Your Designer
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              <span data-v0-editable="true">Your Guide to</span>
              <br />
              <span className="text-matrix-blue" data-v0-editable="true">
                Website Success
              </span>
            </h2>
          </Reveal>

          <Reveal>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-8 items-center">
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-zinc-200">
                <div className="aspect-video bg-zinc-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-matrix-blue rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-0.5 sm:ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-zinc-200">
                <span className="text-zinc-500 text-[10px] sm:text-xs uppercase tracking-wider" data-v0-editable="true">
                  BIO
                </span>
                <h3
                  className="text-lg sm:text-xl font-bold mt-1.5 sm:mt-2 mb-0.5 sm:mb-1 text-zinc-900"
                  data-v0-editable="true"
                >
                  Brendon
                </h3>
                <p className="text-matrix-blue text-xs sm:text-sm mb-3 sm:mb-4" data-v0-editable="true">
                  Creative Director, The Matrix HQ
                </p>
                <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed" data-v0-editable="true">
                  Nearly a decade in creative design, branding, and web development. I started The Matrix HQ in 2019 to
                  deliver premium design without the premium ego. We&apos;ve worked with 80+ businesses across Nigeria
                  and beyond. Now we&apos;re building our portfolio of rapid-delivery websites—and you could be part of
                  it.
                </p>
                <div className="flex items-center gap-3 sm:gap-4 mt-4 sm:mt-6">
                  <div className="flex gap-2 sm:gap-3">
                    {[
                      { label: "Be", url: "https://www.behance.net/maestrobrendon" },
                      { label: "X", url: "https://twitter.com/thematrixhq" },
                      { label: "IG", url: "https://instagram.com/thematrixhq" },
                    ].map((social, i) => (
                      <a
                        key={i}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 sm:w-8 sm:h-8 bg-zinc-100 rounded-lg flex items-center justify-center hover:bg-matrix-blue hover:text-white transition-colors"
                      >
                        <span className="text-[10px] sm:text-xs font-medium">{social.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================ */}
      {/* FAQ */}
      {/* ============================================ */}
      <section id="faq" className="py-12 sm:py-20 md:py-28 px-4 sm:px-6 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-10 sm:mb-16">
            <p
              className="text-matrix-blue text-[10px] sm:text-sm uppercase tracking-wider mb-3 sm:mb-4"
              data-v0-editable="true"
            >
              FAQ
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              <span data-v0-editable="true">Frequently Asked</span>
              <br />
              <span className="text-matrix-blue" data-v0-editable="true">
                Questions
              </span>
            </h2>
          </Reveal>

          <div className="space-y-2 sm:space-y-3">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 0.03}>
                <div className="bg-zinc-900 rounded-lg sm:rounded-xl border border-zinc-800 overflow-hidden">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between text-left"
                  >
                    <span className="font-medium pr-3 sm:pr-4 text-xs sm:text-base" data-v0-editable="true">
                      {faq.q}
                    </span>
                    <motion.div
                      animate={{ rotate: openFAQ === i ? 45 : 0 }}
                      className="w-5 h-5 sm:w-6 sm:h-6 bg-zinc-800 rounded-full flex items-center justify-center flex-shrink-0"
                    >
                      <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" strokeWidth={2} />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openFAQ === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p
                          className="px-4 sm:px-6 pb-3 sm:pb-4 text-zinc-400 text-xs sm:text-sm"
                          data-v0-editable="true"
                        >
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-8 sm:mt-10">
            <p className="text-zinc-500 text-xs sm:text-sm">
              <span data-v0-editable="true">Still got questions? </span>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-matrix-blue hover:underline"
              >
                <span data-v0-editable="true">Reach out, we&apos;re here to help</span>
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================ */}
      {/* FINAL CTA */}
      {/* ============================================ */}
      <section className="py-12 sm:py-20 md:py-28 px-4 sm:px-6 bg-[#f5f5f0] text-zinc-900">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-matrix-blue/10 rounded-full mb-4 sm:mb-6">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-matrix-blue rounded-full animate-pulse" />
              <span className="text-matrix-blue text-[10px] sm:text-sm font-semibold" data-v0-editable="true">
                Registrations Ongoing!
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="flex -space-x-2">
                {["#FF6B6B", "#4ECDC4", "#45B7D1"].map((color, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#f5f5f0]"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6" data-v0-editable="true">
              Ready to Get Your Free Website?
            </h2>
            <p className="text-zinc-600 mb-6 sm:mb-8 max-w-xl mx-auto text-sm sm:text-base" data-v0-editable="true">
              Stop waiting. Stop overthinking. Click below to grab the opportunity, if you qualify!.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-matrix-blue text-white font-semibold rounded-xl flex items-center justify-center gap-2 sm:gap-3 hover:bg-matrix-blue-light transition-all hover:scale-[1.02] text-sm sm:text-base">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span data-v0-editable="true">Let's Get Started</span>
                </button>
              </a>
              <a href="#faq" className="text-zinc-500 hover:text-matrix-blue transition-colors text-xs sm:text-sm">
                <span data-v0-editable="true">Have questions? Read FAQ</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <div className="flex gap-0.5 sm:gap-1">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${i < 8 ? "bg-matrix-blue" : "bg-zinc-300"}`}
                  />
                ))}
              </div>
              <span className="text-zinc-500 text-xs sm:text-sm">
                <span className="text-zinc-900 font-semibold" data-v0-editable="true">
                  8
                </span>
                <span data-v0-editable="true"> spots remaining</span>
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
