import { describe, expect, it } from "vitest";
import { matchesMaxTuition, matchesRankingTier, matchesRegionalAccreditation } from "@/lib/programFilters";

describe("tuition boundary", () => {
  it("uses strict less-than semantics for the budget filter", () => {
    expect(matchesMaxTuition(24999.99, 25000)).toBe(true);
    expect(matchesMaxTuition(25000, 25000)).toBe(false);
    expect(matchesMaxTuition(25000.01, 25000)).toBe(false);
    expect(matchesMaxTuition(99999.99, 100000)).toBe(true);
    expect(matchesMaxTuition(100000, 100000)).toBe(false);
  });

  it.each([null, undefined, Number.NaN, Number.POSITIVE_INFINITY, -1, "24000"])('rejects invalid tuition value %s', (value) => {
    expect(matchesMaxTuition(value, 25000)).toBe(false);
  });
});

describe("ranking and accreditation", () => {
  it("includes ranks up to the selected tier limit", () => {
    expect(matchesRankingTier(50, ["Top 50"])).toBe(true);
    expect(matchesRankingTier(51, ["Top 50"])).toBe(false);
    expect(matchesRankingTier(100, ["Top 100"])).toBe(true);
    expect(matchesRankingTier(101, ["Top 100"])).toBe(false);
    expect(matchesRankingTier(200, ["Top 200"])).toBe(true);
    expect(matchesRankingTier(201, ["Top 200"])).toBe(false);
  });

  it("normalizes regional accreditation values", () => {
    expect(matchesRegionalAccreditation(" Regional Accreditation ")).toBe(true);
    expect(matchesRegionalAccreditation("national accreditation")).toBe(false);
    expect(matchesRegionalAccreditation(undefined)).toBe(false);
  });
});
