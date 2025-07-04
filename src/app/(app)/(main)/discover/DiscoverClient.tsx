"use client";

import { Search, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { useCallback, useEffect, useRef, useState } from "react";
import Header from "@/components/header-footer-sidebar/Header";
import { useFeedData } from "@/hooks/useTweets";
import TweetCard from "@/components/main/feed/TweetCard";
import { useAuth } from "@/hooks/useAuth";
import ConnectionSuggestions from "../feed/sections/ConnectionSuggestions";
import { Button } from "@/components/ui/button";

export default function DiscoverClient() {
  const [activeTab, setActiveTab] = useState("for-you");
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const {
    tweets,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    // error,
    // isLoading,
    refetch,
    // data,
  } = useFeedData();

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const tabs = [
    { id: "for-you", label: "For You" },
    { id: "trending", label: "Trending" },
    { id: "news", label: "News" },
    { id: "sports", label: "Sports" },
    { id: "entertainment", label: "Entertainment" },
  ];

  const trendingTopics = [
    { topic: "sports", posts: "125K" },
    { topic: "gaming", posts: "89K" },
    { topic: "politics", posts: "156K" },
    { topic: "food", posts: "67K" },
    { topic: "health", posts: "43K" },
    { topic: "technology", posts: "201K" },
    { topic: "entertainment", posts: "178K" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "for-you":
        return (
          <div className="space-y-4">
            {tweets.map((tweet) => (
              <TweetCard key={tweet.id} user_id={user?.id ?? ""} post={tweet} />
            ))}
          </div>
        );
      case "trending":
        return (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Trending Topics</h3>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div
                    key={topic.topic}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-muted-foreground">
                        #{index + 1}
                      </span>
                      <div>
                        <p className="font-medium">#{topic.topic}</p>
                        <p className="text-sm text-muted-foreground">
                          {topic.posts} posts
                        </p>
                      </div>
                    </div>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      default:
        return (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                {tabs.find((tab) => tab.id === activeTab)?.label}
              </h3>
              <p className="text-muted-foreground">
                Content for {activeTab} will be displayed here...
              </p>
            </CardContent>
          </Card>
        );
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = loadMoreRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [handleLoadMore]);

  if (!user) return;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-4">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search accounts, topics, or posts..."
                  className="pl-10 h-12 text-base"
                />
              </div>
            </div>

            {/* Trending Topics Section */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-orange-500" />
                  <h3 className="font-semibold">Trending Now</h3>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {trendingTopics.slice(0, 6).map((topic, index) => (
                    <div
                      key={topic.topic}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 cursor-pointer border"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-muted-foreground">
                          #{index + 1}
                        </span>
                        <div>
                          <p className="font-medium text-sm">#{topic.topic}</p>
                          <p className="text-xs text-muted-foreground">
                            {topic.posts} posts
                          </p>
                        </div>
                      </div>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Moving Tabs Menu */}
            <div className="mb-6">
              <div className="flex overflow-x-auto scrollbar-hide border-b">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-shrink-0 px-6 py-3 text-sm font-medium transition-all duration-200 border-b-2 ${
                      activeTab === tab.id
                        ? "text-blue-600 border-blue-600"
                        : "text-muted-foreground border-transparent hover:text-foreground hover:border-gray-300"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            {renderTabContent()}

            {hasNextPage && (
              <div ref={loadMoreRef} className="flex justify-center py-4">
                {isFetchingNextPage ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                    <span className="text-slate-600">
                      Loading more tweets...
                    </span>
                  </div>
                ) : (
                  <Button
                    onClick={handleLoadMore}
                    variant="outline"
                    className="text-purple-600 border-purple-600 hover:bg-purple-50"
                  >
                    Load more tweets
                  </Button>
                )}
              </div>
            )}

            {/* End of feed indicator */}
            {!hasNextPage && tweets.length > 0 && (
              <div className="text-center py-8 text-slate-500">
                <p>You have reached the end of your feed!</p>
                <Button
                  onClick={() => refetch()}
                  variant="ghost"
                  className="mt-2 text-purple-600 hover:text-purple-700"
                >
                  Refresh to see new tweets
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Who to Follow */}
            <ConnectionSuggestions />
          </div>
        </div>
      </div>
    </div>
  );
}
