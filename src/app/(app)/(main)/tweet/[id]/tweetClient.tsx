"use client";
import Header from "@/components/header-footer-sidebar/Header";
import { TweetCard } from "@/components/main/singleTweet/TweetCard";
import { useTweet } from "@/hooks/useTweets";
import React, { useEffect } from "react";

export default function TweetClient({ id }: { id: string }) {
  const { data } = useTweet({ id });
  

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 ">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <TweetCard tweet={data} />
      </div>
    </div>
  );
}
