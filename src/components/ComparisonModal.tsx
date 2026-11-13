"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { Program } from "@/types/program";

const ROWS = ["University", "Program", "Ranking", "Total tuition", "Format", "Accreditation", "Funding", "Admission"] as const;

export default function ComparisonModal({ programs, onClose }: { programs: Program[]; onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); onClose(); return; }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button, a, input, [tabindex]:not([tabindex='-1'])")).filter((element) => !element.hasAttribute("disabled"));
      if (!focusable.length) return;
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.removeEventListener("keydown", onKeyDown); previousFocus?.focus(); };
  }, [onClose]);

  const getValue = (row: typeof ROWS[number], program: Program): string => {
    if (row === "University") return program.university;
    if (row === "Program") return program.programName;
    if (row === "Ranking") return program.usNewsRank === null ? "Not ranked nationally" : `${program.rankingTier} (#${program.usNewsRank})`;
    if (row === "Total tuition") return `$${program.totalTuitionUsd.toLocaleString()}${program.tuitionIsEstimated ? " (est.)" : ""}`;
    if (row === "Format") return program.format;
    if (row === "Accreditation") return `${program.accreditationAgency} · ${program.carnegieClass}`;
    if (row === "Funding") return program.fundingTypes.join(", ");
    return program.admissionRequirements.join(" · ");
  };

  return <div className="fixed inset-0 z-30 flex items-end justify-center bg-slate-950/80 p-2 backdrop-blur-sm sm:items-center sm:p-6" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><div ref={dialogRef} className="max-h-[90vh] w-full max-w-6xl overflow-auto rounded-2xl border border-white/10 bg-slate-900 p-5 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="comparison-title"><div className="mb-5 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-cyan-300">Side-by-side comparison</p><h2 id="comparison-title" className="mt-1 text-2xl font-black">Your shortlisted programs</h2></div><button ref={closeButtonRef} onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white" aria-label="Close comparison"><X /></button></div><div className="grid overflow-x-auto rounded-xl border border-white/10" style={{ gridTemplateColumns: `150px repeat(${programs.length}, minmax(180px, 1fr))` }}>{ROWS.map((label, index) => <div key={label} className="contents"><div className="bg-slate-950 p-3 text-xs font-bold uppercase text-slate-500">{label}</div>{programs.map((program) => <div key={`${label}-${program.id}`} className={`bg-slate-900 p-3 text-sm ${index === 0 ? "font-bold text-cyan-200" : "text-slate-300"}`}>{getValue(label, program)}</div>)}</div>)}</div><p className="mt-4 text-xs text-slate-500">Ranking and tuition figures are planning data. Always verify current details on the official program page before applying.</p></div></div>;
}
