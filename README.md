# Campus Internship & Placement Management Portal

## Stack
- Frontend: React + Vite, TailwindCSS, React Router, React Hook Form, Yup, Recharts, Supabase JS.
- Backend: Django, Django REST Framework, ChatterBot, scikit-learn, Supabase Postgres.
- Infra: Supabase Auth/Realtime/Storage, Vercel (frontend), Supabase Edge Functions (proxy APIs), Render (Django services).

## Getting Started
1. Copy `.env.example` to `.env` in root and fill secrets.
2. Install frontend deps:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
3. Install backend deps:
   ```bash
   cd backend
   python -m venv .venv
   source .venv/bin/activate  # or .venv\Scripts\activate on Windows
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py seed_initial_data
   python manage.py runserver
   ```
4. Configure Supabase:
   - Create tables via SQL from `backend/api/models.py` (Django migrations target Supabase Postgres).
   - Enable Auth providers and create storage bucket `documents`.
   - Configure Realtime on internship, application, interview tables.

## Deployment Notes
- Frontend: `npm run build` then deploy to Vercel with `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
- Backend: Deploy Django service to Render, set environment variables, point database credentials to Supabase.
- Edge Functions: Use Supabase Edge Functions for lightweight proxy if needed; include service-role key server side only.

## TODO
- Complete business rules marked with `TODO`.
- Train chatbot with domain-specific corpora.
- Harden authentication/authorization and logging before production.
