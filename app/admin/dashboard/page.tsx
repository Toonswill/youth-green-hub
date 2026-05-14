'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { FileText, Users, Clock, CheckCircle, TrendingUp, BookOpen } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    policies: 0,
    briefs: 0,
    pendingBriefs: 0,
    users: 0
  })
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchStats()
  }, [])

  async function fetchStats() {
    // Get policy count
    const { count: policyCount } = await supabase
      .from('policies')
      .select('*', { count: 'exact', head: true })

    // Get brief count
    const { count: briefCount } = await supabase
      .from('policy_briefs')
      .select('*', { count: 'exact', head: true })

    // Get pending briefs
    const { count: pendingCount } = await supabase
      .from('policy_briefs')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending')

    // Get user count
    const { count: userCount } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })

    setStats({
      policies: policyCount || 0,
      briefs: briefCount || 0,
      pendingBriefs: pendingCount || 0,
      users: userCount || 0
    })
    setLoading(false)
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-emerald-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Policies</p>
                <p className="text-3xl font-bold">{stats.policies}</p>
              </div>
              <FileText className="w-10 h-10 text-emerald-500 opacity-50" />
            </div>
            <Link href="/admin/policies" className="text-emerald-600 text-sm mt-2 inline-block">
              Manage Policies →
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Briefs</p>
                <p className="text-3xl font-bold">{stats.briefs}</p>
              </div>
              <BookOpen className="w-10 h-10 text-blue-500 opacity-50" />
            </div>
            <Link href="/admin/briefs" className="text-blue-600 text-sm mt-2 inline-block">
              Review Briefs →
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Pending Review</p>
                <p className="text-3xl font-bold">{stats.pendingBriefs}</p>
              </div>
              <Clock className="w-10 h-10 text-yellow-500 opacity-50" />
            </div>
            <Link href="/admin/briefs?filter=pending" className="text-yellow-600 text-sm mt-2 inline-block">
              Review Now →
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Users</p>
                <p className="text-3xl font-bold">{stats.users}</p>
              </div>
              <Users className="w-10 h-10 text-purple-500 opacity-50" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                href="/admin/policies"
                className="block w-full text-center bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
              >
                + Add New Policy
              </Link>
              <Link
                href="/admin/briefs"
                className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Review Pending Briefs
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <p className="text-gray-500 text-center py-4">
              Activity feed coming soon
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}