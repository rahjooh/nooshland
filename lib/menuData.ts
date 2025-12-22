export interface MenuItem {
  id: number
  name: string
  price: number
  category: string
  description: string
  image: string
}

export const menuItems: MenuItem[] = [
  { id: 1, name: 'اسپرسو ویژه', price: 35000, category: 'کافه', description: 'قهوه ایتالیایی با طعم غنی و خامه‌ای', image: 'https://picsum.photos/id/1/400/300' },
  { id: 2, name: 'برگر لوکس', price: 85000, category: 'فست فود', description: 'برگر تازه با گوشت گوساله و سبزیجات تازه', image: 'https://picsum.photos/id/5/400/300' },
  { id: 3, name: 'کاپوچینو کریسمس', price: 45000, category: 'کافه', description: 'قهوه با فوم شیر و کاکائو و تزئینات ویژه', image: 'https://picsum.photos/id/2/400/300' },
  { id: 4, name: 'پاستا آلفردو', price: 95000, category: 'فست فود', description: 'پاستا با سس خامه‌ای و پنیر پارمیژان', image: 'https://picsum.photos/id/8/400/300' },
  { id: 5, name: 'لاته آرتیستیک', price: 42000, category: 'کافه', description: 'قهوه با شیر گرم و نقش‌های هنری روی فوم', image: 'https://picsum.photos/id/3/400/300' },
  { id: 6, name: 'ساندویچ مرغ ویژه', price: 65000, category: 'فست فود', description: 'ساندویچ مرغ با سبزیجات تازه و سس مخصوص', image: 'https://picsum.photos/id/7/400/300' }
]


