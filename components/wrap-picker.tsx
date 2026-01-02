"use client"

import PixelButton from "./pixel-button"
import Image from "next/image"

const WRAPS = [
  { id: "kraft", name: "Kraft", image: "/wrap/kraft.jpg" },
  { id: "bianco", name: "Bianco", image: "/wrap/bianco.jpg" },
  { id: "rosa", name: "Rosa", image: "/wrap/rosa.jpg" },
  { id: "azzurro", name: "Azzurro", image: "/wrap/azzurro.jpg" },
  { id: "lavanda", name: "Lavanda", image: "/wrap/lavanda.jpg" },
]

interface WrapPickerProps {
  selectedWrap: string
  onSelect: (wrap: string) => void
}

export default function WrapPicker({ selectedWrap, onSelect }: WrapPickerProps) {
  return (
    <div className="border-4 border-border bg-card p-6">
      <h2 className="font-pixel text-sm md:text-base text-card-foreground mb-4">Wrap</h2>
      <div className="grid grid-cols-5 gap-3">
        {WRAPS.map((wrap) => (
          <PixelButton
            key={wrap.id}
            onClick={() => onSelect(wrap.id === selectedWrap ? "" : wrap.id)}
            isSelected={selectedWrap === wrap.id}
            label={wrap.name}
          >
            <div className="w-12 h-16 relative">
              <Image src={wrap.image || "/placeholder.svg"} alt={wrap.name} fill className="pixelated object-contain" />
            </div>
          </PixelButton>
        ))}
      </div>
    </div>
  )
}
