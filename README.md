# Tanveer Portfolio OS

A production-grade, API-first, admin-controlled portfolio platform that behaves like a SaaS product, developer sandbox, and recruiter intelligence system.

![Portfolio OS](https://img.shields.io/badge/Portfolio-OS-0B3A45?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss)

## 🎯 System Vision

This is NOT just a portfolio. This is a **Portfolio Operating System** with:

1. **Public portfolio** (conversion optimized)
2. **Admin control center** (full CRUD)
3. **API layer** (external access)
4. **Webhook engine** (real-time integrations)
5. **Custom tab builder** (user-defined modules)
6. **Recruiter analytics engine**
7. **AI content generator** (placeholder for future)

Everything is modular, editable, and API-accessible.

## 🏗️ Tech Stack

### Frontend
- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS + ShadCN UI**
- **Framer Motion** (animations)
- **GSAP + ScrollTrigger** (scroll animations)
- **Recharts** (data visualization)

### Backend
- **Vite** (build tool)
- **PostgreSQL** (database)
- **Prisma ORM** (database schema)

### Authentication
- Custom auth system (easily swappable with NextAuth/Clerk)

### Infrastructure
- **Vercel** (frontend deployment)
- **Supabase/Railway** (database)
- **Cloudinary** (media - optional)

## 📦 Core System Modules

### 🔹 1. Public Experience Layer
- Hero (dynamic, animated)
- About (editable)
- Experience Timeline (impact-based)
- Projects (case studies + media)
- Skills Matrix (interactive)
- Tools & Tech visualization
- Certifications
- Blog / Insights
- Contact system
- Resume generator (dynamic PDF)

### 🔐 2. Admin Control Panel
Admin can:
- Edit personal details (name, contact, links)
- Add/edit/delete: Experience, Projects, Skills, Tools, Certifications, Blogs
- Upload images, PDFs
- Toggle visibility of sections
- Create custom tabs dynamically
- Manage API keys & webhooks
- View analytics dashboard

**NO developer dependency required.**

### 🧩 3. Custom Tab Builder
Admin can create new tabs dynamically:
- "Live Projects"
- "API Playground"
- "Case Studies"
- "Experiments"

Each tab supports:
- Custom title
- Rich text / markdown
- Embedded APIs
- External links
- Media (images/videos)
- Dynamic widgets

### 🔗 4. API Layer
Secure REST APIs:
- `GET /api/profile`
- `GET /api/experience`
- `GET /api/projects`
- `GET /api/skills`
- `GET /api/tools`
- `GET /api/blogs`

Features:
- GET (public)
- POST/PUT/DELETE (admin only)
- API key authentication
- Rate limiting

### ⚡ 5. Webhook Engine
External triggers for:
- New contact form submission
- Project added/updated
- Resume downloaded
- Recruiter visit detected

### 📊 6. Recruiter Analytics Engine
Tracks:
- Page visits
- Section engagement
- Most viewed projects
- Resume downloads

Dashboard with graphs + insights.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL (or use mock data for demo)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/tanveer-portfolio-os.git
cd tanveer-portfolio-os

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run database migrations (if using real DB)
npm run db:migrate

# Seed the database
npm run db:seed

# Start development server
npm run dev
```

### Access Points
- **Portfolio**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/admin.html


## 📁 Project Structure

```
├── prisma/                 # Database schema
│   ├── schema.prisma      # Prisma schema
│   └── seed.ts            # Database seeding
├── src/
│   ├── admin/             # Admin panel
│   │   ├── AdminApp.tsx   # Main admin component
│   │   └── sections/      # Admin sections
│   ├── components/        # Shared components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilities & API
│   ├── sections/          # Portfolio sections
│   ├── types/             # TypeScript types
│   ├── App.tsx            # Main app
│   ├── admin.tsx          # Admin entry
│   └── main.tsx           # Portfolio entry
├── public/                # Static assets
├── index.html             # Portfolio HTML
├── admin.html             # Admin HTML
└── package.json
```

## 🎨 Design System

### Colors
- **Primary Background**: `#0B3A45` (Deep Teal)
- **Secondary Background**: `#082D36` (Darker Teal)
- **Accent**: `#F6C76D` (Warm Amber)
- **Text Primary**: `#F3F7F8` (Near White)
- **Text Secondary**: `#A9BDC2` (Muted Teal-Grey)

### Typography
- **Headings**: Space Grotesk
- **Body**: Inter
- **Labels**: IBM Plex Mono

### Animations
- Page transitions (smooth)
- Scroll reveal animations
- Hover effects (cards, buttons)
- Tab transitions
- Parallax hero section

## 🔧 Configuration

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/tanveer_portfolio"

# Authentication
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:5173"

# Admin Credentials
ADMIN_EMAIL="tanveerbakshii@gmail.com"
ADMIN_PASSWORD="your-secure-password"

# Cloudinary (optional)
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

# Analytics (optional)
POSTHOG_KEY=""
POSTHOG_HOST=""
```

## 📊 Database Schema

### Core Tables
- `users` - Admin users
- `profile` - Portfolio profile data
- `experience` - Work history
- `projects` - Project case studies
- `skills` - Skills with categories
- `tools` - Tools & technologies
- `certifications` - Professional certifications
- `blogs` - Blog posts/insights
- `custom_tabs` - Dynamic custom tabs
- `media` - Uploaded media files
- `messages` - Contact form submissions
- `api_keys` - API authentication keys
- `webhooks` - Webhook configurations
- `analytics` - Page view analytics
- `testimonials` - Client testimonials
- `education` - Educational background

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Manual Build

```bash
# Build for production
npm run build

# Preview build
npm run preview
```

## 🔐 Security Features

- JWT/session authentication
- Input validation (Zod)
- Rate limiting (configurable)
- XSS/CSRF protection
- Secure password hashing (bcrypt)

## 📈 Future Enhancements

- [ ] AI content generator
- [ ] Multi-language support
- [ ] Dark/light mode toggle
- [ ] Advanced analytics with heatmaps
- [ ] Resume PDF auto-generator
- [ ] Social media integration
- [ ] Newsletter subscription
- [ ] Real-time notifications

## 📝 License

MIT License - feel free to use this as a template for your own portfolio!

## 🙏 Credits

- Design inspired by modern healthcare SaaS dashboards
- Icons by [Lucide](https://lucide.dev)
- UI Components by [ShadCN](https://ui.shadcn.com)

---

**Built with ❤️ by Tanveer Bakshi**
