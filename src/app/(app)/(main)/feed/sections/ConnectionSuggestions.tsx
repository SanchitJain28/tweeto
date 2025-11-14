"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, UserPlus, X } from "lucide-react";
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

export default function ConnectionSuggestions({
  isHorizontal = false,
}: {
  isHorizontal?: boolean;
}) {
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
      <Card className="bg-white border border-gray-200 shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-gray-900 flex items-center">
            <UserPlus className="mr-2 h-4 w-4 text-gray-700" />
            Who to follow
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-xs text-gray-500">Loading suggestions...</div>
        </CardContent>
      </Card>
    );
  }

  if (status === "error") {
    return (
      <Card className="bg-white border border-gray-200 shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-gray-900 flex items-center">
            <UserPlus className="mr-2 h-4 w-4 text-gray-700" />
            Who to follow
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-xs text-red-600">
            Failed to load suggestions. Please try again.
          </div>
        </CardContent>
      </Card>
    );
  }

  const renderHorizontally = () => {
    return (
      <div>
        <p className="text-sm font-semibold text-gray-900 mb-3">
          Profile Suggestions
        </p>
        <div className="bg-white border border-gray-200 rounded-lg shadow-none overflow-hidden">
          <div className="flex items-center overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {filteredSuggestions.map((profile, index) => (
              <Link
                href={`/profile/${profile.username}`}
                key={index}
                className="flex-shrink-0 border-r border-gray-200 last:border-r-0"
              >
                <div className="relative group p-4 hover:bg-gray-50 transition-colors w-44">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDismissProfile(profile.id);
                    }}
                    aria-label={`Dismiss ${profile.username}`}
                  >
                    <X className="h-3 w-3" />
                  </Button>

                  <div className="flex flex-col items-center space-y-2">
                    <Avatar className="h-12 w-12 ring-2 ring-white">
                      <AvatarImage
                        src={`/generic-placeholder-icon.png?height=48&width=48`}
                        alt={profile.username}
                      />
                      <AvatarFallback className="bg-gray-200 text-gray-900 font-semibold text-sm">
                        {profile.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="text-center space-y-1 w-full">
                      <p className="text-xs font-semibold text-gray-900 truncate">
                        {profile.username}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        @{profile.username}
                      </p>
                    </div>

                    <FollowButton
                      className="w-full text-xs py-1 px-2 rounded-full font-medium"
                      user_id={profile.id}
                      isFollowing={profile.is_followed_by_current_user}
                    />
                  </div>
                </div>
              </Link>
            ))}

            {hasNextPage && (
              <div className="flex-shrink-0 border-l border-gray-200">
                <div className="p-4 flex items-center justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 disabled:opacity-50"
                    onClick={handleShowMore}
                    disabled={isFetchingNextPage}
                    aria-label="Load more suggestions"
                  >
                    {isFetchingNextPage ? (
                      <div className="animate-spin rounded-full h-3 w-3 border-2 border-gray-400 border-t-transparent" />
                    ) : (
                      <Plus className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderVertically = () => {
    return (
      <Card className="bg-white border border-gray-200 shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-gray-900 flex items-center">
            <UserPlus className="mr-2 h-4 w-4 text-gray-700" />
            Who to follow
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <div className="divide-y divide-gray-200 p-2">
              {filteredSuggestions.length === 0 ? (
                <div className="text-xs text-gray-500 text-center py-4">
                  No suggestions available
                </div>
              ) : (
                filteredSuggestions.map((profile) => (
                  <Link href={`/profile/${profile.username}`} key={profile.id}>
                    <div className="flex items-start justify-between p-2 rounded hover:bg-gray-50 transition-colors">
                      <div className="flex items-start space-x-2 flex-1 min-w-0">
                        <Avatar className="h-10 w-10 flex-shrink-0 mt-0.5">
                          <AvatarImage
                            src={`/generic-placeholder-graphic.png?height=40&width=40`}
                            alt={profile.username}
                          />
                          <AvatarFallback className="bg-gray-200 text-gray-900 text-xs font-semibold">
                            {profile.username.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col space-y-1 flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-900 truncate">
                            @{profile.username}
                          </p>
                          <p className="text-xs text-gray-500">
                            Suggested for you
                          </p>
                          <FollowButton
                            className="p-1 text-xs rounded-full w-fit"
                            user_id={profile.id}
                            isFollowing={profile.is_followed_by_current_user}
                          />
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600 flex-shrink-0 ml-1"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDismissProfile(profile.id);
                        }}
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
            <div className="p-3 border-t border-gray-200">
              <Button
                variant="ghost"
                className="w-full text-xs text-gray-700 hover:text-gray-900 hover:bg-gray-50 font-medium"
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
  };

  return <div>{isHorizontal ? renderHorizontally() : renderVertically()}</div>;
}
