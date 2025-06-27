import { google } from "@ai-sdk/google"
import { generateObject } from "ai"
import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const GOOGLE_GENERATIVE_AI_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY

const remedySchema = z.object({
  title: z.string(),
  description: z.string(),
  severity: z.enum(["mild", "moderate", "serious"]),
  ingredients: z.array(z.string()),
  steps: z.array(z.string()),
  precautions: z.array(z.string()),
  duration: z.string(),
  frequency: z.string(),
  benefits: z.array(z.string()),
  contraindications: z.array(z.string()),
  isEmergency: z.boolean(),
  emergencyMessage: z.string().optional(),
})

const fallbackRemedies = [
  {
    keywords: ["sneeze", "sneezing", "cold", "runny nose", "running nose", "congestion"],
    remedy: {
      title: "Steam Inhalation for Cold and Sneezing",
      description:
        "A traditional Ayurvedic remedy that uses steam to clear nasal passages and reduce sneezing by loosening mucus and opening airways.",
      severity: "mild" as const,
      ingredients: [
        "2-3 cups of water",
        "2-3 drops eucalyptus oil (optional)",
        "1 tsp turmeric powder (optional)",
        "Large towel",
      ],
      steps: [
        "Boil 2-3 cups of water in a pot until you see steam rising",
        "Remove from heat and place the pot on a stable surface",
        "Add eucalyptus oil or turmeric if available",
        "Lean over the pot at a safe distance (12-15 inches away)",
        "Cover your head and the pot with a large towel to trap the steam",
        "Breathe in the steam slowly and deeply for 5-10 minutes",
        "Take breaks if you feel too hot or uncomfortable",
      ],
      precautions: [
        "Maintain safe distance to avoid burns from hot steam",
        "Do not get too close to avoid scalding",
        "Stop if you feel dizzy or uncomfortable",
        "Not recommended for children under 12 without supervision",
      ],
      duration: "5-10 minutes per session",
      frequency: "2-3 times daily",
      benefits: [
        "Clears nasal passages naturally",
        "Reduces sneezing and congestion",
        "Moisturizes dry nasal passages",
        "Helps loosen mucus",
        "Provides immediate relief",
      ],
      contraindications: [
        "Avoid if you have severe respiratory conditions",
        "Not suitable for very young children",
        "Skip if you have facial injuries or burns",
      ],
      isEmergency: false,
    },
  },
  {
    keywords: ["headache", "head pain", "migraine", "tension"],
    remedy: {
      title: "Peppermint Oil Head Massage",
      description:
        "A cooling Ayurvedic remedy that uses peppermint oil to relieve tension headaches through improved circulation and cooling effects.",
      severity: "mild" as const,
      ingredients: ["2-3 drops peppermint essential oil", "1 tablespoon coconut oil or sesame oil", "Clean cloth"],
      steps: [
        "Mix 2-3 drops of peppermint oil with 1 tablespoon carrier oil",
        "Test the mixture on a small skin area first",
        "Gently massage the oil mixture on your temples",
        "Apply to forehead and back of neck",
        "Use circular motions for 2-3 minutes",
        "Rest in a quiet, dark room for 15-20 minutes",
      ],
      precautions: [
        "Always dilute peppermint oil with carrier oil",
        "Avoid contact with eyes",
        "Test for skin sensitivity first",
        "Do not use on broken skin",
      ],
      duration: "15-20 minutes",
      frequency: "As needed, up to 3 times daily",
      benefits: [
        "Provides cooling relief",
        "Improves blood circulation",
        "Reduces muscle tension",
        "Natural pain relief",
      ],
      contraindications: [
        "Avoid if allergic to peppermint",
        "Not for children under 6",
        "Skip if you have sensitive skin",
      ],
      isEmergency: false,
    },
  },
  {
    keywords: ["stomach", "digestion", "indigestion", "bloating", "gas", "acidity"],
    remedy: {
      title: "Ginger-Mint Tea for Digestive Issues",
      description:
        "A warming Ayurvedic remedy that combines ginger and mint to improve digestion, reduce bloating, and calm stomach discomfort.",
      severity: "mild" as const,
      ingredients: [
        "1 inch fresh ginger root",
        "8-10 fresh mint leaves",
        "2 cups water",
        "1 tsp honey (optional)",
        "Pinch of black salt",
      ],
      steps: [
        "Wash and slice the fresh ginger into thin pieces",
        "Boil 2 cups of water in a pot",
        "Add sliced ginger and let it simmer for 5 minutes",
        "Add fresh mint leaves and simmer for 2 more minutes",
        "Strain the tea into a cup",
        "Add honey and a pinch of black salt if desired",
        "Drink while warm, sip slowly",
      ],
      precautions: [
        "Avoid if you have severe acid reflux",
        "Don't drink on completely empty stomach",
        "Limit to 2-3 cups per day",
        "Consult doctor if pregnant",
      ],
      duration: "10-15 minutes to prepare and drink",
      frequency: "After meals, 2-3 times daily",
      benefits: [
        "Improves digestion naturally",
        "Reduces bloating and gas",
        "Soothes stomach irritation",
        "Enhances appetite",
        "Provides warming effect",
      ],
      contraindications: [
        "Avoid with gallstones",
        "Not suitable with blood thinning medications",
        "Skip if allergic to ginger or mint",
      ],
      isEmergency: false,
    },
  },
]

export async function POST(request: NextRequest) {
  console.log("API route called - using Google Gemini 2.0 Flash")

  if (!GOOGLE_GENERATIVE_AI_API_KEY) {
    console.error("GOOGLE_GENERATIVE_AI_API_KEY is not set")
    return NextResponse.json(
      {
        error: "Server configuration issue: Google AI Studio API key is missing. Please contact support.",
      },
      { status: 500 },
    )
  }

  let body // Declare body here to make it accessible in the catch block

  try {
    // Read the request body once
    body = await request.json()
    console.log("Request body:", body)

    const { symptoms, age, gender } = body

    if (!symptoms || typeof symptoms !== "string" || !symptoms.trim()) {
      console.log("Invalid symptoms provided:", symptoms)
      return NextResponse.json({ error: "Valid symptoms are required" }, { status: 400 })
    }

    console.log("Processing symptoms:", symptoms)

    // Check for fallback remedies first
    const symptomsLower = symptoms.toLowerCase()
    const fallbackMatch = fallbackRemedies.find((remedy) =>
      remedy.keywords.some((keyword) => symptomsLower.includes(keyword)),
    )

    if (fallbackMatch) {
      console.log("Using fallback remedy for:", symptoms)
      return NextResponse.json({ ...fallbackMatch.remedy, fallback: true })
    }

    const prompt = `As an expert Ayurvedic practitioner with deep knowledge of traditional Indian medicine, provide a comprehensive natural remedy for the following symptoms: "${symptoms}". 
    
    Patient details: Age: ${age || "Not specified"}, Gender: ${gender || "Not specified"}
    
    Please provide a detailed response with:
    1. A clear, descriptive title for the remedy
    2. Explanation of how this remedy works according to Ayurvedic principles
    3. Severity assessment (mild/moderate/serious)
    4. Complete list of natural ingredients needed (herbs, spices, oils, common household items)
    5. Step-by-step preparation and usage instructions
    6. Important precautions and safety measures
    7. Duration for each session/application
    8. How frequently to use this remedy
    9. Benefits of this Ayurvedic approach
    10. Any contraindications or when NOT to use this remedy
    11. Whether this requires immediate medical attention (isEmergency: true/false)
    12. If emergency, provide a clear emergency message
    
    Focus on authentic Ayurvedic principles and traditional remedies using natural ingredients like:
    - Common herbs and spices (turmeric, ginger, cumin, etc.)
    - Natural oils (coconut, sesame, mustard oil)
    - Simple home remedies and preparations
    - Traditional methods like steam inhalation, oil massage, herbal teas
    
    Ensure safety is the top priority - if symptoms suggest serious conditions like chest pain, difficulty breathing, severe headaches, high fever, or signs of infection, mark isEmergency as true and recommend immediate medical consultation.
    
    Provide practical, easy-to-follow remedies that can be prepared at home with commonly available ingredients.`

    console.log("Calling Google AI Studio API...")

    const result = await generateObject({
      model: google("gemini-2.0-flash-exp", { apiKey: GOOGLE_GENERATIVE_AI_API_KEY }),
      prompt,
      schema: remedySchema,
    })

    console.log("Google AI Studio API response received")
    return NextResponse.json(result.object)
  } catch (err: any) {
    console.error("Error in API route:", err)

    // Check for quota/rate limit errors
    const isQuotaError =
      err?.status === 429 ||
      err?.cause?.status === 429 ||
      err?.code === "insufficient_quota" ||
      /quota|rate.?limit|exceeded/i.test(err?.message || "")

    if (isQuotaError) {
      console.log("Quota exceeded, trying fallback...")

      const symptomsLower = (body.symptoms as string).toLowerCase()
      const fallbackMatch = fallbackRemedies.find((r) => r.keywords.some((k) => symptomsLower.includes(k)))

      if (fallbackMatch) {
        console.log("Providing keyword-based fallback remedy")
        return NextResponse.json({ ...fallbackMatch.remedy, fallback: true, quotaExceeded: true }, { status: 200 })
      }

      const genericAdvice = {
        title: "Basic Ayurvedic Self-Care",
        description: "General Ayurvedic wellness advice while the personalized AI service is temporarily unavailable.",
        severity: "mild",
        ingredients: [
          "Warm water",
          "Fresh ginger (if available)",
          "Turmeric powder",
          "Honey",
          "Light, warm foods like khichdi or soup",
        ],
        steps: [
          "Rest adequately and maintain regular sleep schedule",
          "Drink warm water throughout the day, avoid cold drinks",
          "Prepare ginger tea: boil ginger in water for 5 minutes, add honey",
          "Eat light, warm, easily digestible foods",
          "Practice deep breathing exercises for 5-10 minutes",
          "Apply warm compress if there's any localized discomfort",
          "Monitor symptoms and seek medical help if they worsen or persist",
        ],
        precautions: [
          "Avoid cold, heavy, or processed foods",
          "Don't ignore persistent or worsening symptoms",
          "Consult a doctor if symptoms are severe",
        ],
        duration: "Throughout the day as needed",
        frequency: "Daily until symptoms improve",
        benefits: [
          "Supports natural healing process",
          "Maintains proper hydration",
          "Promotes digestive health",
          "Reduces inflammation naturally",
        ],
        contraindications: ["Seek immediate medical help for severe symptoms"],
        isEmergency: false,
      }

      console.log("Returning generic Ayurvedic fallback advice")
      return NextResponse.json({ ...genericAdvice, fallback: true, quotaExceeded: true }, { status: 200 })
    }

    // Generic error
    return NextResponse.json(
      {
        error: "Unable to generate remedy at this time. Please try again.",
        details: process.env.NODE_ENV === "development" ? err.message : undefined,
      },
      { status: 500 },
    )
  }
}
