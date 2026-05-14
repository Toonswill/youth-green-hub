'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Bookmark, FileText, MessageCircle, TrendingUp, User, Calendar, Trash2 } from 'lucide-react'

interface SavedPolicy {
  id: string
  title: string
  savedAt: string
}

interface UserBrief {
  id: string
  title: string
  status: 'pending' | 'approved' | 'rejected'
  submittedAt: string
}

export default function DashboardPage() {
  const [savedPolicies, setSavedPolicies] = useState<SavedPolicy[]>([])
  const [userBriefs, setUserBriefs] = useState<UserBrief[]>([])
  const [userName, setUserName] = useState('')
  const [activeTab, setActiveTab] = useState('saved')

  useEffect(() => {
    // Load saved policies
    const saved = JSON.parse(localStorage.getItem('savedPolicies') || '[]')
    setSavedPolicies(saved)
    
    // Load user briefs (from localStorage for demo)
    const briefs = JSON.parse(localStorage.getItem('userBriefs') || '[]')
    setUserBriefs(briefs)
    
    // Load user name
    const name = localStorage.getItem('userName') || 'Guest User'
    setUserName(name)
  }, [])

  const handleRemoveSaved = (policyId: string) => {
    const updated = savedPolicies.filter(p => p.id !== policyId)
    setSavedPolicies(updated)
    localStorage.setItem('savedPolicies', JSON.stringify(updated))
    localStorage.setItem(`saved_${policyId}`, 'false')
  }

  const stats = {
    saved: savedPolicies.length,
    briefs: userBriefs.length,
    approved: userBriefs.filter(b => b.status === 'approved').length,
    pending: userBriefs.filter(b => b.status === 'pending').length
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
          <p className="text-xl opacity-90">Welcome back, {userName}!</p>
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
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <TrendingUp className="w-8 h-8 text-emerald-600 mb-2" />
            <p className="text-2xl font-bold">{stats.approved}</p>
            <p className="text-gray-600 text-sm">Approved Briefs</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <MessageCircle className="w-8 h-8 text-emerald-600 mb-2" />
            <p className="text-2xl font-bold">0</p>
            <p className="text-gray-600 text-sm">Comments</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('saved')}
                className={`px-6 py-3 font-semibold transition ${
                  activeTab === 'saved'
                    ? 'text-emerald-600 border-b-2 border-emerald-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Saved Policies
              </button>
              <button
                onClick={() => setActiveTab('briefs')}
                className={`px-6 py-3 font-semibold transition ${
                  activeTab === 'briefs'
                    ? 'text-emerald-600 border-b-2 border-emerald-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                My Briefs
              </button>
            </div>
          </div>

          <div className="p-6">
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
                  <div className="space-y-4">
                    {savedPolicies.map((policy) => (
                      <div key={policy.id} className="flex justify-between items-start p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
                        <div className="flex-1">
                          <Link href={`/policies/${policy.id}`}>
                            <h3 className="font-semibold text-gray-900 hover:text-emerald-600 mb-2">
                              {policy.title}
                            </h3>
                          </Link>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span>Saved on {new Date(policy.savedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveSaved(policy.id)}
                          className="text-gray-400 hover:text-red-600 transition"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

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
                      <div key={brief.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900">{brief.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            brief.status === 'approved' ? 'bg-green-100 text-green-700' :
                            brief.status === 'rejected' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {brief.status.charAt(0).toUpperCase() + brief.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>Submitted on {new Date(brief.submittedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
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