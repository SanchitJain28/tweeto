// hooks/useAuth.ts
import { useContext } from "react";
import { authContext } from "@/contexts/authContext";
import { createClient } from "@/utils/supabase/client";
import { FullProfile, Profile } from "@/types/Types";
import { useQuery } from "@tanstack/react-query";

const supabase = createClient();

export function useAuth() {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
}
export async function getProfile(id: string): Promise<Profile> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function getFullProfile(id: string): Promise<FullProfile> {
  const { data, error } = await supabase
    .from("profiles")
    .select(
      `
      *,
      tweets_with_counts (
        *
      )
    `
    )
    .eq("id", id)
    .order("created_at", {
      ascending: false,
      referencedTable: "tweets_with_counts",
    }) // 👈 THIS
    .maybeSingle();

  if (error) throw error;
  return data;
}

export const useProfile = ({
  id,
  enabled,
}: {
  id: string;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["Profile", id],
    queryFn: () => getProfile(id),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    gcTime: 24 * 60 * 60 * 1000, // Keep in cache for 24 hours
    enabled: enabled,
  });
};

export const useFullProfile = ({
  id,
  enabled,
}: {
  id: string;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["FullProfile", id],
    queryFn: () => getFullProfile(id),
    staleTime: 0,
    gcTime:0,
    enabled: enabled,
  });
};
