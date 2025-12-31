'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { MenuItem } from '@/lib/types'

export default function Home() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    fetchMenuItems()
    fetchPosts()
  }, [])

  const fetchMenuItems = async () => {
    try {
      const res = await fetch('/api/menu')
      const data = await res.json()
      setMenuItems(data.filter((item: MenuItem) => item.available).slice(0, 4))
    } catch (error) {
      console.error('Failed to fetch menu items:', error)
    }
  }

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts?published=true')
      const data = await res.json()
      setPosts(data.slice(0, 3))
    } catch (error) {
      console.error('Failed to fetch posts:', error)
    }
  }

  return (
    <div className="min-h-screen nature-bg">
      <Navigation />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden nature-bg section-padding">
          <div className="absolute inset-0 leaf-pattern opacity-30"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block mb-8"
              >
                <div className="w-32 h-32 nature-light-green rounded-full flex items-center justify-center shadow-lg leaf-float">
                  <i className="fas fa-leaf text-5xl nature-green"></i>
                </div>
              </motion.div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-4 playfair text-nature">کافه گل‌های زیبا</h1>
              <p className="text-xl md:text-2xl mb-8 text-nature-light">تجربه‌ای آرامش‌بخش در فضایی پر از گل و گیاه</p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex justify-center space-x-4 space-x-reverse"
              >
                <Link href="/cafe">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-nature px-8 py-3 rounded-lg font-bold shadow-lg"
                  >
                    مشاهده منو
                  </motion.button>
                </Link>
                <Link href="/about">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-outline-nature px-8 py-3 rounded-lg font-bold"
                  >
                    درباره ما
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-padding bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 playfair text-nature">چرا ما؟</h2>
              <p className="text-xl text-nature-light">تجربه‌ای متفاوت در محیطی طبیعی</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="white-card p-8 rounded-xl text-center"
              >
                <div className="text-5xl nature-green mb-4">
                  <i className="fas fa-leaf"></i>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-nature playfair">طبیعت و آرامش</h3>
                <p className="text-nature-light">محیطی پر از گل و گیاه برای تجربه‌ای آرامش‌بخش</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="white-card p-8 rounded-xl text-center"
              >
                <div className="text-5xl nature-green mb-4">
                  <i className="fas fa-seedling"></i>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-nature playfair">مواد تازه</h3>
                <p className="text-nature-light">استفاده از بهترین و تازه‌ترین مواد اولیه</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="white-card p-8 rounded-xl text-center"
              >
                <div className="text-5xl nature-green mb-4">
                  <i className="fas fa-heart"></i>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-nature playfair">سرویس عالی</h3>
                <p className="text-nature-light">خدمات با کیفیت و پرسنل خوش‌برخورد</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Menu Preview Section */}
        <section className="section-padding nature-bg">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4 playfair text-nature">نمونه از منوی ما</h2>
              <p className="text-xl text-nature-light">طعم‌های خوشمزه و طبیعی</p>
            </motion.div>
            
            {menuItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="white-card rounded-xl overflow-hidden"
                  >
                    {item.image && (
                      <div className="relative h-48 nature-overlay">
                        <Image 
                          src={item.image} 
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-nature mb-2 playfair">{item.name}</h3>
                      {item.description && (
                        <p className="text-sm text-nature-light mb-2">{item.description}</p>
                      )}
                      <p className="text-nature-green font-bold text-lg">{item.price.toLocaleString('fa-IR')} تومان</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-nature-light">در حال بارگذاری منو...</div>
            )}
            
            <div className="text-center mt-8">
              <Link href="/cafe">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-nature px-8 py-3 rounded-lg font-bold shadow-lg"
                >
                  مشاهده کامل منو
                </motion.button>
              </Link>
            </div>
          </div>
        </section>

        {/* Posts Section */}
        {posts.length > 0 && (
          <section className="section-padding bg-white">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-bold mb-4 playfair text-nature">اخبار و رویدادها</h2>
                <p className="text-xl text-nature-light">آخرین اخبار و رویدادهای ما</p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="white-card rounded-xl overflow-hidden"
                  >
                    {post.image && (
                      <div className="relative h-48 nature-overlay">
                        <Image 
                          src={post.image} 
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-nature mb-2 playfair">{post.title}</h3>
                      {post.content && (
                        <p className="text-nature-light mb-4 line-clamp-3">{post.content}</p>
                      )}
                      <p className="text-xs text-nature-light">
                        {new Date(post.created_at).toLocaleDateString('fa-IR')}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
      
      <Footer />
    </div>
  )
}
