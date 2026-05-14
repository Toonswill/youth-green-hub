'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Leaf, LogOut } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
    const name = localStorage.getItem('userName') || ''
    setIsLoggedIn(loggedIn)
    setUserName(name)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userName')
    localStorage.removeItem('userEmail')
    window.location.href = '/'
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="w-8 h-8 text-emerald-600" />
              <span className="font-bold text-xl bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
                Youth in Green Hydrogen
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/policies" className="text-gray-700 hover:text-emerald-600 transition">Policy Library</Link>
            <Link href="/compare" className="text-gray-700 hover:text-emerald-600 transition">Compare</Link>
            <Link href="/knowledge" className="text-gray-700 hover:text-emerald-600 transition">Knowledge Hub</Link>
            <Link href="/upload" className="text-gray-700 hover:text-emerald-600 transition">Upload Brief</Link>
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Hi, {userName}</span>
                <Link href="/dashboard" className="text-gray-700 hover:text-emerald-600 transition">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="text-gray-700 hover:text-red-600 transition">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link href="/login" className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition" style={{ color: 'white' }}>Sign In</Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-3">
              <Link href="/policies" className="text-gray-700 hover:text-emerald-600 py-2">Policy Library</Link>
              <Link href="/knowledge" className="text-gray-700 hover:text-emerald-600 py-2">Knowledge Hub</Link>
              <Link href="/compare" className="text-gray-700 hover:text-emerald-600 py-2">Compare</Link>
              <Link href="/upload" className="text-gray-700 hover:text-emerald-600 py-2">Upload Brief</Link>
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" className="text-gray-700 hover:text-emerald-600 py-2">Dashboard</Link>
                  <button onClick={handleLogout} className="text-red-600 py-2 text-left">Sign Out</button>
                </>
              ) : (
                <Link href="/login" className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-center">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}