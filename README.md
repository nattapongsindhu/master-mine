# MasterPath US — IT Master's Degree Finder

[![Live site](https://img.shields.io/badge/live-master--mine.vercel.app-000000?logo=vercel&logoColor=white)](https://master-mine.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.4.6-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.3.1-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vitest](https://img.shields.io/badge/tests-21_unit-6E9F18?logo=vitest&logoColor=white)](#local-setup)
[![Playwright](https://img.shields.io/badge/tests-5_e2e-2EAD33?logo=playwright&logoColor=white)](#local-setup)

**Live:** https://master-mine.vercel.app

MasterPath US is a static Next.js application for discovering and comparing US IT master's degree programs. The MVP focuses on regional accreditation, ranking tiers, tuition planning, study format, funding signals, admission requirements, and source verification.

## Canonical data source

The frontend reads the typed dataset from:

```text
src/data/seed.ts
```

`src/app/page.tsx` imports `programs` from that file and passes it to the client dashboard.

Tuition, rankings, requirements, funding, intake dates, and deadlines in the MVP are planning data. Records marked `Estimated` must be verified against the official university program page before an application decision.

## Data provenance

This project originated as a fork of the `grants-for-me` workforce-grant finder. The legacy grant pipeline (scraper, GitHub Actions workflow, and `grants.json` dataset) has been removed from the working tree.

There is currently no verified Program scraper. A future scraper must use a separate Program schema, authoritative sources, validation, and an explicit review policy before it can update the application dataset.

## Project structure

```text
src/
├── app/
│   ├── page.tsx                 # Server entrypoint; imports canonical programs
│   ├── ProgramsClient.tsx         # Search, filters, favorites, comparison
│   └── globals.css
├── components/
│   ├── FilterSidebar.tsx
│   ├── ProgramCard.tsx
│   └── ComparisonModal.tsx
├── data/
│   └── seed.ts                  # Canonical MVP Program dataset
└── types/
    └── program.ts                 # Program and filter types

supabase/schema.sql              # Future database schema; not used at runtime yet
```

## Tech stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS
- Lucide React
- Static export compatible with Vercel
- Supabase schema prepared for a future data layer; no Supabase runtime client is configured yet

## Local setup

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

Quality checks:

```bash
npm run lint
npx tsc --noEmit --incremental false
npm test          # Vitest unit tests
npm run test:e2e  # Playwright smoke tests (builds and serves out/)
npm run build
```

Because the project uses static export, `next start` is not the correct preview command. After `npm run build`, serve the generated `out` directory with the bundled static server:

```bash
npm run preview   # node scripts/serve-out.mjs out 4173
```

## Data policy

- Do not mix workforce grants with degree programs.
- Do not infer tuition, ranking, accreditation, funding, or deadlines from an unverified source.
- Keep estimated values explicitly marked as estimated.
- Use official university pages as the source for application decisions.

## License

MIT — see [LICENSE](./LICENSE).
