"use client";
import React, { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function ConfirmEmail() {
  const router = useRouter();
  const supabase = createClient();
  const {user , loading} = useAuth()
  const checkIfLoggedIn = async () => {
    const { data, error } = await supabase.auth.getSession();
    console.log(data)
    if (data.session) {
      router.replace("/signup/profile");
    }
    if (error) {
      console.error("Error fetching session:", error);
      return;
    }
  };
  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  useEffect(() => {
    if(!loading){
      if(user){
        router.push("profile")
      }
    }
  }, [loading])
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="">Please confirm your email</h1>
    </div>
  );
}
