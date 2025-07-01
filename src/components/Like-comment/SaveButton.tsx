"use client";

import { useAuth } from "@/hooks/useAuth";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const supabase = createClient();

export default function SaveButton({
  state,
  id,
  className,
}: {
  state: boolean;
  id: string;
  className?: string;
}) {
  const { user } = useAuth();
  const [loading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(state);

  const handleSave = async () => {
    if (!user) {
      toast("Please sign in to save tweets");
      return;
    }

    setIsSaved(true);

    setIsLoading(true);
    try {
      const { error } = await supabase.from("saved_tweets").insert({
        tweet_id: id,
        profile_id: user?.id,
      });

      console.log("SAVED");

      if (error) {
        // Handle specific error cases
        if (error.code === "23505") {
          // PostgreSQL unique violation
          toast("Tweet already saved!");
          setIsSaved(true); // Update state if it was already saved
          return;
        }
        throw error;
      }
      console.log("SAVED");

      setIsSaved(true);
      toast("Tweet saved successfully!");
    } catch (error) {
      toast("Error saving tweet");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnSave = async () => {
    if (!user) return;
    setIsSaved(false);
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("saved_tweets")
        .delete()
        .eq("tweet_id", id)
        .eq("profile_id", user?.id);

      if (error) {
        setIsSaved(true);
        throw error;
      }

      setIsSaved(false);
      toast("Tweet unsaved");
    } catch (error) {
      toast("Error unsaving tweet");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSaved) {
      handleUnSave();
    } else {
      handleSave();
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClick}
      disabled={loading}
      className={cn(
        "h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600 transition-colors",
        isSaved && "text-blue-600",
        className
      )}
      aria-label={isSaved ? "Unsave tweet" : "Save tweet"}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isSaved ? (
        <BookmarkCheck className="h-4 w-4 fill-current" />
      ) : (
        <Bookmark className="h-4 w-4" />
      )}
    </Button>
  );
}
