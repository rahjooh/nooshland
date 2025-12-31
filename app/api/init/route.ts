import { NextResponse } from 'next/server'
import { seedDatabase } from '@/lib/seed'

// This endpoint can be called to seed the database
// It's safe to call multiple times - it won't duplicate data
export async function POST() {
  try {
    const success = seedDatabase()
    if (success) {
      return NextResponse.json({ message: 'Database seeded successfully' })
    } else {
      return NextResponse.json({ error: 'Database seeding failed' }, { status: 500 })
    }
  } catch (error) {
    console.error('Seeding error:', error)
    return NextResponse.json({ error: 'Database seeding failed' }, { status: 500 })
  }
}

export async function GET() {
  // Allow GET for easy browser access
  return POST()
}

