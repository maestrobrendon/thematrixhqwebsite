"use client"

import { chrome } from "./chrome"

export async function copyToClipboard(text: string, message: string) {
  try {
    await navigator.clipboard.writeText(text)
    chrome.showToast?.(message)
  } catch {
    chrome.showToast?.("Copy failed. Select the text and copy it manually.")
  }
}
