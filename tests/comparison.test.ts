import { describe, expect, it } from "vitest";
import { programs } from "@/data/seed";
import { getSelectedPrograms } from "@/lib/comparison";
import { parseFavoriteIds } from "@/lib/favorites";

describe("comparison selection", () => {
  it("supports one, two, and three selected programs", () => {
    expect(getSelectedPrograms(programs, [programs[0].id])).toHaveLength(1);
    expect(getSelectedPrograms(programs, [programs[0].id, programs[1].id])).toHaveLength(2);
    expect(getSelectedPrograms(programs, [programs[0].id, programs[1].id, programs[2].id])).toHaveLength(3);
  });

  it("removes stale IDs that are not in the current dataset", () => {
    expect(getSelectedPrograms(programs, ["missing-program-id", programs[0].id]).map((program) => program.id)).toEqual([programs[0].id]);
  });
});

describe("favorite storage parsing", () => {
  it("rejects malformed or mixed localStorage values safely", () => {
    expect(parseFavoriteIds('{"id":"gatech-omscs"}')).toEqual([]);
    expect(parseFavoriteIds('["gatech-omscs", 42, null, {}]')).toEqual(["gatech-omscs"]);
    expect(parseFavoriteIds("not-json")).toEqual([]);
    expect(parseFavoriteIds(null)).toEqual([]);
  });
});
