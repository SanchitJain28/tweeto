import Header from "@/components/header-footer-sidebar/Header";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import React from "react";

export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner isVisible={true} />
      </div>
    </div>
  );
}
