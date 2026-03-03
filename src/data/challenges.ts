import type { Challenge } from "@/lib/types";

export interface ExecutiveSummaryData {
  commonApproach: string;
  differentApproach: string;
  accentWord?: string;
}

export const executiveSummary: ExecutiveSummaryData = {
  commonApproach:
    "Most developers deploy React components into a Next.js app by wrapping them in a new layout, adding a third-party auth library, and calling the Anthropic API directly from the client — leaving the API key in the browser bundle and the scoring tools accessible to anyone who can open a network tab.",
  differentApproach:
    "I move the Anthropic API key fully server-side using Next.js API routes, wire Clerk.dev middleware to intercept every request before it reaches a scoring tool, and drop your existing React components into protected pages without touching their internal logic — clean separation, zero rework on the AI components themselves.",
  accentWord: "server-side",
};

export const challenges: Challenge[] = [
  {
    id: "challenge-1",
    title: "Moving the Anthropic API Key Server-Side",
    description:
      "Your current .jsx setup calls the Anthropic SDK directly from the browser. That puts the API key in every user's network inspector — a single leaked key means unauthorized AI access and unexpected billing. The fix requires an API route proxy that the React components call instead, with the key stored only in Vercel environment variables.",
    visualizationType: "before-after",
    outcome:
      "Could eliminate API key exposure in the browser bundle — the #1 security risk in the current .jsx setup — with no changes to how the scoring components process results.",
  },
  {
    id: "challenge-2",
    title: "Wrapping React Components Without Refactoring Them",
    description:
      "Your two scoring tool components were built as standalone .jsx files. Integrating them into a Next.js authenticated app without breaking their state management or event handling requires a clean shell architecture: a protected Next.js route that imports the component, passes required props, and handles the Clerk session boundary — while the component itself stays untouched.",
    visualizationType: "before-after",
    outcome:
      "Could preserve all existing scoring logic while adding login protection — zero rework on the AI components themselves, reducing integration risk and keeping your existing tool behavior intact.",
  },
  {
    id: "challenge-3",
    title: "Enforcing Auth-Gated Routing with Clerk Middleware",
    description:
      "Without a middleware layer, an unauthenticated user who knows the URL can reach a scoring tool directly, bypassing any UI-level login redirect. Clerk's middleware runs at the edge on every request and redirects unauthenticated sessions before the page component even loads — no manual session checking required in each route.",
    visualizationType: "flow",
    outcome:
      "Could make the internal tool fully private with Clerk.dev middleware — no manual session checking in every component, and no route that can be accessed by guessing a URL.",
  },
];
