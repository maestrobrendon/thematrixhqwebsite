"use client"

// Experience accordion (spec §5.9) — replaces ExperienceExpertise.tsx.
import { useRef, useState } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap-utils"
import { jobs } from "../lib/experience"

function renderBody(body: string) {
  const parts = body.split(/(<metric>.*?<\/metric>)/g)
  return parts.map((part, i) => {
    const m = part.match(/^<metric>(.*)<\/metric>$/)
    return m ? <span className="metric" key={i}>{m[1]}</span> : <span key={i}>{part}</span>
  })
}

function JobRow({ job, open, onToggle }: { job: (typeof jobs)[number]; open: boolean; onToggle: () => void }) {
  const moreRef = useRef<HTMLDivElement>(null)

  function toggle() {
    onToggle()
    const more = moreRef.current
    if (!more) return
    const willOpen = !open
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches
    gsap.to(more, {
      height: willOpen ? "auto" : 0,
      duration: reduced ? 0 : 0.6,
      ease: "expo.out",
      onComplete: () => ScrollTrigger.refresh(),
    })
  }

  return (
    <div className={`job${open ? " open" : ""}`}>
      <button aria-expanded={open} onClick={toggle}>
        <span className="co">{job.company}</span>
        <span className="role">{job.role}</span>
        <span className="when">{job.when}, {job.where}</span>
        <span className="pm" aria-hidden="true" />
      </button>
      <div className="more" ref={moreRef} style={{ height: open ? "auto" : 0 }}>
        <div className="more-in">
          <p>{renderBody(job.body)}</p>
          <div className="chips">{job.tags.map((t) => <span className="chip" key={t}>{t}</span>)}</div>
        </div>
      </div>
    </div>
  )
}

export function Experience() {
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <section className="experience" id="experience" aria-labelledby="exp-h" data-ix-gap>
      <div className="wrap">
        <div className="sec-head">
          <h2 className="h2" id="exp-h">Experience</h2>
          <p className="lead">Studio, in-house and contract roles since 2016. Open any role for the detail.</p>
        </div>
        <div className="jobs">
          {jobs.map((job, i) => (
            <JobRow key={job.company + job.when} job={job} open={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  )
}
