import db from './db'

export function runMigrations() {
  try {
    // Customers table
    db.exec(`
      CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT,
        phone TEXT,
        address TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Menu items table
    db.exec(`
      CREATE TABLE IF NOT EXISTS menu_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price INTEGER NOT NULL,
        category TEXT NOT NULL,
        image TEXT,
        available BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Orders table
    db.exec(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_id INTEGER,
        total_amount INTEGER NOT NULL,
        status TEXT DEFAULT 'pending',
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (customer_id) REFERENCES customers(id)
      )
    `)

    // Order items table
    db.exec(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER NOT NULL,
        menu_item_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        price INTEGER NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
      )
    `)

    // Posts table
    db.exec(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT,
        image TEXT,
        published BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create indexes
    db.exec(`
      CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_id);
      CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
      CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
      CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category);
      CREATE INDEX IF NOT EXISTS idx_menu_items_available ON menu_items(available);
    `)

    console.log('✓ Database migrations completed successfully')
    return true
  } catch (error) {
    console.error('✗ Migration failed:', error)
    return false
  }
}

