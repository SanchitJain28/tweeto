import { createClient } from "@/utils/supabase/client";
import React from "react";

export default function SignOut() {
  const supabase = createClient();
  const handleSignOut = async() => {
    await supabase.auth.signOut();
  };
  return (
    <div>
      <button
        onClick={handleSignOut}
        className="bg-black text-white text-xl font-bold m-4 p-4 rounded-xl"
      >
        Sign out
      </button>
    </div>
  );
}
