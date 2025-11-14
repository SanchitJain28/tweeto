"use client";
import TweetCard from "@/components/main/feed/TweetCard";
import Link from "next/link";
import ConnectionSuggestions from "./ConnectionSuggestions";

export interface TweetCardProps {
  id: string;
  created_at: string;
  updated_at: string;
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
  updated_at: string;
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
    <div className="space-y-4">
      {tweets.map((post, index) => {
        return (
          <div key={index}>
            {index % 10 === 0 && index !== 0 ? (
              <div className="flex flex-col">
                <Link href={`/tweet/${post.id}`}>
                  <TweetCard post={post} user_id={user_id} />
                </Link>
                <div className="my-4">
                  <ConnectionSuggestions isHorizontal={true} />
                </div>
              </div>
            ) : (
              <Link href={`/tweet/${post.id}`}>
                <TweetCard post={post} user_id={user_id} />
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
