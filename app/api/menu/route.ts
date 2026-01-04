import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'
import { MenuItem } from '@/lib/types'

export async function GET() {
  try {
    const items = db.prepare('SELECT * FROM menu_items ORDER BY created_at DESC').all() as MenuItem[]
    return NextResponse.json(items || [])
  } catch (error) {
    console.error('Error fetching menu items:', error)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { name, description, price, category, image, available = true } = data

    const result = db
      .prepare(
        'INSERT INTO menu_items (name, description, price, category, image, available) VALUES (?, ?, ?, ?, ?, ?)'
      )
      .run(name, description || null, price, category, image || null, available ? 1 : 0)

    const item = db.prepare('SELECT * FROM menu_items WHERE id = ?').get(result.lastInsertRowid) as MenuItem
    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create menu item' }, { status: 500 })
  }
}

