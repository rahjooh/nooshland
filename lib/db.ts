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

// Import migrations
import { runMigrations } from './migrations'

// Initialize database schema on import
runMigrations()

export default db

