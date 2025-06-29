"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Heart,
  MessageCircle,
  Repeat2,
  Share,
  Search,
  Home,
  Bell,
  Mail,
  Bookmark,
  User,
  Settings,
  ImageIcon,
  Smile,
  Calendar,
  MapPin,
  TrendingUp,
  Users,
  Zap,
  Menu,
  Plus,
} from "lucide-react";
import { Tweet } from "@/types/Types";

interface Post {
  id: string;
  user: {
    name: string;
    username: string;
    avatar: string;
    verified?: boolean;
  };
  content: string;
  timestamp: string;
  likes: number;
  reposts: number;
  replies: number;
  image?: string;
  liked?: boolean;
  reposted?: boolean;
}

const mockPosts: Post[] = [
  {
    id: "1",
    user: {
      name: "Sarah Chen",
      username: "sarahchen",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    content:
      "Just shipped a new feature! The feeling when your code works perfectly on the first try is unmatched 🚀✨ #coding #webdev",
    timestamp: "2h",
    likes: 124,
    reposts: 23,
    replies: 8,
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "2",
    user: {
      name: "Alex Rodriguez",
      username: "alexdev",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "Hot take: The best way to learn programming is by building projects you actually care about. Theory is important, but nothing beats hands-on experience! 💻",
    timestamp: "4h",
    likes: 89,
    reposts: 15,
    replies: 12,
  },
  {
    id: "3",
    user: {
      name: "Tech News Daily",
      username: "technewsdaily",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    content:
      "BREAKING: New AI model achieves 95% accuracy in code generation. The future of software development is here! 🤖⚡",
    timestamp: "6h",
    likes: 456,
    reposts: 128,
    replies: 67,
  },
  {
    id: "4",
    user: {
      name: "Maria Garcia",
      username: "mariadesigns",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "Working on a new design system and I'm absolutely loving how clean and consistent everything looks! Sometimes the simple solutions are the best ones 🎨",
    timestamp: "8h",
    likes: 67,
    reposts: 9,
    replies: 4,
  },
  {
    id: "5",
    user: {
      name: "DevCommunity",
      username: "devcommunity",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    content:
      "Reminder: Your code doesn't have to be perfect. It just has to work and be maintainable. Perfect is the enemy of done! 💪 #motivation",
    timestamp: "12h",
    likes: 234,
    reposts: 45,
    replies: 23,
  },
];

const trendingTopics = [
  { topic: "#WebDev", posts: "125K", growth: "+12%" },
  { topic: "#AI", posts: "89K", growth: "+25%" },
  { topic: "#JavaScript", posts: "67K", growth: "+8%" },
  { topic: "#React", posts: "45K", growth: "+15%" },
  { topic: "#NextJS", posts: "23K", growth: "+30%" },
];

const navigationItems = [
  { icon: Home, label: "Home", active: true },
  { icon: Search, label: "Discover" },
  { icon: Bell, label: "Notifications" },
  { icon: Mail, label: "Messages" },
  { icon: Bookmark, label: "Saved" },
  { icon: User, label: "Profile" },
  { icon: Settings, label: "Settings" },
];

export default function FeedClient({ data }: { data?: Tweet[] }) {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [newPost, setNewPost] = useState("");
  const [showCompose, setShowCompose] = useState(false);

  console.log(data)

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleRepost = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              reposted: !post.reposted,
              reposts: post.reposted ? post.reposts - 1 : post.reposts + 1,
            }
          : post
      )
    );
  };

  const handlePost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        user: {
          name: "You",
          username: "yourhandle",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: newPost,
        timestamp: "now",
        likes: 0,
        reposts: 0,
        replies: 0,
      };
      setPosts([post, ...posts]);
      setNewPost("");
      setShowCompose(false);
    }
  };

  const SidebarContent = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 p-4 lg:p-0">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <Zap className="h-5 w-5 text-white" />
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          SocialHub
        </h1>
      </div>

      <div className="space-y-2">
        {navigationItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className={`w-full justify-start text-slate-700 hover:bg-purple-50 hover:text-purple-700 ${
              item.active ? "bg-purple-50 text-purple-700" : ""
            }`}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-slate-200 p-4">
        <div className="flex items-center justify-between">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-6">
              <SidebarContent />
            </SheetContent>
          </Sheet>

          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md flex items-center justify-center">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              SocialHub
            </h1>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCompose(!showCompose)}
            className="text-purple-600"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex gap-6 p-4">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-72 sticky top-4 h-fit">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-4">
              <SidebarContent />
            </CardHeader>
          </Card>

          <Button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl shadow-lg">
            Create Post
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-2xl mx-auto lg:mx-0">
          {/* Desktop Header */}
          <div className="hidden lg:block mb-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <h2 className="text-2xl font-bold text-slate-800">Your Feed</h2>
                <p className="text-slate-600">
                  Stay connected with your community
                </p>
              </CardHeader>
            </Card>
          </div>

          {/* Mobile Compose Post (Collapsible) */}
          {showCompose && (
            <Card className="lg:hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-4">
              <CardContent className="p-4">
                <div className="flex space-x-3">
                  <Avatar className="ring-2 ring-purple-200 w-8 h-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm">
                      You
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="What's on your mind?"
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="border-0 bg-slate-50 text-slate-800 placeholder-slate-500 resize-none focus:ring-2 focus:ring-purple-200 rounded-xl text-sm"
                      rows={3}
                    />
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-purple-600 hover:bg-purple-50 p-1"
                        >
                          <ImageIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-purple-600 hover:bg-purple-50 p-1"
                        >
                          <Smile className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        onClick={handlePost}
                        disabled={!newPost.trim()}
                        size="sm"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-slate-300 disabled:to-slate-400 rounded-xl px-4"
                      >
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Desktop Compose Post */}
          <Card className="hidden lg:block bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-6">
            <CardContent className="p-6">
              <div className="flex space-x-4">
                <Avatar className="ring-2 ring-purple-200">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    You
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="What's on your mind?"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="border-0 bg-slate-50 text-slate-800 placeholder-slate-500 resize-none focus:ring-2 focus:ring-purple-200 rounded-xl"
                    rows={3}
                  />
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex space-x-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-purple-600 hover:bg-purple-50"
                      >
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-purple-600 hover:bg-purple-50"
                      >
                        <Smile className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-purple-600 hover:bg-purple-50"
                      >
                        <Calendar className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-purple-600 hover:bg-purple-50"
                      >
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      onClick={handlePost}
                      disabled={!newPost.trim()}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-slate-300 disabled:to-slate-400 rounded-xl px-6"
                    >
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts Feed */}
          <div className="space-y-4">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 lg:hover:-translate-y-1"
              >
                <CardContent className="p-4 lg:p-6">
                  <div className="flex space-x-3 lg:space-x-4">
                    <Avatar className="ring-2 ring-slate-200 w-8 h-8 lg:w-10 lg:h-10">
                      <AvatarImage
                        src={post.user.avatar || "/placeholder.svg"}
                      />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm">
                        {post.user.name[0]}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2 flex-wrap">
                        <h3 className="font-semibold text-slate-800 hover:text-purple-600 cursor-pointer text-sm lg:text-base truncate">
                          {post.user.name}
                        </h3>
                        {post.user.verified && (
                          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-1.5 py-0.5 lg:px-2">
                            ✓
                          </Badge>
                        )}
                        <span className="text-slate-500 text-xs lg:text-sm truncate">
                          @{post.user.username}
                        </span>
                        <span className="text-slate-400 hidden sm:inline">
                          •
                        </span>
                        <span className="text-slate-500 text-xs lg:text-sm">
                          {post.timestamp}
                        </span>
                      </div>

                      <p className="text-slate-700 leading-relaxed mb-3 lg:mb-4 text-sm lg:text-base">
                        {post.content}
                      </p>

                      {post.image && (
                        <div className="mb-3 lg:mb-4 rounded-xl overflow-hidden">
                          <img
                            src={post.image || "/placeholder.svg"}
                            alt="Post image"
                            className="w-full max-h-60 lg:max-h-80 object-cover"
                          />
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-3 lg:pt-4 border-t border-slate-100">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl p-1 lg:p-2"
                        >
                          <MessageCircle className="h-3 w-3 lg:h-4 lg:w-4 lg:mr-2" />
                          <span className="hidden sm:inline text-xs lg:text-sm">
                            {post.replies}
                          </span>
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRepost(post.id)}
                          className={`hover:text-green-600 hover:bg-green-50 rounded-xl p-1 lg:p-2 ${
                            post.reposted
                              ? "text-green-600 bg-green-50"
                              : "text-slate-600"
                          }`}
                        >
                          <Repeat2 className="h-3 w-3 lg:h-4 lg:w-4 lg:mr-2" />
                          <span className="hidden sm:inline text-xs lg:text-sm">
                            {post.reposts}
                          </span>
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className={`hover:text-red-500 hover:bg-red-50 rounded-xl p-1 lg:p-2 ${
                            post.liked
                              ? "text-red-500 bg-red-50"
                              : "text-slate-600"
                          }`}
                        >
                          <Heart
                            className={`h-3 w-3 lg:h-4 lg:w-4 lg:mr-2 ${post.liked ? "fill-current" : ""}`}
                          />
                          <span className="hidden sm:inline text-xs lg:text-sm">
                            {post.likes}
                          </span>
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl p-1 lg:p-2"
                        >
                          <Share className="h-3 w-3 lg:h-4 lg:w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Desktop Right Sidebar */}
        <div className="hidden xl:block w-80 sticky top-4 h-fit space-y-6">
          {/* Search */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <Input
                  placeholder="Search posts, people, topics..."
                  className="pl-10 bg-slate-50 border-0 focus:ring-2 focus:ring-purple-200 rounded-xl"
                />
              </div>
            </CardContent>
          </Card>

          {/* Trending */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-slate-800">
                  Trending Now
                </h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {trendingTopics.map((topic, index) => (
                <div
                  key={index}
                  className="hover:bg-slate-50 p-3 rounded-xl cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-slate-800">
                      {topic.topic}
                    </p>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 text-xs"
                    >
                      {topic.growth}
                    </Badge>
                  </div>
                  <p className="text-slate-600 text-sm">{topic.posts} posts</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Suggested Connections */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-slate-800">
                  Connect With
                </h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Next.js", username: "nextjs", verified: true },
                { name: "Vercel", username: "vercel", verified: true },
                { name: "React", username: "reactjs", verified: true },
              ].map((user, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="ring-2 ring-slate-200">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm">
                        {user.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-1">
                        <p className="font-semibold text-slate-800 text-sm">
                          {user.name}
                        </p>
                        {user.verified && (
                          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-1.5 py-0.5">
                            ✓
                          </Badge>
                        )}
                      </div>
                      <p className="text-slate-500 text-xs">@{user.username}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl"
                  >
                    Follow
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-slate-200 p-2">
        <div className="flex items-center justify-around">
          {navigationItems.slice(0, 5).map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center space-y-1 p-2 ${
                item.active ? "text-purple-600" : "text-slate-600"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Mobile spacing for bottom nav */}
      <div className="lg:hidden h-20"></div>
    </div>
  );
}
