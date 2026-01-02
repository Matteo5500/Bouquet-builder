"use client"

import PixelButton from "./pixel-button"
import Image from "next/image"

const FLOWERS = [
  { id: "rosa", name: "Rosa", image: "/flowers/rosa.jpg" },
  { id: "peonia", name: "Peonia", image: "/flowers/peonia.jpg" },
  { id: "lisianthus", name: "Lisianthus", image: "/flowers/lisianthus.jpg" },
  { id: "ortensia", name: "Ortensia", image: "/flowers/ortensia.jpg" },
  { id: "tulipano", name: "Tulipano", image: "/flowers/tulipano.jpg" },
  { id: "ranuncolo", name: "Ranuncolo", image: "/flowers/ranuncolo.jpg" },
]

interface FlowerPickerProps {
  selectedFlowers: string[]
  onSelect: (flowers: string[]) => void
}

export default function FlowerPicker({ selectedFlowers, onSelect }: FlowerPickerProps) {
  const MAX_FLOWERS = 5

  const toggleFlower = (flowerId: string) => {
    if (selectedFlowers.includes(flowerId)) {
      onSelect(selectedFlowers.filter((f) => f !== flowerId))
    } else if (selectedFlowers.length < MAX_FLOWERS) {
      onSelect([...selectedFlowers, flowerId])
    }
  }

  return (
    <div className="border-4 border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-pixel text-sm md:text-base text-card-foreground">Flowers</h2>
        <span className="font-pixel text-xs text-muted-foreground">
          {selectedFlowers.length}/{MAX_FLOWERS}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {FLOWERS.map((flower) => {
          const isSelected = selectedFlowers.includes(flower.id)
          const isDisabled = !isSelected && selectedFlowers.length >= MAX_FLOWERS

          return (
            <PixelButton
              key={flower.id}
              onClick={() => toggleFlower(flower.id)}
              isSelected={isSelected}
              disabled={isDisabled}
              label={flower.name}
            >
              <div className="w-16 h-16 relative">
                <Image
                  src={flower.image || "/placeholder.svg"}
                  alt={flower.name}
                  fill
                  className="pixelated object-contain"
                />
              </div>
            </PixelButton>
          )
        })}
      </div>
    </div>
  )
}
