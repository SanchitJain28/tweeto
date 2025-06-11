import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const supabase= await createClient();
    const { user } = await supabase.auth.getUser();
  } catch (error) {
    console.error("Error in POST /api/sendTweet:", error);
    return NextResponse.json(
      { status: false, message: "Unexpected error occured" },
      { status: 500 }
    );
  }
}
