import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

export default function SearchBar() {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardContent className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search posts, people, topics..."
            className="pl-10 bg-slate-50 border-0 focus:ring-2 focus:ring-purple-200 rounded-xl"
          />
        </div>
      </CardContent>
    </Card>
  );
}
