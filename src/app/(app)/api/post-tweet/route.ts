import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { profile_id, text, image_url } = await request.json();
  try {
    if (!profile_id) {
      return NextResponse.json(
        {
          status: true,
          message: "Not Authenticated",
        },
        { status: 401 }
      );
    }

    const { error } = await supabase.from("tweets").insert({
      profile_id,
      text,
      image_url,
    });

    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: "Database error occured",
          error,
        },
        { status: 403 }
      );
    }

    return NextResponse.json(
      {
        status: true,
        message: "Tweeted",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        status: false,
        message: "Unexpected error occurred during upload",
        error: error,
      },
      { status: 500 }
    );
  }
}

