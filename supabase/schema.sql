create extension if not exists pgcrypto;

create table if not exists public.programs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  university text not null,
  program_name text not null,
  degree text not null,
  disciplines text[] not null default '{}',
  format text not null check (format in ('Online', 'On-Campus', 'Hybrid')),
  city text,
  state text,
  total_tuition_usd numeric(12,2) not null check (total_tuition_usd >= 0),
  tuition_is_estimated boolean not null default true,
  funding_types text[] not null default '{}',
  us_news_rank integer check (us_news_rank is null or us_news_rank > 0),
  ranking_tier text not null check (ranking_tier in ('Top 50', 'Top 100', 'Top 200')),
  ranking_source text not null,
  accreditation_type text not null,
  accreditation_agency text not null,
  carnegie_class text not null check (carnegie_class in ('R1', 'R2', 'Doctoral/Professional')),
  quality_badges text[] not null default '{}',
  admission_requirements text[] not null default '{}',
  source_url text not null check (source_url ~ '^https?://'),
  tuition_note text not null,
  last_verified date not null,
  ielts_requirement text,
  toefl_requirement text,
  duolingo_requirement text,
  gre_requirement text check (gre_requirement is null or gre_requirement in ('Required', 'Optional', 'Not Required', 'Unknown')),
  intakes text[] not null default '{}',
  application_deadlines jsonb not null default '{}'::jsonb,
  verification_status text not null default 'Needs Review' check (verification_status in ('Verified', 'Estimated', 'Needs Review')),
  source_last_checked date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists programs_ranking_tier_idx on public.programs (ranking_tier);
create index if not exists programs_tuition_idx on public.programs (total_tuition_usd);
create index if not exists programs_format_idx on public.programs (format);
create index if not exists programs_accreditation_idx on public.programs (accreditation_type, accreditation_agency);
create index if not exists programs_disciplines_gin_idx on public.programs using gin (disciplines);
create index if not exists programs_funding_types_gin_idx on public.programs using gin (funding_types);

alter table public.programs enable row level security;
create policy "Programs are publicly readable" on public.programs for select using (true);
