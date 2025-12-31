'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/lib/types'

export default function PostsManagement() {
  const [posts, setPosts] = useState<Post[]>([])
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    published: false
  })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts')
      const data = await res.json()
      setPosts(data)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch posts:', error)
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingId ? `/api/posts/${editingId}` : '/api/posts'
      const method = editingId ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        fetchPosts()
        setFormData({ title: '', content: '', image: '', published: false })
        setEditingId(null)
      }
    } catch (error) {
      console.error('Failed to save post:', error)
    }
  }

  const handleEdit = (post: Post) => {
    setFormData({
      title: post.title,
      content: post.content || '',
      image: post.image || '',
      published: post.published
    })
    setEditingId(post.id)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('آیا مطمئن هستید که می‌خواهید این پست را حذف کنید؟')) return

    try {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchPosts()
      }
    } catch (error) {
      console.error('Failed to delete post:', error)
    }
  }

  return (
    <div className="min-h-screen nature-bg">
      <header className="bg-white border-b nature-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3 space-x-reverse">
            <Link href="/admin" className="text-nature-light hover:text-nature">
              <i className="fas fa-arrow-right"></i>
            </Link>
            <h1 className="text-xl font-bold playfair text-nature">مدیریت پست‌ها</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1">
            <div className="white-card p-6 rounded-xl sticky top-24">
              <h2 className="text-xl font-bold playfair text-nature mb-4">
                {editingId ? 'ویرایش پست' : 'پست جدید'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-nature mb-2 text-sm font-medium">عنوان</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border nature-border focus:outline-none focus:ring-2 focus:ring-nature-green text-nature"
                    required
                  />
                </div>
                <div>
                  <label className="block text-nature mb-2 text-sm font-medium">محتوا</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border nature-border focus:outline-none focus:ring-2 focus:ring-nature-green text-nature"
                    rows={6}
                  />
                </div>
                <div>
                  <label className="block text-nature mb-2 text-sm font-medium">لینک تصویر</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border nature-border focus:outline-none focus:ring-2 focus:ring-nature-green text-nature"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({...formData, published: e.target.checked})}
                    className="ml-2"
                  />
                  <label className="text-nature text-sm">منتشر شده</label>
                </div>
                <div className="flex space-x-2 space-x-reverse">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex-1 btn-nature py-2 rounded-lg font-medium"
                  >
                    {editingId ? 'ویرایش' : 'افزودن'}
                  </motion.button>
                  {editingId && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => {
                        setEditingId(null)
                        setFormData({ title: '', content: '', image: '', published: false })
                      }}
                      className="flex-1 btn-outline-nature py-2 rounded-lg font-medium"
                    >
                      لغو
                    </motion.button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* List */}
          <div className="lg:col-span-2">
            <div className="white-card p-6 rounded-xl">
              <h2 className="text-xl font-bold playfair text-nature mb-4">لیست پست‌ها</h2>
              {loading ? (
                <div className="text-center py-8 text-nature-light">در حال بارگذاری...</div>
              ) : posts.length === 0 ? (
                <div className="text-center py-8 text-nature-light">هیچ پستی وجود ندارد</div>
              ) : (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border nature-border rounded-lg p-4 hover:bg-nature-light-green transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 space-x-reverse mb-2">
                            <h3 className="font-bold text-nature">{post.title}</h3>
                            {post.published ? (
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">منتشر شده</span>
                            ) : (
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">پیش‌نویس</span>
                            )}
                          </div>
                          {post.content && (
                            <p className="text-sm text-nature-light mb-2 line-clamp-2">{post.content}</p>
                          )}
                          {post.image && (
                            <Image
                              src={post.image}
                              alt={post.title}
                              width={200}
                              height={120}
                              className="w-full h-32 object-cover rounded-lg mt-2"
                            />
                          )}
                          <p className="text-xs text-nature-light mt-2">
                            {new Date(post.created_at).toLocaleDateString('fa-IR')}
                          </p>
                        </div>
                        <div className="flex space-x-2 space-x-reverse mr-4">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleEdit(post)}
                            className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          >
                            <i className="fas fa-edit"></i>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDelete(post.id)}
                            className="px-3 py-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <i className="fas fa-trash"></i>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

