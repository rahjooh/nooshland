'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import AnimatedSection from '@/components/AnimatedSection'
import MenuItem from '@/components/MenuItem'
import { menuItems } from '@/lib/menuData'

export default function FastFoodPage() {
  const fastFoodItems = menuItems.filter(item => item.category === 'فست فود')

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20">
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
          <AnimatedSection className="py-16">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <h1 className="text-5xl font-bold text-gray-800 mb-4 playfair">منوی فست فود</h1>
                <p className="text-xl text-gray-600">طعم‌های خوشمزه و سریع</p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {fastFoodItems.map((item, index) => (
                  <MenuItem key={item.id} item={item} index={index} />
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}


