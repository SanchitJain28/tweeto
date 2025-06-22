"use client";

import { useAuth } from "@/hooks/useAuth";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function CallbackPage() {
  console.log("RUNNING");
  const router = useRouter();
  const supabase = createClient();
  const { user, loading } = useAuth();
  const checkIfProfileExists = async (userId: string) => {
    // console.log(userId)
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", userId);
    if (error) {
      console.error("Error fetching profile:", error);
      return false;
    }
    console.log(data);
    if (data.length === 0) {
      console.log("Profile does not exist, redirecting to username setup");
      router.push(`/signup/profile`);
      return false;
    }
    router.push("/");

    console.log(data);
  };

  useEffect(() => {
    if (user) {
      checkIfProfileExists(user.id);
    }
  }, [loading, user]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <h1>Verifying your login for the email {user?.email}</h1>
    </div>
  );
}
