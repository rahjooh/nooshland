import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const { status } = data

    db.prepare('UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(
      status,
      parseInt(params.id)
    )

    const order = db
      .prepare(
        `SELECT o.*, c.name as customer_name 
         FROM orders o 
         LEFT JOIN customers c ON o.customer_id = c.id 
         WHERE o.id = ?`
      )
      .get(parseInt(params.id))

    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}

