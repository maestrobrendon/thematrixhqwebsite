"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Play } from "lucide-react"
import { archiveProjects, type ArchiveProject } from "../lib/projects"

const categories = [
  { key: "All Works", description: "A look across every discipline — brand, systems, motion, and web." },
  { key: "Brand Identity", description: "Visual identity systems built to make brands unmistakable." },
  { key: "Design System", description: "Scalable component and design systems for growing products." },
  { key: "Motion", description: "Motion and animation work, brought to life frame by frame." },
  { key: "Web Design", description: "Websites and digital experiences designed to convert." },
]

// Torn/wavy bottom edge, expressed entirely in percentage points so it
// rescales with the card at every width instead of relying on a fixed-px
// cut that would only look right at one screen size.
const TORN_EDGE_CLIP =
  "polygon(0% 0%, 100% 0%, 100% 93%, 92% 98%, 84% 92%, 76% 99%, 68% 93%, 60% 98%, 52% 92%, 44% 99%, 36% 93%, 28% 98%, 20% 92%, 12% 99%, 4% 93%, 0% 97%)"

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
        <video src={project.video} controls autoPlay className="h-full w-full object-cover" />
      ) : (
        <button
          onClick={() => setPlaying(true)}
          className="block h-full w-full cursor-pointer"
          aria-label={`Play ${project.title}`}
        >
          <img
            src={project.image}
            alt={project.title}
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
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-lg bg-white md:rounded-xl"
      style={{ aspectRatio: "593 / 486" }}
    >
      <div className="absolute inset-0" style={{ clipPath: TORN_EDGE_CLIP }}>
        <img
          src={project.image}
          alt={project.title}
          draggable={false}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/10" />
      </div>

      <span className="absolute left-4 top-4 text-sm font-medium text-white drop-shadow-sm sm:text-base">
        {project.title}
      </span>

      <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <ArrowUpRight className="h-4 w-4" />
      </span>

      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-[10%] left-4 text-[11px] font-medium uppercase tracking-wide text-white/90"
      >
        {project.tags.slice(0, 2).join(" / ")}
      </motion.span>
    </a>
  )
}

export function AllWork() {
  const [active, setActive] = useState(categories[0].key)
  const activeCategory = categories.find((c) => c.key === active)!

  const filtered = useMemo(
    () => archiveProjects.filter((p) => active === "All Works" || p.tags.includes(active)),
    [active],
  )
  const rows = useMemo(() => buildRows(filtered), [filtered])

  return (
    <section id="all-work" className="relative border-t border-black/10 bg-white px-6 pt-14 pb-14 md:pt-16 md:pb-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-hand text-xl text-black/70 -rotate-2"
          >
            the full archive
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display mt-2 text-4xl tracking-tight text-(--brendon-ink) sm:text-5xl md:text-6xl"
          >
            ALL WORK
          </motion.h2>
        </div>

        {/* Category tabs */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              aria-current={active === cat.key}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                active === cat.key ? "bg-black text-white" : "bg-black/5 text-black/60 hover:bg-black/10 hover:text-black"
              }`}
            >
              {cat.key}
            </button>
          ))}
        </div>

        {/* Category title + description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${active}-heading`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="text-center"
          >
            <h3 className="text-2xl font-medium text-(--brendon-ink) sm:text-3xl">{activeCategory.key}</h3>
            <p className="mt-2 text-(--brendon-muted)">{activeCategory.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* Row grid — full-width motion slots (Row A) alternating with
            half-width paired slots (Row B); see buildRows above. */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${active}-rows`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mt-10 flex flex-col gap-3 md:gap-4"
          >
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
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
