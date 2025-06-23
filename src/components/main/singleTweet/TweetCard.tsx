"use client";

import type React from "react";
import { useState } from "react";
import {
  MessageCircle,
  Share,
  MoreHorizontal,
  Send,
  ImageIcon,
  Smile,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";
import { Comment, Tweet } from "@/types/Types";
import LikeButton from "@/components/Like-comment/LikeButton";
import { CommentItem } from "@/components/Like-comment/CommentItem";
import { createClient } from "@/utils/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";

interface TweetCardProps {
  tweet: Tweet;
}

const supabase = createClient();

export const TweetCard: React.FC<TweetCardProps> = ({ tweet }) => {
  const [showComments, setShowComments] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [tweetData, setTweetData] = useState<Tweet>(tweet);

  // Mock user - replace with your actual auth hook
  const { user, loading } = useAuth();

  const timeAgo = formatDistanceToNow(new Date(tweet.created_at), {
    addSuffix: true,
  });

  const handleUiUpdate = (comment: Comment) => {
  setTweetData((prev) => {
    const updatedComments = [...(prev.comments || []), comment];
    return { ...prev, comments: updatedComments };
  });
};

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.from("tweet_replies").insert({
        tweet_id: tweet.id,
        profile_id: user?.id,
        text: newComment,
      });
      if (error) {
        console.log(error);
        toast("Error posting the comment");
      }
      handleUiUpdate({
        user_id: user?.id || "",
        text: newComment,
        created_at: new Date(),
      });
      console.log("succesfully commented");
      console.log(data, error);
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSubmitComment(e);
    }
  };

  if (!user) return;

  if (loading) return;

  console.log(user)

  return (
    <Card className="max-w-2xl mx-auto shadow-sm hover:shadow-md transition-all duration-200 border-0 bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-start space-x-3">
          <Avatar className="w-12 h-12 ring-2 ring-background shadow-sm">
            <AvatarImage src={`/placeholder.svg?height=48&width=48`} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
              {tweetData.profile_id.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-foreground">
                User {tweetData.user_name}
              </h3>
              <span className="text-muted-foreground text-sm">
                @user{tweetData.user_name}
              </span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground text-sm">{timeAgo}</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Tweet Content */}
        <div className="mb-4">
          <p className="text-foreground leading-relaxed whitespace-pre-wrap text-[15px]">
            {tweetData.text}
          </p>
          {tweetData.image_url && (
            <div className="mt-4 rounded-2xl overflow-hidden border">
              <img
                src={tweetData.image_url || "/placeholder.svg"}
                alt="Tweet image"
                className="w-full h-auto max-h-96 object-cover"
              />
            </div>
          )}
        </div>

        {/* Tweet Actions */}
        <div className="flex items-center justify-between py-2 max-w-md">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 text-muted-foreground hover:text-blue-600 transition-colors group"
          >
            <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">
              {tweetData.comments.length}
            </span>
          </Button>

          <LikeButton
            count={tweetData.like_count}
            id={tweetData.id}
            user_id={user.id}
            likeState={tweetData.liked_by_current_user}
          />

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 text-muted-foreground hover:text-green-600 transition-colors group"
          >
            <div className="p-2 rounded-full group-hover:bg-green-50 transition-colors">
              <Share className="w-5 h-5" />
            </div>
          </Button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <>
            <Separator className="my-4" />

            {/* Add Comment Form */}
            <form onSubmit={handleSubmitComment} className="mb-6">
              <div className="flex items-start space-x-3">
                <Avatar className="w-10 h-10 ring-2 ring-background shadow-sm">
                  <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                  <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-600 text-white font-semibold">
                    ME
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <Textarea
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="min-h-[80px] resize-none border-0 bg-muted/50 focus:bg-background transition-colors"
                    disabled={isSubmitting}
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-blue-600"
                      >
                        <ImageIcon className="w-4 h-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-yellow-600"
                      >
                        <Smile className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">
                        {newComment.length}/280
                      </span>
                      <Button
                        type="submit"
                        size="sm"
                        disabled={!newComment.trim() || isSubmitting}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-medium transition-colors disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-1" />
                            Reply
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Press Cmd+Enter to post
                  </p>
                </div>
              </div>
            </form>

            {/* Comments List */}
            {tweet.comments.length > 0 && (
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Comments ({tweetData.comments.length})
                </h4>
                <div className="space-y-1">
                  {tweetData.comments.map((comment, index) => (
                    <CommentItem
                      key={index}
                      comment={{
                        ...comment,
                        created_at:
                          typeof comment.created_at === "string"
                            ? comment.created_at
                            : comment.created_at.toISOString(),
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
