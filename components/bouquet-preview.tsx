"use client"

import Image from "next/image"
import { useState } from "react"
import type { BouquetState } from "./bouquet-builder"
import { PixelButton } from "./pixel-button"

interface BouquetPreviewProps {
  bouquet: BouquetState
}

export default function BouquetPreview({ bouquet }: BouquetPreviewProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const isEmpty = !bouquet.flowers.length && !bouquet.leaves && !bouquet.wrap && !bouquet.ribbon
  const canGenerate = bouquet.flowers.length > 0

  const handleGenerate = async () => {
    if (!canGenerate) return

    setIsGenerating(true)
    setError(null)
    setGeneratedImage(null)

    try {
      const response = await fetch("/api/generate-bouquet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          flowers: bouquet.flowers,
          leaves: bouquet.leaves,
          wrap: bouquet.wrap,
          ribbon: bouquet.ribbon,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate bouquet")
      }

      setGeneratedImage(data.imageUrl)
      console.log("[v0] Generated bouquet with prompt:", data.prompt)
    } catch (err: any) {
      console.error("[v0] Generation error:", err)
      setError(err.message || "Failed to generate bouquet")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="border-4 border-border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-pixel text-sm md:text-base text-card-foreground">Il Tuo Bouquet</h2>
        <PixelButton onClick={handleGenerate} disabled={!canGenerate || isGenerating} className="text-xs">
          {isGenerating ? "Generando..." : "Genera"}
        </PixelButton>
      </div>

      <div className="relative flex items-center justify-center min-h-[500px] bg-muted/30 border-4 border-border p-8">
        {generatedImage ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={generatedImage}
              alt="Generated Bouquet"
              width={1024}
              height={1024}
              className="pixelated object-contain max-w-full max-h-full w-full h-full"
              priority
            />
          </div>
        ) : isGenerating ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="font-pixel text-xs text-muted-foreground text-center leading-relaxed">
              Generando il tuo
              <br />
              bouquet pixel art...
            </p>
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8">
            <p className="font-pixel text-xs text-destructive text-center leading-relaxed">
              Errore:
              <br />
              {error}
            </p>
            <PixelButton onClick={handleGenerate} disabled={!canGenerate} className="text-xs">
              Riprova
            </PixelButton>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-pixel text-xs text-muted-foreground text-center leading-relaxed">
              {isEmpty ? (
                <>
                  Seleziona gli elementi
                  <br />
                  per costruire il
                  <br />
                  tuo bouquet
                </>
              ) : (
                <>
                  Clicca &apos;Genera&apos; per creare
                  <br />
                  il tuo bouquet pixel art
                </>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
