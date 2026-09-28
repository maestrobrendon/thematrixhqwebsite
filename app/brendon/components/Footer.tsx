"use client"

// Contact / footer (spec §5.10) — kinetic email, click to copy.
import { useEffect, useState } from "react"
import { footerAssets } from "../lib/assets"
import { useKineticType } from "../lib/useKineticType"
import { copyToClipboard } from "../lib/copy"

const EMAIL = "brendon@maestrobrendon.com"

export function Footer() {
  const [copied, setCopied] = useState(false)
  const [clock, setClock] = useState("--:--")

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Lagos" })
    const tick = () => setClock(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 15000)
    return () => clearInterval(id)
  }, [])
  const { ref: mailRef } = useKineticType<HTMLButtonElement>({
    base: () => (innerWidth < 600 ? 54 : 72),
    gBase: 700,
    wAmp: 50,
    gAmp: 200,
    radius: 0.12,
  })

  function handleClick() {
    copyToClipboard(EMAIL, "Email copied: " + EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <footer className="contact" id="contact" aria-labelledby="contact-h" data-ix-gap data-kinetic-zone="">
      <div className="contact-bg" aria-hidden="true">
        <img src={footerAssets.hillStool} alt="" loading="lazy" />
      </div>
      <div className="wrap">
        <h2 className="sr-only" id="contact-h">Contact</h2>
        <p className="ask">Hiring a senior designer? Let&apos;s talk.</p>
        <button className="mail" ref={mailRef} data-cursor="Copy email" aria-describedby="copyHint" onClick={handleClick}>
          {EMAIL}
        </button>
        <p className={`copy-hint${copied ? " copied" : ""}`} id="copyHint" aria-live="polite">
          <span className="state"><span>Click to copy</span><span>Copied to clipboard</span></span>
        </p>
        <div className="contact-actions">
          <a className="btn" href={`mailto:${EMAIL}`}>
            <span className="roll"><span>Email me</span><span>Opens your mail app</span></span>
          </a>
          <a className="btn btn--ghost" href="https://www.maestrobrendon.com/BRENDON-OLEGHE-RESUME.pdf" target="_blank" rel="noopener">
            <span className="roll"><span>Download résumé</span><span>PDF, 1 page</span></span>
          </a>
          <a className="btn btn--ghost" href="https://linkedin.com/in/brendonoleghe" target="_blank" rel="noopener">
            <span className="roll"><span>LinkedIn</span><span>linkedin.com/in/brendonoleghe</span></span>
          </a>
        </div>
        <div className="foot">
          <p>© {new Date().getFullYear()} Brendon Oleghe. Lagos, <span className="clock">{clock}</span> WAT</p>
          <nav aria-label="Social">
            <a href="https://behance.net/maestrobrendon" target="_blank" rel="noopener">Behance</a>
            <a href="https://dribbble.com/maestrobrendon" target="_blank" rel="noopener">Dribbble</a>
            <a href="https://twitter.com/maestrobrendon" target="_blank" rel="noopener">X / Twitter</a>
            <a href="#top">Back to top</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
