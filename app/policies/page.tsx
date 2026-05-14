'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Filter, Calendar, MapPin, FileText, ChevronDown } from 'lucide-react'

// Mock data for policies
const mockPolicies = [
  {
    id: '1',
    title: 'South Africa Green Hydrogen National Roadmap',
    country: 'South Africa',
    category: 'Hydrogen Strategy',
    publicationDate: '2024-02-15',
    summary: 'Comprehensive roadmap outlining South Africa\'s strategy to become a major green hydrogen producer, targeting 10 GW of electrolysis capacity by 2030.',
    pdfUrl: '#',
    keyHighlights: ['10 GW electrolysis by 2030', '$10B investment target', '50,000 jobs created'],
    youthImplications: 'Youth training programs in electrolysis technology and hydrogen transport',
  },
  {
    id: '2',
    title: 'Kenya National Hydrogen Policy Framework',
    country: 'Kenya',
    category: 'Hydrogen Strategy',
    publicationDate: '2024-01-10',
    summary: 'Framework for integrating green hydrogen into Kenya\'s energy mix, leveraging geothermal resources for hydrogen production.',
    pdfUrl: '#',
    keyHighlights: ['Geothermal-to-hydrogen focus', 'Mombasa port hydrogen hub', 'Regional export strategy'],
    youthImplications: 'Internships at Kenya Pipeline Company for hydrogen blending projects',
  },
  {
    id: '3',
    title: 'Morocco Green Hydrogen Offer',
    country: 'Morocco',
    category: 'Energy Transition',
    publicationDate: '2023-11-20',
    summary: 'Strategic plan to position Morocco as a competitive green hydrogen producer using solar and wind resources.',
    pdfUrl: '#',
    keyHighlights: ['1M tons annual production by 2030', '$20B investment program', 'African hydrogen corridor'],
    youthImplications: 'Youth entrepreneurship fund for hydrogen startups',
  },
  {
    id: '4',
    title: 'Namibia Green Hydrogen Strategy',
    country: 'Namibia',
    category: 'Hydrogen Strategy',
    publicationDate: '2023-10-05',
    summary: 'Strategy leveraging Namibia\'s solar and wind potential for green hydrogen production and export.',
    pdfUrl: '#',
    keyHighlights: ['Hyphen Hydrogen Energy project', '$9.4B investment', 'Carbon-neutral by 2040'],
    youthImplications: 'Scholarships for hydrogen engineering degrees at Namibia University',
  },
  {
    id: '5',
    title: 'Egypt National Hydrogen Strategy',
    country: 'Egypt',
    category: 'Green Industrialization',
    publicationDate: '2023-08-15',
    summary: 'Comprehensive strategy positioning Egypt as a regional hydrogen hub utilizing Suez Canal Economic Zone.',
    pdfUrl: '#',
    keyHighlights: ['$40B green hydrogen investments', 'Suez Canal green fuel hub', 'Export to Europe'],
    youthImplications: 'Green hydrogen innovation challenge for youth',
  },
  {
    id: '6',
    title: 'African Union Green Minerals Strategy',
    country: 'Pan-African',
    category: 'Climate Policy',
    publicationDate: '2024-01-25',
    summary: 'Strategy for sustainable mining of critical minerals needed for green hydrogen technologies.',
    pdfUrl: '#',
    keyHighlights: ['Artisanal mining formalization', 'Local beneficiation requirements', 'Sustainable mining standards'],
    youthImplications: 'Youth mining cooperatives and training programs',
  },
]

const categories = ['All', 'Hydrogen Strategy', 'Energy Transition', 'Climate Policy', 'Carbon Market', 'Green Industrialization']
const countries = ['All', 'South Africa', 'Kenya', 'Morocco', 'Namibia', 'Egypt', 'Pan-African']

export default function PoliciesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedCountry, setSelectedCountry] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  const filteredPolicies = mockPolicies.filter(policy => {
    const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.summary.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || policy.category === selectedCategory
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
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">Found {filteredPolicies.length} policies</p>
        </div>

        {/* Policy Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPolicies.map((policy) => (
            <Link href={`/policies/${policy.id}`} key={policy.id}>
              <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100 h-full flex flex-col">
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-semibold px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                      {policy.category}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(policy.publicationDate).getFullYear()}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-emerald-700 transition">
                    {policy.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{policy.country}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
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

        {/* Empty State */}
        {filteredPolicies.length === 0 && (
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