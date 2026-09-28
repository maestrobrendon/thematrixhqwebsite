"use client"

// Motion reel (spec §5.6) — zero video bytes until the visitor presses play.
import { useEffect, useRef, useState } from "react"
import { gsap } from "@/lib/gsap-utils"
import { motionPieces } from "../lib/motionReel"
import { goTo } from "../lib/scroll"

export function MotionReel() {
  const [selected, setSelected] = useState(0)
  const [playingIdx, setPlayingIdx] = useState<number | null>(null)
  const screenRef = useRef<HTMLDivElement>(null)
  const [previewIdx, setPreviewIdx] = useState(0)
  const posterAnimatedRef = useRef(false)

  const shown = motionPieces[previewIdx]

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced || !posterAnimatedRef.current || playingIdx !== null) {
      posterAnimatedRef.current = true
      return
    }
    const el = screenRef.current?.firstElementChild
    if (el) gsap.from(el, { opacity: 0, scale: 1.04, duration: 0.6, ease: "expo.out" })
  }, [previewIdx, playingIdx])

  function selectReel(i: number) {
    setSelected(i)
    setPreviewIdx(i)
    setPlayingIdx(null)
    if (innerWidth <= 860) goTo(screenRef.current as Element)
  }

  const fine = typeof window !== "undefined" && matchMedia("(pointer: fine)").matches

  return (
    <section className="motion" id="motion" aria-labelledby="motion-h" data-ix-gap>
      <div className="wrap">
        <div className="sec-head">
          <h2 className="h2" id="motion-h">Motion</h2>
          <p className="lead">Brand films, motion systems and campaign pieces. Pick one to play it.</p>
        </div>
        <div className="reel">
          <div className="screen" ref={screenRef} data-ix="Player / Motion">
            {playingIdx !== null ? (
              motionPieces[playingIdx].provider === "youtube" ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${(motionPieces[playingIdx] as { youtubeId: string }).youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                  title={motionPieces[playingIdx].title}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              ) : (
                <video
                  src={(motionPieces[playingIdx] as { video: string }).video}
                  poster={shown.poster}
                  controls
                  autoPlay
                  playsInline
                />
              )
            ) : (
              <>
                <img src={shown.poster} alt={`${shown.title}, still frame`} loading="lazy" />
                <button
                  className="play"
                  data-cursor="Play"
                  aria-label={`Play ${shown.title}`}
                  onClick={() => {
                    setSelected(previewIdx)
                    setPlayingIdx(previewIdx)
                  }}
                >
                  <span>
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15L19.5 12z" /></svg>
                  </span>
                </button>
                <div className="cap">
                  <b>{shown.title}</b>
                  <span style={{ fontSize: "var(--fs-xs)", opacity: 0.8 }}>{shown.kind}, {shown.year}</span>
                </div>
              </>
            )}
          </div>
          <div
            className="reel-list"
            role="listbox"
            aria-label="Motion pieces"
            data-lenis-prevent
            onMouseLeave={() => !playingIdx && setPreviewIdx(selected)}
          >
            {motionPieces.map((m, i) => (
              <button
                key={m.slug}
                role="option"
                aria-selected={i === selected}
                className={i === selected ? "on" : ""}
                onClick={() => selectReel(i)}
                onPointerEnter={() => fine && playingIdx === null && i !== selected && setPreviewIdx(i)}
              >
                <span>{m.title}</span>
                <span className="ty">{m.kind}, {m.year}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
