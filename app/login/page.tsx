'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Leaf, Mail, Lock } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Demo login - store user info in localStorage
    setTimeout(() => {
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userEmail', email)
      localStorage.setItem('userName', email.split('@')[0])
      window.location.href = '/dashboard'
    }, 1000)
  }

  const handleDemoLogin = () => {
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('userName', 'Demo User')
    localStorage.setItem('userEmail', 'demo@example.com')
    window.location.href = '/dashboard'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Leaf className="w-16 h-16 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to access the policy hub</p>
        </div>

        {/* Demo Notice */}
        <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800 text-center">
            🔧 Demo Mode: Use any email/password or click Demo Login
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-700 transition disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or</span>
          </div>
        </div>

        {/* Demo Button */}
        <button
          onClick={handleDemoLogin}
          className="w-full bg-gray-600 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition"
        >
          Demo Login (Skip Registration)
        </button>

        {/* Sign Up Link */}
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link href="/signup" className="text-emerald-600 hover:text-emerald-700 font-semibold">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  )
}