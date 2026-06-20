"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PillButtonProps {
  variant: "red" | "blue"
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export function PillButton({ variant, children, onClick, className }: PillButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "rounded-full px-8 py-6 text-lg font-medium transition-all duration-300",
        "border-2 hover:scale-105 active:scale-95",
        variant === "red" && [
          "bg-red-600 hover:bg-red-700 text-white",
          "border-red-500 hover:border-red-400",
          "shadow-[0_0_20px_rgba(239,68,68,0.5)] hover:shadow-[0_0_30px_rgba(239,68,68,0.8)]",
        ],
        variant === "blue" && [
          "bg-blue-600 hover:bg-blue-700 text-white",
          "border-blue-500 hover:border-blue-400",
          "shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.8)]",
        ],
        className,
      )}
    >
      {children}
    </Button>
  )
}
