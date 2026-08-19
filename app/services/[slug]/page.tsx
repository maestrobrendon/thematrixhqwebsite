import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getServiceBySlug, generateStaticSlugs } from "@/lib/data/services"
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return generateStaticSlugs()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}
  return {
    title: `${service.headline} | Matrix HQ`,
    description: service.subhead,
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()
  return <ServicePageTemplate service={service} />
}
