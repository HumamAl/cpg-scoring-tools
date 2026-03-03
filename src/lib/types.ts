import type { LucideIcon } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// CPG Scoring Tools — TypeScript Interfaces
// Authoritative type definitions. All downstream builders import from here.
// Vocabulary is CPG marketing consultancy — not generic SaaS terms.
// ─────────────────────────────────────────────────────────────────────────────

// ─── Sidebar navigation (kept from template — used by layout builder) ────────

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

// ─── Challenge visualization types (kept from template) ─────────────────────

export type VisualizationType =
  | "flow"
  | "before-after"
  | "metrics"
  | "architecture"
  | "risk-matrix"
  | "timeline"
  | "dual-kpi"
  | "tech-stack"
  | "decision-flow";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  visualizationType: VisualizationType;
  outcome?: string;
}

// ─── Proposal types (kept from template) ────────────────────────────────────

export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  approach: { title: string; description: string }[];
  skillCategories: { name: string; skills: string[] }[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  relevance?: string;
  outcome?: string;
  liveUrl?: string;
}

// ─── Screen definition for frame-based demo formats ─────────────────────────

export interface DemoScreen {
  id: string;
  label: string;
  icon?: LucideIcon;
  href: string;
}

export type ConversionVariant = "sidebar" | "inline" | "floating" | "banner";

// ─────────────────────────────────────────────────────────────────────────────
// CPG-SPECIFIC TYPES BEGIN HERE
// ─────────────────────────────────────────────────────────────────────────────

// ─── Enumerations ────────────────────────────────────────────────────────────

/** Which of the two AI-powered scoring tools was used for this run */
export type ScoringToolType = "campaign_brief_scorer" | "brand_health_scorer";

/**
 * Status of a scoring run — uses exact client vocabulary from DOMAIN.md.
 * "Scoring" = AI processing in progress
 * "Scored" = AI complete, pending consultant review
 * "Under Review" = consultant is reviewing the scorecard
 * "Delivered" = scorecard has been sent to the brand client
 * "Archived" = run closed/stored for historical reference
 * "Incomplete Brief" = brief submission was missing required sections
 * "Flagged" = requires human attention (conflicting claims, stale data, etc.)
 */
export type ScoringRunStatus =
  | "Scoring"
  | "Scored"
  | "Under Review"
  | "Delivered"
  | "Archived"
  | "Incomplete Brief"
  | "Flagged";

/**
 * Score tier thresholds — exact values from client vocabulary.
 * Excellent 90-100 / Strong 75-89 / Adequate 60-74 / Needs Work 40-59 / Critical 0-39
 */
export type ScoreTier = "Excellent" | "Strong" | "Adequate" | "Needs Work" | "Critical";

/** CPG product categories managed by the consultancy */
export type BrandCategory =
  | "beverages"
  | "snacks"
  | "personal_care"
  | "pet"
  | "nutrition"
  | "dairy"
  | "household"
  | "baby_care"
  | "confections";

/** Brand health trajectory vs. prior scoring run */
export type BrandHealthTrend = "improving" | "stable" | "declining" | "new_account";

/** Retail channel designations — uses syndicated data vocabulary */
export type RetailChannel = "MULO" | "Food" | "Drug" | "Club" | "Dollar" | "Convenience" | "eCommerce";

/** Campaign type — determines which scoring rubric is applied */
export type CampaignType =
  | "national_tv_digital_360"
  | "in_store_activation"
  | "trade_promotion"
  | "product_launch"
  | "brand_awareness"
  | "performance_digital"
  | "shopper_marketing";

/** Scoring dimension type — which tool the dimension belongs to */
export type DimensionToolType = "campaign_brief_scorer" | "brand_health_scorer" | "both";

/** Status for a dimension with missing input data */
export type DimensionDataStatus = "scored" | "insufficient_data" | "not_applicable";

// ─── Core Entities ────────────────────────────────────────────────────────────

/**
 * A brand account — the consultancy's client brands (CPG manufacturers).
 * Named "brand account" not "client" per domain vocabulary.
 */
export interface BrandAccount {
  id: string;                          // "ba_krc44"
  companyName: string;                 // e.g., "Kestrel Ridge Foods"
  /** Internal shorthand used in briefing docs and scorecard headers */
  brandShortName: string;
  category: BrandCategory;
  /** Composite brand equity metric — 0 to 100 */
  brandHealthIndex: number;
  /** Change in Brand Health Index vs. previous scoring run */
  healthIndexChange: number;
  healthTrend: BrandHealthTrend;
  /** Weighted distribution rate — % ACV (All Commodity Volume) */
  distributionAcv: number;             // e.g., 73.4
  /** Key retail channel where brand has highest velocity */
  primaryChannel: RetailChannel;
  accountStatus: "active" | "at_risk" | "new_onboard" | "paused";
  activeConsultantId: string;          // references Consultant.id
  totalScoringRuns: number;
  lastScoredAt: string;                // ISO date string
  onboardedAt: string;                 // ISO date string
  /** Market share by volume in primary category */
  marketSharePct?: number;
  /** Current Share of Voice as % of category ad spend */
  sovPct?: number;
  /**
   * SOV vs. SOM flag — if SOV > SOM, brand is on a growth trajectory.
   * Based on the Ehrenberg-Bass model used by P&G and Unilever.
   */
  sovSomFlag?: "excess_sov" | "parity" | "sov_deficit" | null;
}

/**
 * A consultant on the internal team — runs scoring sessions and delivers scorecards.
 * Named "consultant" not "user" per domain vocabulary.
 */
export interface Consultant {
  id: string;                          // "cns_mf001"
  name: string;
  role:
    | "Senior Brand Consultant"
    | "Insights Director"
    | "Category Strategy Lead"
    | "Account Director"
    | "Brand Analytics Manager"
    | "Shopper Marketing Consultant"
    | "Trade Strategy Analyst"
    | "Brand Health Lead"
    | "Digital Commerce Consultant"
    | "Research & Insights Associate";
  /** Number of completed scoring runs this consultant has delivered */
  scoringRunsCompleted: number;
  /** Number of scoring runs currently active (status Scoring/Scored/Under Review) */
  scoringRunsActive: number;
  /** Brand accounts this consultant is primary on */
  brandAccountIds: string[];           // references BrandAccount.id[]
  joinedAt: string;                    // ISO date string
  /** Average scorecard rating from brand clients — 1 to 5 */
  avgClientRating: number;
}

/**
 * A flag raised by the AI during scoring — surfaces critical issues.
 * The most important edge case: high overall score with a critical failing dimension.
 */
export interface ScoringFlag {
  flagType:
    | "critical_dimension"
    | "conflicting_claim"
    | "incomplete_brief"
    | "stale_data"
    | "insufficient_data"
    | "claim_accuracy";
  severity: "critical" | "warning" | "info";
  /** Which scoring dimension triggered this flag */
  dimensionName?: string;
  message: string;
}

/**
 * A single scoring run — one invocation of an AI scoring tool on a brief or brand data.
 * Named "scoring run" not "analysis" per domain vocabulary.
 */
export interface ScoringRun {
  id: string;                          // "run_7x4k2"
  /** Human-readable run identifier shown in the UI */
  runRef: string;                      // "RUN-2847"
  brandAccountId: string;              // references BrandAccount.id
  toolType: ScoringToolType;
  status: ScoringRunStatus;
  /** The name of the brief or submission being evaluated */
  briefTitle: string;
  campaignType?: CampaignType;         // only for campaign_brief_scorer
  /** Overall composite score — 0 to 100 */
  overallScore: number | null;         // null while status === "Scoring" or "Incomplete Brief"
  scoreTier: ScoreTier | null;         // null while score is null
  consultantId: string;                // references Consultant.id
  /** Period notation (CPG uses 4-week periods) */
  scoringPeriod: string;               // "P3 2026"
  /** Flags raised by the AI — critical issues that override overall score */
  flags: ScoringFlag[];
  createdAt: string;
  scoredAt: string | null;             // null while Scoring/Incomplete
  deliveredAt: string | null;          // non-null only when status === "Delivered"
  /** If this is a re-score, reference the prior run */
  priorRunId?: string | null;
  /** Score delta vs. prior run (positive = improved) */
  scoreDeltaVsPrior?: number | null;
}

/**
 * A scoring dimension — one evaluation criterion within a tool's rubric.
 * Named "dimension" not "category" per domain vocabulary.
 */
export interface ScoringDimension {
  id: string;                          // "dim_ta001"
  name: string;                        // e.g., "Target Audience Clarity"
  toolType: DimensionToolType;
  /** Weighting in the composite score — weights sum to 100 within a tool */
  weight: number;
  description: string;
  /** Grouping label within the tool's rubric */
  pillar: string;
}

/**
 * A single dimension score within a scorecard — per-dimension AI output.
 */
export interface DimensionScore {
  dimensionId: string;                 // references ScoringDimension.id
  dimensionName: string;
  score: number | null;                // null when dataStatus !== "scored"
  dataStatus: DimensionDataStatus;
  /** Weight of this dimension in the composite score */
  weight: number;
  /** AI-generated rationale for this dimension's score */
  aiRationale: string;
  /** Specific AI recommendations to improve this dimension */
  recommendations: string[];
  /** True when this dimension score is critically low while overall score is high */
  isCriticalFlag: boolean;
}

/**
 * A full scorecard — the structured AI output for a completed scoring run.
 * Named "scorecard" not "report" per domain vocabulary.
 */
export interface Scorecard {
  id: string;                          // "sc_8m3p1"
  scoringRunId: string;               // references ScoringRun.id
  brandAccountId: string;             // references BrandAccount.id
  toolType: ScoringToolType;
  overallScore: number;
  scoreTier: ScoreTier;
  /** Per-dimension breakdown — 6-8 items depending on tool type */
  dimensionScores: DimensionScore[];
  /** AI-generated executive summary */
  executiveSummary: string;
  /** Top priority recommendations (max 3) */
  topRecommendations: string[];
  /**
   * Category benchmark for contextualization.
   * Format: "Category average: 64 — Top quartile: 82"
   */
  categoryBenchmark: string;
  scoredAt: string;
  /** Score improvement vs. prior run version (positive = improved) */
  improvementVsPrior?: number | null;
  flags: ScoringFlag[];
}

// ─── Dashboard & Chart Types ──────────────────────────────────────────────────

/**
 * KPI stats for the portfolio overview dashboard.
 * Labels use CPG consultancy domain vocabulary.
 */
export interface DashboardStats {
  /** Total scoring runs completed (all time) */
  scoringRunsTotal: number;
  /** % change vs. prior 30-day period */
  scoringRunsChange: number;
  /** Average overall score across all completed runs this period */
  avgScorecardScore: number;
  avgScoreChange: number;
  /** Total scorecards in "Delivered" status this period */
  scorecardsDelivered: number;
  scorecardsDeliveredChange: number;
  /** Active brand accounts (status !== "paused") */
  activeBrandAccounts: number;
  brandAccountsChange: number;
  /** Runs currently flagged (status "Flagged" or "Incomplete Brief") */
  flaggedRuns: number;
  flaggedRunsChange: number;
  /** Average % ACV distribution across active brand portfolio */
  avgPortfolioAcv: number;
  avgPortfolioAcvChange: number;
}

/** Monthly scoring activity — primary time-series chart */
export interface ScoringVolumeByPeriod {
  /** CPG 4-week period label: "P1 2026" */
  period: string;
  /** Shortened label for chart axis */
  label: string;
  scoringRuns: number;
  /** Average overall score for runs completed in this period */
  avgScore: number;
  /** Runs delivered to brand clients */
  delivered: number;
}

/** Score distribution — categorical chart showing tier breakdown */
export interface ScoreTierDistribution {
  tier: ScoreTier;
  count: number;
  /** % of total completed runs */
  pct: number;
  colorKey: "excellent" | "strong" | "adequate" | "needs_work" | "critical";
}

/** Brand health index trend — line chart showing portfolio average over time */
export interface BrandHealthTrendPoint {
  period: string;
  label: string;
  avgHealthIndex: number;
  /** Number of brand accounts included in this period's average */
  accountCount: number;
  /** Count of brands that declined this period */
  decliningCount: number;
}

/** Recent scoring activity — feed items for the live scorecard feed panel */
export interface ScoringActivityFeedItem {
  runId: string;
  runRef: string;
  brandName: string;
  toolLabel: string;
  overallScore: number | null;
  scoreTier: ScoreTier | null;
  status: ScoringRunStatus;
  consultantName: string;
  relativeTime: string;
  hasFlag: boolean;
}

// ─── Filter + UI State Types ──────────────────────────────────────────────────

/** Available filter options for the Scorecard Archive feature page */
export interface ScorecardArchiveFilters {
  toolType: ScoringToolType | "all";
  status: ScoringRunStatus | "all";
  scoreTier: ScoreTier | "all";
  brandAccountId: string | "all";
  consultantId: string | "all";
  dateRange: "last_30" | "last_90" | "last_period" | "all_time";
}

/** Table column definition for the scoring runs table */
export interface ScoringRunTableColumn {
  key: keyof ScoringRun | "brandName" | "consultantName" | "toolLabel";
  label: string;
  align: "left" | "right" | "center";
  sortable: boolean;
}
