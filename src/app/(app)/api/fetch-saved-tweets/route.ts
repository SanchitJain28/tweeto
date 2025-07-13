import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data: savedTweets, error: savedTweetsError } = await supabase.rpc(
      "get_saved_tweets",
      {
        user_id: user.id,
      }
    );

    if (savedTweetsError) {
      throw savedTweetsError;
    }

    return NextResponse.json({
      status: true,
      message: "Sucesss",
      savedTweets,
    });
  } catch (error) {
    console.error("Error fetching saved tweets:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
