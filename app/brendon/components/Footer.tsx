"use client"

import Image from "next/image"
import { Mail, ArrowUpRight } from "lucide-react"
import { footerAssets } from "../lib/assets"
import { useReveal } from "@/lib/gsap-utils"

const socials = [
  { label: "Behance", href: "https://behance.net/maestrobrendon" },
  { label: "Dribbble", href: "https://dribbble.com/maestrobrendon" },
  { label: "LinkedIn", href: "https://linkedin.com/in/brendonoleghe" },
  { label: "Twitter", href: "https://twitter.com/maestrobrendon" },
]

export function Footer() {
  const eyebrowRef = useReveal<HTMLSpanElement>({ duration: 0.5 })
  const headingRef = useReveal<HTMLHeadingElement>({ y: 16, duration: 0.6, delay: 0.1 })
  const bodyRef = useReveal<HTMLParagraphElement>({ duration: 0.6, delay: 0.2 })
  const ctaRef = useReveal<HTMLDivElement>({ y: 10, duration: 0.6, delay: 0.3 })

  return (
    <footer id="contact" className="relative isolate text-white">
      {/* Full-bleed cover background behind the whole footer — sized to the
          footer's own (content-driven) height via absolute inset-0, not a
          fixed aspect-ratio box, so it always covers edge to edge with no
          gap or hard edge regardless of how tall the content stack gets. */}
      <div className="absolute inset-0 -z-10 bg-(--brendon-ink)">
        {/* Dimmed so the dark base behind it shows through everywhere, not
            just at the bottom — the gradient below still deepens toward the
            bottom for the CTAs/socials, but the top (where "get in touch"
            and the heading sit, over open sky) needed darkening too. */}
        <Image src={footerAssets.hillStool} alt="" fill className="object-cover opacity-60" sizes="100vw" />
        {/* Required for text legibility, not decorative — plain white text
            on the sky/grass reads poorly in several spots without this. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.8) 100%)" }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16 md:py-20 text-center">
        <span ref={eyebrowRef} className="font-hand text-xl text-white/60">
          get in touch
        </span>

        <h2 ref={headingRef} className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight mt-2 mb-6">
          LET&apos;S CREATE SOMETHING{" "}
          <span style={{ color: "var(--brendon-cyan)" }}>AMAZING</span> TOGETHER
        </h2>

        <p ref={bodyRef} className="text-white/60 max-w-lg mx-auto mb-10">
          I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your
          vision. Let&apos;s work together to bring your brand to life.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:brendon@maestrobrendon.com"
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
        </div>

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
