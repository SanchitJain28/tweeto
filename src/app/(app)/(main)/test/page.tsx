"use client";

import axios from "axios";
import React from "react";

export default function TestPage() {
  const handleUsers = async () => {
    const { data } = await axios.post("/api/test");
    console.log(data);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <button
        onClick={handleUsers}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Fetch Users
      </button>
    </div>
  );
}
