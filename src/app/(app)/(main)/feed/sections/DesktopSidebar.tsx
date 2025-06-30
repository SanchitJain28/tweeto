import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
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
import React from "react";

export const navigationItems = [
  { icon: Home, label: "Home", active: true },
  { icon: Search, label: "Discover" },
  { icon: Bell, label: "Notifications" },
  { icon: Mail, label: "Messages" },
  { icon: Bookmark, label: "Saved" },
  { icon: User, label: "Profile" },
  { icon: Settings, label: "Settings" },
];

export default function DesktopSidebar() {
  const SidebarContent = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 p-4 lg:p-0">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <Zap className="h-5 w-5 text-white" />
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          SocialHub
        </h1>
      </div>
      <div className="space-y-2">
        {navigationItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className={`w-full justify-start text-slate-700 hover:bg-purple-50 hover:text-purple-700 ${
              item.active ? "bg-purple-50 text-purple-700" : ""
            }`}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
  return (
    <div className="hidden lg:block w-72 sticky top-4 h-fit">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-4">
          <SidebarContent />
        </CardHeader>
      </Card>
      <Button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl shadow-lg">
        Create Post
      </Button>
    </div>
  );
}
