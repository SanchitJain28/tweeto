import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { email, password } = await request.json();

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: "http://localhost:3000/welcome",
      },
    });

    console.log("Signup response:", { data, error });

    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: error.message,
          error,
        },
        { status: 400 }
      );
    }

    if (data.user?.user_metadata.email_verified) {
      return NextResponse.json(
        {
          status: false,
          message:
            "User already exists. Please check your email or sign in instead.",
        },
        { status: 409 } // Conflict status code
      );
    }
    // Check if user already exists (Supabase returns user but no session)
    // if (data.user && !data.session) {
    // return NextResponse.json(
    //   {
    //     status: false,
    //     message: "User already exists. Please check your email or sign in instead.",
    //   },
    //   { status: 409 } // Conflict status code
    // );
    // }

    return NextResponse.json(
      {
        status: true,
        message:
          "Sign up successful. Please check your email for confirmation.",
        data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: false,
        message: "Unexpected error occurred",
        error,
      },
      { status: 500 }
    );
  }
}
