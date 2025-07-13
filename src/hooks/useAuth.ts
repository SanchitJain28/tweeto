// hooks/useAuth.ts
import { useContext } from "react";
import { authContext } from "@/contexts/authContext";
import { createClient } from "@/utils/supabase/client";
import { FullProfile, Profile } from "@/types/Types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const supabase = createClient();

interface Tweet {
  content: string;
  tweet_id: string;
  image_url: string | null;
  created_at: string;
  tweet_comment_count: number;
  tweet_like_count: number;
  is_liked_by_current_user: boolean;
}

interface SavedTweet {
  id: string;
  profile_id: string;
  image_url: string | null;
  text: string;
  created_at: string;
  updated_at: string;
  tags: string[];
  like_count: number;
  is_liked_by_current_user: boolean;
  saved_at: string;
}

interface UserProfile {
  bio: string;
  name: string;
  username: string;
  user_id: string;
  likes_count: number;
  followers_count: number;
  following_count: number;
  tweets: Tweet[];
  created_at: Date;
  is_followed_by_current_user: boolean;
}

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
  const { data, error } = await supabase.rpc("get_myprofile", {
    user_id: id,
  });

  console.log(data);

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
    gcTime: 0,
    enabled: enabled,
  });
};

export async function profileWithStats(username: string): Promise<UserProfile> {
  const { data, error } = await supabase.rpc(
    "get_userprofile_with_stats_by_username",
    {
      p_username: username,
    }
  );

  console.log(data);

  if (error) {
    console.error("Error fetching profile with stats:", error);
    throw error;
  }

  return data;
}

export function useProfileWithStats({ username }: { username: string }) {
  return useQuery({
    queryKey: ["profileWithStats", username],
    queryFn: () => profileWithStats(username),
    staleTime: 0,
    gcTime: 0,
    enabled: !!username, // Only run if id is truthy
  });
}

async function FetchSavedTweets(): Promise<{
  status: boolean;
  message: string;
  savedTweets: SavedTweet[];
}> {
  const { data } = await axios.get("/api/fetch-saved-tweets");

  return data;
}

export function useSavedTweets({
  id,
  enabled,
}: {
  id: string;
  enabled: boolean;
}) {
  return useQuery({
    queryKey: ["savedTweets", id],
    queryFn: () => FetchSavedTweets(),
    staleTime: 0,
    gcTime: 0,
    enabled, // Only run if id is truthy
  });
}
