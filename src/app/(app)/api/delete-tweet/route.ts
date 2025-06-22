import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { id } = await request.json();
  try {
    

    const { error } = await supabase
      .from("tweets")
      .delete()
      .eq("id", id);

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
        message: "Deleted",
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
