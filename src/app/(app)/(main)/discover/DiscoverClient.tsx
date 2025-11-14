"use client";

import { Card, CardContent } from "@/components/ui/card";

import { useCallback, useEffect, useRef, useState } from "react";
import Header from "@/components/header-footer-sidebar/Header";
import { useFeedData, useTweetsWithCategory } from "@/hooks/useTweets";
import TweetCard from "@/components/main/feed/TweetCard";
import { useAuth } from "@/hooks/useAuth";
import ConnectionSuggestions from "../feed/sections/ConnectionSuggestions";
import { Button } from "@/components/ui/button";
import TrendingSection from "../feed/sections/TrendingSection";
import SearchBar from "@/components/header-footer-sidebar/SearchBar";

export default function DiscoverClient() {
  const [activeTab, setActiveTab] = useState("for-you");
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const { tweets, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useFeedData();

  const shouldFetchCategory = activeTab !== "for-you";

  const {
    tweets: categoryTweets,
    hasNextPage: hasNextPageCategory,
    isFetchingNextPage: isFetchingNextPageCategory,
    fetchNextPage: fetchNextPageCategory,
    isPending: isPendingCategory,
    isError: isErrorCategory,
  } = useTweetsWithCategory({
    category: activeTab,
    enabled: shouldFetchCategory, // Add this option to your hook if supported
  });

  const handleLoadMore = useCallback(() => {
    if (activeTab === "for-you") {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    } else {
      if (hasNextPageCategory && !isFetchingNextPageCategory) {
        fetchNextPageCategory();
      }
    }
  }, [
    activeTab,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPageCategory,
    isFetchingNextPageCategory,
    fetchNextPageCategory,
  ]);

  const tabs = [
    { id: "for-you", label: "For You" },
    { id: "trending", label: "Trending" },
    { id: "news", label: "News" },
    { id: "sports", label: "Sports" },
    { id: "entertainment", label: "Entertainment" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "for-you":
        return (
          <div className="space-y-4">
            {tweets.map((tweet) => (
              <TweetCard key={tweet.id} user_id={user?.id ?? ""} post={tweet} />
            ))}

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
        );

      case "trending":
        return <TrendingSection />;

      // For category tabs (news, sports, entertainment)
      default:
        return (
          <div className="space-y-4">
            {isPendingCategory ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              </div>
            ) : isErrorCategory ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-red-500">
                    Error loading {activeTab} content
                  </p>
                </CardContent>
              </Card>
            ) : categoryTweets && categoryTweets.length > 0 ? (
              <>
                {categoryTweets.map((tweet) => (
                  <TweetCard
                    key={tweet.id}
                    user_id={user?.id ?? ""}
                    post={tweet}
                  />
                ))}

                {hasNextPageCategory && (
                  <div ref={loadMoreRef} className="flex justify-center py-4">
                    {isFetchingNextPageCategory ? (
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
              </>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold mb-4">
                    {tabs.find((tab) => tab.id === activeTab)?.label}
                  </h3>
                  <p className="text-muted-foreground">
                    No content available for {activeTab} at the moment.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
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
            <div className="my-2">
              <SearchBar />
            </div>

            <div className="space-y-6 my-4">
              {/* Who to Follow */}
              <ConnectionSuggestions isHorizontal={true} />
            </div>

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
