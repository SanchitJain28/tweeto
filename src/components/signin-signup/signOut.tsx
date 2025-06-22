import { createClient } from "@/utils/supabase/client";
import React from "react";

export default function SignOut({ className }:{className:string}) {
  const supabase = createClient();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };
  return (
    <div>
      <button onClick={handleSignOut} className={className}>
        Sign out
      </button>
    </div>
  );
}
