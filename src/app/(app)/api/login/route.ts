import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { email, password } = await request.json();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: "Error occured",
          error,
        },
        { status: 401 }
      );
    }
    return NextResponse.json(
      {
        status: true,
        message: "login Succesfully",
        data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        status: false,
        message: "Unexpected error occured",
        error,
      },
      { status: 500 }
    );
  }
}
