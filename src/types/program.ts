export type Discipline =
  | "Computer Science" | "Software Engineering" | "Computer Engineering" | "Computer Systems Analysis" | "Artificial Intelligence" | "Machine Learning" | "Human-Computer Interaction"
  | "Data Science" | "Data Analytics" | "Data Engineering" | "Database Systems" | "Business Intelligence"
  | "Cybersecurity" | "Information Security" | "Digital Forensics" | "Cloud Security"
  | "Cloud Computing" | "Computer Networks" | "DevOps / SRE" | "Internet of Things"
  | "Information Systems" | "Management Information Systems" | "IT Management" | "Enterprise Architecture"
  | "Health Informatics" | "Bioinformatics" | "Robotics" | "FinTech" | "Information Technology";
export type StudyFormat = "Online" | "On-Campus" | "Hybrid";
export type FundingType = "Scholarship Available" | "TA/RA Funding" | "Fellowship" | "None";
export type RankingTier = "Top 50" | "Top 100" | "Top 200" | "Not Ranked";
export type VerificationStatus = "Verified" | "Estimated" | "Needs Review";
export type CarnegieClass = "R1" | "R2" | "Doctoral/Professional" | "Master's";
export type RankingSource = "US News National Universities" | "CSRankings" | "Not Ranked";

export interface Program {
  id: string;
  university: string;
  programName: string;
  degree: string;
  disciplines: Discipline[];
  format: StudyFormat;
  city?: string;
  state?: string;
  totalTuitionUsd: number;
  tuitionIsEstimated: boolean;
  fundingTypes: FundingType[];
  usNewsRank: number | null;
  rankingTier: RankingTier;
  rankingSource: RankingSource;
  accreditationType: string;
  accreditationAgency: string;
  carnegieClass: CarnegieClass;
  qualityBadges: string[];
  admissionRequirements: string[];
  sourceUrl: string;
  tuitionNote: string;
  lastVerified: string;
  languageRequirements?: { ielts?: string; toefl?: string; duolingo?: string };
  greRequirement?: "Required" | "Optional" | "Not Required" | "Unknown";
  intakes?: ("Fall" | "Spring" | "Summer")[];
  applicationDeadlines?: { fall?: string; spring?: string; summer?: string };
  deadlineNote?: string;
  verificationStatus?: VerificationStatus;
  sourceLastChecked?: string;
}
