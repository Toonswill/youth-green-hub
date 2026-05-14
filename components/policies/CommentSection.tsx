'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, ThumbsUp, Reply, Flag, Send, User, Clock } from 'lucide-react'

interface Comment {
  id: string
  author: string
  content: string
  date: string
  likes: number
  userLiked: boolean
  replies: Reply[]
}

interface Reply {
  id: string
  author: string
  content: string
  date: string
  likes: number
}

export function CommentSection({ policyId, policyTitle }: { policyId: string; policyTitle: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState('')
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  // Load comments from localStorage (temporary until Supabase)
  useEffect(() => {
    const savedComments = localStorage.getItem(`comments_${policyId}`)
    if (savedComments) {
      setComments(JSON.parse(savedComments))
    } else {
      // Sample comments
      const sampleComments: Comment[] = [
        {
          id: '1',
          author: 'Akinyi Ochieng',
          content: `This is an excellent policy framework! As a youth in Kenya's energy sector, I'm particularly excited about the internship opportunities mentioned. Has anyone found information on application deadlines?`,
          date: '2024-02-20',
          likes: 12,
          userLiked: false,
          replies: [
            {
              id: '2',
              author: 'Mandla Ndlovu',
              content: 'The Department of Energy announced during last week\'s webinar that applications will open in March 2024. Follow their Twitter account for updates!',
              date: '2024-02-21',
              likes: 5
            }
          ]
        },
        {
          id: '3',
          author: 'Fatima El Mansouri',
          content: 'Important question: How does this align with the African Union\'s Agenda 2063? We need continental coordination on hydrogen standards.',
          date: '2024-02-19',
          likes: 8,
          userLiked: false,
          replies: []
        }
      ]
      setComments(sampleComments)
      localStorage.setItem(`comments_${policyId}`, JSON.stringify(sampleComments))
    }
  }, [policyId])

  const handleLike = (commentId: string) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.userLiked ? comment.likes - 1 : comment.likes + 1,
          userLiked: !comment.userLiked
        }
      }
      return comment
    })
    setComments(updatedComments)
    localStorage.setItem(`comments_${policyId}`, JSON.stringify(updatedComments))
  }

  const handleSubmitComment = () => {
  if (!newComment.trim()) return
  
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  if (!isLoggedIn) {
    setShowLoginPrompt(true)
    setTimeout(() => {
      setShowLoginPrompt(false)
      window.location.href = '/login?redirect=' + window.location.pathname
    }, 2000)
    return
  }

  const comment: Comment = {
    id: Date.now().toString(),
    author: localStorage.getItem('userName') || 'Guest User',
    content: newComment,
    date: new Date().toISOString().split('T')[0],
    likes: 0,
    userLiked: false,
    replies: []
  }
  
  const updatedComments = [comment, ...comments]
  setComments(updatedComments)
  localStorage.setItem(`comments_${policyId}`, JSON.stringify(updatedComments))
  setNewComment('')
}

  const handleSubmitReply = (parentId: string) => {
    if (!replyContent.trim()) return
    
    const reply: Reply = {
      id: Date.now().toString(),
      author: localStorage.getItem('userName') || 'Guest User',
      content: replyContent,
      date: new Date().toISOString().split('T')[0],
      likes: 0
    }
    
    const updatedComments = comments.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...comment.replies, reply]
        }
      }
      return comment
    })
    
    setComments(updatedComments)
    localStorage.setItem(`comments_${policyId}`, JSON.stringify(updatedComments))
    setReplyContent('')
    setReplyingTo(null)
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <MessageCircle className="w-6 h-6 text-emerald-600" />
        Discussion ({comments.length})
      </h2>

      {/* Login Prompt */}
      {showLoginPrompt && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm">
          Please sign in to participate in discussions
        </div>
      )}

      {/* New Comment Input */}
      <div className="mb-8">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts, questions, or insights about this policy..."
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent mb-2"
        />
        <button
          onClick={handleSubmitComment}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          Post Comment
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-6 max-h-[600px] overflow-y-auto">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-gray-200 pb-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-emerald-700">{comment.author}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{comment.date}</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 mb-3">{comment.content}</p>
            
            <div className="flex gap-4 text-sm">
              <button 
                onClick={() => handleLike(comment.id)}
                className={`flex items-center gap-1 transition ${comment.userLiked ? 'text-emerald-600' : 'text-gray-500 hover:text-emerald-600'}`}
              >
                <ThumbsUp className="w-4 h-4" />
                {comment.likes}
              </button>
              <button 
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                className="flex items-center gap-1 text-gray-500 hover:text-emerald-600 transition"
              >
                <Reply className="w-4 h-4" />
                Reply ({comment.replies.length})
              </button>
            </div>

            {/* Reply Input */}
            {replyingTo === comment.id && (
              <div className="mt-4 ml-4 md:ml-8">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write your reply..."
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 mb-2"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSubmitReply(comment.id)}
                    className="bg-emerald-600 text-white px-3 py-1 rounded text-sm hover:bg-emerald-700"
                  >
                    Post Reply
                  </button>
                  <button
                    onClick={() => setReplyingTo(null)}
                    className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Replies */}
            {comment.replies.length > 0 && (
              <div className="ml-4 md:ml-8 mt-4 space-y-4 bg-gray-50 p-4 rounded-lg">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="border-b border-gray-200 last:border-0 pb-3 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <User className="w-3 h-3 text-emerald-500" />
                          <span className="font-semibold text-emerald-600 text-sm">{reply.author}</span>
                        </div>
                        <div className="text-xs text-gray-500">{reply.date}</div>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">{reply.content}</p>
                    <div className="flex gap-4 mt-2">
                      <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-emerald-600">
                        <ThumbsUp className="w-3 h-3" />
                        {reply.likes}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {comments.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No comments yet. Be the first to start the discussion!</p>
        </div>
      )}
    </div>
  )
}