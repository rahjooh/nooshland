# کافه لوکس - Next.js Project

یک وب‌سایت مدرن برای کافه و رستوران با استفاده از Next.js، React، و Tailwind CSS.

## ویژگی‌ها

- ✨ طراحی مدرن و واکنش‌گرا
- 🎨 انیمیشن‌های زیبا با Framer Motion
- 📱 سازگار با موبایل
- 🚀 بهینه‌سازی شده برای SEO
- 🎯 صفحات مختلف: خانه، کافه، فست فود، درباره ما، تماس با ما
- 🔐 پنل مدیریت برای مدیریت منو

## نصب و راه‌اندازی

1. نصب وابستگی‌ها:
```bash
npm install
```

2. اجرای پروژه در حالت توسعه:
```bash
npm run dev
```

3. باز کردن مرورگر و رفتن به:
```
http://localhost:3000
```

## ساخت پروژه

برای ساخت نسخه production:

```bash
npm run build
npm start
```

## ساختار پروژه

```
├── app/                  # صفحات Next.js (App Router)
│   ├── page.tsx         # صفحه اصلی
│   ├── cafe/            # صفحه منوی کافه
│   ├── fastfood/        # صفحه منوی فست فود
│   ├── about/           # صفحه درباره ما
│   ├── contact/         # صفحه تماس با ما
│   ├── admin/           # پنل مدیریت
│   ├── layout.tsx       # Layout اصلی
│   └── globals.css      # استایل‌های全局
├── components/          # کامپوننت‌های React
│   ├── Navigation.tsx   # نوار ناوبری
│   ├── Footer.tsx       # فوتر
│   ├── MenuItem.tsx     # آیتم منو
│   └── AnimatedSection.tsx
├── hooks/               # Custom Hooks
│   └── useIntersectionObserver.ts
└── lib/                 # فایل‌های کمکی
    └── menuData.ts      # داده‌های منو
```

## تکنولوژی‌های استفاده شده

- **Next.js 14** - فریمورک React
- **React 18** - کتابخانه UI
- **TypeScript** - تایپ‌های استاتیک
- **Tailwind CSS** - استایل‌دهی
- **Framer Motion** - انیمیشن‌ها

## پنل مدیریت

برای دسترسی به پنل مدیریت:
1. کلیک روی دکمه "ادمین" در نوار ناوبری
2. رمز عبور: `admin123`

## نکات مهم

- پروژه از RTL (راست به چپ) برای زبان فارسی پشتیبانی می‌کند
- تصاویر از Picsum Photos استفاده می‌کنند (برای تست)
- در production، باید تصاویر واقعی را جایگزین کنید


