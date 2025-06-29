"use client"

import { createClient } from "@/utils/supabase/client"
import { useParams } from "next/navigation"
import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Users, UserPlus } from "lucide-react"
import Link from "next/link"
import FollowButton from "@/components/Like-comment/FollowButton"


const supabase = createClient()

interface Followers {
  full_name: string
  user_id: string
  username: string
  is_followed_by_current_user: boolean
}

export default function FollowersPage() {
  const { username } = useParams<{ username: string }>()
  const [followers, setFollowers] = React.useState<Followers[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  const fetchFollowers = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase.rpc("get_followers_by_username", {
        p_username: username,
      })

      if (error) {
        console.error("Error fetching followers:", error)
        setError("Failed to load followers")
        return []
      }

      setFollowers(data || [])
      return data
    } catch (err) {
      console.error("Unexpected error:", err)
      setError("An unexpected error occurred")
      return []
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    if (username) {
      fetchFollowers()
    }
  }, [username])

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }


  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Error Loading Followers</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={fetchFollowers} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Users className="h-6 w-6" />
          <h1 className="text-2xl font-bold">{username ? `@${username}'s Followers` : "Followers"}</h1>
        </div>
        <p className="text-muted-foreground">
          {followers.length} {followers.length === 1 ? "follower" : "followers"}
        </p>
      </div>

      {/* Followers Grid */}
      {followers.length === 0 ? (
        <div className="text-center py-12">
          <UserPlus className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Followers Yet</h2>
          <p className="text-muted-foreground">
            {username ? `@${username} doesn't have any followers yet.` : "No followers found."}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {followers.map((follower) => (
            <Card key={follower.user_id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`/placeholder.svg?height=48&width=48`} alt={follower.full_name} />
                    <AvatarFallback className="bg-primary/10">{getInitials(follower.full_name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{follower.full_name}</h3>
                    <p className="text-sm text-muted-foreground truncate">@{follower.username}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <Link href={`/profile/${follower.username}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      View Profile
                    </Button>
                  </Link>
                  <div className="flex-1">
                    <FollowButton
                      isFollowing={follower.is_followed_by_current_user}
                      user_id={follower.user_id}
                      className="w-full rounded-lg"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
