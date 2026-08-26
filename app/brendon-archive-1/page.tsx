"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Mail, Moon, Sun, ExternalLink, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

// Animated counter component
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { damping: 50, stiffness: 100 })
  const isInView = useInView(ref, { once: true })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [motionValue, isInView, value])

  useEffect(() => {
    springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest))
    })
  }, [springValue])

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  )
}

// Theme toggle component
function ThemeToggle({ isDark, setIsDark }: { isDark: boolean; setIsDark: (value: boolean) => void }) {
  return (
    <motion.button
      onClick={() => setIsDark(!isDark)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
        isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-black/5 text-black hover:bg-black/10"
      }`}
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </motion.button>
  )
}

// Skill bar with premium animation
function SkillBar({
  name,
  percentage,
  delay = 0,
  isDark,
}: { name: string; percentage: number; delay?: number; isDark: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.6, delay }}
      className="mb-8"
    >
      <div className="flex justify-between items-center mb-3">
        <span className={`text-lg font-medium ${isDark ? "text-white" : "text-black"}`}>{name}</span>
        <span className="text-brendon-accent font-bold text-lg">{percentage}%</span>
      </div>
      <div className={`h-2 rounded-full overflow-hidden ${isDark ? "bg-white/10" : "bg-black/5"}`}>
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={isInView ? { width: `${percentage}%`, opacity: 1 } : { width: 0, opacity: 0 }}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.65, 0, 0.35, 1] }}
          className="h-full bg-gradient-to-r from-brendon-accent to-brendon-accent-hover relative"
        >
          <motion.div
            animate={{ x: [-20, 100] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

const behanceProjects = [
  {
    title: "Sheikh Meow - Meme Token",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279126/kmyux5c6vnaf2hisotza.jpg",
    link: "https://www.behance.net/gallery/234060663/Luxury-Meme-Token-Branding-Social-Media-Identity",
    categories: ["Brand Identity", "Motion", "Web Design"],
  },
  {
    title: "LEDGA Finance",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279279/vvn9avecee8eaj9yptti.jpg",
    link: "https://www.behance.net/gallery/209969707/LEDGA-Full-Branding-and-Identity-Design",
    categories: ["Brand Identity", "Design System"],
  },
  {
    title: "Alavda Travel",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764278972/vdeiw8wlj7gdjgbsbw4s.jpg",
    link: "https://www.behance.net/gallery/222946803/Alavda-Travel-Brand-Identity-Design",
    categories: ["Brand Identity", "Design System"],
  },
  {
    title: "ARCLLY - Grocery Branding",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764280363/ifdv28cltsgypa7nhhuv.jpg",
    link: "https://www.behance.net/gallery/209998445/ARCLLY-Grocery-Branding",
    categories: ["Brand Identity", "Design System", "Motion"],
  },
  {
    title: "Stixs and Codes - Kids Tech Academy",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279109/ryrwpj24gnfju87pbkbs.jpg",
    link: "https://www.behance.net/gallery/225121059/Stix-Codes-Branding-for-a-Kids-Tech-Academy",
    categories: ["Brand Identity", "Design System", "Motion"],
  },
  {
    title: "Letspot Token - Crypto Jackpot",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279314/qttpvs3rqmdwba5hsojy.jpg",
    link: "https://www.behance.net/gallery/225118937/Crypto-Jackpot-The-Ultimate-Web3-Prize-Token",
    categories: ["Brand Identity"],
  },
  {
    title: "Wevolte Engineering",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279295/mziuakmaaf8bsmyieuyn.png",
    link: "https://www.behance.net/gallery/209972307/WEVOLTE-Engineering-Brand-Identity-Design",
    categories: ["Brand Identity", "Web Design"],
  },
  {
    title: "WMM Solutions - Brand Identity",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279573/jnhrw9xc6fgctlgs9mqd.jpg",
    link: "https://www.behance.net/gallery/209968573/WMM-SOLUTIONS-Branding-and-Visual-Identity-Design",
    categories: ["Brand Identity"],
  },
  {
    title: "WMM Solutions - Website Design",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279591/rmfuu4p1rygnmtt0wfdm.jpg",
    link: "https://www.behance.net/gallery/233993689/Modern-Website-Design-for-a-Finance-Company",
    categories: ["Web Design"],
  },
  {
    title: "Elysium Jetty",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279705/vt5iz1esenykqnsxz5sr.jpg",
    link: "https://www.behance.net/gallery/209971863/Elysium-Branding",
    categories: ["Brand Identity"],
  },
  {
    title: "Penumbra Interiors",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279438/gh07foriuqoz7rfkligd.png",
    link: "https://www.behance.net/gallery/209966253/Penumbra-Interiors-Brand-Identity-Design",
    categories: ["Brand Identity"],
  },
  {
    title: "Ogoori Design System",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1766400677/fmaifcbaq5mms26c5cpl.png",
    video: "https://res.cloudinary.com/dusynu0kv/video/upload/v1766398819/osyhzcm8adyinj0nlrmt.mp4",
    categories: ["Motion"],
  },
  {
    title: "Sprrrint Video Animation",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1766400678/s5v8ggsze9d4yzlywzr4.png",
    video: "https://res.cloudinary.com/dusynu0kv/video/upload/v1766399078/aslad9tkixaw5adyicte.mp4",
    categories: ["Motion"],
  },
  {
    title: "STARLIGHT",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1766400692/slf1afdldj1g2ncypfcf.png",
    video: "https://res.cloudinary.com/dusynu0kv/video/upload/v1766399139/ltqv45t0znmw6h8etxbe.mp4",
    categories: ["Motion"],
  },
  {
    title: "Rap Video",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1766400684/gi91ianii96z7f5xkil0.png",
    video: "https://res.cloudinary.com/dusynu0kv/video/upload/v1766399567/duujdpjpotiyejyqwbku.mp4",
    categories: ["Motion"],
  },
  {
    title: "Severence Animation",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1766400691/sexz3hs7efranmkvuo9y.png",
    video: "https://res.cloudinary.com/dusynu0kv/video/upload/v1766400321/zz0gvweruizfybnvklbj.mp4",
    categories: ["Motion"],
  },
]

const filterCategories = ["All Works", "Brand Identity", "Design System", "Motion", "Web Design"]

export default function BrendonPortfolioPage() {
  // CHANGED default theme to light mode (false) and added localStorage persistence
  const [isDark, setIsDark] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All Works")
  const [expandedJob, setExpandedJob] = useState<number | null>(null) // Added for job expansion
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  useEffect(() => {
    const savedTheme = localStorage.getItem("brendon-theme")
    if (savedTheme !== null) {
      setIsDark(savedTheme === "dark")
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("brendon-theme", isDark ? "dark" : "light")
  }, [isDark])

  return (
    <main
      className={`relative min-h-screen transition-colors duration-500 ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Fixed Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isDark ? "bg-black/80" : "bg-white/80"
        } backdrop-blur-md border-b ${isDark ? "border-white/10" : "border-black/10"}`}
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-24 h-20 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold relative group">
            <span className="relative z-10">BRENDON OLEGHE</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brendon-accent group-hover:w-full transition-all duration-300" />
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="#work"
                className={`text-sm transition-colors hover:text-brendon-accent ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Work
              </Link>
              <Link
                href="#about"
                className={`text-sm transition-colors hover:text-brendon-accent ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                About
              </Link>
              <Link
                href="#contact"
                className={`text-sm transition-colors hover:text-brendon-accent ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Contact
              </Link>
            </div>
            <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
          </div>
        </div>
      </nav>

      {/* Hero Section - Premium & Bold */}
      <motion.section
        ref={heroRef}
        style={{ scale: heroScale }}
        className="relative min-h-screen flex items-center pt-32 md:pt-20"
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left - Text (8 columns) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="lg:col-span-7 space-y-8 text-left"
            >
              {/* Experience badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex justify-start"
              >
                <div
                  className={`inline-flex items-center gap-3 px-5 py-2 rounded-full border ${
                    isDark ? "bg-white/5 border-white/20" : "bg-black/5 border-black/10"
                  }`}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brendon-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brendon-accent"></span>
                  </span>
                  <span className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    SENIOR EXPERIENCE DESIGNER ©
                  </span>
                </div>
              </motion.div>

              {/* Main headline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-left"
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.05] tracking-tight mb-6 text-left">
                  If It Must <br /> Stand Out,
                  <br />
                  <span className="relative inline-block">
                    <span className="relative z-5">It Must Be Designed by Me.</span>
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 1 }}
                      className="absolute bottom-2 left-0 h-3 bg-brendon-accent/30 -z-10"
                    />
                  </span>
                </h1>

                <p
                   className={`text-lg md:text-xl leading-relaxed max-w-2xl text-left ${
    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Hello, this is Brendon. I am a multidisciplinary designer with a strong focus on brand identity,
                  design system, motion, and websites.  
                  <br /> 
                  <br />
                  With close to a decade in experience, My work interweaves
                  conceptual and storytelling processes with functionality that drive real business impact.
                </p>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-wrap items-center gap-4 justify-start"
              >
                <Button
                  asChild
                  className="h-14 px-10 bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 rounded-full text-base font-medium shadow-lg hover:shadow-xl transition-all"
                >
                  <a href="mailto:maestrobrendon@gmail.com">
                    <Mail className="w-4 h-4 mr-3" />
                    Let's Work Together
                  </a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className={`h-14 px-8 rounded-full text-base font-medium ${
                    isDark ? "hover:bg-white/10" : "hover:bg-black/5"
                  }`}
                >
                  <a href="https://behance.net/maestrobrendon" target="_blank" rel="noopener noreferrer">
                    View Portfolio
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right - Image (5 columns) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="lg:col-span-5"
            >
              <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src="/images/design-mode/gxwd9lljshykpnk50mwq.jpg"
                    alt="Brendon Oleghe - Creative Director"
                    fill
                    className="object-cover"
                    priority
                    onContextMenu={(e) => e.preventDefault()}
                    draggable={false}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${
                      isDark ? "from-black/50 to-transparent" : "from-white/30 to-transparent"
                    }`}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className={`text-xs uppercase tracking-widest ${isDark ? "text-gray-500" : "text-gray-400"}`}>
              Scroll
            </span>
            <div
              className={`w-6 h-10 rounded-full border-2 flex items-start justify-center p-2 ${
                isDark ? "border-white/20" : "border-black/20"
              }`}
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="w-1 h-2 bg-brendon-accent rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Featured Work Section - Behance Projects */}
      <section id="work" className={`py-20 md:py-32 border-t ${isDark ? "border-white/10" : "border-black/10"}`}>
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12 md:mb-16"
          >
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8 mb-8">
              <div className="text-left">
                <span
                  className={`text-xs md:text-sm uppercase tracking-widest mb-3 md:mb-4 block ${
                    isDark ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  Selected Work
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  Featured <span className="text-brendon-accent">Projects</span>
                </h2>
              </div>
              <Button
                asChild
                variant="ghost"
                className={`self-start md:self-auto group text-sm md:text-base ${
                  isDark ? "hover:bg-white/10" : "hover:bg-black/5"
                }`}
              >
                <a href="https://behance.net/maestrobrendon" target="_blank" rel="noopener noreferrer">
                  View All on Behance
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 md:gap-3 mb-8">
              {filterCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                    activeFilter === category
                      ? isDark
                        ? "bg-white/20 text-white"
                        : "bg-black/10 text-black"
                      : isDark
                        ? "bg-transparent text-gray-400 hover:bg-white/10 hover:text-white"
                        : "bg-transparent text-gray-600 hover:bg-black/5 hover:text-black"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {behanceProjects
              .filter((project) => activeFilter === "All Works" || project.categories.includes(activeFilter))
              .map((project, index) =>
                project.video ? (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="group relative block cursor-pointer"
                    onClick={() => setSelectedVideo(project.video!)}
                  >
                    <div className="relative aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden mb-4 md:mb-6">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        onContextMenu={(e) => e.preventDefault()}
                        draggable={false}
                      />
                      <div
                        className={`absolute inset-0 transition-opacity duration-300 ${
                          isDark
                            ? "bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90"
                            : "bg-gradient-to-t from-white/80 via-white/20 to-transparent opacity-60 group-hover:opacity-90"
                        }`}
                      />

                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-8 h-8 md:w-10 md:h-10 text-black ml-1" fill="currentColor" />
                        </div>
                      </div>

                      <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6">
                        <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
                          {project.categories.slice(0, 3).map((category, i) => (
                            <span
                              key={i}
                              className={`text-[10px] md:text-xs px-2 md:px-3 py-1 rounded-full ${
                                isDark ? "bg-white/20 text-white" : "bg-black/20 text-black"
                              }`}
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 group-hover:text-brendon-accent transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                  </motion.div>
                ) : (
                  <motion.a
                    key={index}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="group relative block"
                  >
                    <div className="relative aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden mb-4 md:mb-6">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        onContextMenu={(e) => e.preventDefault()}
                        draggable={false}
                      />
                      <div
                        className={`absolute inset-0 transition-opacity duration-300 ${
                          isDark
                            ? "bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90"
                            : "bg-gradient-to-t from-white/80 via-white/20 to-transparent opacity-60 group-hover:opacity-90"
                        }`}
                      />

                      <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6">
                        <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
                          {project.categories.slice(0, 3).map((category, i) => (
                            <span
                              key={i}
                              className={`text-[10px] md:text-xs px-2 md:px-3 py-1 rounded-full ${
                                isDark ? "bg-white/20 text-white" : "bg-black/20 text-black"
                              }`}
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="absolute top-4 md:top-6 right-4 md:right-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-brendon-accent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      </div>
                    </div>

                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 group-hover:text-brendon-accent transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                  </motion.a>
                ),
              )}
          </div>
        </div>
      </section>

      {/* Skills & Expertise Section */}
      <section className={`py-20 md:py-32 border-t ${isDark ? "border-white/10" : "border-black/10"}`}>
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12 md:mb-20"
          >
            <span
              className={`text-xs md:text-sm uppercase tracking-widest mb-3 md:mb-4 block ${
                isDark ? "text-gray-500" : "text-gray-400"
              }`}
            >
              Core Competencies
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Skills & <span className="text-brendon-accent">Expertise</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <div>
              <SkillBar name="Brand Identity Design" percentage={95} delay={0} isDark={isDark} />
              <SkillBar name="UI/UX Design" percentage={90} delay={0.1} isDark={isDark} />
              <SkillBar name="Design Systems" percentage={88} delay={0.2} isDark={isDark} />
              <SkillBar name="Motion Graphics" percentage={85} delay={0.3} isDark={isDark} />
            </div>
            <div>
              <SkillBar name="Web Design" percentage={92} delay={0} isDark={isDark} />
              <SkillBar name="Prototyping" percentage={87} delay={0.1} isDark={isDark} />
              <SkillBar name="Art Direction" percentage={90} delay={0.2} isDark={isDark} />
              <SkillBar name="User Research" percentage={82} delay={0.3} isDark={isDark} />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-16 md:mt-20"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12">Tools & Technologies</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
              {[
                "Figma",
                "Photoshop",
                "Illustrator",
                "After Effects",
                "Premiere Pro",
                "Tailwind CSS",
                "Next.js / React",
                "InVision",
                "InDesign",
                "Framer",
                "Cursor",
                "Vercel",
              ].map((tool, index) => (
                <motion.div
                  key={tool}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -4, scale: 1.05 }}
                  className={`p-4 md:p-6 rounded-xl border text-center ${
                    isDark
                      ? "bg-white/5 border-white/10 hover:bg-white/10"
                      : "bg-black/5 border-black/10 hover:bg-black/10"
                  } transition-all duration-300`}
                >
                  <span className="text-sm md:text-base font-medium">{tool}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Timeline - With Toggleable Details */}
      <section className={`py-20 md:py-32 border-t ${isDark ? "border-white/10" : "border-black/10"}`}>
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12 md:mb-20"
          >
            <span
              className={`text-xs md:text-sm uppercase tracking-widest mb-3 md:mb-4 block ${
                isDark ? "text-gray-500" : "text-gray-400"
              }`}
            >
              Career Journey
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Experience & <span className="text-brendon-accent">Expertise</span>
            </h2>
          </motion.div>

          <div className="space-y-8 md:space-y-10">
            {[
              {
                company: "Quintes",
                role: "Senior Experience Designer",
                period: "Nov 2024 - Present",
                description:
                  "Leading the design strategy for a US-based tech startup, architecting scalable design systems and crafting intuitive user experiences across web and mobile platforms. Collaborating with cross-functional teams to translate complex requirements into elegant solutions.",
              },
              {
                company: "LEDGA (Contract)",
                role: "Brand & Product Designer",
                period: "May 2024 - August 2024",
                description:
                  "Led the complete brand identity redesign and product design for a fintech platform. Developed comprehensive brand guidelines, designed user flows, and created high-fidelity prototypes that improved user engagement by 40%.",
              },
              {
                company: "The Matrix HQ",
                role: "Creative Director & Founder",
                period: "Aug 2020 - Oct 2024",
                description:
                  "Founded and led a boutique design studio specializing in brand identity, web design, and motion graphics. Managed a team of designers and collaborated with international clients across tech, finance, and lifestyle sectors. Delivered 50+ successful projects with a 95% client retention rate.",
              },
              {
                company: "The Matrix House",
                role: "Junior Designer",
                period: "2019 - 2020",
                description:
                  "Contributed to various brand identity and digital design projects. Assisted in client presentations, created design mockups, and collaborated with senior designers on complex projects.",
              },
              {
                company: "Freelance",
                role: "Brand & Digital Designer",
                period: "2016 - 2019",
                description:
                  "Worked with diverse clients on brand identity, logo design, and web design projects. Built a strong portfolio and reputation in the design community through quality work and client satisfaction.",
              },
            ].map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group border-l-2 pl-6 md:pl-10 pb-8 md:pb-10 relative ${
                  isDark ? "border-white/20" : "border-black/20"
                }`}
              >
                <div
                  className={`absolute left-0 top-0 w-4 h-4 rounded-full border-4 -translate-x-[9px] transition-all duration-300 ${
                    isDark
                      ? "bg-black border-white/20 group-hover:border-brendon-accent group-hover:scale-125"
                      : "bg-white border-black/20 group-hover:border-brendon-accent group-hover:scale-125"
                  }`}
                />

                <button
                  onClick={() => setExpandedJob(expandedJob === index ? null : index)}
                  className="w-full text-left"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4 mb-3">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-1 group-hover:text-brendon-accent transition-colors">
                        {job.company}
                      </h3>
                      <p className={`text-base md:text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>{job.role}</p>
                    </div>
                    <span
                      className={`text-xs md:text-sm font-medium shrink-0 ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      {job.period}
                    </span>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedJob === index ? "auto" : 0,
                      opacity: expandedJob === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p
                      className={`text-sm md:text-base leading-relaxed pt-2 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {job.description}
                    </p>
                  </motion.div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-20 md:py-32 border-t ${isDark ? "border-white/10" : "border-black/10"}`}>
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: 8, suffix: "+", label: "Years Experience" },
              { value: 50, suffix: "+", label: "Projects Completed" },
              { value: 30, suffix: "+", label: "Happy Clients" },
              { value: 95, suffix: "%", label: "Client Satisfaction" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-brendon-accent mb-2 md:mb-3">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className={`text-sm md:text-base ${isDark ? "text-gray-400" : "text-gray-600"}`}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 md:py-32 border-t ${isDark ? "border-white/10" : "border-black/10"}`}>
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span
              className={`text-xs md:text-sm uppercase tracking-widest mb-3 md:mb-4 block ${
                isDark ? "text-gray-500" : "text-gray-400"
              }`}
            >
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 md:mb-8">
              Let&apos;s Create Something <span className="text-brendon-accent">Amazing Together </span>
            </h2>
            <p
              className={`text-lg md:text-xl leading-relaxed mb-8 md:mb-12 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your
              vision. Let&apos;s work together to bring your brand to life.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                className="w-full sm:w-auto h-14 px-10 bg-brendon-accent text-white hover:bg-brendon-accent-hover rounded-full text-base font-medium shadow-lg hover:shadow-xl transition-all"
              >
                <a href="mailto:maestrobrendon@gmail.com">
                  <Mail className="w-4 h-4 mr-3" />
                  Email Me
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className={`w-full sm:w-auto h-14 px-10 rounded-full text-base font-medium ${
                  isDark ? "border-white/20 hover:bg-white/10" : "border-black/20 hover:bg-black/5"
                }`}
              >
                <a href="/BRENDON-OLEGHE-RESUME.pdf" download>
                  Download Resume
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>

            <div className="mt-12 md:mt-16 flex items-center justify-center gap-6">
              <a
                href="https://behance.net/maestrobrendon"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm hover:text-brendon-accent transition-colors ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Behance
              </a>
              <span className={isDark ? "text-white/20" : "text-black/20"}>•</span>
              <a
                href="https://dribbble.com/maestrobrendon"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm hover:text-brendon-accent transition-colors ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Dribbble
              </a>
              <span className={isDark ? "text-white/20" : "text-black/20"}>•</span>
              <a
                href="https://linkedin.com/in/brendonoleghe"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm hover:text-brendon-accent transition-colors ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                LinkedIn
              </a>
              <span className={isDark ? "text-white/20" : "text-black/20"}>•</span>
              <a
                href="https://twitter.com/maestrobrendon"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm hover:text-brendon-accent transition-colors ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Twitter
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t ${isDark ? "border-white/10" : "border-black/10"} py-8 md:py-12`}>
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>
              © {new Date().getFullYear()} Brendon Oleghe. All rights reserved.
            </p>
            <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>Remote . Global </p>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 text-white hover:text-brendon-accent transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="w-full rounded-lg"
              controlsList="nodownload"
              onContextMenu={(e) => e.preventDefault()}
            />
          </motion.div>
        </motion.div>
      )}
    </main>
  )
}
