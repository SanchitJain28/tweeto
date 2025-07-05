import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import Link from "next/link";
import React from "react";

const trendingTopics = [
  { topic: "sports", posts: "125K", growth: "+12%" },
  { topic: "gaming", posts: "89K", growth: "+25%" },
  { topic: "politics", posts: "67K", growth: "+8%" },
  { topic: "food", posts: "45K", growth: "+15%" },
  { topic: "health", posts: "23K", growth: "+30%" },
];

export default function TrendingSection() {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-slate-800">Trending Now</h3>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {trendingTopics.map((topic, index) => (
          <Link href={`/trending/${topic.topic}`} key={index}>
            <div className="hover:bg-slate-50 p-3 rounded-xl cursor-pointer transition-colors">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-slate-800">{topic.topic}</p>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-700 text-xs"
                >
                  {5}
                </Badge>
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
