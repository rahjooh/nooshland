import db from './db'
import { runMigrations } from './migrations'

export function seedDatabase() {
  try {
    // Run migrations first
    runMigrations()

    // Check if menu items already exist
    try {
      const existingItems = db.prepare('SELECT COUNT(*) as count FROM menu_items').get() as { count: number }
      
      if (existingItems.count > 0) {
        console.log('✓ Database already seeded, skipping...')
        return true
      }
    } catch (error) {
      // Table might not exist yet, continue with seeding
      console.log('Tables not found, will be created during migration')
    }

    // Seed menu items with nature/flower shop cafe theme
    const menuItems = [
      {
        name: 'قهوه اسپرسو',
        description: 'قهوه ایتالیایی خالص با طعم غنی و خامه‌ای',
        price: 35000,
        category: 'کافه',
        image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop',
        available: true
      },
      {
        name: 'کاپوچینو',
        description: 'قهوه با فوم شیر و پودر کاکائو',
        price: 42000,
        category: 'کافه',
        image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop',
        available: true
      },
      {
        name: 'لاته',
        description: 'قهوه با شیر گرم و طعم ملایم',
        price: 45000,
        category: 'کافه',
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop',
        available: true
      },
      {
        name: 'چای سبز',
        description: 'چای سبز طبیعی با برگ‌های تازه',
        price: 25000,
        category: 'نوشیدنی',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop',
        available: true
      },
      {
        name: 'آبمیوه طبیعی',
        description: 'آبمیوه تازه با میوه‌های طبیعی',
        price: 30000,
        category: 'نوشیدنی',
        image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop',
        available: true
      },
      {
        name: 'سالاد گل و گیاه',
        description: 'سالاد تازه با سبزیجات و گل‌های خوراکی',
        price: 55000,
        category: 'فست فود',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
        available: true
      },
      {
        name: 'ساندویچ مرغ',
        description: 'ساندویچ مرغ با سبزیجات تازه',
        price: 65000,
        category: 'فست فود',
        image: 'https://images.unsplash.com/photo-1528735602780-2552fd46e7fb?w=400&h=300&fit=crop',
        available: true
      },
      {
        name: 'کیک شکلاتی',
        description: 'کیک شکلاتی با تزئینات گل',
        price: 45000,
        category: 'دسر',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
        available: true
      },
      {
        name: 'چیزکیک',
        description: 'چیزکیک خامه‌ای با توت فرنگی',
        price: 50000,
        category: 'دسر',
        image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=400&h=300&fit=crop',
        available: true
      },
      {
        name: 'بستنی وانیلی',
        description: 'بستنی وانیلی با تزئینات گل',
        price: 35000,
        category: 'دسر',
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop',
        available: true
      },
      {
        name: 'گل رز خشک شده',
        description: 'گل رز خشک شده برای تزئین و دکور',
        price: 120000,
        category: 'گل و گیاه',
        image: 'https://images.unsplash.com/photo-1518621012428-8ae0c5d5c0e5?w=400&h=300&fit=crop',
        available: true
      },
      {
        name: 'گلدان کوچک',
        description: 'گلدان کوچک با گیاهان زینتی',
        price: 150000,
        category: 'گل و گیاه',
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
        available: true
      }
    ]

    const insertItem = db.prepare(
      'INSERT INTO menu_items (name, description, price, category, image, available) VALUES (?, ?, ?, ?, ?, ?)'
    )

    const insertMany = db.transaction((items) => {
      for (const item of items) {
        insertItem.run(
          item.name,
          item.description,
          item.price,
          item.category,
          item.image,
          item.available ? 1 : 0
        )
      }
    })

    insertMany(menuItems)

    // Seed sample posts
    const posts = [
      {
        title: 'به کافه گل‌های زیبا خوش آمدید',
        content: 'کافه گل‌های زیبا مکانی است که در آن می‌توانید از نوشیدنی‌های خوشمزه در محیطی پر از گل و گیاه لذت ببرید. ما با استفاده از بهترین مواد اولیه و در فضایی آرامش‌بخش، تجربه‌ای منحصر به فرد برای شما فراهم می‌کنیم.',
        image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=400&fit=crop',
        published: true
      },
      {
        title: 'منوی جدید بهار',
        content: 'منوی جدید بهاری ما با نوشیدنی‌ها و غذاهای تازه آماده شده است. از نوشیدنی‌های خنک تابستانی تا دسرهای خوشمزه، همه چیز برای لذت بردن شما آماده است.',
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=400&fit=crop',
        published: true
      }
    ]

    const insertPost = db.prepare(
      'INSERT INTO posts (title, content, image, published) VALUES (?, ?, ?, ?)'
    )

    const insertPosts = db.transaction((posts) => {
      for (const post of posts) {
        insertPost.run(post.title, post.content, post.image, post.published ? 1 : 0)
      }
    })

    insertPosts(posts)

    console.log('✓ Database seeded successfully')
    console.log(`  - ${menuItems.length} menu items added`)
    console.log(`  - ${posts.length} posts added`)
    return true
  } catch (error) {
    console.error('✗ Seeding failed:', error)
    return false
  }
}

