"use client";

import { createClient } from "@/utils/supabase/client";
import { useParams } from "next/navigation";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UserCheck, UserPlus } from "lucide-react";
import Link from "next/link";

const supabase = createClient();

interface Following {
  full_name: string;
  user_id: string;
  username: string;
}

export default function FollowingPage() {
  const { username } = useParams<{ username: string }>();
  const [following, setFollowing] = React.useState<Following[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchFollowing = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.rpc("get_following_by_username", {
        p_username: username,
      });

      if (error) {
        console.error("Error fetching following:", error);
        setError("Failed to load following");
        return [];
      }

      setFollowing(data || []);
      return data;
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred");
      return [];
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (username) {
      fetchFollowing();
    }
  }, [username]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

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
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center py-12">
          <UserCheck className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">
            Error Loading Following
          </h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={fetchFollowing} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <UserCheck className="h-6 w-6" />
          <h1 className="text-2xl font-bold">
            {username ? `@${username} is Following` : "Following"}
          </h1>
        </div>
        <p className="text-muted-foreground">
          {following.length} {following.length === 1 ? "person" : "people"}
        </p>
      </div>

      {/* Following Grid */}
      {following.length === 0 ? (
        <div className="text-center py-12">
          <UserPlus className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Not Following Anyone</h2>
          <p className="text-muted-foreground">
            {username
              ? `@${username} isn't following anyone yet.`
              : "No one is being followed yet."}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {following.map((person) => (
            <Card
              key={person.user_id}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={`/placeholder.svg?height=48&width=48`}
                      alt={person.full_name}
                    />
                    <AvatarFallback className="bg-primary/10">
                      {getInitials(person.full_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">
                      {person.full_name}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">
                      @{person.username}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Link href={`/profile/${person.username}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                    >
                      View Profile
                    </Button>
                  </Link>
                  <Button variant="secondary" size="sm" className="flex-1">
                    <UserCheck className="h-4 w-4 mr-1" />
                    Following
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
