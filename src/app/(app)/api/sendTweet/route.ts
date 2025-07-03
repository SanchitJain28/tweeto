import { NextResponse } from "next/server";

export async function POST() {
  try {
    return NextResponse.json(
      { status: false, message: "Unexpected error occured" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Error in POST /api/sendTweet:", error);
    return NextResponse.json(
      { status: false, message: "Unexpected error occured" },
      { status: 500 }
    );
  }
}
