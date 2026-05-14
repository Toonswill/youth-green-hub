'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BarChart3, X } from 'lucide-react'

export function CompareBar() {
  const [compareCount, setCompareCount] = useState(0)

  useEffect(() => {
    const updateCount = () => {
      const compareList = JSON.parse(localStorage.getItem('compareList') || '[]')
      setCompareCount(compareList.length)
    }
    
    updateCount()
    window.addEventListener('storage', updateCount)
    return () => window.removeEventListener('storage', updateCount)
  }, [])

  if (compareCount === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Link href="/compare">
        <div className="bg-emerald-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-emerald-700 transition flex items-center gap-3 group">
          <BarChart3 className="w-5 h-5" />
          <span className="font-semibold">Compare {compareCount} Policy{compareCount !== 1 ? 'ies' : ''}</span>
          <div className="w-5 h-5 bg-white text-emerald-600 rounded-full flex items-center justify-center text-xs font-bold">
            {compareCount}
          </div>
        </div>
      </Link>
    </div>
  )
}