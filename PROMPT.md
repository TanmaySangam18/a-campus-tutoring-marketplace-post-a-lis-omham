Implement a small but REAL, working full-stack web app in this Next.js (App Router, TypeScript) project for:

a campus tutoring marketplace: post a listing, browse tutors, book a slot — with a real backend

Requirements:
- A polished UI in app/page.tsx (a client component) with the core create/list/delete flow.
- A REAL backend API route at app/api/items/route.ts (GET + POST) — no mock data.
- Persist data. If SUPABASE_URL + SUPABASE_ANON_KEY env vars exist use Supabase; otherwise use an
  in-memory store in the route so it runs with zero config. Keep it typed and simple.
- Clean, responsive, no console errors. It must build with `next build` and run on Vercel.
- CODE MUST COMPILE: correct TypeScript types (no `any`-that-breaks), no unused imports/vars, only
  stable Next.js 16 App Router APIs. Prefer simple, standard patterns over clever ones.