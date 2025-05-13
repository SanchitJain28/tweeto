"use client";
import axios from "axios";
import React from "react";

export default function SendEmailPage() {
  const handleEmail = async () => {
    const { data } = await axios.post("/api/send-email");
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-4xl text-black">Send email from here</p>
      <button
        className="rounded-xl my-4 p-4 bg-white text-black border border-zinc-400 text-2xl"
        onClick={handleEmail}
      >
        Send the email
      </button>
    </div>
  );
}
