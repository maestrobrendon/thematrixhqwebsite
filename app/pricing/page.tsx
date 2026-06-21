import { headers } from "next/headers"
import { PricingClient } from "./pricing-client"

export const metadata = {
  title: "Pricing — The Matrix HQ",
  description:
    "Simple, transparent creative subscription pricing. Unlimited design requests, senior talent, AI-powered speed.",
}

export default async function PricingPage() {
  const h = await headers()
  const country = h.get("x-vercel-ip-country") ?? "NG"
  const defaultCurrency: "ngn" | "usd" = country === "NG" ? "ngn" : "usd"

  return <PricingClient defaultCurrency={defaultCurrency} />
}
