'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { MenuItem } from '@/lib/types'

export default function CafePage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('همه')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      const res = await fetch('/api/menu')
      const data = await res.json()
      setMenuItems(data.filter((item: MenuItem) => item.available))
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch menu items:', error)
      setLoading(false)
    }
  }

  const categories = ['همه', ...Array.from(new Set(menuItems.map(item => item.category)))]
  const filteredItems = selectedCategory === 'همه' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory)

  return (
    <div className="min-h-screen nature-bg">
      <Navigation />
      
      <div className="pt-20">
        <section className="section-padding">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-5xl font-bold mb-4 playfair text-nature">منوی ما</h1>
              <p className="text-xl text-nature-light">طعم‌های خوشمزه و طبیعی</p>
            </motion.div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category
                      ? 'btn-nature text-white'
                      : 'btn-outline-nature'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
            
            {loading ? (
              <div className="text-center py-12 text-nature-light">در حال بارگذاری...</div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-12 text-nature-light">هیچ آیتمی در این دسته‌بندی وجود ندارد</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="white-card rounded-xl overflow-hidden"
                  >
                    {item.image && (
                      <div className="relative h-64 nature-overlay">
                        <Image 
                          src={item.image} 
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-nature playfair">{item.name}</h3>
                        <span className="px-3 py-1 bg-nature-light-green text-nature-green rounded-full text-xs font-medium">
                          {item.category}
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-nature-light mb-4">{item.description}</p>
                      )}
                      <div className="flex justify-between items-center">
                        <p className="text-nature-green font-bold text-xl">{item.price.toLocaleString('fa-IR')} تومان</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  )
}
