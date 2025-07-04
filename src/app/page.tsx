"use client";

import UnsignedHome from "@/components/home/unsigned-in-home";
import LoadingBackdrop from "@/components/loading/loadingBackdrop";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, loading, profile } = useAuth();
  const router = useRouter();

  const LOADING = loading;

  if (LOADING) {
    return (
      <LoadingBackdrop isVisible={loading} message="Loading, Please wait" />
    );
  }

  // Show different pages based on authentication status
  if (user && profile) {
    router.push("/feed");
  }

  return <UnsignedHome />;
}
