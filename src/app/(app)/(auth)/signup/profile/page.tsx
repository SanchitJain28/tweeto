"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@uidotdev/usehooks";
import { useForm } from "react-hook-form";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface FormData {
  username: string;
  displayName: string;
  bio?: string;
}

export default function CreateProfile() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
  } = useForm<FormData>();
  
  const [username, setUsername] = useState<string>("");
  const [isUsernameTaken, setIsUsernameTaken] = useState<boolean | null>(null);
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const debouncedSearchTerm = useDebounce(username, 300);

  // Username validation function
  const validateUsername = (value: string) => {
    // Check for spaces
    if (value.includes(' ')) {
      return "Username cannot contain spaces";
    }
    
    // Check for uppercase letters
    if (value !== value.toLowerCase()) {
      return "Username cannot contain uppercase letters";
    }
    
    // Check for special characters (only underscore and numbers are allowed)
    const validPattern = /^[a-z0-9_]+$/;
    if (!validPattern.test(value)) {
      return "Username can only contain lowercase letters, numbers, and underscores";
    }
    
    // Check minimum length
    if (value.length < 3) {
      return "Username must be at least 3 characters long";
    }
    
    return true;
  };

  const getUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(user);
      console.log(user?.id);

      setUser(user);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const createNewProfile = async (data: FormData) => {
    console.log(data);
    console.log(user?.id);
    
    // Don't proceed if username is taken
    if (isUsernameTaken) {
      toast("Please choose a different username", {
        position: "bottom-center",
        type: "error",
      });
      return;
    }
    
    try {
      const { error } = await supabase.from("profiles").insert({
        id: user?.id,
        username: data.username,
        full_name: data.displayName,
        bio: data.bio,
      });
      if (error) {
        if (error.code === "23505") {
          toast(
            <div>
              <p className="text-lg font-bold">
                Profile already exists, Redirecting you to home page
              </p>
            </div>
          );
          setTimeout(() => {
            router.replace("/");
          }, 1500);
          return;
        }
      }
      toast("Profile created successfully!", {
        position: "bottom-center",
        type: "success",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const checkForUsername = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", username);

      if (error) {
        console.error("Error checking username:", error);
        return false;
      }

      if (data.length !== 0) {
        console.log("Username already exists");
        setIsUsernameTaken(true);
        return true; // Username is taken
      }
      setIsUsernameTaken(false);
      return false; // Username is available
    } catch (error) {
      console.error("Error checking username:", error);
      return false;
    }
  };

  useEffect(() => {
    const checkUsername = async () => {
      if (debouncedSearchTerm) {
        // Only check availability if username passes validation
        const validation = validateUsername(debouncedSearchTerm);
        if (validation === true) {
          const isTaken = await checkForUsername();
          if (isTaken) {
            console.log("Username is taken");
          } else {
            console.log("Username is available");
          }
        } else {
          // Reset availability check if validation fails
          setIsUsernameTaken(null);
        }
      }
    };
    checkUsername();
  }, [debouncedSearchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Create Your Profile
          </CardTitle>
          <CardDescription>
            Choose a username and set up your profile
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(createNewProfile)} className="space-y-4">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                @
              </div>

              <Input
                id="username"
                {...register("username", {
                  required: "Username is required",
                  validate: validateUsername
                })}
                placeholder="your_username"
                onChange={(e) => setUsername(e.target.value)}
                className={`pl-8 pr-10 ${errors.username ? 'border-red-500 focus:border-red-500' : ''}`}
              />
            </div>
            
            {/* Validation error message */}
            {errors.username && (
              <p className="text-red-500 text-sm -mt-2">
                {errors.username.message}
              </p>
            )}
            
            {/* Username availability message */}
            {!errors.username && (
              <p
                className={`text-sm -mt-2 ${
                  isUsernameTaken === null 
                    ? "text-gray-500" 
                    : isUsernameTaken 
                      ? "text-red-500" 
                      : "text-green-500"
                }`}
              >
                {isUsernameTaken === null
                  ? "Username can contain lowercase letters, numbers, and underscores only"
                  : isUsernameTaken
                    ? "Username is taken"
                    : "Username is available"}
              </p>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                {...register("displayName", {
                  required: "Display name is required"
                })}
                placeholder="Your full name"
                className={errors.displayName ? 'border-red-500 focus:border-red-500' : ''}
              />
              {errors.displayName && (
                <p className="text-red-500 text-sm">
                  {errors.displayName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio (Optional)</Label>
              <Textarea
                {...register("bio")}
                id="bio"
                placeholder="Tell us a bit about yourself..."
                className="resize-none"
                rows={3}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={!!errors.username || isUsernameTaken === true}
            >
              Create Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}