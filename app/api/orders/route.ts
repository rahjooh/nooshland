import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'
import { Order } from '@/lib/types'

export async function GET() {
  try {
    const orders = db
      .prepare(
        `SELECT o.*, c.name as customer_name, c.email, c.phone 
         FROM orders o 
         LEFT JOIN customers c ON o.customer_id = c.id 
         ORDER BY o.created_at DESC`
      )
      .all() as any[]

    // Get order items for each order
    const ordersWithItems = orders.map((order) => {
      const items = db
        .prepare(
          `SELECT oi.*, m.name as menu_item_name, m.image as menu_item_image 
           FROM order_items oi 
           JOIN menu_items m ON oi.menu_item_id = m.id 
           WHERE oi.order_id = ?`
        )
        .all(order.id)
      return { ...order, items }
    })

    return NextResponse.json(ordersWithItems || [])
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { customer_id, items, total_amount, notes, status = 'pending' } = data

    // Start transaction
    const insertOrder = db.transaction(() => {
      const orderResult = db
        .prepare('INSERT INTO orders (customer_id, total_amount, status, notes) VALUES (?, ?, ?, ?)')
        .run(customer_id || null, total_amount, status, notes || null)

      const orderId = orderResult.lastInsertRowid as number

      // Insert order items
      const insertItem = db.prepare(
        'INSERT INTO order_items (order_id, menu_item_id, quantity, price) VALUES (?, ?, ?, ?)'
      )
      for (const item of items) {
        insertItem.run(orderId, item.menu_item_id, item.quantity, item.price)
      }

      return orderId
    })

    const orderId = insertOrder()
    const order = db
      .prepare(
        `SELECT o.*, c.name as customer_name 
         FROM orders o 
         LEFT JOIN customers c ON o.customer_id = c.id 
         WHERE o.id = ?`
      )
      .get(orderId) as Order

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}

