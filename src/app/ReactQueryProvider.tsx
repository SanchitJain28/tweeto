"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/app/get-query-client";

import type * as React from "react";

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider
      client={queryClient}
      // The persistOptions prop is where you configure persistence
    >
      {children}
    </QueryClientProvider>
  );
}
