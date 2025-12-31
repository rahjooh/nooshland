'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-t nature-border py-12"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 space-x-reverse mb-4">
              <div className="w-10 h-10 nature-light-green rounded-full flex items-center justify-center">
                <i className="fas fa-leaf nature-green"></i>
              </div>
              <h3 className="text-xl font-bold playfair text-nature">کافه گل‌های زیبا</h3>
            </div>
            <p className="text-nature-light">تجربه‌ای آرامش‌بخش در فضایی پر از گل و گیاه</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-nature">منو</h4>
            <ul className="space-y-2 text-nature-light">
              <li><Link href="/cafe" className="hover:text-nature-green transition-colors">منوی کامل</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-nature">لینک‌ها</h4>
            <ul className="space-y-2 text-nature-light">
              <li><Link href="/about" className="hover:text-nature-green transition-colors">درباره ما</Link></li>
              <li><Link href="/contact" className="hover:text-nature-green transition-colors">تماس با ما</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-nature">ارتباط</h4>
            <div className="space-y-2 text-nature-light">
              <p><i className="fas fa-phone ml-2 nature-green"></i>021-12345678</p>
              <p><i className="fas fa-envelope ml-2 nature-green"></i>info@nooshland.ir</p>
            </div>
          </div>
        </div>
        <div className="border-t nature-border mt-8 pt-8 text-center text-nature-light">
          <p>&copy; 2024 کافه گل‌های زیبا. تمام حقوق محفوظ است.</p>
        </div>
      </div>
    </motion.footer>
  )
}
