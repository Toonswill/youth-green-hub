'use client'

import { useState } from 'react'
import { Upload, FileText, Tag, User, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function UploadPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: '',
    tags: '',
  })
  const [file, setFile] = useState<File | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // For now, just show success message
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6">
            <h1 className="text-2xl font-bold text-white">Submit Policy Brief</h1>
            <p className="text-emerald-100 mt-1">
              Share your analysis, recommendations, or critique with the community
            </p>
          </div>

          {submitted ? (
            <div className="m-8 p-6 bg-green-50 border border-green-200 rounded-lg text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">Thank You for Your Submission!</h3>
              <p className="text-green-700">Your policy brief has been submitted for review. We'll notify you once it's approved.</p>
              <Link href="/" className="inline-block mt-4 text-emerald-600 hover:text-emerald-700 font-semibold">
                Return to Home →
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800">Demo Mode Active</h4>
                    <p className="text-sm text-yellow-700">
                      This is a demonstration. In production, submissions would be saved to the database and require admin approval.
                    </p>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  <FileText className="w-4 h-4 inline mr-1" />
                  Brief Title *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Kenya's Green Hydrogen Strategy: Youth Opportunities"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold mb-2">Description *</label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summarize your brief and its key insights..."
                />
              </div>

              {/* Author & Tags */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    Author Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    value={formData.author}
                    onChange={e => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Your name or organization"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    <Tag className="w-4 h-4 inline mr-1" />
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    value={formData.tags}
                    onChange={e => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="hydrogen, policy, south-africa"
                  />
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-semibold mb-2">PDF File *</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-400 transition">
                  <input
                    type="file"
                    accept=".pdf"
                    required
                    onChange={e => setFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="pdf-upload"
                  />
                  <label htmlFor="pdf-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-600">
                      {file ? file.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">PDF files only, max 10MB</p>
                  </label>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
              >
                Submit for Review
              </button>

              <p className="text-center text-sm text-gray-500">
                By submitting, you agree to our content guidelines. All submissions are reviewed by moderators.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}