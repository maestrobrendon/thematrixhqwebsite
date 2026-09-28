"use client"

// Tiny in-memory registry that lets the global chrome pieces (Dock,
// CommandMenu, InspectMode, Toast, CaseStack's sheet) call each other
// without prop-drilling or a full event bus — each owner registers its
// handler on mount, callers just do `chrome.openCommandMenu?.()`.
type Handlers = {
  openCommandMenu?: () => void
  closeCommandMenu?: () => void
  isCommandMenuOpen?: () => boolean
  toggleInspect?: (force?: boolean) => void
  isInspectOn?: () => boolean
  showToast?: (message: string) => void
  openSheet?: (index: number, fromEl?: Element | null) => void
  closeSheet?: () => void
  isSheetOpen?: () => boolean
}

export const chrome: Handlers = {}

export function registerChromeHandler<K extends keyof Handlers>(key: K, fn: Handlers[K]) {
  chrome[key] = fn
}

export function unregisterChromeHandler<K extends keyof Handlers>(key: K) {
  chrome[key] = undefined
}
