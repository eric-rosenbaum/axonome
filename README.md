# Axonome — v1 web app

A personalized, authenticated rebuild of [axonome.org](https://www.axonome.org), shifting from
a static Wix encyclopedia to a logged-in companion organized around each user's selected
neurodegenerative disease.

## Stack

- **Next.js 16** (App Router) + **TypeScript** + **Tailwind v4**
- **Supabase** for auth + Postgres (profiles, saved items)
- **MDX** for content (per-page markdown with frontmatter for tagging/cross-linking)
- **Pagefind** for static search (build-time index)
- Deploys to **Vercel**

## Local setup

```sh
# 1. Install
npm install

# 2. Configure environment
cp .env.local.example .env.local
# edit .env.local with your Supabase URL and anon key

# 3. Set up the database
# - Create a free project at https://supabase.com
# - In the SQL editor, paste & run supabase/migrations/0001_init.sql

# 4. Run dev server
npm run dev
```

Visit http://localhost:3000.

## Project layout

```
src/
  app/                  Routes (App Router)
    page.tsx            Smart home — landing (public) or dashboard (auth)
    [slug]/             Catch-all for disease/mechanism/gene/intervention pages
    login/ signup/ onboarding/ account/
    auth/callback/      Supabase OAuth callback
    explore/ research/ search/
    about/ privacy/ terms/

  components/
    site-header.tsx     Sticky dark nav
    site-footer.tsx
    landing/            Public landing
    dashboard/          Logged-in personalized home
    content/            Disease/Mechanism/Gene/Intervention templates
    ui/                 Button, Card primitives

  content/              MDX with frontmatter — the substance of the site
    diseases/           One file per disease (8 pages)
    mechanisms/         8 pages
    genes/              4 pages
    interventions/      3 pages
    pages/              About, Privacy, Terms

  lib/
    diseases.ts         Canonical disease catalog + related content map
    content.ts          MDX loader (fs + gray-matter)
    supabase/           Browser + server clients, proxy helper
    actions/            Server actions: auth, profile, save

proxy.ts                Auth gating (formerly "middleware" — renamed in Next 16)
```

## Content migration

The 23 content MDX stubs (under `src/content/`) currently have placeholder bodies. To
migrate from the existing Wix site, open each `*.mdx` file and paste the prose from the
matching page on axonome.org under the section headings provided. The frontmatter
(`title`, `slug`, `type`, `diseases`, `description`) is already populated.

Disease pages use a fixed six-section structure (Pathology / Biological Phases / Causes /
Progression / Treatment Landscape / Research Directions). Mechanism, gene, and intervention
pages have an open structure — use `##` for H2 sections.

After migration, the disease pages' sticky TOC and cross-linked Related Mechanisms / Genes /
Interventions surfaces auto-update based on the catalog in `src/lib/diseases.ts`.

## Auth & personalization model

- Sign up → confirm email → land on `/onboarding`
- Onboarding asks 3 things: role (patient / loved one / exploring), disease focus, optional name
- Once onboarded, `/` renders the personalized dashboard (disease sections, related mechanisms,
  genes, interventions, saved items)
- Disease focus can be changed anytime from `/account`
- Save buttons on content pages persist per-user via the `saved_items` table

## Search

The UI in `src/app/search/search-client.tsx` loads Pagefind's runtime from
`/pagefind/pagefind.js`. The index is generated post-build:

```sh
npm run build
npx pagefind --site .next/server/app --output-path public/pagefind
```

For v1, wiring this into the standard `build` script depends on how the Vercel build output
maps from `.next/server/app/<slug>.html` — verify locally, then add to `package.json`
scripts. Until then, search will show a helpful "not yet indexed" message.

## What's deliberately not in v1

- Journal (planned for v2)
- Caregiver-specific UI
- Reading-level toggle
- Per-intervention evidence ratings
- Social / community features
- Multi-language

## Redirects

The original Wix site used some leftover placeholder slugs (`/blank`, `/blank-1`, etc.) for
the dropdown landing pages, plus a few inconsistent legal URLs. Redirects are configured in
`next.config.ts` to preserve SEO from the old site.
