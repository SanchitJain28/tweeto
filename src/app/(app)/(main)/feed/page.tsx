import React from "react";
import FeedClient from "./feedClient";
import { checkProfile } from "@/models/checkProfile";

export default async function Feed() {
  await checkProfile();

  return (
    <div>
      <FeedClient />
    </div>
  );
}
