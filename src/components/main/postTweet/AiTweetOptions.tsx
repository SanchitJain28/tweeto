"use client";
import { TweetOptions } from "@/types/Types";
import { Copy, Loader2 } from "lucide-react";
import React from "react";

interface AiTweetOptionProps {
  isAiGenerating: boolean;
  aiTweetOptions: TweetOptions[];
  pasteAiTweet: (index: number) => void;
  currentLimit?: number;
  selectedTweetIndex: number | null;
}

export default function AiTweetOptions({
  isAiGenerating,
  aiTweetOptions,
  pasteAiTweet,
  currentLimit = 280, // Default to Twitter's character limit
  selectedTweetIndex,
}: AiTweetOptionProps) {
  return (
    <div>
      <div className="relative">
        {/* Loading Overlay */}
        {isAiGenerating && (
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
              <p className="text-sm font-medium text-gray-600">
                Regenerating tweets...
              </p>
            </div>
          </div>
        )}

        {/* Content */}
        <div
          className={`grid gap-3 transition-all duration-200 ${isAiGenerating ? "blur-sm" : ""}`}
        >
          {aiTweetOptions.map((tweet, index) => {
            const tweetLength = tweet.text.length;
            const isWithinLimit = tweetLength <= currentLimit;
            const lengthPercentage = (tweetLength / currentLimit) * 100;

            return (
              <div
                key={index}
                onClick={() => !isAiGenerating && pasteAiTweet(index)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                  isAiGenerating
                    ? "cursor-not-allowed"
                    : "cursor-pointer hover:shadow-md"
                } ${
                  selectedTweetIndex === index
                    ? "border-green-500 bg-green-50 shadow-sm"
                    : "border-gray-200 bg-gray-50 hover:border-purple-300 hover:bg-purple-50"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded-full">
                        Option {index + 1}
                      </span>
                      {selectedTweetIndex === index && (
                        <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                          Selected
                        </span>
                      )}
                      {tweet.tone && (
                        <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                          {tweet.tone}
                        </span>
                      )}
                      {!isWithinLimit && (
                        <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                          Over limit
                        </span>
                      )}
                    </div>
                    <p className="text-gray-800 text-sm leading-relaxed mb-2">
                      {tweet.text}
                    </p>
                    {tweet.tags && tweet.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {tweet.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <p
                        className={`text-xs ${isWithinLimit ? "text-gray-500" : "text-orange-600 font-medium"}`}
                      >
                        {tweetLength}/{currentLimit} characters
                      </p>
                      <div className="flex-1 bg-gray-200 rounded-full h-1.5 max-w-20">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            lengthPercentage > 100
                              ? "bg-orange-500"
                              : lengthPercentage > 90
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }`}
                          style={{
                            width: `${Math.min(lengthPercentage, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <Copy className="h-4 w-4 text-gray-400 flex-shrink-0 mt-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
