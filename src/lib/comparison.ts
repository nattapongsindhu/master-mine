import type { Program } from "@/types/program";

export function getSelectedPrograms(programs: Program[], selectedIds: string[]): Program[] {
  const selected = new Set(selectedIds);
  return programs.filter((program) => selected.has(program.id));
}
