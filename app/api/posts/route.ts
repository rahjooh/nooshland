import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'
import { Post } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const published = searchParams.get('published')

    let query = 'SELECT * FROM posts'
    let params: any[] = []

    if (published === 'true') {
      query += ' WHERE published = 1'
    }

    query += ' ORDER BY created_at DESC'

    const posts = db.prepare(query).all(...params) as Post[]
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { title, content, image, published = false } = data

    const result = db
      .prepare('INSERT INTO posts (title, content, image, published) VALUES (?, ?, ?, ?)')
      .run(title, content || null, image || null, published ? 1 : 0)

    const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(result.lastInsertRowid) as Post
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}

