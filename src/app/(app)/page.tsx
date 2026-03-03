"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Minus,
  Users,
  Zap,
  Flag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { APP_CONFIG } from "@/lib/config";
import {
  dashboardStats,
  scoringVolumeByPeriod,
  scoreTierDistribution,
  scoringActivityFeed,
  brandHealthTrend,
  getFlaggedRuns,
  SCORE_TIER_CONFIG,
  SCORING_RUN_STATUS_CONFIG,
} from "@/data/mock-data";
import type {
  DashboardStats,
  ScoringVolumeByPeriod,
  ScoringActivityFeedItem,
} from "@/lib/types";

// ─── SSR-safe chart imports ───────────────────────────────────────────────────

const ScoringVolumeChart = dynamic(
  () =>
    import("@/components/dashboard/scoring-volume-chart").then(
      (m) => m.ScoringVolumeChart
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[280px] bg-muted/20 rounded-md animate-pulse" />
    ),
  }
);

const BrandHealthTrendChart = dynamic(
  () =>
    import("@/components/dashboard/brand-health-trend-chart").then(
      (m) => m.BrandHealthTrendChart
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[200px] bg-muted/20 rounded-md animate-pulse" />
    ),
  }
);

const ScoreTierDistributionChart = dynamic(
  () =>
    import("@/components/dashboard/score-tier-distribution-chart").then(
      (m) => m.ScoreTierDistributionChart
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[180px] bg-muted/20 rounded-md animate-pulse" />
    ),
  }
);

// ─── Animated counter hook ────────────────────────────────────────────────────

function useCountUp(target: number, duration: number = 1200) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

// ─── Stat card subcomponent ───────────────────────────────────────────────────

interface StatCardProps {
  title: string;
  value: number;
  change: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  description: string;
  icon: React.ReactNode;
  index: number;
  highlight?: boolean;
}

function StatCard({
  title,
  value,
  change,
  suffix,
  prefix,
  decimals = 0,
  description,
  icon,
  index,
  highlight,
}: StatCardProps) {
  const { count, ref } = useCountUp(
    decimals > 0 ? Math.round(value * 10) : value,
    1100
  );
  const displayValue =
    decimals > 0
      ? (count / 10).toFixed(decimals)
      : count.toLocaleString();

  const isPositive = change > 0;
  const isNeutral = change === 0;

  return (
    <div
      ref={ref}
      className={cn(
        "linear-card animate-fade-up-in",
        highlight && "border-warning/40 bg-warning/5"
      )}
      style={{
        padding: "var(--card-padding)",
        animationDelay: `${index * 50}ms`,
        animationDuration: "150ms",
        animationFillMode: "both",
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide leading-none">
          {title}
        </p>
        <span className="text-muted-foreground/60 shrink-0">{icon}</span>
      </div>

      <div className="mt-2 font-mono tabular-nums">
        <span className="text-2xl font-bold text-foreground">
          {prefix}
          {displayValue}
          {suffix}
        </span>
      </div>

      <div className="mt-1.5 flex items-center gap-1.5">
        {isNeutral ? (
          <Minus className="w-3 h-3 text-muted-foreground" />
        ) : isPositive ? (
          <TrendingUp className="w-3 h-3 text-success" />
        ) : (
          <TrendingDown className="w-3 h-3 text-destructive" />
        )}
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

// ─── Score tier badge ─────────────────────────────────────────────────────────

function ScoreTierBadge({ tier }: { tier: string | null }) {
  if (!tier) return null;
  const cfg = SCORE_TIER_CONFIG[tier];
  if (!cfg) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border",
        cfg.bgClass,
        cfg.colorClass
      )}
    >
      {cfg.label}
    </span>
  );
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const cfg = SCORING_RUN_STATUS_CONFIG[status];
  if (!cfg) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium border",
        cfg.bgClass,
        cfg.colorClass
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", cfg.dotClass)} />
      {cfg.label}
    </span>
  );
}

// ─── Activity feed item ───────────────────────────────────────────────────────

function ActivityFeedItem({ item }: { item: ScoringActivityFeedItem }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-border/40 last:border-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-mono text-muted-foreground/60">
            {item.runRef}
          </span>
          <StatusBadge status={item.status} />
          {item.hasFlag && (
            <AlertTriangle className="w-3 h-3 text-warning shrink-0" />
          )}
        </div>
        <p className="text-sm font-medium text-foreground mt-0.5 truncate">
          {item.brandName}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-muted-foreground truncate">
            {item.toolLabel}
          </span>
          <span className="text-muted-foreground/40">·</span>
          <span className="text-xs text-muted-foreground">{item.consultantName}</span>
        </div>
      </div>
      <div className="shrink-0 text-right">
        {item.overallScore !== null ? (
          <div>
            <span className="text-base font-bold font-mono tabular-nums text-foreground">
              {item.overallScore}
            </span>
            <div className="mt-0.5">
              <ScoreTierBadge tier={item.scoreTier} />
            </div>
          </div>
        ) : (
          <span className="text-xs text-muted-foreground">—</span>
        )}
        <p className="text-[10px] text-muted-foreground/60 mt-1">
          {item.relativeTime}
        </p>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

type PeriodFilter = "last_6" | "last_9" | "all_12";

export default function PortfolioOverviewPage() {
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>("all_12");
  const [toolFilter, setToolFilter] = useState<"all" | "brief" | "brand">("all");

  // Filter scoring volume chart data by period
  const chartData = useMemo<ScoringVolumeByPeriod[]>(() => {
    if (periodFilter === "last_6") return scoringVolumeByPeriod.slice(-6);
    if (periodFilter === "last_9") return scoringVolumeByPeriod.slice(-9);
    return scoringVolumeByPeriod;
  }, [periodFilter]);

  // Filter health trend by same period
  const healthTrendData = useMemo(() => {
    if (periodFilter === "last_6") return brandHealthTrend.slice(-6);
    if (periodFilter === "last_9") return brandHealthTrend.slice(-9);
    return brandHealthTrend;
  }, [periodFilter]);

  // Filter activity feed by tool type
  const filteredFeed = useMemo(() => {
    if (toolFilter === "all") return scoringActivityFeed;
    if (toolFilter === "brief")
      return scoringActivityFeed.filter((f) =>
        f.toolLabel.includes("Brief")
      );
    return scoringActivityFeed.filter((f) => f.toolLabel.includes("Health"));
  }, [toolFilter]);

  // Flagged runs for the alert panel
  const flaggedRuns = useMemo(() => getFlaggedRuns().slice(0, 3), []);

  const stats: DashboardStats = dashboardStats;

  const statCards = [
    {
      title: "Total Scoring Runs",
      value: stats.scoringRunsTotal,
      change: stats.scoringRunsChange,
      description: `+${stats.scoringRunsChange}% · vs. prior 30 days`,
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      title: "Avg Scorecard Score",
      value: stats.avgScorecardScore,
      change: stats.avgScoreChange,
      decimals: 1,
      description: `+${stats.avgScoreChange} pts · P2 2026`,
      icon: <Zap className="w-4 h-4" />,
    },
    {
      title: "Scorecards Delivered",
      value: stats.scorecardsDelivered,
      change: stats.scorecardsDeliveredChange,
      description: `+${stats.scorecardsDeliveredChange}% · this period`,
      icon: <Activity className="w-4 h-4" />,
    },
    {
      title: "Active Brand Accounts",
      value: stats.activeBrandAccounts,
      change: stats.brandAccountsChange,
      description: `+${stats.brandAccountsChange} new · ${stats.avgPortfolioAcv}% avg ACV`,
      icon: <Users className="w-4 h-4" />,
    },
    {
      title: "Flagged Runs",
      value: stats.flaggedRuns,
      change: stats.flaggedRunsChange,
      description: `${stats.flaggedRunsChange} vs. prior · require review`,
      icon: <Flag className="w-4 h-4" />,
      highlight: stats.flaggedRuns > 0,
    },
  ];

  return (
    <div className="space-y-5">
      {/* ── Page header ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Portfolio Overview
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Scoring operations · P2 2026 &nbsp;·&nbsp; 10 active brand accounts
          </p>
        </div>
      </div>

      {/* ── KPI stat cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {statCards.map((card, index) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
            change={card.change}
            decimals={card.decimals}
            description={card.description}
            icon={card.icon}
            index={index}
            highlight={card.highlight}
          />
        ))}
      </div>

      {/* ── Period filter controls ── */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-muted-foreground font-medium mr-1">
          Period:
        </span>
        {(
          [
            { value: "last_6", label: "Last 6 periods" },
            { value: "last_9", label: "Last 9 periods" },
            { value: "all_12", label: "All 12 periods" },
          ] as { value: PeriodFilter; label: string }[]
        ).map((opt) => (
          <button
            key={opt.value}
            onClick={() => setPeriodFilter(opt.value)}
            className={cn(
              "px-2.5 py-1 text-xs rounded border transition-colors duration-100",
              periodFilter === opt.value
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border/60 text-muted-foreground hover:bg-muted/40"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* ── Primary chart: scoring volume + delivery ── */}
      <div className="linear-card" style={{ padding: "var(--card-padding)" }}>
        <div className="mb-3">
          <p className="text-sm font-semibold text-foreground">
            Scoring Volume by Period
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Scoring runs completed vs. scorecards delivered to brand clients
          </p>
        </div>
        <ScoringVolumeChart data={chartData} />
      </div>

      {/* ── Two-column row: tier distribution + brand health trend ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Score tier distribution */}
        <div className="linear-card" style={{ padding: "var(--card-padding)" }}>
          <div className="mb-3">
            <p className="text-sm font-semibold text-foreground">
              Score Tier Distribution
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              All-time · 247 completed scorecards
            </p>
          </div>
          <ScoreTierDistributionChart data={scoreTierDistribution} />
          {/* Tier legend pills */}
          <div className="mt-3 flex flex-wrap gap-2">
            {scoreTierDistribution.map((d) => {
              const cfg = SCORE_TIER_CONFIG[d.tier];
              return (
                <span
                  key={d.tier}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-[10px] font-medium",
                    cfg?.bgClass,
                    cfg?.colorClass
                  )}
                >
                  {d.tier}
                  <span className="opacity-70">{d.pct}%</span>
                </span>
              );
            })}
          </div>
        </div>

        {/* Portfolio brand health index trend */}
        <div className="linear-card" style={{ padding: "var(--card-padding)" }}>
          <div className="mb-3">
            <p className="text-sm font-semibold text-foreground">
              Portfolio Brand Health Index
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Avg Brand Health Index across all active brand accounts
            </p>
          </div>
          <BrandHealthTrendChart data={healthTrendData} />
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { label: "Current avg", value: "74.1" },
              { label: "Prior period", value: "73.4" },
              { label: "Declining now", value: "3 accounts" },
            ].map((m) => (
              <div key={m.label} className="text-center">
                <p className="text-sm font-bold font-mono tabular-nums text-foreground">
                  {m.value}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom row: activity feed + flagged runs ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent scoring activity feed */}
        <div
          className="linear-card lg:col-span-2"
          style={{ padding: "var(--card-padding)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Recent Scoring Activity
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Live scoring run feed across all brand accounts
              </p>
            </div>
            {/* Tool filter */}
            <div className="flex gap-1">
              {(
                [
                  { value: "all", label: "All" },
                  { value: "brief", label: "Brief" },
                  { value: "brand", label: "Health" },
                ] as { value: "all" | "brief" | "brand"; label: string }[]
              ).map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setToolFilter(opt.value)}
                  className={cn(
                    "px-2 py-0.5 text-[11px] rounded border transition-colors duration-100",
                    toolFilter === opt.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border/60 text-muted-foreground hover:bg-muted/40"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            {filteredFeed.length === 0 ? (
              <p className="text-xs text-muted-foreground py-6 text-center">
                No scoring activity for this tool filter.
              </p>
            ) : (
              filteredFeed.map((item) => (
                <ActivityFeedItem key={item.runId} item={item} />
              ))
            )}
          </div>

          <div className="mt-2 pt-2 border-t border-border/40">
            <a
              href="/scorecards"
              className="text-xs text-primary hover:text-primary/80 transition-colors duration-100 flex items-center gap-1"
            >
              View Scorecard Archive
              <ChevronRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Flagged runs alert panel */}
        <div className="linear-card border-warning/30" style={{ padding: "var(--card-padding)" }}>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-warning" />
            <p className="text-sm font-semibold text-foreground">
              Flagged Runs
            </p>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            {stats.flaggedRuns} runs require consultant review
          </p>

          <div className="space-y-2">
            {flaggedRuns.map((run) => (
              <div
                key={run.id}
                className="rounded border border-border/50 bg-muted/20 p-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono text-muted-foreground/60">
                    {run.runRef}
                  </span>
                  {run.status === "Flagged" || run.status === "Incomplete Brief" ? (
                    <StatusBadge status={run.status} />
                  ) : null}
                </div>
                <p className="text-xs font-medium text-foreground mt-1 truncate">
                  {run.briefTitle}
                </p>
                {run.flags.length > 0 && (
                  <p className="text-[10px] text-warning mt-1 leading-tight">
                    {run.flags[0].message}
                  </p>
                )}
                {run.overallScore !== null && run.flags[0]?.flagType === "critical_dimension" && (
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    Overall: <span className="font-mono font-medium">{run.overallScore}</span>
                    &nbsp;·&nbsp;{run.flags[0].dimensionName}: <span className="text-destructive font-mono font-medium">14</span>
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-3 pt-2.5 border-t border-border/40">
            <a
              href="/scoring-tools"
              className="text-xs text-primary hover:text-primary/80 transition-colors duration-100 flex items-center gap-1"
            >
              Open Scoring Tools
              <ChevronRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* ── Proposal banner ── */}
      <div className="linear-card p-4 border-primary/15 bg-gradient-to-r from-primary/5 to-transparent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-foreground">
            This is a live demo built for{" "}
            {APP_CONFIG.clientName ?? APP_CONFIG.projectName}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Humam &nbsp;·&nbsp; Full-Stack Developer &nbsp;·&nbsp; Available now
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/challenges"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-100"
          >
            My Approach →
          </a>
          <a
            href="/proposal"
            className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary text-primary-foreground px-3 py-1.5 rounded hover:bg-primary/90 transition-colors duration-100"
          >
            Work with me
          </a>
        </div>
      </div>
    </div>
  );
}
