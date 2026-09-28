import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { headers } from "next/headers"
import { cases } from "../../lib/cases"
import { seoAssets } from "../../lib/assets"
import { isBrendonHost } from "../../lib/isBrendonHost"
import { Footer } from "../../components/Footer"

// Phase-2 case study route (spec §5.4 phase 2) — a real, crawlable page per
// case, built from the same lib/cases.ts data CaseStack/CaseSheet already
// use. Only renders sections backed by real data: no invented process
// artefacts or design-system detail, since none exist for these cases yet.

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }))
}

function findCase(slug: string) {
  return cases.find((c) => c.slug === slug)
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const c = findCase(slug)
  if (!c) return {}
  return {
    title: `${c.title} — Brendon Oleghe`,
    description: c.summary,
    alternates: { canonical: `/work/${c.slug}` },
    openGraph: {
      title: `${c.title} — Brendon Oleghe`,
      description: c.summary,
      url: `https://maestrobrendon.com/work/${c.slug}`,
      siteName: "Brendon Oleghe Portfolio",
      images: [{ url: c.image, width: 1600, height: 1280, alt: c.title }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${c.title} — Brendon Oleghe`,
      description: c.summary,
      images: [c.image],
    },
  }
}

async function homeHref() {
  const host = (await headers()).get("host") ?? ""
  return isBrendonHost(host) ? "/" : "/brendon"
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const c = findCase(slug)
  if (!c) notFound()

  const home = await homeHref()
  const idx = cases.findIndex((x) => x.slug === c.slug)
  const next = cases[(idx + 1) % cases.length]

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: c.title,
    description: c.summary,
    url: `https://maestrobrendon.com/work/${c.slug}`,
    image: c.image,
    keywords: c.disciplines.join(", "),
    datePublished: c.year,
    creator: { "@type": "Person", name: "Brendon Oleghe", url: "https://maestrobrendon.com" },
  }

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main className="workpage">
        <div className="wrap workpage-nav">
          <a href={home} className="workpage-back">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m11 17-5-5 5-5M6 12h12" />
            </svg>
            Back to selected work
          </a>
        </div>

        <header className="workpage-hero">
          <img src={c.image} alt={c.title} />
        </header>

        <div className="wrap workpage-body">
          <div className="workpage-title">
            <h1 className="h2">{c.title}</h1>
            <div className="chips">
              <span className="chip">{c.industry}</span>
              <span className="chip">{c.year}</span>
              {c.disciplines.map((d) => <span className="chip" key={d}>{d}</span>)}
            </div>
          </div>
          <p className="lead workpage-summary">{c.summary}</p>

          <div className="workpage-grid">
            <section>
              <h2 className="h3">Overview</h2>
              <p>{c.summary}</p>
            </section>
            <section>
              <h2 className="h3">Context and problem</h2>
              <p>{c.problem}</p>
            </section>
            <section>
              <h2 className="h3">My role</h2>
              <p>{c.role}</p>
            </section>
            <section>
              <h2 className="h3">What I delivered</h2>
              <ul className="workpage-list">
                {c.delivered.map((d) => <li key={d}>{d}</li>)}
              </ul>
            </section>
            <section>
              <h2 className="h3">Outcome</h2>
              {c.stats.length ? (
                <div className="case-detail-like">
                  {c.stats.map((s) => (
                    <p key={s.label}><b className="workpage-stat">{s.value}</b> {s.label}</p>
                  ))}
                </div>
              ) : (
                <p>{c.outcome}</p>
              )}
            </section>
          </div>

          <div className="sheet-foot workpage-foot">
            <a className="btn btn--dark" href={c.href} target="_blank" rel="noopener">
              <span className="roll"><span>{c.cta}</span><span>Opens in a new tab</span></span>
            </a>
            <a className="btn btn--ghost" href={`${home === "/" ? "" : home}/work/${next.slug}`}>
              <span className="roll"><span>Next: {next.title}</span><span>Next: {next.title}</span></span>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
