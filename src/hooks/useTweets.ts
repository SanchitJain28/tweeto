import { FeedTweet } from "@/app/(app)/(main)/feed/sections/PostFeed";
import { Tweet } from "@/types/Types";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

const supabase = createClient();

interface recommended_profiles {
  id: string
  username: string
}

interface Feed {
  recommended_profiles : recommended_profiles[]
  tweets : FeedTweet[]
}

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

export async function FetchTweets(): Promise<Feed> {
  try {
    const { data, error } = await supabase.rpc("get_feed_by_user_id", {
      p_page_count: 10, // Number of tweets to fetch
      p_offset: 20, // Skip the first 20 tweets (page 3)
    });

    if (error) {
      console.error("Error fetching feed:", error);
      throw error;
    } 

    // Assume the RPC returns an object with 'tweets' and 'recommended_profiles' properties.
    // If not, adjust the mapping accordingly.
    return {
      tweets: data?.tweets ?? [],
      recommended_profiles: data?.recommended_profiles ?? []
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function useFeed() {
  return useQuery<Feed>({
    queryKey: ["tweets"],
    queryFn: () => FetchTweets(),
    staleTime: 0,
    gcTime: 0,
  });
}

// async function getPersonalizedFeed(id:string) {
//   const {} = await supabase
// }
