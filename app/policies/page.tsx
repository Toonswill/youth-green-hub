'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Filter, Calendar, MapPin, FileText, ChevronDown } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Policy {
  id: string
  title: string
  country: string
  categories: { name: string; slug: string } | null
  publication_date: string
  summary: string
  pdf_url: string
  key_highlights: string[]
}

export default function PoliciesPage() {
  const [policies, setPolicies] = useState<Policy[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedCountry, setSelectedCountry] = useState('All')
  const [showFilters, setShowFilters] = useState(false)
  const [categories, setCategories] = useState<string[]>(['All'])
  const [countries, setCountries] = useState<string[]>(['All'])
  
  const supabase = createClient()

  useEffect(() => {
    fetchPolicies()
    fetchFilters()
  }, [])

  async function fetchPolicies() {
    setLoading(true)
    
    const { data, error } = await supabase
      .from('policies')
      .select(`
        *,
        categories:category_id (name, slug)
      `)
      .order('publication_date', { ascending: false })
    
    if (error) {
      console.error('Error fetching policies:', error)
    } else if (data) {
      setPolicies(data)
    }
    
    setLoading(false)
  }

  async function fetchFilters() {
    // Get unique countries
    const { data: countryData } = await supabase
      .from('policies')
      .select('country')
    
    if (countryData && countryData.length > 0) {
      const uniqueCountries = ['All', ...new Set(countryData.map(p => p.country).filter(Boolean))]
      setCountries(uniqueCountries)
    }
    
    // Get categories
    const { data: categoryData } = await supabase
      .from('categories')
      .select('name')
    
    if (categoryData && categoryData.length > 0) {
      setCategories(['All', ...categoryData.map(c => c.name)])
    }
  }

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (policy.summary && policy.summary.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'All' || policy.categories?.name === selectedCategory
    const matchesCountry = selectedCountry === 'All' || policy.country === selectedCountry
    return matchesSearch && matchesCategory && matchesCountry
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Policy Library</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Access comprehensive green hydrogen and clean energy policies from across Africa
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search policies by title or summary..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <Filter className="w-5 h-5" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid md:grid-cols-2 gap-4 mt-4 pt-4 border-t">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                >
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">Found {filteredPolicies.length} policies</p>
        </div>

        {/* Policy Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            <p className="mt-2 text-gray-600">Loading policies...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPolicies.map((policy) => (
              <Link href={`/policies/${policy.id}`} key={policy.id}>
                <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100 h-full flex flex-col">
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-semibold px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                        {policy.categories?.name || 'Policy'}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {policy.publication_date ? new Date(policy.publication_date).getFullYear() : 'N/A'}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-emerald-700 transition text-gray-900">
                      {policy.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-700 mb-3">
                      <MapPin className="w-4 h-4 text-gray-600" />
                      <span>{policy.country}</span>
                    </div>
                    
                    <p className="text-gray-700 text-sm line-clamp-3 mb-4">
                      {policy.summary}
                    </p>
                    
                    <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm">
                      <FileText className="w-4 h-4" />
                      <span>Read Full Analysis →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredPolicies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No policies found matching your criteria</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('All')
                setSelectedCountry('All')
              }}
              className="mt-4 text-emerald-600 hover:text-emerald-700 font-semibold"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}