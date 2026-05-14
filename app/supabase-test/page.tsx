'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function SupabaseTest() {
  const [status, setStatus] = useState('Testing...')
  const [policies, setPolicies] = useState<any[]>([])

  useEffect(() => {
    async function test() {
      const supabase = createClient()
      
      // Test 1: Check connection
      setStatus('Testing connection...')
      const { data, error } = await supabase.from('policies').select('*').limit(5)
      
      if (error) {
        setStatus(`Error: ${error.message}`)
        console.error('Supabase error:', error)
      } else {
        setStatus(`Connected! Found ${data?.length || 0} policies`)
        setPolicies(data || [])
      }
    }
    
    test()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
        
        <div className={`p-4 rounded-lg mb-4 ${status.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          Status: {status}
        </div>
        
        {policies.length > 0 && (
          <div className="bg-white rounded-lg p-6">
            <h2 className="font-semibold mb-3">Policies in Database:</h2>
            <ul className="space-y-2">
              {policies.map((policy) => (
                <li key={policy.id} className="border-b pb-2">
                  <strong>{policy.title}</strong> - {policy.country}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}