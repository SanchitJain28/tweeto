import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const category = request.nextUrl.searchParams.get("category");
  const page = request.nextUrl.searchParams.get("page");
  const offset = request.nextUrl.searchParams.get("offset");
  // You need to get the current user's profile_id from session/auth
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const profile_id = user?.id; // Adjust if your profile_id is stored differently

  try {
    if (!category) {
      return NextResponse.json(
        {
          status: false,
          message: "Please provide a category",
        },
        { status: 400 }
      );
    }
    if (!profile_id) {
      return NextResponse.json(
        {
          status: false,
          message: "Not authenticated",
        },
        { status: 401 }
      );
    }

    const { data, error } = await supabase.rpc("fetch_tweets_by_category", {
      cat: category,
      current_profile_id: profile_id,
      p_limit: page,
      p_offset: offset,
    });

    console.log(data);

    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        status: true,
        tweets: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: false,
        message: "Unexpected Error ocured",
      },
      { status: 500 }
    );
  }
}
