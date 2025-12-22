'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface MenuItemProps {
  item: {
    id: number
    name: string
    price: number
    category: string
    description: string
    image: string
  }
  index: number
}

export default function MenuItem({ item, index }: MenuItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1 })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotate: -5 }}
      animate={isVisible ? { opacity: 1, y: 0, rotate: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
    >
      <div className="relative h-64">
        <Image 
          src={item.image} 
          alt={item.name}
          width={400}
          height={300}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full font-bold text-sm">
          {item.price.toLocaleString('fa-IR')} تومان
        </div>
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs">
          {item.category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 playfair">{item.name}</h3>
        <p className="text-gray-600 mb-4">{item.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="fas fa-star"></i>
              ))}
            </div>
            <span className="text-sm text-gray-500">بسیار محبوب</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            مشاهده بیشتر
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

