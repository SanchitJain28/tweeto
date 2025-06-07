"use client";
import LoadingBackdrop from "@/components/loadingBackdrop";
import SignOut from "@/components/signOut";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const getUser = async () => {
    try {
      setLoading(true);
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      console.log(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return (
      <LoadingBackdrop isVisible={loading} message="Loading , Please wait" />
    );
  }

  if (!user) {
    return <div className="justify-center flex text-4xl">Please log in 
        <SignOut/>
</div>;
  }
  return (
    <div className="">
      <h1 className="justify-center flex text-4xl">
        Welcome {user.user_metadata.email}
      </h1>
    </div>
  );
}
