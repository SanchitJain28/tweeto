"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import TrendingSection from "./sections/TrendingSection";
import ConnectionSuggestions from "./sections/ConnectionSuggestions";
import SearchBar from "./sections/SearchBar";
import { useAuth } from "@/hooks/useAuth";
import { useFeed } from "@/hooks/useTweets";
import PostFeed from "./sections/PostFeed";
import Link from "next/link";
import Header from "@/components/header-footer-sidebar/Header";
import DesktopSidebar, { navigationItems } from "./sections/DesktopSidebar";
import FeedLoadingSkeleton from "./loading-error/FeedLoading";
import FeedErrorState from "./loading-error/FeedError";

const trendingTopics = [
  { topic: "#WebDev", posts: "125K", growth: "+12%" },
  { topic: "#AI", posts: "89K", growth: "+25%" },
  { topic: "#JavaScript", posts: "67K", growth: "+8%" },
  { topic: "#React", posts: "45K", growth: "+15%" },
  { topic: "#NextJS", posts: "23K", growth: "+30%" },
];

interface RecommendedProfile {
  id: string;
  username: string;
}

export default function FeedClient() {
  // authentication
  const { user } = useAuth();
  const { data, isLoading, error, refetch } = useFeed();

  const recommended_profiles: RecommendedProfile[] =
    data?.recommended_profiles || [];
  const tweets = data?.tweets;

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
          <PostFeed tweets={tweets ?? []} user_id={user.id} />
        </div>

        {/* Desktop Right Sidebar */}
        <div className="hidden xl:block w-80 sticky top-4 h-fit space-y-6">
          {/* Search */}
          <SearchBar />

          {/* Trending */}
          <TrendingSection trendingTopics={trendingTopics} />

          {/* People Suggestions - Updated to use recommended_profiles data */}
          <ConnectionSuggestions recommendedProfiles={recommended_profiles} />
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
