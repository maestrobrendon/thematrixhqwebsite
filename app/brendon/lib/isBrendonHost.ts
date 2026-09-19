// Every host that middleware.ts rewrites straight to /brendon/* — keep this
// in sync with the condition in middleware.ts's `hostname.startsWith("brendon.")`
// block. Shared so every place that needs to know "am I being served under a
// rewritten Brendon host" (the hero iframe's src, in-page nav hrefs, the
// sitemap/robots host branch) can't drift out of sync with each other.
export function isBrendonHost(hostname: string): boolean {
  return hostname.startsWith("brendon.") || hostname === "maestrobrendon.com" || hostname === "www.maestrobrendon.com"
}
