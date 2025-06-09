'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';

const VerifyEmailpage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [Token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const verifyEmail = async () => {
    try {
      setLoading(true);
      await axios.post('/api/users/verifyemail', { token });
      setVerified(true);
      setError(false);
    } catch (error) {
      setError(true);
      setVerified(false);
      console.log(error.response || error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const urlToken = searchParams.get("token");
    setToken(urlToken || "");
  }, [searchParams]);

  useEffect(() => {
    if (Token.length > 0) {
      verifyEmail();
    }
  }, [Token]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl max-w-md w-full p-8 sm:p-10 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">
          Email Verification
        </h2>

        {loading && (
          <p className="text-gray-700 dark:text-gray-300">Verifying your email, please wait...</p>
        )}

        {!loading && verified && (
          <div className="text-green-600 dark:text-green-400">
            <p className="mb-4 text-lg font-semibold">Your email has been successfully verified!</p>
            <button
              onClick={() => router.push('/login')}
              className="mt-4 inline-block bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              Go to Login
            </button>
          </div>
        )}

        {!loading && error && (
          <div className="text-red-600 dark:text-red-400">
            <p className="mb-4 text-lg font-semibold">Verification failed. The token may be invalid or expired.</p>
            <button
              onClick={() => router.push('/signup')}
              className="mt-4 inline-block bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              Try Signing Up Again
            </button>
          </div>
        )}

        {!loading && !verified && !error && (
          <p className="text-gray-700 dark:text-gray-300">Waiting for verification token...</p>
        )}
      </div>
    </div>
  )
}

export default VerifyEmailpage;
