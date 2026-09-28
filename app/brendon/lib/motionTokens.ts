// Motion tokens (spec §3.5). Named motionTokens.ts, not motion.ts, so it
// doesn't collide with ./motionReel.ts (the spec's other, data-carrying
// `lib/motion.ts`).
export const EASE = { out: "expo.out", inOut: "expo.inOut", back: "back.out(2.2)" } as const
export const CSS_EASE = { out: "cubic-bezier(.16,1,.3,1)", io: "cubic-bezier(.65,0,.35,1)" } as const
export const DUR = { micro: 0.25, ui: 0.5, move: 0.9, hero: 1.2 } as const
