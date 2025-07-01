import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Input validation schema
const requestSchema = z.object({
  prompt: z.string().min(1, "Prompt is required").max(500, "Prompt too long"),
  targetLength: z.number().min(50).max(680).default(200),
  tweetContext: z.string().optional(),
});

// Output schema with better structure
// const tweetSchema = z.object({
//   text: z.string(),
//   tone: z.enum(["humorous", "inspirational", "trendy"]),
//   characterCount: z.number(),
// });

// const tweetsResponseSchema = z.array(tweetSchema).length(3);

// Initialize Google AI with environment variable
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY!,
  baseURL: "https://generativelanguage.googleapis.com/v1beta",
});

export async function POST(req: NextRequest) {
  try {
    // Validate environment variables
    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json(
        { error: "Google API key not configured" },
        { status: 500 }
      );
    }

    // Parse and validate request body
    const body = await req.json();
    const validatedInput = requestSchema.parse(body);
    const { prompt, targetLength, tweetContext } = validatedInput;

    const minTargetLength = Math.max(50, targetLength - 50); // More reasonable range
    const maxTargetLength = Math.min(500, targetLength + 50);

    // Improved prompt with better structure and guidance
    const systemPrompt = `You are a professional social media content creator for Tweeto. Your task is to generate exactly 3 unique tweets based on the given topic.

REQUIREMENTS:
- Each tweet must be between ${minTargetLength}-${maxTargetLength} characters
- Tweet 1: Humorous/sarcastic tone
- Tweet 2: Inspirational/thought-provoking tone  
- Tweet 3: Trendy/casual tone
- Each tweet must be distinct and original
- Use engaging language appropriate for Twitter
- Include relevant hashtags where appropriate
- Avoid repetitive content or phrases

${tweetContext ? `CONTEXT: ${tweetContext}` : ""}

TOPIC: ${prompt}

Generate 3 tweets that are ready to post, engaging, and capture different audience segments.`;

    const { object: tweets } = await generateObject({
      model: google("gemini-2.0-flash-lite", {
        safetySettings: [
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_NONE",
          },
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_NONE",
          },
          {
            category: "HARM_CATEGORY_CIVIC_INTEGRITY",
            threshold: "BLOCK_NONE",
          },
        ],
      }),
      output: "array",
      schema: z.object({
        text: z.string(),
        tone: z.enum(["humorous", "inspirational", "trendy"]),
        tags: z.array(z.string()).optional(),
      }),
      prompt: systemPrompt,
      temperature: 0.8, // Add some creativity
    });

    // Validate and enhance response
    const enhancedTweets = tweets.map((tweet, index) => ({
      ...tweet,
      characterCount: tweet.text.length,
      id: `tweet_${index + 1}`,
    }));

    // Validate character counts
    const invalidTweets = enhancedTweets.filter(
      (tweet) =>
        tweet.characterCount < minTargetLength ||
        tweet.characterCount > maxTargetLength
    );

    if (invalidTweets.length > 0) {
      console.warn(`Generated tweets outside target length:`, invalidTweets);
    }

    return NextResponse.json({
      tweets: enhancedTweets,
      metadata: {
        targetLength,
        actualRange: {
          min: Math.min(...enhancedTweets.map((t) => t.characterCount)),
          max: Math.max(...enhancedTweets.map((t) => t.characterCount)),
        },
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Tweet generation error:", error);

    // Handle different error types
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid request data",
          details: error.errors.map((e) => `${e.path.join(".")}: ${e.message}`),
        },
        { status: 400 }
      );
    }

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { error: "Failed to generate tweets. Please try again." },
      { status: 500 }
    );
  }
}
