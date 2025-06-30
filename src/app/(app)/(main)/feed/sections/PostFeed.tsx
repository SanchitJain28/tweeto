"use client";

import LikeButton from "@/components/Like-comment/LikeButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Share, Bookmark, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export interface FeedTweet {
  id: string;
  text: string;
  username: string;
  created_at: string;
  profile_id: string;
  likes_count: number;
  replies_count: number;
  is_liked_by_current_user: boolean;
  image_url: string | null;
}

// Helper function to format time
function formatTimeAgo(dateString: string) {
  const now = new Date();
  const postDate = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;

  return postDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: postDate.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

export default function PostFeed({
  tweets,
  user_id,
}: {
  tweets: FeedTweet[];
  user_id: string;
}) {
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());

  const handleSave = (postId: string) => {
    setSavedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6">
      {tweets.map((post) => (
        <Link key={post.id} href={`/tweet/${post.id}`}>
          <Card
            className="group my-4 bg-white/90 backdrop-blur-md border border-slate-200/50 shadow-sm hover:shadow-lg sm:hover:shadow-xl sm:hover:shadow-slate-200/20 transition-all duration-300 sm:hover:-translate-y-1 rounded-xl sm:rounded-2xl overflow-hidden mx-2 sm:mx-0"
          >
            <CardContent className="p-0">
              <div className="p-3 sm:p-4 md:p-6">
                <div className="flex space-x-2 sm:space-x-3 md:space-x-4">
                  {/* Avatar - Mobile First */}
                  <Link
                    href={`/profile/${post.username}`}
                    className="flex-shrink-0"
                  >
                    <Avatar className="ring-1 ring-white shadow-sm hover:ring-purple-200 transition-all duration-200 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
                      <AvatarImage src={""} alt={`${post.username}'s avatar`} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 text-white font-semibold text-xs sm:text-sm md:text-base">
                        {post.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Link>

                  <div className="flex-1 min-w-0">
                    {/* Header - Mobile First */}
                    <div className="flex items-start justify-between mb-2 sm:mb-3">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 min-w-0 flex-1">
                        {/* Username and badge row */}
                        <div className="flex items-center space-x-1 sm:space-x-2 min-w-0">
                          <Link href={`/profile/${post.username}`}>
                            <h3 className="font-bold text-slate-900 hover:text-purple-600 cursor-pointer text-sm sm:text-base transition-colors duration-200 truncate">
                              {post.username}
                            </h3>
                          </Link>
                          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-1.5 py-0.5 sm:px-2 rounded-full shadow-sm flex-shrink-0">
                            ✓
                          </Badge>
                        </div>
                        {/* Handle and time row */}
                        <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-slate-500">
                          <span className="truncate">@{post.username}</span>
                          <span>•</span>
                          <span className="flex-shrink-0">
                            {formatTimeAgo(post.created_at)}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-60 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full p-1.5 sm:p-2 flex-shrink-0 ml-2"
                      >
                        <MoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </div>

                    {/* Content - Mobile First */}
                    <div className="mb-3 sm:mb-4">
                      <p className="text-slate-800 leading-relaxed text-sm sm:text-base whitespace-pre-wrap break-words">
                        {post.text}
                      </p>
                    </div>

                    {/* Image - Mobile First */}
                    {post.image_url && (
                      <div className="mb-3 sm:mb-4 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden bg-slate-100">
                        <img
                          src={post.image_url || "/placeholder.svg"}
                          alt="Post attachment"
                          className="w-full max-h-64 sm:max-h-80 md:max-h-96 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                          loading="lazy"
                        />
                      </div>
                    )}

                    {/* Action Buttons - Mobile First */}
                    <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-slate-100/80">
                      <div className="flex items-center space-x-0 sm:space-x-1">
                        {/* Comment Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-full px-2 py-1.5 sm:px-3 sm:py-2 transition-all duration-200 group/btn min-w-0"
                          aria-label={`${post.replies_count} replies`}
                        >
                          <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 sm:mr-2 group-hover/btn:scale-110 transition-transform duration-200 flex-shrink-0" />
                          <span className="text-xs sm:text-sm font-medium hidden sm:inline">
                            {post.replies_count > 0 ? post.replies_count : ""}
                          </span>
                          {/* Mobile: Show count next to icon */}
                          {post.replies_count > 0 && (
                            <span className="text-xs font-medium ml-1 sm:hidden">
                              {post.replies_count}
                            </span>
                          )}
                        </Button>

                        {/* Like Button */}
                        <div className="flex-shrink-0">
                          <LikeButton
                            likeState={post.is_liked_by_current_user}
                            id={post.id}
                            user_id={user_id}
                            count={post.likes_count}
                          />
                        </div>

                        {/* Share Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-slate-600 hover:text-green-600 hover:bg-green-50 rounded-full px-2 py-1.5 sm:px-3 sm:py-2 transition-all duration-200 group/btn"
                          aria-label="Share post"
                        >
                          <Share className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover/btn:scale-110 transition-transform duration-200" />
                        </Button>
                      </div>

                      {/* Save Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSave(post.id)}
                        className={`rounded-full px-2 py-1.5 sm:px-3 sm:py-2 transition-all duration-200 group/btn flex-shrink-0 ${
                          savedPosts.has(post.id)
                            ? "text-amber-600 bg-amber-50 hover:bg-amber-100"
                            : "text-slate-600 hover:text-amber-600 hover:bg-amber-50"
                        }`}
                        aria-label={
                          savedPosts.has(post.id)
                            ? "Remove from saved"
                            : "Save post"
                        }
                      >
                        <Bookmark
                          className={`h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover/btn:scale-110 transition-all duration-200 ${
                            savedPosts.has(post.id) ? "fill-current" : ""
                          }`}
                        />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
