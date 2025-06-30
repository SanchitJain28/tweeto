"use client";

import type React from "react";

import Header from "@/components/header-footer-sidebar/Header";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { EditDeleteDrawer } from "@/components/main/edit-delete-tweet/EditDeleteComponent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useAuth, useFullProfile } from "@/hooks/useAuth";
import type { FullProfile } from "@/types/Types";
import {
  MessageCircle,
  User,
  Edit3,
  MoreHorizontal,
  Trash2,
  Search,
  Bell,
  Bookmark,
  Plus,
  Hash,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { DeleteTweetModal } from "./deleteModal";
import axios from "axios";
import LikeButton from "@/components/Like-comment/LikeButton";
import Link from "next/link";

export default function ProfileClient() {
  const { user } = useAuth();
  const {
    data: fullProfile,
    isPending,
    isError,
  } = useFullProfile({
    id: user?.id ?? "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [modalProps, setModalProps] = useState<{
    id: string;
    text: string;
    image_url: string;
  } | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteTweet, setDeleteTweet] = useState<{
    id: string;
    text: string;
    image_url: string;
  } | null>(null);

  const [activeTab, setActiveTab] = useState("For You");

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleUpdate = (change: {
    id: string;
    text: string;
    image_url: string;
  }) => {
    setLocalProfile((prev) => {
      if (!prev) return prev;
      const updatedProfile = {
        ...prev,
        tweets_with_counts: prev.tweets_with_counts.map((tweet) =>
          tweet.id === change.id
            ? {
                ...tweet,
                text: change.text,
                image_url: change.image_url,
              }
            : tweet
        ),
      };
      return updatedProfile;
    });
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const { data } = await axios.post("/api/delete-tweet", {
        id: deleteTweet?.id,
      });
      console.log(data);
      setLocalProfile((prev) => {
        if (!prev) return prev;
        const updatedProfile = {
          ...prev,
          tweets_with_counts: prev.tweets_with_counts.filter(
            (tweet) => tweet.id !== deleteTweet?.id
          ),
        };
        return updatedProfile;
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const [localProfile, setLocalProfile] = useState<FullProfile | null>(null);

  useEffect(() => {
    if (fullProfile) {
      setLocalProfile(fullProfile);
    }
  }, [fullProfile]);

  const trendingTopics = [
    { tag: "WebDevelopment", posts: "2.1K posts" },
    { tag: "AI", posts: "1.8K posts" },
    { tag: "React", posts: "1.2K posts" },
    { tag: "NextJS", posts: "890 posts" },
    { tag: "TypeScript", posts: "756 posts" },
  ];

  const suggestedUsers = [
    { name: "sarah.dev", role: "Full-stack developer", verified: true },
    { name: "tech_guru", role: "AI researcher", verified: false },
    { name: "design_pro", role: "UI/UX Designer", verified: true },
  ];

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                <User className="w-8 h-8 text-red-600" />
              </div>
              <p className="text-muted-foreground text-lg">
                Failed to load profile data
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!fullProfile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <User className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-muted-foreground text-lg">
                No profile data found
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner isVisible={true} />
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Profile Card */}
              <Card className="bg-white rounded-2xl shadow-sm border-0">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Avatar className="h-16 w-16 mx-auto mb-4">
                      <AvatarImage
                        src="/placeholder.svg"
                        alt={fullProfile.full_name}
                      />
                      <AvatarFallback className="text-lg bg-gradient-to-br from-orange-400 to-pink-500 text-white">
                        {getInitials(fullProfile.full_name)}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-gray-900">
                      {fullProfile.full_name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      @{fullProfile.full_name.toLowerCase().replace(/\s+/g, "")}
                    </p>

                    <div className="flex justify-center items-center space-x-2 text-center">
                      <div className="mx-8">
                        <div className="font-semibold text-gray-900">
                          {fullProfile.tweets_with_counts.length}
                        </div>
                        <div className="text-xs text-gray-500">Posts</div>
                      </div>
                      <Link href={`/profile/${fullProfile.username}/followers`}>
                        <div className="p-4 border rounded-xl">
                          <div className="font-semibold text-gray-900">12</div>
                          <div className="text-xs  text-gray-500">
                            Followers
                          </div>
                        </div>
                      </Link>
                      <Link href={`/profile/${fullProfile.username}/following`}>
                        <div className="p-4 border rounded-xl">
                          <div className="font-semibold text-gray-900">12</div>
                          <div className="text-xs  text-gray-500">
                            Following
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-white rounded-2xl shadow-sm border-0">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    <Link href="/post-tweet">
                      <Button className="w-full justify-start bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white rounded-xl">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Post
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full justify-start rounded-xl"
                    >
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start rounded-xl"
                    >
                      <Bell className="w-4 h-4 mr-2" />
                      Notifications
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start rounded-xl"
                    >
                      <Bookmark className="w-4 h-4 mr-2" />
                      Saved Posts
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6">
            <div className="space-y-6">
              {/* Welcome Banner */}
              <Card className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl shadow-sm border-0 text-white overflow-hidden">
                <CardContent className="p-6 relative">
                  <div className="relative z-10">
                    <h2 className="text-xl font-bold mb-2">
                      Welcome back, {fullProfile.full_name.split(" ")[0]}!
                    </h2>
                    <p className="text-white/90">
                      Ready to share something amazing today?
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 opacity-20">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      ✨
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tabs */}
              <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
                {["Your Tweets", "Following", "Trending"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? "bg-white text-orange-500 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Posts */}
              {activeTab == "Your Tweets" && (
                <div className="space-y-4">
                  {fullProfile.tweets_with_counts.length === 0 ? (
                    <Card className="bg-white rounded-2xl my-4 shadow-sm border-0">
                      <CardContent className="p-12 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                          <MessageCircle className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Your feed is ready!
                        </h3>
                        <p className="text-gray-500 mb-6">
                          Start following people or create your first post to
                          see content here.
                        </p>
                        <div className="flex justify-center space-x-3">
                          <Link href="/post-tweet">
                            <Button className="bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white rounded-xl">
                              Create Your First Post
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            className="rounded-xl bg-transparent"
                          >
                            Discover People
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    localProfile?.tweets_with_counts.map((tweet, index) => (
                      <Link href={`tweet/${tweet.id}`} key={tweet.id || index}>
                        <Card className="bg-white rounded-2xl my-4 shadow-sm border-0 hover:shadow-md transition-all duration-200 overflow-hidden group">
                          {tweet.image_url && (
                            <div className="relative overflow-hidden">
                              <img
                                src={tweet.image_url || "/placeholder.svg"}
                                alt={`Tweet image for: ${tweet.text.substring(0, 50)}...`}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            </div>
                          )}
                          <CardContent className="p-6">
                            <div className="space-y-4">
                              <p className="text-gray-800 leading-relaxed">
                                {tweet.text}
                              </p>

                              <div className="flex justify-end">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
                                    >
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    align="end"
                                    className="w-48"
                                  >
                                    <DropdownMenuItem
                                      onClick={(e: React.MouseEvent) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setModalProps(tweet);
                                        setIsOpen(true);
                                      }}
                                    >
                                      <Edit3 className="mr-2 h-4 w-4" />
                                      Update Tweet
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={(e: React.MouseEvent) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setIsDeleteModalOpen(true);
                                        setDeleteTweet(tweet);
                                      }}
                                      className="text-red-600 focus:text-red-600"
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete Tweet
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>

                              <Separator />

                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-6">
                                  <LikeButton
                                    id={tweet.id}
                                    user_id={user.id}
                                    count={tweet.like_count}
                                    likeState={tweet.liked_by_current_user}
                                  />
                                  <div className="flex items-center space-x-2 text-gray-500">
                                    <MessageCircle className="h-4 w-4" />
                                    <span className="text-sm">
                                      {tweet.reply_count}
                                    </span>
                                  </div>
                                </div>
                                <time className="text-sm text-gray-500">
                                  {formatDate(tweet.created_at)}
                                </time>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Trending Topics */}
              <Card className="bg-white rounded-2xl shadow-sm border-0">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <TrendingUp className="w-5 h-5 text-orange-500 mr-2" />
                    <h3 className="font-semibold text-gray-900">
                      Trending Topics
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {trendingTopics.map((topic, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <Hash className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="font-medium text-gray-900">
                            {topic.tag}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {topic.posts}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* People to Follow */}
              <Card className="bg-white rounded-2xl shadow-sm border-0">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Users className="w-5 h-5 text-pink-500 mr-2" />
                    <h3 className="font-semibold text-gray-900">
                      People to Follow
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {suggestedUsers.map((suggestedUser, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white text-sm">
                              {getInitials(suggestedUser.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center">
                              <span className="font-medium text-gray-900 text-sm">
                                {suggestedUser.name}
                              </span>
                              {suggestedUser.verified && (
                                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center ml-1">
                                  <span className="text-white text-xs">✓</span>
                                </div>
                              )}
                            </div>
                            <p className="text-xs text-gray-500">
                              {suggestedUser.role}
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-full text-xs bg-transparent"
                        >
                          Follow
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {modalProps && (
        <EditDeleteDrawer
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          Data={modalProps}
          onUpdate={handleUpdate}
        />
      )}

      <DeleteTweetModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}
