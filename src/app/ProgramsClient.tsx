"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { GraduationCap, ShieldCheck, SlidersHorizontal, X } from "lucide-react";
import type { CarnegieClass, Discipline, FundingType, Program, RankingTier, StudyFormat } from "@/types/program";
import FilterSidebar from "@/components/FilterSidebar";
import ProgramCard from "@/components/ProgramCard";
import ComparisonModal from "@/components/ComparisonModal";
import { matchesMaxTuition, matchesRegionalAccreditation, matchesRankingTier } from "@/lib/programFilters";
import { getSelectedPrograms } from "@/lib/comparison";
import { getFavoritesServerSnapshot, getFavoritesSnapshot, parseFavoriteIds, subscribeFavorites, writeFavorites } from "@/lib/favorites";

export interface ProgramFilters { query: string; disciplines: Discipline[]; formats: StudyFormat[]; funding: FundingType[]; rankingTiers: RankingTier[]; carnegieClasses: CarnegieClass[]; maxTuition: number; regionalOnly: boolean; greNotRequired: boolean; }
const DEFAULT_FILTERS: ProgramFilters = { query: "", disciplines: [], formats: [], funding: [], rankingTiers: ["Top 200", "Not Ranked"], carnegieClasses: [], maxTuition: 100000, regionalOnly: true, greNotRequired: false };

export default function ProgramsClient({ programs }: { programs: Program[] }) {
  const [filters, setFilters] = useState<ProgramFilters>(DEFAULT_FILTERS);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [comparisonOpen, setComparisonOpen] = useState(false);

  const favoriteSnapshot = useSyncExternalStore(subscribeFavorites, getFavoritesSnapshot, getFavoritesServerSnapshot);
  const favoriteIds = useMemo(() => parseFavoriteIds(favoriteSnapshot), [favoriteSnapshot]);
  const toggleFavorite = (id: string) => {
    const current = parseFavoriteIds(getFavoritesSnapshot());
    writeFavorites(current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const filtered = useMemo(() => programs.filter((program) => {
    const q = filters.query.trim().toLowerCase();
    const searchMatch = !q || [program.university, program.programName, program.degree, ...program.disciplines].join(" ").toLowerCase().includes(q);
    const disciplineMatch = !filters.disciplines.length || filters.disciplines.some((d) => program.disciplines.includes(d));
    const formatMatch = !filters.formats.length || filters.formats.includes(program.format);
    const fundingMatch = !filters.funding.length || filters.funding.some((f) => program.fundingTypes.includes(f));
    const tierMatch = matchesRankingTier(program.usNewsRank, filters.rankingTiers);
    const carnegieMatch = !filters.carnegieClasses.length || filters.carnegieClasses.includes(program.carnegieClass);
    const greMatch = !filters.greNotRequired || program.greRequirement === "Not Required";
    const tuitionMatch = matchesMaxTuition(program.totalTuitionUsd, filters.maxTuition);
    const accreditationMatch = !filters.regionalOnly || matchesRegionalAccreditation(program.accreditationType);
    return searchMatch && disciplineMatch && formatMatch && fundingMatch && tierMatch && carnegieMatch && greMatch && tuitionMatch && accreditationMatch;
  }), [filters, programs]);

  const selectedPrograms = getSelectedPrograms(programs, selectedIds);
  const activeSelectedIds = selectedPrograms.map((program) => program.id);
  const setFilter = <K extends keyof ProgramFilters>(key: K, value: ProgramFilters[K]) => setFilters((current) => ({ ...current, [key]: value }));
  const toggleSelection = (id: string) => setSelectedIds((ids) => ids.includes(id) ? ids.filter((item) => item !== id) : ids.length < 3 ? [...ids, id] : ids);
  const reset = () => setFilters(DEFAULT_FILTERS);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3"><div className="rounded-xl bg-cyan-400 p-2 text-slate-950"><GraduationCap size={22} /></div><div><p className="text-lg font-bold tracking-tight">MasterPath <span className="text-cyan-300">US</span></p><p className="text-xs text-slate-400">Evidence-aware IT degree discovery</p></div></div>
          <div className="hidden items-center gap-2 text-xs text-slate-400 sm:flex"><ShieldCheck size={16} className="text-emerald-400" /> Regional accreditation gate enabled</div>
        </div>
      </header>
      <section className="border-b border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/60"><div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">US Master&apos;s Degree Finder</p><h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">Find a credible IT master&apos;s degree that fits your budget.</h1><p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">Compare nationally recognized universities by discipline, delivery format, total tuition, and funding signals. Start with a quality gate—not a marketing list.</p></div></section>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"><div className="mb-6 flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm text-slate-400">Showing <span className="font-bold text-white">{filtered.length}</span> of {programs.length} programs</p><p className="mt-1 text-xs text-slate-500">Planning dataset · verify tuition, rank, and admission requirements with each university</p></div><div className="flex gap-2"><button onClick={() => setShowMobileFilters(true)} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold text-slate-200 lg:hidden"><SlidersHorizontal size={15} /> Filters</button><button onClick={() => setFilter("maxTuition", filters.maxTuition === 25000 ? 100000 : 25000)} className={`rounded-full border px-4 py-2 text-xs font-bold transition ${filters.maxTuition === 25000 ? "border-cyan-300 bg-cyan-300 text-slate-950" : "border-cyan-400/40 bg-cyan-400/10 text-cyan-200 hover:bg-cyan-400/20"}`}>Budget Friendly &lt; $25,000</button></div></div>
        <div className="grid gap-8 lg:grid-cols-[270px_1fr]"><div className="hidden lg:block"><FilterSidebar filters={filters} setFilter={setFilter} reset={reset} /></div><section aria-label="Degree programs"><div className="mb-4 flex items-center justify-between"><label className="relative block w-full max-w-md"><span className="sr-only">Search programs</span><input value={filters.query} onChange={(e) => setFilter("query", e.target.value)} placeholder="Search university, program, or discipline" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-300" /></label><div className="ml-4 hidden items-center gap-2 text-xs text-slate-400 sm:flex"><SlidersHorizontal size={15} /> Compare up to 3</div></div>{filtered.length === 0 ? <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-12 text-center"><p className="font-semibold">No programs match these filters.</p><button onClick={reset} className="mt-3 text-sm text-cyan-300 hover:underline">Reset all filters</button></div> : <div className="grid gap-4 xl:grid-cols-2">{filtered.map((program) => <ProgramCard key={program.id} program={program} selected={selectedIds.includes(program.id)} favorite={favoriteIds.includes(program.id)} onToggleFavorite={() => toggleFavorite(program.id)} onToggleCompare={() => toggleSelection(program.id)} />)}</div>}</section></div></div>
      {showMobileFilters && <div className="fixed inset-0 z-30 bg-slate-950/80 p-4 backdrop-blur-sm lg:hidden"><div className="mx-auto max-h-[90vh] max-w-md overflow-auto rounded-2xl border border-white/10 bg-slate-900 p-4"><div className="mb-4 flex items-center justify-between"><h2 className="font-bold">Filters</h2><button onClick={() => setShowMobileFilters(false)} className="text-sm text-cyan-300">Done</button></div><FilterSidebar filters={filters} setFilter={setFilter} reset={reset} /></div></div>}
      {activeSelectedIds.length > 0 && <div className="fixed inset-x-0 bottom-0 z-20 border-t border-cyan-300/20 bg-slate-900/95 p-3 shadow-2xl backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-2"><div className="flex min-w-0 items-center gap-2 text-sm"><span className="shrink-0 rounded-full bg-cyan-300 px-2 py-1 text-xs font-black text-slate-950">{activeSelectedIds.length}/3</span><span className="hidden truncate text-slate-300 sm:block">{selectedPrograms.map((p) => p.university).join(" · ")}</span>{activeSelectedIds.length === 1 && <span className="hidden text-xs text-amber-200 sm:block">Select one more program to compare</span>}</div><div className="flex items-center gap-2"><button onClick={() => setSelectedIds([])} className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white" aria-label="Clear comparison"><X size={17} /></button><button disabled={activeSelectedIds.length < 2} onClick={() => setComparisonOpen(true)} className="rounded-lg bg-cyan-300 px-4 py-2 text-sm font-bold text-slate-950 disabled:cursor-not-allowed disabled:opacity-40">Compare now</button></div></div></div>}
      {comparisonOpen && <ComparisonModal programs={selectedPrograms} onClose={() => setComparisonOpen(false)} />}
    </main>
  );
}
