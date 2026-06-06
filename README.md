# Product Discovery Learning Guide

A stunning single-page interactive learning guide for aspiring Product Managers. Built with React, Tailwind CSS, Supabase, and PostHog.

## ✨ Features

- **6 interactive sections** covering the full product discovery process
- **Animated stat cards** that count up on scroll
- **Expandable Q&A cards** with real-world examples
- **Interactive interview script comparisons** (Bad vs Good)
- **5 Whys builder** — type a problem, drill down visually
- **Problem Statement Builder** — fill-in-the-blank "How Might We" generator
- **Before/After mistake cards** with toggle switches
- **7-step discovery sprint checklist** with a completion badge
- **Sticky progress header** with 6 dots (one per section)
- **Supabase integration** for saving exercises and progress
- **PostHog analytics** for tracking learning engagement

---

## 🚀 Local Development

### 1. Clone & install

```bash
git clone <your-repo>
cd product-discovery
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
VITE_SUPABASE_URL=https://yourproject.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_POSTHOG_API_KEY=phc_your_key_here
VITE_POSTHOG_HOST=https://app.posthog.com
```

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🗄️ Supabase Setup

### Create the tables

Run these SQL commands in your Supabase SQL Editor:

```sql
-- Exercises table (Problem Statement Builder)
create table exercises (
  id uuid default gen_random_uuid() primary key,
  problem_statement text not null,
  created_at timestamptz default now()
);

-- Progress table (Checklist completions)
create table progress (
  id uuid default gen_random_uuid() primary key,
  user_session text not null,
  section text not null,
  completed boolean default true,
  created_at timestamptz default now()
);

-- Enable Row Level Security (optional but recommended)
alter table exercises enable row level security;
alter table progress enable row level security;

-- Allow anonymous inserts (adjust as needed)
create policy "Allow anonymous insert" on exercises
  for insert with check (true);

create policy "Allow anonymous insert" on progress
  for insert with check (true);
```

### Get your credentials

1. Go to your Supabase project → Settings → API
2. Copy the **Project URL** → `VITE_SUPABASE_URL`
3. Copy the **anon public key** → `VITE_SUPABASE_ANON_KEY`

---

## 📊 PostHog Setup

1. Create a free account at [posthog.com](https://posthog.com)
2. Create a new project
3. Copy your **Project API Key** → `VITE_POSTHOG_API_KEY`

### Events tracked

| Event | When |
|-------|------|
| `section_viewed` | User scrolls into a section |
| `exercise_submitted` | 5 Whys or Problem Statement saved |
| `checklist_completed` | All items checked (Section 3 or 6) |
| `discovery_badge_earned` | All 7 steps in Section 6 completed |

> **Note:** If no PostHog key is set, events are logged to the console instead of being sent.

---

## 🌐 Deploy to Vercel

### Option 1: Vercel CLI

```bash
npm i -g vercel
vercel
```

### Option 2: Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Add environment variables in the Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_POSTHOG_API_KEY`
   - `VITE_POSTHOG_HOST`
5. Click Deploy

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS 3 |
| Database | Supabase (PostgreSQL) |
| Analytics | PostHog |
| Fonts | DM Sans + Fraunces + DM Mono (Google Fonts) |
| Deploy | Vercel |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ProgressHeader.jsx   # Sticky 6-dot progress tracker
│   ├── Section1.jsx         # Why Discovery + stat cards
│   ├── Section2.jsx         # 4 Core Questions (expandable)
│   ├── Section3.jsx         # User interview scripts + checklist
│   ├── Section4.jsx         # 5 Whys + Problem Statement builder
│   ├── Section5.jsx         # Common mistakes (toggle cards)
│   └── Section6.jsx         # Discovery sprint checklist + badge
├── lib/
│   ├── analytics.js         # PostHog wrapper
│   ├── hooks.js             # useIntersection + useCountUp
│   └── supabaseClient.js    # Supabase client + helpers
├── App.jsx                  # Root component + scroll tracking
├── main.jsx                 # Entry point
└── index.css                # Tailwind + custom styles
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary purple | `#7C3AED` |
| Light purple bg | `#F5F3FF` |
| Background | `#FFFFFF` |
| Body font | DM Sans |
| Display font | Fraunces (italic for hero) |
| Mono font | DM Mono |

---

## 📄 License

MIT
