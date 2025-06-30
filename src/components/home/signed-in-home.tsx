"use client"

import Header from "@/components/header-footer-sidebar/Header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { PenSquare, TrendingUp, Users, MessageCircle,  Bookmark,  Bell, Search, Hash, Sparkles } from 'lucide-react'
import Link from "next/link"
import { Profile } from "@/contexts/authContext"


export default function SignedInHome({ user }: { user: Profile }) {
  const trendingTopics = [
    { tag: "WebDevelopment", posts: "2.1K" },
    { tag: "AI", posts: "1.8K" },
    { tag: "React", posts: "1.2K" },
    { tag: "NextJS", posts: "890" },
    { tag: "TypeScript", posts: "756" },
  ]

  const suggestedUsers = [
    { username: "sarah_dev", bio: "Full-stack developer", verified: true },
    { username: "tech_guru", bio: "AI researcher", verified: false },
    { username: "design_pro", bio: "UI/UX Designer", verified: true },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 to-pink-50/30">
      <Header />
      
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          
          {/* Left Sidebar - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-6 space-y-4">
              {/* User Profile Card */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="w-12 h-12 ring-2 ring-orange-200">
                      <AvatarImage src={"/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-r from-orange-500 to-pink-500 text-white">
                        {user.username?.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 truncate">{user.username}</h3>
                      <p className="text-sm text-slate-600 truncate">@{user.username}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div>
                      <div className="font-semibold text-slate-900">{10}</div>
                      <div className="text-slate-600">Posts</div>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{12}</div>
                      <div className="text-slate-600">Followers</div>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{14}</div>
                      <div className="text-slate-600">Following</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="/compose">
                    <Button className="w-full justify-start bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                      <PenSquare className="w-4 h-4 mr-2" />
                      Create Post
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full justify-start">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Bookmark className="w-4 h-4 mr-2" />
                    Saved Posts
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-1 lg:col-span-6">
            <div className="space-y-4 sm:space-y-6">
              
              {/* Welcome Header */}
              <Card className="bg-gradient-to-r from-orange-500 to-pink-500 border-0 text-white">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-xl sm:text-2xl font-bold mb-1">Welcome back, {user.username}!</h1>
                      <p className="text-orange-100 text-sm sm:text-base">Ready to share something amazing today?</p>
                    </div>
                    <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-orange-200" />
                  </div>
                </CardContent>
              </Card>

              {/* Mobile Quick Actions */}
              <div className="lg:hidden">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 gap-3">
                      <Link href="/compose">
                        <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                          <PenSquare className="w-4 h-4 mr-2" />
                          Create Post
                        </Button>
                      </Link>
                      <Button variant="outline" className="w-full">
                        <Search className="w-4 h-4 mr-2" />
                        Search
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Feed Navigation */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="flex border-b border-slate-200">
                    <Button variant="ghost" className="flex-1 rounded-none border-b-2 border-orange-500 text-orange-600 font-semibold py-3">
                      For You
                    </Button>
                    <Button variant="ghost" className="flex-1 rounded-none py-3 text-slate-600">
                      Following
                    </Button>
                    <Button variant="ghost" className="flex-1 rounded-none py-3 text-slate-600">
                      Trending
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Feed Content Placeholder */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Your feed is ready!</h3>
                  <p className="text-slate-600 mb-4">Start following people or create your first post to see content here.</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/compose">
                      <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                        Create Your First Post
                      </Button>
                    </Link>
                    <Link href="/discover">
                      <Button variant="outline">
                        Discover People
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Sidebar - Hidden on mobile and tablet */}
          <div className="hidden xl:block xl:col-span-3">
            <div className="sticky top-6 space-y-4">
              
              {/* Trending Topics */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-orange-500" />
                    Trending Topics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between hover:bg-slate-50 p-2 rounded-lg cursor-pointer transition-colors">
                      <div>
                        <div className="flex items-center">
                          <Hash className="w-4 h-4 text-slate-400 mr-1" />
                          <span className="font-medium text-slate-900">{topic.tag}</span>
                        </div>
                        <span className="text-sm text-slate-600">{topic.posts} posts</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Suggested Users */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Users className="w-5 h-5 mr-2 text-pink-500" />
                    People to Follow
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {suggestedUsers.map((suggestedUser, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">
                            {suggestedUser.username.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-1">
                            <span className="font-medium text-slate-900 text-sm truncate">{suggestedUser.username}</span>
                            {suggestedUser.verified && (
                              <Badge className="bg-blue-500 text-white text-xs px-1 py-0">✓</Badge>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 truncate">{suggestedUser.bio}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs">
                        Follow
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
