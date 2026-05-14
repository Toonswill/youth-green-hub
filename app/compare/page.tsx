'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Trash2, Check, X, ArrowRight, Download, Share2, BarChart3, Target, Zap, Users, TrendingUp } from 'lucide-react'

interface Policy {
  id: string
  title: string
  country: string
  category: string
  keyTargets: string[]
  youthOpportunities: string[]
  infrastructurePlans: string[]
  publicationDate: string
}

// Same mock data
const policiesData: Record<string, Policy> = {
  '1': {
    id: '1',
    title: 'South Africa Green Hydrogen National Roadmap',
    country: 'South Africa',
    category: 'Hydrogen Strategy',
    keyTargets: ['10 GW electrolysis by 2030', '500,000 tons annually', '$2/kg production cost', '50,000 jobs'],
    youthOpportunities: ['Skills development program', 'Internships at Sasol', 'R100M entrepreneurship fund', 'University partnerships'],
    infrastructurePlans: ['Gauteng-Durban hydrogen corridor', 'Boegoebaai export hub', 'Pipeline retrofitting', 'Refueling stations'],
    publicationDate: '2024-02-15'
  },
  '2': {
    id: '2',
    title: 'Kenya National Hydrogen Policy Framework',
    country: 'Kenya',
    category: 'Hydrogen Strategy',
    keyTargets: ['500 MW electrolysis by 2030', 'Geothermal pilot by 2025', 'Hydrogen blending by 2026'],
    youthOpportunities: ['KPC internships', 'TVET certificates', 'Youth innovation challenge'],
    infrastructurePlans: ['Mombasa port hub', 'Olkaria production', 'Nairobi-Mombasa pipeline'],
    publicationDate: '2024-01-10'
  },
  '3': {
    id: '3',
    title: 'Morocco Green Hydrogen Offer',
    country: 'Morocco',
    category: 'Energy Transition',
    keyTargets: ['1M tons by 2030', '$20B investment'],
    youthOpportunities: ['Youth entrepreneurship fund', 'Hydrogen research grants'],
    infrastructurePlans: ['Tarfaya wind-hydrogen complex', 'Noor solar integration'],
    publicationDate: '2023-11-20'
  },
  '4': {
    id: '4',
    title: 'Namibia Green Hydrogen Strategy',
    country: 'Namibia',
    category: 'Hydrogen Strategy',
    keyTargets: ['Hyphen Hydrogen project', '$9.4B investment', 'Carbon-neutral by 2040'],
    youthOpportunities: ['Namibia University scholarships', 'Youth employment guarantee'],
    infrastructurePlans: ['Tsau Khaeb hub', 'Luderitz terminal'],
    publicationDate: '2023-10-05'
  },
  '5': {
    id: '5',
    title: 'Egypt National Hydrogen Strategy',
    country: 'Egypt',
    category: 'Green Industrialization',
    keyTargets: ['$40B investments', 'Suez Canal green fuel hub'],
    youthOpportunities: ['Innovation challenge', 'SCZONE employment'],
    infrastructurePlans: ['Ain Sokhna complex', 'Green ammonia production'],
    publicationDate: '2023-08-15'
  }
}

export default function ComparePage() {
  const [selectedPolicies, setSelectedPolicies] = useState<Policy[]>([])
  const [availablePolicies, setAvailablePolicies] = useState<Policy[]>([])
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    // Load available policies (not selected)
    const allPolicies = Object.values(policiesData)
    const available = allPolicies.filter(p => !selectedPolicies.some(sp => sp.id === p.id))
    setAvailablePolicies(available)
  }, [selectedPolicies])

  const addPolicy = (policy: Policy) => {
    if (selectedPolicies.length < 4) {
      setSelectedPolicies([...selectedPolicies, policy])
    }
    setShowDropdown(false)
  }

  const removePolicy = (policyId: string) => {
    setSelectedPolicies(selectedPolicies.filter(p => p.id !== policyId))
  }

  const exportComparison = () => {
    const data = {
      comparedPolicies: selectedPolicies.map(p => ({
        title: p.title,
        country: p.country,
        keyTargets: p.keyTargets,
        youthOpportunities: p.youthOpportunities,
        infrastructurePlans: p.infrastructurePlans
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
          <h2 className="text-xl font-bold mb-4">Select Policies to Compare</h2>
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
                    {availablePolicies.map(policy => (
                      <button
                        key={policy.id}
                        onClick={() => addPolicy(policy)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 transition border-b last:border-0"
                      >
                        <div className="font-semibold">{policy.country}</div>
                        <div className="text-xs text-gray-500">{policy.title.substring(0, 60)}...</div>
                      </button>
                    ))}
                    {availablePolicies.length === 0 && (
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
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>

            {/* Comparison Grid */}
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {/* Header Row */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="bg-gray-100 rounded-lg p-4 font-semibold">Feature</div>
                  {selectedPolicies.map(policy => (
                    <div key={policy.id} className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-4">
                      <div className="font-bold text-emerald-800">{policy.country}</div>
                      <div className="text-xs text-gray-600 mt-1">{policy.title.substring(0, 50)}...</div>
                      <div className="text-xs text-gray-500 mt-2">Published: {new Date(policy.publicationDate).getFullYear()}</div>
                    </div>
                  ))}
                </div>

                {/* Key Targets Row */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <Target className="w-5 h-5 text-emerald-600 mb-2" />
                    <div className="font-semibold">Key Targets</div>
                  </div>
                  {selectedPolicies.map(policy => (
                    <div key={policy.id} className="bg-white rounded-lg p-4 border border-gray-200">
                      <ul className="space-y-2">
                        {policy.keyTargets.map((target, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2">
                            <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                            <span>{target}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Youth Opportunities Row */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <Users className="w-5 h-5 text-emerald-600 mb-2" />
                    <div className="font-semibold">Youth Opportunities</div>
                  </div>
                  {selectedPolicies.map(policy => (
                    <div key={policy.id} className="bg-white rounded-lg p-4 border border-gray-200">
                      <ul className="space-y-2">
                        {policy.youthOpportunities.map((opportunity, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2">
                            <TrendingUp className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                            <span>{opportunity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Infrastructure Plans Row */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <Zap className="w-5 h-5 text-emerald-600 mb-2" />
                    <div className="font-semibold">Infrastructure Plans</div>
                  </div>
                  {selectedPolicies.map(policy => (
                    <div key={policy.id} className="bg-white rounded-lg p-4 border border-gray-200">
                      <ul className="space-y-2">
                        {policy.infrastructurePlans.map((plan, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1.5"></div>
                            <span>{plan}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Summary Row - Best for Youth */}
                <div className="grid grid-cols-4 gap-4 mt-6">
                  <div className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-lg p-4 font-semibold">
                    ⭐ Best for Youth
                  </div>
                  {selectedPolicies.map(policy => {
                    const hasMostOpportunities = policy.youthOpportunities.length === Math.max(...selectedPolicies.map(p => p.youthOpportunities.length))
                    return (
                      <div key={policy.id} className={`rounded-lg p-4 text-center ${hasMostOpportunities ? 'bg-emerald-100 border-2 border-emerald-500' : 'bg-gray-50'}`}>
                        {hasMostOpportunities ? (
                          <div>
                            <div className="text-2xl mb-1">🏆</div>
                            <div className="font-bold text-emerald-700">Top Choice</div>
                            <div className="text-xs text-gray-600 mt-1">{policy.youthOpportunities.length} opportunities</div>
                          </div>
                        ) : (
                          <div className="text-gray-500 text-sm">{policy.youthOpportunities.length} opportunities</div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Recommendation Section */}
            <div className="mt-8 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">📊 AI-Powered Recommendation</h3>
              {(() => {
                const bestForYouth = selectedPolicies.reduce((best, current) => 
                  current.youthOpportunities.length > best.youthOpportunities.length ? current : best
                )
                const mostAmbitions = selectedPolicies.reduce((best, current) => 
                  current.keyTargets.length > best.keyTargets.length ? current : best
                )
                return (
                  <div className="space-y-2">
                    <p className="opacity-95">
                      <strong>Best for Youth Opportunities:</strong> {bestForYouth.country} offers {bestForYouth.youthOpportunities.length} youth-focused initiatives including {bestForYouth.youthOpportunities[0].toLowerCase()}.
                    </p>
                    <p className="opacity-95">
                      <strong>Most Ambitious Targets:</strong> {mostAmbitions.country} has set {mostAmbitions.keyTargets.length} key targets for green hydrogen development.
                    </p>
                    <Link
                      href={`/policies/${bestForYouth.id}`}
                      className="inline-flex items-center gap-2 mt-3 text-white border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-emerald-700 transition"
                    >
                      View Detailed Analysis
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