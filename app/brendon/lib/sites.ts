// "Built and shipped" data (spec §7, §5.5). Ordered per Brendon: Talking
// Hands, Feedghana, Re-Build, Inaara Woman, Moods and Motion, Assura Cash,
// dottd — most senior/complete builds first.

export type LiveSite = {
  title: string
  url: string
  href: string
  description: string
  tags: string[]
  screenshot?: string
  video?: string
  verify?: boolean
}

export const sites: LiveSite[] = [
  {
    title: "Talking Hands",
    url: "thetalkinghands.com",
    href: "https://thetalkinghands.com",
    description: "Handmade crochet fashion label, worn loud. Designed, prototyped and built end to end.",
    tags: ["Design", "Build", "E-commerce"],
    screenshot: "https://res.cloudinary.com/du5nhfcgd/image/upload/f_auto,q_auto,w_1600/brendon/shots/thetalkinghands-com",
  },
  {
    title: "Feedghana",
    url: "feedghana.org",
    href: "https://feedghana.org",
    description: "Ghanaian nonprofit closing the learning, nutrition and skills gap. Designed, prototyped and built end to end.",
    tags: ["Design", "Build", "Nonprofit"],
    screenshot: "https://res.cloudinary.com/du5nhfcgd/image/upload/f_auto,q_auto,w_1600/brendon/shots/feedghana-org",
  },
  {
    title: "Re-Build",
    url: "re-build.now",
    href: "https://re-build.now",
    description: "African hardware studio that designs and prototypes physical products. I built and coded the site for a larger team's design.",
    tags: ["Build"],
    screenshot: "https://res.cloudinary.com/du5nhfcgd/image/upload/f_auto,q_auto,w_1600/brendon/shots/re-build-now",
  },
  {
    title: "Inaara Woman",
    url: "inaarawoman.com",
    href: "https://inaarawoman.com",
    description: "Storefront for a womenswear label.",
    tags: ["Design", "Build", "E-commerce"],
    screenshot: "https://res.cloudinary.com/du5nhfcgd/image/upload/f_auto,q_auto,w_1600/brendon/shots/inaarawoman-com",
    verify: true,
  },
  {
    title: "Moods and Motion",
    url: "moodsandmotion.vercel.app",
    href: "https://moodsandmotion.vercel.app",
    description: "An experimental piece on mood, type and movement.",
    tags: ["Design", "Build", "GSAP"],
    screenshot: "https://res.cloudinary.com/du5nhfcgd/image/upload/f_auto,q_auto,w_1600/brendon/shots/moodsandmotion-vercel-app",
    verify: true,
  },
  {
    title: "Assura Cash",
    url: "assuracash.com",
    href: "https://assuracash.com",
    description: "Lending platform. Designed and built end to end.",
    tags: ["Design", "Build", "Next.js"],
    // Full-page capture (spec §14.2), captured via scripts/capture-sites.mjs
    // and hosted on the du5nhfcgd Cloudinary account with the rest of this
    // rebuild's assets — tall enough for the hover-scroll travel effect.
    screenshot: "https://res.cloudinary.com/du5nhfcgd/image/upload/f_auto,q_auto,w_1600/brendon/shots/assuracash-com",
    verify: true,
  },
  {
    title: "dottd",
    url: "dottd.app",
    href: "https://dottd.app",
    description: "Calendar-sharing app for tracking birthdays and anniversaries. A personal project, built and developed.",
    tags: ["Build"],
    screenshot: "https://res.cloudinary.com/du5nhfcgd/image/upload/f_auto,q_auto,w_1600/brendon/shots/dottd-app",
  },
]
