import type { Program } from "@/types/program";

// Canonical MVP dataset consumed by src/app/page.tsx. Tuition and ranking must
// be re-verified against the university and ranking publisher before production.
const basePrograms: Program[] = [
  {
    id: "gatech-omscs",
    university: "Georgia Institute of Technology",
    programName: "Online Master of Science in Computer Science (OMSCS)",
    degree: "M.S. Computer Science",
    disciplines: ["Computer Science", "Data Science", "Cybersecurity"],
    format: "Online", totalTuitionUsd: 7000, tuitionIsEstimated: true,
    fundingTypes: ["None"], usNewsRank: 33, rankingTier: "Top 50",
    rankingSource: "US News National Universities", accreditationType: "Regional Accreditation",
    accreditationAgency: "SACSCOC", carnegieClass: "R1",
    qualityBadges: ["US News Top 50", "R1 Research University"],
    admissionRequirements: ["Bachelor's degree", "Transcripts", "Statement of purpose", "English proficiency if applicable"],
    sourceUrl: "https://omscs.gatech.edu/", tuitionNote: "Estimated program tuition; verify current per-credit fees with Georgia Tech.", lastVerified: "2026-11"
  },
  {
    id: "utexas-ms-cso",
    university: "The University of Texas at Austin",
    programName: "Online Master of Science in Computer Science",
    degree: "M.S. Computer Science",
    disciplines: ["Computer Science", "Data Science", "Computer Systems Analysis"],
    format: "Online", totalTuitionUsd: 10500, tuitionIsEstimated: true,
    fundingTypes: ["None"], usNewsRank: 32, rankingTier: "Top 50",
    rankingSource: "US News National Universities", accreditationType: "Regional Accreditation",
    accreditationAgency: "SACSCOC", carnegieClass: "R1",
    qualityBadges: ["US News Top 50", "R1 Research University"],
    admissionRequirements: ["Bachelor's degree", "Calculus and programming preparation", "Transcripts", "Statement of purpose"],
    sourceUrl: "https://cdso.utexas.edu/mscs", tuitionNote: "Estimated total based on published online program pricing; verify before applying.", lastVerified: "2026-11"
  },
  {
    id: "illinois-mcs",
    university: "University of Illinois Urbana-Champaign",
    programName: "Online Master of Computer Science (MCS)",
    degree: "M.C.S. Computer Science",
    disciplines: ["Computer Science", "Data Science", "Cybersecurity"],
    format: "Online", totalTuitionUsd: 24000, tuitionIsEstimated: true,
    fundingTypes: ["None"], usNewsRank: 47, rankingTier: "Top 50",
    rankingSource: "US News National Universities", accreditationType: "Regional Accreditation",
    accreditationAgency: "HLC", carnegieClass: "R1",
    qualityBadges: ["US News Top 50", "R1 Research University"],
    admissionRequirements: ["Bachelor's degree", "Programming background", "Three letters of recommendation", "Statement of purpose"],
    sourceUrl: "https://cs.illinois.edu/academics/graduate/professional-mcs/online-master-computer-science", tuitionNote: "Estimated total tuition; fees and course load can change.", lastVerified: "2026-11"
  },
  {
    id: "asu-mscs-online",
    university: "Arizona State University",
    programName: "Online Master of Science in Computer Science",
    degree: "M.S. Computer Science",
    disciplines: ["Computer Science", "Data Analytics", "Cybersecurity"],
    format: "Online", totalTuitionUsd: 27000, tuitionIsEstimated: true,
    fundingTypes: ["Scholarship Available"], usNewsRank: 117, rankingTier: "Top 200",
    rankingSource: "US News National Universities", accreditationType: "Regional Accreditation",
    accreditationAgency: "HLC", carnegieClass: "R1",
    qualityBadges: ["US News Top 200", "R1 Research University"],
    admissionRequirements: ["Bachelor's degree", "Programming and statistics preparation", "Transcripts", "English proficiency if applicable"],
    sourceUrl: "https://degrees.apps.asu.edu/online-degree-programs/graduate/computer-science-ms", tuitionNote: "Estimated total for planning; ASU tuition varies by credits and student status.", lastVerified: "2026-11"
  },
  {
    id: "purdue-mscs-online",
    university: "Purdue University",
    programName: "Online Master of Computer Science",
    degree: "M.S. Computer Science",
    disciplines: ["Computer Science", "Data Science"], format: "Online", totalTuitionUsd: 25000, tuitionIsEstimated: true,
    fundingTypes: ["Scholarship Available", "TA/RA Funding"], usNewsRank: 46, rankingTier: "Top 50",
    rankingSource: "US News National Universities", accreditationType: "Regional Accreditation", accreditationAgency: "HLC", carnegieClass: "R1",
    qualityBadges: ["US News Top 50", "R1 Research University"],
    admissionRequirements: ["Bachelor's degree", "Computer science prerequisites", "Transcripts", "Three references"],
    sourceUrl: "https://www.cs.purdue.edu/graduate/online/", tuitionNote: "Estimated planning figure; confirm current online tuition and funding eligibility.", lastVerified: "2026-11"
  },
  {
    id: "northeastern-cyber",
    university: "Northeastern University",
    programName: "Master of Science in Cybersecurity",
    degree: "M.S. Cybersecurity",
    disciplines: ["Cybersecurity", "Information Technology"], format: "Online", totalTuitionUsd: 56000, tuitionIsEstimated: true,
    fundingTypes: ["Scholarship Available", "Fellowship"], usNewsRank: 54, rankingTier: "Top 100",
    rankingSource: "US News National Universities", accreditationType: "Regional Accreditation", accreditationAgency: "NECHE", carnegieClass: "R1",
    qualityBadges: ["US News Top 100", "R1 Research University"],
    admissionRequirements: ["Bachelor's degree", "Transcripts", "Resume", "Statement of purpose"],
    sourceUrl: "https://catalog.northeastern.edu/graduate/engineering/electrical-computer/cybersecurity/", tuitionNote: "Estimated total; Northeastern pricing depends on campus and course load.", lastVerified: "2026-11"
  },
  {
    id: "usc-mscs",
    university: "University of Southern California",
    programName: "Master of Science in Computer Science",
    degree: "M.S. Computer Science",
    disciplines: ["Computer Science", "Computer Engineering", "Data Science"], format: "On-Campus", city: "Los Angeles", state: "CA", totalTuitionUsd: 78000, tuitionIsEstimated: true,
    fundingTypes: ["TA/RA Funding", "Fellowship"], usNewsRank: 28, rankingTier: "Top 50",
    rankingSource: "US News National Universities", accreditationType: "Regional Accreditation", accreditationAgency: "WSCUC", carnegieClass: "R1",
    qualityBadges: ["US News Top 50", "R1 Research University"],
    admissionRequirements: ["Bachelor's degree", "GRE not generally required", "Transcripts", "Three letters of recommendation"],
    sourceUrl: "https://viterbischool.usc.edu/academics/masters/computer-science/", tuitionNote: "Estimated tuition excluding living costs; verify USC fee schedule.", lastVerified: "2026-11"
  },
  {
    id: "columbia-mscs",
    university: "Columbia University",
    programName: "Master of Science in Computer Science",
    degree: "M.S. Computer Science",
    disciplines: ["Computer Science", "Computer Systems Analysis"], format: "On-Campus", city: "New York", state: "NY", totalTuitionUsd: 95000, tuitionIsEstimated: true,
    fundingTypes: ["Fellowship"], usNewsRank: 13, rankingTier: "Top 50",
    rankingSource: "US News National Universities", accreditationType: "Regional Accreditation", accreditationAgency: "MSCHE", carnegieClass: "R1",
    qualityBadges: ["US News Top 50", "R1 Research University"],
    admissionRequirements: ["Bachelor's degree", "Programming and mathematics background", "Transcripts", "Three recommendations"],
    sourceUrl: "https://www.cs.columbia.edu/education/ms/", tuitionNote: "Estimated total tuition excluding living costs; verify Columbia's current rates.", lastVerified: "2026-11"
  }
];

const programMetadata: Record<string, Pick<Program, "languageRequirements" | "greRequirement" | "intakes" | "applicationDeadlines" | "verificationStatus" | "sourceLastChecked">> = {
  "gatech-omscs": { languageRequirements: { ielts: "7.0", toefl: "95" }, greRequirement: "Not Required", intakes: ["Fall", "Spring"], applicationDeadlines: { fall: "2027-03-15", spring: "2026-09-15" }, verificationStatus: "Estimated", sourceLastChecked: "2026-11" },
  "utexas-ms-cso": { languageRequirements: { ielts: "6.5", toefl: "79" }, greRequirement: "Not Required", intakes: ["Fall", "Spring"], applicationDeadlines: { fall: "2027-03-15", spring: "2026-09-15" }, verificationStatus: "Estimated", sourceLastChecked: "2026-11" },
  "illinois-mcs": { languageRequirements: { ielts: "6.5", toefl: "103" }, greRequirement: "Not Required", intakes: ["Fall", "Spring"], applicationDeadlines: { fall: "2027-01-15", spring: "2026-09-15" }, verificationStatus: "Estimated", sourceLastChecked: "2026-11" },
  "asu-mscs-online": { languageRequirements: { ielts: "6.5", toefl: "80" }, greRequirement: "Not Required", intakes: ["Fall", "Spring", "Summer"], applicationDeadlines: { fall: "2027-07-15", spring: "2026-11-15", summer: "2027-03-15" }, verificationStatus: "Estimated", sourceLastChecked: "2026-11" },
  "purdue-mscs-online": { languageRequirements: { ielts: "6.5", toefl: "80" }, greRequirement: "Not Required", intakes: ["Fall", "Spring"], applicationDeadlines: { fall: "2027-01-15", spring: "2026-09-15" }, verificationStatus: "Estimated", sourceLastChecked: "2026-11" },
  "northeastern-cyber": { languageRequirements: { ielts: "6.5", toefl: "79" }, greRequirement: "Not Required", intakes: ["Fall", "Spring", "Summer"], applicationDeadlines: { fall: "2027-07-01", spring: "2026-11-01", summer: "2027-03-01" }, verificationStatus: "Estimated", sourceLastChecked: "2026-11" },
  "usc-mscs": { languageRequirements: { ielts: "7.0", toefl: "100" }, greRequirement: "Not Required", intakes: ["Fall", "Spring"], applicationDeadlines: { fall: "2026-12-15", spring: "2026-09-15" }, verificationStatus: "Estimated", sourceLastChecked: "2026-11" },
  "columbia-mscs": { languageRequirements: { ielts: "7.5", toefl: "105" }, greRequirement: "Not Required", intakes: ["Fall"], applicationDeadlines: { fall: "2026-12-01" }, verificationStatus: "Estimated", sourceLastChecked: "2026-11" },
};

export const programs: Program[] = basePrograms.map((program) => ({ ...program, ...programMetadata[program.id] }));
