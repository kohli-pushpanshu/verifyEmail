'use client';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const SignUpPage = () => {
    const router = useRouter()
    
  const [user, setuser] = useState({
    username: "",
    email: "",
    password: "",
  })

  const [button, setbutton] = useState(false)
  const [loading, setloading] = useState(false)

  const OnSignUp = async () => {
    try {
      setloading(true)
      const response = await axios.post('/api/users/signup', user)
      console.log("signup success", response.data)
      router.push('/login')
    } catch (error) {
      console.log("signup failed")
      toast.error(error.message)
    } finally {
      setloading(false)
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.username.length > 0 && user.password.length > 0) {
      setbutton(false)
    } else {
      setbutton(true)
    }
  }, [user])

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl max-w-md w-full p-8 sm:p-10">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-8 text-center">
          Create Your Account
        </h2>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={user.username}
              onChange={(e) => setuser({ ...user, username: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
              autoComplete="username"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={(e) => setuser({ ...user, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
              autoComplete="email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={(e) => setuser({ ...user, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
              autoComplete="new-password"
            />
          </div>

          <button
            disabled={button || loading}
            type="submit"
            className={`mt-6 w-full py-3 rounded-lg text-white font-semibold transition
              ${button || loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-pink-500 hover:bg-pink-600'}
            `}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-700 dark:text-gray-300">
          Already have an account?{' '}
          <button
            onClick={() => router.push('/login')}
            className="font-medium text-pink-500 hover:text-pink-600 focus:outline-none"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  )
}

export default SignUpPage
