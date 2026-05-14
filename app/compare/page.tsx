'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Trash2, Check, X, ArrowRight, Download, Share2, BarChart3, Target, Zap, Users, TrendingUp } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Policy {
  id: string
  title: string
  country: string
  category: string
  key_highlights: string[]
  youth_implications: string
  opportunities: string
  infrastructure_plans?: string[]
  publication_date: string
}

export default function ComparePage() {
  const [selectedPolicies, setSelectedPolicies] = useState<Policy[]>([])
  const [availablePolicies, setAvailablePolicies] = useState<Policy[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchPolicies()
  }, [])

  useEffect(() => {
    // Load saved compare list from localStorage
    const savedIds = JSON.parse(localStorage.getItem('compareList') || '[]')
    if (savedIds.length > 0 && availablePolicies.length > 0) {
      const saved = availablePolicies.filter(p => savedIds.includes(p.id))
      if (saved.length > 0) {
        setSelectedPolicies(saved)
      }
    }
  }, [availablePolicies])

  async function fetchPolicies() {
    setLoading(true)
    
    const { data, error } = await supabase
      .from('policies')
      .select('*')
      .order('country', { ascending: true })
    
    if (error) {
      console.error('Error fetching policies:', error)
    } else if (data) {
      // Transform data to match the expected format
      const formattedPolicies = data.map((p: any) => ({
        id: p.id,
        title: p.title,
        country: p.country,
        category: p.category || 'Policy',
        key_highlights: p.key_highlights || [],
        youth_implications: p.youth_implications || 'No specific youth information yet.',
        opportunities: p.opportunities || 'Check back for updates.',
        infrastructure_plans: [],
        publication_date: p.publication_date
      }))
      setAvailablePolicies(formattedPolicies)
    }
    
    setLoading(false)
  }

  const addPolicy = (policy: Policy) => {
    if (selectedPolicies.length < 4) {
      const newSelected = [...selectedPolicies, policy]
      setSelectedPolicies(newSelected)
      // Save to localStorage
      localStorage.setItem('compareList', JSON.stringify(newSelected.map(p => p.id)))
    }
    setShowDropdown(false)
  }

  const removePolicy = (policyId: string) => {
    const newSelected = selectedPolicies.filter(p => p.id !== policyId)
    setSelectedPolicies(newSelected)
    localStorage.setItem('compareList', JSON.stringify(newSelected.map(p => p.id)))
  }

  const exportComparison = () => {
    const data = {
      comparedPolicies: selectedPolicies.map(p => ({
        title: p.title,
        country: p.country,
        keyHighlights: p.key_highlights,
        youthImplications: p.youth_implications,
        opportunities: p.opportunities
      }))
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `policy-comparison-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          <p className="mt-2 text-gray-600">Loading policies...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-3">
            <BarChart3 className="w-10 h-10" />
            Policy Comparison Tool
          </h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Compare green hydrogen policies across African countries side-by-side
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Policy Selector */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Select Policies to Compare (2-4 policies)</h2>
          <div className="flex flex-wrap gap-3 mb-4">
            {selectedPolicies.map(policy => (
              <div key={policy.id} className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 flex items-center gap-2">
                <span className="text-sm font-semibold text-emerald-700">{policy.country}</span>
                <button onClick={() => removePolicy(policy.id)} className="text-emerald-600 hover:text-red-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            {selectedPolicies.length < 4 && (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Policy
                </button>
                {showDropdown && (
                  <div className="absolute top-full mt-2 left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[250px] max-h-64 overflow-y-auto">
                    {availablePolicies
                      .filter(p => !selectedPolicies.some(sp => sp.id === p.id))
                      .map(policy => (
                        <button
                          key={policy.id}
                          onClick={() => addPolicy(policy)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 transition border-b last:border-0"
                        >
                          <div className="font-semibold">{policy.country}</div>
                          <div className="text-xs text-gray-500">{policy.title.substring(0, 60)}...</div>
                        </button>
                      ))}
                    {availablePolicies.filter(p => !selectedPolicies.some(sp => sp.id === p.id)).length === 0 && (
                      <div className="px-4 py-3 text-gray-500 text-sm">All policies selected</div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          {selectedPolicies.length === 0 && (
            <p className="text-gray-500 text-sm">Select 2-4 policies to start comparing</p>
          )}
        </div>

        {/* Comparison Table */}
        {selectedPolicies.length >= 2 && (
          <>
            {/* Export Options */}
            <div className="flex justify-end gap-3 mb-6">
              <button
                onClick={exportComparison}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                <Download className="w-4 h-4" />
                Export Comparison
              </button>
            </div>

            {/* Comparison Grid */}
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {/* Header Row */}
                <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `250px repeat(${selectedPolicies.length}, 1fr)` }}>
                  <div className="bg-gray-100 rounded-lg p-4 font-semibold">Feature</div>
                  {selectedPolicies.map(policy => (
                    <div key={policy.id} className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-4">
                      <div className="font-bold text-emerald-800">{policy.country}</div>
                      <div className="text-xs text-gray-600 mt-1">{policy.title.substring(0, 50)}...</div>
                      <div className="text-xs text-gray-500 mt-2">Published: {new Date(policy.publication_date).getFullYear()}</div>
                    </div>
                  ))}
                </div>

                {/* Key Highlights Row */}
                <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `250px repeat(${selectedPolicies.length}, 1fr)` }}>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <Target className="w-5 h-5 text-emerald-600 mb-2" />
                    <div className="font-semibold">Key Highlights</div>
                  </div>
                  {selectedPolicies.map(policy => (
                    <div key={policy.id} className="bg-white rounded-lg p-4 border border-gray-200">
                      {policy.key_highlights && policy.key_highlights.length > 0 ? (
                        <ul className="space-y-2">
                          {policy.key_highlights.slice(0, 3).map((highlight, idx) => (
                            <li key={idx} className="text-sm flex items-start gap-2">
                              <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500">No highlights available</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Youth Opportunities Row */}
                <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `250px repeat(${selectedPolicies.length}, 1fr)` }}>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <Users className="w-5 h-5 text-emerald-600 mb-2" />
                    <div className="font-semibold">Youth Opportunities</div>
                  </div>
                  {selectedPolicies.map(policy => (
                    <div key={policy.id} className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="text-sm text-gray-700">{policy.youth_implications}</p>
                      {policy.opportunities && (
                        <div className="mt-2 pt-2 border-t">
                          <p className="text-xs text-emerald-600 font-semibold">Opportunities:</p>
                          <p className="text-sm text-gray-700">{policy.opportunities}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Best for Youth Row */}
                <div className="grid gap-4 mt-6" style={{ gridTemplateColumns: `250px repeat(${selectedPolicies.length}, 1fr)` }}>
                  <div className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-lg p-4 font-semibold">
                    ⭐ Best for Youth
                  </div>
                  {selectedPolicies.map(policy => {
                    const hasYouthInfo = policy.youth_implications && policy.youth_implications !== 'No specific youth information yet.'
                    return (
                      <div key={policy.id} className={`rounded-lg p-4 text-center ${hasYouthInfo ? 'bg-emerald-100 border-2 border-emerald-500' : 'bg-gray-50'}`}>
                        {hasYouthInfo ? (
                          <div>
                            <div className="text-2xl mb-1">🏆</div>
                            <div className="font-bold text-emerald-700">Top Choice</div>
                            <div className="text-xs text-gray-600 mt-1">Youth-focused policy</div>
                          </div>
                        ) : (
                          <div className="text-gray-500 text-sm">More info coming</div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Recommendation Section */}
            <div className="mt-8 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">📊 Recommendation</h3>
              {(() => {
                const bestForYouth = selectedPolicies.reduce((best, current) => {
                  const bestScore = best.youth_implications && best.youth_implications !== 'No specific youth information yet.' ? 1 : 0
                  const currentScore = current.youth_implications && current.youth_implications !== 'No specific youth information yet.' ? 1 : 0
                  return currentScore > bestScore ? current : best
                })
                return (
                  <div className="space-y-2">
                    <p className="opacity-95">
                      <strong>Best for Youth Opportunities:</strong> {bestForYouth.country} offers youth-focused initiatives.
                    </p>
                    <Link
                      href={`/policies/${bestForYouth.id}`}
                      className="inline-flex items-center gap-2 mt-3 text-white border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-emerald-700 transition"
                    >
                      View Full Policy Details
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )
              })()}
            </div>
          </>
        )}

        {/* Empty State */}
        {selectedPolicies.length < 2 && selectedPolicies.length > 0 && (
          <div className="text-center py-12 bg-white rounded-xl">
            <p className="text-gray-500">Add one more policy to start comparing</p>
          </div>
        )}

        {selectedPolicies.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl">
            <BarChart3 className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Compare African Hydrogen Policies</h3>
            <p className="text-gray-600">Select 2-4 policies above to see a side-by-side comparison</p>
            <Link href="/policies" className="inline-block mt-4 text-emerald-600 hover:text-emerald-700">
              Browse All Policies →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}