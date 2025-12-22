'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import AnimatedSection from '@/components/AnimatedSection'

export default function AboutPage() {
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
                <h1 className="text-5xl font-bold text-gray-800 mb-4 playfair">درباره ما</h1>
                <p className="text-xl text-gray-600">داستان کافه لوکس</p>
              </motion.div>
              
              <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mb-8"
                >
                  <h2 className="text-3xl font-bold mb-4 playfair">ما کی هستیم؟</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    کافه لوکس از سال ۲۰۲۰ با هدف ارائه تجربه‌ای فراموش‌نشدنی به مشتریان آغاز به کار کرد. 
                    ما با ترکیب بهترین مواد اولیه و هنر آشپزی مدرن، تلاش کرده‌ایم تا بهترین طعم‌ها را به شما هدیه دهیم. 
                    تیم ما متشکل از بهترین چای‌سازان و آشپزهای حرفه‌ای است که هر روز با عشق و اشتیاق برای شما کار می‌کنند.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl">
                    <div className="text-4xl text-yellow-500 mb-4">
                      <i className="fas fa-coffee"></i>
                    </div>
                    <h3 className="text-xl font-bold mb-2">کیفیت</h3>
                    <p className="text-gray-600">بهترین مواد اولیه</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
                    <div className="text-4xl text-blue-500 mb-4">
                      <i className="fas fa-star"></i>
                    </div>
                    <h3 className="text-xl font-bold mb-2">خدمات</h3>
                    <p className="text-gray-600">خدمات عالی</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl">
                    <div className="text-4xl text-green-500 mb-4">
                      <i className="fas fa-leaf"></i>
                    </div>
                    <h3 className="text-xl font-bold mb-2">محیط</h3>
                    <p className="text-gray-600">محیط آرامش‌بخش</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}


