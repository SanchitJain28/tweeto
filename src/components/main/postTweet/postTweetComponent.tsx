"use client";

import Header from "@/components/header-footer-sidebar/Header";
import LoadingBackdrop from "@/components/loading/loadingBackdrop";

import { useAuth } from "@/hooks/useAuth";
import { Sparkles, TrendingUp } from "lucide-react";
import TweetComposer from "./TweetComposer";

export default function PostTweetPage() {
  const { user, loading } = useAuth();
  const LOADING = loading;
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-6 w-6 text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-800">Create a Tweet</h2>
          </div>
          <p className="text-gray-600">
            Share your thoughts, ideas, or moments with your followers
          </p>
        </div>

        <TweetComposer user_id={user?.id || ""} />

        <div className="mt-8 bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <h3 className="font-semibold text-gray-800">
              Tips for great tweets:
            </h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Keep it concise and engaging</li>
            <li>• Add relevant hashtags to increase visibility</li>
            <li>• Include images or videos when possible</li>
            <li>• Ask questions to encourage engagement</li>
          </ul>
        </div>
      </main>

      <LoadingBackdrop isVisible={LOADING} />
    </div>
  );
}
