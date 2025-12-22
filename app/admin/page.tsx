'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import { menuItems as initialMenuItems, MenuItem } from '@/lib/menuData'

export default function AdminPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'کافه',
    description: '',
    image: ''
  })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      setMenuItems(items =>
        items.map(item =>
          item.id === editingId
            ? { ...item, ...formData, price: parseInt(formData.price) }
            : item
        )
      )
    } else {
      const newItem: MenuItem = {
        id: Date.now(),
        ...formData,
        price: parseInt(formData.price)
      }
      setMenuItems([...menuItems, newItem])
    }
    setFormData({ name: '', price: '', category: 'کافه', description: '', image: '' })
    setEditingId(null)
  }

  const handleEdit = (item: MenuItem) => {
    setFormData(item)
    setEditingId(item.id)
  }

  const handleDelete = (id: number) => {
    setMenuItems(items => items.filter(item => item.id !== id))
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'admin123') {
      setIsLoggedIn(true)
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center playfair">پنل مدیریت</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-white mb-2">رمز عبور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-full bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="رمز عبور"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              ورود
            </motion.button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-20">
        <div className="min-h-screen bg-gray-900 text-white">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">پنل مدیریت کافه لوکس</h1>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLoggedIn(false)}
                className="bg-white/20 px-4 py-2 rounded-full"
              >
                خروج
              </motion.button>
            </div>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
                  <h2 className="text-xl font-bold mb-4">اضافه کردن/ویرایش محصول</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      placeholder="نام محصول"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-full bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      required
                    />
                    <input
                      type="number"
                      placeholder="قیمت"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full px-4 py-3 rounded-full bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      required
                    />
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-4 py-3 rounded-full bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                      <option value="کافه">کافه</option>
                      <option value="فست فود">فست فود</option>
                      <option value="دسر">دسر</option>
                      <option value="نوشیدنی">نوشیدنی</option>
                    </select>
                    <textarea
                      placeholder="توضیحات"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full px-4 py-3 rounded-2xl bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      rows={3}
                    />
                    <input
                      type="text"
                      placeholder="لینک تصویر"
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      className="w-full px-4 py-3 rounded-full bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      required
                    />
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 rounded-full font-bold"
                      >
                        {editingId ? 'ویرایش' : 'اضافه کردن'}
                      </motion.button>
                      {editingId && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={() => {
                            setEditingId(null)
                            setFormData({ name: '', price: '', category: 'کافه', description: '', image: '' })
                          }}
                          className="flex-1 bg-gray-600 text-white py-3 rounded-full font-bold"
                        >
                          لغو
                        </motion.button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
                  <h2 className="text-xl font-bold mb-4">لیست محصولات</h2>
                  <div className="space-y-4">
                    {menuItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="bg-white/5 rounded-xl p-4 flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-4">
                          <Image src={item.image} alt={item.name} width={64} height={64} className="w-16 h-16 rounded-lg object-cover" />
                          <div>
                            <h3 className="font-bold">{item.name}</h3>
                            <p className="text-sm text-gray-300">{item.category}</p>
                            <p className="text-yellow-400 font-bold">{item.price.toLocaleString('fa-IR')} تومان</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleEdit(item)}
                            className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full border border-blue-400"
                          >
                            ویرایش
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDelete(item.id)}
                            className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full border border-red-400"
                          >
                            حذف
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


