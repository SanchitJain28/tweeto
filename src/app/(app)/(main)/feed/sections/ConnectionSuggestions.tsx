"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPlus, X } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import FollowButton from "@/components/Like-comment/FollowButton";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";

interface ConnectionSuggestionsProps {
  profiles: RecommendedProfile[];
  nextCursor?: number;
}

interface RecommendedProfile {
  id: string;
  username: string;
  is_followed_by_current_user: boolean;
}

const supabase = createClient();

export default function ConnectionSuggestions() {
  const [dismissedProfiles, setDismissedProfiles] = useState<Set<string>>(
    new Set()
  );

  const fetchSuggestions = async ({
    pageParam = 0,
  }): Promise<ConnectionSuggestionsProps> => {
    try {
      const { data, error } = await supabase.rpc("get_profile_suggestions", {
        limit_count: 10,
        offset_count: pageParam,
      });

      if (error) {
        console.error("Error fetching profile suggestions:", error);
        throw new Error(error.message || "Failed to fetch suggestions");
      }

      console.log("Suggestions:", data);

      return {
        profiles: data || [],
        nextCursor: data && data.length === 10 ? pageParam + 10 : undefined,
      };
    } catch (error) {
      console.error("Error in fetchSuggestions:", error);
      throw error;
    }
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["suggestions"],
      queryFn: fetchSuggestions,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  // Flatten all pages and filter out dismissed profiles
  const allSuggestions = data?.pages.flatMap((page) => page.profiles) || [];

  
  const filteredSuggestions = allSuggestions.filter(
    (profile) => !dismissedProfiles.has(profile.id)
  );

  const handleDismissProfile = (profileId: string) => {
    setDismissedProfiles((prev) => new Set([...prev, profileId]));
  };

  const handleShowMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (status === "pending") {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-slate-800 flex items-center">
            <UserPlus className="mr-2 h-5 w-5 text-purple-600" />
            Who to follow
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-sm text-slate-500">Loading suggestions...</div>
        </CardContent>
      </Card>
    );
  }

  if (status === "error") {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-slate-800 flex items-center">
            <UserPlus className="mr-2 h-5 w-5 text-purple-600" />
            Who to follow
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-sm text-red-500">
            Failed to load suggestions. Please try again.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center">
          <UserPlus className="mr-2 h-5 w-5 text-purple-600" />
          Who to follow
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
          <div className="space-y-1 p-4">
            {filteredSuggestions.length === 0 ? (
              <div className="text-sm text-slate-500 text-center py-4">
                No suggestions available
              </div>
            ) : (
              filteredSuggestions.map((profile) => (
                <Link href={`/profile/${profile.username}`} key={profile.id}>
                  <div className="flex items-start justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex items-start space-x-3 flex-1">
                      <Avatar className="h-12 w-12 flex-shrink-0">
                        <AvatarImage
                          src={`/placeholder.svg?height=48&width=48`}
                          alt={profile.username}
                        />
                        <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                          {profile.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col space-y-2 flex-1 min-w-0">
                        <div>
                          <p className="text-sm font-medium text-slate-900 truncate">
                            @{profile.username}
                          </p>
                          <p className="text-xs text-slate-500">
                            Suggested for you
                          </p>
                        </div>
                        <FollowButton
                          className="p-2 text-xs rounded-lg"
                          user_id={profile.id}
                          isFollowing={profile.is_followed_by_current_user}
                        />
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0 text-slate-400 hover:text-slate-600 flex-shrink-0 ml-2"
                      onClick={() => handleDismissProfile(profile.id)}
                      aria-label={`Dismiss ${profile.username}`}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
        {(filteredSuggestions.length > 5 || hasNextPage) && (
          <div className="p-4 pt-2 border-t border-slate-100">
            <Button
              variant="ghost"
              className="w-full text-sm text-purple-600 hover:text-purple-700 hover:bg-purple-50"
              onClick={handleShowMore}
              disabled={isFetchingNextPage || !hasNextPage}
            >
              {isFetchingNextPage ? "Loading..." : "Show more suggestions"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
