import { createClient } from "@/utils/supabase/server";
import {  NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        {
          status: false,
          message: "User not found",
          code: "NOT_AUTHENTICATED",
        },
        {
          status: 403,
        }
      );
    }

    const user_id = user.id;
    const { data: profileData, error: profileError } = await supabase.rpc(
      "get_myprofile",
      {
        user_id,
      }
    );

    if (profileError) {
      return NextResponse.json(
        {
          status: false,
          message: "Unexpected error occurred",
          error: profileError,
          code: "INTERNAL_SERVOR_ERROR",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        status: true,
        message: "Profile fetched Succesfully !!",
        code: "SUCCESS",
        data : profileData
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: false,
        message: "Unexpected error occurred",
        error,
        code: "INTERNAL_SERVOR_ERROR",
      },
      {
        status: 500,
      }
    );
  }
}
