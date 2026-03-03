# Domain Knowledge Brief — CPG Marketing Consultancy (AI-Powered Scoring Tools)

## Sub-Domain Classification

**B2B marketing consultancy serving mid-to-large CPG brands** — think agencies or boutique strategy firms that serve brands like P&G, Unilever, Nestlé, Kraft Heinz, Conagra, or regional challengers. The consultancy has built two proprietary AI scoring tools as React components, likely evaluating: (1) creative/campaign brief quality and (2) brand/market performance health. These tools are internal — used by consultants and their brand clients during engagements. Scale: 5-30 consultants, serving 10-40 brand clients simultaneously.

This is **NOT** a consumer app. It is a power-user internal tool where consultants run AI evaluations, review scores, and share structured outputs with brand clients. The analogy is a law firm's internal matter management tool — professional, structured, and built for speed.

---

## Job Analyst Vocabulary — Confirmed and Extended

The Job Analyst did not provide a vocabulary brief. Based on research, here is the confirmed vocabulary for this sub-domain.

### Confirmed Primary Entity Names

- **Primary record type**: "scoring run" or "evaluation" (not "analysis", not "report" — these tools score something against criteria)
- **Document being scored**: "brief" (campaign brief, creative brief) OR "brand submission" — the input fed to the AI
- **Output of scoring**: "scorecard" (not "result", not "report")
- **The two tools**: Tool 1 likely = "Campaign Brief Scorer" / Tool 2 likely = "Brand Health Scorer" — but defer to client's actual naming
- **People roles**: "Consultant" (internal user), "Brand Manager" (client-side user), "Category Lead", "Insights Director"
- **Clients of the consultancy**: "brand accounts" or "client brands" (not "customers")
- **Scoring dimensions**: "criteria" or "pillars" (not "categories")
- **Secondary entities**: "brand", "SKU", "campaign", "category", "channel", "market"

### Expanded KPI Vocabulary

| KPI Name | What It Measures | Typical Format |
|---|---|---|
| Overall Score | Composite score across all evaluation criteria | 0-100 or letter grade (A-F) |
| Brand Health Index | Aggregate brand equity measure across awareness, preference, loyalty | 0-100 |
| Distribution Rate (% ACV) | % of All Commodity Volume weighted stores carrying the product | % (e.g., 73.4%) |
| On-Shelf Availability (OSA) | % of time product is available on shelf when shopper visits | % (e.g., 91.2%) |
| Share of Voice (SOV) | Brand's advertising spend vs. total category spend | % (e.g., 18.7%) |
| Market Share (Volume) | Brand's unit sales as % of total category unit sales | % (e.g., 12.3%) |
| Trade Spend ROI | (Incremental Gross Margin - Trade Spend) / Trade Spend | % or ratio (e.g., 47%) |
| Promotional Lift | % sales increase during promotion vs. baseline | % (e.g., +23%) |
| Sell-Through Rate | Units sold / Units shipped to retail | % (e.g., 87%) |
| ROAS (Return on Ad Spend) | Revenue generated per $1 of advertising | ratio (e.g., 3.2x) |
| Aided Brand Recall | % of consumers who recognize the brand when prompted | % (e.g., 64%) |
| Net Promoter Score (NPS) | Consumer willingness to recommend | -100 to +100 (e.g., +42) |
| Forecast Accuracy | Predicted vs. actual sales volume | % (e.g., 88.3%) |
| Planogram Compliance | % of stores meeting shelf layout standards | % (e.g., 76%) |
| Brief Clarity Score | AI assessment of how clear/actionable a campaign brief is | 0-100 |
| Claim Accuracy Score | AI check of factual claim accuracy in creative assets | 0-100 |
| Brand Tone Consistency | AI assessment of tone alignment to brand guidelines | 0-100 |

### Status Label Vocabulary

**Scoring run states:**
- Active states: "Scoring", "Processing", "Under Review"
- Completion states: "Scored", "Delivered", "Archived"
- Problem states: "Incomplete Brief", "Missing Data", "Review Required", "Flagged"
- Priority markers: "Priority", "Urgent", "Expedited"

**Brand/campaign states:**
- "Active Campaign", "Planning", "In-Market", "Post-Campaign"
- "Underperforming", "On Track", "Exceeding Target"
- "New Launch", "Sustained", "Declining", "Discontinued"

**Score tiers (for AI output display):**
- "Excellent" (90-100), "Strong" (75-89), "Adequate" (60-74), "Needs Work" (40-59), "Critical" (0-39)

### Workflow and Action Vocabulary

**Primary actions (button labels):**
- "Run Scoring", "Submit Brief", "Generate Scorecard", "Export PDF"
- "Compare Versions", "Re-score", "Approve", "Request Revision"

**Secondary actions:**
- "Flag for Review", "Archive", "Duplicate", "Share with Client"
- "View Criteria", "Adjust Weights", "Add Context", "View History"

### Sidebar Navigation Candidates

These use domain vocabulary — not generic labels:

1. **Scoring Tools** — entry point to both AI tools (campaign brief scorer + brand health scorer)
2. **Scorecards** — history of completed scoring runs, filterable by brand/date/tool
3. **Brand Accounts** — client brands managed by the consultancy
4. **Campaign Library** — archive of campaigns that have been scored
5. **Criteria Library** — configurable scoring rubrics and weighting presets
6. **Insights** — aggregated trends across scored briefs / brand health over time

---

## Design Context — Visual Language of This Industry

### What "Premium" Looks Like in This Domain

CPG marketing consultancies operate at the intersection of creative (agency culture) and analytical (data/insights culture). The tools that their practitioners consider "the good stuff" share a specific visual DNA: **clean, data-precise, structured** — not agency-flashy, not Bloomberg-dense. Think Notion + Stripe dashboard aesthetic. These tools need to be presentable to CMO-level brand clients, not just consultants.

The critical visual signals that practitioners in this space read as "premium":
- **Score visualization done right**: Not a plain number — a gauge, a radial chart, or a color-coded score band with benchmark comparison. Practitioners expect to see their score contextualized (e.g., "73 / Strong — above category average of 64").
- **Dimensional breakdown**: Any composite score must break down into sub-dimensions with individual scores. This is non-negotiable — a single number with no rationale is worthless in consulting.
- **Clean table hierarchy**: CPG analytics tools like Circana and NielsenIQ use dense data tables with clear visual hierarchy — thin borders, alternating row backgrounds, tabular numbers right-aligned, status badges color-coded by traffic-light convention (green/amber/red).
- **Export-ready layouts**: Consultants send scorecards to clients. The UI should feel like it produces a deliverable, not just shows data on screen. PDF export affordances, clean print view, "copy to clipboard" on key metrics.

For the AI tool specifically: practitioners expect a **structured form → processing → structured output** flow. The output should feel like a report section, not a chat bubble. Practitioners working in this space have used Nielsen Activate, Circana's Market Advantage, and Salsify — all of which are white-background, sidebar-nav, structured-table tools.

### Real-World Apps Clients Would Recognize as "Premium"

1. **Circana (formerly IRI) Market Advantage** — The gold standard for CPG analytics. Uses a structured left sidebar navigation, top KPI bar with color-coded delta arrows, and dense data tables. Heavy use of bar charts for category comparison and line charts for trend data. Clean white backgrounds with blue/navy primary action colors. Practitioners in this space have spent thousands of hours in this UI and internalize it as "professional analytics."

2. **NielsenIQ Activate / Connect** — Similar structural patterns to Circana. Prominent metric cards at top, filterable tables, export buttons prominently placed. Key signature: metric cards always show a comparison period delta ("+3.2% vs. YA"). Navigation uses category/brand/retailer hierarchy as the primary filter tree.

3. **Profitero+ (Digital Shelf Analytics)** — For the ecommerce/digital side of CPG analytics. Clean SaaS aesthetic with a strong emphasis on score cards and health indicators. Uses a traffic-light status system (red/amber/green) for brand health dimensions. Most relevant reference for an AI scoring tool — Profitero's "scorecard" pages show dimension-by-dimension breakdowns with benchmark comparisons.

### Aesthetic Validation

- **Job Analyst context**: This is a B2B internal tool for a marketing consultancy serving CPG brands.
- **Domain validation**: The **SaaS Modern** aesthetic is the correct primary choice. CPG marketing consultancies use tools that balance analytical precision with client-presentable polish. "Linear/Minimal" would be slightly too stripped — CPG clients (brand managers at P&G level) expect some visual structure and warmth. "Corporate Enterprise" would feel too heavy for a consultancy context. SaaS Modern with careful color calibration — a cooler, more authoritative primary color — is right.
- **Color calibration note**: Avoid warm greens or consumer-brand palettes. A medium-depth indigo or teal-blue signals "analytics platform" without being clinical. `oklch(0.52 0.16 250)` (medium indigo) or `oklch(0.50 0.15 215)` (teal-blue) would read correctly to practitioners in this space.
- **One density adjustment**: Slightly increase density from SaaS Modern default. CPG consultants work with data-heavy outputs and prefer compact table rows and tight card spacing. Set `--content-padding: 1.25rem` rather than full 1.5rem.

### Format Validation

- **Job context**: The client has two existing React components (scoring tools). The job is to deploy them as a secure internal web app. This is fundamentally a **dashboard/tool app** — not a mobile app, not a landing page.
- **Recommended format**: `dashboard-app` — sidebar navigation for multi-tool access, main area for tool output and scorecard display.
- **Format-specific notes for Demo Screen Builder**: The main screen should showcase the AI scoring workflow — a form/input panel on the left or top, and a structured scorecard output on the right or below. This is a split-content pattern, not a stat-cards-plus-chart pattern. Key screens: (1) Tool selector / home dashboard with recent scorecards, (2) Active scoring tool with form + AI output, (3) Scorecard history / archive.

### Density and Layout Expectations

**Standard-to-compact density.** CPG analytics tools lean toward standard density (not as dense as Bloomberg but denser than a wellness app). Consultants are power users — they want more information per screen, not card-heavy whitespace.

**List-heavy for scorecards/history; structured-form for tool input.** The tool input screens are form-centric (text inputs, dropdowns, file upload for brief documents). The output/history screens are table-centric (past scoring runs, filterable by brand, date, tool type). Score detail pages are card-heavy (dimension breakdown cards with individual scores).

The pattern is: **tool input form → AI processing state → scorecard output with dimension cards + data table of criteria**.

---

## Entity Names (10+ realistic names)

### Companies / Organizations (CPG Brands — Client Accounts)

1. Kestrel Ridge Foods
2. Meridian Snacks Co.
3. Brightleaf Beverages
4. Stonecroft Personal Care
5. Ironwood Nutrition
6. Harbor Bay Household Products
7. Clearview Pet Co.
8. Summit Organics Group
9. Redfield Dairy Brands
10. Cascade Home & Wellness
11. Northgate Confections
12. Oakhaven Baby Care

### People Names (Consultancy Roles)

1. Morgan Farrell — Senior Brand Consultant
2. Priya Nair — Insights Director
3. James Okafor — Category Strategy Lead
4. Lauren Szczepanski — Account Director
5. David Chen — Brand Analytics Manager
6. Sofia Reyes — Shopper Marketing Consultant
7. Marcus Webb — Trade Strategy Analyst
8. Anita Kowalski — Brand Health Lead
9. Tyler Broderick — Digital Commerce Consultant
10. Yuki Tanaka — Research & Insights Associate

### Products / Services / Campaign Types

1. Kestrel Ridge Cheddar Puffs (12oz) — SKU KRC-4421
2. Meridian Trail Mix Variety Pack (24ct) — SKU MTM-0087
3. Brightleaf Sparkling Citrus (6-pack) — SKU BLC-2291
4. Ironwood Whey Protein Vanilla (2lb) — SKU IWP-5531
5. Clearview Fresh Grain Dog Food (30lb) — SKU CVG-7743
6. Stonecroft Exfoliating Cleanser (6oz) — SKU STE-1102
7. Redfield Butter Blend (1lb 4-pack) — SKU RDB-3380
8. Campaign: "Summer Reset" Brand Awareness Push
9. Campaign: "Q4 Shelf Capture" Trade Promotion
10. Campaign: "New Year, New You" Product Launch
11. Brief Type: "National TV + Digital — 360 Campaign"
12. Brief Type: "In-Store Activation + FSI"

---

## Realistic Metric Ranges

| Metric | Low | Typical | High | Notes |
|--------|-----|---------|------|-------|
| Distribution Rate (% ACV) | 18% | 63% | 94% | Regional brand 18-40%; National brand 70-95%. Source: NielsenIQ benchmarks |
| On-Shelf Availability (OSA) | 71% | 87% | 97% | Industry benchmark: top quartile = 94%+. Source: NielsenIQ retail execution data |
| Trade Spend ROI | 15% | 43% | 65% | Independent retailers ~50%; large chain ~40%. Source: vividly.com trade spend guide |
| Promotional Lift | 5% | 23% | 68% | Highly category-dependent. Snacks/beverage often 20-35% lift during BOGO |
| Market Share (Volume) | 0.8% | 7.4% | 28% | Challenger brands 2-8%; category leaders 15-30%. Source: Circana category reports |
| ROAS (national digital) | 1.2x | 3.1x | 6.8x | Below 2x = underperforming; 3-4x = healthy; 6x+ = top performers |
| Brand Health Index Score | 38 | 67 | 91 | Composite of recall, preference, NPS. AI scoring tool output range: 0-100 |
| Overall Brief Score (AI) | 34 | 72 | 96 | Low = vague/incomplete brief; high = specific, measurable, brand-aligned |
| Planogram Compliance | 41% | 74% | 96% | National Association for Retail Marketing: avg compliance below 50% for top grocers |
| Weeks of Supply (WoS) | 2.1 | 6.3 | 14.8 | Healthy range: 4-8 weeks. Source: Daasity CPG metrics guide |
| NPS (consumer) | -12 | +38 | +72 | Challenger brands often +20-45; established leaders +50-70 |
| Forecast Accuracy | 61% | 84% | 97% | World-class CPG operations: 90%+. Mid-market: 78-86% |

---

## Industry Terminology Glossary

| Term | Definition | Usage Context |
|------|-----------|---------------|
| ACV (All Commodity Volume) | A retailer's total store sales used as a weighting factor for distribution metrics. "73% ACV" means the brand is sold in stores representing 73% of total US grocery dollars. | Distribution rate calculations, account planning |
| Trade Spend | Money CPG manufacturers invest in promotional activities with retailers — discounts, rebates, co-op advertising, displays. Typically 20-25% of gross sales. | Budget planning, ROI analysis, P&L review |
| Promotional Lift | The incremental sales increase attributable to a promotion, above the baseline sales rate. | Campaign evaluation, trade promotion effectiveness |
| Planogram (POG) | A diagram showing exactly where and how products should be placed on retail shelves. Compliance = % of stores meeting the standard. | Retail execution, category management |
| Share of Shelf | Brand's facing count / total category facing count at a given retailer or store set. | Retail execution, planogram negotiation |
| Category Entry Points (CEPs) | Mental triggers consumers use when choosing a category (e.g., "something refreshing," "a healthy snack"). Brand health tools measure how strongly a brand is associated with each CEP. | Brand health tracking, creative strategy |
| Mental Market Share (MMS) | Proportion of category mental associations belonging to a brand — predicts future purchase share. | Brand equity measurement, scoring criteria |
| SOV (Share of Voice) | Brand's ad spend as % of total category advertising spend. If SOV > market share, brand tends to grow. | Media planning, brand investment decisions |
| Velocity | Units sold per store per week (also: SPSS = Sales Per Store per week). Core distribution quality metric. | Retail performance, buyer presentations |
| SKU Rationalization | The process of reducing a product portfolio to eliminate underperforming items. | Brand portfolio strategy, retailer negotiations |
| FSI (Free Standing Insert) | Coupon insert in Sunday newspapers — a traditional trade promotion vehicle still relevant for mass-market CPG. | Trade promotion planning |
| TPM (Trade Promotion Management) | The system and process for planning, executing, and evaluating trade promotions. Software: Vividly, AFS, Blacksmith. | Trade spend governance |
| Incremental Gross Margin | Additional gross profit generated by a promotion above baseline. Core denominator in trade ROI calculations. | Trade promotion analysis |
| OTIF (On-Time In-Full) | % of retail orders delivered on time and complete. Retail penalties triggered below ~98.5% (Walmart threshold). | Supply chain compliance, retailer scorecards |
| Digital Shelf | The brand's presence in online retail (Amazon, Walmart.com) — product content, reviews, search visibility. | eCommerce strategy, scoring dimension |

---

## Common Workflows

### Workflow 1: Campaign Brief Scoring

The core use case for Tool 1. A consultant or brand manager submits a campaign brief for AI evaluation.

1. **Brief Submission** — Consultant uploads or pastes a campaign brief (could be a PDF or text input). Selects client brand from account list and campaign type (TV, digital, trade, integrated).
2. **Criteria Configuration** — Tool applies default scoring rubric for that campaign type. Consultant can adjust criteria weights (e.g., "brand tone" more important for brand building campaigns; "claim clarity" more important for performance campaigns).
3. **AI Scoring Run** — Anthropic API processes the brief against the rubric. Typically 30-90 seconds. Status shows "Scoring..." with progress indication.
4. **Scorecard Output** — Structured output showing: overall score (0-100), dimension scores (6-8 criteria), dimension-level AI reasoning, flagged issues ("Claim on line 3 lacks substantiation"), and improvement recommendations.
5. **Consultant Review** — Consultant reviews the AI scorecard, adds their own commentary or overrides specific scores with notes.
6. **Delivery** — Consultant exports scorecard as PDF or shares a view-only link with the brand client.

### Workflow 2: Brand Health Scoring

The core use case for Tool 2. Evaluates a brand's market position across multiple health dimensions.

1. **Data Input** — Consultant inputs brand metrics: market share, distribution %, NPS, SOV, aided recall, ROAS, and recent campaign performance. Can be manual entry or CSV upload.
2. **Category Benchmarking** — Tool applies category benchmarks (from pre-loaded database or consultant-entered competitor data) to contextualize each metric.
3. **AI Analysis Run** — Anthropic API synthesizes inputs, identifies patterns, and generates a Brand Health Index score with dimensional breakdown.
4. **Health Report** — Output includes: Brand Health Index (0-100), strength/weakness matrix across dimensions (awareness, preference, loyalty, distribution, trade execution, digital shelf), priority recommendations.
5. **Trend Comparison** — If prior scoring runs exist for the brand, tool shows health trajectory over time (improving, stable, declining per dimension).
6. **Client Presentation** — Consultant uses the scorecard view as a presentation tool in brand reviews.

### Workflow 3: Scorecard History and Portfolio Review

A management-level workflow for consultancy principals reviewing client portfolio health.

1. **Portfolio Dashboard** — Shows all active client brands with their latest Brand Health Index and most recent scoring run date.
2. **Filter and Sort** — Filter by brand category (beverages, snacks, HPC), health tier (Excellent/Strong/Adequate/Needs Work), or recent activity.
3. **Flag Identification** — Highlights brands with declining health trends or urgent scoring requests.
4. **Export Report** — Generate a portfolio summary report for a consultancy all-hands or client steering committee.

---

## Common Edge Cases

1. **Incomplete Brief** — A brief is submitted with missing sections (no target audience defined, no success metrics). AI should return a "Minimum Viable Brief" warning with specific missing fields highlighted rather than a misleading high score.
2. **New Product Launch** — Brand has zero historical data (no market share, no distribution history). Scoring must still work with incomplete data — dimensions without data get "Insufficient Data" status rather than a zero score.
3. **Declining Brand Account** — A client brand's health score drops >15 points between scoring runs. System should surface this as a flag/alert on the portfolio dashboard.
4. **Conflicting Claims** — Campaign brief contains a claim that contradicts brand guidelines stored in the system (e.g., claims "all-natural" but product contains artificial preservatives). AI flags as a compliance risk.
5. **Re-scoring Same Brief** — Client revises the brief after receiving initial score and wants to re-score. System should show both versions with delta comparison ("Score improved from 64 → 78 after revision — +14 points").
6. **Overly Generic Brief** — Brief is technically complete but extremely vague ("increase brand awareness among adults"). AI should score low on specificity/measurability but provide detailed improvement guidance.
7. **Outlier Score Distribution** — Brief scores extremely high overall (92/100) but has one critical failing dimension (claim accuracy = 12/100). System must surface this as a critical flag rather than letting the high overall mask the critical issue.
8. **Stale Data Warning** — Brand health inputs are from 6+ months ago. System should flag that scores are based on potentially outdated data, especially for fast-moving categories.

---

## What Would Impress a Domain Expert

1. **"% ACV" as the distribution metric, not "coverage"** — Any CPG professional immediately knows "73% ACV" means more than "73% distribution." ACV-weighted distribution accounts for the fact that not all stores are equal. Showing ACV in the tool immediately signals domain knowledge.

2. **Score contextualization with category benchmarks** — A score of 67 is meaningless without context. If the tool shows "67 — Category average: 58 — Top quartile: 82," the practitioner knows exactly where they stand. This is how NielsenIQ and Circana always present data.

3. **Promotional lift vs. total sales lift distinction** — Total sales often increase during trade promotions due to stockpiling, but incremental lift (above baseline) is what matters for ROI. A scoring tool that distinguishes between total lift and incremental lift (adjusting for baseline regression) signals real understanding of trade marketing.

4. **Trade spend as % of gross revenue, not absolute dollars** — Experienced CPG finance and marketing people always think of trade spend as a percentage of gross sales. A tool that shows "$240,000 trade spend" is less useful than one showing "$240,000 (22.3% of gross)" — the percentage is the signal.

5. **The "Excess SOV" principle** — If a brand's Share of Voice exceeds its Market Share (SOV > SOM), the brand is on a growth trajectory. A brand health scoring tool that surfaces this relationship (and scores brands on SOV/SOM parity) shows awareness of how CPG brand growth actually works, based on the Ehrenberg-Bass model used by P&G and Unilever.

---

## Common Systems & Tools Used

1. **NielsenIQ Connect / Activate** — Primary syndicated data source for retail market share, distribution, velocity. Every CPG brand manager and consultant uses this.
2. **Circana (formerly IRI) Market Advantage / Unify** — Competing syndicated data platform. Circana is particularly strong in food/bev categories.
3. **SPINS** — Specialized in natural/organic CPG segment syndicated data. Used by Whole Foods suppliers and wellness-adjacent brands.
4. **Vividly (formerly Visualfabriq)** — Trade promotion management (TPM) software. Newer SaaS-style TPM tool popular with mid-market CPG brands.
5. **Salsify** — Product Information Management (PIM) and digital shelf content management. CPG brands use Salsify to manage their product content across retailers.
6. **Profitero+** — Digital shelf analytics. Tracks Amazon, Walmart.com presence — share of search, ratings, content scores, pricing.
7. **Crisp Data** — Retail data aggregator. Pulls POS data directly from retailer systems (Target, Kroger, Costco) for brands.
8. **Klaviyo / Attentive** — Email/SMS platforms for DTC-channel CPG brands.
9. **Numerator** — Consumer panel data focused on purchase behavior and promotional response.
10. **SAP TPM / AFS Technologies** — Enterprise-grade trade promotion management for large CPG manufacturers.

---

## Geographic / Cultural Considerations

This job appears to be US-based. Relevant specifics:
- **Retailer universe**: MULO (Multi-Outlet = food + drug + mass), Food, Drug, Club, Dollar, Convenience — these are the channel designations used in syndicated data. The tool should use these channel names, not generic "retail."
- **Fiscal year**: Many CPG companies run on a non-calendar fiscal year (P&G ends June 30; Unilever ends Dec 31). The tool should support custom fiscal year configuration in date ranges.
- **Currency**: USD. Dollar amounts should always show $ prefix, amounts in thousands formatted as "$XXK", millions as "$X.XM".
- **Retailer compliance**: Walmart OTIF penalties, Target INF (In-Full) requirements — these are US-specific compliance programs that CPG brands must track.
- **AC Nielsen vs. Circana**: Nielsen and Circana have different geographic market definitions (IRI markets vs. Nielsen markets). Consultants working across both data sources deal with this daily.

---

## Data Architect Notes

- **Primary datasets needed**:
  1. `scoringRuns` — Array of 15-20 scoring run records with: runId, brand account, tool type (brief_scorer | brand_health_scorer), date, overall score (34-96), status, consultant assigned, scoring criteria array with per-dimension scores
  2. `brandAccounts` — Array of 12-15 client brands with: brandId, company name, category (beverages | snacks | HPC | pet | nutrition | dairy), account status, brand health index (38-91), last scored date
  3. `scoringCriteria` — Array of 10-12 criteria/dimensions used across the two tools, with weight % and description
  4. `scorecardOutputs` — Detailed scoring results for 5-6 runs with full dimensional breakdown, AI reasoning snippets, flagged issues
  5. `consultants` — Array of 8-10 consultant profiles with roles

- **Entity naming**: Use `scoringRun` not `analysis`; `scorecard` not `report`; `brandAccount` not `client`; `brief` not `document`; `dimension` not `category`

- **Status strings (exact)**: `"Scoring"`, `"Scored"`, `"Under Review"`, `"Delivered"`, `"Archived"`, `"Incomplete Brief"`, `"Flagged"`

- **Score tier thresholds**: Excellent = 90-100, Strong = 75-89, Adequate = 60-74, Needs Work = 40-59, Critical = 0-39

- **Date patterns**: CPG uses 4-week periods (not calendar months). Show "P4 2025" (Period 4) alongside calendar dates for realism. Chart time-series should show last 12 periods (not months).

- **Key edge case records to include**:
  - One scorecard where overall is high (88) but one dimension is critically low (Claim Accuracy: 14) — must be surfaced as a flag
  - One brand account with declining health (dropped from 74 → 58 over 3 scoring runs)
  - One scoring run with status "Incomplete Brief" — missing target audience and KPIs
  - One new product launch with "Insufficient Data" on distribution dimensions (brand launched 6 weeks ago)

## Layout Builder Notes

- **Density**: Standard-to-compact. Set `--content-padding: 1.25rem`, `--card-padding: 1rem`. Table rows should use compact padding.
- **Sidebar width**: 16rem standard is appropriate. Navigation labels fit within this width.
- **Color calibration**: For SaaS Modern aesthetic, shift primary toward medium-depth indigo or teal-blue. Avoid warm green (reads as "consumer wellness") or saturated blue (reads as generic enterprise). Target: `oklch(0.50 0.16 245)` — a professional indigo that reads "analytics platform."
- **Score visualization pattern**: Use color-coded score badges with tier labels — green (Excellent/Strong), amber (Adequate), red (Needs Work/Critical). This is the dominant visual pattern across CPG analytics tools.
- **Status badge colors**: Always use traffic-light convention (green/amber/red). CPG practitioners have internalized this pattern from Nielsen/Circana tools.
- **Typography**: Use tabular-nums on all numeric columns. Right-align all number columns in tables. This is non-negotiable for analytics tools — misaligned numbers immediately read as unprofessional.

## Demo Screen Builder Notes

- **Hero metric (largest stat card)**: "Scorecards Delivered" or "Average Brief Score" — the primary productivity metric of a scoring consultancy is throughput and quality of output.
- **Most important chart type**: Bar chart for score distribution (how many scorecards fell in each tier: Excellent/Strong/Adequate/Needs Work/Critical). This is more useful than a time-series for a scoring tool.
- **Secondary chart**: Line/area chart showing average brand health index trend over the past 12 periods for the consultancy's portfolio.
- **Domain-specific panel that would impress**: A **live scorecard feed** — recent scoring activity showing run ID, brand, tool, score, tier badge, and consultant. Sorted by most recent. This mirrors the "recent transactions" pattern from finance tools and would feel immediately familiar to consultants.
- **Key screens for dashboard-app format**:
  1. **Portfolio Overview** (main `/` page) — stat cards (total scorecards, avg score, brands active, flagged items), score distribution bar chart, recent scoring activity feed, flagged items panel
  2. **Scoring Tool** (feature page) — the AI tool interface with form input + processing state + output display
  3. **Scorecard Archive** (feature page) — filterable table of all scoring runs
  4. **Brand Accounts** (feature page) — client brand list with health index cards
- **Formatting note**: Score outputs should use structured card layouts with dimension scores shown as labeled progress bars (not numbers alone). This is how practitioners in this space present scoring results to brand clients — visual, structured, exportable.
