import { CalendarDays, ExternalLink, Heart, MapPin, Wallet } from "lucide-react";
import type { Program } from "@/types/program";

interface Props {
  program: Program;
  selected: boolean;
  favorite: boolean;
  onToggleFavorite: () => void;
  onToggleCompare: () => void;
}

export default function ProgramCard({ program, selected, favorite, onToggleFavorite, onToggleCompare }: Props) {
  const nextDeadline = Object.values(program.applicationDeadlines ?? {}).filter((value): value is string => Boolean(value) && !Number.isNaN(Date.parse(value))).sort((a, b) => Date.parse(a) - Date.parse(b))[0];

  return (
    <article className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.05] p-5 transition hover:border-cyan-300/40 hover:bg-white/[0.07]">
      <div className="flex items-start justify-between gap-4">
        <div><p className="text-sm font-bold text-cyan-200">{program.university}</p><h2 className="mt-1 text-lg font-bold leading-tight text-white">{program.programName}</h2></div>
        <div className="flex items-center gap-2">
          <button onClick={onToggleFavorite} className={`rounded-full p-2 transition ${favorite ? "bg-rose-400/15 text-rose-300" : "text-slate-500 hover:bg-white/10 hover:text-rose-300"}`} aria-label={favorite ? "Remove from favorites" : "Save program"}><Heart size={17} fill={favorite ? "currentColor" : "none"} /></button>
          <span className="shrink-0 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-2.5 py-1 text-xs font-bold text-emerald-200">{program.rankingTier}</span>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {program.qualityBadges.map((badge) => <span key={badge} className="rounded-md bg-cyan-300/10 px-2 py-1 text-xs font-medium text-cyan-200">{badge}</span>)}
        <span className={`rounded-md px-2 py-1 text-xs font-medium ${program.verificationStatus === "Verified" ? "bg-emerald-300/10 text-emerald-200" : "bg-amber-300/10 text-amber-200"}`}>{program.verificationStatus ?? "Needs Review"}</span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 border-y border-white/10 py-4 text-sm">
        <div><p className="text-xs text-slate-500">Total tuition</p><p className="mt-1 font-bold text-white">${program.totalTuitionUsd.toLocaleString()} <span className="text-xs font-normal text-slate-500">USD</span></p></div>
        <div><p className="text-xs text-slate-500">Format</p><p className="mt-1 font-bold text-white">{program.format}</p></div>
        <div><p className="text-xs text-slate-500">Accreditation</p><p className="mt-1 font-medium text-slate-200">{program.accreditationAgency}</p></div>
        <div><p className="text-xs text-slate-500">Funding</p><p className="mt-1 flex items-center gap-1 font-medium text-slate-200"><Wallet size={14} className="text-cyan-300" />{program.fundingTypes.join(", ")}</p></div>
      </div>
      <div className="mt-3 grid gap-2 text-xs text-slate-300 sm:grid-cols-2">
        <span><strong className="text-slate-500">English:</strong> IELTS {program.languageRequirements?.ielts ?? "—"} / TOEFL {program.languageRequirements?.toefl ?? "—"}</span>
        <span><strong className="text-slate-500">GRE:</strong> {program.greRequirement ?? "Unknown"}</span>
        <span><strong className="text-slate-500">Intake:</strong> {program.intakes?.join(" · ") ?? "Not published"}</span>
        <span className="flex items-center gap-1"><CalendarDays size={13} className="text-cyan-300" /><strong className="text-slate-500">Next deadline:</strong> {nextDeadline ?? "Not published"}{program.deadlineNote && <span className="text-slate-500"> · {program.deadlineNote}</span>}</span>
      </div>
      <p className="mt-3 flex min-h-5 items-center gap-1 text-xs text-slate-400">{program.city && <><MapPin size={13} />{program.city}, {program.state}</>}</p>
      <div className="mt-4 flex items-center justify-between gap-3"><label className="flex cursor-pointer items-center gap-2 text-xs text-slate-300"><input aria-label={`Add ${program.university} to comparison`} type="checkbox" checked={selected} onChange={onToggleCompare} className="h-4 w-4 accent-cyan-300" /> Add to compare</label><a href={program.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-300 px-3 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-200">Official program <ExternalLink size={14} /></a></div>
      <p className="mt-4 text-[11px] leading-4 text-slate-500">{program.tuitionNote} Last checked: {program.sourceLastChecked ?? program.lastVerified}</p>
    </article>
  );
}
