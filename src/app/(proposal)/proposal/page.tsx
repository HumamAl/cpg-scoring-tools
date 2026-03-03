import { APP_CONFIG } from "@/lib/config";
import { profile, portfolioProjects } from "@/data/proposal";
import { ProjectCard } from "@/components/proposal/project-card";
import { SkillsGrid } from "@/components/proposal/skills-grid";

// Stats pulled from developer-profile.md — exact numbers, never inflated
const heroStats = [
  { value: "24+", label: "Projects Shipped" },
  { value: "< 48hr", label: "Demo Turnaround" },
  { value: "15+", label: "Industries Served" },
];

export default function ProposalPage() {
  // clientName is null for this job — use projectName instead
  const displayName = APP_CONFIG.clientName ?? APP_CONFIG.projectName;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-12">

      {/* ── Section 1: Hero (Project Brief) ── */}
      <section
        className="relative rounded-2xl overflow-hidden"
        style={{ background: "oklch(0.10 0.02 var(--primary-h, 260))" }}
      >
        {/* Subtle radial highlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top, oklch(0.52 0.17 260 / 0.12) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 p-8 md:p-12">
          {/* "Built this demo for your project" badge — mandatory, all aesthetics */}
          <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-white/10 border border-white/10 text-white/80 px-3 py-1 rounded-full mb-6">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
            </span>
            Built this demo for your project
          </span>

          {/* Role prefix — adapted to this deployment job */}
          <p className="font-mono text-xs tracking-widest uppercase text-white/50 mb-4">
            Next.js Developer &middot; Auth &amp; API Integration
          </p>

          {/* Weight-contrast headline */}
          <h1 className="text-5xl md:text-6xl tracking-tight leading-none mb-4">
            <span className="font-light text-white/80">Hi, I&apos;m</span>{" "}
            <span className="font-black text-white">Humam</span>
          </h1>

          {/* Tailored value prop — specific to this deployment job */}
          <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed mb-2">
            {profile.tagline}
          </p>
        </div>

        {/* Stats shelf */}
        <div className="relative z-10 border-t border-white/10 bg-white/5 px-8 py-4">
          <div className="grid grid-cols-3 gap-4">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-2xl font-bold"
                  style={{
                    background: "linear-gradient(to right, white, oklch(1 0 0 / 0.7))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 2: Proof of Work ── */}
      <section className="space-y-4">
        <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
          Proof of Work
        </p>
        <h2 className="text-2xl font-bold tracking-tight">Relevant Projects</h2>

        <div className="grid gap-4 md:grid-cols-2">
          {portfolioProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              tech={project.tech}
              relevance={project.relevance}
              outcome={project.outcome}
              liveUrl={project.liveUrl}
            />
          ))}
        </div>
      </section>

      {/* ── Section 3: How I Work ── */}
      {/* Steps are job-specific: Assess → Wrap → Secure → Deploy (not generic Understand/Build/Ship/Iterate) */}
      <section className="space-y-4">
        <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
          Process
        </p>
        <h2 className="text-2xl font-bold tracking-tight">How I Work</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {profile.approach.map((step, i) => {
            const stepLabels = ["01", "02", "03", "04"];
            const timelines = ["Day 1", "Days 1–2", "Days 2–3", "Days 4–5"];
            return (
              <div
                key={step.title}
                className="rounded-lg border border-border/60 bg-card p-5 space-y-2 shadow-[0_1px_2px_0_rgb(0_0_0/0.03)] hover:border-primary/30 transition-colors"
                style={{ transitionDuration: "var(--dur-fast, 100ms)" }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
                    Step {stepLabels[i]}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground/60">
                    {timelines[i]}
                  </span>
                </div>
                <h3 className="text-base font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Section 4: Skills Grid ── */}
      {/* Filtered to what matters for THIS job — auth, API proxy, deployment */}
      <section className="space-y-4">
        <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
          Tech Stack
        </p>
        <h2 className="text-2xl font-bold tracking-tight">What I Build With</h2>
        <SkillsGrid categories={profile.skillCategories} />
      </section>

      {/* ── Section 5: CTA (Dark Panel) ── */}
      <section
        className="relative rounded-2xl overflow-hidden text-center"
        style={{ background: "oklch(0.10 0.02 var(--primary-h, 260))" }}
      >
        <div className="relative z-10 p-8 md:p-12 space-y-4">

          {/* Pulsing availability indicator — mandatory, uses var(--success) */}
          <div className="flex items-center justify-center gap-2">
            <span className="relative inline-flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-[color:var(--success)]" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[color:var(--success)]" />
            </span>
            <span
              className="text-sm"
              style={{ color: "color-mix(in oklch, var(--success) 80%, white)" }}
            >
              Currently available for new projects
            </span>
          </div>

          {/* Tailored headline — specific to this project */}
          <h2 className="text-2xl font-bold text-white">
            Ready to move your Anthropic key server-side and get this shipped.
          </h2>

          {/* Specific body copy — references the demo in Tab 1 */}
          <p className="text-white/70 max-w-lg mx-auto leading-relaxed">
            The demo in Tab 1 runs the exact stack you described — Clerk.dev auth, Next.js API
            proxy, two protected {displayName} pages. The real version delivers your existing
            components wrapped and deployed to Vercel in 4–5 days.
          </p>

          {/* Primary action — text, never a dead button */}
          <p className="text-lg font-semibold text-white pt-2">
            Reply on Upwork to start
          </p>

          {/* Back-link to demo */}
          <a
            href="/"
            className="inline-flex items-center gap-1 text-sm text-white/50 hover:text-white/70 transition-colors"
            style={{ transitionDuration: "var(--dur-fast, 100ms)" }}
          >
            &#8592; Back to the demo
          </a>

          {/* Signature */}
          <p className="pt-4 text-sm text-white/40 border-t border-white/10 mt-4">
            — Humam
          </p>
        </div>
      </section>

    </div>
  );
}
