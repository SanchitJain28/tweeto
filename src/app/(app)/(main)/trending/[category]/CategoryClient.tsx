"use client";

import TweetCard from "@/components/main/feed/TweetCard";
import { useAuth } from "@/hooks/useAuth";
import { useTweetsWithCategory } from "@/hooks/useTweets";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Hash, TrendingUp } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useEffect } from "react";

export interface TweetCardProps {
  id: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  text: string;
  image_url: string | null;
  liked_by_current_user: boolean;
  profile_id: string;
  username: string;
  tags: string[];
  total_likes: number;
  total_comments: number;
}

export default function CategoryClient() {
  const { user } = useAuth();
  const { category } = useParams<{ category: string }>();

  const {
    tweets,
    data,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isPending,
    isError,
  } = useTweetsWithCategory({
    category,
    enabled: true,
  });

  useEffect(() => {
    if (tweets) {
      console.log(tweets);
    }
  }, [tweets, data]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <CardContent>
            <p className="text-muted-foreground">
              Please sign in to view tweets
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatCategoryName = (cat: string) => {
    return cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase();
  };

  const getCategoryColor = (cat: string) => {
    const colors = {
      sports: "bg-blue-500",
      technology: "bg-purple-500",
      entertainment: "bg-pink-500",
      news: "bg-red-500",
      business: "bg-green-500",
      lifestyle: "bg-orange-500",
    };
    return colors[cat as keyof typeof colors] || "bg-gray-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header Section */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${getCategoryColor(category)}`}>
              <Hash className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCategoryName(category)}
              </h1>
              <p className="text-sm text-muted-foreground">
                Discover trending posts in{" "}
                {formatCategoryName(category).toLowerCase()}
              </p>
            </div>
          </div>

          {/* Category Stats */}
          <div className="flex items-center gap-4 mt-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {0} posts
            </Badge>
            <Badge variant="outline">#{category}</Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Loading State */}
        {isPending && (
          <div className="space-y-6">
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start space-x-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <div className="flex space-x-2 pt-2">
                      <Skeleton className="h-8 w-16" />
                      <Skeleton className="h-8 w-16" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <Alert className="max-w-md mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load tweets. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        {/* Empty State */}
        {!isPending && !isError && (!tweets || tweets?.length === 0) && (
          <div className="text-center py-12">
            <div
              className={`inline-flex p-4 rounded-full ${getCategoryColor(category)} mb-4`}
            >
              <Hash className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No posts found
            </h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              There are no posts in the{" "}
              {formatCategoryName(category).toLowerCase()} category yet. Be the
              first to share something!
            </p>
          </div>
        )}

        {/* Tweets Grid */}
        {!isPending && !isError && tweets && tweets.length > 0 && (
          <div className="space-y-6">
            {tweets.map((tweet, index) => (
              <TweetCard key={index} post={tweet} user_id={user.id} />
            ))}
          </div>
        )}

        {/* Load More Indicator */}
        {!isPending && tweets && tweets.length > 0 && (
          <div className="text-center mt-12 py-8">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-px bg-border flex-1 w-16"></div>
              {hasNextPage ? (
                <button
                  onClick={() => {
                    console.log(hasNextPage);
                    if (hasNextPage && !isFetchingNextPage) {
                      fetchNextPage();
                    }
                  }}
                  className="bg-black p-4 text-white rounded-xl"
                >
                  Load more
                </button>
              ) : (
                <>
                  <span>
                    End of {formatCategoryName(category).toLowerCase()} posts
                  </span>
                  <div className="h-px bg-border flex-1 w-16"></div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
