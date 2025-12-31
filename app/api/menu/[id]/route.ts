import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'
import { MenuItem } from '@/lib/types'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const item = db.prepare('SELECT * FROM menu_items WHERE id = ?').get(parseInt(params.id)) as MenuItem | undefined
    if (!item) {
      return NextResponse.json({ error: 'Menu item not found' }, { status: 404 })
    }
    return NextResponse.json(item)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch menu item' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const { name, description, price, category, image, available } = data

    db.prepare(
      'UPDATE menu_items SET name = ?, description = ?, price = ?, category = ?, image = ?, available = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    ).run(name, description || null, price, category, image || null, available ? 1 : 0, parseInt(params.id))

    const item = db.prepare('SELECT * FROM menu_items WHERE id = ?').get(parseInt(params.id)) as MenuItem
    return NextResponse.json(item)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update menu item' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    db.prepare('DELETE FROM menu_items WHERE id = ?').run(parseInt(params.id))
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete menu item' }, { status: 500 })
  }
}

