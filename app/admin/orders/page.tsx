'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Order } from '@/lib/types'

export default function OrdersManagement() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders')
      const data = await res.json()
      setOrders(data)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch orders:', error)
      setLoading(false)
    }
  }

  const updateOrderStatus = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      if (res.ok) {
        fetchOrders()
      }
    } catch (error) {
      console.error('Failed to update order:', error)
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      preparing: 'bg-purple-100 text-purple-800',
      ready: 'bg-green-100 text-green-800',
      delivered: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'در انتظار',
      confirmed: 'تایید شده',
      preparing: 'در حال آماده‌سازی',
      ready: 'آماده',
      delivered: 'تحویل داده شده',
      cancelled: 'لغو شده'
    }
    return labels[status] || status
  }

  return (
    <div className="min-h-screen nature-bg">
      <header className="bg-white border-b nature-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3 space-x-reverse">
            <Link href="/admin" className="text-nature-light hover:text-nature">
              <i className="fas fa-arrow-right"></i>
            </Link>
            <h1 className="text-xl font-bold playfair text-nature">مدیریت سفارش‌ها</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="white-card p-6 rounded-xl">
          <h2 className="text-xl font-bold playfair text-nature mb-6">لیست سفارش‌ها</h2>
          {loading ? (
            <div className="text-center py-8 text-nature-light">در حال بارگذاری...</div>
          ) : orders.length === 0 ? (
            <div className="text-center py-8 text-nature-light">هیچ سفارشی وجود ندارد</div>
          ) : (
            <div className="space-y-4">
              {orders.map((order: any) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border nature-border rounded-lg p-4 hover:bg-nature-light-green transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-nature">سفارش #{order.id}</h3>
                      {order.customer_name && (
                        <p className="text-sm text-nature-light">مشتری: {order.customer_name}</p>
                      )}
                      {order.phone && (
                        <p className="text-sm text-nature-light">تلفن: {order.phone}</p>
                      )}
                      <p className="text-sm text-nature-light">
                        تاریخ: {new Date(order.created_at).toLocaleDateString('fa-IR')}
                      </p>
                    </div>
                    <div className="text-left">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                      <p className="text-lg font-bold text-nature mt-2">
                        {order.total_amount.toLocaleString('fa-IR')} تومان
                      </p>
                    </div>
                  </div>

                  {order.items && order.items.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-nature mb-2">آیتم‌ها:</h4>
                      <div className="space-y-2">
                        {order.items.map((item: any) => (
                          <div key={item.id} className="flex justify-between text-sm text-nature-light">
                            <span>{item.menu_item_name} × {item.quantity}</span>
                            <span>{item.price.toLocaleString('fa-IR')} تومان</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {order.notes && (
                    <p className="text-sm text-nature-light mb-4">یادداشت: {order.notes}</p>
                  )}

                  <div className="flex space-x-2 space-x-reverse">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className="px-4 py-2 rounded-lg border nature-border focus:outline-none focus:ring-2 focus:ring-nature-green text-nature text-sm"
                    >
                      <option value="pending">در انتظار</option>
                      <option value="confirmed">تایید شده</option>
                      <option value="preparing">در حال آماده‌سازی</option>
                      <option value="ready">آماده</option>
                      <option value="delivered">تحویل داده شده</option>
                      <option value="cancelled">لغو شده</option>
                    </select>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

