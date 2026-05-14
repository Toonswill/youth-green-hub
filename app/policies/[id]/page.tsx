'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Download, Calendar, MapPin, Target, Zap, Users, TrendingUp, AlertCircle, BookOpen, BarChart3 } from 'lucide-react'
import { SaveButton } from '@/components/policies/SaveButton'
import { CommentSection } from '@/components/policies/CommentSection'

// Mock data for policies (same as before)
const policiesData: Record<string, any> = {
  '1': {
    id: '1',
    title: 'South Africa Green Hydrogen National Roadmap',
    country: 'South Africa',
    category: 'Hydrogen Strategy',
    publicationDate: '2024-02-15',
    summary: 'Comprehensive roadmap outlining South Africa\'s strategy to become a major green hydrogen producer, targeting 10 GW of electrolysis capacity by 2030.',
    keyTargets: [
      '10 GW electrolysis capacity by 2030',
      '500,000 tons of green hydrogen annually',
      'Reduce hydrogen production cost to $2/kg',
      'Create 50,000 direct jobs'
    ],
    infrastructurePlans: [
      'Hydrogen corridor from Gauteng to Durban',
      'Boegoebaai hydrogen export hub',
      'Retrofitting natural gas pipelines for hydrogen',
      'Hydrogen refueling stations along N3 highway'
    ],
    youthOpportunities: [
      'Youth skills development program in electrolysis technology',
      'Internships at Sasol and Anglo American hydrogen projects',
      'Hydrogen entrepreneurship fund (R100 million)',
      'University partnerships for hydrogen research'
    ],
    challenges: [
      'High upfront infrastructure costs',
      'Water availability for electrolysis',
      'Skills shortage in hydrogen technologies',
      'Grid capacity constraints'
    ],
    faqs: [
      {
        q: 'What is the timeline for implementation?',
        a: 'Phase 1 (2024-2026): Pilot projects and feasibility studies. Phase 2 (2027-2030): Large-scale rollout. Phase 3 (2031-2040): Full commercialization and export.'
      },
      {
        q: 'How can youth get involved?',
        a: 'Through the Presidential Youth Employment Initiative (PYEI) focusing on green hydrogen skills, university partnerships, and the Hydrogen Society Catalyzer Fund.'
      }
    ],
    relatedPolicies: ['2', '3', '4']
  },
  '2': {
    id: '2',
    title: 'Kenya National Hydrogen Policy Framework',
    country: 'Kenya',
    category: 'Hydrogen Strategy',
    publicationDate: '2024-01-10',
    summary: 'Framework for integrating green hydrogen into Kenya\'s energy mix, leveraging geothermal resources for hydrogen production.',
    keyTargets: [
      '500 MW electrolysis by 2030',
      'Geothermal-to-hydrogen pilot by 2025',
      'Hydrogen blending in natural gas by 2026'
    ],
    infrastructurePlans: [
      'Mombasa port hydrogen hub',
      'Olkaria geothermal hydrogen production',
      'Nairobi-Mombasa hydrogen pipeline'
    ],
    youthOpportunities: [
      'Internships at Kenya Pipeline Company',
      'TVET certificates in hydrogen safety',
      'Youth innovation challenge'
    ],
    challenges: [
      'High electrolyzer costs',
      'Transport infrastructure gaps'
    ],
    faqs: [
      {
        q: 'When will projects start?',
        a: 'Pilot projects begin Q3 2024'
      }
    ],
    relatedPolicies: ['1', '3']
  },
  '3': {
    id: '3',
    title: 'Morocco Green Hydrogen Offer',
    country: 'Morocco',
    category: 'Energy Transition',
    publicationDate: '2023-11-20',
    summary: 'Strategic plan to position Morocco as a competitive green hydrogen producer using solar and wind resources.',
    keyTargets: [
      '1M tons annual production by 2030',
      '$20B investment program'
    ],
    infrastructurePlans: [
      'Tarfaya wind-hydrogen complex',
      'Noor solar-hydrogen integration'
    ],
    youthOpportunities: [
      'Youth entrepreneurship fund',
      'Hydrogen research grants'
    ],
    challenges: [
      'Water desalination needs'
    ],
    faqs: [
      {
        q: 'How to apply for funding?',
        a: 'Applications open through Moroccan Investment Agency'
      }
    ],
    relatedPolicies: ['1', '5']
  },
  '4': {
    id: '4',
    title: 'Namibia Green Hydrogen Strategy',
    country: 'Namibia',
    category: 'Hydrogen Strategy',
    publicationDate: '2023-10-05',
    summary: 'Strategy leveraging Namibia\'s solar and wind potential for green hydrogen production and export.',
    keyTargets: [
      'Hyphen Hydrogen Energy project',
      '$9.4B investment',
      'Carbon-neutral by 2040'
    ],
    infrastructurePlans: [
      'Tsau Khaeb hydrogen hub',
      'Luderitz export terminal'
    ],
    youthOpportunities: [
      'Scholarships at Namibia University',
      'Youth employment guarantee'
    ],
    challenges: [
      'Infrastructure development timeline'
    ],
    faqs: [
      {
        q: 'What is Hyphen project?',
        a: 'Africa\'s largest vertically integrated green hydrogen project'
      }
    ],
    relatedPolicies: ['1', '3']
  },
  '5': {
    id: '5',
    title: 'Egypt National Hydrogen Strategy',
    country: 'Egypt',
    category: 'Green Industrialization',
    publicationDate: '2023-08-15',
    summary: 'Comprehensive strategy positioning Egypt as a regional hydrogen hub utilizing Suez Canal Economic Zone.',
    keyTargets: [
      '$40B green hydrogen investments',
      'Suez Canal green fuel hub'
    ],
    infrastructurePlans: [
      'Ain Sokhna hydrogen complex',
      'Green ammonia production'
    ],
    youthOpportunities: [
      'Green hydrogen innovation challenge',
      'Youth employment in SCZONE'
    ],
    challenges: [
      'Financing mechanisms'
    ],
    faqs: [
      {
        q: 'What is SCZONE?',
        a: 'Suez Canal Economic Zone - special economic zone for green industries'
      }
    ],
    relatedPolicies: ['3', '1']
  }
}

export default function PolicyDetailPage() {
  const params = useParams()
  const policyId = params.id as string
  const policy = policiesData[policyId]

  if (!policy) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Policy not found</h1>
          <Link href="/policies" className="text-emerald-600 hover:text-emerald-700">
            Back to Policy Library
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
            <SaveButton policyId={policyId} policyTitle={policy.title} />
          </div>
          
          <div className="flex flex-wrap gap-4 text-emerald-100 mt-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{policy.country}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Published: {new Date(policy.publicationDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>{policy.category}</span>
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
              <button className="mt-4 inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition">
                <Download className="w-4 h-4" />
                Download Full Policy (PDF)
              </button>
            </div>

            {/* Key Targets */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Target className="w-6 h-6 text-emerald-600" />
                Key Targets
              </h2>
              <ul className="space-y-3">
                {policy.keyTargets.map((target: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                    <span className="text-gray-700">{target}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Infrastructure Plans */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6 text-emerald-600" />
                Infrastructure Plans
              </h2>
              <ul className="space-y-3">
                {policy.infrastructurePlans.map((plan: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-teal-600 rounded-full mt-2"></div>
                    <span className="text-gray-700">{plan}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Challenges */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-orange-600" />
                Challenges
              </h2>
              <ul className="space-y-3">
                {policy.challenges.map((challenge: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                    <span className="text-gray-700">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {policy.faqs.map((faq: any, idx: number) => (
                  <div key={idx} className="border-b border-gray-200 pb-4 last:border-0">
                    <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                    <p className="text-gray-600">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Comments Section */}
            <CommentSection policyId={policyId} policyTitle={policy.title} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Youth Opportunities */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600" />
                Opportunities for Youth
              </h2>
              <ul className="space-y-3">
                {policy.youthOpportunities.map((opportunity: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{opportunity}</span>
                  </li>
                ))}
              </ul>
              {/* Add to Compare */}
<div className="bg-white rounded-xl p-6 shadow-sm">
  <h2 className="text-xl font-bold mb-4">Compare This Policy</h2>
  <p className="text-gray-600 text-sm mb-3">Add to comparison tool to see how it stacks against other countries</p>
  <button
    onClick={() => {
      const compareList = JSON.parse(localStorage.getItem('compareList') || '[]')
      if (!compareList.includes(policyId)) {
        compareList.push(policyId)
        localStorage.setItem('compareList', JSON.stringify(compareList))
      }
      window.location.href = '/compare'
    }}
    className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition flex items-center justify-center gap-2"
  >
    <BarChart3 className="w-4 h-4" />
    Add to Comparison
  </button>
</div>
            </div>

            {/* Related Policies */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Related Policies</h2>
              <div className="space-y-3">
                {policy.relatedPolicies.map((id: string) => (
                  <Link key={id} href={`/policies/${id}`}>
                    <div className="p-3 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition cursor-pointer">
                      <p className="font-semibold text-sm text-gray-900">
                        {policiesData[id]?.title || 'View Policy'} →
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Share Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Share This Policy</h2>
              <p className="text-gray-600 text-sm mb-3">Help spread awareness about this policy</p>
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700">
                  Twitter
                </button>
                <button className="flex-1 bg-blue-800 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-900">
                  LinkedIn
                </button>
                <button className="flex-1 bg-gray-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-700">
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