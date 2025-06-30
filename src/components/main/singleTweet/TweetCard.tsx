"use client"

import type React from "react"
import { useState } from "react"
import { MessageCircle, Share, MoreHorizontal, Send, ImageIcon, Smile, Bookmark, BookmarkCheck } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import type { Comment, Tweet } from "@/types/Types"
import LikeButton from "@/components/Like-comment/LikeButton"
import { CommentItem } from "@/components/Like-comment/CommentItem"
import { createClient } from "@/utils/supabase/client"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "react-toastify"

interface TweetCardProps {
  tweet: Tweet
}

const supabase = createClient()

export const TweetCard: React.FC<TweetCardProps> = ({ tweet }) => {
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [tweetData, setTweetData] = useState<Tweet>(tweet)
  const [isSaved, setIsSaved] = useState(false)

  const { user, loading } = useAuth()

  const timeAgo = formatDistanceToNow(new Date(tweet.created_at), {
    addSuffix: true,
  })

  const handleUiUpdate = (comment: Comment) => {
    setTweetData((prev) => {
      const updatedComments = [...(prev.comments || []), comment]
      return { ...prev, comments: updatedComments }
    })
    setNewComment("")
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || isSubmitting || !user) return

    setIsSubmitting(true)

    try {
      const { error } = await supabase.from("tweet_replies").insert({
        tweet_id: tweet.id,
        profile_id: user.id,
        text: newComment.trim(),
      })

      if (error) {
        toast.error("Failed to post comment. Please try again.")
        return
      }

      handleUiUpdate({
        user_id: user.id,
        text: newComment.trim(),
        created_at: new Date(),
      })

      toast.success("Comment posted successfully!")
    } catch (error) {
      console.error("Error submitting comment:", error)
      toast.error("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSaveTweet = async () => {
    if (!user || isSaving) return

    setIsSaving(true)

    try {
      if (isSaved) {
        // Remove from saved tweets
        const { error } = await supabase.from("saved_tweets").delete().eq("tweet_id", tweet.id).eq("user_id", user.id)

        if (error) {
          toast.error("Failed to remove tweet from saved items.")
          return
        }

        setIsSaved(false)
        toast.success("Tweet removed from saved items.")
      } else {
        // Add to saved tweets
        const { error } = await supabase.from("saved_tweets").insert({
          tweet_id: tweet.id,
          user_id: user.id,
        })

        if (error) {
          toast.error("Failed to save tweet.")
          return
        }

        setIsSaved(true)
        toast.success("Tweet saved successfully!")
      }
    } catch (error) {
      console.error("Error saving tweet:", error)
      toast.error("An unexpected error occurred. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSubmitComment(e)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Tweet by ${tweetData.user_name}`,
          text: tweetData.text,
          url: window.location.href,
        })
      } catch (error) {
        console.log(error)
        // User cancelled sharing
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href)
        toast.success("Link copied to clipboard!")
      } catch (error) {
        console.log(error)
        toast.error("Failed to copy link.")
      }
    }
  }

  if (loading) {
    return (
      <Card className="max-w-2xl mx-auto shadow-sm border-0 bg-card animate-pulse">
        <CardHeader className="pb-3">
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 bg-muted rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded w-1/3" />
              <div className="h-3 bg-muted rounded w-1/4" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-32 bg-muted rounded-2xl" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!user) return null

  const commentCount = tweetData.comments?.length || 0
  const isCommentLimitReached = newComment.length > 280

  return (
    <Card className="max-w-2xl mx-auto shadow-sm hover:shadow-md transition-all duration-300 border-0 bg-card group">
      <CardHeader className="pb-3">
        <div className="flex items-start space-x-3">
          <Avatar className="w-12 h-12 ring-2 ring-background shadow-sm transition-transform group-hover:scale-105">
            <AvatarImage src={`/placeholder.svg?height=48&width=48`} alt={`${tweetData.user_name}'s avatar`} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
              {tweetData.user_name?.slice(0, 2).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 flex-wrap">
              <h3 className="font-semibold text-foreground hover:underline cursor-pointer">
                {tweetData.user_name || "Anonymous User"}
              </h3>
              <span className="text-muted-foreground text-sm">
                @{tweetData.user_name?.toLowerCase().replace(/\s+/g, "") || "anonymous"}
              </span>
              <span className="text-muted-foreground">·</span>
              <time className="text-muted-foreground text-sm" dateTime={typeof tweetData.created_at === "string" ? tweetData.created_at : tweetData.created_at.toISOString()}>
                {timeAgo}
              </time>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="More options"
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Tweet Content */}
        <div className="mb-4">
          <p className="text-foreground leading-relaxed whitespace-pre-wrap text-[15px] mb-3">{tweetData.text}</p>
          {tweetData.image_url && (
            <div className="mt-4 rounded-2xl overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
              <img
                src={tweetData.image_url || "/placeholder.svg"}
                alt="Tweet attachment"
                className="w-full h-auto max-h-96 object-cover"
                loading="lazy"
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
            className="flex items-center space-x-2 text-muted-foreground hover:text-blue-600 transition-colors group/comment"
            aria-label={`${showComments ? "Hide" : "Show"} comments`}
          >
            <div className="p-2 rounded-full group-hover/comment:bg-blue-50 transition-colors">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">{commentCount}</span>
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
            onClick={handleShare}
            className="flex items-center space-x-2 text-muted-foreground hover:text-green-600 transition-colors group/share"
            aria-label="Share tweet"
          >
            <div className="p-2 rounded-full group-hover/share:bg-green-50 transition-colors">
              <Share className="w-5 h-5" />
            </div>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleSaveTweet}
            disabled={isSaving}
            className="flex items-center space-x-2 text-muted-foreground hover:text-amber-600 transition-colors group/save"
            aria-label={isSaved ? "Remove from saved" : "Save tweet"}
          >
            <div className="p-2 rounded-full group-hover/save:bg-amber-50 transition-colors">
              {isSaving ? (
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : isSaved ? (
                <BookmarkCheck className="w-5 h-5 text-amber-600" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
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
                  <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt="Your avatar" />
                  <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-600 text-white font-semibold">
                    {user.email?.slice(0, 2).toUpperCase() || "ME"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <div className="relative">
                    <Textarea
                      placeholder="Write a thoughtful comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="min-h-[80px] resize-none border-0 bg-muted/50 focus:bg-background transition-colors pr-16"
                      disabled={isSubmitting}
                      maxLength={300}
                      aria-describedby="comment-help"
                    />
                    <div className="absolute bottom-2 right-2">
                      <Badge variant={isCommentLimitReached ? "destructive" : "secondary"} className="text-xs">
                        {newComment.length}/280
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-blue-600"
                        aria-label="Add image"
                      >
                        <ImageIcon className="w-4 h-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-yellow-600"
                        aria-label="Add emoji"
                      >
                        <Smile className="w-4 h-4" />
                      </Button>
                    </div>

                    <Button
                      type="submit"
                      size="sm"
                      disabled={!newComment.trim() || isSubmitting || isCommentLimitReached}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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

                  <p id="comment-help" className="text-xs text-muted-foreground">
                    Press Cmd+Enter to post • Be respectful and constructive
                  </p>
                </div>
              </div>
            </form>

            {/* Comments List */}
            {commentCount > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-foreground flex items-center">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Comments ({commentCount})
                  </h4>
                  {commentCount > 3 && (
                    <Button variant="ghost" size="sm" className="text-xs">
                      View all comments
                    </Button>
                  )}
                </div>

                <div className="space-y-3">
                  {tweetData.comments?.map((comment, index) => (
                    <CommentItem
                      key={`${comment.user_id}-${index}`}
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
  )
}
