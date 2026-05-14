import Link from 'next/link'
import { FileText, Users, BookOpen, ArrowRight, Leaf } from 'lucide-react'

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full mb-6">
            <Leaf className="w-4 h-4" />
            <span className="text-sm font-semibold">Africa's Green Hydrogen Future</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
            Policy & Knowledge Hub
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Empowering African youth to understand, engage with, and shape green hydrogen and clean energy policies
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/policies" className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition shadow-lg">
              Explore Policies
            </Link>
            <Link href="/upload" className="border-2 border-emerald-600 text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition">
              Share Your Brief
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What You Can Do</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <FileText className="w-12 h-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Understand Policies</h3>
              <p className="text-gray-600">Access simplified explanations of complex energy and hydrogen policies across Africa</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <Users className="w-12 h-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Share Your Voice</h3>
              <p className="text-gray-600">Upload policy briefs, research, and recommendations for community review</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <BookOpen className="w-12 h-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Learn & Engage</h3>
              <p className="text-gray-600">Access FAQs, glossary, and participate in policy discussions</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-700 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make an Impact?</h2>
          <p className="text-xl mb-8 opacity-90">Join a community of young Africans shaping the clean energy transition</p>
          <Link href="/signup" className="inline-flex items-center gap-2 bg-white text-emerald-700 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition">
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}