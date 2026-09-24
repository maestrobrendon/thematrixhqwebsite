"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { ArrowUpRight, Play } from "lucide-react"
import { archiveProjects, type ArchiveProject } from "../lib/projects"
import { gsap, useReveal } from "@/lib/gsap-utils"

const categories = ["All Works", "Brand Identity", "Design System", "Motion", "Web Design"]

type Row = { type: "a"; project: ArchiveProject } | { type: "b"; projects: ArchiveProject[] }

// Motion pieces always take the full-width "Row A" slot — the format needs
// the room and doesn't work squeezed to half-width. Everything else fills
// "Row B" pairs, two up, in the order it appears. Rows alternate A/B while
// both queues still have work; once one queue drains, the other keeps
// filling its own row type rather than leaving a gap.
function buildRows(items: ArchiveProject[]): Row[] {
  const videos = items.filter((p) => p.format === "video")
  const images = items.filter((p) => p.format === "image")
  const rows: Row[] = []
  let vi = 0
  let ii = 0
  while (vi < videos.length || ii < images.length) {
    if (vi < videos.length) {
      rows.push({ type: "a", project: videos[vi] })
      vi++
    }
    if (ii < images.length) {
      rows.push({ type: "b", projects: images.slice(ii, ii + 2) })
      ii += 2
    }
  }
  return rows
}

function RowATile({ project }: { project: ArchiveProject }) {
  const [playing, setPlaying] = useState(false)

  return (
    <div
      className="group relative w-full overflow-hidden rounded-lg bg-black md:rounded-xl"
      style={{ aspectRatio: "1200 / 687" }}
    >
      {playing && project.video ? (
        project.videoProvider === "youtube" ? (
          <iframe
            src={`${project.video}${project.video.includes("?") ? "&" : "?"}autoplay=1`}
            title={project.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full"
          />
        ) : (
          <video src={project.video} controls autoPlay className="h-full w-full object-cover" />
        )
      ) : (
        <button
          onClick={() => setPlaying(true)}
          className="block h-full w-full cursor-pointer"
          aria-label={`Play ${project.title}`}
        >
          <img
            src={project.image}
            alt={`${project.title} — ${project.tags.join(", ")} motion cover still`}
            draggable={false}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90">
              <Play className="ml-0.5 h-6 w-6 text-black" fill="currentColor" />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4 text-left sm:p-6">
            <p className="text-base font-medium text-white sm:text-lg">{project.title}</p>
          </div>
        </button>
      )}
    </div>
  )
}

function RowBCard({ project }: { project: ArchiveProject }) {
  const tagRef = useReveal<HTMLSpanElement>({ y: 10, duration: 0.5, start: "top 95%" })

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-lg bg-white md:rounded-xl"
      style={{ aspectRatio: "593 / 486" }}
    >
      <img
        src={project.image}
        alt={`${project.title} — ${project.tags.join(", ")} project cover`}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/10" />

      <span className="absolute left-4 top-4 text-sm font-medium text-white drop-shadow-sm sm:text-base">
        {project.title}
      </span>

      <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <ArrowUpRight className="h-4 w-4" />
      </span>

      <span ref={tagRef} className="absolute bottom-4 left-4 text-[11px] font-medium uppercase tracking-wide text-white/90">
        {project.tags.slice(0, 2).join(" / ")}
      </span>
    </a>
  )
}

export function AllWork() {
  const [active, setActive] = useState(categories[0])
  const rowsRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useReveal<HTMLParagraphElement>({ y: -8, duration: 0.5 })
  const headingRef = useReveal<HTMLHeadingElement>({ y: 16, duration: 0.7, delay: 0.1 })

  const filtered = useMemo(
    () => archiveProjects.filter((p) => active === "All Works" || p.tags.includes(active)),
    [active],
  )
  const rows = useMemo(() => buildRows(filtered), [filtered])

  // Crossfades the row grid in every time the category filter changes —
  // the GSAP counterpart to framer-motion's AnimatePresence key-swap.
  useEffect(() => {
    const el = rowsRef.current
    if (!el) return
    gsap.fromTo(el, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" })
  }, [active])

  return (
    <section id="all-work" className="relative border-t border-black/10 bg-white px-6 pt-14 pb-14 md:pt-16 md:pb-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p ref={eyebrowRef} className="font-hand text-xl text-black/70 -rotate-2">
            the full archive
          </p>
          <h2 ref={headingRef} className="font-display mt-2 text-4xl tracking-tight text-(--brendon-ink) sm:text-5xl md:text-6xl">
            ALL WORK
          </h2>
        </div>

        {/* Category tabs */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              aria-current={active === cat}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                active === cat ? "bg-black text-white" : "bg-black/5 text-black/60 hover:bg-black/10 hover:text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Row grid — full-width motion slots (Row A) alternating with
            half-width paired slots (Row B); see buildRows above. */}
        <div ref={rowsRef} className="mt-10 flex flex-col gap-3 md:gap-4">
          {rows.map((row, i) =>
            row.type === "a" ? (
              <RowATile key={row.project.slug} project={row.project} />
            ) : (
              <div
                key={row.projects.map((p) => p.slug).join("-") || i}
                className={`grid gap-3 md:gap-4 ${row.projects.length === 1 ? "grid-cols-1 sm:max-w-[calc(50%-0.5rem)]" : "grid-cols-2"}`}
              >
                {row.projects.map((project) => (
                  <RowBCard key={project.slug} project={project} />
                ))}
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
