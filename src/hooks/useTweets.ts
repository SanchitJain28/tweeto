import { FeedTweet } from "@/app/(app)/(main)/feed/sections/PostFeed";
import { Tweet } from "@/types/Types";
import { createClient } from "@/utils/supabase/client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const supabase = createClient();

interface recommended_profiles {
  id: string;
  username: string;
}

interface FeedPage {
  tweets: FeedTweet[];
  recommended_profiles: recommended_profiles[];
  nextCursor?: number;
  hasMore: boolean;
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

export async function fetchFeedPage({
  pageParam = 0,
  pageSize = 10,
}: {
  pageParam?: number;
  pageSize?: number;
}): Promise<FeedPage> {
  try {
    const { data, error } = await supabase.rpc("get_feed_by_user_id", {
      p_page_count: pageSize,
      p_offset: pageParam,
    });

    if (error) {
      console.error("Error fetching feed:", error);
      throw new Error(error.message || "Failed to fetch feed");
    }

    // Validate the response structure
    if (!data) {
      throw new Error("No data returned from feed query");
    }

    const tweets = data?.tweets ?? [];
    const recommended_profiles = data?.recommended_profiles ?? [];

    return {
      tweets,
      recommended_profiles,
      nextCursor: tweets.length === pageSize ? pageParam + pageSize : undefined,
      hasMore: tweets.length === pageSize,
    };
  } catch (error) {
    console.error("Error in fetchFeedPage:", error);
    throw error;
  }
}

export function useFeed(pageSize: number = 10) {
  return useInfiniteQuery<FeedPage>({
    queryKey: ["feed", pageSize],
    queryFn: ({ pageParam }) =>
      fetchFeedPage({
        pageParam: pageParam as number,
        pageSize,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: 1000 * 60 * 5, // 5 minutes - adjust as needed
    gcTime: 1000 * 60 * 10, // 10 minutes - adjust as needed
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

export function useFeedData() {
  const query = useFeed();

  const allTweets = query.data?.pages.flatMap((page) => page.tweets) ?? [];
  const recommendedProfiles = query.data?.pages[0]?.recommended_profiles ?? [];

  return {
    ...query,
    tweets: allTweets,
    recommendedProfiles,
    totalTweets: allTweets.length,
  };
}
