import Header from "@/components/header-footer-sidebar/Header";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";
import React from "react";

export default function ProfileError() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
              <User className="w-8 h-8 text-red-600" />
            </div>
            <p className="text-muted-foreground text-lg">
              Failed to load profile data
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
