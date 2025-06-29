import React from "react";
import FeedClient from "./feedClient";
import { FetchTweets } from "@/hooks/useTweets";

export default async function Feed() {
  const tweets = await FetchTweets();
  return (
    <div>
      <FeedClient data={tweets} />
    </div>
  );
}
