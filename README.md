# Nooshland Cafe - کافه گل‌های زیبا

A beautiful, nature-themed cafe and restaurant website with a comprehensive admin panel for managing menu items, orders, customers, and blog posts.

## Features

- 🌿 **Nature-themed Design**: Minimal white design with nature imagery (trees, leaves, flowers)
- 📱 **Responsive**: Works perfectly on all devices
- 🗄️ **SQLite Database**: Lightweight database for menu items, orders, customers, and posts
- 👨‍💼 **Admin Panel**: Full-featured admin panel for content management
- 🎨 **Modern UI**: Built with Next.js 14, React, and Tailwind CSS
- ⚡ **Fast**: Optimized for performance

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite (better-sqlite3)
- **Animations**: Framer Motion
- **Deployment**: PM2 on Ubuntu server

## Getting Started

### Prerequisites

- Node.js 20.x
- npm or yarn
- SQLite3 (usually pre-installed on most systems)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nooshland.com
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or using Makefile
   make install
   ```

3. **Initialize the database**
   ```bash
   npm run db:init
   # or using Makefile
   make db-init
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or using Makefile
   make dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Quick Start with Makefile

```bash
# Full setup (install + database init + start dev server)
make quick-start

# Or step by step
make install
make db-init
make dev
```

## Available Scripts

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Database
- `npm run db:init` - Initialize database (migrate + seed)
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data

### Makefile Commands
- `make help` - Show all available commands
- `make install` - Install dependencies
- `make dev` - Start development server
- `make build` - Build for production
- `make db-init` - Initialize database
- `make db-migrate` - Run migrations
- `make db-seed` - Seed database
- `make clean` - Clean build artifacts

## Admin Panel

### Access
Navigate to `/admin` in your browser

### Default Credentials
- **Password**: `admin123`

⚠️ **Important**: Change the default password in production!

### Documentation
See [docs/ADMIN_PANEL.md](./docs/ADMIN_PANEL.md) for detailed admin panel documentation.

## Project Structure

```
nooshland.com/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   ├── cafe/              # Menu page
│   └── page.tsx           # Homepage
├── components/            # React components
├── lib/                   # Utilities and database
│   ├── db.ts             # Database connection
│   ├── migrations.ts     # Database migrations
│   ├── seed.ts           # Database seeding
│   └── types.ts          # TypeScript types
├── scripts/              # Utility scripts
│   └── init-db.ts        # Database initialization
├── data/                  # Database files (gitignored)
├── docs/                  # Documentation
├── .github/              # GitHub Actions workflows
└── Makefile              # Makefile for common tasks
```

## Database Schema

### Tables
- **customers**: Customer information
- **menu_items**: Menu items with categories and prices
- **orders**: Order management
- **order_items**: Order line items
- **posts**: Blog/news posts

See `lib/migrations.ts` for full schema details.

## Deployment

### Prerequisites
- Ubuntu server
- Node.js 20.x
- PM2
- Nginx
- SQLite3

### GitHub Actions
The project includes a GitHub Actions workflow for automated deployment. See `.github/workflows/deploy.yml` for details.

### Manual Deployment
1. Build the project: `npm run build`
2. Start with PM2: `pm2 start npm --name "nooshland" -- start`
3. Configure Nginx to proxy to port 3005

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Environment Variables

No environment variables are currently required. The database is stored locally in the `data/` directory.

## Image Hosting

The application supports image URLs from:
- Unsplash
- Picsum
- Any publicly accessible image hosting service

For production, consider using:
- Cloudinary
- AWS S3
- Your own CDN

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

Private project - All rights reserved

## Support

For issues or questions, please contact the development team.

---

**Built with ❤️ for Nooshland Cafe**
