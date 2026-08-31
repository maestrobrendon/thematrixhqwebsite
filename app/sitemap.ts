import type { MetadataRoute } from "next"
import { headers } from "next/headers"

// Same three-host situation as robots.ts — each host needs its own sitemap
// listing only the routes that are actually canonical on that host.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = (await headers()).get("host") ?? ""

  if (host.startsWith("wiki.")) return []

  if (host.startsWith("brendon.")) {
    return [
      {
        url: "https://brendon.thematrixhq.com/",
        lastModified: "2026-08-26",
        changeFrequency: "weekly",
        priority: 1,
      },
      {
        url: "https://brendon.thematrixhq.com/about",
        lastModified: "2026-08-31",
        changeFrequency: "monthly",
        priority: 0.8,
      },
    ]
  }

  // Main thematrixhq.com site — the real, confirmed top-level routes.
  // /brendon is intentionally excluded: brendon.thematrixhq.com is its
  // canonical host (see robots.ts and each /brendon page's canonical tag).
  // /services and /why-us only exist as dynamic/nested slugs with no index
  // page to list here; /careers/[slug] similarly has no slug list wired up
  // yet — add those once there's a data source to enumerate real slugs from.
  return [
    { url: "https://thematrixhq.com/", lastModified: "2026-08-19", changeFrequency: "weekly", priority: 1 },
    { url: "https://thematrixhq.com/about", lastModified: "2026-08-24", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://thematrixhq.com/work", lastModified: "2026-08-24", changeFrequency: "weekly", priority: 0.8 },
    { url: "https://thematrixhq.com/contact", lastModified: "2026-08-19", changeFrequency: "monthly", priority: 0.6 },
    { url: "https://thematrixhq.com/careers", lastModified: "2026-08-24", changeFrequency: "weekly", priority: 0.6 },
    { url: "https://thematrixhq.com/offer", lastModified: "2026-08-19", changeFrequency: "monthly", priority: 0.5 },
    { url: "https://thematrixhq.com/pricing", lastModified: "2026-06-21", changeFrequency: "monthly", priority: 0.6 },
  ]
}
