"use client"

import { useState } from "react"
import FlowerPicker from "./flower-picker"
import LeavesPicker from "./leaves-picker"
import WrapPicker from "./wrap-picker"
import RibbonPicker from "./ribbon-picker"
import BouquetPreview from "./bouquet-preview"

export interface BouquetState {
  flowers: string[]
  leaves: string
  wrap: string
  ribbon: string
}

export default function BouquetBuilder() {
  const [bouquet, setBouquet] = useState<BouquetState>({
    flowers: [],
    leaves: "",
    wrap: "",
    ribbon: "",
  })

  const updateFlowers = (flowers: string[]) => {
    setBouquet((prev) => ({ ...prev, flowers }))
  }

  const updateLeaves = (leaves: string) => {
    setBouquet((prev) => ({ ...prev, leaves }))
  }

  const updateWrap = (wrap: string) => {
    setBouquet((prev) => ({ ...prev, wrap }))
  }

  const updateRibbon = (ribbon: string) => {
    setBouquet((prev) => ({ ...prev, ribbon }))
  }

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="font-pixel text-2xl md:text-4xl text-primary mb-4 leading-relaxed">Pixel Bouquet</h1>
        <p className="text-muted-foreground text-sm md:text-base">Build your custom flower bouquet</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Selection Panel */}
        <div className="space-y-6">
          <FlowerPicker selectedFlowers={bouquet.flowers} onSelect={updateFlowers} />
          <LeavesPicker selectedLeaves={bouquet.leaves} onSelect={updateLeaves} />
          <WrapPicker selectedWrap={bouquet.wrap} onSelect={updateWrap} />
          <RibbonPicker selectedRibbon={bouquet.ribbon} onSelect={updateRibbon} />
        </div>

        {/* Preview */}
        <div className="lg:sticky lg:top-8 lg:self-start">
          <BouquetPreview bouquet={bouquet} />
        </div>
      </div>
    </div>
  )
}
