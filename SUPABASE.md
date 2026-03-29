# Supabase Setup

This project already reads and writes data through `@supabase/supabase-js`, so the practical Supabase deployment path is:

1. Use Supabase for Postgres and Storage.
2. Point the Vite app at your Supabase URL and anon key.
3. Host the built `dist/` folder on a static host.

## Important limitation

The current admin login in `src/lib/api.ts` is a mock credential check in the browser, not real authentication. That means full client-side write access is not production-safe yet. For a safe production launch:

- public portfolio reads can use public read-only policies
- admin writes should move behind Supabase Auth, Edge Functions, or a server

Until that is done, do not create open anonymous write policies for all tables in production.

## 1. Create the Supabase project

Create a new project in Supabase and copy:

- Project URL
- Anon/public API key
- Postgres connection string

## 2. Create the database schema

Open Supabase SQL Editor and run:

- [supabase/schema.sql](/c:/Users/LENOVO/Desktop/Tanveer%20Portfolio/Portfolio%20OS/supabase/schema.sql)

This file was generated from the Prisma schema in the repo.

## 3. Seed initial data

Set your local `.env` like this:

```env
DATABASE_URL="your-supabase-postgres-connection-string"
DIRECT_URL="your-supabase-postgres-connection-string"
VITE_SUPABASE_URL="https://your-project-ref.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-key"
```

Then run:

```bash
npm install
npm run db:seed
```

## 4. Create the storage bucket

In Supabase Storage:

1. Create a bucket named `media`
2. Mark it public if you want uploaded images to be directly viewable

The frontend uploads files to `media/uploads/...`.

## 5. Add safe starter policies

If you only want the public portfolio working first, enable RLS and add read-only policies for public content tables such as:

- `profile`
- `experience`
- `projects`
- `skills`
- `tools`
- `certifications`
- `blogs`
- `custom_tabs`
- `testimonials`
- `education`
- `settings`

For example:

```sql
alter table "projects" enable row level security;

create policy "Public can read visible projects"
on "projects"
for select
to anon
using ("isPublic" = true);
```

Apply equivalent read policies to the other public tables. Keep `messages`, `api_keys`, `webhooks`, `analytics`, and write access restricted.

## 6. Build the frontend

```bash
npm run build
```

This project builds successfully and outputs:

- `dist/index.html`
- `dist/admin.html`

## 7. Host the frontend

Supabase is the backend here, not the best place to host the Vite frontend itself. Host `dist/` on a static provider like Vercel or Netlify, while keeping Supabase as:

- database
- storage
- API

If you specifically want to serve static files from Supabase Storage, upload the `dist/` output manually, but that is less convenient than a normal static host.
