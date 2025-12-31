import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'
import { Post } from '@/lib/types'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(parseInt(params.id)) as Post | undefined
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }
    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const { title, content, image, published } = data

    db.prepare(
      'UPDATE posts SET title = ?, content = ?, image = ?, published = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    ).run(title, content || null, image || null, published ? 1 : 0, parseInt(params.id))

    const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(parseInt(params.id)) as Post
    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    db.prepare('DELETE FROM posts WHERE id = ?').run(parseInt(params.id))
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
  }
}

