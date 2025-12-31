# Admin Panel Documentation

## Overview

The Nooshland Cafe admin panel provides a comprehensive management system for menu items, orders, customers, and blog posts. This document provides detailed instructions for accessing and using the admin panel.

## Accessing the Admin Panel

### URL
Navigate to: `https://nooshland.ir/admin` (or `http://localhost:3000/admin` in development)

### Login Credentials

**Default Password:** `admin123`

⚠️ **Security Note:** Change the default password in production by modifying the password check in `/app/admin/page.tsx`.

### Login Process

1. Open the admin panel URL in your browser
2. You will see a login screen with a nature-themed design
3. Enter the password: `admin123`
4. Click the "ورود" (Login) button
5. You will be redirected to the admin dashboard

## Dashboard Overview

The admin dashboard provides:
- **Statistics Cards**: Quick overview of menu items, orders, customers, and posts
- **Quick Actions**: Fast access to common tasks
- **Navigation**: Links to all management sections

## Menu Management

### Access
Navigate to: `/admin/menu` or click "آیتم‌های منو" from the dashboard

### Features

#### Adding a New Menu Item

1. Fill in the form on the left side:
   - **نام** (Name): Item name (required)
   - **قیمت** (Price): Price in Tomans (required)
   - **دسته‌بندی** (Category): Select from:
     - کافه (Cafe)
     - فست فود (Fast Food)
     - دسر (Dessert)
     - نوشیدنی (Drinks)
     - گل و گیاه (Flowers & Plants)
   - **توضیحات** (Description): Optional description
   - **لینک تصویر** (Image URL): URL to the item image
   - **در دسترس** (Available): Checkbox to mark item as available

2. Click "افزودن" (Add) button

#### Editing a Menu Item

1. Find the item in the list on the right
2. Click the edit icon (pencil) next to the item
3. The form will populate with the item's current data
4. Make your changes
5. Click "ویرایش" (Edit) to save

#### Deleting a Menu Item

1. Find the item in the list
2. Click the delete icon (trash) next to the item
3. Confirm the deletion in the popup dialog

#### Image Recommendations

For best results, use images with:
- **Aspect Ratio**: 4:3 or 16:9
- **Resolution**: At least 400x300 pixels
- **Format**: JPG or PNG
- **Size**: Optimized for web (under 500KB)

**Image Sources:**
- Unsplash: `https://images.unsplash.com/photo-[ID]?w=400&h=300&fit=crop`
- Picsum: `https://picsum.photos/400/300`
- Your own image hosting service

## Order Management

### Access
Navigate to: `/admin/orders` or click "سفارش‌ها" from the dashboard

### Features

#### Viewing Orders

- All orders are displayed in a list
- Each order shows:
  - Order ID
  - Customer name (if available)
  - Phone number
  - Order date
  - Total amount
  - Current status
  - Order items with quantities and prices

#### Updating Order Status

1. Find the order in the list
2. Use the status dropdown to change the order status:
   - **در انتظار** (Pending): New order, awaiting confirmation
   - **تایید شده** (Confirmed): Order confirmed
   - **در حال آماده‌سازی** (Preparing): Order being prepared
   - **آماده** (Ready): Order ready for pickup/delivery
   - **تحویل داده شده** (Delivered): Order completed
   - **لغو شده** (Cancelled): Order cancelled

3. The status updates automatically

## Customer Management

### Access
Navigate to: `/admin/customers` or click "مشتریان" from the dashboard

### Features

#### Viewing Customers

- All registered customers are displayed in a table
- Information shown:
  - Name
  - Email
  - Phone number
  - Address
  - Registration date

**Note:** Customers are automatically created when they place orders. Manual customer creation is not currently available through the admin panel.

## Post Management

### Access
Navigate to: `/admin/posts` or click "پست‌ها" from the dashboard

### Features

#### Creating a New Post

1. Fill in the form on the left:
   - **عنوان** (Title): Post title (required)
   - **محتوا** (Content): Post content/body text
   - **لینک تصویر** (Image URL): URL to the post image
   - **منتشر شده** (Published): Checkbox to publish immediately

2. Click "افزودن" (Add)

#### Editing a Post

1. Find the post in the list
2. Click the edit icon
3. Modify the content
4. Click "ویرایش" (Edit) to save

#### Publishing/Unpublishing

- Check "منتشر شده" to publish the post
- Uncheck to save as draft
- Published posts appear on the homepage

#### Deleting a Post

1. Find the post in the list
2. Click the delete icon
3. Confirm deletion

## Best Practices

### Menu Items
- Use high-quality images for better presentation
- Keep descriptions concise but informative
- Regularly update prices
- Mark items as unavailable when out of stock

### Orders
- Update order status promptly
- Check customer contact information for delivery orders
- Review order notes for special instructions

### Posts
- Write engaging titles
- Include relevant images
- Keep content fresh and updated
- Use posts to announce special offers or events

## Troubleshooting

### Cannot Login
- Verify you're using the correct password: `admin123`
- Check browser console for errors
- Clear browser cache and cookies
- Try incognito/private browsing mode

### Images Not Loading
- Verify image URLs are accessible
- Check that URLs use HTTPS (required for production)
- Ensure images are publicly accessible (not behind authentication)

### Database Errors
- Database is automatically initialized on first use
- If issues persist, run: `npm run db:init`
- Check that SQLite is installed on the server

### Changes Not Saving
- Check browser console for errors
- Verify you're connected to the internet
- Try refreshing the page
- Check server logs for API errors

## Security Recommendations

1. **Change Default Password**: Update the password in `/app/admin/page.tsx`
2. **Use HTTPS**: Always access admin panel over HTTPS in production
3. **Regular Backups**: Backup the database file regularly (`data/nooshland.db`)
4. **Limit Access**: Restrict admin panel access by IP if possible
5. **Monitor Logs**: Regularly check for suspicious activity

## Support

For issues or questions:
- Check the main README.md
- Review server logs
- Contact the development team

---

**Last Updated:** 2024
**Version:** 1.0.0

