"use client";

import LikeButton from "@/components/Like-comment/LikeButton";
import SaveButton from "@/components/Like-comment/SaveButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useSavedTweets } from "@/hooks/useAuth";
import { FullProfile } from "@/types/Types";
import { Separator } from "@radix-ui/react-separator";
import {
  Bookmark,
  Edit3,
  MessageCircle,
  MoreHorizontal,
  Share,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

export default function ProfileTabs({
  onTabChange,
  Profile,
  onEditModalChange,
  onDeleteModalChange,
  user_id,
}: {
  onTabChange: (change: string) => void;
  Profile: FullProfile;
  onEditModalChange: (
    change: boolean,
    value: {
      id: string;
      text: string;
      image_url: string;
    }
  ) => void;
  onDeleteModalChange: (
    change: boolean,
    value: {
      id: string;
      text: string;
      image_url: string;
    }
  ) => void;
  user_id: string;
}) {
  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const [activeTab, setActiveTab] = useState("Your Tweets");

  const { data, isPending } = useSavedTweets({
    id: user_id,
    enabled: activeTab === "Saved Tweets",
  });

  const savedTweets = useMemo(
    () => data?.savedTweets ?? [],
    [data?.savedTweets]
  );

  useEffect(() => {
    if (savedTweets) {
      console.log("SAVED TWEETS", savedTweets);
    }
  }, [savedTweets]);

  if (!Profile) return;

  return (
    <div>
      <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
        {["Your Tweets", "Saved Tweets", "Trending"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              onTabChange(tab);
              setActiveTab(tab);
            }}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-white text-orange-500 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab == "Your Tweets" && (
        <div className="space-y-4">
          {!Profile.tweets_with_counts ||
          Profile.tweets_with_counts.length === 0 ? (
            <Card className="bg-white rounded-2xl my-4 shadow-sm border-0">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Your feed is ready!
                </h3>
                <p className="text-gray-500 mb-6">
                  Start following people or create your first post to see
                  content here.
                </p>
                <div className="flex justify-center space-x-3">
                  <Link href="/post-tweet">
                    <Button className="bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white rounded-xl">
                      Create Your First Post
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="rounded-xl bg-transparent"
                  >
                    Discover People
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            Profile?.tweets_with_counts.map((tweet, index) => (
              <Link href={`tweet/${tweet.id}`} key={tweet.id || index}>
                <Card className="bg-white rounded-2xl my-4 shadow-sm border-0 hover:shadow-md transition-all duration-200 overflow-hidden group">
                  {tweet.image_url && (
                    <div className="relative overflow-hidden">
                      <img
                        src={tweet.image_url || "/placeholder.svg"}
                        alt={`Tweet image for: ${tweet.text.substring(0, 50)}...`}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <p className="text-gray-800 leading-relaxed">
                        {tweet.text}
                      </p>

                      <div className="flex justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem
                              onClick={(e: React.MouseEvent) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onEditModalChange(true, tweet);
                              }}
                            >
                              <Edit3 className="mr-2 h-4 w-4" />
                              Update Tweet
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e: React.MouseEvent) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onDeleteModalChange(true, tweet);
                              }}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Tweet
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                          <LikeButton
                            id={tweet.id}
                            user_id={user_id}
                            count={tweet.like_count}
                            likeState={tweet.liked_by_current_user}
                          />
                          <div className="flex items-center space-x-2 text-gray-500">
                            <MessageCircle className="h-4 w-4" />
                            <span className="text-sm">{tweet.reply_count}</span>
                          </div>
                        </div>
                        <time className="text-sm text-gray-500">
                          {formatDate(tweet.created_at)}
                        </time>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      )}

      {activeTab === "Saved Tweets" && (
        <div className="space-y-4">
          {isPending ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="w-full">
                  <CardHeader className="flex flex-row items-start space-y-0 pb-2">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="ml-3 space-y-1 flex-1">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-48 w-full rounded-lg" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <>
              {savedTweets && savedTweets?.length === 0 ? (
                <div className="text-center py-12">
                  <Bookmark className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No saved tweets yet
                  </h3>
                  <p className="text-muted-foreground">
                    When you save tweets, they will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedTweets?.map((tweet) => (
                    <Card
                      key={tweet.id}
                      className="w-full hover:bg-muted/50 transition-colors"
                    >
                      <CardHeader className="flex flex-row items-start space-y-0 pb-2">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={`/placeholder.svg?height=40&width=40`}
                          />
                          <AvatarFallback>
                            {tweet.profile_id.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-3 flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-sm truncate">
                              @{tweet.profile_id}
                            </p>
                            <span className="text-muted-foreground text-sm">
                              ·
                            </span>
                            <span className="text-muted-foreground text-sm">
                              {formatDate(tweet.created_at)}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 shrink-0"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </CardHeader>

                      <CardContent className="space-y-3">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {tweet.text}
                        </p>

                        {tweet.tags && tweet.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {tweet.tags.map((tag, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                              >
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {tweet.image_url && (
                          <div className="rounded-lg overflow-hidden border">
                            <img
                              src={
                                tweet.image_url ||
                                "/placeholder.svg?height=300&width=500"
                              }
                              alt="Tweet image"
                              width={500}
                              height={300}
                              className="w-full h-auto object-cover"
                            />
                          </div>
                        )}
                      </CardContent>

                      <CardFooter className="pt-2">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-6">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-muted-foreground hover:text-blue-600"
                            >
                              <MessageCircle className="h-4 w-4 mr-1" />
                              <span className="text-xs">
                                tweet.comment_count
                              </span>
                            </Button>

                            <LikeButton
                              count={tweet.like_count}
                              likeState={tweet.is_liked_by_current_user}
                              user_id={tweet.profile_id}
                              id={tweet.id}
                            />

                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-muted-foreground hover:text-green-600"
                            >
                              <Share className="h-4 w-4" />
                            </Button>
                          </div>

                          <SaveButton
                            state={tweet.is_liked_by_current_user}
                            id={tweet.id}
                          />
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
