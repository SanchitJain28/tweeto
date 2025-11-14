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

  if (!user) return <FeedLoadingSkeleton />;

  if (isLoading) return <FeedLoadingSkeleton />;

  if (error) {
    return (
      <FeedErrorState
        onRetry={() => refetch()}
        error={error?.message || "Failed to load feed data"}
      />
    );
  }

  if (!data) {
    return (
      <FeedErrorState onRetry={() => refetch()} error="No data available" />
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[280px_1fr_340px] gap-6 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Left Sidebar */}
        <aside className="hidden lg:block sticky top-20 h-fit">
          <DesktopSidebar />
        </aside>

        {/* Main Content */}
        <div className="w-full border-l border-r border-gray-200">
          <div className="lg:hidden mb-4 px-4">
            <SearchBar />
          </div>

          <div className="xl:hidden my-4 px-4">
            <ConnectionSuggestions isHorizontal={true} />
          </div>

          <div className="px-4 py-2">
            <PostFeed tweets={tweets} user_id={user.id} />
          </div>

          {/* Infinite Scroll Trigger */}
          {hasNextPage && (
            <div ref={loadMoreRef} className="flex justify-center py-6 px-4">
              {isFetchingNextPage ? (
                <div className="flex items-center space-x-2 text-gray-500">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-gray-900"></div>
                  <span className="text-sm font-medium">Loading...</span>
                </div>
              ) : (
                <Button
                  onClick={handleLoadMore}
                  variant="outline"
                  className="text-gray-700 border-gray-200 hover:bg-gray-50 rounded-lg font-medium text-sm"
                >
                  Load More
                </Button>
              )}
            </div>
          )}

          {/* End of feed indicator */}
          {!hasNextPage && tweets.length > 0 && (
            <div className="text-center py-10 px-4 text-gray-500">
              <p className="font-semibold text-gray-700">
                You have reached the end!
              </p>
              <p className="text-sm mt-1">Check back later for new tweets.</p>
              <Button
                onClick={() => refetch()}
                variant="ghost"
                className="mt-4 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg text-sm font-medium"
              >
                Refresh Feed
              </Button>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <aside className="hidden xl:block sticky top-20 h-fit space-y-6 px-4">
          <SearchBar />
          <TrendingSection />
          <ConnectionSuggestions />
        </aside>
      </main>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {navigationItems.slice(0, 5).map((item, index) => (
            <Link href={item.href || "#"} key={index} className="flex-1">
              <div className="flex flex-col items-center space-y-1 py-3 px-2 text-center hover:bg-gray-50 transition-colors">
                <item.icon className="h-5 w-5 text-gray-700" />
                <span className="text-xs font-medium text-gray-700">
                  {item.label}
                </span>
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
