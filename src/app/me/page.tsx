'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const MePage = () => {
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  const getUserData = async () => {
    try {
      const res = await axios.post("/api/users/me");
      console.log("API Response:", res.data);
      setData(res.data.data || res.data.user); // Full user object
      toast.success("User data loaded");
    } catch (error) {
      console.log("Error:", error);
      toast.error("Failed to load user data");
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message || "Logout failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl max-w-md w-full p-8 sm:p-10 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">
          Welcome, User
        </h2>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Click below to fetch your user info or log out.
        </p>

        {data ? (
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4 text-sm text-gray-900 dark:text-gray-100 text-left">
            <p><strong>User ID:</strong> {data.id}</p>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Username:</strong> {data.username}</p>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No user data yet</p>
        )}

        <div className="flex flex-col gap-4">
          <button
            onClick={getUserData}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Get User Data
          </button>

          <button
            onClick={logout}
            className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Logout
          </button>

          <Link
            href="/"
            className="text-sm text-pink-600 hover:underline mt-2"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MePage;
