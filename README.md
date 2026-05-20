# Zenode Software — Portfolio Website

Premium full-stack portfolio and admin CMS for Zenode Software. Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, and Prisma.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 3 |
| Animations | Framer Motion 11 |
| Database | Prisma + SQLite (dev) / PostgreSQL (prod) |
| Auth | JWT via `jose` + `bcryptjs` |
| Validation | Zod + react-hook-form |
| UI | Lucide Icons, Sonner, next-themes |

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment

Create a `.env.local` file:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="change-this-to-a-long-random-secret-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Set Up Database

```bash
npx prisma db push
npm run db:seed
```

### 4. Start Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Admin Panel

| Field | Value |
|---|---|
| URL | `/admin/login` |
| Email | `admin@zenode.com` |
| Password | `Admin@2025!` |

> **Change the default admin password immediately after first login in production.**

---

## Available Routes

### Public

| Route | Description |
|---|---|
| `/` | Homepage (hero, stats, services, projects, testimonials, contact) |
| `/projects` | All published projects |
| `/projects/[slug]` | Individual project detail page |

### Admin (Protected)

| Route | Description |
|---|---|
| `/admin/login` | Admin login |
| `/admin/dashboard` | Stats overview + recent projects |
| `/admin/projects` | Project list with search, publish/feature toggles |
| `/admin/projects/new` | Create new project |
| `/admin/projects/[id]/edit` | Edit existing project |
| `/admin/messages` | Contact form submissions |

### API

| Endpoint | Method | Description |
|---|---|---|
| `/api/contact` | POST | Submit contact form |
| `/api/admin/auth/login` | POST | Admin login |
| `/api/admin/auth/logout` | POST | Admin logout |
| `/api/admin/projects` | GET / POST | List / create projects |
| `/api/admin/projects/[id]` | GET / PUT / PATCH / DELETE | Full project CRUD |

---

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Lint codebase
npm run db:push      # Push Prisma schema to database
npm run db:studio    # Open Prisma Studio GUI
npm run db:seed      # Seed database with initial data
```

---

## Project Structure

```
portfolio-z/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Database seeder
├── src/
│   ├── app/               # Next.js App Router pages & API routes
│   │   ├── admin/         # Admin panel pages
│   │   ├── api/           # API route handlers
│   │   ├── projects/      # Public project pages
│   │   ├── globals.css    # Global styles & CSS variables
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Homepage
│   ├── components/
│   │   ├── admin/         # Admin UI components
│   │   ├── layout/        # Navbar, Footer, Logo
│   │   ├── project/       # ProjectGallery lightbox
│   │   ├── providers/     # ThemeProvider
│   │   ├── sections/      # Homepage sections
│   │   └── ui/            # Reusable UI primitives
│   └── lib/
│       ├── auth.ts        # JWT auth helpers
│       ├── db.ts          # Prisma client singleton
│       ├── utils.ts       # Utility functions
│       └── validations.ts # Zod schemas
├── .env.local             # Local environment variables
├── next.config.ts         # Next.js config
├── tailwind.config.ts     # Tailwind config with Zenode brand tokens
└── tsconfig.json          # TypeScript config
```

---

## Deployment (Vercel)

1. Push your repository to GitHub/GitLab
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard:
   - `DATABASE_URL` — your production database URL (Neon, PlanetScale, Supabase, etc.)
   - `JWT_SECRET` — long random secret (min. 32 characters)
   - `NEXTAUTH_URL` — your production domain (e.g. `https://zenode.com`)
4. Run `npx prisma db push` against your production database before first deploy
5. Deploy

### Recommended Production Database

- **Neon** (serverless PostgreSQL) — free tier available
- Update `schema.prisma` provider from `sqlite` to `postgresql`
- Update `DATABASE_URL` to your Neon connection string

---

## Brand Tokens

| Token | Value |
|---|---|
| Primary Cyan | `#00D4FF` |
| Primary Teal | `#00B4CC` |
| Background | `#000000` |
| Foreground | `#FFFFFF` |

---

## Security Notes

- JWT tokens are `httpOnly` cookies (inaccessible to JavaScript)
- Tokens expire after 7 days
- All admin routes and API endpoints are protected by middleware
- Passwords are hashed with `bcryptjs` (salt rounds: 12)
- All form inputs validated server-side with Zod
- Change the default admin password and JWT secret before going to production
