import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

const FORTUNE_PROMPT = `You are a mystical fortune teller with ancient wisdom.
Analyze the uploaded image carefully.

If it is a coffee cup reading (Turkish coffee):
- Interpret the shapes, symbols, animals, and patterns you see in the coffee grounds
- Describe what each symbol means for the person's future
- Mention love, career, travel, and spiritual insights

If it is a palm reading:
- Interpret the major palm lines (life line, heart line, head line, fate/destiny line)
- Describe the person's character traits and future path
- Include insights about relationships, career, and longevity

If it is a tarot card:
- Identify the card and its imagery
- Interpret the card's upright or reversed meaning
- Connect the symbolism to the querent's life journey

If it is something else entirely:
- Interpret the image with mystical symbolism
- Find patterns, shapes, and meanings within it

Write a mystical and intriguing fortune reading that feels personal and profound.

Tone: mystical, mysterious, warm, and positive
Length: 200–300 words
Style: Speak directly to the person ("You will...", "Your path...", "The universe reveals...")
End with an inspiring closing message.`;

export async function POST(request: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OpenAI API key not configured" },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const imageFile = formData.get("image") as File;

    if (!imageFile) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(imageFile.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image." },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    if (imageFile.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image too large. Maximum size is 10MB." },
        { status: 400 }
      );
    }

    // Convert file to base64
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString("base64");
    const mimeType = imageFile.type as "image/jpeg" | "image/png" | "image/gif" | "image/webp";

    const openai = getOpenAI();
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 600,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: FORTUNE_PROMPT,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64Image}`,
                detail: "high",
              },
            },
          ],
        },
      ],
    });

    const fortune = response.choices[0]?.message?.content;

    if (!fortune) {
      throw new Error("No fortune generated");
    }

    return NextResponse.json({ fortune });
  } catch (error) {
    console.error("Fortune API error:", error);

    if (error instanceof OpenAI.APIError) {
      if (error.status === 401) {
        return NextResponse.json(
          { error: "Invalid API key" },
          { status: 401 }
        );
      }
      if (error.status === 429) {
        return NextResponse.json(
          { error: "Rate limit exceeded. Please try again later." },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to generate fortune reading" },
      { status: 500 }
    );
  }
}
