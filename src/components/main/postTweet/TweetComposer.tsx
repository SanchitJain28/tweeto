"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  ImageIcon,
  Send,
  X,
  Sparkles,
  Plus,
  Copy,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import axios from "axios";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import AiTweetOptions from "./AiTweetOptions";
import Chracterlimiter from "./Chracterlimiter";
import { TweetOptions } from "@/types/Types";

export default function TweetComposer({ user_id }: { user_id: string }) {
  const [tweetText, setTweetText] = useState("");
  const [prompt, setPrompt] = useState("");
  const [aiTweetOptions, setAiTweetOptions] = useState<TweetOptions[]>([]);
  const [selectedTweetIndex, setSelectedTweetIndex] = useState<number | null>(
    null
  );
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [showAiOptions, setShowAiOptions] = useState(false);
  const [isResponseMinimized, setIsResponseMinimized] = useState(false);
  const [additionalContext, setAdditionalContext] = useState("");
  const [showContextInput, setShowContextInput] = useState(false);
  const [characterLimit, setCharacterLimit] = useState(280);
  const [showImproveTweet, setShowImproveTweet] = useState(false);
  const [improveTweetOptions, setImproveTweetOptions] = useState<
    TweetOptions[]
  >([]);
  const [isImprovingTweet, setIsImprovingTweet] = useState(false);

  //image states
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isImageUploading, setImageUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleImageUpload = async () => {
    setImageUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedImage ?? "");
      formData.append("upload_preset", "Tweeto"); // from Cloudinary settings
      const {
        data: { secure_url },
      } = await axios.post(
        "https://api.cloudinary.com/v1_1/dgemvdcue/auto/upload",
        formData
      );
      return secure_url;
    } catch (error) {
      console.log(error);
      toast("Error uploading the image", {
        className: "bg-red-600 text-white text-lg",
      });
    } finally {
      setImageUploading(false);
    }
  };

  const handleTweet = async () => {
    if (tweetText.trim() || selectedImage) {
      console.log("Posting tweet:", { text: tweetText, image: selectedImage });

      try {
        let image_url = null;

        if (selectedImage) {
          image_url = await handleImageUpload();
        }

        const { data } = await axios.post("/api/post-tweet", {
          profile_id: user_id,
          text: tweetText,
          image_url,
        });
        console.log(data);
        toast("Tweet posted successfully!", {
          className: "bg-green-600 text-white text-lg",
        });
      } catch (error) {
        console.log(error);
        toast("Error occurred while posting tweet", {
          className: "bg-red-600 text-white text-lg",
        });
      }
      // Reset form
      setTweetText("");
      setSelectedImage(null);
      setImagePreview(null);
      setAiTweetOptions([]);
      setSelectedTweetIndex(null);
      setShowAiOptions(false);
      setPrompt("");
      setIsResponseMinimized(false);
      setAdditionalContext("");
      setShowContextInput(false);
      setShowImproveTweet(false);
      setImproveTweetOptions([]);
    }
  };

  const createWithAi = async () => {
    if (!prompt.trim()) {
      toast("Please enter a prompt for AI", {
        className: "bg-yellow-600 text-white text-lg",
      });
      return;
    }

    setIsAiGenerating(true);
    setShowContextInput(false);
    setIsResponseMinimized(false);
    setSelectedTweetIndex(null);

    try {
      const fullPrompt = additionalContext
        ? `${prompt}. Additional context: ${additionalContext}`
        : prompt;
      const targetLength = characterLimit;

      const { data } = await axios.post("/api/chat", {
        prompt: ` ${fullPrompt}`,
        targetLength,
        tweetContext: tweetText,
      });

      setAiTweetOptions(data.tweets);
      setShowAiOptions(true);
      setAdditionalContext(""); // Clear additional context after use
    } catch (error) {
      console.log(error);
      toast("Error generating AI tweet", {
        className: "bg-red-600 text-white text-lg",
      });
    } finally {
      setIsAiGenerating(false);
    }
  };

  const improveTweet = async () => {
    if (!tweetText.trim()) {
      toast("Please enter some text to improve", {
        className: "bg-yellow-600 text-white text-lg",
      });
      return;
    }

    setIsImprovingTweet(true);
    setShowImproveTweet(false);

    try {
      const targetLength = characterLimit;
      const { data } = await axios.post("/api/chat", {
        prompt: `Improve this tweet and make it more engaging: "${tweetText}"`,
        targetLength,
        tweetContext: tweetText,
        improveMode: true,
      });

      setImproveTweetOptions(data.tweets);
      setShowImproveTweet(true);
    } catch (error) {
      console.log(error);
      toast("Error improving tweet", {
        className: "bg-red-600 text-white text-lg",
      });
    } finally {
      setIsImprovingTweet(false);
    }
  };

  const expandResponse = () => {
    setIsResponseMinimized(false);
    setShowContextInput(false);
  };

  const pasteAiTweet = (tweetIndex: number) => {
    const selectedTweet = aiTweetOptions[tweetIndex];
    setTweetText(selectedTweet.text);
    setSelectedTweetIndex(tweetIndex);
    setIsResponseMinimized(true);
    toast("AI tweet pasted successfully!", {
      className: "bg-green-600 text-white text-lg",
    });
  };

  const addMoreContext = () => {
    setShowContextInput(true);
    setIsResponseMinimized(true);
  };

  const characterCount = tweetText.length;
  const isOverLimit = characterCount > characterLimit;
  const canTweet =
    (tweetText.trim().length > 0 || selectedImage) && !isOverLimit;

  return (
    <div className="space-y-4">
      {/* AI Tweet Generator Section */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-purple-700">
            <Sparkles className="h-5 w-5" />
            Create or improve this tweet with AI
          </CardTitle>
        </CardHeader>
        <div className="relative">
          <CardContent
            className={`space-y-4 transition-all duration-300 ${isAiGenerating ? "blur-sm" : ""}`}
          >
            <div className="space-y-2">
              <Input
                placeholder="What should this tweet be about? (e.g., 'productivity tips for developers', 'latest tech trends')"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                disabled={isAiGenerating}
              />
              <p className="text-sm text-gray-600">
                💡 Be specific about the topic, tone, or style you want for your
                tweet
              </p>
            </div>

            {/* Character Limit Selector */}
            <Chracterlimiter
              isAiGenerating={isAiGenerating}
              onChange={(value: number) => setCharacterLimit(value)}
              characterLimit={characterLimit}
            />

            {!showAiOptions && !isAiGenerating && (
              <Button
                onClick={createWithAi}
                disabled={!prompt.trim()}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Tweet Options ({characterLimit} chars)
              </Button>
            )}

            {showAiOptions && aiTweetOptions.length > 0 && (
              <div className="space-y-4 p-4 bg-white rounded-lg border border-purple-200">
                {isResponseMinimized ? (
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-purple-600" />
                      <span className="text-sm text-gray-600">
                        {selectedTweetIndex !== null
                          ? `Option ${selectedTweetIndex + 1} selected`
                          : `${aiTweetOptions.length} tweet options generated`}
                      </span>
                      {selectedTweetIndex !== null && (
                        <span className="text-xs text-gray-500">
                          ({aiTweetOptions[selectedTweetIndex].text.length}/
                          {characterLimit} chars)
                        </span>
                      )}
                    </div>
                    <Button
                      onClick={expandResponse}
                      variant="ghost"
                      size="sm"
                      className="text-purple-600 hover:text-purple-700"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Expand
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3">
                      <AiTweetOptions
                        isAiGenerating={isAiGenerating}
                        aiTweetOptions={aiTweetOptions}
                        pasteAiTweet={pasteAiTweet}
                        currentLimit={characterLimit}
                        selectedTweetIndex={selectedTweetIndex}
                      />
                    </div>

                    <div className="flex gap-2 flex-wrap pt-2 border-t border-gray-100">
                      <Button
                        onClick={addMoreContext}
                        variant="outline"
                        className="border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent"
                        disabled={isAiGenerating}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add More Context
                      </Button>

                      <Button
                        onClick={createWithAi}
                        variant="outline"
                        className="border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent"
                        disabled={isAiGenerating}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Regenerate tweets
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}

            {showContextInput && (
              <div className="space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="space-y-2">
                  <h4 className="font-medium text-blue-800 flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add More Context
                  </h4>
                  <p className="text-sm text-blue-600">
                    Provide additional details to refine your tweet generation
                  </p>
                </div>

                <Textarea
                  placeholder="Add more specific details, tone, target audience, or style preferences..."
                  value={additionalContext}
                  onChange={(e) => setAdditionalContext(e.target.value)}
                  className="border-blue-200 focus:border-blue-400 focus:ring-blue-400 min-h-[80px]"
                  disabled={isAiGenerating}
                />

                <div className="flex gap-2">
                  <Button
                    onClick={createWithAi}
                    disabled={!additionalContext.trim() || isAiGenerating}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Regenerate Options ({characterLimit} chars)
                  </Button>
                  <Button
                    onClick={() => {
                      setShowContextInput(false);
                      setAdditionalContext("");
                      setIsResponseMinimized(false);
                    }}
                    variant="outline"
                    className="border-blue-200 text-blue-700 hover:bg-blue-50"
                    disabled={isAiGenerating}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>

          {/* Loading Spinner Overlay */}
          {isAiGenerating && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-[1px] rounded-lg z-10">
              <div className="flex flex-col items-center gap-3 p-6 bg-white rounded-lg shadow-lg border border-purple-200">
                <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-800">
                    Generating tweet options...
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    This may take a few seconds
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Main Tweet Composer */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6">
          <div className="mb-4">
            <Textarea
              placeholder="What's happening?"
              value={tweetText}
              onChange={(e) => setTweetText(e.target.value)}
              className="min-h-[120px] text-lg border-none resize-none focus:ring-0 focus:border-none p-0 placeholder:text-gray-400"
              maxLength={characterLimit + 50} // Allow some buffer for editing
            />
          </div>

          {tweetText.trim() && !showImproveTweet && !isImprovingTweet && (
            <div className="mt-3 flex justify-end">
              <Button
                onClick={improveTweet}
                variant="outline"
                size="sm"
                className="border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Improve Tweet
              </Button>
            </div>
          )}

          {isImprovingTweet && (
            <div className="mt-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center justify-center space-x-2">
                <LoadingSpinner
                  isVisible={true}
                  className="h-5 w-5 text-purple-600"
                />
                <span className="text-purple-600 font-medium">
                  Improving your tweet...
                </span>
              </div>
            </div>
          )}

          {showImproveTweet && improveTweetOptions.length > 0 && (
            <div className="mt-3 space-y-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-purple-800 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Improved Tweet Options:
                </h4>
                <Button
                  onClick={() => setShowImproveTweet(false)}
                  variant="ghost"
                  size="sm"
                  className="text-purple-600 hover:text-purple-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-3">
                {improveTweetOptions.map((tweet, index) => {
                  const tweetLength = tweet.text.length;
                  const isWithinLimit = tweetLength <= characterLimit;

                  return (
                    <div
                      key={index}
                      onClick={() => {
                        setTweetText(tweet.text);
                        setShowImproveTweet(false);
                        toast("Improved tweet applied!", {
                          className: "bg-green-600 text-white text-lg",
                        });
                      }}
                      className="p-3 rounded-lg border-2 border-purple-200 bg-white cursor-pointer transition-all duration-200 hover:shadow-md hover:border-purple-300"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                              Option {index + 1}
                            </span>
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
                          <p
                            className={`text-xs ${isWithinLimit ? "text-gray-500" : "text-orange-600 font-medium"}`}
                          >
                            {tweetLength}/{characterLimit} characters
                          </p>
                        </div>
                        <Copy className="h-4 w-4 text-gray-400 flex-shrink-0 mt-1" />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-purple-600 text-center">
                💡 Click on any option to replace your current tweet
              </p>
            </div>
          )}

          {imagePreview && (
            <div className="relative mb-4">
              <img
                src={imagePreview || "/placeholder.svg"}
                alt="Preview"
                className={`w-full max-h-64 object-cover rounded-lg border ${isImageUploading ? "blur-sm" : ""} border-gray-200`}
              />

              {isImageUploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm rounded-lg">
                  <LoadingSpinner
                    isVisible={isImageUploading}
                    className="h-8 w-8 text-blue-500"
                  />
                </div>
              )}

              <Button
                onClick={removeImage}
                size="sm"
                variant="destructive"
                className="absolute top-2 right-2 h-8 w-8 rounded-full p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-blue-50 transition-colors text-blue-500">
                  <ImageIcon className="h-5 w-5" />
                  <span className="text-sm font-medium">Photo</span>
                </div>
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm ${isOverLimit ? "text-red-500" : "text-gray-500"}`}
                >
                  {characterCount}/{characterLimit}
                </span>
                <div className="w-8 h-8 relative">
                  <svg
                    className="w-8 h-8 transform -rotate-90"
                    viewBox="0 0 32 32"
                  >
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      className="text-gray-200"
                    />
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 14}`}
                      strokeDashoffset={`${2 * Math.PI * 14 * (1 - Math.min(characterCount / characterLimit, 1))}`}
                      className={isOverLimit ? "text-red-500" : "text-blue-500"}
                    />
                  </svg>
                </div>
              </div>

              <Button
                onClick={handleTweet}
                disabled={!canTweet}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 px-6 py-2 rounded-full font-medium transition-all duration-200 transform hover:scale-105"
              >
                <Send className="h-4 w-4 mr-2" />
                Tweet
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
