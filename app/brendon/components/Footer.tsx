"use client"

import { motion } from "framer-motion"
import { Mail, ArrowUpRight } from "lucide-react"

const socials = [
  { label: "Behance", href: "https://behance.net/maestrobrendon" },
  { label: "Dribbble", href: "https://dribbble.com/maestrobrendon" },
  { label: "LinkedIn", href: "https://linkedin.com/in/brendonoleghe" },
  { label: "Twitter", href: "https://twitter.com/maestrobrendon" },
]

export function Footer() {
  return (
    <footer id="contact" className="bg-[var(--brendon-ink)] text-white">
      <div className="max-w-3xl mx-auto px-6 py-24 md:py-32 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-hand text-xl text-white/60"
        >
          get in touch
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight mt-2 mb-6"
        >
          LET&apos;S CREATE SOMETHING{" "}
          <span style={{ color: "var(--brendon-cyan)" }}>AMAZING</span> TOGETHER
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/60 max-w-lg mx-auto mb-10"
        >
          I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your
          vision. Let&apos;s work together to bring your brand to life.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="mailto:maestrobrendon@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium text-white"
            style={{ backgroundColor: "var(--brendon-magenta)" }}
          >
            <Mail className="w-4 h-4" />
            Email Me
          </a>
          <a
            href="/BRENDON-OLEGHE-RESUME.pdf"
            download
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium border border-white/25 hover:bg-white/10 transition-colors"
          >
            Download Resume
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-white transition-colors">
              {s.label}
            </a>
          ))}
        </div>

        <p className="mt-16 text-xs text-white/30">© {new Date().getFullYear()} Brendon Oleghe. Remote · Global</p>
      </div>
    </footer>
  )
}
