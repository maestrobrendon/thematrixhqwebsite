import type { MetadataRoute } from "next"
import { headers } from "next/headers"

// This one Next.js deployment serves two real hosts via middleware.ts
// rewrites — thematrixhq.com (the agency site) and wiki.thematrixhq.com
// (private, auth-gated). robots.txt has to answer per-host, not with one
// fixed file, or the wiki gets the agency site's rules.
export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host") ?? ""

  // wiki.* is an internal, login-gated tool — keep it out of search entirely.
  if (host.startsWith("wiki.")) {
    return { rules: { userAgent: "*", disallow: "/" } }
  }

  // Main thematrixhq.com site. /wiki isn't meant to be reached from this host.
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/wiki"] },
    sitemap: "https://thematrixhq.com/sitemap.xml",
  }
}
