"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false)
  
  // Login fields
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  // Registration fields
  const [regName, setRegName] = useState("")
  const [regEmail, setRegEmail] = useState("")
  const [regPassword, setRegPassword] = useState("")
  const [regAge, setRegAge] = useState("")
  const [regGender, setRegGender] = useState("")
  
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    
    const res = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/dashboard",
    })
    if (res?.error) setError("Invalid credentials")
    setLoading(false)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: regName,
          email: regEmail,
          password: regPassword,
          age: parseInt(regAge),
          gender: regGender,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "Registration failed")
        setLoading(false)
        return
      }

      // Auto login after registration
      const signInRes = await signIn("credentials", {
        email: regEmail,
        password: regPassword,
        redirect: true,
        callbackUrl: "/dashboard",
      })

      if (signInRes?.error) {
        setError("Registration successful! Please sign in manually.")
        setIsRegistering(false)
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400">
      <div className="bg-white/90 dark:bg-gray-900/80 backdrop-blur-md shadow-xl rounded-2xl p-10 w-96 flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
          {isRegistering ? "Create Account" : "Welcome Back"}
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
          {isRegistering
            ? "Register to get started with your account"
            : "Sign in to continue to your dashboard"}
        </p>

        {/* Login Form */}
        {!isRegistering && (
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
        )}

        {/* Registration Form */}
        {isRegistering && (
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={regName}
              onChange={(e) => setRegName(e.target.value)}
              className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-800 dark:text-gray-100"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-800 dark:text-gray-100"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-800 dark:text-gray-100"
              required
            />
            <input
              type="number"
              placeholder="Age"
              min="18"
              max="120"
              value={regAge}
              onChange={(e) => setRegAge(e.target.value)}
              className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-800 dark:text-gray-100"
              required
            />
            <select
              value={regGender}
              onChange={(e) => setRegGender(e.target.value)}
              className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-800 dark:text-gray-100"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>
        )}

        <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
          {isRegistering ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => {
                  setIsRegistering(false)
                  setError("")
                }}
                className="text-purple-600 font-medium cursor-pointer hover:underline"
              >
                Sign in
              </span>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <span
                onClick={() => {
                  setIsRegistering(true)
                  setError("")
                }}
                className="text-purple-600 font-medium cursor-pointer hover:underline"
              >
                Sign up
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
