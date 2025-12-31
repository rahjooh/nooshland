'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { MenuItem, Order, Customer, Post } from '@/lib/types'

export default function AdminDashboard() {
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [stats, setStats] = useState({
    menuItems: 0,
    orders: 0,
    customers: 0,
    posts: 0
  })

  useEffect(() => {
    if (isLoggedIn) {
      fetchStats()
      // Auto-seed database if empty (only on first admin access)
      seedDatabaseIfNeeded()
    }
  }, [isLoggedIn])

  const seedDatabaseIfNeeded = async () => {
    try {
      // Check if database needs seeding by checking menu items count
      const menuRes = await fetch('/api/menu')
      const menu = await menuRes.json()
      
      if (menu.length === 0) {
        // Database is empty, seed it
        await fetch('/api/init', { method: 'POST' })
        // Refresh stats after seeding
        setTimeout(() => fetchStats(), 1000)
      }
    } catch (error) {
      console.error('Failed to check/seed database:', error)
    }
  }

  const fetchStats = async () => {
    try {
      const [menuRes, ordersRes, customersRes, postsRes] = await Promise.all([
        fetch('/api/menu'),
        fetch('/api/orders'),
        fetch('/api/customers'),
        fetch('/api/posts')
      ])
      
      const menu = await menuRes.json()
      const orders = await ordersRes.json()
      const customers = await customersRes.json()
      const posts = await postsRes.json()

      setStats({
        menuItems: menu.length,
        orders: orders.length,
        customers: customers.length,
        posts: posts.length
      })
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'admin123') {
      setIsLoggedIn(true)
    } else {
      alert('رمز عبور اشتباه است')
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen nature-bg flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="white-card p-8 rounded-2xl w-full max-w-md"
        >
          <div className="text-center mb-6">
            <div className="w-20 h-20 mx-auto mb-4 nature-light-green rounded-full flex items-center justify-center">
              <i className="fas fa-leaf text-3xl nature-green"></i>
            </div>
            <h2 className="text-3xl font-bold playfair text-nature mb-2">پنل مدیریت</h2>
            <p className="text-nature-light">کافه و رستوران گل‌های زیبا</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-nature mb-2 text-sm font-medium">رمز عبور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border nature-border focus:outline-none focus:ring-2 focus:ring-nature-green text-nature"
                placeholder="رمز عبور را وارد کنید"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full btn-nature py-3 rounded-lg font-medium"
            >
              ورود
            </motion.button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen nature-bg">
      {/* Header */}
      <header className="bg-white border-b nature-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-10 h-10 nature-light-green rounded-full flex items-center justify-center">
                <i className="fas fa-leaf nature-green"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold playfair text-nature">پنل مدیریت</h1>
                <p className="text-xs text-nature-light">کافه و رستوران گل‌های زیبا</p>
              </div>
            </div>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="px-4 py-2 text-nature-light hover:text-nature transition-colors"
            >
              <i className="fas fa-sign-out-alt ml-2"></i>
              خروج
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/admin/menu">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="white-card p-6 rounded-xl cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 nature-light-green rounded-lg flex items-center justify-center">
                  <i className="fas fa-utensils nature-green text-xl"></i>
                </div>
                <span className="text-2xl font-bold text-nature">{stats.menuItems}</span>
              </div>
              <h3 className="text-nature font-medium">آیتم‌های منو</h3>
            </motion.div>
          </Link>

          <Link href="/admin/orders">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="white-card p-6 rounded-xl cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 nature-light-green rounded-lg flex items-center justify-center">
                  <i className="fas fa-shopping-cart nature-green text-xl"></i>
                </div>
                <span className="text-2xl font-bold text-nature">{stats.orders}</span>
              </div>
              <h3 className="text-nature font-medium">سفارش‌ها</h3>
            </motion.div>
          </Link>

          <Link href="/admin/customers">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="white-card p-6 rounded-xl cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 nature-light-green rounded-lg flex items-center justify-center">
                  <i className="fas fa-users nature-green text-xl"></i>
                </div>
                <span className="text-2xl font-bold text-nature">{stats.customers}</span>
              </div>
              <h3 className="text-nature font-medium">مشتریان</h3>
            </motion.div>
          </Link>

          <Link href="/admin/posts">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="white-card p-6 rounded-xl cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 nature-light-green rounded-lg flex items-center justify-center">
                  <i className="fas fa-newspaper nature-green text-xl"></i>
                </div>
                <span className="text-2xl font-bold text-nature">{stats.posts}</span>
              </div>
              <h3 className="text-nature font-medium">پست‌ها</h3>
            </motion.div>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="white-card p-6 rounded-xl">
          <h2 className="text-xl font-bold playfair text-nature mb-4">دسترسی سریع</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/admin/menu">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-outline-nature py-3 rounded-lg font-medium"
              >
                <i className="fas fa-plus ml-2"></i>
                افزودن آیتم منو
              </motion.button>
            </Link>
            <Link href="/admin/posts">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-outline-nature py-3 rounded-lg font-medium"
              >
                <i className="fas fa-edit ml-2"></i>
                نوشتن پست جدید
              </motion.button>
            </Link>
            <Link href="/admin/orders">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-outline-nature py-3 rounded-lg font-medium"
              >
                <i className="fas fa-list ml-2"></i>
                مشاهده سفارش‌ها
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
