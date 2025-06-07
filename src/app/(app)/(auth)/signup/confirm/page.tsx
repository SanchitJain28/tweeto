"use client";
import React, { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import SignOut from "@/components/signOut";

export default function ConfirmEmail() {
  const router = useRouter();
  const supabase = createClient();
  const checkIfLoggedIn = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error("Error fetching session:", error);
      return;
    }
    console.log(data);
    if (data.session) {
      console.log(data.session);
      router.push("/");
    }
  };
  useEffect(() => {
    checkIfLoggedIn();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="">Please confirm your email</h1>
      <SignOut />
    </div>
  );
}
