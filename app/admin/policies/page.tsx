'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function AdminPoliciesPage() {
  const [policies, setPolicies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  
  // Form fields
  const [title, setTitle] = useState('')
  const [country, setCountry] = useState('')
  const [date, setDate] = useState('')
  const [summary, setSummary] = useState('')
  
  const supabase = createClient()

  useEffect(() => {
    loadPolicies()
  }, [])

  async function loadPolicies() {
    const { data } = await supabase
      .from('policies')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) {
      setPolicies(data)
    }
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    
    // Validate
    if (!title || !country || !date) {
      setMessage('Please fill in Title, Country, and Date')
      setSaving(false)
      return
    }

    // Create slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    const policyData = {
      title: title,
      slug: slug,
      country: country,
      publication_date: date,
      summary: summary || '',
      key_highlights: [],
      views: 0
    }

    console.log('Saving:', policyData)

    let result
    if (editingId) {
      // Update
      result = await supabase
        .from('policies')
        .update(policyData)
        .eq('id', editingId)
    } else {
      // Insert new
      result = await supabase
        .from('policies')
        .insert([policyData])
    }

    console.log('Result:', result)

    if (result.error) {
      setMessage(`Error: ${result.error.message}`)
    } else {
      setMessage(editingId ? 'Policy updated!' : 'Policy added!')
      // Clear form
      setTitle('')
      setCountry('')
      setDate('')
      setSummary('')
      setEditingId(null)
      // Reload list
      loadPolicies()
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000)
    }
    
    setSaving(false)
  }

  async function deletePolicy(id: string) {
    if (confirm('Delete this policy?')) {
      const { error } = await supabase.from('policies').delete().eq('id', id)
      if (error) {
        setMessage(`Error: ${error.message}`)
      } else {
        setMessage('Policy deleted')
        loadPolicies()
        setTimeout(() => setMessage(''), 3000)
      }
    }
  }

  function editPolicy(policy: any) {
    setTitle(policy.title)
    setCountry(policy.country)
    setDate(policy.publication_date || '')
    setSummary(policy.summary || '')
    setEditingId(policy.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function cancelEdit() {
    setTitle('')
    setCountry('')
    setDate('')
    setSummary('')
    setEditingId(null)
    setMessage('')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Manage Policies</h1>
        
        {/* Message */}
        {message && (
          <div className={`p-3 rounded-lg mb-4 ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}
        
        {/* Add/Edit Form */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? 'Edit Policy' : 'Add New Policy'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="e.g., South Africa Green Hydrogen Roadmap"
                required
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Country *</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g., South Africa"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Publication Date *</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Summary</label>
              <textarea
                rows={3}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Brief description of the policy..."
              />
            </div>
            
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={saving}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50"
              >
                {saving ? 'Saving...' : (editingId ? 'Update Policy' : 'Add Policy')}
              </button>
              
              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
        
        {/* Policies List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h2 className="font-semibold">Existing Policies ({policies.length})</h2>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">Loading...</div>
          ) : (
            <div className="divide-y">
              {policies.map((policy) => (
                <div key={policy.id} className="p-4 flex justify-between items-start hover:bg-gray-50">
                  <div className="flex-1">
                    <h3 className="font-semibold">{policy.title}</h3>
                    <div className="text-sm text-gray-500">
                      {policy.country} | {policy.publication_date}
                    </div>
                    {policy.summary && (
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{policy.summary}</p>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => editPolicy(policy)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deletePolicy(policy.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              
              {policies.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  No policies yet. Add your first policy above!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}