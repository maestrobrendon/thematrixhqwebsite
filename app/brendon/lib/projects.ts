import { projectCovers } from "./assets"

// Full "All Work" archive — motion pieces carry a `video` and no `href` (they
// play inline instead of navigating out); everything else is a plain image
// card linking to its Behance case study or live site. Pulled from
// app/work/page.tsx's behanceProjects/websiteProjects list, the agency's own
// case study data — titles, images, links, and categories kept verbatim
// except where noted below.
export type ArchiveProject = {
  slug: string
  title: string
  image: string
  video?: string
  /** "cloudinary" (default) plays `video` in a native <video> tag; "youtube" embeds it in an iframe instead. */
  videoProvider?: "cloudinary" | "youtube"
  href?: string
  tags: string[]
  date: string
  format: "image" | "video"
}

export const archiveProjects: ArchiveProject[] = [
  {
    slug: "alavda-travel",
    title: "Alavda Travel",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764278972/vdeiw8wlj7gdjgbsbw4s.jpg",
    href: "https://www.behance.net/gallery/222946803/Alavda-Travel-Brand-Identity-Design",
    tags: ["Brand Identity", "Design System"],
    date: "2024",
    format: "image",
  },
  {
    slug: "arclly-grocery-branding",
    title: "ARCLLY - Grocery Branding",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764280363/ifdv28cltsgypa7nhhuv.jpg",
    href: "https://www.behance.net/gallery/209998445/ARCLLY-Grocery-Branding",
    tags: ["Brand Identity", "Design System"],
    date: "2024",
    format: "image",
  },
  {
    slug: "stixs-and-codes",
    title: "Stixs and Codes - Kids Tech Academy",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279109/ryrwpj24gnfju87pbkbs.jpg",
    href: "https://www.behance.net/gallery/225121059/Stix-Codes-Branding-for-a-Kids-Tech-Academy",
    tags: ["Brand Identity", "Design System"],
    date: "2024",
    format: "image",
  },
  {
    slug: "letspot-token",
    title: "Letspot Token - Crypto Jackpot",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279314/qttpvs3rqmdwba5hsojy.jpg",
    href: "https://www.behance.net/gallery/225118937/Crypto-Jackpot-The-Ultimate-Web3-Prize-Token",
    tags: ["Brand Identity"],
    date: "2024",
    format: "image",
  },
  {
    slug: "wevolte-engineering",
    title: "Wevolte Engineering",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279295/mziuakmaaf8bsmyieuyn.png",
    href: "https://www.behance.net/gallery/209972307/WEVOLTE-Engineering-Brand-Identity-Design",
    tags: ["Brand Identity", "Web Design"],
    date: "2024",
    format: "image",
  },
  {
    slug: "wmm-solutions-brand-identity",
    title: "WMM Solutions - Brand Identity",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279573/jnhrw9xc6fgctlgs9mqd.jpg",
    href: "https://www.behance.net/gallery/209968573/WMM-SOLUTIONS-Branding-and-Visual-Identity-Design",
    tags: ["Brand Identity"],
    date: "2024",
    format: "image",
  },
  {
    // Same Behance case study as "WMM Solutions - Website Design" in the old
    // archive — renamed to match the title used for this project everywhere
    // else in the agency's own data (app/work/page.tsx's behanceProjects),
    // rather than adding a second card for an identical link.
    slug: "modern-finance-website",
    title: "Modern Finance Website",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279591/rmfuu4p1rygnmtt0wfdm.jpg",
    href: "https://www.behance.net/gallery/233993689/Modern-Website-Design-for-a-Finance-Company",
    tags: ["Web Design"],
    date: "2024",
    format: "image",
  },
  {
    slug: "elysium-jetty",
    title: "Elysium Jetty",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279705/vt5iz1esenykqnsxz5sr.jpg",
    href: "https://www.behance.net/gallery/209971863/Elysium-Branding",
    tags: ["Brand Identity"],
    date: "2024",
    format: "image",
  },
  {
    slug: "penumbra-interiors",
    title: "Penumbra Interiors",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279438/gh07foriuqoz7rfkligd.png",
    href: "https://www.behance.net/gallery/209966253/Penumbra-Interiors-Brand-Identity-Design",
    tags: ["Brand Identity"],
    date: "2024",
    format: "image",
  },
  {
    slug: "assura-cash",
    title: "Assura Cash",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764281754/mnv7i1uyrl4pgfowyjrk.jpg",
    href: "https://assuracash.com",
    tags: ["Web Design"],
    date: "2025",
    format: "image",
  },
  {
    slug: "moods-and-motion",
    title: "Moods and Motion",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764281736/kpccrqsvrrqz8ew5htbt.jpg",
    href: "https://moodsandmotion.vercel.app",
    tags: ["Web Design"],
    date: "2024",
    format: "image",
  },
  {
    // Tagged E-commerce at the source (app/work/page.tsx); re-tagged Web
    // Design here per confirmation, since it's a real live build.
    slug: "inaara-woman",
    title: "Inaara Woman",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764281205/yruv2nywtqxicdja6kxe.jpg",
    href: "https://inaarawoman.com",
    tags: ["Web Design"],
    date: "2024",
    format: "image",
  },
  {
    slug: "ogoori-design-system",
    title: "Ogoori Design System",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1766400677/fmaifcbaq5mms26c5cpl.png",
    video: "https://res.cloudinary.com/dusynu0kv/video/upload/v1766398819/osyhzcm8adyinj0nlrmt.mp4",
    tags: ["Motion"],
    date: "2025",
    format: "video",
  },
  {
    slug: "sprrrint-video-animation",
    title: "Sprrrint Video Animation",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1766400678/s5v8ggsze9d4yzlywzr4.png",
    video: "https://res.cloudinary.com/dusynu0kv/video/upload/v1766399078/aslad9tkixaw5adyicte.mp4",
    tags: ["Motion"],
    date: "2025",
    format: "video",
  },
  {
    slug: "starlight",
    title: "STARLIGHT",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1766400692/slf1afdldj1g2ncypfcf.png",
    video: "https://res.cloudinary.com/dusynu0kv/video/upload/v1766399139/ltqv45t0znmw6h8etxbe.mp4",
    tags: ["Motion"],
    date: "2025",
    format: "video",
  },
  {
    slug: "rap-video",
    title: "Rap Video",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1766400684/gi91ianii96z7f5xkil0.png",
    video: "https://res.cloudinary.com/dusynu0kv/video/upload/v1766399567/duujdpjpotiyejyqwbku.mp4",
    tags: ["Motion"],
    date: "2025",
    format: "video",
  },
  {
    slug: "severence-animation",
    title: "Severence Animation",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1766400691/sexz3hs7efranmkvuo9y.png",
    video: "https://res.cloudinary.com/dusynu0kv/video/upload/v1766400321/zz0gvweruizfybnvklbj.mp4",
    tags: ["Motion"],
    date: "2025",
    format: "video",
  },
  // From Brendon's own YouTube channel (@BrendonOleghe) — embedded via
  // youtube-nocookie.com rather than played as a native <video>, since
  // there's no self-hosted file. rel=0 + modestbranding=1 keep YouTube's own
  // chrome as minimal as it can be; there's no download button on an
  // embedded YouTube player to begin with (that only ever appears on
  // youtube.com itself, for Premium accounts), so there's nothing further to
  // disable there.
  {
    slug: "billboard-2",
    title: "Billboard 2",
    image: "https://i.ytimg.com/vi/F4uGBYAA6bs/hqdefault.jpg",
    video: "https://www.youtube-nocookie.com/embed/F4uGBYAA6bs?rel=0&modestbranding=1",
    videoProvider: "youtube",
    tags: ["Motion"],
    date: "2025",
    format: "video",
  },
  {
    slug: "billboard",
    title: "Billboard",
    image: "https://i.ytimg.com/vi/PVMwUKB7nhM/hqdefault.jpg",
    video: "https://www.youtube-nocookie.com/embed/PVMwUKB7nhM?rel=0&modestbranding=1",
    videoProvider: "youtube",
    tags: ["Motion"],
    date: "2025",
    format: "video",
  },
  {
    slug: "lens-for-good-motion-system-1",
    title: "Lens for Good — Motion System 1",
    image: "https://i.ytimg.com/vi/UVm3Cw8OTNk/hqdefault.jpg",
    video: "https://www.youtube-nocookie.com/embed/UVm3Cw8OTNk?rel=0&modestbranding=1",
    videoProvider: "youtube",
    tags: ["Motion"],
    date: "2025",
    format: "video",
  },
  {
    slug: "lens-for-good-motion-system-2",
    title: "Lens for Good — Motion System 2",
    image: "https://i.ytimg.com/vi/L0BJpAxSSZU/hqdefault.jpg",
    video: "https://www.youtube-nocookie.com/embed/L0BJpAxSSZU?rel=0&modestbranding=1",
    videoProvider: "youtube",
    tags: ["Motion"],
    date: "2025",
    format: "video",
  },
  {
    slug: "mayorfit-brand-awareness",
    title: "Mayorfit Brand Awareness",
    image: "https://i.ytimg.com/vi/CL9GzsxqZNo/hqdefault.jpg",
    video: "https://www.youtube-nocookie.com/embed/CL9GzsxqZNo?rel=0&modestbranding=1",
    videoProvider: "youtube",
    tags: ["Motion"],
    date: "2025",
    format: "video",
  },
  {
    slug: "muvment-branding-motion-system",
    title: "Muvment Branding — Motion System",
    image: "https://i.ytimg.com/vi/7gO-a9G3PuU/hqdefault.jpg",
    video: "https://www.youtube-nocookie.com/embed/7gO-a9G3PuU?rel=0&modestbranding=1",
    videoProvider: "youtube",
    tags: ["Motion"],
    date: "2025",
    format: "video",
  },
  {
    slug: "ankor-landscape",
    title: "Ankor Landscape",
    image: "https://i.ytimg.com/vi/k5xYf2GT8jU/hqdefault.jpg",
    video: "https://www.youtube-nocookie.com/embed/k5xYf2GT8jU?rel=0&modestbranding=1",
    videoProvider: "youtube",
    tags: ["Motion"],
    date: "2025",
    format: "video",
  },
  {
    slug: "jakande-new-led",
    title: "Jakande New LED",
    image: "https://i.ytimg.com/vi/FHC7P4Z3EHo/hqdefault.jpg",
    video: "https://www.youtube-nocookie.com/embed/FHC7P4Z3EHo?rel=0&modestbranding=1",
    videoProvider: "youtube",
    tags: ["Motion"],
    date: "2025",
    format: "video",
  },
  {
    slug: "cr8torium-lens-for-good-motion",
    title: "Cr8torium × Lens for Good — Motion",
    image: "https://i.ytimg.com/vi/wTSvh2NRrV0/hqdefault.jpg",
    video: "https://www.youtube-nocookie.com/embed/wTSvh2NRrV0?rel=0&modestbranding=1",
    videoProvider: "youtube",
    tags: ["Motion"],
    date: "2025",
    format: "video",
  },
]

export type Project = {
  slug: string
  number: string
  date: string
  title: string
  description: string
  href: string
  image: string
  tags: string[]
  color: "cyan" | "black" | "gold" | "magenta"
}

// Real projects from Brendon's Behance, in the order they should appear.
// Add more entries here as they're finalized — the card component cycles
// through the 4-color palette automatically.
export const projects: Project[] = [
  {
    slug: "vaultra",
    number: "01",
    date: "Aug 2026",
    title: "Vaultra Finance",
    description: "A full brand identity system for a finance platform built to feel secure, modern, and trustworthy.",
    href: "https://www.behance.net/gallery/244030983/Vaultra-Finance-Brand-Identity",
    image: projectCovers.vaultra,
    tags: ["Brand Identity", "Finance"],
    color: "cyan",
  },
  {
    slug: "giftlyft",
    number: "02",
    date: "Aug 2026",
    title: "Giftlyft",
    description: "Brand identity and packaging design for a gifting platform designed to feel joyful and giftable.",
    href: "https://www.behance.net/gallery/244047577/Giftlyft-Brand-Identity-Packaging-Design",
    image: projectCovers.giftlyft,
    tags: ["Brand Identity", "Packaging"],
    color: "black",
  },
  {
    slug: "ledga",
    number: "03",
    date: "2025",
    title: "LEDGA Finance",
    description: "Full branding and identity design for a finance platform, built as a cohesive design system.",
    href: "https://www.behance.net/gallery/209969707/LEDGA-Full-Branding-and-Identity-Design",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279279/vvn9avecee8eaj9yptti.jpg",
    tags: ["Brand Identity", "Design System"],
    color: "gold",
  },
  {
    slug: "sheikh-meow",
    number: "04",
    date: "2025",
    title: "Sheikh Meow",
    description: "Luxury meme token branding and social media identity for a Web3 project.",
    href: "https://www.behance.net/gallery/234060663/Luxury-Meme-Token-Branding-Social-Media-Identity",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279126/kmyux5c6vnaf2hisotza.jpg",
    tags: ["Brand Identity", "Motion", "Web Design"],
    color: "magenta",
  },
]
