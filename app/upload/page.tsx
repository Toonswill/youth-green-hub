'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Upload, FileText, Tag, User, CheckCircle, AlertCircle, X } from 'lucide-react'
import Link from 'next/link'

export default function UploadPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: '',
    tags: '',
  })
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check if user is logged in
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      setError('Please sign in to submit a policy brief')
      setTimeout(() => router.push('/login'), 2000)
      return
    }
    
    if (!file) {
      setError('Please select a PDF file to upload')
      return
    }
    
    setUploading(true)
    setError('')
    
    try {
      // 1. Upload PDF to Supabase Storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}/${Date.now()}.${fileExt}`
      const filePath = `briefs/${fileName}`
      
      const { error: uploadError } = await supabase.storage
        .from('policy-briefs')
        .upload(filePath, file)
      
      if (uploadError) throw uploadError
      
      // 2. Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('policy-briefs')
        .getPublicUrl(filePath)
      
      // 3. Save to database
      const { error: dbError } = await supabase
        .from('policy_briefs')
        .insert({
          title: formData.title,
          description: formData.description,
          author: formData.author,
          tags: formData.tags.split(',').map(t => t.trim()),
          pdf_url: publicUrl,
          user_id: user.id,
          status: 'pending'
        })
      
      if (dbError) throw dbError
      
      setSubmitted(true)
      setTimeout(() => {
        router.push('/dashboard')
      }, 3000)
      
    } catch (err: any) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Brief Submitted!</h2>
          <p className="text-gray-600 mb-4">
            Your policy brief has been submitted for admin review.
            You'll be notified once it's approved.
          </p>
          <Link href="/dashboard" className="text-emerald-600 hover:text-emerald-700">
            Go to Dashboard →
          </Link>
        </div>
      </div>
    )
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

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <p className="text-red-700">{error}</p>
                  {error.includes('sign in') && (
                    <Link href="/login" className="text-red-600 font-semibold text-sm mt-1 inline-block">
                      Go to Login →
                    </Link>
                  )}
                </div>
              </div>
            )}

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
              <div className={`border-2 border-dashed rounded-lg p-6 text-center transition ${file ? 'border-emerald-400 bg-emerald-50' : 'border-gray-300 hover:border-emerald-400'}`}>
                <input
                  type="file"
                  accept=".pdf"
                  required
                  onChange={e => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="pdf-upload"
                />
                <label htmlFor="pdf-upload" className="cursor-pointer block">
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600">
                    {file ? file.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">PDF files only, max 10MB</p>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Submit for Review'}
            </button>

            <p className="text-center text-sm text-gray-500">
              By submitting, you agree to our content guidelines. All submissions are reviewed by moderators.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}