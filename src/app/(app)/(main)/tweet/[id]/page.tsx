import React from "react";
import TweetClient from "./tweetClient";

export default async function TweetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <TweetClient id={id} />
    </div>
  );
}
