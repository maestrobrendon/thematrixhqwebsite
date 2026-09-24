import type { MetadataRoute } from "next"
import { headers } from "next/headers"
import { isBrendonHost } from "./brendon/lib/isBrendonHost"

// Same multi-host situation as robots.ts — each host needs its own sitemap
// listing only the routes that are actually canonical on that host.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = (await headers()).get("host") ?? ""

  if (host.startsWith("wiki.")) return []

  if (isBrendonHost(host)) {
    // maestrobrendon.com is the declared canonical (see metadataBase in
    // app/brendon/layout.tsx) — every URL here uses that domain regardless of
    // which host actually served this request, so the sitemap always points
    // at the one domain meant to rank.
    //
    // Case studies (lib/projects.ts) are deliberately NOT listed here: none
    // of them have an internal page on this site — every one links out to an
    // external Behance case study or live site (project.href) — and a
    // sitemap should only enumerate URLs this site actually serves. If
    // dedicated internal case-study pages get built later, add their slugs
    // here.
    return [
      {
        url: "https://maestrobrendon.com/",
        lastModified: "2026-08-26",
        changeFrequency: "weekly",
        priority: 1,
      },
      {
        url: "https://maestrobrendon.com/about",
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
