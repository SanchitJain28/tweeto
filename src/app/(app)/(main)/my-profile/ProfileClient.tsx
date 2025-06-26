"use client";
import Header from "@/components/header-footer-sidebar/Header";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { EditDeleteDrawer } from "@/components/main/edit-delete-tweet/EditDeleteComponent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useAuth, useFullProfile } from "@/hooks/useAuth";
import { FullProfile } from "@/types/Types";
import {
  Calendar,
  MessageCircle,
  User,
  Edit3,
  MoreHorizontal,
  Trash2,
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

  //delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteTweet, setDeleteTweet] = useState<{
    id: string;
    text: string;
    image_url: string;
  } | null>(null);

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatJoinDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
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
    console.log("handleUpdate called with:", change);

    setLocalProfile((prev) => {
      if (!prev) {
        console.log("No previous profile, skipping update");
        return prev;
      }

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

      console.log("Profile updated:", updatedProfile);
      return updatedProfile;
    });
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const { data } = await axios.post("/api/delete-tweet", {
        id: deleteTweet?.id,
      });
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

      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const [localProfile, setLocalProfile] = useState<FullProfile | null>(null);

  // When fullProfile is fetched, sync it to local state once
  useEffect(() => {
    if (fullProfile) {
      console.log(fullProfile);
      setLocalProfile(fullProfile);
    }
  }, [fullProfile]);

  useEffect(() => {}, [localProfile]);

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <Header isWithProfile={false} />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto border-0 shadow-lg">
            <CardContent className="pt-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                <User className="w-8 h-8 text-red-600 dark:text-red-400" />
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <Header isWithProfile={false} />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto border-0 shadow-lg">
            <CardContent className="pt-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <User className="w-8 h-8 text-slate-400" />
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <Header isWithProfile={true} firstName={"PENDING"} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner isVisible={true} />
        </div>
      </div>
    );
  }

  if (!user) {
    return;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header isWithProfile={true} firstName={fullProfile.full_name} />

      <div className="container mx-auto  max-w-4xl">
        {/* Profile Header with Cover */}
        <Card className="mb-8 border-0 shadow-xl -mt-8 overflow-hidden">
          {/* Cover Photo */}
          <div className="h-48 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative">
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          <CardHeader className="pb-6 relative">
            {/* Avatar positioned over cover */}
            <div className="flex flex-col sm:flex-row items-start gap-6 -mt-16 relative z-10">
              <Avatar className="h-32 w-32 border-4 border-white dark:border-slate-800 shadow-xl">
                <AvatarImage
                  src={"/placeholder.svg"}
                  alt={fullProfile.full_name}
                />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {getInitials(fullProfile.full_name)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4 pt-4 sm:pt-8">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                    {fullProfile.full_name}
                  </h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      @{fullProfile.full_name.toLowerCase().replace(/\s+/g, "")}
                    </span>
                  </div>
                </div>

                {fullProfile.bio && (
                  <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed max-w-2xl">
                    {fullProfile.bio}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                  {fullProfile.created_at && (
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Joined {formatJoinDate(fullProfile.created_at)}
                      </span>
                    </div>
                  )}
                  <Badge
                    variant="secondary"
                    className="px-3 py-1.5 text-sm font-medium"
                  >
                    {fullProfile.tweets_with_counts.length} tweets
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 px-4 py-8 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {fullProfile.tweets_with_counts.length}
              </div>
              <div className="text-sm text-blue-600/70 dark:text-blue-400/70 font-medium">
                Total Tweets
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                {fullProfile.tweets_with_counts.reduce(
                  (acc, tweet) => acc + tweet.like_count,
                  0
                )}
              </div>
              <div className="text-sm text-pink-600/70 dark:text-pink-400/70 font-medium">
                Total Likes
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {fullProfile.tweets_with_counts.reduce(
                  (acc, tweet) => acc + tweet.reply_count,
                  0
                )}
              </div>
              <div className="text-sm text-green-600/70 dark:text-green-400/70 font-medium">
                Total Replies
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tweets Section */}
        <div className="space-y-6 px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Recent Tweets
              </h2>
              <Badge variant="outline" className="px-3 py-1">
                {fullProfile.tweets_with_counts.length}
              </Badge>
            </div>

            <div className="">
              <Link href="/post-tweet">
                <button className="bg-gradient-to-r from-[#F73394] via-[#F8326E] to-[#FA2D41] border font-bold text-white p-4 rounded-lg ">
                  Post a tweet
                </button>
              </Link>
            </div>
          </div>

          {fullProfile.tweets_with_counts.length === 0 ? (
            <Card className="border-0 shadow-lg">
              <CardContent className="pt-12 pb-12 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <MessageCircle className="w-10 h-10 text-slate-400" />
                </div>
                <p className="text-muted-foreground text-lg mb-2">
                  No tweets yet
                </p>
                <p className="text-sm text-muted-foreground">
                  Start sharing your thoughts with the world!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {localProfile?.tweets_with_counts.map((tweet, index) => (
                <Link
                  href={`tweet/${tweet.id}`}
                  key={tweet.id || index}
                  className=""
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl my-4 transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
                    {tweet.image_url && (
                      <div className="relative overflow-hidden">
                        <img
                          src={tweet.image_url || "/placeholder.svg"}
                          alt={`Tweet image for: ${tweet.text.substring(0, 50)}...`}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                    )}

                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Tweet Content */}
                        <p className="text-slate-700 dark:text-slate-200 leading-relaxed text-lg">
                          {tweet.text}
                        </p>

                        {/* Three Dot Menu */}
                        <div className="flex justify-end">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-800"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuItem
                                onClick={(e: React.MouseEvent) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setModalProps(tweet);
                                  setIsOpen(true);
                                }}
                                className="cursor-pointer"
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
                                className="cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Tweet
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <Separator className="my-4" />

                        {/* Tweet Metadata */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 text-pink-600 dark:text-pink-400">
                              <LikeButton
                                id={tweet.id}
                                user_id={user.id}
                                count={tweet.like_count}
                                likeState={tweet.liked_by_current_user}
                              />
                            </div>
                            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                              <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/20 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                                <MessageCircle className="h-4 w-4" />
                              </div>
                              <span className="font-medium">
                                {tweet.reply_count}
                              </span>
                            </div>
                          </div>

                          <time className="text-sm text-muted-foreground bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
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
    </div>
  );
}
