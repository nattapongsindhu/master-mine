# Architecture Review: MasterPath US

## Current architecture

```text
src/data/seed.ts
        │
        ▼
src/app/page.tsx
        │
        ▼
src/app/ProgramsClient.tsx
        │
        ├── FilterSidebar
        ├── ProgramCard
        └── ComparisonModal
```

The current application is a static, local-data MVP. `src/data/seed.ts` is the single canonical source used by the frontend. The page does not call Supabase at runtime.

## Data boundaries

### Active MasterPath data

```text
src/data/seed.ts
```

This contains typed US master's degree `Program` records. Ranking and tuition values are planning data and must be re-verified before production use.

### Data provenance

This project originated as a fork of the `grants-for-me` workforce-grant finder. The legacy grant pipeline (scraper, GitHub Actions workflow, and `grants.json` dataset) has been removed from the working tree.

The active application uses:

```text
US master's programs → src/data/seed.ts → Next.js static build
```

There is no verified Program scraper yet. A future scraper must use a separate Program schema and review policy.

## Future data architecture

Before adding automation, define a separate Program ingestion contract:

```text
Authoritative university sources
        │
        ▼
Program parser and normalization
        │
        ▼
Program schema validation
        │
        ▼
Review / freshness policy
        │
        ▼
Supabase programs table or generated Program dataset
```

The existing `supabase/schema.sql` prepares a possible future `programs` table, but it is not connected to the application yet. A migration to Supabase must include a rollback plan, RLS review, source verification, and a decision about whether filtering moves server-side.

## Deployment

The application is compatible with static export. Vercel can build the site from the canonical local dataset. No GitHub Actions job currently updates the active dataset.

`vercel.json` supplies baseline security headers. CSP and production headers still require verification against the actual deployment configuration before claiming production security compliance.

## Current non-goals

- No live Program scraping
- No Supabase runtime access
- No authentication or admin editing workflow
- No claim that estimated tuition or ranking values are authoritative
- No use of the legacy workforce-grant dataset in the degree finder
