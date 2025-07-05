"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import TrendingSection from "./sections/TrendingSection";
import ConnectionSuggestions from "./sections/ConnectionSuggestions";
import SearchBar from "./sections/SearchBar";
import { useAuth } from "@/hooks/useAuth";
import { useFeedData } from "@/hooks/useTweets";
import PostFeed from "./sections/PostFeed";
import Link from "next/link";
import Header from "@/components/header-footer-sidebar/Header";
import DesktopSidebar, { navigationItems } from "./sections/DesktopSidebar";
import FeedLoadingSkeleton from "./loading-error/FeedLoading";
import FeedErrorState from "./loading-error/FeedError";
import { useCallback, useEffect, useRef } from "react";

export default function FeedClient() {
  // authentication
  const { user } = useAuth();
  const {
    tweets,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isLoading,
    refetch,
    data,
  } = useFeedData();

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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

  // useEffect(() => {
  //   if (tweets) {
  //     console.log(tweets);
  //   }
  // }, [tweets]);

  // Show loading state while user authentication is being checked
  if (!user) return <FeedLoadingSkeleton />;

  // Show loading state while data is being fetched
  if (isLoading) return <FeedLoadingSkeleton />;

  // Show error state if there's an error
  if (error) {
    return (
      <FeedErrorState
        onRetry={() => refetch()}
        error={error?.message || "Failed to load feed data"}
      />
    );
  }

  // Show error state if no data is available
  if (!data) {
    return (
      <FeedErrorState onRetry={() => refetch()} error="No data available" />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      <div className="max-w-7xl mx-auto flex gap-6 p-4">
        {/* Desktop Sidebar */}
        <DesktopSidebar />

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

          <Link href={"/post-tweet"}>
            <button className="w-full text-lg my-2 border p-2 rounded-lg bg-gradient-to-r from-[#B148FF] via-[#C029B5] to-[#DE0183] text-white">
              Post a tweet
            </button>
          </Link>

          {/* Posts Feed */}
          <PostFeed tweets={tweets} user_id={user.id} />

          {/* Infinite Scroll Trigger */}
          {hasNextPage && (
            <div ref={loadMoreRef} className="flex justify-center py-4">
              {isFetchingNextPage ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                  <span className="text-slate-600">Loading more tweets...</span>
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

        {/* Desktop Right Sidebar */}
        <div className="hidden xl:block w-80 sticky top-4 h-fit space-y-6">
          {/* Search */}
          <SearchBar />

          {/* Trending */}
          <TrendingSection />

          {/* People Suggestions - Updated to use recommended_profiles data */}
          <ConnectionSuggestions />
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
