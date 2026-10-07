import type { MetadataRoute } from "next"
import { headers } from "next/headers"

// Same multi-host situation as robots.ts — each host needs its own sitemap
// listing only the routes that are actually canonical on that host.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = (await headers()).get("host") ?? ""

  if (host.startsWith("wiki.")) return []

  // Main thematrixhq.com site — the real, confirmed top-level routes.
  // /services and /why-us only exist as dynamic/nested slugs with no index
  // page to list here. /careers is archived (moved to app/careers-archive)
  // and intentionally omitted — no longer a live, linked route.
  return [
    { url: "https://thematrixhq.com/", lastModified: "2026-08-19", changeFrequency: "weekly", priority: 1 },
    { url: "https://thematrixhq.com/about", lastModified: "2026-08-24", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://thematrixhq.com/work", lastModified: "2026-08-24", changeFrequency: "weekly", priority: 0.8 },
    { url: "https://thematrixhq.com/contact", lastModified: "2026-08-19", changeFrequency: "monthly", priority: 0.6 },
    { url: "https://thematrixhq.com/offer", lastModified: "2026-08-19", changeFrequency: "monthly", priority: 0.5 },
    { url: "https://thematrixhq.com/pricing", lastModified: "2026-06-21", changeFrequency: "monthly", priority: 0.6 },
  ]
}
