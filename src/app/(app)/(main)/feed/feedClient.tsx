"use client";
import { Button } from "@/components/ui/button";
import TrendingSection from "./sections/TrendingSection";
import ConnectionSuggestions from "./sections/ConnectionSuggestions";
import { useAuth } from "@/hooks/useAuth";
import { useFeedData } from "@/hooks/useTweets";
import PostFeed from "./sections/PostFeed";
import Link from "next/link";
import Header from "@/components/header-footer-sidebar/Header";
import DesktopSidebar, { navigationItems } from "./sections/DesktopSidebar";
import FeedLoadingSkeleton from "./loading-error/FeedLoading";
import FeedErrorState from "./loading-error/FeedError";
import { useCallback, useEffect, useRef } from "react";
import SearchBar from "@/components/header-footer-sidebar/SearchBar";

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
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />

      <main className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[280px_1fr_340px] gap-8 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Left Sidebar */}
        <aside className="hidden lg:block sticky top-24 h-fit">
          <DesktopSidebar />
        </aside>

        {/* Main Content */}
        <div className="w-full">
          <div className="lg:hidden mb-6">
            <SearchBar />
          </div>

          <div className="xl:hidden my-6">
            <ConnectionSuggestions isHorizontal={true} />
          </div>

          {/* Posts Feed */}
          <PostFeed tweets={tweets} user_id={user.id} />

          {/* Infinite Scroll Trigger */}
          {hasNextPage && (
            <div ref={loadMoreRef} className="flex justify-center py-6">
              {isFetchingNextPage ? (
                <div className="flex items-center space-x-2 text-gray-500">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                  <span>Loading...</span>
                </div>
              ) : (
                <Button
                  onClick={handleLoadMore}
                  variant="outline"
                  className="text-purple-600 border-purple-600 hover:bg-purple-50 rounded-full px-6"
                >
                  Load More
                </Button>
              )}
            </div>
          )}

          {/* End of feed indicator */}
          {!hasNextPage && tweets.length > 0 && (
            <div className="text-center py-10 text-gray-500">
              <p className="font-semibold">You have reached the end!</p>
              <p className="text-sm">Check back later for new tweets.</p>
              <Button
                onClick={() => refetch()}
                variant="ghost"
                className="mt-4 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-full"
              >
                Refresh Feed
              </Button>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <aside className="hidden xl:block sticky top-24 h-fit space-y-8">
          <SearchBar />
          <TrendingSection />
          <ConnectionSuggestions />
        </aside>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {navigationItems.slice(0, 5).map((item, index) => (
            <Link href={item.href || "#"} key={index} className="flex-1">
              <div
                className={`flex flex-col items-center space-y-1 py-2 px-1 text-center `}
              >
                <item.icon className="h-6 w-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* Spacer for mobile nav */}
      <div className="lg:hidden h-16"></div>
    </div>
  );
}
