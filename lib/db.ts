import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data')
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

const dbPath = path.join(dataDir, 'nooshland.db')
const db = new Database(dbPath)

// Enable foreign keys
db.pragma('foreign_keys = ON')

// Initialize database schema (import after db is created to avoid circular dependency)
// We'll use a function that can be called after import
export function initializeDatabase() {
  try {
    const { runMigrations } = require('./migrations')
    runMigrations(db)
  } catch (error) {
    console.error('Failed to run migrations:', error)
  }
}

// Auto-initialize on import (but handle errors gracefully)
try {
  initializeDatabase()
} catch (error) {
  // Migration will be retried on first API call if needed
  console.error('Initial migration attempt failed, will retry on first use:', error)
}

export default db

