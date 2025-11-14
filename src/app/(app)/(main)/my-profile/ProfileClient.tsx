"use client";

import type React from "react";

import Header from "@/components/header-footer-sidebar/Header";
import { EditDeleteDrawer } from "@/components/main/edit-delete-tweet/EditDeleteComponent";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth, useFullProfile } from "@/hooks/useAuth";
import type { FullProfile } from "@/types/Types";
import { Hash, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { DeleteTweetModal } from "./deleteModal";
import axios from "axios";
import ProfileError from "./loading-error-ui/profileError";
import ProfileLoading from "./loading-error-ui/profileLoading";
import LeftSidebar from "./sidebars/LeftSidebar";
import ConnectionSuggestions from "../feed/sections/ConnectionSuggestions";
import ProfileTabs from "./sidebars/ProfileTabs";
import { useRouter } from "next/navigation";

export default function ProfileClient() {
  const { user, loading } = useAuth();

  const {
    data: fullProfile,
    isPending,
    isError,
  } = useFullProfile({
    id: user?.id ?? "",
  });

  const router = useRouter();

  console.log("MY PROFILE DATA", fullProfile);

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

  const [, setActiveTab] = useState("Your Tweets");

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
      console.log("FULL PROFILE", fullProfile);
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

  if (isPending || loading) return <ProfileLoading />;

  if (isError) return <ProfileError />;

  if (!fullProfile || !localProfile) return <ProfileError />;

  if (!user) {
    router.push("/login");
    return;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <LeftSidebar fullProfile={fullProfile} />

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
              <ProfileTabs
                onTabChange={setActiveTab}
                Profile={localProfile!}
                user_id={user.id}
                onEditModalChange={(change, value) => {
                  setIsOpen(change);
                  setModalProps(value);
                }}
                onDeleteModalChange={(change, value) => {
                  setDeleteTweet(value);
                  setIsDeleteModalOpen(change);
                }}
              />
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
              <ConnectionSuggestions />
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
