'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Bookmark, FileText, User, Calendar, CheckCircle, Clock, XCircle, Download } from 'lucide-react'

export default function UserDashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [savedPolicies, setSavedPolicies] = useState<any[]>([])
  const [userBriefs, setUserBriefs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('briefs')
  const supabase = createClient()

  useEffect(() => {
    fetchUserData()
  }, [])

  async function fetchUserData() {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)

    if (user) {
      // Get saved policies from localStorage
      const saved = JSON.parse(localStorage.getItem('savedPolicies') || '[]')
      setSavedPolicies(saved)

      // Get user's submitted briefs from database
      const { data: briefs, error } = await supabase
        .from('policy_briefs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching briefs:', error)
      } else {
        console.log('User briefs:', briefs)
        setUserBriefs(briefs || [])
      }
    }

    setLoading(false)
  }

  const stats = {
    saved: savedPolicies.length,
    briefs: userBriefs.length,
    approved: userBriefs.filter(b => b.status === 'approved').length,
    pending: userBriefs.filter(b => b.status === 'pending').length,
    rejected: userBriefs.filter(b => b.status === 'rejected').length,
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          <p className="mt-2 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-xl p-8 max-w-md">
          <User className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Not Signed In</h1>
          <p className="text-gray-600 mb-6">Please sign in to view your dashboard.</p>
          <Link href="/login" className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700">
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-10 h-10" />
            <h1 className="text-3xl md:text-4xl font-bold">My Dashboard</h1>
          </div>
          <p className="text-xl opacity-90">Welcome back, {user.email?.split('@')[0]}!</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <Bookmark className="w-8 h-8 text-emerald-600 mb-2" />
            <p className="text-2xl font-bold">{stats.saved}</p>
            <p className="text-gray-600 text-sm">Saved Policies</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <FileText className="w-8 h-8 text-emerald-600 mb-2" />
            <p className="text-2xl font-bold">{stats.briefs}</p>
            <p className="text-gray-600 text-sm">Briefs Submitted</p>
          </div>
          <div className="bg-green-50 rounded-xl p-6 shadow-sm">
            <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
            <p className="text-2xl font-bold">{stats.approved}</p>
            <p className="text-gray-600 text-sm">Approved</p>
          </div>
          <div className="bg-yellow-50 rounded-xl p-6 shadow-sm">
            <Clock className="w-8 h-8 text-yellow-600 mb-2" />
            <p className="text-2xl font-bold">{stats.pending}</p>
            <p className="text-gray-600 text-sm">Pending Review</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('briefs')}
                className={`px-6 py-3 font-semibold transition ${
                  activeTab === 'briefs'
                    ? 'text-emerald-600 border-b-2 border-emerald-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                My Briefs ({stats.briefs})
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`px-6 py-3 font-semibold transition ${
                  activeTab === 'saved'
                    ? 'text-emerald-600 border-b-2 border-emerald-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Saved Policies ({stats.saved})
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* My Briefs Tab */}
            {activeTab === 'briefs' && (
              <div>
                {userBriefs.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No briefs submitted yet</h3>
                    <p className="text-gray-600 mb-4">Share your analysis and recommendations with the community</p>
                    <Link href="/upload" className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
                      Submit a Brief
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userBriefs.map((brief) => (
                      <div key={brief.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900 text-lg">{brief.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            brief.status === 'approved' ? 'bg-green-100 text-green-700' :
                            brief.status === 'rejected' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {brief.status === 'approved' && <CheckCircle className="w-3 h-3 inline mr-1" />}
                            {brief.status === 'pending' && <Clock className="w-3 h-3 inline mr-1" />}
                            {brief.status === 'rejected' && <XCircle className="w-3 h-3 inline mr-1" />}
                            {brief.status.toUpperCase()}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3">{brief.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Submitted: {new Date(brief.created_at).toLocaleDateString()}
                          </span>
                          {brief.tags && brief.tags.length > 0 && (
                            <span className="flex items-center gap-1">
                              🏷️ Tags: {brief.tags.join(', ')}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex gap-3">
                          <a
                            href={brief.pdf_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-600 text-sm hover:text-emerald-700 flex items-center gap-1"
                          >
                            <Download className="w-4 h-4" />
                            Download PDF
                          </a>
                        </div>

                        {/* Show rejection reason if applicable */}
                        {brief.status === 'rejected' && brief.admin_notes && (
                          <div className="mt-3 p-2 bg-red-50 rounded text-sm text-red-700">
                            <strong>Reason:</strong> {brief.admin_notes}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Saved Policies Tab */}
            {activeTab === 'saved' && (
              <div>
                {savedPolicies.length === 0 ? (
                  <div className="text-center py-12">
                    <Bookmark className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No saved policies yet</h3>
                    <p className="text-gray-600 mb-4">Save policies you're interested in to read them later</p>
                    <Link href="/policies" className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
                      Browse Policies
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {savedPolicies.map((policy) => (
                      <Link key={policy.id} href={`/policies/${policy.id}`}>
                        <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition cursor-pointer">
                          <h3 className="font-semibold text-gray-900">{policy.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Saved on {new Date(policy.savedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <Link href="/policies" className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 rounded-xl shadow-sm hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">📚 Explore More Policies</h3>
            <p className="opacity-90">Discover new hydrogen policies across Africa</p>
          </Link>
          <Link href="/upload" className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-xl shadow-sm hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">✍️ Submit Another Brief</h3>
            <p className="opacity-90">Share your insights and recommendations</p>
          </Link>
        </div>
      </div>
    </div>
  )
}