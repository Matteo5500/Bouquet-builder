"use client"

import PixelButton from "./pixel-button"
import Image from "next/image"

const LEAVES = [
  { id: "eucalipto", name: "Eucalipto", image: "/leaves/eucalipto.jpg" },
  { id: "felce", name: "Felce", image: "/leaves/felce.jpg" },
  { id: "palma", name: "Palma", image: "/leaves/palma.jpg" },
  { id: "monstera", name: "Monstera", image: "/leaves/monstera.jpg" },
]

interface LeavesPickerProps {
  selectedLeaves: string
  onSelect: (leaves: string) => void
}

export default function LeavesPicker({ selectedLeaves, onSelect }: LeavesPickerProps) {
  return (
    <div className="border-4 border-border bg-card p-6">
      <h2 className="font-pixel text-sm md:text-base text-card-foreground mb-4">Leaves</h2>
      <div className="grid grid-cols-4 gap-3">
        {LEAVES.map((leaf) => (
          <PixelButton
            key={leaf.id}
            onClick={() => onSelect(leaf.id === selectedLeaves ? "" : leaf.id)}
            isSelected={selectedLeaves === leaf.id}
            label={leaf.name}
          >
            <div className="w-16 h-16 relative">
              <Image src={leaf.image || "/placeholder.svg"} alt={leaf.name} fill className="pixelated object-contain" />
            </div>
          </PixelButton>
        ))}
      </div>
    </div>
  )
}
