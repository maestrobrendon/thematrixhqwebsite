import type { MetadataRoute } from "next"
import { headers } from "next/headers"
import { isBrendonHost } from "./brendon/lib/isBrendonHost"

// This one Next.js deployment serves several real hosts via middleware.ts
// rewrites — thematrixhq.com (the agency site), wiki.thematrixhq.com
// (private, auth-gated), and brendon.thematrixhq.com / maestrobrendon.com /
// www.maestrobrendon.com (Brendon's portfolio, all rewritten from /brendon —
// see isBrendonHost). robots.txt has to answer per-host, not with one fixed
// file, or some of those hosts get the wrong rules.
export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host") ?? ""

  // wiki.* is an internal, login-gated tool — keep it out of search entirely.
  if (host.startsWith("wiki.")) {
    return { rules: { userAgent: "*", disallow: "/" } }
  }

  if (isBrendonHost(host)) {
    // All Brendon hosts point at the same sitemap and the same canonical
    // (maestrobrendon.com, set via metadataBase in app/brendon/layout.tsx) —
    // brendon.thematrixhq.com is still fine to crawl, its pages just fold
    // their ranking signal back into that one canonical via rel=canonical.
    return {
      rules: { userAgent: "*", allow: "/" },
      sitemap: "https://maestrobrendon.com/sitemap.xml",
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
