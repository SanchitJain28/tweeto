"use client";

import SearchBar from "@/components/header-footer-sidebar/SearchBar";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { ImageIcon, X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface ImageFile {
  file: File;
  preview: string;
  id: string;
}

export default function TestPage() {
  const [selectedImages, setSelectedImages] = useState<ImageFile[]>([]);
  const [isImageUploading, setImageUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  const handleImageUpload = async () => {
    if (selectedImages.length === 0) {
      toast("Please select images first", {
        className: "bg-yellow-600 text-white text-lg",
      });
      return;
    }

    setImageUploading(true);
    const urls: string[] = [];

    try {
      // Upload all images concurrently
      const uploadPromises = selectedImages.map(async (imageFile) => {
        const formData = new FormData();
        formData.append("file", imageFile.file);
        formData.append("upload_preset", "Tweeto"); // from Cloudinary settings

        const {
          data: { secure_url },
        } = await axios.post(
          "https://api.cloudinary.com/v1_1/dgemvdcue/auto/upload",
          formData
        );
        return secure_url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      urls.push(...uploadedUrls);
      setUploadedUrls(urls);

      toast(`Successfully uploaded ${urls.length} images`, {
        className: "bg-green-600 text-white text-lg",
      });

      console.log("Uploaded URLs:", urls);
    } catch (error) {
      console.log(error);
      toast("Error uploading images", {
        className: "bg-red-600 text-white text-lg",
      });
    } finally {
      setImageUploading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    const newImages: ImageFile[] = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageFile: ImageFile = {
          file,
          preview: e.target?.result as string,
          id: Math.random().toString(36).substr(2, 9),
        };
        newImages.push(imageFile);

        // Update state when all files are processed
        if (newImages.length === files.length) {
          setSelectedImages((prev) => [...prev, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id: string) => {
    setSelectedImages((prev) => prev.filter((img) => img.id !== id));
  };

  const clearAllImages = () => {
    setSelectedImages([]);
    setUploadedUrls([]);
  };

  const handleUsers = async () => {
    const { data } = await axios.post("/api/test");
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <button
        onClick={handleUsers}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-6"
      >
        Fetch Users
      </button>

      <div className="w-full max-w-2xl">
        {/* Image Upload Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-4">Upload Images</h2>

          <div className="flex items-center gap-4 mb-4">
            <label htmlFor="image-upload" className="cursor-pointer">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-blue-50 transition-colors text-blue-500 border border-blue-300">
                <ImageIcon className="h-5 w-5" />
                <span className="text-sm font-medium">Select Photos</span>
              </div>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {selectedImages.length > 0 && (
              <button
                onClick={clearAllImages}
                className="px-4 py-2 text-red-500 border border-red-300 rounded-full hover:bg-red-50 transition-colors text-sm"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Selected Images Preview */}
          {selectedImages.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Selected Images ({selectedImages.length})
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {selectedImages.map((imageFile) => (
                  <div key={imageFile.id} className="relative group">
                    <img
                      src={imageFile.preview}
                      alt="Preview"
                      className="w-full h-24 object-cover rounded border"
                    />
                    <button
                      onClick={() => removeImage(imageFile.id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleImageUpload}
            disabled={isImageUploading || selectedImages.length === 0}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isImageUploading
              ? `Uploading ${selectedImages.length} images...`
              : `Upload ${selectedImages.length} Images`}
          </button>
        </div>

        {/* Uploaded URLs Display */}
        {uploadedUrls.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">
              Uploaded Images ({uploadedUrls.length})
            </h3>
            <div className="space-y-2">
              {uploadedUrls.map((url, index) => (
                <div
                  key={index}
                  className="p-2 bg-gray-50 rounded text-sm break-all"
                >
                  <strong>Image {index + 1}:</strong> {url}
                </div>
              ))}
            </div>
          </div>
        )}

        <SearchBar />
      </div>
    </div>
  );
}
