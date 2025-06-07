"use client";
import LoadingBackdrop from "@/components/loadingBackdrop";
import SignOut from "@/components/signOut";
import { useAuth } from "@/hooks/useAuth";
export default function Home() {
  // const [loading, setLoading] = useState(false);
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <LoadingBackdrop isVisible={loading} message="Loading , Please wait" />
    );
  }

  if (!user) {
    return (
      <div className="justify-center flex text-4xl">
        Please log in
        <SignOut />
      </div>
    );
  }
  return (
    <div className="">
      <h1 className="justify-center flex text-4xl">
        Welcome {user.email}
        <SignOut />
      </h1>
    </div>
  );
}
