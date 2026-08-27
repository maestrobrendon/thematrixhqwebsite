"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play } from "lucide-react"

type Project = {
  title: string
  image: string
  link?: string
  video?: string
  categories: string[]
}

// Pulled verbatim from app/brendon-archive-1/page.tsx (behanceProjects) — same
// titles, images, links, and category assignments as the old site. Nothing
// invented: every non-Motion project has both an image and a Behance link;
// every Motion project has an image + video and intentionally has no link,
// since it plays inline instead of navigating out.
const projects: Project[] = [
  // Sheikh Meow and LEDGA Finance are intentionally omitted here — both already
  // appear in the Featured Works stack above, so they'd otherwise be duplicated.
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
    categories: ["Brand Identity", "Design System"],
  },
  {
    title: "Stixs and Codes - Kids Tech Academy",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279109/ryrwpj24gnfju87pbkbs.jpg",
    link: "https://www.behance.net/gallery/225121059/Stix-Codes-Branding-for-a-Kids-Tech-Academy",
    categories: ["Brand Identity", "Design System"],
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

const categories = [
  { key: "All Works", description: "A look across every discipline — brand, systems, motion, and web." },
  { key: "Brand Identity", description: "Visual identity systems built to make brands unmistakable." },
  { key: "Design System", description: "Scalable component and design systems for growing products." },
  { key: "Motion", description: "Motion and animation work, brought to life frame by frame." },
  { key: "Web Design", description: "Websites and digital experiences designed to convert." },
]

function ProjectCard({ project }: { project: Project }) {
  const [playing, setPlaying] = useState(false)

  if (project.video) {
    return (
      <div className="group relative h-64 w-72 shrink-0 overflow-hidden rounded-xl bg-black">
        {playing ? (
          <video src={project.video} controls autoPlay className="h-full w-full object-cover" />
        ) : (
          <button onClick={() => setPlaying(true)} className="block h-full w-full cursor-pointer" aria-label={`Play ${project.title}`}>
            <img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" draggable={false} />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90">
                <Play className="ml-0.5 h-5 w-5 text-black" fill="currentColor" />
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3 text-left">
              <p className="truncate text-sm font-medium text-white">{project.title}</p>
            </div>
          </button>
        )}
      </div>
    )
  }

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block h-64 w-72 shrink-0 overflow-hidden rounded-xl"
    >
      <img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" draggable={false} />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3">
        <p className="truncate text-sm font-medium text-white">{project.title}</p>
      </div>
    </a>
  )
}

export function AllWork() {
  const [active, setActive] = useState(categories[0].key)
  const activeCategory = categories.find((c) => c.key === active)!
  const filtered = projects.filter((p) => active === "All Works" || p.categories.includes(active))

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

        {/* Card row — scrolls sideways when it overflows */}
        <div className="-mx-6 mt-10 overflow-x-auto px-6 pb-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${active}-cards`}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
              className="flex w-max gap-4"
            >
              {filtered.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
