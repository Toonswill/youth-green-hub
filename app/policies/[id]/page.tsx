'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeft, Download, Calendar, MapPin, Target, Zap, Users, TrendingUp, AlertCircle, BookOpen } from 'lucide-react'
import { SaveButton } from '@/components/policies/SaveButton'
import { CommentSection } from '@/components/policies/CommentSection'

interface Policy {
  id: string
  title: string
  country: string
  category: string
  publication_date: string
  summary: string
  key_highlights: string[]
  youth_implications: string
  opportunities: string
  key_targets: string[]
  infrastructure_plans: string[]
  challenges: string[]
}

export default function PolicyDetailPage() {
  const params = useParams()
  const policyId = params.id as string
  const [policy, setPolicy] = useState<Policy | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchPolicy() {
      console.log('Fetching policy with ID:', policyId)
      
      const { data, error } = await supabase
        .from('policies')
        .select('*')
        .eq('id', policyId)
        .single()
      
      console.log('Data:', data)
      console.log('Error:', error)
      
      if (error) {
        console.error('Error fetching policy:', error)
      } else if (data) {
        setPolicy(data)
      }
      
      setLoading(false)
    }
    
    if (policyId) {
      fetchPolicy()
    }
  }, [policyId, supabase])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          <p className="mt-2 text-gray-600">Loading policy...</p>
        </div>
      </div>
    )
  }

  if (!policy) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Policy not found</h1>
          <p className="text-gray-600 mb-4">The policy you're looking for doesn't exist or has been removed.</p>
          <Link href="/policies" className="text-emerald-600 hover:text-emerald-700">
            ← Back to Policy Library
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-emerald-700 to-teal-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/policies" className="inline-flex items-center gap-2 text-emerald-100 hover:text-white mb-6 transition">
            <ArrowLeft className="w-4 h-4" />
            Back to Library
          </Link>
          
          {/* Title with Save Button */}
          <div className="flex flex-wrap justify-between items-start gap-4">
            <h1 className="text-3xl md:text-4xl font-bold flex-1">{policy.title}</h1>
            <SaveButton policyId={policy.id} policyTitle={policy.title} />
          </div>
          
          <div className="flex flex-wrap gap-4 text-emerald-100 mt-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{policy.country}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Published: {new Date(policy.publication_date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Summary */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Summary</h2>
              <p className="text-gray-700 leading-relaxed">{policy.summary}</p>
            </div>

            {/* Youth Opportunities */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600" />
                Opportunities for Youth
              </h2>
              <p className="text-gray-700">{policy.youth_implications || 'Information coming soon...'}</p>
              {policy.opportunities && (
                <div className="mt-4">
                  <p className="font-semibold mb-2">Key Opportunities:</p>
                  <p className="text-gray-700">{policy.opportunities}</p>
                </div>
              )}
            </div>

            {/* Key Highlights */}
            {policy.key_highlights && policy.key_highlights.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Target className="w-6 h-6 text-emerald-600" />
                  Key Highlights
                </h2>
                <ul className="space-y-3">
                  {policy.key_highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Comments Section */}
            <CommentSection policyId={policy.id} policyTitle={policy.title} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Quick Info</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Country:</span>
                  <span className="font-semibold">{policy.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Published:</span>
                  <span className="font-semibold">{new Date(policy.publication_date).getFullYear()}</span>
                </div>
              </div>
            </div>

            {/* Share Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Share This Policy</h2>
              <p className="text-gray-600 text-sm mb-3">Help spread awareness about this policy</p>
              <div className="flex gap-2">
                <button 
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(policy.title)}`, '_blank')}
                  className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700"
                >
                  Twitter
                </button>
                <button 
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                  className="flex-1 bg-gray-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-700"
                >
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}