import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const searchQuery = request.nextUrl.searchParams.get("q");
    if (!searchQuery) {
      return NextResponse.json(
        {
          status: false,
          message: "Please provide a search query",
        },
        { status: 401 }
      );
    }

    //Search for profiles
    const { data: searchedUsers, error: searchedUsersError } = await supabase
      .from("profiles")
      .select("*")
      .ilike("username", `%${searchQuery}%`)
      .ilike("full_name", `%${searchQuery}%`)
      .limit(10);
    if (searchedUsersError) {
      return NextResponse.json(
        {
          status: false,
          message: "Unexpected Error occured",
        },
        { status: 400 }
      );
    }

    //search for tweets category
    const { data: searchedTweetsCategory, error: searchedTweetsCategoryError } =
      await supabase
        .from("tweets")
        .select(
          `
          *,
          profiles(username, full_name)
        `
        )
        .or(`text.ilike.%${searchQuery}%,tags.cs.{${searchQuery}}`)
        .order("created_at", { ascending: false })
        .limit(20);

    if (searchedTweetsCategoryError) {
      return NextResponse.json(
        {
          status: false,
          message: "Unexpected Error occured",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: true,
        message: "Success !",
        searchedUsers,
        searchedTweetsCategory,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: false,
        message: "Unexpected Error occured",
      },
      { status: 501 }
    );
  }
}
