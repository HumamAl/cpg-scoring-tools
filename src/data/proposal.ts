import type { Profile, PortfolioProject } from "@/lib/types";

export const profile: Profile = {
  name: "Humam",
  tagline:
    "Your scoring tools are already built — I wrap them in a secure, login-protected Next.js app with the Anthropic key moved server-side, Clerk.dev auth, and a clean Vercel deploy.",
  bio: "I build authenticated internal tools on Next.js and Vercel. The demo in Tab 1 shows the exact architecture you described: Clerk.dev session management, two protected tool pages, and an API proxy that keeps the Anthropic key out of the browser.",
  approach: [
    {
      title: "Assess",
      description:
        "Review your two .jsx files, map the Anthropic API call sites, and confirm the expected input/output shape. One short call or async Q&A — whatever works for you.",
    },
    {
      title: "Wrap",
      description:
        "Scaffold the Next.js app, install Clerk.dev, and mount your existing components as protected pages behind Clerk middleware. No refactoring of your scoring logic — it stays exactly as written.",
    },
    {
      title: "Secure",
      description:
        "Move the Anthropic API call into a Next.js API route reading ANTHROPIC_API_KEY from server-side env vars. The key never touches the browser bundle. Add the Clerk auth() guard so only authenticated sessions can hit the route.",
    },
    {
      title: "Deploy",
      description:
        "Push to Vercel with HTTPS enforced, confirm environment variables are set in the Vercel dashboard, and hand off a private GitHub repo with a clean README. Done in 4–5 days from kickoff.",
    },
  ],
  skillCategories: [
    {
      name: "Auth & Security",
      skills: ["Clerk.dev", "Next.js Middleware", "JWT Validation", "Server-side Env Vars"],
    },
    {
      name: "Framework & API",
      skills: ["Next.js App Router", "React", "TypeScript", "Next.js API Routes", "REST Proxy"],
    },
    {
      name: "AI Integration",
      skills: ["Anthropic API", "Claude API", "Structured Output", "Server-side Key Management"],
    },
    {
      name: "Deployment",
      skills: ["Vercel", "GitHub", "HTTPS", "Environment Config"],
    },
  ],
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "wmf-agent",
    title: "WMF Agent Dashboard",
    description:
      "AI-powered customer service agent for Windsor Metal Finishing — email classification, RFQ data extraction with confidence scoring, and a human-in-the-loop approval workflow. Uses authenticated Next.js API routes to call the Claude API server-side.",
    outcome:
      "Replaced a 4-hour manual quote review process with a 20-minute structured extraction and approval flow",
    tech: ["Next.js", "Claude API", "TypeScript", "n8n", "Microsoft Graph"],
    liveUrl: "https://wmf-agent-dashboard.vercel.app",
    relevance:
      "Same architecture you need: authenticated Next.js app + Anthropic API called server-side through protected API routes.",
  },
  {
    id: "ebay-monitor",
    title: "eBay Pokemon Monitor",
    description:
      "eBay Browse API monitoring tool with real-time listing alerts and price tracking. Demonstrates the server-side API key management pattern — eBay credentials live in env vars and are proxied through a Next.js API route, never exposed client-side.",
    outcome:
      "Real-time listing monitor with webhook-based Discord alerts and price trend tracking",
    tech: ["Next.js", "TypeScript", "REST API Proxy", "Server-side Key Mgmt"],
    liveUrl: "https://ebay-pokemon-monitor.vercel.app",
    relevance:
      "The API proxy pattern here is exactly what your Anthropic key needs — third-party key in env vars, all calls routed server-side.",
  },
  {
    id: "lead-crm",
    title: "Lead Intake CRM",
    description:
      "Multi-page Next.js app with public intake form, CRM dashboard, lead scoring, pipeline management, and configurable automation rules. Clean authenticated routing — each section gated behind a login check with role-aware navigation.",
    outcome:
      "End-to-end lead flow — public intake form to scored pipeline with configurable automation rules",
    tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
    liveUrl: undefined,
    relevance:
      "Shows the multi-page authenticated Next.js app pattern — same structure your two scoring tool pages will use.",
  },
  {
    id: "data-intelligence",
    title: "Data Intelligence Platform",
    description:
      "Unified analytics dashboard pulling data from multiple sources with interactive charts and filterable insights. Multi-tool architecture with distinct pages per tool, each loading independently — similar to how your two scoring tools will work as separate authenticated pages.",
    outcome:
      "Unified analytics dashboard pulling data from multiple sources with interactive charts and filterable insights",
    tech: ["Next.js", "TypeScript", "Recharts", "shadcn/ui"],
    liveUrl: "https://data-intelligence-platform-sandy.vercel.app",
    relevance:
      "Multi-tool dashboard with distinct pages per tool — the structural equivalent of your two scoring tools as separate routes.",
  },
];
