"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PixelButtonProps {
  children: ReactNode
  onClick?: () => void
  isSelected?: boolean
  disabled?: boolean
  label?: string
  className?: string
}

export function PixelButton({
  children,
  onClick,
  isSelected = false,
  disabled = false,
  label,
  className,
}: PixelButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex flex-col items-center gap-2 p-3 border-4 transition-all",
        "hover:scale-105 active:scale-95",
        isSelected ? "border-primary bg-primary/10" : "border-border bg-muted hover:bg-muted/70",
        disabled && "opacity-40 cursor-not-allowed hover:scale-100",
        className,
      )}
      title={label}
    >
      {label ? (
        <>
          <div className="flex items-center justify-center">{children}</div>
          <span className="text-[8px] font-pixel text-foreground leading-tight text-center">{label}</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}

export default PixelButton
