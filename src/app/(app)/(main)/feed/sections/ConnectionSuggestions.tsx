
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserPlus, X } from "lucide-react"
import { useState } from "react"

interface RecommendedProfile {
  id: string
  username: string
}

interface ConnectionSuggestionsProps {
  recommendedProfiles?: RecommendedProfile[]
}

export default function ConnectionSuggestions({ recommendedProfiles = [] }: ConnectionSuggestionsProps) {
  const [dismissedProfiles, setDismissedProfiles] = useState<string[]>([])
  const [followingProfiles, setFollowingProfiles] = useState<string[]>([])

  const handleFollow = (profileId: string) => {
    setFollowingProfiles((prev) => [...prev, profileId])
    // Here you would typically make an API call to follow the user
    console.log(`Following user with ID: ${profileId}`)
  }

  const handleDismiss = (profileId: string) => {
    setDismissedProfiles((prev) => [...prev, profileId])
  }

  const visibleProfiles = recommendedProfiles.filter((profile) => !dismissedProfiles.includes(profile.id))

  if (visibleProfiles.length === 0) {
    return null
  }

  return (
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
            {visibleProfiles.map((profile) => (
              <div
                key={profile.id}
                className="flex items-start justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start space-x-3 flex-1">
                  <Avatar className="h-12 w-12 flex-shrink-0">
                    <AvatarImage src={`/placeholder.svg?height=48&width=48`} alt={profile.username} />
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      {profile.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-2 flex-1 min-w-0">
                    <div>
                      <p className="text-sm font-medium text-slate-900 truncate">@{profile.username}</p>
                      <p className="text-xs text-slate-500">Suggested for you</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {followingProfiles.includes(profile.id) ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs px-4 py-1 h-7 border-slate-300 text-slate-600 bg-transparent"
                          disabled
                        >
                          Following
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleFollow(profile.id)}
                          className="text-xs px-4 py-1 h-7 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                        >
                          Follow
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDismiss(profile.id)}
                  className="h-7 w-7 p-0 text-slate-400 hover:text-slate-600 flex-shrink-0 ml-2"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        {visibleProfiles.length > 5 && (
          <div className="p-4 pt-2 border-t border-slate-100">
            <Button variant="ghost" className="w-full text-sm text-purple-600 hover:text-purple-700 hover:bg-purple-50">
              Show more suggestions
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
