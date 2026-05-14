'use client'

import { useState, useEffect } from 'react'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import Link from 'next/link'

interface SaveButtonProps {
  policyId: string
  policyTitle: string
}

export function SaveButton({ policyId, policyTitle }: SaveButtonProps) {
  const [isSaved, setIsSaved] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
    setIsLoggedIn(loggedIn)
    
    if (loggedIn) {
      const saved = localStorage.getItem(`saved_${policyId}`) === 'true'
      setIsSaved(saved)
    }
  }, [policyId])

  const toggleSave = () => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
    
    if (!loggedIn) {
      // Redirect to login if not logged in
      window.location.href = '/login?redirect=/policies/' + policyId
      return
    }
    
    const newSavedState = !isSaved
    setIsSaved(newSavedState)
    localStorage.setItem(`saved_${policyId}`, newSavedState.toString())
    
    if (newSavedState) {
      // Add to saved policies list
      const savedPolicies = JSON.parse(localStorage.getItem('savedPolicies') || '[]')
      if (!savedPolicies.some((p: any) => p.id === policyId)) {
        savedPolicies.push({ id: policyId, title: policyTitle, savedAt: new Date().toISOString() })
        localStorage.setItem('savedPolicies', JSON.stringify(savedPolicies))
      }
    } else {
      // Remove from saved policies
      const savedPolicies = JSON.parse(localStorage.getItem('savedPolicies') || '[]')
      const filtered = savedPolicies.filter((p: any) => p.id !== policyId)
      localStorage.setItem('savedPolicies', JSON.stringify(filtered))
    }
  }

  return (
    <button
      onClick={toggleSave}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
        isSaved 
          ? 'bg-emerald-100 text-emerald-700' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
      {isSaved ? 'Saved' : 'Save for Later'}
    </button>
  )
}