import React, { Suspense } from "react";
import CategoryClient from "./CategoryClient";

export default function page() {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <CategoryClient />
    </Suspense>
  );
}
