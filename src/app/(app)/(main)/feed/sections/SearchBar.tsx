import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

export default function SearchBar() {
  return (
    <div className="w-full">
      <div className="relative">
        {/* Icon positioned absolutely */}
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

        <Input
          placeholder="Search posts, people, topics..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 transition-colors focus:bg-white focus:border-slate-300 focus:outline-none focus:ring-0"
        />
      </div>
    </div>
  );
}
