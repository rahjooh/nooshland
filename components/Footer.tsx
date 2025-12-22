'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 text-white py-12"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 playfair">کافه لوکس</h3>
            <p className="text-gray-400">تجربه‌ای فراموش‌نشدنی</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">منو</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/cafe" className="hover:text-yellow-400 transition-colors">کافه</Link></li>
              <li><Link href="/fastfood" className="hover:text-yellow-400 transition-colors">فست فود</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">لینک‌ها</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-yellow-400 transition-colors">درباره ما</Link></li>
              <li><Link href="/contact" className="hover:text-yellow-400 transition-colors">تماس با ما</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">ارتباط</h4>
            <div className="space-y-2 text-gray-400">
              <p><i className="fas fa-phone mr-2"></i>021-12345678</p>
              <p><i className="fas fa-envelope mr-2"></i>info@cafelux.com</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 کافه لوکس. تمام حقوق محفوظ است.</p>
        </div>
      </div>
    </motion.footer>
  )
}


