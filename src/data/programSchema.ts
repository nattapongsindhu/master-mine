import { z } from "zod";
import type { Program } from "@/types/program";

const disciplineValues = ["Computer Science", "Software Engineering", "Computer Engineering", "Computer Systems Analysis", "Artificial Intelligence", "Machine Learning", "Human-Computer Interaction", "Data Science", "Data Analytics", "Data Engineering", "Database Systems", "Business Intelligence", "Cybersecurity", "Information Security", "Digital Forensics", "Cloud Security", "Cloud Computing", "Computer Networks", "DevOps / SRE", "Internet of Things", "Information Systems", "Management Information Systems", "IT Management", "Enterprise Architecture", "Health Informatics", "Bioinformatics", "Robotics", "FinTech", "Information Technology"] as const;
const fundingValues = ["Scholarship Available", "TA/RA Funding", "Fellowship", "None"] as const;
const rankingValues = ["Top 50", "Top 100", "Top 200"] as const;
const carnegieValues = ["R1", "R2", "Doctoral/Professional"] as const;

const validDateString = z.string().refine((value) => !Number.isNaN(Date.parse(value)), "must be a valid date string");
const baseProgramSchema = z.object({
  id: z.string().trim().min(1), university: z.string().trim().min(1), programName: z.string().trim().min(1), degree: z.string().trim().min(1),
  disciplines: z.array(z.enum(disciplineValues)).min(1), format: z.enum(["Online", "On-Campus", "Hybrid"]), city: z.string().trim().min(1).optional(), state: z.string().trim().min(1).optional(),
  totalTuitionUsd: z.number().finite().nonnegative(), tuitionIsEstimated: z.boolean(), fundingTypes: z.array(z.enum(fundingValues)).min(1), usNewsRank: z.number().int().positive(), rankingTier: z.enum(rankingValues), rankingSource: z.enum(["US News National Universities", "CSRankings"]),
  accreditationType: z.string().trim().min(1), accreditationAgency: z.string().trim().min(1), carnegieClass: z.enum(carnegieValues), qualityBadges: z.array(z.string().trim().min(1)), admissionRequirements: z.array(z.string().trim().min(1)), sourceUrl: z.string().url().refine((value) => new URL(value).protocol === "https:", "must use HTTPS"), tuitionNote: z.string().trim().min(1), lastVerified: validDateString,
  languageRequirements: z.object({ ielts: z.string().trim().min(1).optional(), toefl: z.string().trim().min(1).optional(), duolingo: z.string().trim().min(1).optional() }).optional(), greRequirement: z.enum(["Required", "Optional", "Not Required", "Unknown"]).optional(), intakes: z.array(z.enum(["Fall", "Spring", "Summer"])).optional(), applicationDeadlines: z.object({ fall: validDateString.optional(), spring: validDateString.optional(), summer: validDateString.optional() }).optional(), verificationStatus: z.enum(["Verified", "Estimated", "Needs Review"]).optional(), sourceLastChecked: validDateString.optional(),
});

export const programSchema = baseProgramSchema.superRefine((program, context) => {
  const expectedTier = program.usNewsRank <= 50 ? "Top 50" : program.usNewsRank <= 100 ? "Top 100" : program.usNewsRank <= 200 ? "Top 200" : null;
  if (expectedTier === null || program.rankingTier !== expectedTier) context.addIssue({ code: z.ZodIssueCode.custom, path: ["rankingTier"], message: "rankingTier is inconsistent with usNewsRank or outside Top 200" });
});

export function validatePrograms(input: unknown): Program[] {
  const records = z.array(programSchema).parse(input);
  const ids = new Set<string>();
  for (const record of records) {
    if (ids.has(record.id)) throw new Error(`Duplicate program id: ${record.id}`);
    ids.add(record.id);
  }
  return records;
}
