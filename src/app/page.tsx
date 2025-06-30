"use client"

import SignedInHome from "@/components/home/signed-in-home"
import UnsignedHome from "@/components/home/unsigned-in-home"
import LoadingBackdrop from "@/components/loading/loadingBackdrop"
import { useAuth} from "@/hooks/useAuth"

export default function Home() {
  const { user, loading ,profile } = useAuth()


  const LOADING = loading 

  if (LOADING) {
    return (
      <LoadingBackdrop isVisible={loading} message="Loading, Please wait" />
    )
  }

  // Show different pages based on authentication status
  if (user && profile) {
    return <SignedInHome user={profile} />
  }

  return <UnsignedHome />
}
