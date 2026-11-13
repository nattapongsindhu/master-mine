import type { RankingTier } from "@/types/program";

const RANKING_LIMITS: Record<RankingTier, number | null> = { "Top 50": 50, "Top 100": 100, "Top 200": 200, "Not Ranked": null };

export const isValidTuition = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value) && value >= 0;
export const matchesMaxTuition = (tuition: unknown, maxTuition: number): boolean => isValidTuition(tuition) && Number.isFinite(maxTuition) && maxTuition >= 0 && tuition < maxTuition;
export const matchesRankingTier = (rank: unknown, tiers: RankingTier[]): boolean => {
  if (rank === null) return !tiers.length || tiers.includes("Not Ranked");
  if (typeof rank !== "number" || !Number.isInteger(rank) || rank <= 0) return false;
  if (!tiers.length) return true;
  return tiers.some((tier) => { const limit = RANKING_LIMITS[tier]; return limit !== null && rank <= limit; });
};
export const matchesRegionalAccreditation = (value: unknown): boolean => typeof value === "string" && value.trim().toLowerCase() === "regional accreditation";
