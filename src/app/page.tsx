import { Suspense } from "react";
import { programs as seedPrograms } from "@/data/seed";
import { validatePrograms } from "@/data/programSchema";
import ProgramsClient from "./ProgramsClient";

export default function HomePage() {
  const programs = validatePrograms(seedPrograms);
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
            <p className="text-slate-400 text-sm">Loading programs...</p>
        </main>
      }
    >
      <ProgramsClient programs={programs} />
    </Suspense>
  );
}
