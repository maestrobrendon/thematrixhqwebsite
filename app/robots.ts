import type { MetadataRoute } from "next"
import { headers } from "next/headers"

// This one Next.js deployment serves three real hosts via middleware.ts
// rewrites — thematrixhq.com (the agency site), wiki.thematrixhq.com
// (private, auth-gated), and brendon.thematrixhq.com (Brendon's portfolio,
// rewritten from /brendon). robots.txt has to answer per-host, not with one
// fixed file, or one of those three gets the wrong rules.
export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host") ?? ""

  // wiki.* is an internal, login-gated tool — keep it out of search entirely.
  if (host.startsWith("wiki.")) {
    return { rules: { userAgent: "*", disallow: "/" } }
  }

  if (host.startsWith("brendon.")) {
    return {
      rules: { userAgent: "*", allow: "/" },
      sitemap: "https://brendon.thematrixhq.com/sitemap.xml",
    }
  }

  // Main thematrixhq.com site. /brendon is also reachable here (same
  // content as brendon.thematrixhq.com/), but brendon.thematrixhq.com is the
  // declared canonical for that content (see alternates.canonical on its
  // pages) — disallowing it here avoids the two hosts competing for the same
  // ranking. /wiki isn't meant to be reached from this host at all.
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/wiki", "/brendon"] },
    sitemap: "https://thematrixhq.com/sitemap.xml",
  }
}
