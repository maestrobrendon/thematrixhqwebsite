import { notFound } from "next/navigation"
import { ROLES, getRoleBySlug } from "@/lib/careers/roles"
import RoleDetail from "./RoleDetail"

export async function generateStaticParams() {
  return ROLES.map((role) => ({ slug: role.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const role = getRoleBySlug(slug)
  if (!role) return {}
  return {
    title: `${role.title} — Careers at thematrixHQ`,
    description: role.summary,
  }
}

export default async function RoleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const role = getRoleBySlug(slug)
  if (!role) notFound()
  return <RoleDetail role={role} />
}
