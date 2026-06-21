import { headers } from "next/headers"
import { PricingClient } from "./pricing-client"

export const metadata = {
  title: "Pricing — The Matrix HQ",
  description:
    "Simple, transparent creative subscription pricing. Unlimited design requests, senior talent, AI-powered speed.",
}

// Next.js 15 — searchParams is a Promise in async Server Components
export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<{ currency?: string }>
}) {
  const [h, params] = await Promise.all([headers(), searchParams])

  // (1) ?currency= query param — highest priority, used for team-sent direct links
  const param = params.currency?.toLowerCase()
  if (param === "ngn" || param === "usd") {
    return <PricingClient currency={param} />
  }

  // (2) Geo-detection via Vercel's auto-populated header
  const country = h.get("x-vercel-ip-country")
  if (country !== null) {
    return <PricingClient currency={country === "NG" ? "ngn" : "usd"} />
  }

  // (3) Header absent (local dev / non-Vercel) — default NGN
  return <PricingClient currency="ngn" />
}
