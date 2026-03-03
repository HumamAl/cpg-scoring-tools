# Job Analysis Brief — CPG Scoring Tools

## Job Summary

**Title:** Freelance Programmer needed to develop AI-powered scoring tools
**Budget:** $300–600 fixed-price
**Level:** Intermediate
**Posted:** 8 minutes ago (US-only)
**Nature:** Deployment/integration job — client already has two React components (.jsx files) powered by the Anthropic API. They need secure wrapping (auth), an API proxy, and Vercel deployment.

---

## Analysis Brief (JSON)

```json
{
  "domain": "tech",
  "clientName": null,
  "features": [
    "login-protected app shell with Clerk.dev authentication",
    "two AI-powered scoring tools as protected pages",
    "server-side Anthropic API proxy via Next.js API routes",
    "role-guarded routing (authenticated-only access)",
    "Vercel deployment with HTTPS enforced",
    "private GitHub repo handoff with clean project structure"
  ],
  "challenges": [
    {
      "title": "Moving the Anthropic API key server-side without breaking tool functionality",
      "vizType": "architecture-sketch",
      "outcome": "Could eliminate API key exposure in the browser bundle — the #1 security risk in their current .jsx setup"
    },
    {
      "title": "Wrapping existing React components in an authenticated Next.js app without refactoring them",
      "vizType": "before-after",
      "outcome": "Could preserve all existing scoring logic while adding login protection — zero rework on the AI components themselves"
    },
    {
      "title": "Enforcing auth-gated routing so unauthenticated users cannot reach scoring tools",
      "vizType": "flow-diagram",
      "outcome": "Could make the internal tool fully private with Clerk.dev middleware — no manual session checking in every component"
    }
  ],
  "portfolioProjects": [
    "WMF Agent Dashboard",
    "eBay Pokemon Monitor",
    "Lead Intake CRM",
    "Data Intelligence Platform"
  ],
  "coverLetterHooks": [
    "AI logic is already built — they just need secure wrapping",
    "Anthropic API key needs to move server-side (currently exposed in client)",
    "Clerk.dev preferred — specific auth stack named",
    "full technical brief attached — reads as someone who knows exactly what they want",
    "fixed-price with ~5-day timeline and clean handoff to private GitHub repo"
  ],
  "screeningQuestions": [
    {
      "question": "Your fixed-price quote",
      "answer": "I'm quoting $450 fixed for the full scope: Clerk.dev auth, Next.js API proxy for the Anthropic key, Vercel deployment with HTTPS, and private GitHub repo handoff — delivered in 4–5 days. I've built a working demo of this exact architecture: {VERCEL_URL}"
    },
    {
      "question": "Which auth + hosting stack you'd use and why",
      "answer": "Clerk.dev + Vercel — matches your brief exactly. Clerk handles session management, JWT validation, and the middleware auth guard with minimal setup. Vercel gives HTTPS out of the box and zero-config Next.js deploys. The demo at {VERCEL_URL} runs this exact stack."
    },
    {
      "question": "Describe in 2–3 sentences how you would implement a server-side API proxy in Next.js to protect a third-party API key",
      "answer": "Create a Next.js API route (e.g., /api/score) that reads ANTHROPIC_API_KEY from server-side environment variables and calls the Anthropic API directly — the key never touches the browser. Add Clerk's auth() check at the top of the route handler so only authenticated sessions can trigger it. The existing React components call /api/score instead of the Anthropic SDK directly."
    },
    {
      "question": "One link to a previous Next.js project with authenticated API routes",
      "answer": "WMF Agent Dashboard — https://wmf-agent-dashboard.vercel.app — uses authenticated Next.js API routes for the Claude API pipeline and a human-in-the-loop approval workflow. The demo at {VERCEL_URL} is the direct equivalent for your use case."
    },
    {
      "question": "Your availability for a 30-min kickoff call",
      "answer": "Available this week — Monday through Friday, EST mornings or afternoons. Reply on Upwork and I'll send a Calendly link."
    }
  ],
  "aestheticProfile": {
    "aesthetic": "linear",
    "demoFormat": "dashboard-app",
    "formatRationale": "The deliverable is a login-protected internal web app with two tool pages — a sidebar dashboard with authenticated routing is the exact structural match. The client described 'an internal web application' with distinct tool pages accessed behind a login.",
    "mood": "clean, technical, internal-tool precision",
    "colorDirection": "indigo at oklch(0.52 0.17 260) — standard chroma, dev-tool restraint",
    "densityPreference": "standard",
    "justification": "The client is a CPG marketing consultancy running developer tooling internally — they named Clerk.dev, Next.js API routes, and Vercel by name, signaling technical fluency. The job is a deployment/integration task, not a consumer product — the visual language should read as a clean internal tool, not a branded app. SaaS/dev tool aesthetics (Linear/Minimal) match the Clerk + Next.js + Vercel stack they've specified and the 'secure authenticated web app' framing of their brief."
  },
  "clientVocabulary": {
    "primaryEntities": ["scoring tool", "tool", "internal web application", "React component"],
    "kpiLabels": ["scoring tool usage", "active sessions", "API calls proxied", "authenticated users"],
    "statusLabels": ["Authenticated", "Unauthenticated", "Processing", "Score Ready", "Error"],
    "workflowVerbs": ["score", "authenticate", "proxy", "deploy", "hand off"],
    "sidebarNavCandidates": ["Scoring Tools", "Tool 1", "Tool 2", "Settings", "API Status"],
    "industryTerms": ["CPG", "marketing consultancy", "Anthropic API", "Clerk.dev", "server-side proxy", "HTTPS", "login-protected"]
  },
  "designSignals": "The client runs a CPG marketing consultancy and built their own AI scoring tools as React components — they are technical enough to name Clerk.dev and Next.js API routes but are not full-stack developers themselves. They would evaluate the demo by checking: does login work, are the tools accessible after auth, does the API key stay server-side. Visual polish matters less than architectural correctness. A clean, functional internal tool aesthetic (no decorative noise, clear navigation, auth state visible) would read as competent to this client.",
  "accentColor": "indigo",
  "signals": ["TECH_SPECIFIC", "DETAILED_SPEC"],
  "coverLetterVariant": "A",
  "domainResearcherFocus": "Focus on CPG marketing consultancy tooling — the client's two 'scoring tools' likely evaluate CPG products, campaigns, or brand attributes using AI. Relevant CPG terminology: SKU performance, brand health score, shelf position scoring, promotional lift, distribution coverage, velocity (units/store/week). Entity names for mock data: CPG brands (Unilever, P&G, Kraft Heinz, General Mills), product categories (personal care, snacks, beverages, household), retail channels (Walmart, Target, Kroger, Costco). Metric ranges: brand health scores 0–100, distribution coverage 40–95%, promotional lift 5–30%. Real tools CPG consultants use: Nielsen, IRI/Circana, Kantar, Stackline — the scoring tools being built likely complement these. Edge cases: scoring a product with missing data fields, handling Anthropic API rate limits, tool output with low confidence scores."
}
```

---

## Aesthetic Profile — Expanded Reasoning

### Domain: `tech` (SaaS deployment/integration)

The job is not primarily about CPG — it is about deploying a secure internal web application. The client's vocabulary skews technical: "server-side proxy," "Next.js API routes," "Clerk.dev," "HTTPS enforced," "private GitHub repo." The product they're building is developer infrastructure (auth-wrapped Next.js app), not a CPG analytics platform.

**Industry-to-aesthetic routing for SaaS/Dev Tools:**
- Primary: `linear` (clean, technical, B2B internal tool)
- Secondary: `dark-premium`
- Never: `warm-organic`, `retrofuturism`

**Chosen: `linear`** — the deliverable is a clean internal tool for a consultancy team. The Clerk + Next.js + Vercel stack they named is the exact stack that `linear` aesthetics are associated with. No consumer-facing elements, no brand expression needed.

### Demo Format: `dashboard-app`

The client described "a secure, authenticated internal web application" with two distinct tool pages. A sidebar dashboard with authenticated routing is the structural match — mimics exactly what they want delivered. Login page → authenticated sidebar → two tool pages.

### Color: Indigo `oklch(0.52 0.17 260)`

Tech domain starting point. Standard chroma (not enterprise-reduced, not consumer-boosted) — internal tool, neither corporate nor energetic. Indigo reads as developer tooling without being too bold.

### Density: `standard`

Two tool pages, a clean sidebar, minimal data tables. Not a data-heavy ops dashboard (no `compact`). Not a consumer wellness app (no `spacious`). Standard SaaS density.

---

## Portfolio Project Rationale

1. **WMF Agent Dashboard** — PRIMARY. Uses Claude API with server-side API routes and a human-in-the-loop workflow. Closest feature match: authenticated Next.js app + Anthropic API + server-side processing.
2. **eBay Pokemon Monitor** — SECONDARY. Best match for API integration and server-side key management pattern. Shows REST API proxying experience.
3. **Lead Intake CRM** — TERTIARY. Shows clean, structured internal tool architecture — multi-page Next.js app with role-based routing. Demonstrates the "clean authenticated app" pattern.
4. **Data Intelligence Platform** — QUATERNARY. Demonstrates multi-tool dashboard architecture with distinct pages per tool.

**Not selected:** Healthcare, fintech, or marketplace projects — domain mismatch. ConstructionIQ, DealerHub — impressive but irrelevant.

---

## Cover Letter Notes (for Cover Letter Writer)

**Variant:** A ("Built It Already")

**Opening hook:** "Your scoring tools are already built — the Anthropic key just needs to move server-side before this goes to your team."

**Demo link sentence:** Built a working version of this exact setup — Clerk auth, Next.js API proxy, two protected tool pages: {VERCEL_URL}

**Embedded question:** "Are both tools on the same page, or do they need separate routes?"

**Tone:** Technical peer. They know their stack. Match it — don't explain what Clerk.dev is.

**Binary CTA:** "10-minute call or I can send a Loom walkthrough of the repo — your pick."

**"Done =" statement:**
> Done = login working, both scoring tools accessible only to authenticated users, ANTHROPIC_API_KEY confirmed server-side only (no browser exposure), Vercel deploy live on HTTPS, private GitHub repo transferred.

---

## Screening Question Strategy

All 5 screening questions require direct, specific answers. This client will filter proposals that are vague. Key tactics:

1. **Fixed-price quote** — Name a number ($450) and justify it in one sentence. Never give a range.
2. **Auth + hosting stack** — Echo their exact preference (Clerk.dev + Vercel) and explain why briefly. Referencing the demo URL is the differentiator.
3. **Server-side API proxy** — This is a hidden test. Answer it precisely with the exact Next.js pattern (API route + env var + auth check). Anyone who fumbles this answer is filtered out.
4. **Previous Next.js project with auth API routes** — WMF Agent Dashboard is the best match. Lead with the URL.
5. **Kickoff call availability** — Short, direct, actionable.

The demo link should appear in answers #1, #2, and #4.

---

## Quality Checklist

- [x] Domain is most specific match (`tech` — this is a SaaS deployment/integration job, not a CPG domain build)
- [x] Aesthetic actively chosen from signals — `linear` justified by named tech stack (Clerk.dev, Next.js, Vercel)
- [x] `demoFormat` chosen from signals — `dashboard-app` matches "internal web application with two tool pages"
- [x] `formatRationale` explains why format matches the deliverable type
- [x] Aesthetic justification references 2-3 specific job signals
- [x] Client vocabulary contains exact terms from the job post ("scoring tool", "server-side proxy", "login-protected", "Clerk.dev")
- [x] Sidebar nav candidates use client terminology ("Scoring Tools" not "Analytics")
- [x] Features list has 6 items with domain-specific names
- [x] Each challenge has title, vizType, AND outcome with qualifier language
- [x] Portfolio projects ranked by relevance (WMF Agent Dashboard > eBay Monitor > Lead Intake CRM > Data Intelligence Platform)
- [x] Cover letter hooks are specific phrases from the post (not generic)
- [x] All 5 screening questions addressed verbatim with specific answers
- [x] Screening answers are 2-3 sentences max, reference demo link
- [x] Domain researcher focus notes include jargon, entity names, metric ranges, real tools, edge cases
