#!/usr/bin/env node

import db from '../lib/db'
import { runMigrations } from '../lib/migrations'
import { seedDatabase } from '../lib/seed'

async function initDatabase() {
  console.log('Initializing database...')
  
  try {
    // Run migrations (pass db instance)
    const migrationSuccess = runMigrations(db)
    if (!migrationSuccess) {
      console.error('Migration failed')
      process.exit(1)
    }

    // Seed database
    const seedSuccess = seedDatabase()
    if (!seedSuccess) {
      console.error('Seeding failed')
      process.exit(1)
    }

    console.log('✓ Database initialization completed successfully')
    process.exit(0)
  } catch (error) {
    console.error('✗ Database initialization failed:', error)
    process.exit(1)
  }
}

initDatabase()

