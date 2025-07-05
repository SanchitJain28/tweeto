"use client";

import { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import NotificationBell from "../Like-comment/NotificationBell";
import Link from "next/link";
import { useNotification } from "@/hooks/useNotification";
import { useAuth } from "@/hooks/useAuth";
import {
  Menu,
  Home,
  Search,
  Bell,
  Bookmark,
  User,
  Settings,
  Zap,
  ChevronRight,
  LogIn,
  UserPlus,
} from "lucide-react";

const allNavigationItems = [
  { icon: Home, label: "Home", active: false, href: "/", requiresAuth: false },
  { icon: Search, label: "Discover", href: "/discover", requiresAuth: false },
  {
    icon: Bell,
    label: "Notifications",
    href: "/notifications",
    requiresAuth: true,
  },
  { icon: Bookmark, label: "Saved", href: "/my-profile", requiresAuth: true },
  { icon: User, label: "Profile", href: "/my-profile", requiresAuth: true },
  {
    icon: Settings,
    label: "Settings",
    href: "/my-profile",
    requiresAuth: true,
  },
];

const guestNavigationItems = [
  { icon: LogIn, label: "Sign In", href: "/signin", requiresAuth: false },
  { icon: UserPlus, label: "Sign Up", href: "/signup", requiresAuth: false },
];

export default function Header() {
  const { user, profile, loading } = useAuth();
  const { unreadCount } = useNotification();
  const [isOpen, setIsOpen] = useState(false);

  const isSignedIn = !!user;

  // Filter navigation items based on authentication state
  const navigationItems = isSignedIn
    ? allNavigationItems.filter((item) => !item.requiresAuth || isSignedIn)
    : [
        ...allNavigationItems.filter((item) => !item.requiresAuth),
        ...guestNavigationItems,
      ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            SocialHub
          </h2>
        </div>
      </div>

      {/* User Profile Section - Only show if signed in */}
      {isSignedIn && (
        <>
          <Link href="/my-profile" onClick={() => setIsOpen(false)}>
            <div className="p-6 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {loading ? (
                    <Skeleton className="h-12 w-12 rounded-full" />
                  ) : (
                    <Avatar className="h-12 w-12 ring-2 ring-blue-100">
                      <AvatarImage src={"/placeholder.svg"} alt={"user"} />
                    </Avatar>
                  )}
                  <div>
                    {loading ? (
                      <>
                        <Skeleton className="h-4 w-20 mb-1" />
                        <Skeleton className="h-3 w-16" />
                      </>
                    ) : (
                      <>
                        <h3 className="font-semibold text-gray-900">
                          {profile?.username}
                        </h3>
                        <p className="text-sm text-gray-500">
                          @{profile?.username.toLowerCase()}
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
              <p className="text-xs text-blue-600 mt-2 font-medium">
                View profile
              </p>
            </div>
          </Link>
          <Separator />
        </>
      )}

      {/* Navigation Items */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigationItems.map((item, index) => (
            <Link
              key={index}
              href={item.href || "#"}
              onClick={() => setIsOpen(false)}
            >
              <Button
                variant="ghost"
                className={`w-full justify-start text-left h-12 px-4 text-gray-700 hover:bg-gray-50 hover:text-gray-900`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                <span className="font-medium">{item.label}</span>
                {item.label === "Notifications" && unreadCount > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </Button>
            </Link>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t">
        <p className="text-xs text-gray-500 text-center">
          © 2024 SocialHub. All rights reserved.
        </p>
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Left Section - Menu Button & Profile (Mobile/Desktop) */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden p-2 hover:bg-gray-100"
                >
                  <Menu className="h-5 w-5 text-gray-700" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <SidebarContent />
              </SheetContent>
            </Sheet>

            {/* Desktop Menu Button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden lg:flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                >
                  <Menu className="h-4 w-4 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">
                    Menu
                  </span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <SidebarContent />
              </SheetContent>
            </Sheet>

            {/* Profile Avatar (Desktop) - Only show if signed in */}
            {loading ? (
              <div className="hidden sm:flex items-center gap-3 p-2">
                <Skeleton className="h-9 w-9 rounded-full" />
                <div className="hidden lg:block">
                  <Skeleton className="h-4 w-20 mb-1" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            ) : (
              isSignedIn && (
                <Link
                  href="/my-profile"
                  className="hidden sm:flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 transition-colors"
                >
                  <Avatar className="h-9 w-9 ring-2 ring-blue-100">
                    <AvatarImage
                      src={"/placeholder.svg"}
                      alt={profile?.username}
                    />
                  </Avatar>
                  <div className="hidden lg:block">
                    <p className="text-sm font-medium text-gray-900">
                      {profile?.username}
                    </p>
                    <p className="text-xs text-gray-500">View profile</p>
                  </div>
                  <ChevronRight className="hidden lg:block h-4 w-4 text-gray-400" />
                </Link>
              )
            )}
          </div>

          {/* Center Section - Welcome Message */}
          <div className="flex-1 text-center lg:text-left">
            {loading ? (
              <>
                <Skeleton className="h-5 w-48 mx-auto lg:mx-0 mb-1" />
                <Skeleton className="hidden sm:block h-4 w-64 mx-auto lg:mx-0" />
              </>
            ) : (
              <>
                <h1 className="text-lg lg:text-xl font-semibold text-gray-900 truncate">
                  {isSignedIn
                    ? `Welcome back, ${profile?.username}`
                    : "Welcome to SocialHub"}
                </h1>
                <p className="hidden sm:block text-sm text-gray-500">
                  {isSignedIn
                    ? "Share your thoughts with the world"
                    : "Discover amazing content and connect with others"}
                </p>
              </>
            )}
          </div>

          {/* Right Section - Notifications & Auth Actions */}
          <div className="flex items-center gap-2">
            {loading ? (
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full sm:hidden" />
                <Skeleton className="hidden sm:block h-8 w-8 rounded-full" />
                <div className="hidden sm:flex items-center gap-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
            ) : (
              <>
                {/* Show different content based on auth state */}
                {isSignedIn ? (
                  <>
                    {/* Mobile Profile Avatar */}
                    <Link href="/profile" className="sm:hidden">
                      <Avatar className="h-8 w-8 ring-2 ring-blue-100 hover:ring-blue-200 transition-all">
                        <AvatarImage
                          src={"/placeholder.svg"}
                          alt={profile?.username}
                        />
                      </Avatar>
                    </Link>

                    {/* Notification Bell */}
                    <Link href="/notifications">
                      <div className="relative">
                        <NotificationBell
                          size={28}
                          className="flex items-center hover:bg-gray-100 rounded-full p-1 transition-colors"
                          unreadCount={unreadCount}
                        />
                      </div>
                    </Link>
                  </>
                ) : (
                  <>
                    {/* Sign In/Sign Up buttons for guests */}
                    <div className="hidden sm:flex items-center gap-2">
                      <Link href="/signin">
                        <Button variant="ghost" size="sm" className="text-sm">
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/signup">
                        <Button
                          size="sm"
                          className="text-sm bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                        >
                          Sign Up
                        </Button>
                      </Link>
                    </div>

                    {/* Mobile auth button */}
                    <Link href="/signin" className="sm:hidden">
                      <Button variant="ghost" size="sm" className="p-2">
                        <LogIn className="h-4 w-4" />
                      </Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
