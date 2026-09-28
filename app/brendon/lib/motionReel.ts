// Motion reel data (spec §7 `lib/motion.ts` — renamed to avoid a collision
// with ./motionTokens.ts, this file's other namesake in the spec).

export type MotionPiece = { slug: string; title: string; year: string; kind: "Loop" | "Film"; poster: string } & (
  | { provider: "cloudinary"; video: string }
  | { provider: "youtube"; youtubeId: string }
)

const cloudinaryPoster = (id: string) => `https://res.cloudinary.com/dusynu0kv/image/upload/${id}.png`
const youtubePoster = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`

export const motionPieces: MotionPiece[] = [
  {
    slug: "ogoori-design-system",
    title: "Ogoori Design System",
    year: "2025",
    kind: "Loop",
    provider: "cloudinary",
    poster: cloudinaryPoster("v1766400677/fmaifcbaq5mms26c5cpl"),
    video: "https://res.cloudinary.com/dusynu0kv/video/upload/v1766398819/osyhzcm8adyinj0nlrmt.mp4",
  },
  {
    slug: "sprrrint-video-animation",
    title: "Sprrrint Video Animation",
    year: "2025",
    kind: "Loop",
    provider: "cloudinary",
    poster: cloudinaryPoster("v1766400678/s5v8ggsze9d4yzlywzr4"),
    video: "https://res.cloudinary.com/dusynu0kv/video/upload/v1766399078/aslad9tkixaw5adyicte.mp4",
  },
  {
    slug: "starlight",
    title: "STARLIGHT",
    year: "2025",
    kind: "Loop",
    provider: "cloudinary",
    poster: cloudinaryPoster("v1766400692/slf1afdldj1g2ncypfcf"),
    video: "https://res.cloudinary.com/dusynu0kv/video/upload/v1766399139/ltqv45t0znmw6h8etxbe.mp4",
  },
  {
    slug: "muvment-branding-motion-system",
    title: "Muvment Branding, motion system",
    year: "2025",
    kind: "Film",
    provider: "youtube",
    poster: youtubePoster("7gO-a9G3PuU"),
    youtubeId: "7gO-a9G3PuU",
  },
  {
    slug: "lens-for-good-motion-system-1",
    title: "Lens for Good, motion system 1",
    year: "2025",
    kind: "Film",
    provider: "youtube",
    poster: youtubePoster("UVm3Cw8OTNk"),
    youtubeId: "UVm3Cw8OTNk",
  },
  {
    slug: "lens-for-good-motion-system-2",
    title: "Lens for Good, motion system 2",
    year: "2025",
    kind: "Film",
    provider: "youtube",
    poster: youtubePoster("L0BJpAxSSZU"),
    youtubeId: "L0BJpAxSSZU",
  },
  {
    slug: "severance-animation",
    title: "Severance Animation",
    year: "2025",
    kind: "Loop",
    provider: "cloudinary",
    poster: cloudinaryPoster("v1766400691/sexz3hs7efranmkvuo9y"),
    video: "https://res.cloudinary.com/dusynu0kv/video/upload/v1766400321/zz0gvweruizfybnvklbj.mp4",
  },
  {
    slug: "rap-video",
    title: "Rap Video",
    year: "2025",
    kind: "Loop",
    provider: "cloudinary",
    poster: cloudinaryPoster("v1766400684/gi91ianii96z7f5xkil0"),
    video: "https://res.cloudinary.com/dusynu0kv/video/upload/v1766399567/duujdpjpotiyejyqwbku.mp4",
  },
  {
    slug: "mayorfit-brand-awareness",
    title: "Mayorfit Brand Awareness",
    year: "2025",
    kind: "Film",
    provider: "youtube",
    poster: youtubePoster("CL9GzsxqZNo"),
    youtubeId: "CL9GzsxqZNo",
  },
  {
    slug: "cr8torium-lens-for-good",
    title: "Cr8torium × Lens for Good",
    year: "2025",
    kind: "Film",
    provider: "youtube",
    poster: youtubePoster("wTSvh2NRrV0"),
    youtubeId: "wTSvh2NRrV0",
  },
  {
    slug: "billboard",
    title: "Billboard",
    year: "2025",
    kind: "Film",
    provider: "youtube",
    poster: youtubePoster("PVMwUKB7nhM"),
    youtubeId: "PVMwUKB7nhM",
  },
  {
    slug: "billboard-2",
    title: "Billboard 2",
    year: "2025",
    kind: "Film",
    provider: "youtube",
    poster: youtubePoster("F4uGBYAA6bs"),
    youtubeId: "F4uGBYAA6bs",
  },
  {
    slug: "ankor-landscape",
    title: "Ankor Landscape",
    year: "2025",
    kind: "Film",
    provider: "youtube",
    poster: youtubePoster("k5xYf2GT8jU"),
    youtubeId: "k5xYf2GT8jU",
  },
  {
    slug: "jakande-new-led",
    title: "Jakande New LED",
    year: "2025",
    kind: "Film",
    provider: "youtube",
    poster: youtubePoster("FHC7P4Z3EHo"),
    youtubeId: "FHC7P4Z3EHo",
  },
]
