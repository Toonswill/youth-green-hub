'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Menu, X, Leaf, LogOut } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="w-8 h-8 text-emerald-600" />
              <span className="font-bold text-xl bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent hidden sm:inline">
                Youth in Green Hydrogen
              </span>
              <span className="font-bold text-xl bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent sm:hidden">
                YGH
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/policies" className="text-gray-700 hover:text-emerald-600 transition">
              Policies
            </Link>
            <Link href="/compare" className="text-gray-700 hover:text-emerald-600 transition">
              Compare
            </Link>
            <Link href="/knowledge" className="text-gray-700 hover:text-emerald-600 transition">
              Knowledge
            </Link>

            {user ? (
              <>
                <Link href="/upload" className="text-gray-700 hover:text-emerald-600 transition">
                  Upload Brief
                </Link>
                <Link href="/user/dashboard" className="text-gray-700 hover:text-emerald-600 transition">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-1 text-gray-700 hover:text-red-600">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/login" className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t space-y-3">
            <Link href="/policies" className="block text-gray-700 py-2">Policies</Link>
            <Link href="/compare" className="block text-gray-700 py-2">Compare</Link>
            <Link href="/knowledge" className="block text-gray-700 py-2">Knowledge</Link>
            
            {user ? (
              <>
                <Link href="/upload" className="block text-gray-700 py-2">Upload Brief</Link>
                <Link href="/user/dashboard" className="block text-gray-700 py-2">Dashboard</Link>
                <button onClick={handleLogout} className="block text-red-600 py-2 w-full text-left">
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/login" className="block bg-emerald-600 text-white px-4 py-2 rounded-lg text-center">
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}