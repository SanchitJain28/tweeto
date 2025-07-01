import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FullProfile } from "@/types/Types";
import { Bell, Bookmark, Plus, Search } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function LeftSidebar({
  fullProfile,
}: {
  fullProfile: FullProfile;
}) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
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
                    <div className="font-semibold text-gray-900">{fullProfile.followers_count}</div>
                    <div className="text-xs  text-gray-500">Followers</div>
                  </div>
                </Link>
                <Link href={`/profile/${fullProfile.username}/following`}>
                  <div className="p-4 border rounded-xl">
                    <div className="font-semibold text-gray-900">{fullProfile.following_count}</div>
                    <div className="text-xs  text-gray-500">Following</div>
                  </div>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white rounded-2xl shadow-sm border-0">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
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
  );
}
