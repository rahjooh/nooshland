'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import AnimatedSection from '@/components/AnimatedSection'

export default function ContactPage() {
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
                <h1 className="text-5xl font-bold text-gray-800 mb-4 playfair">تماس با ما</h1>
                <p className="text-xl text-gray-600">ما همیشه در دسترس هستیم</p>
              </motion.div>
              
              <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  <div>
                    <h2 className="text-2xl font-bold mb-4 playfair">اطلاعات تماس</h2>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <i className="fas fa-map-marker-alt text-yellow-500 text-xl"></i>
                        <span>تهران، میدان آزادی، خیابان ولیعصر، پلاک ۱۲۳</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <i className="fas fa-phone text-yellow-500 text-xl"></i>
                        <span>021-12345678</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <i className="fas fa-envelope text-yellow-500 text-xl"></i>
                        <span>info@cafelux.com</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <i className="fas fa-clock text-yellow-500 text-xl"></i>
                        <span>هر روز ۸ صبح تا ۱۲ شب</span>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <h3 className="text-xl font-bold mb-4">شبکه‌های اجتماعی</h3>
                      <div className="flex space-x-4">
                        <motion.a
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          href="#"
                          className="text-2xl text-gray-600 hover:text-yellow-500 transition-colors"
                        >
                          <i className="fab fa-instagram"></i>
                        </motion.a>
                        <motion.a
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          href="#"
                          className="text-2xl text-gray-600 hover:text-yellow-500 transition-colors"
                        >
                          <i className="fab fa-facebook"></i>
                        </motion.a>
                        <motion.a
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          href="#"
                          className="text-2xl text-gray-600 hover:text-yellow-500 transition-colors"
                        >
                          <i className="fab fa-twitter"></i>
                        </motion.a>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold mb-4 playfair">فرم تماس</h2>
                    <form className="space-y-4">
                      <input
                        type="text"
                        placeholder="نام و نام خانوادگی"
                        className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                      <input
                        type="email"
                        placeholder="ایمیل"
                        className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                      <textarea
                        placeholder="پیام شما"
                        rows={4}
                        className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      ></textarea>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        ارسال پیام
                      </motion.button>
                    </form>
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


