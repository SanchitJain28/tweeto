// /pages/auth/callback.js
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function AuthCallback() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        // ✅ User is now logged in
        router.push("/signup/profile"); // go to username setup
      }
    };

    checkSession();
  }, []);

  return <p>Verifying your account...</p>;
}
