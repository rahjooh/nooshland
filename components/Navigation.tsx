'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavItem = ({ text, href, active = false }: { text: string; href: string; active?: boolean }) => (
  <Link href={href}>
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`cursor-pointer px-4 py-2 rounded-full transition-all duration-300 ${
        active 
          ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg' 
          : 'text-gray-300 hover:text-white hover:bg-white/10'
      }`}
    >
      {text}
    </motion.div>
  </Link>
)

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 glass-effect"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <Link href="/">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <i className="fas fa-coffee text-white"></i>
              </div>
            </Link>
            <Link href="/">
              <span className="text-xl font-bold text-white playfair">کافه لوکس</span>
            </Link>
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-6">
            <NavItem text="خانه" href="/" active={isActive('/')} />
            <NavItem text="کافه" href="/cafe" active={isActive('/cafe')} />
            <NavItem text="فست فود" href="/fastfood" active={isActive('/fastfood')} />
            <NavItem text="درباره ما" href="/about" active={isActive('/about')} />
            <NavItem text="تماس با ما" href="/contact" active={isActive('/contact')} />
            <Link href="/admin">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full cursor-pointer"
              >
                <i className="fas fa-user-shield mr-2"></i>
                ادمین
              </motion.div>
            </Link>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white"
            >
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: mobileMenuOpen ? 1 : 0, y: mobileMenuOpen ? 0 : -20 }}
        className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} bg-white/10 backdrop-blur-sm`}
      >
        <div className="px-4 py-2 space-y-2">
          <NavItem text="خانه" href="/" active={isActive('/')} />
          <NavItem text="کافه" href="/cafe" active={isActive('/cafe')} />
          <NavItem text="فست فود" href="/fastfood" active={isActive('/fastfood')} />
          <NavItem text="درباره ما" href="/about" active={isActive('/about')} />
          <NavItem text="تماس با ما" href="/contact" active={isActive('/contact')} />
          <Link href="/admin">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full cursor-pointer"
            >
              <i className="fas fa-user-shield mr-2"></i>
              ادمین
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </motion.nav>
  )
}


