"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import axios from "axios";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { ImageIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";

export function EditDeleteDrawer({
  isOpen = false,
  onOpenChange,
  Data,
  onUpdate,
}: {
  isOpen: boolean;
  onOpenChange: (change: boolean) => void;
  Data: {
    id: string;
    text: string;
    image_url: string;
  };
  onUpdate: (change: { id: string; text: string; image_url: string }) => void;
}) {
  const queryClient = useQueryClient();
  // ... keep existing code (state declarations and handlers)
  const [tweetText, setTweetText] = useState("");
  const [imageURL, setImageURL] = useState<string | null>(null);
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
    setImageURL(null);
  };

  const handleImageUpload = async () => {
    console.log("IMAGE UPLOAD TRIGGERED")
    setImageUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedImage ?? "");
      formData.append("upload_preset", "Tweeto");
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
    if (Data.text.trim() || selectedImage) {
      console.log("Posting tweet:", { text: Data.text, image: selectedImage });

      try {
        let image_url = imageURL;

        if (image_url && !selectedImage) {
          console.log("Using existing image, no upload.");
        } else if (image_url && selectedImage) {
          console.log(
            "New image selected, uploading and replacing existing one."
          );
          image_url = await handleImageUpload();
        } else if (!image_url && selectedImage) {
          console.log("No existing image, uploading new image.");
          image_url = await handleImageUpload();
        } else {
          console.log("No image selected or stored, skipping image upload.");
        }

        console.log(Data.id);

        const { data } = await axios.post("/api/update-tweet", {
          id: Data.id,
          text: tweetText,
          image_url,
        });
        onUpdate({text : tweetText , id : Data.id, image_url:image_url ?? ""})
        onOpenChange(false);
        queryClient.invalidateQueries({ queryKey: ["FullProfile", Data.id] });
        console.log(data);
      } catch (error) {
        console.log(error);
        toast("Error occured");
      }
        setTweetText("");
        setSelectedImage(null);
        setImagePreview(null);
    }
  };

  useEffect(() => {
    if (Data) {
      setTweetText(Data.text);
      setImagePreview(Data.image_url);
      setImageURL(Data.image_url);
    }
  }, [Data]);

  if (!Data) return null;

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh] overflow-hidden">
        <div className="mx-auto w-full max-w-2xl flex flex-col h-full">
          <DrawerHeader className="pb-4 flex-shrink-0">
            <DrawerTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Edit your Tweet
            </DrawerTitle>
          </DrawerHeader>

          <div className="px-6 flex-1 overflow-y-auto min-h-0">
            <div className="space-y-4">
              {/* Tweet Text Area */}
              <div className="space-y-2">
                <div className="relative">
                  <Textarea
                    placeholder="What's happening? Share your thoughts..."
                    value={tweetText}
                    onChange={(e) => setTweetText(e.target.value)}
                    className="min-h-[120px] text-lg border-2 border-gray-200/50 resize-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 rounded-xl p-4 placeholder:text-gray-500 shadow-sm transition-all duration-200 hover:border-gray-300"
                    maxLength={300}
                  />
                  <div className="absolute bottom-3 right-3 text-sm text-gray-400 font-medium">
                    {tweetText.length}/300
                  </div>
                </div>
              </div>

              {/* Image Preview Section */}
              {imagePreview && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700">
                    Image Preview
                  </h4>
                  <div className="relative group">
                    <div className="relative overflow-hidden rounded-xl border-2 border-gray-200/50 shadow-sm">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className={`w-full max-h-48 object-cover transition-all duration-300 ${
                          isImageUploading
                            ? "blur-sm scale-105"
                            : "group-hover:scale-105"
                        }`}
                      />

                      {isImageUploading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                          <div className="text-center space-y-2">
                            <LoadingSpinner
                              isVisible={isImageUploading}
                              className="h-8 w-8 text-blue-500 mx-auto"
                            />
                            <p className="text-sm text-blue-600 font-medium">
                              Uploading image...
                            </p>
                          </div>
                        </div>
                      )}

                      <Button
                        onClick={removeImage}
                        size="sm"
                        variant="destructive"
                        className="absolute top-3 right-3 h-8 w-8 rounded-full p-0 shadow-lg hover:scale-110 transition-transform duration-200"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Image Upload Section */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">Add Media</h4>
                <div className="flex items-center gap-3">
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-200 border border-blue-200/50 hover:border-blue-300 shadow-sm group-hover:shadow-md">
                      <div className="p-2 rounded-lg bg-white shadow-sm group-hover:scale-110 transition-transform duration-200">
                        <ImageIcon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-blue-700">
                          Choose Photo
                        </span>
                        <p className="text-xs text-blue-600/70">
                          PNG, JPG up to 10MB
                        </p>
                      </div>
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
              </div>
            </div>
          </div>

          <DrawerFooter className="border-t border-gray-200/50 bg-gray-50/50 pt-4 pb-4 flex-shrink-0">
            <div className="flex gap-3 w-full">
              <Button
                onClick={handleTweet}
                className="flex-1 py-3 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl"
              >
                Update Tweet
              </Button>
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  className="flex-1 py-3 text-base font-semibold border-2 hover:bg-gray-100 transition-all duration-200 rounded-xl"
                >
                  Cancel
                </Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
