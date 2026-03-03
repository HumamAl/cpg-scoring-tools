# Screening Answers — CPG Scoring Tools

---

## Q1: Your fixed-price quote

$450 fixed — Clerk.dev auth, Next.js API proxy for the Anthropic key, Vercel deployment with HTTPS, and private GitHub repo handoff, delivered in 4–5 days.

Built a working demo of this exact architecture: {VERCEL_URL}

---

## Q2: Which auth + hosting stack you'd use and why

Clerk.dev + Vercel — your exact preference. Clerk handles session management, JWT validation, and the middleware auth guard with minimal setup. Vercel gives HTTPS out of the box and zero-config Next.js deploys.

The demo at {VERCEL_URL} runs this exact stack.

---

## Q3: Describe in 2–3 sentences how you would implement a server-side API proxy in Next.js to protect a third-party API key

Create a Next.js API route (e.g., `/api/score`) that reads `ANTHROPIC_API_KEY` from server-side environment variables and calls the Anthropic API directly — the key never touches the browser. Add Clerk's `auth()` check at the top of the route handler so only authenticated sessions can trigger it. The existing React components call `/api/score` instead of the Anthropic SDK directly.

---

## Q4: One link to a previous Next.js project with authenticated API routes

WMF Agent Dashboard — https://wmf-agent-dashboard.vercel.app — uses authenticated Next.js API routes for the Claude API pipeline and a human-in-the-loop approval workflow.

The demo at {VERCEL_URL} is the direct equivalent for your use case.

---

## Q5: Your availability for a 30-min kickoff call

Available this week — Monday through Friday, EST mornings or afternoons. Reply on Upwork and I'll send a Calendly link.
