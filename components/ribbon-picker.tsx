"use client"

import PixelButton from "./pixel-button"
import Image from "next/image"

const RIBBONS = [
  { id: "rosso", name: "Rosso", image: "/ribbon/rosso.jpg" },
  { id: "oro", name: "Oro", image: "/ribbon/oro.jpg" },
  { id: "argento", name: "Argento", image: "/ribbon/argento.jpg" },
  { id: "viola", name: "Viola", image: "/ribbon/viola.jpg" },
  { id: "verde", name: "Verde", image: "/ribbon/verde.jpg" },
]

interface RibbonPickerProps {
  selectedRibbon: string
  onSelect: (ribbon: string) => void
}

export default function RibbonPicker({ selectedRibbon, onSelect }: RibbonPickerProps) {
  return (
    <div className="border-4 border-border bg-card p-6">
      <h2 className="font-pixel text-sm md:text-base text-card-foreground mb-4">Ribbon</h2>
      <div className="grid grid-cols-5 gap-3">
        {RIBBONS.map((ribbon) => (
          <PixelButton
            key={ribbon.id}
            onClick={() => onSelect(ribbon.id === selectedRibbon ? "" : ribbon.id)}
            isSelected={selectedRibbon === ribbon.id}
            label={ribbon.name}
          >
            <div className="w-12 h-6 relative">
              <Image
                src={ribbon.image || "/placeholder.svg"}
                alt={ribbon.name}
                fill
                className="pixelated object-contain"
              />
            </div>
          </PixelButton>
        ))}
      </div>
    </div>
  )
}
