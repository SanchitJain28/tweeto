import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon, Send, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import axios from "axios";
import LoadingSpinner from "@/components/loading/LoadingSpinner";

export default function TweetComposer({ user_id }: { user_id: string }) {
  const [tweetText, setTweetText] = useState("");

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
      } catch (error) {
        console.log(error);
        toast("Error occured");
      }
      // Handle tweet posting logic here
      setTweetText("");
      setSelectedImage(null);
      setImagePreview(null);
    }
  };

  const characterCount = tweetText.length;
  const isOverLimit = characterCount > 280;
  const canTweet =
    (tweetText.trim().length > 0 || selectedImage) && !isOverLimit;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="mb-4">
          <Textarea
            placeholder="What's happening?"
            value={tweetText}
            onChange={(e) => setTweetText(e.target.value)}
            className="min-h-[120px] text-lg border-none resize-none focus:ring-0 focus:border-none p-0 placeholder:text-gray-400"
            maxLength={300}
          />
        </div>

        {imagePreview && (
          <div className="relative mb-4">
            <img
              src={imagePreview}
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
                {characterCount}/280
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
                    strokeDashoffset={`${2 * Math.PI * 14 * (1 - Math.min(characterCount / 280, 1))}`}
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
  );
}
