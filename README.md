# Campus Internship & Placement Management Portal

Modern campus hiring platform built with React, Tailwind CSS, and Supabase. The legacy Django backend is retained for reference but no longer required.

## 🧱 Tech Stack
- **Frontend**: React (Vite + TypeScript), React Router, Framer Motion, Lucide Icons
- **Styling**: Tailwind CSS with glassmorphism utilities
- **Data Layer**: Supabase Auth + Supabase Postgres (SQL, Row Level Security, realtime)

## ⚙️ Prerequisites
- Node.js 18+
- Supabase project (free tier works)
- Supabase CLI (optional but recommended): <https://supabase.com/docs/guides/cli>

## 🚀 Getting Started
1. **Environment variables**
   - Copy `frontend/.env.local` and fill in your project credentials:
     ```bash
     VITE_SUPABASE_URL=<your_supabase_project_url>
     VITE_SUPABASE_ANON_KEY=<your_supabase_anon_key>
     ```
   - Keep service-role keys on the server only (never commit them).

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Provision the Supabase schema**
   ```bash
   # from the repository root
   supabase db push --file supabase/schema.sql
   supabase db seed --file supabase/seed.sql
   ```
   This sets up the `dashboard_stats` and `placement_drives` tables used by the dashboards, with Row Level Security policies for authenticated users.

4. **Run the frontend**
   ```bash
   npm run dev
   ```
   Visit the URL shown in the terminal (usually <http://localhost:5173>).

## 🗃️ Supabase Tables
- **dashboard_stats**: Aggregated metrics per user role (`student`, `mentor`, `employer`, `placement`, `admin`).
  - Columns: `label`, `value_numeric`, `value_text`, `delta`, `trend`
  - CRUD helpers exposed via `SupabaseDataService`.
- **placement_drives**: Upcoming placement drive schedule with optional location/notes.
  - Columns: `company`, `stage`, `drive_date`, `location`, `notes`
  - Fully managed through `SupabaseDataService` (create/update/delete).

## 🧪 Useful Scripts
- `npm run dev` – start the development server
- `npm run build` – type-check and create a production build

## 📄 Notes
- Dashboards fall back to seeded demo data if Supabase credentials are missing, so the UI stays functional during setup.
- The backend directory can be removed once you migrate completely to the Supabase-first workflow.
