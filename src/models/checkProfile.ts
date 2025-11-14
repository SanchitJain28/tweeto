import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function checkProfile() {
  const supabase = await createClient();

  const {
    data: { session  },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  console.log("USER PROFILE", data);

  if (error) {
    if (error.code === "PGRST116") {
      return redirect("/signup/profile");
    }
    console.log("Supabase error:", error);
  }

  if (!data) {
    redirect("/complete-profile");
  }

  return data;
}
