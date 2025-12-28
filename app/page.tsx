'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import AnimatedSection from '@/components/AnimatedSection'
import { menuItems } from '@/lib/menuData'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20">
        <div className="min-h-screen gradient-bg">
          {/* Hero Section */}
          <AnimatedSection className="relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent rotate-3d"></div>
              <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl floating"></div>
              <div className="absolute bottom-20 right-10 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl floating" style={{animationDelay: '1s'}}></div>
            </div>
            
            <div className="container mx-auto px-4 py-20">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center text-white"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-block mb-8"
                >
                  <div className="w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl pulse-glow">
                    <i className="fas fa-coffee text-5xl"></i>
                  </div>
                </motion.div>
                
                <h1 className="text-6xl font-bold mb-4 playfair">کافه لوکس</h1>
                <p className="text-2xl mb-8">تجربه‌ای فراموش‌نشدنی</p>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex justify-center space-x-4"
                >
                  <Link href="/cafe">
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white/20 backdrop-blur-sm px-8 py-3 rounded-full text-white font-bold border border-white/30 hover:bg-white/30 transition-all duration-300"
                    >
                      مشاهده منو
                    </motion.button>
                  </Link>
                  <Link href="/about">
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white/20 backdrop-blur-sm px-8 py-3 rounded-full text-white font-bold border border-white/30 hover:bg-white/30 transition-all duration-300"
                    >
                      درباره ما
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Features Section */}
          <AnimatedSection className="py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold text-white mb-4 playfair">چرا ما؟</h2>
                <p className="text-xl text-gray-300">تجربه‌ای متفاوت با بهترین کیفیت</p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-3xl hover:bg-white/20 transition-all duration-300"
                >
                  <div className="text-5xl text-yellow-400 mb-4">
                    <i className="fas fa-award"></i>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white playfair">کیفیت بالا</h3>
                  <p className="text-gray-300">بهترین مواد اولیه برای بهترین طعم</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-3xl hover:bg-white/20 transition-all duration-300"
                >
                  <div className="text-5xl text-yellow-400 mb-4">
                    <i className="fas fa-clock"></i>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white playfair">سرو سریع</h3>
                  <p className="text-gray-300">سرویس سریع و به موقع</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-3xl hover:bg-white/20 transition-all duration-300"
                >
                  <div className="text-5xl text-yellow-400 mb-4">
                    <i className="fas fa-heart"></i>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white playfair">عشق و اشتیاق</h3>
                  <p className="text-gray-300">ساخته شده با عشق و اشتیاق</p>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>

          {/* Menu Preview Section */}
          <AnimatedSection className="py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-bold text-white mb-4 playfair">نمونه از منوی ما</h2>
                <p className="text-xl text-gray-300">طعم‌های خوشمزه و لوکس</p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {menuItems.slice(0, 4).map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="relative h-48">
                      <Image 
                        src={item.image} 
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-white mb-2 playfair">{item.name}</h3>
                      <p className="text-yellow-400 font-bold text-lg">{item.price.toLocaleString('fa-IR')} تومان</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Link href="/cafe">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    مشاهده کامل منو
                  </motion.button>
                </Link>
              </div>
            </div>
          </AnimatedSection>

          {/* Testimonials Section */}
          <AnimatedSection className="py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-bold text-white mb-4 playfair">نظرات مشتریان</h2>
                <p className="text-xl text-gray-300">خبر خوب از مشتریان خوشحال</p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-sm rounded-3xl p-6"
                >
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic">
                    &quot;بهترین قهوه‌ای که تا به حال خورده‌ام. محیط بسیار آرامش‌بخش و پرسنل خوش‌برخورد.&quot;
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                    <div>
                      <p className="font-bold text-white">سارا احمدی</p>
                      <p className="text-sm text-gray-400">مشتری وفادار</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white/10 backdrop-blur-sm rounded-3xl p-6"
                >
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic">
                    &quot;برگرهایشان فوق‌العاده است. هر بار که می‌آیم، طعم جدیدی را تجربه می‌کنم.&quot;
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                    <div>
                      <p className="font-bold text-white">محمد رضایی</p>
                      <p className="text-sm text-gray-400">کارمند شرکت</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="bg-white/10 backdrop-blur-sm rounded-3xl p-6"
                >
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic">
                    &quot;سرویس بسیار سریع و محیط بسیار شیک. برای جلسات کاری عالی است.&quot;
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                    <div>
                      <p className="font-bold text-white">فاطمه کریمی</p>
                      <p className="text-sm text-gray-400">دانشجوی دانشگاه</p>
                    </div>
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

