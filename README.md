# VYRON® — Digital Growth Studio

A multidisciplinary digital growth studio website — technology, design, content, performance marketing, automation and intelligence in one connected system. Engineered in Bengaluru for category-defining Indian brands and fast-scaling global ventures.

---

## 🚀 Tech Stack

- **Frontend**: React 19, TypeScript, Vite 7
- **Styling**: Tailwind CSS v4
- **Motion & Interaction**: Framer Motion, GSAP (ScrollTrigger), Lenis smooth scroll
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Backend / API**: Vercel Serverless Functions (`/api/*`), Supabase (PostgreSQL)
- **Icons**: Lucide React

---

## 🛠️ Getting Started

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd Digimarket
npm install
```

### 2. Environment Variables

Copy the `.env.example` to `.env`:

```bash
cp .env.example .env
```

Ensure your Supabase project credentials are configured:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧪 Quality & Validation

Verify type safety and linting:

```bash
# TypeScript Typecheck
npx tsc --noEmit

# ESLint Check
npm run lint

# Production Build
npm run build
```

---

## 🌐 Deploying to Vercel

This repository is pre-configured and 100% ready for zero-config deployment on Vercel:

1. Push your repository to **GitHub**.
2. Go to **[vercel.com](https://vercel.com)** and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset will be automatically detected as **Vite**.
5. Add the Environment Variables (from your `.env`) in the Vercel Project Settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Click **Deploy**.

> **Note**: The `/api/*` directory contains native Node.js Serverless Functions for inquiries and catalog data. Vercel automatically deploys these alongside the static client bundle defined in `vercel.json`.
