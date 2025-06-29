"use client"

import Header from "@/components/header-footer-sidebar/Header"
import LoadingSpinner from "@/components/loading/LoadingSpinner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useAuth, useProfileWithStats } from "@/hooks/useAuth"
import { Calendar, MessageCircle, User, Heart, Users, Verified } from "lucide-react"
import { useEffect, useState } from "react"
import LikeButton from "@/components/Like-comment/LikeButton"
import Link from "next/link"
import FollowButton from "@/components/Like-comment/FollowButton"
import { useParams } from "next/navigation"

interface Tweet {
  content: string
  tweet_id: string
  image_url: string | null
  created_at: string
  tweet_comment_count: number
  tweet_like_count: number
  is_liked_by_current_user: boolean
}

interface UserProfile {
  bio: string
  name: string
  username: string
  user_id: string
  likes_count: number
  followers_count: number
  following_count: number
  tweets: Tweet[]
  created_at: Date
  is_followed_by_current_user: boolean
}

export default function ProfileClientOthers() {
  const { user } = useAuth()
  const { username } = useParams<{ username: string }>()
  const { data, isError, isPending } = useProfileWithStats({
    username: username,
  })

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatJoinDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    })
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const [localProfile, setLocalProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    if (data) {
      setLocalProfile(data)
    }
  }, [data])

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <Header isWithProfile={false} />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto border border-red-200 dark:border-red-800 shadow-lg bg-white dark:bg-slate-900">
            <CardContent className="pt-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 dark:bg-red-950 flex items-center justify-center">
                <User className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">Profile Not Found</h3>
              <p className="text-slate-600 dark:text-slate-400">Failed to load profile data</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <Header isWithProfile={false} />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto border border-slate-200 dark:border-slate-800 shadow-lg bg-white dark:bg-slate-900">
            <CardContent className="pt-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <User className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">No Profile Found</h3>
              <p className="text-slate-600 dark:text-slate-400">This user does not exist or has been removed</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <Header isWithProfile={true} firstName={"Loading..."} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <LoadingSpinner isVisible={true} />
            <p className="text-slate-600 dark:text-slate-400 text-lg">Loading profile...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Header isWithProfile={true} firstName={data.name} />

      <div className=" max-w-4xl ">
        {/* Profile Header */}
        <Card className="mb-12 border-0 shadow-xl bg-white dark:bg-slate-900 overflow-hidden">
          {/* Cover Photo */}
          <div className="h-48 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <div className="absolute top-4 right-4">
              <div className="w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
            </div>
            <div className="absolute bottom-6 left-6">
              <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse delay-300"></div>
            </div>
          </div>

          <CardHeader className="pb-8">
            <div className="flex flex-col sm:flex-row items-start gap-8 -mt-16 relative z-10">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-white dark:border-slate-900 shadow-xl">
                  <AvatarImage src="/placeholder.svg" alt={data.name} />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold">
                    {getInitials(data.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 w-full space-y-6 pt-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{data.name}</h1>
                      <Verified className="w-6 h-6 text-blue-500" />
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                      @{data.username.toLowerCase().replace(/\s+/g, "")}
                    </p>
                  </div>

                  <FollowButton
                    className="px-8 py-3 rounded-xl font-semibold text-base hover:shadow-md transition-all duration-200"
                    user_id={data.user_id}
                    isFollowing={data.is_followed_by_current_user}
                  />
                </div>

                {data.bio && (
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                    <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">{data.bio}</p>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                  {data.created_at && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {formatJoinDate(data.created_at)}</span>
                    </div>
                  )}
                </div>

                {/* Enhanced Stats Buttons */}
                <div className="flex gap-4 w-full">
                  <Link href={`/profile/${data.username}/following`}>
                    <div className="group cursor-pointer">
                      <div className="bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl px-4 py-3 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200 hover:shadow-md">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors duration-200">
                            <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="text-left">
                            <div className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                              {data.following_count}
                            </div>
                            <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Following</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <Link href={`/profile/${data.username}/followers`}>
                    <div className="group cursor-pointer">
                      <div className="bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl px-4 py-3 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200 hover:shadow-md">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors duration-200">
                            <Heart className="w-5 h-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div className="text-left">
                            <div className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200">
                              {data.followers_count}
                            </div>
                            <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Followers</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 px-4 md:grid-cols-3 gap-8 mb-12">
          <Card className="border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-8 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                {!data.tweets || data.tweets.length === 0 ? "0" : data.tweets.length}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Posts</div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-8 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                {data.tweets && data.tweets.reduce((acc, tweet) => acc + tweet.tweet_like_count, 0)}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Likes Received</div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-8 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                {data.tweets && data.tweets.reduce((acc, tweet) => acc + tweet.tweet_comment_count, 0)}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Replies</div>
            </CardContent>
          </Card>
        </div>

        {/* Posts Section */}
        <div className="space-y-8 px-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Posts</h2>
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
              {!data.tweets || data.tweets.length === 0 ? "0" : data.tweets.length}
            </Badge>
          </div>

          {!data.tweets || data.tweets.length === 0 ? (
            <Card className="border border-slate-200 dark:border-slate-800 shadow-sm">
              <CardContent className="py-16 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">No posts yet</h3>
                <p className="text-slate-600 dark:text-slate-400">This user has not shared any thoughts yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {localProfile?.tweets.map((tweet, index) => (
                <Link href={`/tweet/${tweet.tweet_id}`} key={tweet.tweet_id || index} className="block">
                  <Card className="border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 overflow-hidden group">
                    {tweet.image_url && (
                      <div className="relative overflow-hidden">
                        <img
                          src={tweet.image_url || "/placeholder.svg"}
                          alt={`Tweet image for: ${tweet.content.substring(0, 50)}...`}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.style.display = "none"
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      </div>
                    )}

                    <CardContent className="p-8">
                      <div className="space-y-6">
                        <p className="text-slate-800 dark:text-slate-200 leading-relaxed text-lg">{tweet.content}</p>

                        <Separator className="bg-slate-200 dark:bg-slate-700" />

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                              <LikeButton
                                id={tweet.tweet_id}
                                user_id={user.id}
                                count={tweet.tweet_like_count}
                                likeState={tweet.is_liked_by_current_user}
                              />
                            </div>

                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                              <MessageCircle className="h-4 w-4" />
                              <span className="font-medium">{tweet.tweet_comment_count}</span>
                            </div>
                          </div>

                          <time className="text-sm text-slate-500 dark:text-slate-400">
                            {formatDate(tweet.created_at)}
                          </time>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
