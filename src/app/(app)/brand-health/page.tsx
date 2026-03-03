"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  brandAccounts,
  scoringRuns,
  scorecards,
  brandHealthTrend,
  getDimensionsByTool,
  getRunsByBrandAccount,
  getScorecardByRunId,
  getBrandAccountById,
  getConsultantById,
  SCORE_TIER_CONFIG,
} from "@/data/mock-data";
import type { BrandAccount, Scorecard } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  Info,
  Download,
  ChevronRight,
} from "lucide-react";

// ─── Brand accounts that have health scorer runs ───────────────────────────
const healthRuns = scoringRuns.filter((r) => r.toolType === "brand_health_scorer");
const healthDimensions = getDimensionsByTool("brand_health_scorer");

// ─── Health index color ───────────────────────────────────────────────────
function healthTierFromIndex(index: number): string {
  if (index >= 90) return "Excellent";
  if (index >= 75) return "Strong";
  if (index >= 60) return "Adequate";
  if (index >= 40) return "Needs Work";
  if (index > 0) return "Critical";
  return "—";
}

function TrendIcon({ trend }: { trend: BrandAccount["healthTrend"] }) {
  if (trend === "improving")
    return <TrendingUp className="w-4 h-4 text-[color:var(--success)]" />;
  if (trend === "declining")
    return <TrendingDown className="w-4 h-4 text-destructive" />;
  if (trend === "new_account")
    return <Info className="w-4 h-4 text-muted-foreground" />;
  return <Minus className="w-4 h-4 text-muted-foreground" />;
}

function TierBadge({ tier }: { tier: string }) {
  const config = SCORE_TIER_CONFIG[tier];
  if (!config) {
    return (
      <Badge variant="outline" className="text-xs border-0 bg-muted text-muted-foreground">
        No data
      </Badge>
    );
  }
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-xs font-medium border rounded-full px-2",
        config.colorClass,
        config.bgClass
      )}
    >
      {config.label}
    </Badge>
  );
}

// ─── Score bar ────────────────────────────────────────────────────────────
function ScoreBar({
  score,
  isCritical,
  isInsufficient,
}: {
  score: number | null;
  isCritical: boolean;
  isInsufficient: boolean;
}) {
  if (isInsufficient || score === null) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-muted rounded-full" />
        <span className="text-[10px] text-muted-foreground font-mono w-16 text-right">
          Insufficient data
        </span>
      </div>
    );
  }
  const pct = Math.max(0, Math.min(100, score));
  const barColor = isCritical
    ? "bg-destructive"
    : score >= 75
    ? "bg-[color:var(--success)]"
    : score >= 60
    ? "bg-[color:var(--warning)]"
    : "bg-destructive";

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-150", barColor)}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span
        className={cn(
          "text-xs font-mono w-8 text-right tabular-nums",
          isCritical ? "text-destructive font-semibold" : "text-foreground"
        )}
      >
        {score}
      </span>
    </div>
  );
}

// ─── Health index ring visual ─────────────────────────────────────────────
function HealthIndexRing({ index, size = 80 }: { index: number; size?: number }) {
  if (index === 0) {
    return (
      <div
        className="flex items-center justify-center rounded-full border-2 border-dashed border-muted text-muted-foreground text-xs font-mono"
        style={{ width: size, height: size }}
      >
        N/A
      </div>
    );
  }
  const radius = (size / 2) * 0.72;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - Math.min(100, index) / 100);
  const tier = healthTierFromIndex(index);
  const config = SCORE_TIER_CONFIG[tier];
  // Map tier to stroke color using oklch variables
  const strokeColor =
    tier === "Excellent" || tier === "Strong"
      ? "var(--success)"
      : tier === "Adequate"
      ? "var(--warning)"
      : "var(--destructive, oklch(0.577 0.245 27.325))";

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--muted)"
          strokeWidth={size * 0.09}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={size * 0.09}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="transition-all duration-150"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-bold font-mono text-foreground tabular-nums leading-none">
          {index.toFixed(0)}
        </span>
        <span className="text-[10px] text-muted-foreground mt-0.5">BHI</span>
      </div>
    </div>
  );
}

// ─── Health trend sparkline ───────────────────────────────────────────────
function TrendSparkline({ brandId }: { brandId: string }) {
  // Derive from scoring runs for this brand
  const runs = getRunsByBrandAccount(brandId)
    .filter((r) => r.toolType === "brand_health_scorer" && r.overallScore !== null)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));

  if (runs.length < 2) {
    return (
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <span className="font-mono">Not enough scoring history</span>
      </div>
    );
  }

  const scores = runs.map((r) => r.overallScore as number);
  const minS = Math.min(...scores) - 5;
  const maxS = Math.max(...scores) + 5;
  const w = 100;
  const h = 30;

  const points = scores.map((s, i) => {
    const x = (i / (scores.length - 1)) * w;
    const y = h - ((s - minS) / (maxS - minS)) * h;
    return `${x},${y}`;
  });

  const lastScore = scores[scores.length - 1];
  const firstScore = scores[0];
  const delta = lastScore - firstScore;
  const lineColor = delta >= 0 ? "var(--success)" : "var(--destructive, oklch(0.577 0.245 27.325))";

  return (
    <div className="flex items-center gap-3">
      <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} className="overflow-visible">
        <polyline
          points={points.join(" ")}
          fill="none"
          stroke={lineColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className={cn("text-xs font-mono font-semibold", delta >= 0 ? "text-[color:var(--success)]" : "text-destructive")}>
        {delta >= 0 ? "+" : ""}{delta.toFixed(0)} pts
      </span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────
export default function BrandHealthPage() {
  // Brand accounts that have at least one health scorer run
  const healthBrandIds = useMemo(
    () => Array.from(new Set(healthRuns.map((r) => r.brandAccountId))),
    []
  );
  const healthBrands = useMemo(
    () => brandAccounts.filter((b) => healthBrandIds.includes(b.id)),
    [healthBrandIds]
  );

  const [selectedBrandId, setSelectedBrandId] = useState<string>(
    healthBrands[0]?.id ?? ""
  );
  const [pillarFilter, setPillarFilter] = useState<string>("all");

  const selectedBrand = useMemo(
    () => healthBrands.find((b) => b.id === selectedBrandId),
    [selectedBrandId, healthBrands]
  );

  // Latest health run for selected brand
  const latestRun = useMemo(() => {
    const runs = getRunsByBrandAccount(selectedBrandId)
      .filter((r) => r.toolType === "brand_health_scorer" && r.overallScore !== null)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return runs[0] ?? null;
  }, [selectedBrandId]);

  const latestScorecard = useMemo(
    () => (latestRun ? getScorecardByRunId(latestRun.id) : undefined),
    [latestRun]
  );

  const pillars = useMemo(() => {
    const all = healthDimensions.map((d) => d.pillar);
    return ["all", ...Array.from(new Set(all))];
  }, []);

  const filteredDimensions = useMemo(
    () =>
      pillarFilter === "all"
        ? healthDimensions
        : healthDimensions.filter((d) => d.pillar === pillarFilter),
    [pillarFilter]
  );

  const tier = selectedBrand
    ? healthTierFromIndex(selectedBrand.brandHealthIndex)
    : "—";

  return (
    <div className="p-[var(--content-padding,1.25rem)] space-y-5 max-w-screen-xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Brand Health Scorer</h1>
          <p className="text-sm text-muted-foreground mt-1">
            AI evaluation of brand market health across 7 consumer equity and retail execution dimensions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="w-3.5 h-3.5" />
            Export Report
          </Button>
          <Button size="sm" className="gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Run New Assessment
          </Button>
        </div>
      </div>

      {/* Brand account selector */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm text-muted-foreground">Brand Account:</span>
        <Select value={selectedBrandId} onValueChange={setSelectedBrandId}>
          <SelectTrigger className="w-[260px] h-9 text-sm">
            <SelectValue placeholder="Select brand account" />
          </SelectTrigger>
          <SelectContent>
            {healthBrands.map((b) => (
              <SelectItem key={b.id} value={b.id} className="text-sm">
                <span className="font-medium">{b.companyName}</span>
                <span className="ml-2 text-muted-foreground text-xs">{b.category}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedBrand && (
          <div className="flex items-center gap-2">
            <TrendIcon trend={selectedBrand.healthTrend} />
            <span className="text-sm text-muted-foreground">
              {selectedBrand.healthTrend === "improving"
                ? "Improving"
                : selectedBrand.healthTrend === "declining"
                ? "Declining"
                : selectedBrand.healthTrend === "new_account"
                ? "New Account"
                : "Stable"}
            </span>
            {selectedBrand.accountStatus === "at_risk" && (
              <Badge
                variant="outline"
                className="text-xs border-0 bg-destructive/10 text-destructive font-medium"
              >
                At Risk
              </Badge>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-4 items-start">
        {/* Left column — brand list + criteria */}
        <div className="space-y-4">
          {/* Brand account cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {healthBrands.map((brand, idx) => {
              const isSelected = brand.id === selectedBrandId;
              const t = healthTierFromIndex(brand.brandHealthIndex);
              const config = SCORE_TIER_CONFIG[t];
              const isAtRisk = brand.accountStatus === "at_risk";
              return (
                <button
                  key={brand.id}
                  onClick={() => setSelectedBrandId(brand.id)}
                  style={{ animationDelay: `${idx * 50}ms` }}
                  className={cn(
                    "linear-card w-full text-left p-3 space-y-2 cursor-pointer transition-all duration-100",
                    isSelected ? "border-primary/40 bg-primary/4" : ""
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-foreground truncate">
                        {brand.companyName}
                      </p>
                      <p className="text-[11px] text-muted-foreground capitalize mt-0.5">
                        {brand.category.replace("_", " ")} · {brand.primaryChannel}
                      </p>
                    </div>
                    <TierBadge tier={t} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">BHI</p>
                      <p className="text-xl font-bold font-mono text-foreground tabular-nums leading-none">
                        {brand.brandHealthIndex > 0 ? brand.brandHealthIndex.toFixed(1) : "—"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">% ACV</p>
                      <p className="text-sm font-mono font-semibold text-foreground tabular-nums">
                        {brand.distributionAcv > 0 ? `${brand.distributionAcv}%` : "—"}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <TrendIcon trend={brand.healthTrend} />
                        <span
                          className={cn(
                            "text-xs font-mono font-semibold tabular-nums",
                            brand.healthIndexChange > 0
                              ? "text-[color:var(--success)]"
                              : brand.healthIndexChange < 0
                              ? "text-destructive"
                              : "text-muted-foreground"
                          )}
                        >
                          {brand.healthIndexChange > 0 ? "+" : ""}
                          {brand.healthIndexChange !== 0
                            ? brand.healthIndexChange.toFixed(1)
                            : "0.0"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* SOV/SOM flag */}
                  {brand.sovSomFlag === "excess_sov" && (
                    <div className="flex items-center gap-1 text-[10px] text-[color:var(--success)]">
                      <TrendingUp className="w-3 h-3" />
                      <span>SOV &gt; SOM — growth trajectory</span>
                    </div>
                  )}
                  {brand.sovSomFlag === "sov_deficit" && (
                    <div className="flex items-center gap-1 text-[10px] text-destructive">
                      <TrendingDown className="w-3 h-3" />
                      <span>SOV &lt; SOM — underinvestment signal</span>
                    </div>
                  )}

                  {isAtRisk && (
                    <div className="flex items-center gap-1 text-[10px] text-destructive font-medium">
                      <AlertTriangle className="w-3 h-3" />
                      <span>Account flagged at-risk</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Scoring criteria reference */}
          <Card className="linear-card">
            <CardHeader className="pb-3 border-b border-border/50">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <CardTitle className="text-sm font-semibold">Health Scoring Criteria</CardTitle>
                <Select value={pillarFilter} onValueChange={setPillarFilter}>
                  <SelectTrigger className="w-[200px] h-8 text-xs">
                    <SelectValue placeholder="Filter by pillar" />
                  </SelectTrigger>
                  <SelectContent>
                    {pillars.map((p) => (
                      <SelectItem key={p} value={p} className="text-xs">
                        {p === "all" ? "All Pillars" : p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="pt-3 space-y-2">
              {filteredDimensions.map((dim) => (
                <div
                  key={dim.id}
                  className="flex items-start gap-3 p-2.5 rounded-md bg-muted/40 border border-border/40"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold text-foreground">{dim.name}</span>
                      <Badge
                        variant="outline"
                        className="text-[10px] border-0 bg-primary/8 text-primary px-1.5 rounded"
                      >
                        {dim.pillar}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                      {dim.description}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-semibold text-foreground">
                      {dim.weight}%
                    </span>
                    <p className="text-[10px] text-muted-foreground">weight</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right column — brand health scorecard */}
        {selectedBrand && (
          <div className="space-y-4 sticky top-4">
            {/* Brand health summary */}
            <Card className="linear-card border-primary/20">
              <CardHeader className="pb-3 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <CardTitle className="text-sm font-semibold">Brand Health Report</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                {/* Identity */}
                <div className="flex items-center gap-4">
                  <HealthIndexRing index={selectedBrand.brandHealthIndex} size={72} />
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {selectedBrand.companyName}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize mt-0.5">
                      {selectedBrand.category.replace("_", " ")} · {selectedBrand.primaryChannel}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <TierBadge tier={tier} />
                      {selectedBrand.healthIndexChange !== 0 && (
                        <span
                          className={cn(
                            "text-xs font-mono font-semibold",
                            selectedBrand.healthIndexChange > 0
                              ? "text-[color:var(--success)]"
                              : "text-destructive"
                          )}
                        >
                          {selectedBrand.healthIndexChange > 0 ? "+" : ""}
                          {selectedBrand.healthIndexChange.toFixed(1)} vs. prior
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Key metrics row */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-2 rounded bg-muted/40">
                    <p className="text-xs text-muted-foreground">% ACV</p>
                    <p className="text-sm font-bold font-mono tabular-nums">
                      {selectedBrand.distributionAcv > 0
                        ? `${selectedBrand.distributionAcv}%`
                        : "—"}
                    </p>
                  </div>
                  <div className="text-center p-2 rounded bg-muted/40">
                    <p className="text-xs text-muted-foreground">Mkt Share</p>
                    <p className="text-sm font-bold font-mono tabular-nums">
                      {selectedBrand.marketSharePct
                        ? `${selectedBrand.marketSharePct}%`
                        : "—"}
                    </p>
                  </div>
                  <div className="text-center p-2 rounded bg-muted/40">
                    <p className="text-xs text-muted-foreground">SOV</p>
                    <p className="text-sm font-bold font-mono tabular-nums">
                      {selectedBrand.sovPct ? `${selectedBrand.sovPct}%` : "—"}
                    </p>
                  </div>
                </div>

                {/* SOV/SOM analysis */}
                {selectedBrand.sovSomFlag === "excess_sov" && (
                  <div className="flex items-start gap-2 p-2.5 rounded border border-[color:var(--success)]/25 bg-[color:var(--success)]/6">
                    <TrendingUp className="w-4 h-4 text-[color:var(--success)] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-[color:var(--success)]">
                        Excess SOV — Growth Signal
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                        SOV ({selectedBrand.sovPct}%) exceeds market share ({selectedBrand.marketSharePct}%). Per Ehrenberg-Bass model, this brand is on a growth trajectory.
                      </p>
                    </div>
                  </div>
                )}
                {selectedBrand.sovSomFlag === "sov_deficit" && (
                  <div className="flex items-start gap-2 p-2.5 rounded border border-destructive/25 bg-destructive/5">
                    <TrendingDown className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-destructive">
                        SOV Deficit — Underinvestment
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                        SOV ({selectedBrand.sovPct}%) below market share ({selectedBrand.marketSharePct}%). Sustained underinvestment predicts share erosion.
                      </p>
                    </div>
                  </div>
                )}

                {/* Historical trend */}
                <div>
                  <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    Health Score Trend
                  </p>
                  <TrendSparkline brandId={selectedBrand.id} />
                </div>
              </CardContent>
            </Card>

            {/* Latest scorecard dimensions */}
            {latestScorecard ? (
              <Card className="linear-card">
                <CardHeader className="pb-3 border-b border-border/50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold">
                      Latest Scorecard — {latestRun?.runRef}
                    </CardTitle>
                    <TierBadge tier={latestScorecard.scoreTier} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                    {latestScorecard.categoryBenchmark}
                  </p>
                </CardHeader>
                <CardContent className="pt-3 space-y-2.5">
                  {/* Critical flag if present */}
                  {latestScorecard.flags.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 p-2.5 rounded border border-destructive/30 bg-destructive/5"
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-destructive shrink-0 mt-0.5" />
                      <p className="text-[11px] text-destructive leading-snug">{f.message}</p>
                    </div>
                  ))}
                  {latestScorecard.dimensionScores.map((ds) => (
                    <div key={ds.dimensionId} className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={cn(
                            "text-xs font-medium",
                            ds.isCriticalFlag ? "text-destructive" : "text-foreground"
                          )}
                        >
                          {ds.dimensionName}
                          {ds.isCriticalFlag && (
                            <span className="ml-1 text-[10px] text-destructive">⚠</span>
                          )}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-mono shrink-0">
                          {ds.weight}% weight
                        </span>
                      </div>
                      <ScoreBar
                        score={ds.score}
                        isCritical={ds.isCriticalFlag}
                        isInsufficient={ds.dataStatus === "insufficient_data"}
                      />
                    </div>
                  ))}
                  {/* Recommendations */}
                  {latestScorecard.topRecommendations.length > 0 && (
                    <div className="pt-2 space-y-1">
                      <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                        Priority Actions
                      </p>
                      {latestScorecard.topRecommendations.map((rec, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <ChevronRight className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                          <p className="text-xs text-foreground leading-snug">{rec}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : latestRun ? (
              <Card className="linear-card">
                <CardContent className="p-4">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-foreground">
                        {latestRun.runRef} — {latestRun.status}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        Detailed scorecard not yet available for this run.
                      </p>
                      {latestRun.flags.map((f, i) => (
                        <p key={i} className="text-[11px] text-destructive mt-1 leading-snug">
                          {f.message}
                        </p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="linear-card">
                <CardContent className="p-4 text-center text-muted-foreground">
                  <Info className="w-6 h-6 mx-auto mb-2 opacity-40" />
                  <p className="text-sm">No scoring runs found for this brand account.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
