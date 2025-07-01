"use client";

import { useAuth } from "@/hooks/useAuth";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { Heart, UserPlus, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const supabase = createClient();

export default function FollowButton({
  user_id,
  isFollowing,
  className,
}: {
  user_id: string;
  isFollowing: boolean;
  className?: string;
}) {
  const { user } = useAuth();
  const [state, setState] = useState<boolean>(isFollowing);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFollow = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    setState(true);

    try {
      const { data, error } = await supabase.from("followers").insert({
        following: user_id,
        followed_by: user?.id,
      });

      console.log(data);

      if (error) {
        console.error("Follow error:", error);
        setState(false);
        return false;
      }
    } catch (error) {
      console.log(error);
      setState(false);
    } finally {
      setLoading(false);
    }
  };

  const handleUnFollow = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setState(false);
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("followers")
        .delete()
        .eq("following", user_id)
        .eq("followed_by", user?.id);

      if (error) {
        console.error("Unfollow error:", error);
        setState(true);
        return false;
      }

      console.log(data);
    } catch (error) {
      console.log(error);
      setState(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      disabled={loading}
      onClick={state ? handleUnFollow : handleFollow}
      className={cn(
        `group relative overflow-hidden ${className} px-6 py-2.5 font-semibold transition-all duration-300 ease-out`,
        "transform hover:scale-105 active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100",
        state
          ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg hover:shadow-xl focus:ring-red-500"
          : "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl focus:ring-blue-500"
      )}
    >
      {/* Background animation */}
      <div
        className={cn(
          "absolute inset-0 transition-transform duration-300 ease-out",
          state
            ? "bg-gradient-to-r from-red-600 to-pink-600 translate-y-full group-hover:translate-y-0"
            : "bg-gradient-to-r from-blue-600 to-purple-700 translate-y-full group-hover:translate-y-0"
        )}
      />

      {/* Content */}
      <div className="relative flex items-center justify-center gap-2">
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="transition-opacity duration-200">
              {state ? "Unfollowing..." : "Following..."}
            </span>
          </>
        ) : (
          <>
            <div className="relative">
              {state ? (
                <Heart
                  className={cn(
                    "h-4 w-4 transition-all duration-300",
                    "fill-current transform group-hover:scale-110"
                  )}
                />
              ) : (
                <UserPlus
                  className={cn(
                    "h-4 w-4 transition-all duration-300",
                    "transform group-hover:scale-110 group-hover:rotate-12"
                  )}
                />
              )}
            </div>
            <span className="transition-all duration-200 group-hover:tracking-wide">
              {state ? "Following" : "Follow"}
            </span>
          </>
        )}
      </div>

      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-full opacity-0 group-active:opacity-20 group-active:animate-ping bg-white" />
    </button>
  );
}
