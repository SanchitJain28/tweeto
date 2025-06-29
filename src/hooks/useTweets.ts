import { Tweet } from "@/types/Types";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

const supabase = createClient();

async function FetchSingleTweet(id: string): Promise<Tweet> {
  try {
    const { data, error } = await supabase.rpc("get_tweet_with_details", {
      tweet_id: id,
    });

    if (error) {
      console.log(error);
      throw error;
    }
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function useTweet({ id }: { id: string }) {
  return useQuery<Tweet>({
    queryKey: ["tweet", id],
    queryFn: () => FetchSingleTweet(id),
    staleTime: 0,
    gcTime: 0,
  });
}

export async function FetchTweets(): Promise<Tweet[]> {
  try {
    const { data, error } = await supabase.from("tweets").select("*").limit(50);

    if (error) {
      console.log(error);
      throw error;
    }
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function useTweets() {
  return useQuery<Tweet[]>({
    queryKey: ["tweets"],
    queryFn: FetchTweets,
    staleTime: 0,
    gcTime: 0,
  });
}
