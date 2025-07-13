"use client";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Bookmark,
  Home,
  Mail,
  Search,
  Settings,
  User,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navigationItems = [
  { icon: Home, label: "Home", href: "/feed" },
  { icon: Search, label: "Discover", href: "/discover" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: Mail, label: "Messages", href: "/chat" },
  { icon: Bookmark, label: "Saved", href: "/saved" },
  { icon: User, label: "Profile", href: "/my-profile" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center space-x-3 px-4 py-2">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
          <Zap className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Tweeto
        </h1>
      </div>
      <nav className="flex-1 mt-6 space-y-2">
        {navigationItems.map((item) => (
          <Link href={item.href} key={item.label}>
            <div
              className={`flex items-center space-x-4 px-4 py-3 rounded-full transition-colors duration-200 cursor-pointer ${
                pathname === item.href
                  ? "bg-purple-100 text-purple-700 font-bold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-lg">{item.label}</span>
            </div>
          </Link>
        ))}
      </nav>
      <div className="mt-6">
        <Link href="/post-tweet">
          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg py-6 rounded-full shadow-lg">
            Tweet
          </Button>
        </Link>
      </div>
    </div>
  );
}
