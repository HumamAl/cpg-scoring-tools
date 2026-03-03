Hi,

Your scoring tools are built — the Anthropic API key just needs to move server-side before this goes to your team. I built a working version of this before reaching out: https://cpg-scoring-tools.vercel.app

Demo shows Clerk.dev login, two protected tool pages, and the Next.js API proxy routing Anthropic calls server-side — key never touches the browser bundle.

Previously used this pattern on WMF Agent Dashboard: replaced a 4-hour manual process with a 20-minute structured Claude API flow, all through authenticated Next.js routes.

Are both scoring tools on the same page, or do they need separate routes?

10-minute call or I can send a Loom walkthrough of the repo — your pick.

Humam
