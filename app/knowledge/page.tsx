'use client'

import { useState } from 'react'
import { Search, ChevronDown, BookOpen, Lightbulb, Database, Globe } from 'lucide-react'

const faqs = [
  {
    category: 'hydrogen',
    question: 'What is green hydrogen?',
    answer: 'Green hydrogen is hydrogen produced through electrolysis using renewable energy sources like solar, wind, or hydroelectric power. It\'s called "green" because the production process emits zero carbon dioxide, making it a clean energy carrier.',
  },
  {
    category: 'hydrogen',
    question: 'How is green hydrogen different from grey or blue hydrogen?',
    answer: 'Grey hydrogen is produced from natural gas without capturing emissions. Blue hydrogen is also from natural gas but with carbon capture and storage. Green hydrogen is the only truly zero-emission option, using renewable electricity to split water into hydrogen and oxygen.',
  },
  {
    category: 'hydrogen',
    question: 'What is an electrolyzer?',
    answer: 'An electrolyzer is a device that uses electricity to split water (H2O) into hydrogen (H2) and oxygen (O2). When powered by renewable energy, it produces green hydrogen. There are three main types: alkaline, PEM (Proton Exchange Membrane), and solid oxide electrolyzers.',
  },
  {
    category: 'policy',
    question: 'Why are hydrogen policies important for Africa?',
    answer: 'Hydrogen policies provide a framework for investment, job creation, and sustainable development. For Africa, these policies can attract foreign investment, create green jobs for youth, enable energy access, and position the continent as a leader in the global clean energy economy.',
  },
  {
    category: 'policy',
    question: 'What are Nationally Determined Contributions (NDCs)?',
    answer: 'NDCs are climate action plans submitted by countries under the Paris Agreement. They outline each country\'s targets for reducing emissions and adapting to climate change. Many African NDCs now include hydrogen as a key strategy for decarbonization.',
  },
  {
    category: 'carbon',
    question: 'What is a carbon market?',
    answer: 'A carbon market is a system where countries or companies can buy and sell carbon credits. Each credit represents one ton of CO2 reduced or removed from the atmosphere. This creates a financial incentive for emissions reduction and can fund green hydrogen projects.',
  },
  {
    category: 'energy',
    question: 'What is the energy transition?',
    answer: 'The energy transition refers to the global shift from fossil-based energy systems to renewable energy sources. For Africa, this means leveraging abundant solar, wind, geothermal, and hydrogen potential to achieve energy access, economic development, and climate goals.',
  },
]

const glossary = [
  { term: 'Electrolysis', definition: 'Process of using electricity to split water into hydrogen and oxygen.' },
  { term: 'Fuel Cell', definition: 'Device that converts hydrogen and oxygen into electricity, producing only water as a byproduct.' },
  { term: 'Levelized Cost of Hydrogen (LCOH)', definition: 'The average cost of producing hydrogen over its lifetime, including capital, operating, and fuel costs.' },
  { term: 'Hydrogen Hubs', definition: 'Clusters of hydrogen production, storage, transport, and end-use facilities in strategic locations.' },
  { term: 'Power-to-X', definition: 'Converting renewable electricity into other energy carriers like hydrogen, ammonia, or synthetic fuels.' },
  { term: 'CCUS', definition: 'Carbon Capture, Utilization, and Storage - technologies that capture CO2 emissions for storage or use.' },
]

export default function KnowledgePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [openFaqs, setOpenFaqs] = useState<number[]>([])

  const toggleFaq = (index: number) => {
    setOpenFaqs(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const filteredGlossary = glossary.filter(term =>
    term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.definition.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Knowledge Hub</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Learn about green hydrogen, clean energy policies, and the energy transition in Africa
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search FAQs, glossary terms, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {['all', 'hydrogen', 'policy', 'energy', 'carbon'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat === 'all' ? 'All Topics' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* FAQs Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-emerald-600" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition rounded-lg"
                >
                  <span className="font-semibold text-left text-gray-900">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openFaqs.includes(idx) ? 'rotate-180' : ''}`} />
                </button>
                {openFaqs.includes(idx) && (
                  <div className="px-6 pb-4 pt-2 border-t border-gray-100">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Glossary Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Database className="w-6 h-6 text-emerald-600" />
            Technical Glossary
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {filteredGlossary.map((term, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition">
                <h3 className="font-bold text-emerald-700 mb-2">{term.term}</h3>
                <p className="text-gray-600 text-sm">{term.definition}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredFaqs.length === 0 && filteredGlossary.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No results found for "{searchTerm}"</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
              }}
              className="mt-4 text-emerald-600 hover:text-emerald-700 font-semibold"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  )
}