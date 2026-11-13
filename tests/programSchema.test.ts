import { describe, expect, it } from "vitest";
import { programs } from "@/data/seed";
import { validatePrograms } from "@/data/programSchema";

describe("program dataset schema", () => {
  it("accepts the canonical seed dataset", () => {
    expect(validatePrograms(programs)).toHaveLength(8);
    expect(programs.find((program) => program.id === "purdue-mscs-online")?.fundingTypes).toEqual(["Scholarship Available", "TA/RA Funding"]);
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
  ])("rejects %s", (_label, override) => {
    expect(() => validatePrograms([{ ...programs[0], ...override }])).toThrow();
  });
});
