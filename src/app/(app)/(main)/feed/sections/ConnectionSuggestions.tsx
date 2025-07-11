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

  const renderHorizontally = () => {
    return (
      <div className="">
        <p className="text-lg my-2 text-zinc-400 font-bold">
          Profile Suggestions
        </p>
        <div className="bg-white/80 border-2 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
          <div className="p-0">
            <div className="flex items-center">
              {/* Horizontal scrollable suggestions */}
              <div className="flex-1 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                <div className="flex gap-0">
                  {filteredSuggestions.map((profile, index) => (
                    <div
                      key={index}
                      className={`flex-shrink-0 ${
                        index !== filteredSuggestions.length - 1
                          ? " border-slate-200"
                          : ""
                      }`}
                    >
                      <Link
                        href={`/profile/${profile.username}`}
                        className="block"
                      >
                        <div className="relative group p-4 hover:bg-slate-50 transition-colors duration-200 w-48">
                          {/* Dismiss button - shows on hover */}
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-slate-400 hover:text-slate-600 hover:bg-white/80"
                            aria-label={`Dismiss ${profile.username}`}
                          >
                            <X className="h-3 w-3" />
                          </Button>

                          <div className="flex flex-col items-center space-y-3">
                            {/* Avatar */}
                            <Avatar className="h-16 w-16 ring-2 ring-white shadow-md">
                              <AvatarImage
                                src={`/placeholder.svg?height=64&width=64`}
                                alt={profile.username}
                              />
                              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg font-semibold">
                                {profile.username.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>

                            {/* User info */}
                            <div className="text-center space-y-1 w-full">
                              <p className="text-sm font-semibold text-slate-900 truncate">
                                {profile.username || `@${profile.username}`}
                              </p>
                              {profile.username && (
                                <p className="text-xs text-slate-500 truncate">
                                  @{profile.username}
                                </p>
                              )}
                            </div>

                            {/* Follow button */}
                            <FollowButton
                              className="w-full text-xs py-1.5 px-3 rounded-full font-medium transition-all duration-200"
                              user_id={profile.id}
                              isFollowing={profile.is_followed_by_current_user}
                            />
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}

                  {/* Show more button - placed at the end of results */}
                  {hasNextPage && (
                    <div className="flex  justify-center border-slate-200">
                      <div className="p-4 flex items-center justify-center ">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-12 w-12 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-700 transition-all duration-200 disabled:opacity-50"
                          onClick={handleShowMore}
                          disabled={isFetchingNextPage}
                          aria-label="Load more suggestions"
                        >
                          {isFetchingNextPage ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-slate-400 border-t-transparent" />
                          ) : (
                            <Plus className="h-10 w-10" />
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderVertically = () => {
    return (
      <div>
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
                    <Link
                      href={`/profile/${profile.username}`}
                      key={profile.id}
                    >
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
      </div>
    );
  };

  return (
    <div className="">
      {isHorizontal ? renderHorizontally() : renderVertically()}
    </div>
  );
}
