"use client"

// Command palette (spec §6.6) — ⌘K / Ctrl+K, and the dock's search button.
import { useEffect, useRef, useState } from "react"
import { gsap } from "@/lib/gsap-utils"
import { chrome, registerChromeHandler, unregisterChromeHandler } from "../lib/chrome"
import { lockScroll, goTo } from "../lib/scroll"
import { cases } from "../lib/cases"
import { copyToClipboard } from "../lib/copy"

const EMAIL = "brendon@maestrobrendon.com"
const RESUME = "https://www.maestrobrendon.com/BRENDON-OLEGHE-RESUME.pdf"

type Cmd = { group: string; label: string; hint?: string; run: () => void }

const GO_TO: [string, string][] = [
  ["Selected work", "#work"],
  ["Built and shipped", "#built"],
  ["Motion", "#motion"],
  ["Archive", "#archive"],
  ["How I work", "#process"],
  ["Experience", "#experience"],
  ["Contact", "#contact"],
]

export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  const openRef = useRef(false)

  const commands: Cmd[] = [
    ...GO_TO.map(([label, href]) => ({ group: "Go to", label, run: () => goTo(href) })),
    { group: "Actions", label: "Copy email address", hint: EMAIL, run: () => copyToClipboard(EMAIL, "Email copied: " + EMAIL) },
    { group: "Actions", label: "Download résumé", hint: "PDF", run: () => window.open(RESUME, "_blank", "noopener") },
    { group: "Actions", label: "Toggle inspect mode", hint: "I", run: () => chrome.toggleInspect?.() },
    { group: "Actions", label: "Open LinkedIn", run: () => window.open("https://linkedin.com/in/brendonoleghe", "_blank", "noopener") },
    { group: "Actions", label: "Open Behance", run: () => window.open("https://behance.net/maestrobrendon", "_blank", "noopener") },
    ...cases.map((c, i) => ({ group: "Case studies", label: c.title, hint: c.disciplines[0], run: () => chrome.openSheet?.(i, null) })),
  ]

  const q = query.trim().toLowerCase()
  const items = commands.filter((c) => !q || (c.label + " " + c.group + " " + (c.hint ?? "")).toLowerCase().includes(q))

  useEffect(() => {
    openRef.current = open
  }, [open])

  useEffect(() => {
    function doOpen() {
      returnFocus.current = document.activeElement as HTMLElement
      setQuery("")
      setSelected(0)
      setOpen(true)
    }
    function doClose() {
      setOpen(false)
      lockScroll(false)
      returnFocus.current?.focus?.()
    }
    registerChromeHandler("openCommandMenu", doOpen)
    registerChromeHandler("closeCommandMenu", doClose)
    registerChromeHandler("isCommandMenuOpen", () => openRef.current)

    function onKeydown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        openRef.current ? doClose() : doOpen()
      }
      if (e.key === "Escape" && openRef.current) doClose()
    }
    document.addEventListener("keydown", onKeydown)
    return () => {
      unregisterChromeHandler("openCommandMenu")
      unregisterChromeHandler("closeCommandMenu")
      unregisterChromeHandler("isCommandMenuOpen")
      document.removeEventListener("keydown", onKeydown)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    lockScroll(true)
    setTimeout(() => inputRef.current?.focus(), 0)
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches && boxRef.current) {
      gsap.from(boxRef.current, { y: -12, opacity: 0, scale: 0.98, duration: 0.35, ease: "expo.out" })
    }
  }, [open])

  function runAt(i: number) {
    const cmd = items[i]
    if (!cmd) return
    setOpen(false)
    lockScroll(false)
    returnFocus.current?.focus?.()
    setTimeout(cmd.run, 30)
  }

  let lastGroup = ""

  return (
    <div className={`cmd${open ? " open" : ""}`} role="dialog" aria-modal="true" aria-label="Command menu" onClick={(e) => e.target === e.currentTarget && chrome.closeCommandMenu?.()}>
      <div className="cmd-box" ref={boxRef}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Jump to a section, copy email, get the résumé…"
          autoComplete="off"
          aria-controls="cmdList"
          aria-label="Search commands"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setSelected(0)
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setSelected((s) => (s + 1) % Math.max(items.length, 1))
            }
            if (e.key === "ArrowUp") {
              e.preventDefault()
              setSelected((s) => (s - 1 + Math.max(items.length, 1)) % Math.max(items.length, 1))
            }
            if (e.key === "Enter") {
              e.preventDefault()
              runAt(selected)
            }
          }}
        />
        <div className="cmd-list" id="cmdList" role="listbox">
          {items.length === 0 ? (
            <p className="cmd-empty">Nothing matches &quot;{query}&quot;. Try &quot;email&quot;, &quot;résumé&quot; or a project name.</p>
          ) : (
            items.map((c, i) => {
              const showGroup = c.group !== lastGroup
              lastGroup = c.group
              return (
                <div key={c.group + c.label}>
                  {showGroup && <p className="grp">{c.group}</p>}
                  <button role="option" aria-selected={i === selected} onClick={() => runAt(i)} onMouseEnter={() => setSelected(i)}>
                    <span>{c.label}</span>
                    {c.hint && <span className="hint">{c.hint}</span>}
                  </button>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
