"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/dashboard",
    })
    if (res?.error) setError("Invalid credentials")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400">
      <div className="bg-white/90 dark:bg-gray-900/80 backdrop-blur-md shadow-xl rounded-2xl p-10 w-96 flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
          Sign in to continue to your dashboard
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-800 dark:text-gray-100"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-800 dark:text-gray-100"
            required
          />

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="mt-2 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-200"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
          Don’t have an account? <span className="text-purple-600 font-medium cursor-pointer hover:underline">Sign up</span>
        </p>
      </div>
    </div>
  )
}
