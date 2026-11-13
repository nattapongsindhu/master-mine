"use client";
import type { CarnegieClass, Discipline, FundingType, RankingTier, StudyFormat } from "@/types/program";
import type { ProgramFilters } from "@/app/ProgramsClient";

const disciplineGroups: { name: string; values: Discipline[] }[] = [
  { name: "Computing", values: ["Computer Science", "Software Engineering", "Computer Engineering", "Artificial Intelligence", "Machine Learning", "Human-Computer Interaction"] },
  { name: "Data & Information", values: ["Data Science", "Data Analytics", "Data Engineering", "Database Systems", "Business Intelligence"] },
  { name: "Security", values: ["Cybersecurity", "Information Security", "Digital Forensics", "Cloud Security"] },
  { name: "Infrastructure", values: ["Cloud Computing", "Computer Networks", "DevOps / SRE", "Internet of Things"] },
  { name: "Business Technology", values: ["Information Systems", "Management Information Systems", "IT Management", "Enterprise Architecture", "Information Technology"] },
  { name: "Applied Informatics", values: ["Health Informatics", "Bioinformatics", "Robotics", "FinTech"] },
];
const formats: StudyFormat[] = ["Online", "On-Campus", "Hybrid"];
const funding: FundingType[] = ["Scholarship Available", "TA/RA Funding", "Fellowship", "None"];
const tiers: RankingTier[] = ["Top 50", "Top 100", "Top 200", "Not Ranked"];
const carnegieClasses: CarnegieClass[] = ["R1", "R2", "Doctoral/Professional", "Master's"];
type Props = { filters: ProgramFilters; setFilter: <K extends keyof ProgramFilters>(key: K, value: ProgramFilters[K]) => void; reset: () => void };

export default function FilterSidebar({ filters, setFilter, reset }: Props) {
  const toggle = <T extends string>(key: "disciplines" | "formats" | "funding" | "rankingTiers" | "carnegieClasses", value: T) => {
    const current = filters[key] as T[];
    const next = current.includes(value) ? current.filter((x) => x !== value) : [...current, value];
    setFilter(key, next as ProgramFilters[typeof key]);
  };
  return <aside className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5"><div className="flex items-center justify-between"><h2 className="font-bold">Filters</h2><button onClick={reset} className="text-xs text-cyan-300 hover:underline">Reset</button></div><label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={filters.regionalOnly} onChange={(e) => setFilter("regionalOnly", e.target.checked)} className="h-4 w-4 accent-cyan-300" /><span>Regional accreditation only</span></label><label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={filters.greNotRequired} onChange={(e) => setFilter("greNotRequired", e.target.checked)} className="h-4 w-4 accent-cyan-300" /><span>GRE not required</span></label><FilterGroup title="Ranking tier" values={tiers} selected={filters.rankingTiers} onToggle={(value) => toggle("rankingTiers", value)} /><FilterGroup title="Carnegie class" values={carnegieClasses} selected={filters.carnegieClasses} onToggle={(value) => toggle("carnegieClasses", value)} /><FilterGroup title="Study format" values={formats} selected={filters.formats} onToggle={(value) => toggle("formats", value)} /><div><p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">Discipline</p><div className="space-y-4">{disciplineGroups.map((group) => <div key={group.name}><p className="mb-2 text-xs font-semibold text-cyan-200">{group.name}</p><div className="space-y-2 pl-1">{group.values.map((value) => <label key={value} className="flex cursor-pointer items-start gap-2 text-sm text-slate-300"><input type="checkbox" checked={filters.disciplines.includes(value)} onChange={() => toggle("disciplines", value)} className="mt-0.5 h-4 w-4 shrink-0 accent-cyan-300" /><span>{value}</span></label>)}</div></div>)}</div></div><FilterGroup title="Funding" values={funding} selected={filters.funding} onToggle={(value) => toggle("funding", value)} /><div><div className="mb-2 flex justify-between text-sm"><span>Max total tuition</span><strong className="text-cyan-200">${filters.maxTuition.toLocaleString()}</strong></div><input type="range" min="10000" max="100000" step="5000" value={filters.maxTuition} onChange={(e) => setFilter("maxTuition", Number(e.target.value))} className="w-full accent-cyan-300" /></div></aside>;
}
function FilterGroup<T extends string>({ title, values, selected, onToggle }: { title: string; values: T[]; selected: T[]; onToggle: (value: T) => void }) { return <fieldset><legend className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">{title}</legend><div className="space-y-2">{values.map((value) => <label key={value} className="flex cursor-pointer items-start gap-2 text-sm text-slate-300"><input type="checkbox" checked={selected.includes(value)} onChange={() => onToggle(value)} className="mt-0.5 h-4 w-4 shrink-0 accent-cyan-300" /><span>{value}</span></label>)}</div></fieldset>; }
