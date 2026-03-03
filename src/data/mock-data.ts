// ─────────────────────────────────────────────────────────────────────────────
// CPG Scoring Tools — Mock Data
// Domain: CPG marketing consultancy, AI-powered scoring tools
// Vocabulary: scoring run / scorecard / brief / brand account / dimension
// ─────────────────────────────────────────────────────────────────────────────

import type {
  BrandAccount,
  Consultant,
  ScoringRun,
  ScoringDimension,
  Scorecard,
  DashboardStats,
  ScoringVolumeByPeriod,
  ScoreTierDistribution,
  BrandHealthTrendPoint,
  ScoringActivityFeedItem,
} from "@/lib/types";

// ─────────────────────────────────────────────────────────────────────────────
// DATASET 1: BRAND ACCOUNTS (12 CPG client brands)
// ─────────────────────────────────────────────────────────────────────────────

export const brandAccounts: BrandAccount[] = [
  {
    id: "ba_krc44",
    companyName: "Kestrel Ridge Foods",
    brandShortName: "Kestrel Ridge",
    category: "snacks",
    brandHealthIndex: 74.3,
    healthIndexChange: +5.2,
    healthTrend: "improving",
    distributionAcv: 68.7,
    primaryChannel: "MULO",
    accountStatus: "active",
    activeConsultantId: "cns_mf001",
    totalScoringRuns: 14,
    lastScoredAt: "2026-02-18T10:14:22Z",
    onboardedAt: "2024-03-11T09:00:00Z",
    marketSharePct: 8.4,
    sovPct: 11.2,
    sovSomFlag: "excess_sov",
  },
  {
    id: "ba_msc87",
    companyName: "Meridian Snacks Co.",
    brandShortName: "Meridian Snacks",
    category: "snacks",
    brandHealthIndex: 58.1,
    healthIndexChange: -15.8,
    healthTrend: "declining",        // EDGE CASE: dropped >15 pts — dashboard alert
    distributionAcv: 42.3,
    primaryChannel: "Food",
    accountStatus: "at_risk",
    activeConsultantId: "cns_ak008",
    totalScoringRuns: 8,
    lastScoredAt: "2026-02-07T14:33:09Z",
    onboardedAt: "2024-09-04T09:00:00Z",
    marketSharePct: 4.1,
    sovPct: 3.7,
    sovSomFlag: "sov_deficit",
  },
  {
    id: "ba_blb29",
    companyName: "Brightleaf Beverages",
    brandShortName: "Brightleaf",
    category: "beverages",
    brandHealthIndex: 82.6,
    healthIndexChange: +3.4,
    healthTrend: "improving",
    distributionAcv: 81.4,
    primaryChannel: "MULO",
    accountStatus: "active",
    activeConsultantId: "cns_dc005",
    totalScoringRuns: 22,
    lastScoredAt: "2026-02-24T09:47:55Z",
    onboardedAt: "2023-07-19T09:00:00Z",
    marketSharePct: 14.7,
    sovPct: 16.3,
    sovSomFlag: "excess_sov",
  },
  {
    id: "ba_spc11",
    companyName: "Stonecroft Personal Care",
    brandShortName: "Stonecroft",
    category: "personal_care",
    brandHealthIndex: 67.9,
    healthIndexChange: +1.1,
    healthTrend: "stable",
    distributionAcv: 59.2,
    primaryChannel: "Drug",
    accountStatus: "active",
    activeConsultantId: "cns_sr006",
    totalScoringRuns: 11,
    lastScoredAt: "2026-01-30T11:22:48Z",
    onboardedAt: "2024-01-08T09:00:00Z",
    marketSharePct: 7.3,
    sovPct: 7.4,
    sovSomFlag: "parity",
  },
  {
    id: "ba_iwn53",
    companyName: "Ironwood Nutrition",
    brandShortName: "Ironwood",
    category: "nutrition",
    brandHealthIndex: 88.4,
    healthIndexChange: +6.8,
    healthTrend: "improving",
    distributionAcv: 73.1,
    primaryChannel: "Club",
    accountStatus: "active",
    activeConsultantId: "cns_mf001",
    totalScoringRuns: 19,
    lastScoredAt: "2026-02-20T15:04:31Z",
    onboardedAt: "2023-02-14T09:00:00Z",
    marketSharePct: 22.8,
    sovPct: 26.4,
    sovSomFlag: "excess_sov",
  },
  {
    id: "ba_hbh67",
    companyName: "Harbor Bay Household Products",
    brandShortName: "Harbor Bay",
    category: "household",
    brandHealthIndex: 63.5,
    healthIndexChange: -2.7,
    healthTrend: "declining",
    distributionAcv: 55.8,
    primaryChannel: "MULO",
    accountStatus: "active",
    activeConsultantId: "cns_mw007",
    totalScoringRuns: 7,
    lastScoredAt: "2026-01-22T08:55:14Z",
    onboardedAt: "2024-06-03T09:00:00Z",
    marketSharePct: 5.9,
    sovPct: 5.1,
    sovSomFlag: "sov_deficit",
  },
  {
    id: "ba_clp39",
    companyName: "Clearview Pet Co.",
    brandShortName: "Clearview Pet",
    category: "pet",
    brandHealthIndex: 76.2,
    healthIndexChange: +2.3,
    healthTrend: "stable",
    distributionAcv: 64.9,
    primaryChannel: "MULO",
    accountStatus: "active",
    activeConsultantId: "cns_tb009",
    totalScoringRuns: 13,
    lastScoredAt: "2026-02-11T13:19:07Z",
    onboardedAt: "2023-11-27T09:00:00Z",
    marketSharePct: 10.3,
    sovPct: 9.8,
    sovSomFlag: "parity",
  },
  {
    id: "ba_sog72",
    companyName: "Summit Organics Group",
    brandShortName: "Summit Organics",
    category: "snacks",
    brandHealthIndex: 91.2,
    healthIndexChange: +8.1,
    healthTrend: "improving",
    distributionAcv: 38.4,              // Regional challenger — lower ACV
    primaryChannel: "Food",
    accountStatus: "active",
    activeConsultantId: "cns_pn002",
    totalScoringRuns: 9,
    lastScoredAt: "2026-02-26T16:30:42Z",
    onboardedAt: "2024-10-15T09:00:00Z",
    marketSharePct: 3.2,
    sovPct: 5.6,
    sovSomFlag: "excess_sov",
  },
  {
    id: "ba_rdb15",
    companyName: "Redfield Dairy Brands",
    brandShortName: "Redfield Dairy",
    category: "dairy",
    brandHealthIndex: 71.8,
    healthIndexChange: +0.4,
    healthTrend: "stable",
    distributionAcv: 77.6,
    primaryChannel: "Food",
    accountStatus: "active",
    activeConsultantId: "cns_jo003",
    totalScoringRuns: 16,
    lastScoredAt: "2026-02-14T10:41:19Z",
    onboardedAt: "2022-08-22T09:00:00Z",
    marketSharePct: 12.1,
    sovPct: 11.7,
    sovSomFlag: "parity",
  },
  {
    id: "ba_chw84",
    companyName: "Cascade Home & Wellness",
    brandShortName: "Cascade H&W",
    category: "household",
    brandHealthIndex: 54.7,
    healthIndexChange: -9.3,
    healthTrend: "declining",
    distributionAcv: 31.2,
    primaryChannel: "Drug",
    accountStatus: "at_risk",
    activeConsultantId: "cns_ls004",
    totalScoringRuns: 5,
    lastScoredAt: "2026-01-16T14:07:33Z",
    onboardedAt: "2025-04-29T09:00:00Z",
    marketSharePct: 2.8,
    sovPct: 2.1,
    sovSomFlag: "sov_deficit",
  },
  {
    id: "ba_ngc21",
    companyName: "Northgate Confections",
    brandShortName: "Northgate",
    category: "confections",
    brandHealthIndex: 79.4,
    healthIndexChange: +4.6,
    healthTrend: "improving",
    distributionAcv: 84.3,
    primaryChannel: "MULO",
    accountStatus: "active",
    activeConsultantId: "cns_dc005",
    totalScoringRuns: 18,
    lastScoredAt: "2026-02-22T11:58:06Z",
    onboardedAt: "2023-05-10T09:00:00Z",
    marketSharePct: 18.6,
    sovPct: 21.4,
    sovSomFlag: "excess_sov",
  },
  {
    id: "ba_obc98",
    companyName: "Oakhaven Baby Care",
    brandShortName: "Oakhaven",
    category: "baby_care",
    brandHealthIndex: 0,               // EDGE CASE: new account, no health data yet
    healthIndexChange: 0,
    healthTrend: "new_account",
    distributionAcv: 0,
    primaryChannel: "Drug",
    accountStatus: "new_onboard",
    activeConsultantId: "cns_yt010",
    totalScoringRuns: 1,
    lastScoredAt: "2026-02-28T09:12:00Z",
    onboardedAt: "2026-02-10T09:00:00Z",
    marketSharePct: undefined,
    sovPct: undefined,
    sovSomFlag: null,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// DATASET 2: CONSULTANTS (10 team members)
// ─────────────────────────────────────────────────────────────────────────────

export const consultants: Consultant[] = [
  { id: "cns_mf001", name: "Morgan Farrell",      role: "Senior Brand Consultant",           scoringRunsCompleted: 47, scoringRunsActive: 3, brandAccountIds: ["ba_krc44", "ba_iwn53"], joinedAt: "2022-04-12T09:00:00Z", avgClientRating: 4.8 },
  { id: "cns_pn002", name: "Priya Nair",           role: "Insights Director",                 scoringRunsCompleted: 91, scoringRunsActive: 2, brandAccountIds: ["ba_sog72"],             joinedAt: "2021-09-06T09:00:00Z", avgClientRating: 4.9 },
  { id: "cns_jo003", name: "James Okafor",         role: "Category Strategy Lead",            scoringRunsCompleted: 62, scoringRunsActive: 1, brandAccountIds: ["ba_rdb15"],             joinedAt: "2022-01-17T09:00:00Z", avgClientRating: 4.7 },
  { id: "cns_ls004", name: "Lauren Szczepanski",   role: "Account Director",                  scoringRunsCompleted: 38, scoringRunsActive: 2, brandAccountIds: ["ba_chw84"],             joinedAt: "2023-03-20T09:00:00Z", avgClientRating: 4.6 },
  { id: "cns_dc005", name: "David Chen",           role: "Brand Analytics Manager",           scoringRunsCompleted: 55, scoringRunsActive: 4, brandAccountIds: ["ba_blb29", "ba_ngc21"], joinedAt: "2022-07-11T09:00:00Z", avgClientRating: 4.8 },
  { id: "cns_sr006", name: "Sofia Reyes",          role: "Shopper Marketing Consultant",      scoringRunsCompleted: 29, scoringRunsActive: 1, brandAccountIds: ["ba_spc11"],             joinedAt: "2023-10-02T09:00:00Z", avgClientRating: 4.5 },
  { id: "cns_mw007", name: "Marcus Webb",          role: "Trade Strategy Analyst",            scoringRunsCompleted: 22, scoringRunsActive: 2, brandAccountIds: ["ba_hbh67"],             joinedAt: "2024-02-05T09:00:00Z", avgClientRating: 4.4 },
  { id: "cns_ak008", name: "Anita Kowalski",       role: "Brand Health Lead",                 scoringRunsCompleted: 44, scoringRunsActive: 2, brandAccountIds: ["ba_msc87"],             joinedAt: "2022-11-14T09:00:00Z", avgClientRating: 4.7 },
  { id: "cns_tb009", name: "Tyler Broderick",      role: "Digital Commerce Consultant",       scoringRunsCompleted: 33, scoringRunsActive: 1, brandAccountIds: ["ba_clp39"],             joinedAt: "2023-06-19T09:00:00Z", avgClientRating: 4.6 },
  { id: "cns_yt010", name: "Yuki Tanaka",          role: "Research & Insights Associate",     scoringRunsCompleted: 11, scoringRunsActive: 1, brandAccountIds: ["ba_obc98"],             joinedAt: "2025-08-25T09:00:00Z", avgClientRating: 4.3 },
];

// ─────────────────────────────────────────────────────────────────────────────
// DATASET 3: SCORING RUNS (18 records)
// Distribution: ~50% Delivered, ~17% Under Review, ~11% Scored,
//               ~6% Scoring, ~6% Incomplete Brief, ~6% Flagged, ~11% Archived
// ─────────────────────────────────────────────────────────────────────────────

export const scoringRuns: ScoringRun[] = [
  // DELIVERED
  { id: "run_7x4k2", runRef: "RUN-2847", brandAccountId: "ba_blb29",  toolType: "campaign_brief_scorer", status: "Delivered",        briefTitle: "Summer Reset — National TV + Digital 360",               campaignType: "national_tv_digital_360", overallScore: 84, scoreTier: "Strong",     consultantId: "cns_dc005", scoringPeriod: "P2 2026", flags: [], createdAt: "2026-02-17T08:30:14Z", scoredAt: "2026-02-17T08:54:38Z", deliveredAt: "2026-02-18T10:22:00Z", priorRunId: null, scoreDeltaVsPrior: null },
  { id: "run_9p2m8", runRef: "RUN-2841", brandAccountId: "ba_krc44",  toolType: "brand_health_scorer",   status: "Delivered",        briefTitle: "Kestrel Ridge Brand Health — P1 2026 Review",            overallScore: 74, scoreTier: "Adequate",   consultantId: "cns_mf001", scoringPeriod: "P1 2026", flags: [], createdAt: "2026-02-04T11:07:29Z", scoredAt: "2026-02-04T11:31:55Z", deliveredAt: "2026-02-06T09:15:00Z", priorRunId: "run_4t8r1", scoreDeltaVsPrior: +7 },
  { id: "run_3n9s5", runRef: "RUN-2831", brandAccountId: "ba_ngc21",  toolType: "campaign_brief_scorer", status: "Delivered",        briefTitle: "Q4 Shelf Capture — In-Store Activation + FSI",           campaignType: "in_store_activation",     overallScore: 91, scoreTier: "Excellent",  consultantId: "cns_dc005", scoringPeriod: "P1 2026", flags: [], createdAt: "2026-01-28T09:44:11Z", scoredAt: "2026-01-28T10:09:43Z", deliveredAt: "2026-01-30T14:00:00Z", priorRunId: null, scoreDeltaVsPrior: null },
  { id: "run_6c1j7", runRef: "RUN-2818", brandAccountId: "ba_iwn53",  toolType: "campaign_brief_scorer", status: "Delivered",        briefTitle: "New Year, New You — Product Launch Digital",              campaignType: "product_launch",          overallScore: 88, scoreTier: "Strong",     consultantId: "cns_mf001", scoringPeriod: "P1 2026", flags: [], createdAt: "2026-01-14T14:21:03Z", scoredAt: "2026-01-14T14:48:19Z", deliveredAt: "2026-01-16T11:30:00Z", priorRunId: null, scoreDeltaVsPrior: null },
  { id: "run_2b5v9", runRef: "RUN-2809", brandAccountId: "ba_rdb15",  toolType: "brand_health_scorer",   status: "Delivered",        briefTitle: "Redfield Dairy — P12 2025 Annual Brand Review",          overallScore: 72, scoreTier: "Adequate",   consultantId: "cns_jo003", scoringPeriod: "P12 2025", flags: [], createdAt: "2025-12-18T10:05:44Z", scoredAt: "2025-12-18T10:33:17Z", deliveredAt: "2025-12-20T09:00:00Z", priorRunId: "run_8q3f6", scoreDeltaVsPrior: +2 },
  { id: "run_5f8h3", runRef: "RUN-2799", brandAccountId: "ba_sog72",  toolType: "campaign_brief_scorer", status: "Delivered",        briefTitle: "Organic Snack Launch — Shopper Marketing + Trade",        campaignType: "shopper_marketing",       overallScore: 96, scoreTier: "Excellent",  consultantId: "cns_pn002", scoringPeriod: "P12 2025", flags: [], createdAt: "2025-12-10T13:14:28Z", scoredAt: "2025-12-10T13:38:52Z", deliveredAt: "2025-12-12T15:45:00Z", priorRunId: null, scoreDeltaVsPrior: null },
  { id: "run_1d6w4", runRef: "RUN-2791", brandAccountId: "ba_clp39",  toolType: "brand_health_scorer",   status: "Delivered",        briefTitle: "Clearview Pet — P11 2025 Brand Health Check",            overallScore: 76, scoreTier: "Strong",     consultantId: "cns_tb009", scoringPeriod: "P11 2025", flags: [], createdAt: "2025-11-24T09:30:00Z", scoredAt: "2025-11-24T09:57:22Z", deliveredAt: "2025-11-26T10:00:00Z", priorRunId: null, scoreDeltaVsPrior: null },
  // Re-score: brief revised, improved 64→78
  { id: "run_r6u2z", runRef: "RUN-2838", brandAccountId: "ba_msc87",  toolType: "campaign_brief_scorer", status: "Delivered",        briefTitle: "Meridian Trail Mix — Summer Activation (Rev. 2)",         campaignType: "in_store_activation",     overallScore: 78, scoreTier: "Strong",     consultantId: "cns_ak008", scoringPeriod: "P1 2026", flags: [], createdAt: "2026-02-10T16:14:09Z", scoredAt: "2026-02-10T16:41:33Z", deliveredAt: "2026-02-12T10:00:00Z", priorRunId: "run_p5n3x", scoreDeltaVsPrior: +14 },
  // ARCHIVED
  { id: "run_8q3f6", runRef: "RUN-2782", brandAccountId: "ba_rdb15",  toolType: "brand_health_scorer",   status: "Archived",         briefTitle: "Redfield Dairy — P10 2025 Brand Health Check",           overallScore: 70, scoreTier: "Adequate",   consultantId: "cns_jo003", scoringPeriod: "P10 2025", flags: [], createdAt: "2025-10-28T11:22:00Z", scoredAt: "2025-10-28T11:49:41Z", deliveredAt: "2025-10-30T14:30:00Z", priorRunId: null, scoreDeltaVsPrior: null },
  { id: "run_4t8r1", runRef: "RUN-2771", brandAccountId: "ba_krc44",  toolType: "brand_health_scorer",   status: "Archived",         briefTitle: "Kestrel Ridge Brand Health — P9 2025",                   overallScore: 67, scoreTier: "Adequate",   consultantId: "cns_mf001", scoringPeriod: "P9 2025",  flags: [], createdAt: "2025-09-29T10:04:17Z", scoredAt: "2025-09-29T10:30:08Z", deliveredAt: "2025-10-02T09:00:00Z", priorRunId: null, scoreDeltaVsPrior: null },
  // UNDER REVIEW
  {
    id: "run_0e7n3", runRef: "RUN-2856", brandAccountId: "ba_msc87", toolType: "brand_health_scorer", status: "Under Review",
    briefTitle: "Meridian Snacks — P2 2026 Brand Health Assessment",
    overallScore: 58, scoreTier: "Needs Work", consultantId: "cns_ak008", scoringPeriod: "P2 2026",
    flags: [{ flagType: "critical_dimension", severity: "critical", dimensionName: "Share of Voice / Market Share Ratio", message: "SOV-SOM deficit widened to -0.4 — systematic underinvestment predicts further market share erosion." }],
    createdAt: "2026-02-24T15:38:00Z", scoredAt: "2026-02-24T16:04:22Z", deliveredAt: null, priorRunId: null, scoreDeltaVsPrior: null,
  },
  { id: "run_v3k8p", runRef: "RUN-2852", brandAccountId: "ba_spc11",  toolType: "campaign_brief_scorer", status: "Under Review",     briefTitle: "Renewal Ritual — Performance Digital Q1",                 campaignType: "performance_digital",     overallScore: 69, scoreTier: "Adequate",   consultantId: "cns_sr006", scoringPeriod: "P2 2026", flags: [], createdAt: "2026-02-21T09:55:17Z", scoredAt: "2026-02-21T10:18:44Z", deliveredAt: null, priorRunId: null, scoreDeltaVsPrior: null },
  // EDGE CASE: High overall (88) but critically failing Claim Accuracy dimension (14/100)
  {
    id: "run_h5r2m", runRef: "RUN-2849", brandAccountId: "ba_chw84", toolType: "brand_health_scorer", status: "Under Review",
    briefTitle: "Cascade H&W — P2 2026 Brand Health Submission",
    overallScore: 88, scoreTier: "Strong", consultantId: "cns_ls004", scoringPeriod: "P2 2026",
    flags: [{ flagType: "claim_accuracy", severity: "critical", dimensionName: "Claim Accuracy", message: "Claim Accuracy scored 14/100 — 'clinically proven' on packaging without cited study. Overall score does not reflect this regulatory risk." }],
    createdAt: "2026-02-19T14:02:39Z", scoredAt: "2026-02-19T14:29:11Z", deliveredAt: null, priorRunId: null, scoreDeltaVsPrior: null,
  },
  // SCORED — awaiting consultant review
  { id: "run_t2g6q", runRef: "RUN-2860", brandAccountId: "ba_blb29",  toolType: "campaign_brief_scorer", status: "Scored",           briefTitle: "Citrus Rush — Trade Promotion Spring Push",               campaignType: "trade_promotion",         overallScore: 77, scoreTier: "Strong",     consultantId: "cns_dc005", scoringPeriod: "P3 2026", flags: [], createdAt: "2026-02-27T11:14:05Z", scoredAt: "2026-02-27T11:39:28Z", deliveredAt: null, priorRunId: null, scoreDeltaVsPrior: null },
  {
    id: "run_w9y1b", runRef: "RUN-2858", brandAccountId: "ba_hbh67", toolType: "brand_health_scorer", status: "Scored",
    briefTitle: "Harbor Bay Household — P2 2026 Brand Review",
    overallScore: 63, scoreTier: "Adequate", consultantId: "cns_mw007", scoringPeriod: "P2 2026",
    flags: [{ flagType: "stale_data", severity: "warning", message: "Distribution and velocity inputs are from P10 2025 — over 6 periods old. Scores may not reflect current shelf reality." }],
    createdAt: "2026-02-26T08:44:52Z", scoredAt: "2026-02-26T09:11:37Z", deliveredAt: null, priorRunId: null, scoreDeltaVsPrior: null,
  },
  // SCORING IN PROGRESS
  { id: "run_x4p7n", runRef: "RUN-2863", brandAccountId: "ba_iwn53",  toolType: "campaign_brief_scorer", status: "Scoring",          briefTitle: "IronMax Protein Launch — Brand Awareness + Digital",      campaignType: "brand_awareness",         overallScore: null, scoreTier: null, consultantId: "cns_mf001", scoringPeriod: "P3 2026", flags: [], createdAt: "2026-03-03T09:08:14Z", scoredAt: null, deliveredAt: null, priorRunId: null, scoreDeltaVsPrior: null },
  // EDGE CASE: Incomplete Brief — missing target audience and KPIs
  {
    id: "run_m1r8c", runRef: "RUN-2855", brandAccountId: "ba_ngc21", toolType: "campaign_brief_scorer", status: "Incomplete Brief",
    briefTitle: "Easter Seasonal Push — Q2 Trade", campaignType: "trade_promotion",
    overallScore: null, scoreTier: null, consultantId: "cns_dc005", scoringPeriod: "P3 2026",
    flags: [{ flagType: "incomplete_brief", severity: "critical", message: "Brief missing: (1) target audience definition, (2) measurable success KPIs. AI scoring cannot proceed." }],
    createdAt: "2026-02-25T13:27:48Z", scoredAt: null, deliveredAt: null, priorRunId: null, scoreDeltaVsPrior: null,
  },
  // EDGE CASE: New product launch — Insufficient Data on distribution dimensions
  {
    id: "run_j7k5d", runRef: "RUN-2845", brandAccountId: "ba_obc98", toolType: "brand_health_scorer", status: "Flagged",
    briefTitle: "Oakhaven DermaGlow — New Launch Brand Health Baseline",
    overallScore: 47, scoreTier: "Needs Work", consultantId: "cns_yt010", scoringPeriod: "P2 2026",
    flags: [
      { flagType: "insufficient_data", severity: "warning", dimensionName: "Distribution & % ACV", message: "Brand launched 6 weeks ago — insufficient retail POS history. Distribution, velocity, and OSA dimensions excluded from composite." },
      { flagType: "insufficient_data", severity: "warning", dimensionName: "Share of Voice", message: "No syndicated SOV data available for new SKU. SOV/SOM ratio dimension skipped." },
    ],
    createdAt: "2026-02-14T10:33:21Z", scoredAt: "2026-02-14T11:01:47Z", deliveredAt: null, priorRunId: null, scoreDeltaVsPrior: null,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// DATASET 4: SCORING DIMENSIONS (14 across both tools)
// ─────────────────────────────────────────────────────────────────────────────

export const scoringDimensions: ScoringDimension[] = [
  // Campaign Brief Scorer
  { id: "dim_ta001", name: "Target Audience Clarity",           toolType: "campaign_brief_scorer", weight: 18, description: "Precision of target consumer definition — demographics, psychographics, purchase behavior, and CEP alignment.",         pillar: "Strategic Foundation" },
  { id: "dim_ki002", name: "KPI Alignment",                     toolType: "campaign_brief_scorer", weight: 16, description: "Whether success metrics are measurable, time-bound, and linked to brand or business objectives.",                      pillar: "Strategic Foundation" },
  { id: "dim_cd003", name: "Creative Direction",                toolType: "campaign_brief_scorer", weight: 14, description: "Clarity of the creative mandate — tone, visual territory, message hierarchy, and creative mandatories.",               pillar: "Creative Brief Quality" },
  { id: "dim_bt004", name: "Brand Tone Consistency",            toolType: "campaign_brief_scorer", weight: 12, description: "Alignment of brief language with established brand voice and equity attributes.",                                      pillar: "Creative Brief Quality" },
  { id: "dim_ca005", name: "Claim Accuracy",                    toolType: "campaign_brief_scorer", weight: 15, description: "Factual accuracy and substantiation of product claims. Flags claims requiring legal or regulatory review.",            pillar: "Compliance & Risk" },
  { id: "dim_ms006", name: "Media Strategy",                    toolType: "campaign_brief_scorer", weight: 13, description: "Appropriateness of channel selection, reach/frequency objectives, and media mix for the target audience.",             pillar: "Execution Clarity" },
  { id: "dim_bp007", name: "Budget & Phasing",                  toolType: "campaign_brief_scorer", weight: 12, description: "Whether budget allocation, spend phasing, and trade investment levels are specified and realistic.",                   pillar: "Execution Clarity" },
  // Brand Health Scorer
  { id: "dim_ba008", name: "Brand Awareness & Recall",          toolType: "brand_health_scorer",   weight: 16, description: "Aided recall, unaided recall, and top-of-mind awareness vs. category benchmarks.",                                    pillar: "Consumer Equity" },
  { id: "dim_bp009", name: "Brand Preference & Consideration",  toolType: "brand_health_scorer",   weight: 15, description: "Share of preference, purchase consideration, and category entry point (CEP) mental market share.",                    pillar: "Consumer Equity" },
  { id: "dim_lo010", name: "Loyalty & NPS",                     toolType: "brand_health_scorer",   weight: 14, description: "Consumer loyalty metrics: repeat purchase rate, NPS score, and brand advocacy indicators.",                           pillar: "Consumer Equity" },
  { id: "dim_da011", name: "Distribution & % ACV",              toolType: "brand_health_scorer",   weight: 18, description: "Weighted distribution rate (% ACV), on-shelf availability (OSA), and velocity (units/store/week) vs. benchmarks.",    pillar: "Retail Execution" },
  { id: "dim_te012", name: "Trade Execution",                   toolType: "brand_health_scorer",   weight: 13, description: "Trade spend ROI, planogram compliance, promotional lift (incremental vs. baseline), and OTIF performance.",           pillar: "Retail Execution" },
  { id: "dim_sv013", name: "Share of Voice / Market Share",     toolType: "brand_health_scorer",   weight: 14, description: "SOV vs. SOM parity (Ehrenberg-Bass). Excess SOV predicts growth; SOV deficit signals underinvestment.",             pillar: "Investment & Media" },
  { id: "dim_ds014", name: "Digital Shelf Presence",            toolType: "brand_health_scorer",   weight: 10, description: "eCommerce brand presence — search visibility, ratings, reviews, and product content scores.",                        pillar: "Investment & Media" },
];

// ─────────────────────────────────────────────────────────────────────────────
// DATASET 5: SCORECARDS (4 detailed scorecards)
// ─────────────────────────────────────────────────────────────────────────────

export const scorecards: Scorecard[] = [
  // Brightleaf Summer Reset — Strong (84)
  {
    id: "sc_8m3p1",
    scoringRunId: "run_7x4k2",
    brandAccountId: "ba_blb29",
    toolType: "campaign_brief_scorer",
    overallScore: 84,
    scoreTier: "Strong",
    dimensionScores: [
      { dimensionId: "dim_ta001", dimensionName: "Target Audience Clarity",  score: 89, dataStatus: "scored", weight: 18, aiRationale: "Defines 25-38 female wellness consumers with Circana Numerator psychographic data. Strong CEP 'refreshingly honest' ownership documented.", recommendations: ["Expand to secondary 38-45 segment — growing category opportunity."], isCriticalFlag: false },
      { dimensionId: "dim_ki002", dimensionName: "KPI Alignment",             score: 82, dataStatus: "scored", weight: 16, aiRationale: "Strong KPI set: MAT share +0.8 pts, SOV goal 16.5%, ROAS floor 3.0x — all measurable and time-bound.", recommendations: ["Add distribution milestone as leading indicator KPI."], isCriticalFlag: false },
      { dimensionId: "dim_cd003", dimensionName: "Creative Direction",        score: 86, dataStatus: "scored", weight: 14, aiRationale: "Clear hero message, tone guidelines, and visual territory. Mandatory copy inclusions listed.", recommendations: ["Define TV vs. digital asset versioning hierarchy."], isCriticalFlag: false },
      { dimensionId: "dim_bt004", dimensionName: "Brand Tone Consistency",    score: 91, dataStatus: "scored", weight: 12, aiRationale: "Brief language mirrors established Brightleaf brand voice. Tone mandate well-operationalized.", recommendations: [], isCriticalFlag: false },
      { dimensionId: "dim_ca005", dimensionName: "Claim Accuracy",            score: 78, dataStatus: "scored", weight: 15, aiRationale: "'No artificial preservatives' claim present. Legal substantiation check recommended before production.", recommendations: ["Add footnote citation for clean label claim — regulatory requirement in some states."], isCriticalFlag: false },
      { dimensionId: "dim_ms006", dimensionName: "Media Strategy",            score: 83, dataStatus: "scored", weight: 13, aiRationale: "Channel mix (TV 40% / CTV 25% / social 25% / search 10%) appropriate for target audience media habits.", recommendations: ["Consider Instacart Ads to capture eCommerce conversion leg."], isCriticalFlag: false },
      { dimensionId: "dim_bp007", dimensionName: "Budget & Phasing",          score: 74, dataStatus: "scored", weight: 12, aiRationale: "Total investment disclosed but Q2/Q3 phasing ratio missing. Trade co-op allocation not specified.", recommendations: ["Specify monthly spend allocation and trade investment % of gross."], isCriticalFlag: false },
    ],
    executiveSummary: "Strategically sound brief with well-defined target consumer and measurable KPIs. Claim accuracy and budget phasing require attention before production release.",
    topRecommendations: ["Add legal substantiation footnote for clean label claims.", "Define monthly budget phasing and trade co-op allocation.", "Specify eCommerce channel strategy (Instacart / Amazon) — 23% of category sales are online."],
    categoryBenchmark: "Beverages category average: 71 — Top quartile: 87",
    scoredAt: "2026-02-17T08:54:38Z",
    improvementVsPrior: null,
    flags: [],
  },
  // EDGE CASE: Cascade H&W — high overall (88) but Claim Accuracy critically failing (14)
  {
    id: "sc_9x2q4",
    scoringRunId: "run_h5r2m",
    brandAccountId: "ba_chw84",
    toolType: "brand_health_scorer",
    overallScore: 88,
    scoreTier: "Strong",
    dimensionScores: [
      { dimensionId: "dim_ba008", dimensionName: "Brand Awareness & Recall",          score: 91, dataStatus: "scored", weight: 16, aiRationale: "Aided recall 74% — 12 pts above household category average. Strong earned media profile.",            recommendations: [], isCriticalFlag: false },
      { dimensionId: "dim_bp009", dimensionName: "Brand Preference & Consideration",  score: 87, dataStatus: "scored", weight: 15, aiRationale: "Consideration 61% — top-quartile for mid-tier household brand. CEP 'effective and affordable' strongly owned.", recommendations: [], isCriticalFlag: false },
      { dimensionId: "dim_lo010", dimensionName: "Loyalty & NPS",                     score: 84, dataStatus: "scored", weight: 14, aiRationale: "NPS +41 above category average (+31). Repeat purchase rate 68% is healthy.",                          recommendations: [], isCriticalFlag: false },
      { dimensionId: "dim_da011", dimensionName: "Distribution & % ACV",              score: 83, dataStatus: "scored", weight: 18, aiRationale: "31.2% ACV below category median but appropriate for regional challenger positioning.",               recommendations: ["Target 45% ACV in next cycle — key drugstore chain expansion opportunity."], isCriticalFlag: false },
      { dimensionId: "dim_te012", dimensionName: "Trade Execution",                   score: 79, dataStatus: "scored", weight: 13, aiRationale: "Trade ROI 38% below category high of 52%. Promotional lift 18% (category avg: 23%).",               recommendations: ["Shift FSI spend to digital coupon — higher redemption rate."], isCriticalFlag: false },
      { dimensionId: "dim_sv013", dimensionName: "Share of Voice / Market Share",     score: 91, dataStatus: "scored", weight: 14, aiRationale: "SOV 2.1% vs. SOM 2.8% — deficit narrowing. Improving trajectory.",                                  recommendations: [], isCriticalFlag: false },
      // THE CRITICAL FAILING DIMENSION — overall 88 masks this score of 14
      { dimensionId: "dim_ca005", dimensionName: "Claim Accuracy",                    score: 14, dataStatus: "scored", weight: 15, aiRationale: "'Clinically proven formula' on packaging — no peer-reviewed study found in public record. Ingredient sodium benzoate conflicts with 'all-natural' digital ad language. Regulatory risk: moderate-to-high.", recommendations: ["Remove 'clinically proven' language or provide study citation.", "Audit all digital ad copy for 'all-natural' claims vs. current ingredient list.", "Engage regulatory counsel before next campaign launch."], isCriticalFlag: true },
    ],
    executiveSummary: "Strong brand health across equity and distribution dimensions — however, a critical claim accuracy issue requires immediate attention. Overall score does not reflect the severity of this regulatory risk.",
    topRecommendations: ["CRITICAL: Remove or substantiate 'clinically proven' packaging claim immediately.", "Audit all active digital ads for 'all-natural' language given sodium benzoate in formula.", "Engage regulatory counsel before next campaign launch."],
    categoryBenchmark: "Household products category average: 61 — Top quartile: 79",
    scoredAt: "2026-02-19T14:29:11Z",
    improvementVsPrior: null,
    flags: [{ flagType: "claim_accuracy", severity: "critical", dimensionName: "Claim Accuracy", message: "Claim Accuracy 14/100 — 'clinically proven' on packaging without citation. Regulatory risk present." }],
  },
  // EDGE CASE: Re-score — Meridian improved 64→78 after brief revision
  {
    id: "sc_3v4n6",
    scoringRunId: "run_r6u2z",
    brandAccountId: "ba_msc87",
    toolType: "campaign_brief_scorer",
    overallScore: 78,
    scoreTier: "Strong",
    dimensionScores: [
      { dimensionId: "dim_ta001", dimensionName: "Target Audience Clarity",  score: 81, dataStatus: "scored", weight: 18, aiRationale: "Significant improvement — demographic profile added with Circana panel data. Purchase occasion mapping included.", recommendations: [], isCriticalFlag: false },
      { dimensionId: "dim_ki002", dimensionName: "KPI Alignment",             score: 84, dataStatus: "scored", weight: 16, aiRationale: "Three measurable KPIs now specified including distribution milestone — all time-bound.", recommendations: [], isCriticalFlag: false },
      { dimensionId: "dim_cd003", dimensionName: "Creative Direction",        score: 77, dataStatus: "scored", weight: 14, aiRationale: "Improved creative mandate with clearer message hierarchy.", recommendations: ["Define tone guidance for shopper vs. digital executions."], isCriticalFlag: false },
      { dimensionId: "dim_bt004", dimensionName: "Brand Tone Consistency",    score: 79, dataStatus: "scored", weight: 12, aiRationale: "Brand voice alignment improved. Summer activation language appropriate.", recommendations: [], isCriticalFlag: false },
      { dimensionId: "dim_ca005", dimensionName: "Claim Accuracy",            score: 82, dataStatus: "scored", weight: 15, aiRationale: "No problematic claims — all product claims factual and substantiated.", recommendations: [], isCriticalFlag: false },
      { dimensionId: "dim_ms006", dimensionName: "Media Strategy",            score: 74, dataStatus: "scored", weight: 13, aiRationale: "In-store activation channel well-specified. Endcap, FSI, and digital coupon mix defined.", recommendations: ["Add shopper display unit spec for secondary placement."], isCriticalFlag: false },
      { dimensionId: "dim_bp007", dimensionName: "Budget & Phasing",          score: 69, dataStatus: "scored", weight: 12, aiRationale: "Total investment specified. June peak not explicitly allocated.", recommendations: ["Specify Q2 peak allocation and summer trade investment as % of gross sales."], isCriticalFlag: false },
    ],
    executiveSummary: "Rev. 2 significantly improved on target audience definition and KPI specificity. Score improved from 64 to 78 (+14 points). Brief is production-ready pending two minor additions.",
    topRecommendations: ["Define tone guidance for shopper vs. digital channel versioning.", "Specify summer peak spend phasing in budget section."],
    categoryBenchmark: "Snacks category average: 66 — Top quartile: 81",
    scoredAt: "2026-02-10T16:41:33Z",
    improvementVsPrior: +14,
    flags: [],
  },
  // EDGE CASE: New launch — Insufficient Data on distribution dimensions
  {
    id: "sc_7t1b5",
    scoringRunId: "run_j7k5d",
    brandAccountId: "ba_obc98",
    toolType: "brand_health_scorer",
    overallScore: 47,
    scoreTier: "Needs Work",
    dimensionScores: [
      { dimensionId: "dim_ba008", dimensionName: "Brand Awareness & Recall",         score: 31,   dataStatus: "scored",            weight: 16, aiRationale: "Aided recall 12% — expected for 6-week-old launch. Awareness is primary objective at this stage.", recommendations: ["Prioritize awareness media (digital video, social) in first 6 months."], isCriticalFlag: false },
      { dimensionId: "dim_bp009", dimensionName: "Brand Preference & Consideration", score: 44,   dataStatus: "scored",            weight: 15, aiRationale: "Early consideration 27% — above baby care new launch benchmark of 19%. Positive early signal.", recommendations: [], isCriticalFlag: false },
      { dimensionId: "dim_lo010", dimensionName: "Loyalty & NPS",                    score: 58,   dataStatus: "scored",            weight: 14, aiRationale: "NPS +38 from early adopter sample — strong for baby care category. Repeat purchase too early to measure.", recommendations: [], isCriticalFlag: false },
      { dimensionId: "dim_da011", dimensionName: "Distribution & % ACV",             score: null, dataStatus: "insufficient_data", weight: 18, aiRationale: "Brand launched 6 weeks ago — insufficient POS history to calculate ACV-weighted distribution score.", recommendations: ["Pull Circana/SPINS data at 90-day mark for first meaningful distribution score."], isCriticalFlag: false },
      { dimensionId: "dim_te012", dimensionName: "Trade Execution",                  score: null, dataStatus: "insufficient_data", weight: 13, aiRationale: "Only 1 promotional period on record — insufficient for ROI or lift calculation.", recommendations: [], isCriticalFlag: false },
      { dimensionId: "dim_sv013", dimensionName: "Share of Voice / Market Share",    score: null, dataStatus: "insufficient_data", weight: 14, aiRationale: "No syndicated SOV data available for new SKU — will be available at next scoring run.", recommendations: [], isCriticalFlag: false },
      { dimensionId: "dim_ds014", dimensionName: "Digital Shelf Presence",           score: 63,   dataStatus: "scored",            weight: 10, aiRationale: "Amazon listing live — 4.6-star rating (47 reviews). Content score 63/100 — needs lifestyle imagery.", recommendations: ["Add lifestyle imagery and A+ content to Amazon listing."], isCriticalFlag: false },
    ],
    executiveSummary: "New launch baseline scoring — distribution and trade dimensions excluded due to insufficient data. Focus for next 90 days: awareness building and retailer distribution expansion to 25% ACV minimum.",
    topRecommendations: ["Pull syndicated data at 90-day mark for first complete distribution and trade scores.", "Add lifestyle imagery and A+ content to Amazon listing.", "Prioritize drugstore chain distribution expansion."],
    categoryBenchmark: "Baby care category average: 62 — Top quartile: 78",
    scoredAt: "2026-02-14T11:01:47Z",
    improvementVsPrior: null,
    flags: [{ flagType: "insufficient_data", severity: "warning", dimensionName: "Distribution & % ACV", message: "6-week launch — distribution, trade, and SOV dimensions excluded due to insufficient retail history." }],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// DASHBOARD STATS
// ─────────────────────────────────────────────────────────────────────────────

export const dashboardStats: DashboardStats = {
  scoringRunsTotal: 247,
  scoringRunsChange: +12.4,
  avgScorecardScore: 74.3,
  avgScoreChange: +2.8,
  scorecardsDelivered: 31,
  scorecardsDeliveredChange: +8.7,
  activeBrandAccounts: 10,
  brandAccountsChange: +1,
  flaggedRuns: 3,
  flaggedRunsChange: -2,
  avgPortfolioAcv: 63.1,
  avgPortfolioAcvChange: +1.4,
};

// ─────────────────────────────────────────────────────────────────────────────
// CHART DATA 1: SCORING VOLUME BY PERIOD (12 CPG 4-week periods)
// Pattern: Q4 brand review spike (P10-P12), Q1 new campaign season (P1-P2)
// ─────────────────────────────────────────────────────────────────────────────

export const scoringVolumeByPeriod: ScoringVolumeByPeriod[] = [
  { period: "P3 2025",  label: "P3",  scoringRuns: 14, avgScore: 68.4, delivered: 11 },
  { period: "P4 2025",  label: "P4",  scoringRuns: 17, avgScore: 71.2, delivered: 14 },
  { period: "P5 2025",  label: "P5",  scoringRuns: 19, avgScore: 70.8, delivered: 16 },
  { period: "P6 2025",  label: "P6",  scoringRuns: 21, avgScore: 72.1, delivered: 18 },
  { period: "P7 2025",  label: "P7",  scoringRuns: 16, avgScore: 69.7, delivered: 13 }, // summer dip
  { period: "P8 2025",  label: "P8",  scoringRuns: 18, avgScore: 71.4, delivered: 15 },
  { period: "P9 2025",  label: "P9",  scoringRuns: 22, avgScore: 73.8, delivered: 19 }, // fall planning
  { period: "P10 2025", label: "P10", scoringRuns: 28, avgScore: 74.6, delivered: 24 }, // Q4 brand review surge
  { period: "P11 2025", label: "P11", scoringRuns: 31, avgScore: 75.2, delivered: 27 }, // peak
  { period: "P12 2025", label: "P12", scoringRuns: 26, avgScore: 73.9, delivered: 22 }, // year-end
  { period: "P1 2026",  label: "P1",  scoringRuns: 23, avgScore: 74.1, delivered: 19 }, // Q1 new campaign season
  { period: "P2 2026",  label: "P2",  scoringRuns: 27, avgScore: 74.3, delivered: 23 }, // current
];

// ─────────────────────────────────────────────────────────────────────────────
// CHART DATA 2: SCORE TIER DISTRIBUTION (categorical)
// ─────────────────────────────────────────────────────────────────────────────

export const scoreTierDistribution: ScoreTierDistribution[] = [
  { tier: "Excellent",   count: 28, pct: 11.3, colorKey: "excellent"  },
  { tier: "Strong",      count: 74, pct: 30.0, colorKey: "strong"     },
  { tier: "Adequate",    count: 89, pct: 36.0, colorKey: "adequate"   },
  { tier: "Needs Work",  count: 41, pct: 16.6, colorKey: "needs_work" },
  { tier: "Critical",    count: 15, pct:  6.1, colorKey: "critical"   },
];

// ─────────────────────────────────────────────────────────────────────────────
// CHART DATA 3: BRAND HEALTH INDEX TREND (portfolio average, 12 periods)
// Pattern: gradual improvement through year, slight year-end dip, recovery in Q1
// ─────────────────────────────────────────────────────────────────────────────

export const brandHealthTrend: BrandHealthTrendPoint[] = [
  { period: "P3 2025",  label: "P3",  avgHealthIndex: 67.4, accountCount: 8,  decliningCount: 3 },
  { period: "P4 2025",  label: "P4",  avgHealthIndex: 68.1, accountCount: 8,  decliningCount: 2 },
  { period: "P5 2025",  label: "P5",  avgHealthIndex: 69.3, accountCount: 9,  decliningCount: 2 },
  { period: "P6 2025",  label: "P6",  avgHealthIndex: 70.8, accountCount: 9,  decliningCount: 3 },
  { period: "P7 2025",  label: "P7",  avgHealthIndex: 70.2, accountCount: 9,  decliningCount: 3 }, // slight dip
  { period: "P8 2025",  label: "P8",  avgHealthIndex: 71.4, accountCount: 9,  decliningCount: 2 },
  { period: "P9 2025",  label: "P9",  avgHealthIndex: 71.9, accountCount: 10, decliningCount: 2 },
  { period: "P10 2025", label: "P10", avgHealthIndex: 72.6, accountCount: 10, decliningCount: 2 },
  { period: "P11 2025", label: "P11", avgHealthIndex: 73.1, accountCount: 10, decliningCount: 3 },
  { period: "P12 2025", label: "P12", avgHealthIndex: 72.4, accountCount: 10, decliningCount: 3 }, // year-end dip
  { period: "P1 2026",  label: "P1",  avgHealthIndex: 73.4, accountCount: 11, decliningCount: 2 },
  { period: "P2 2026",  label: "P2",  avgHealthIndex: 74.1, accountCount: 11, decliningCount: 3 },
];

// ─────────────────────────────────────────────────────────────────────────────
// RECENT SCORING ACTIVITY FEED
// ─────────────────────────────────────────────────────────────────────────────

export const scoringActivityFeed: ScoringActivityFeedItem[] = [
  { runId: "run_x4p7n", runRef: "RUN-2863", brandName: "Ironwood Nutrition",       toolLabel: "Campaign Brief Scorer", overallScore: null, scoreTier: null,      status: "Scoring",          consultantName: "Morgan Farrell",     relativeTime: "Just now",   hasFlag: false },
  { runId: "run_m1r8c", runRef: "RUN-2855", brandName: "Northgate Confections",    toolLabel: "Campaign Brief Scorer", overallScore: null, scoreTier: null,      status: "Incomplete Brief", consultantName: "David Chen",         relativeTime: "2 hours ago", hasFlag: true  },
  { runId: "run_t2g6q", runRef: "RUN-2860", brandName: "Brightleaf Beverages",     toolLabel: "Campaign Brief Scorer", overallScore: 77,   scoreTier: "Strong",  status: "Scored",           consultantName: "David Chen",         relativeTime: "4 hours ago", hasFlag: false },
  { runId: "run_w9y1b", runRef: "RUN-2858", brandName: "Harbor Bay Household",     toolLabel: "Brand Health Scorer",   overallScore: 63,   scoreTier: "Adequate",status: "Scored",           consultantName: "Marcus Webb",        relativeTime: "Yesterday",  hasFlag: true  },
  { runId: "run_h5r2m", runRef: "RUN-2849", brandName: "Cascade Home & Wellness",  toolLabel: "Brand Health Scorer",   overallScore: 88,   scoreTier: "Strong",  status: "Under Review",     consultantName: "Lauren Szczepanski", relativeTime: "2 days ago", hasFlag: true  },
  { runId: "run_v3k8p", runRef: "RUN-2852", brandName: "Stonecroft Personal Care", toolLabel: "Campaign Brief Scorer", overallScore: 69,   scoreTier: "Adequate",status: "Under Review",     consultantName: "Sofia Reyes",        relativeTime: "2 days ago", hasFlag: false },
  { runId: "run_0e7n3", runRef: "RUN-2856", brandName: "Meridian Snacks",          toolLabel: "Brand Health Scorer",   overallScore: 58,   scoreTier: "Needs Work",status: "Under Review",   consultantName: "Anita Kowalski",     relativeTime: "3 days ago", hasFlag: true  },
  { runId: "run_7x4k2", runRef: "RUN-2847", brandName: "Brightleaf Beverages",     toolLabel: "Campaign Brief Scorer", overallScore: 84,   scoreTier: "Strong",  status: "Delivered",        consultantName: "David Chen",         relativeTime: "5 days ago", hasFlag: false },
];

// ─────────────────────────────────────────────────────────────────────────────
// LOOKUP HELPERS
// ─────────────────────────────────────────────────────────────────────────────

export const getBrandAccountById = (id: string): BrandAccount | undefined =>
  brandAccounts.find((b) => b.id === id);

export const getConsultantById = (id: string): Consultant | undefined =>
  consultants.find((c) => c.id === id);

export const getScoringRunById = (id: string): ScoringRun | undefined =>
  scoringRuns.find((r) => r.id === id);

export const getScorecardByRunId = (runId: string): Scorecard | undefined =>
  scorecards.find((s) => s.scoringRunId === runId);

export const getRunsByBrandAccount = (brandAccountId: string): ScoringRun[] =>
  scoringRuns.filter((r) => r.brandAccountId === brandAccountId);

export const getRunsByConsultant = (consultantId: string): ScoringRun[] =>
  scoringRuns.filter((r) => r.consultantId === consultantId);

export const getRunsByStatus = (status: ScoringRun["status"]): ScoringRun[] =>
  scoringRuns.filter((r) => r.status === status);

export const getDimensionsByTool = (toolType: ScoringRun["toolType"]): ScoringDimension[] =>
  scoringDimensions.filter((d) => d.toolType === toolType || d.toolType === "both");

export const getFlaggedRuns = (): ScoringRun[] =>
  scoringRuns.filter((r) => r.status === "Flagged" || r.status === "Incomplete Brief" || r.flags.length > 0);

// ─────────────────────────────────────────────────────────────────────────────
// DISPLAY CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

export const SCORE_TIER_CONFIG: Record<string, { label: string; range: string; colorClass: string; bgClass: string }> = {
  "Excellent":   { label: "Excellent",   range: "90–100", colorClass: "text-emerald-700",  bgClass: "bg-emerald-50 border-emerald-200"  },
  "Strong":      { label: "Strong",      range: "75–89",  colorClass: "text-blue-700",     bgClass: "bg-blue-50 border-blue-200"        },
  "Adequate":    { label: "Adequate",    range: "60–74",  colorClass: "text-amber-700",    bgClass: "bg-amber-50 border-amber-200"      },
  "Needs Work":  { label: "Needs Work",  range: "40–59",  colorClass: "text-orange-700",   bgClass: "bg-orange-50 border-orange-200"    },
  "Critical":    { label: "Critical",    range: "0–39",   colorClass: "text-red-700",      bgClass: "bg-red-50 border-red-200"          },
};

export const SCORING_RUN_STATUS_CONFIG: Record<string, { label: string; colorClass: string; bgClass: string; dotClass: string }> = {
  "Scoring":           { label: "Scoring",          colorClass: "text-blue-700",    bgClass: "bg-blue-50 border-blue-200",      dotClass: "bg-blue-500 animate-pulse" },
  "Scored":            { label: "Scored",            colorClass: "text-violet-700",  bgClass: "bg-violet-50 border-violet-200",  dotClass: "bg-violet-500"             },
  "Under Review":      { label: "Under Review",      colorClass: "text-amber-700",   bgClass: "bg-amber-50 border-amber-200",    dotClass: "bg-amber-500"              },
  "Delivered":         { label: "Delivered",         colorClass: "text-emerald-700", bgClass: "bg-emerald-50 border-emerald-200",dotClass: "bg-emerald-500"            },
  "Archived":          { label: "Archived",          colorClass: "text-gray-600",    bgClass: "bg-gray-50 border-gray-200",      dotClass: "bg-gray-400"               },
  "Incomplete Brief":  { label: "Incomplete Brief",  colorClass: "text-red-700",     bgClass: "bg-red-50 border-red-200",        dotClass: "bg-red-500"                },
  "Flagged":           { label: "Flagged",           colorClass: "text-red-700",     bgClass: "bg-red-50 border-red-200",        dotClass: "bg-red-500"                },
};

export const TOOL_TYPE_LABELS: Record<string, string> = {
  campaign_brief_scorer: "Campaign Brief Scorer",
  brand_health_scorer:   "Brand Health Scorer",
};

export const BRAND_CATEGORY_LABELS: Record<string, string> = {
  beverages: "Beverages", snacks: "Snacks", personal_care: "Personal Care",
  pet: "Pet", nutrition: "Nutrition", dairy: "Dairy",
  household: "Household", baby_care: "Baby Care", confections: "Confections",
};
