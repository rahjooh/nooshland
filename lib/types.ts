export interface Customer {
  id: number
  name: string
  email?: string
  phone?: string
  address?: string
  created_at: string
}

export interface MenuItem {
  id: number
  name: string
  description?: string
  price: number
  category: string
  image?: string
  available: boolean
  created_at: string
  updated_at: string
}

export interface Order {
  id: number
  customer_id?: number
  total_amount: number
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
  notes?: string
  created_at: string
  updated_at: string
  customer?: Customer
  items?: OrderItem[]
}

export interface OrderItem {
  id: number
  order_id: number
  menu_item_id: number
  quantity: number
  price: number
  menu_item?: MenuItem
}

export interface Post {
  id: number
  title: string
  content?: string
  image?: string
  published: boolean
  created_at: string
  updated_at: string
}

