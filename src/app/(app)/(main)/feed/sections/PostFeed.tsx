"use client";
import TweetCard from "@/components/main/feed/TweetCard";
import Link from "next/link";
export interface TweetCardProps {
  id: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  text: string;
  image_url: string | null;
  liked_by_current_user: boolean;
  profile_id: string;
  username: string;
  tags: string[];
  total_likes: number;
  total_comments: number;
}

export interface TweetWithStatsAndUser {
  updated_at: string; // ISO date string
  tags: string[] | null;
}

export default function PostFeed({
  tweets,
  user_id,
}: {
  tweets: TweetCardProps[];
  user_id: string;
}) {
  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6">
      {tweets.map((post) => (
        <Link key={post.id} href={`/tweet/${post.id}`}>
          <TweetCard post={post} user_id={user_id} />
        </Link>
      ))}
    </div>
  );
}
