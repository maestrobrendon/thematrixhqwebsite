"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Footer() {
  const [currentTime, setCurrentTime] = useState({
    lagos: "",
    newYork: "",
    amsterdam: "",
  })

  // Update time zones every second
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
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  return (
    <footer className="relative bg-matrix-bg border-t border-matrix-border">
      {/* Marquee Banner */}
      <div className="relative overflow-hidden bg-matrix-blue py-6 md:py-8">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center mx-8 md:mx-12">
              <span className="text-3xl md:text-5xl lg:text-6xl font-bold text-white">Building Better Brands</span>
              <ArrowRight
                className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 mx-8 md:mx-12 text-white"
                strokeWidth={2}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16 md:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8"
        >
          {/* Get in touch - 5 columns */}
          <motion.div variants={itemVariants} className="md:col-span-5">
            <h3 className="text-matrix-blue text-sm font-medium mb-6 uppercase tracking-wider">Get in touch</h3>
            <div className="space-y-6">
              <a
                href="mailto:thematrixxhouse@gmail.com"
                className="block text-2xl md:text-3xl lg:text-4xl font-medium text-matrix-text hover:text-matrix-blue transition-colors underline decoration-1 underline-offset-8"
              >
                hello@thematrixhq.com
              </a>

              {/* Address */}
              <div className="space-y-2 text-matrix-text-muted">
                <p className="text-sm uppercase tracking-wider font-medium text-matrix-blue">Location</p>
                <p className="text-base">Lagos, Nigeria</p>
                <p className="text-sm text-matrix-text-dim">(6.5244° N, 3.3792° E)</p>
              </div>

              {/* Time Zones */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-matrix-blue" />
                  <p className="text-sm uppercase tracking-wider font-medium text-matrix-blue">Local Time</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm pb-2 border-b border-matrix-border">
                    <span className="text-matrix-text-muted">Nigeria</span>
                    <span className="text-matrix-text font-mono">{currentTime.lagos}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm pb-2 border-b border-matrix-border">
                    <span className="text-matrix-text-muted">New York</span>
                    <span className="text-matrix-text font-mono">{currentTime.newYork}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm pb-2 border-b border-matrix-border">
                    <span className="text-matrix-text-muted">Amsterdam</span>
                    <span className="text-matrix-text font-mono">{currentTime.amsterdam}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation - 3 columns */}
          <motion.div variants={itemVariants} className="md:col-span-3">
            <h3 className="text-matrix-blue text-sm font-medium mb-6 uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-matrix-text hover:text-matrix-blue transition-colors text-lg group inline-flex items-center gap-2"
                >
                  Home
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-matrix-text hover:text-matrix-blue transition-colors text-lg group inline-flex items-center gap-2"
                >
                  About
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/work"
                  className="text-matrix-text hover:text-matrix-blue transition-colors text-lg group inline-flex items-center gap-2"
                >
                  Projects
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-matrix-text hover:text-matrix-blue transition-colors text-lg group inline-flex items-center gap-2"
                >
                  Services
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-matrix-text hover:text-matrix-blue transition-colors text-lg group inline-flex items-center gap-2"
                >
                  Contact
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Social Links - 4 columns */}
          <motion.div variants={itemVariants} className="md:col-span-4">
            <h3 className="text-matrix-blue text-sm font-medium mb-6 uppercase tracking-wider">Connect</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.instagram.com/thematrixhq/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-matrix-text hover:text-matrix-blue transition-colors text-lg group inline-flex items-center gap-2"
                >
                  Instagram
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/thematrixhq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-matrix-text hover:text-matrix-blue transition-colors text-lg group inline-flex items-center gap-2"
                >
                  LinkedIn
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="https://web.facebook.com/thematrixxhouse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-matrix-text hover:text-matrix-blue transition-colors text-lg group inline-flex items-center gap-2"
                >
                  Facebook
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.behance.net/maestrobrendon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-matrix-text hover:text-matrix-blue transition-colors text-lg group inline-flex items-center gap-2"
                >
                  Behance
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/2347045985964"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-matrix-text hover:text-matrix-blue transition-colors text-lg group inline-flex items-center gap-2"
                >
                  WhatsApp
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 md:mt-24 pt-8 border-t border-matrix-border"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            {/* Left side - Logo and Company info */}
            <div className="flex items-center gap-6">
              <div className="relative w-32 h-10 md:w-40 md:h-12">
                <Image
                  src="/images/design-mode/sswh8theoz9tocz5g2tp.png"
                  alt="The Matrix HQ"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="space-y-1 text-matrix-text-muted text-sm">
                <p>© {new Date().getFullYear()} The Matrix HQ</p>
                <p className="text-xs">All rights reserved</p>
              </div>
            </div>

            {/* Center - Tagline */}
            <div className="text-matrix-text-dim text-sm md:text-base italic">"No trends. Just timeless."</div>

            {/* Right side - Scroll to top button */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-matrix-blue hover:bg-matrix-blue-light flex items-center justify-center transition-colors group"
              aria-label="Scroll to top"
            >
              <ArrowUpRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </motion.button>
          </div>

          {/* Legal Links */}
          <div className="mt-8 pt-6 border-t border-matrix-border flex flex-wrap gap-4 md:gap-6 text-sm text-matrix-text-dim">
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

      {/* CSS for marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 12s linear infinite;
        }
      `}</style>
    </footer>
  )
}
