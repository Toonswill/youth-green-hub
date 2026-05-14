'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { CheckCircle, XCircle, Eye, Download, Clock, RefreshCw } from 'lucide-react'
import Link from 'next/link'

interface Brief {
  id: string
  title: string
  description: string
  author: string
  pdf_url: string
  tags: string[]
  status: 'pending' | 'approved' | 'rejected'
  user_id: string
  created_at: string
}

export default function AdminBriefsPage() {
  const [briefs, setBriefs] = useState<Brief[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [updating, setUpdating] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const supabase = createClient()

  useEffect(() => {
    fetchBriefs()
  }, [])

  async function fetchBriefs() {
    setLoading(true)
    const { data, error } = await supabase
      .from('policy_briefs')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching briefs:', error)
      setMessage('Error loading briefs: ' + error.message)
    } else if (data) {
      setBriefs(data)
    }
    setLoading(false)
  }

  async function updateStatus(id: string, status: 'approved' | 'rejected') {
    setUpdating(id)
    setMessage('')
    
    console.log(`Updating brief ${id} to ${status}`)
    
    const { data, error } = await supabase
      .from('policy_briefs')
      .update({ status: status })
      .eq('id', id)
      .select()
    
    console.log('Update result:', { data, error })
    
    if (error) {
      console.error('Error updating status:', error)
      setMessage(`Error: ${error.message}`)
    } else {
      setMessage(`Brief ${status} successfully!`)
      fetchBriefs() // Refresh the list
    }
    
    setUpdating(null)
    
    // Clear message after 3 seconds
    setTimeout(() => setMessage(''), 3000)
  }

  const filteredBriefs = briefs.filter(brief => {
    if (filter === 'all') return true
    return brief.status === filter
  })

  const stats = {
    total: briefs.length,
    pending: briefs.filter(b => b.status === 'pending').length,
    approved: briefs.filter(b => b.status === 'approved').length,
    rejected: briefs.filter(b => b.status === 'rejected').length,
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Policy Briefs Management</h1>
          <button
            onClick={fetchBriefs}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* Message */}
        {message && (
          <div className={`p-3 rounded-lg mb-4 ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-gray-600">Total Briefs</div>
          </div>
          <div className="bg-yellow-50 rounded-xl p-6 shadow-sm">
            <div className="text-2xl font-bold text-yellow-700">{stats.pending}</div>
            <div className="text-yellow-600">Pending Review</div>
          </div>
          <div className="bg-green-50 rounded-xl p-6 shadow-sm">
            <div className="text-2xl font-bold text-green-700">{stats.approved}</div>
            <div className="text-green-600">Approved</div>
          </div>
          <div className="bg-red-50 rounded-xl p-6 shadow-sm">
            <div className="text-2xl font-bold text-red-700">{stats.rejected}</div>
            <div className="text-red-600">Rejected</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition ${
              filter === 'all' 
                ? 'bg-emerald-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All ({stats.total})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg transition ${
              filter === 'pending' 
                ? 'bg-yellow-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Pending ({stats.pending})
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 rounded-lg transition ${
              filter === 'approved' 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Approved ({stats.approved})
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`px-4 py-2 rounded-lg transition ${
              filter === 'rejected' 
                ? 'bg-red-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Rejected ({stats.rejected})
          </button>
        </div>

        {/* Briefs List */}
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="space-y-4">
            {filteredBriefs.map((brief) => (
              <div key={brief.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{brief.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        brief.status === 'approved' ? 'bg-green-100 text-green-700' :
                        brief.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {brief.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-2">{brief.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                      <span>✍️ Author: {brief.author}</span>
                      <span>📅 {new Date(brief.created_at).toLocaleDateString()}</span>
                      {brief.tags && brief.tags.length > 0 && (
                        <span>🏷️ Tags: {brief.tags.join(', ')}</span>
                      )}
                    </div>
                    
                    <div className="flex gap-3">
                      <a
                        href={brief.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 text-sm"
                      >
                        <Download className="w-4 h-4" />
                        Download PDF
                      </a>
                    </div>
                  </div>
                  
                  {brief.status === 'pending' && (
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => updateStatus(brief.id, 'approved')}
                        disabled={updating === brief.id}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 flex items-center gap-1 disabled:opacity-50"
                      >
                        <CheckCircle className="w-4 h-4" />
                        {updating === brief.id ? 'Updating...' : 'Approve'}
                      </button>
                      <button
                        onClick={() => updateStatus(brief.id, 'rejected')}
                        disabled={updating === brief.id}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 flex items-center gap-1 disabled:opacity-50"
                      >
                        <XCircle className="w-4 h-4" />
                        {updating === brief.id ? 'Updating...' : 'Reject'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {filteredBriefs.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl">
                <Clock className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No briefs found</h3>
                <p className="text-gray-600">No policy briefs match your filter.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}