import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'
import { Customer } from '@/lib/types'

export async function GET() {
  try {
    const customers = db.prepare('SELECT * FROM customers ORDER BY created_at DESC').all() as Customer[]
    return NextResponse.json(customers)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { name, email, phone, address } = data

    const result = db
      .prepare('INSERT INTO customers (name, email, phone, address) VALUES (?, ?, ?, ?)')
      .run(name, email || null, phone || null, address || null)

    const customer = db.prepare('SELECT * FROM customers WHERE id = ?').get(result.lastInsertRowid) as Customer
    return NextResponse.json(customer, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 })
  }
}

