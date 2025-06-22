"use client";

import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { createContext, useEffect, useState } from "react";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

export const authContext = createContext<AuthContextType | null>(null);

export function AuthContext({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const supabase = createClient();

  

   const signOut = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSession = async () => {
    setLoading(true);
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error("Error getting session:", error);
        return;
      }
      setUser(session?.user ?? null);
    } catch (error) {
      console.error("Error in getSession:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //first gets the session to check if user is already logged in
    getSession();

    //now listen for auth state changes
    //this will update the user state when the user logs in or out
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setLoading(true);
      try {
        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          setUser(session?.user ?? null);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
        }
      } catch (error) {
        console.error("Error in auth state change:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  return (
    <authContext.Provider value={{ user, loading,signOut}}>
      {children}
    </authContext.Provider>
  );
}
