import { NextResponse } from "next/server"
import OpenAI from "openai"

export async function POST(request: Request) {
  try {
    const { flowers, leaves, wrap, ribbon } = await request.json()

    // Validate API key exists
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 })
    }

    // Validate input
    if (!flowers || flowers.length === 0) {
      return NextResponse.json({ error: "At least one flower must be selected" }, { status: 400 })
    }

    // Initialize OpenAI client (API key only on server)
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    // Build dynamic prompt
    const prompt = buildBouquetPrompt(flowers, leaves, wrap, ribbon)

    // Generate image with DALL-E 3
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      style: "vivid",
    })

    const imageUrl = response.data[0]?.url

    if (!imageUrl) {
      return NextResponse.json({ error: "Failed to generate image" }, { status: 500 })
    }

    return NextResponse.json({ imageUrl, prompt })
  } catch (error: any) {
    console.error("[v0] Error generating bouquet:", error)
    return NextResponse.json({ error: error.message || "Failed to generate bouquet" }, { status: 500 })
  }
}

function buildBouquetPrompt(flowers: string[], leaves: string, wrap: string, ribbon: string): string {
  // Translate Italian flower names to descriptions
  const flowerTranslations: Record<string, string> = {
    rosa: "red roses",
    peonia: "pink peonies",
    lisianthus: "blue and white lisianthus",
    ortensia: "blue hydrangeas",
    tulipano: "yellow tulips",
    ranuncolo: "orange ranunculus",
  }

  const leavesTranslations: Record<string, string> = {
    palma: "palm leaves",
    felce: "fern fronds",
    eucalipto: "eucalyptus branches",
    monstera: "monstera leaves",
  }

  const wrapTranslations: Record<string, string> = {
    kraft: "kraft paper",
    bianco: "white paper",
    rosa: "pink paper",
    azzurro: "light blue paper",
    lavanda: "lavender paper",
  }

  const ribbonTranslations: Record<string, string> = {
    rosso: "red",
    oro: "gold",
    argento: "silver",
    viola: "purple",
    verde: "green",
  }

  // Build flower list
  const flowersList = flowers.map((f) => flowerTranslations[f] || f).join(", ")

  const leavesText = leaves ? ` with ${leavesTranslations[leaves] || leaves} foliage` : ""
  const wrapText = wrap ? ` wrapped in ${wrapTranslations[wrap] || wrap}` : ""
  const ribbonText = ribbon ? ` tied with a ${ribbonTranslations[ribbon] || ribbon} ribbon bow` : ""

  const prompt = `A beautiful flower bouquet in pixel art style (16-bit retro game aesthetic) on a pure white background. The bouquet contains ${flowersList}${leavesText}${wrapText}${ribbonText}. The flowers should be arranged in a dome/fan shape viewed from the front. The wrapping paper should be visible around the stems at the bottom with the ribbon bow prominently displayed. Pixel art with clean edges, vibrant colors, retro gaming aesthetic, detailed 16-bit style illustration.`

  return prompt
}
