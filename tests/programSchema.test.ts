import { describe, expect, it } from "vitest";
import { programs } from "@/data/seed";
import { validatePrograms } from "@/data/programSchema";

describe("program dataset schema", () => {
  it("accepts the canonical seed dataset", () => {
    expect(validatePrograms(programs)).toHaveLength(11);
    expect(programs.find((program) => program.id === "gatech-oms-analytics")?.totalTuitionUsd).toBe(12348);
    expect(programs.find((program) => program.id === "purdue-mscs-online")?.fundingTypes).toEqual(["Scholarship Available", "TA/RA Funding"]);
  });

  it("accepts a program without a national rank", () => {
    const unranked = programs.find((program) => program.id === "csula-ms-computer-science");
    expect(unranked?.usNewsRank).toBeNull();
    expect(validatePrograms([unranked])).toHaveLength(1);
  });

  it("rejects duplicate IDs", () => {
    expect(() => validatePrograms([programs[0], programs[0]])).toThrow(/Duplicate program id/);
  });

  it.each([
    ["negative tuition", { totalTuitionUsd: -1 }],
    ["string tuition", { totalTuitionUsd: "24000" }],
    ["invalid URL", { sourceUrl: "http://example.com/program" }],
    ["invalid date", { lastVerified: "not-a-date" }],
    ["missing university", { university: "" }],
    ["empty funding", { fundingTypes: [] }],
    ["inconsistent ranking", { rankingTier: "Top 200", usNewsRank: 20 }],
    ["unranked program with a numeric tier", { usNewsRank: null }],
    ["ranked program with the Not Ranked tier", { rankingTier: "Not Ranked" }],
  ])("rejects %s", (_label, override) => {
    expect(() => validatePrograms([{ ...programs[0], ...override }])).toThrow();
  });
});
