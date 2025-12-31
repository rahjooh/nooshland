'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Customer } from '@/lib/types'

export default function CustomersManagement() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    try {
      const res = await fetch('/api/customers')
      const data = await res.json()
      setCustomers(data)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch customers:', error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen nature-bg">
      <header className="bg-white border-b nature-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3 space-x-reverse">
            <Link href="/admin" className="text-nature-light hover:text-nature">
              <i className="fas fa-arrow-right"></i>
            </Link>
            <h1 className="text-xl font-bold playfair text-nature">مدیریت مشتریان</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="white-card p-6 rounded-xl">
          <h2 className="text-xl font-bold playfair text-nature mb-6">لیست مشتریان</h2>
          {loading ? (
            <div className="text-center py-8 text-nature-light">در حال بارگذاری...</div>
          ) : customers.length === 0 ? (
            <div className="text-center py-8 text-nature-light">هیچ مشتری‌ای وجود ندارد</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b nature-border">
                    <th className="text-right py-3 px-4 text-nature font-medium">نام</th>
                    <th className="text-right py-3 px-4 text-nature font-medium">ایمیل</th>
                    <th className="text-right py-3 px-4 text-nature font-medium">تلفن</th>
                    <th className="text-right py-3 px-4 text-nature font-medium">آدرس</th>
                    <th className="text-right py-3 px-4 text-nature font-medium">تاریخ عضویت</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <motion.tr
                      key={customer.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b nature-border hover:bg-nature-light-green transition-colors"
                    >
                      <td className="py-3 px-4 text-nature">{customer.name}</td>
                      <td className="py-3 px-4 text-nature-light">{customer.email || '-'}</td>
                      <td className="py-3 px-4 text-nature-light">{customer.phone || '-'}</td>
                      <td className="py-3 px-4 text-nature-light">{customer.address || '-'}</td>
                      <td className="py-3 px-4 text-nature-light text-sm">
                        {new Date(customer.created_at).toLocaleDateString('fa-IR')}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

