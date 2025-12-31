'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { MenuItem } from '@/lib/types'

export default function MenuManagement() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'کافه',
    image: '',
    available: true
  })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      const res = await fetch('/api/menu')
      const data = await res.json()
      setMenuItems(data)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch menu items:', error)
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingId ? `/api/menu/${editingId}` : '/api/menu'
      const method = editingId ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseInt(formData.price)
        })
      })

      if (res.ok) {
        fetchMenuItems()
        setFormData({ name: '', description: '', price: '', category: 'کافه', image: '', available: true })
        setEditingId(null)
      }
    } catch (error) {
      console.error('Failed to save menu item:', error)
    }
  }

  const handleEdit = (item: MenuItem) => {
    setFormData({
      name: item.name,
      description: item.description || '',
      price: item.price.toString(),
      category: item.category,
      image: item.image || '',
      available: item.available
    })
    setEditingId(item.id)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('آیا مطمئن هستید که می‌خواهید این آیتم را حذف کنید؟')) return

    try {
      const res = await fetch(`/api/menu/${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchMenuItems()
      }
    } catch (error) {
      console.error('Failed to delete menu item:', error)
    }
  }

  return (
    <div className="min-h-screen nature-bg">
      <header className="bg-white border-b nature-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 space-x-reverse">
              <Link href="/admin" className="text-nature-light hover:text-nature">
                <i className="fas fa-arrow-right"></i>
              </Link>
              <h1 className="text-xl font-bold playfair text-nature">مدیریت منو</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1">
            <div className="white-card p-6 rounded-xl sticky top-24">
              <h2 className="text-xl font-bold playfair text-nature mb-4">
                {editingId ? 'ویرایش آیتم' : 'افزودن آیتم جدید'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-nature mb-2 text-sm font-medium">نام</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border nature-border focus:outline-none focus:ring-2 focus:ring-nature-green text-nature"
                    required
                  />
                </div>
                <div>
                  <label className="block text-nature mb-2 text-sm font-medium">قیمت (تومان)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border nature-border focus:outline-none focus:ring-2 focus:ring-nature-green text-nature"
                    required
                  />
                </div>
                <div>
                  <label className="block text-nature mb-2 text-sm font-medium">دسته‌بندی</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border nature-border focus:outline-none focus:ring-2 focus:ring-nature-green text-nature"
                  >
                    <option value="کافه">کافه</option>
                    <option value="فست فود">فست فود</option>
                    <option value="دسر">دسر</option>
                    <option value="نوشیدنی">نوشیدنی</option>
                    <option value="گل و گیاه">گل و گیاه</option>
                  </select>
                </div>
                <div>
                  <label className="block text-nature mb-2 text-sm font-medium">توضیحات</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border nature-border focus:outline-none focus:ring-2 focus:ring-nature-green text-nature"
                    rows={3}
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
                    checked={formData.available}
                    onChange={(e) => setFormData({...formData, available: e.target.checked})}
                    className="ml-2"
                  />
                  <label className="text-nature text-sm">در دسترس</label>
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
                        setFormData({ name: '', description: '', price: '', category: 'کافه', image: '', available: true })
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
              <h2 className="text-xl font-bold playfair text-nature mb-4">لیست آیتم‌های منو</h2>
              {loading ? (
                <div className="text-center py-8 text-nature-light">در حال بارگذاری...</div>
              ) : menuItems.length === 0 ? (
                <div className="text-center py-8 text-nature-light">هیچ آیتمی وجود ندارد</div>
              ) : (
                <div className="space-y-4">
                  {menuItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-4 border nature-border rounded-lg hover:bg-nature-light-green transition-colors"
                    >
                      <div className="flex items-center space-x-4 space-x-reverse">
                        {item.image && (
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        )}
                        <div>
                          <h3 className="font-bold text-nature">{item.name}</h3>
                          <p className="text-sm text-nature-light">{item.category}</p>
                          <p className="text-nature-green font-bold">{item.price.toLocaleString('fa-IR')} تومان</p>
                          {!item.available && (
                            <span className="text-xs text-red-500">غیرفعال</span>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2 space-x-reverse">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(item)}
                          className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <i className="fas fa-edit"></i>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(item.id)}
                          className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <i className="fas fa-trash"></i>
                        </motion.button>
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

