"use client";

import UnsignedHome from "@/components/home/unsigned-in-home";
import LoadingBackdrop from "@/components/loading/loadingBackdrop";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, loading, profile } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <LoadingBackdrop isVisible={loading} message="Loading, Please wait" />
    );
  }

  if (user && profile) {
    return router.push("/feed");
  }

  if (!user && !loading) {
    return router.push("/login");
  }

  return <UnsignedHome />;
}
