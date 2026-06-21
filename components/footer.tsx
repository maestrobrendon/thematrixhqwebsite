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
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  }

  const colLabel = {
    color: "#D6FF5C",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.13em",
    textTransform: "uppercase" as const,
    marginBottom: "1.5rem",
    display: "block",
  }

  const navLink =
    "text-[#C9D6CE] hover:text-[#D6FF5C] transition-colors group inline-flex items-center gap-2"

  return (
    <footer style={{ backgroundColor: "#0B1F17", borderTop: "1px solid #1A332A" }}>

      {/* Marquee Banner — lime, NOT blue */}
      <div
        className="relative overflow-hidden py-6 md:py-8"
        style={{ backgroundColor: "#D6FF5C" }}
      >
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center mx-8 md:mx-12">
              <span
                className="text-3xl md:text-5xl lg:text-6xl font-bold"
                style={{ color: "#16240A" }}
              >
                Building Better Brands
              </span>
              <ArrowRight
                className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 mx-8 md:mx-12"
                strokeWidth={2}
                style={{ color: "#16240A" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-20 md:py-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-14 md:gap-20"
        >

          {/* Get in touch — 5 columns */}
          <motion.div variants={itemVariants} className="md:col-span-5">
            <span style={colLabel}>Get in touch</span>
            <div className="space-y-8">
              <a
                href="mailto:hello@thematrixhq.com"
                style={{ color: "#F0EDE6", fontSize: 28, fontWeight: 500, lineHeight: 1.2 }}
                className="block hover:text-[#D6FF5C] transition-colors underline decoration-1 underline-offset-8"
              >
                hello@thematrixhq.com
              </a>

              <div className="space-y-1.5">
                <p style={{ color: "#D6FF5C", fontSize: 11, fontWeight: 600, letterSpacing: "0.13em", textTransform: "uppercase" }}>
                  Location
                </p>
                <p style={{ color: "#C9D6CE", fontSize: 14 }}>Lagos, Nigeria</p>
                <p style={{ color: "#5C7A6A", fontSize: 13 }}>(6.5244° N, 3.3792° E)</p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-3.5 h-3.5" style={{ color: "#D6FF5C" }} />
                  <p style={{ color: "#D6FF5C", fontSize: 11, fontWeight: 600, letterSpacing: "0.13em", textTransform: "uppercase" }}>
                    Local Time
                  </p>
                </div>
                <div className="space-y-2.5">
                  {[
                    { label: "Nigeria", time: currentTime.lagos },
                    { label: "New York", time: currentTime.newYork },
                    { label: "Amsterdam", time: currentTime.amsterdam },
                  ].map(({ label, time }) => (
                    <div
                      key={label}
                      className="flex justify-between items-center pb-2.5"
                      style={{ borderBottom: "1px solid #1A332A" }}
                    >
                      <span style={{ color: "#7C8C82", fontSize: 13 }}>{label}</span>
                      <span style={{ color: "#C9D6CE", fontSize: 13, fontFamily: "monospace" }}>{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation — 3 columns */}
          <motion.div variants={itemVariants} className="md:col-span-3">
            <span style={colLabel}>Navigation</span>
            <ul className="space-y-4">
              {[
                { href: "/",           label: "Home" },
                { href: "/about",      label: "About" },
                { href: "/work",       label: "Projects" },
                { href: "/#services",  label: "Services" },
                { href: "/contact",    label: "Contact" },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className={navLink} style={{ fontSize: 14 }}>
                    {label}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect — 4 columns */}
          <motion.div variants={itemVariants} className="md:col-span-4">
            <span style={colLabel}>Connect</span>
            <ul className="space-y-4">
              {[
                { href: "https://www.instagram.com/thematrixhq/",           label: "Instagram" },
                { href: "https://www.linkedin.com/company/thematrixhq",     label: "LinkedIn" },
                { href: "https://web.facebook.com/thematrixxhouse",          label: "Facebook" },
                { href: "https://www.behance.net/maestrobrendon",            label: "Behance" },
                { href: "https://wa.me/2347045985964",                       label: "WhatsApp" },
              ].map(({ href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={navLink}
                    style={{ fontSize: 14 }}
                  >
                    {label}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 md:mt-24 pt-8"
          style={{ borderTop: "1px solid #1A332A" }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex items-center gap-6">
              <div className="relative w-32 h-10 md:w-40 md:h-12">
                <Image
                  src="/images/design-mode/sswh8theoz9tocz5g2tp.png"
                  alt="The Matrix HQ"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="space-y-1">
                <p style={{ color: "#7C8C82", fontSize: 13 }}>© {new Date().getFullYear()} The Matrix HQ</p>
                <p style={{ color: "#4A6B58", fontSize: 12 }}>All rights reserved</p>
              </div>
            </div>

            <div style={{ color: "#5C7A6A", fontSize: 14 }} className="italic">
              &ldquo;No trends. Just timeless.&rdquo;
            </div>

            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-colors"
              style={{ backgroundColor: "#D6FF5C" }}
              aria-label="Scroll to top"
            >
              <ArrowUpRight className="w-6 h-6" style={{ color: "#16240A" }} />
            </motion.button>
          </div>

          <div className="mt-8 pt-6 flex flex-wrap gap-5" style={{ borderTop: "1px solid #1A332A" }}>
            {[
              { href: "/privacy", label: "Privacy Policy" },
              { href: "/terms",   label: "Terms & Conditions" },
              { href: "/cookies", label: "Cookie Policy" },
            ].map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                style={{ color: "#4A6B58", fontSize: 13 }}
                className="hover:text-[#D6FF5C] transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 12s linear infinite;
        }
      `}</style>
    </footer>
  )
}
