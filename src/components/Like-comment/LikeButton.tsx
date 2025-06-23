import React, { useState, useCallback, useMemo } from "react";
import { Heart, HeartOff } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

const supabase = createClient();

interface LikeButtonProps {
  id: string;
  user_id: string;
  count?: number;
  likeState: boolean;
}

export default function LikeButton({
  id,
  user_id,
  count = 0,
  likeState,
}: LikeButtonProps) {
  const queryClient = useQueryClient();

  const [isLiked, setIsLiked] = useState(likeState);
  const [likeCount, setLikeCount] = useState(count);
  const [isLoading, setIsLoading] = useState(false);

  // Memoize button styles to prevent recalculation on every render
  const buttonStyles = useMemo(
    () => ({
      base: "group relative inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
      liked:
        "bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg shadow-pink-500/25 focus:ring-pink-500/30",
      unliked:
        "bg-white text-gray-700 border-2 border-gray-200 hover:border-pink-300 shadow-md hover:shadow-lg focus:ring-gray-300/30",
    }),
    []
  );

  const handleLike = useCallback(async () => {
    try {
      const { error } = await supabase.from("tweet_likes").insert({
        tweet_id: id,
        profile_id: user_id,
      });

      if (error) {
        console.error("Like error:", error);
        toast.error("Error liking the post");
        return false;
      }
      return true;
    } catch (error) {
      console.error("Like error:", error);
      toast.error("Error liking the post");
      return false;
    }
  }, [id, user_id]);

  const handleDislike = useCallback(async () => {
    try {
      const { error } = await supabase
        .from("tweet_likes")
        .delete()
        .eq("tweet_id", id) // Fixed: should be tweet_id, not id
        .eq("profile_id", user_id);

      if (error) {
        console.error("Dislike error:", error);
        toast.error("Error removing like");
        return false;
      }
      return true;
    } catch (error) {
      console.error("Dislike error:", error);
      toast.error("Error removing like");
      return false;
    }
  }, [id, user_id]);

  const handleToggle = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (isLoading) return;

      setIsLoading(true);

      // Optimistic update
      const newLikedState = !isLiked;
      const newCount = newLikedState ? likeCount + 1 : likeCount - 1;

      setIsLiked(newLikedState);
      setLikeCount(newCount);

      try {
        const success = newLikedState
          ? await handleLike()
          : await handleDislike();

        queryClient.invalidateQueries({ queryKey: ["FullProfile", user_id] });

        if (!success) {
          // Revert optimistic update on failure
          setIsLiked(isLiked);
          setLikeCount(likeCount);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [isLiked, likeCount, isLoading, handleLike, handleDislike, likeState]
  );

  // Memoize formatted count to prevent recalculation
  const formattedCount = useMemo(() => likeCount.toLocaleString(), [likeCount]);

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={`${buttonStyles.base} ${isLiked ? buttonStyles.liked : buttonStyles.unliked}`}
      aria-label={`${isLiked ? "Unlike" : "Like"} this post (${formattedCount} likes)`}
    >
      <div className="relative">
        {isLiked ? (
          <Heart size={20} className="fill-current animate-pulse" />
        ) : (
          <HeartOff
            size={20}
            className="group-hover:text-pink-500 transition-colors duration-200"
          />
        )}

        {/* Animated ring effect when liked */}
        {isLiked && (
          <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
        )}
      </div>

      <div className="flex items-center gap-2">
        <span className="font-semibold">
          {isLoading ? "..." : isLiked ? "Liked" : "Like"}
        </span>

        {/* Count with smooth animation */}
        <span
          className={`px-2 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
            isLiked
              ? "bg-white/20 text-white"
              : "bg-gray-100 text-gray-600 group-hover:bg-pink-100 group-hover:text-pink-600"
          }`}
        >
          {formattedCount}
        </span>
      </div>

      {/* Sparkle effect */}
      {isLiked && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-bounce opacity-80" />
      )}
    </button>
  );
}
