"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  scoringRuns,
  scorecards,
  scoringDimensions,
  getDimensionsByTool,
  getScorecardByRunId,
  getBrandAccountById,
  getConsultantById,
  SCORE_TIER_CONFIG,
} from "@/data/mock-data";
import type { ScoringRun, Scorecard } from "@/lib/types";
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
  Zap,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  RefreshCw,
  Download,
  Flag,
  Info,
} from "lucide-react";

// ─── Campaign runs with a score ───────────────────────────────────────────
const campaignRuns = scoringRuns.filter(
  (r) => r.toolType === "campaign_brief_scorer" && r.overallScore !== null
);

const campaignDimensions = getDimensionsByTool("campaign_brief_scorer");

// ─── Tier badge ───────────────────────────────────────────────────────────
function TierBadge({ tier }: { tier: string | null }) {
  if (!tier) {
    return (
      <Badge variant="outline" className="text-xs border-0 bg-muted text-muted-foreground">
        —
      </Badge>
    );
  }
  const config = SCORE_TIER_CONFIG[tier];
  if (!config) return null;
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
}: {
  score: number | null;
  isCritical: boolean;
}) {
  if (score === null) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-muted rounded-full" />
        <span className="text-xs text-muted-foreground font-mono w-8 text-right">N/A</span>
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

// ─── Scorecard detail panel ───────────────────────────────────────────────
function ScorecardPanel({
  run,
  scorecard,
}: {
  run: ScoringRun;
  scorecard: Scorecard | undefined;
}) {
  const brand = getBrandAccountById(run.brandAccountId);
  const consultant = getConsultantById(run.consultantId);

  if (!scorecard) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-center gap-3 text-muted-foreground">
        <Info className="w-7 h-7 opacity-40" />
        <div>
          <p className="text-sm font-medium">Scorecard not available</p>
          <p className="text-xs mt-1">This run is still processing or awaiting submission.</p>
        </div>
      </div>
    );
  }

  const criticalDimension = scorecard.dimensionScores.find((d) => d.isCriticalFlag);

  return (
    <div className="space-y-4">
      {/* Run identity */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider mb-0.5">
            {run.runRef} · {run.scoringPeriod}
          </p>
          <h3 className="text-sm font-semibold text-foreground leading-snug">{run.briefTitle}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {brand?.companyName} · {consultant?.name}
          </p>
        </div>
        <div className="text-right shrink-0">
          <div className="text-3xl font-bold tracking-tight font-mono text-foreground">
            {scorecard.overallScore}
          </div>
          <TierBadge tier={scorecard.scoreTier} />
        </div>
      </div>

      {/* Category benchmark */}
      <p className="text-xs text-muted-foreground bg-muted/50 rounded px-2.5 py-1.5 font-mono">
        {scorecard.categoryBenchmark}
      </p>

      {/* Re-score delta */}
      {run.scoreDeltaVsPrior !== null && run.scoreDeltaVsPrior !== undefined && (
        <div className="px-2.5 py-1.5 rounded border border-[color:var(--success)]/25 bg-[color:var(--success)]/8">
          <p className="text-xs text-[color:var(--success)] font-medium">
            Re-score: +{run.scoreDeltaVsPrior} pts improvement over prior submission
          </p>
        </div>
      )}

      {/* Critical flag alert */}
      {criticalDimension && (
        <div className="flex items-start gap-2 p-3 rounded-md border border-destructive/30 bg-destructive/5">
          <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-destructive">
              {criticalDimension.dimensionName}: {criticalDimension.score}/100 — Critical Flag
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
              {criticalDimension.aiRationale}
            </p>
          </div>
        </div>
      )}

      {/* Dimension breakdown */}
      <div className="space-y-2.5">
        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
          Dimension Breakdown
        </p>
        {scorecard.dimensionScores.map((ds) => {
          const dim = campaignDimensions.find((d) => d.id === ds.dimensionId);
          return (
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
                    <span className="ml-1 text-destructive text-[10px]">⚠ Critical</span>
                  )}
                </span>
                <span className="text-[10px] text-muted-foreground font-mono shrink-0">
                  {dim?.weight}% weight
                </span>
              </div>
              <ScoreBar score={ds.score} isCritical={ds.isCriticalFlag} />
            </div>
          );
        })}
      </div>

      {/* Top recommendations */}
      {scorecard.topRecommendations.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Priority Recommendations
          </p>
          {scorecard.topRecommendations.map((rec, i) => (
            <div key={i} className="flex items-start gap-2">
              <ChevronRight className="w-3 h-3 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-foreground leading-snug">{rec}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────
export default function CampaignScorerPage() {
  const [selectedRunId, setSelectedRunId] = useState<string>(campaignRuns[0]?.id ?? "");
  const [pillarFilter, setPillarFilter] = useState<string>("all");

  const selectedRun = useMemo(
    () => campaignRuns.find((r) => r.id === selectedRunId),
    [selectedRunId]
  );
  const selectedScorecard = useMemo(
    () => (selectedRun ? getScorecardByRunId(selectedRun.id) : undefined),
    [selectedRun]
  );

  // All unique pillars for the filter
  const pillars = useMemo(() => {
    const all = campaignDimensions.map((d) => d.pillar);
    return ["all", ...Array.from(new Set(all))];
  }, []);

  const filteredDimensions = useMemo(
    () =>
      pillarFilter === "all"
        ? campaignDimensions
        : campaignDimensions.filter((d) => d.pillar === pillarFilter),
    [pillarFilter]
  );

  return (
    <div className="p-[var(--content-padding,1.25rem)] space-y-5 max-w-screen-xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Campaign Brief Scorer</h1>
          <p className="text-sm text-muted-foreground mt-1">
            AI evaluation of campaign briefs across 7 strategic and creative dimensions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="w-3.5 h-3.5" />
            Export Scorecard
          </Button>
          <Button size="sm" className="gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            Submit New Brief
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-4 items-start">
        {/* Left column */}
        <div className="space-y-4">
          {/* Scoring run selector list */}
          <Card className="linear-card">
            <CardHeader className="pb-3 border-b border-border/50">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <CardTitle className="text-sm font-semibold">
                  Scoring Runs — Campaign Brief Scorer
                </CardTitle>
                <span className="text-xs text-muted-foreground font-mono">
                  {campaignRuns.length} runs
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/40">
                {campaignRuns.map((run) => {
                  const brand = getBrandAccountById(run.brandAccountId);
                  const isSelected = run.id === selectedRunId;
                  const hasFlag = run.flags.length > 0;
                  return (
                    <button
                      key={run.id}
                      onClick={() => setSelectedRunId(run.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-100",
                        isSelected
                          ? "bg-primary/6 border-l-2 border-primary"
                          : "hover:bg-[color:var(--surface-hover)] border-l-2 border-transparent"
                      )}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[11px] font-mono text-muted-foreground">
                            {run.runRef}
                          </span>
                          <span className="text-[11px] text-muted-foreground">·</span>
                          <span className="text-[11px] text-muted-foreground">{run.scoringPeriod}</span>
                          {hasFlag && <Flag className="w-3 h-3 text-destructive ml-0.5" />}
                        </div>
                        <p className="text-xs font-medium text-foreground truncate">
                          {run.briefTitle}
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          {brand?.companyName}
                        </p>
                      </div>
                      <div className="text-right shrink-0 space-y-0.5">
                        <p className="text-sm font-bold font-mono text-foreground tabular-nums">
                          {run.overallScore ?? "—"}
                        </p>
                        <TierBadge tier={run.scoreTier} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Criteria reference table */}
          <Card className="linear-card">
            <CardHeader className="pb-3 border-b border-border/50">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <CardTitle className="text-sm font-semibold">Scoring Criteria</CardTitle>
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
              {filteredDimensions.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No dimensions match this pillar filter.
                </p>
              ) : (
                filteredDimensions.map((dim) => (
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
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right column — scorecard output */}
        {selectedRun && (
          <Card className="linear-card border-primary/20 sticky top-4">
            <CardHeader className="pb-3 border-b border-border/50">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5 text-primary" />
                </div>
                <CardTitle className="text-sm font-semibold">AI Scorecard Output</CardTitle>
                <div className="ml-auto">
                  {selectedRun.status === "Delivered" && (
                    <span className="flex items-center gap-1 text-[11px] text-[color:var(--success)]">
                      <CheckCircle className="w-3 h-3" />
                      Delivered
                    </span>
                  )}
                  {selectedRun.status === "Under Review" && (
                    <span className="flex items-center gap-1 text-[11px] text-[color:var(--warning)]">
                      <RefreshCw className="w-3 h-3" />
                      Under Review
                    </span>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <ScorecardPanel run={selectedRun} scorecard={selectedScorecard} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
