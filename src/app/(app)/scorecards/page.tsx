"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  scoringRuns,
  scorecards,
  brandAccounts,
  consultants,
  getBrandAccountById,
  getConsultantById,
  getScorecardByRunId,
  SCORE_TIER_CONFIG,
  SCORING_RUN_STATUS_CONFIG,
  TOOL_TYPE_LABELS,
} from "@/data/mock-data";
import type { ScoringRun, ScoringRunStatus, ScoreTier, ScoringToolType } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Download,
  FileText,
  ChevronUp,
  ChevronDown,
  AlertTriangle,
  Flag,
  X,
  ChevronRight,
} from "lucide-react";

// ─── Status badge ──────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: ScoringRunStatus }) {
  const config = SCORING_RUN_STATUS_CONFIG[status];
  if (!config) {
    return (
      <Badge variant="outline" className="text-xs border-0 bg-muted text-muted-foreground">
        {status}
      </Badge>
    );
  }
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-xs font-medium border rounded-full px-2 gap-1",
        config.colorClass,
        config.bgClass
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full inline-block shrink-0", config.dotClass)} />
      {config.label}
    </Badge>
  );
}

// ─── Tier badge ────────────────────────────────────────────────────────────
function TierBadge({ tier }: { tier: ScoreTier | null }) {
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

type SortKey = "runRef" | "brandName" | "toolType" | "overallScore" | "status" | "createdAt";

const STATUS_OPTIONS: Array<ScoringRunStatus | "all"> = [
  "all",
  "Scoring",
  "Scored",
  "Under Review",
  "Delivered",
  "Archived",
  "Incomplete Brief",
  "Flagged",
];

const TOOL_OPTIONS: Array<ScoringToolType | "all"> = [
  "all",
  "campaign_brief_scorer",
  "brand_health_scorer",
];

// ─── Expand panel ─────────────────────────────────────────────────────────
function ExpandedRow({ run }: { run: ScoringRun }) {
  const scorecard = getScorecardByRunId(run.id);
  const consultant = getConsultantById(run.consultantId);
  const brand = getBrandAccountById(run.brandAccountId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
      {/* Run details */}
      <div className="space-y-2">
        <p className="font-semibold text-foreground uppercase tracking-wider text-[11px]">
          Run Details
        </p>
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Brief Title</span>
            <span className="font-medium text-foreground text-right max-w-[60%]">{run.briefTitle}</span>
          </div>
          {run.campaignType && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Campaign Type</span>
              <span className="font-medium text-foreground capitalize">
                {run.campaignType.replace(/_/g, " ")}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Scoring Period</span>
            <span className="font-mono">{run.scoringPeriod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Consultant</span>
            <span className="font-medium">{consultant?.name}</span>
          </div>
          {run.priorRunId && run.scoreDeltaVsPrior !== null && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Score Delta</span>
              <span
                className={cn(
                  "font-mono font-semibold",
                  (run.scoreDeltaVsPrior ?? 0) >= 0
                    ? "text-[color:var(--success)]"
                    : "text-destructive"
                )}
              >
                {(run.scoreDeltaVsPrior ?? 0) >= 0 ? "+" : ""}
                {run.scoreDeltaVsPrior} pts (re-score)
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Flags */}
      <div className="space-y-2">
        <p className="font-semibold text-foreground uppercase tracking-wider text-[11px]">
          Flags & Alerts
        </p>
        {run.flags.length === 0 ? (
          <p className="text-muted-foreground italic">No flags raised</p>
        ) : (
          <div className="space-y-1.5">
            {run.flags.map((f, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-start gap-1.5 p-2 rounded",
                  f.severity === "critical"
                    ? "bg-destructive/8 border border-destructive/20"
                    : "bg-[color:var(--warning)]/8 border border-[color:var(--warning)]/20"
                )}
              >
                <AlertTriangle
                  className={cn(
                    "w-3 h-3 shrink-0 mt-0.5",
                    f.severity === "critical" ? "text-destructive" : "text-[color:var(--warning)]"
                  )}
                />
                <p
                  className={cn(
                    "text-[11px] leading-snug",
                    f.severity === "critical" ? "text-destructive" : "text-foreground"
                  )}
                >
                  {f.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Scorecard summary */}
      <div className="space-y-2">
        <p className="font-semibold text-foreground uppercase tracking-wider text-[11px]">
          Scorecard Summary
        </p>
        {scorecard ? (
          <div className="space-y-1">
            <p className="text-muted-foreground leading-snug">{scorecard.executiveSummary}</p>
            {scorecard.topRecommendations.slice(0, 2).map((rec, i) => (
              <div key={i} className="flex items-start gap-1.5 mt-1">
                <ChevronRight className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                <p className="text-foreground leading-snug">{rec}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground italic">No scorecard available for this run.</p>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────
export default function ScorecardsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ScoringRunStatus | "all">("all");
  const [toolFilter, setToolFilter] = useState<ScoringToolType | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const displayed = useMemo(() => {
    let rows = scoringRuns.map((run) => {
      const brand = getBrandAccountById(run.brandAccountId);
      const consultant = getConsultantById(run.consultantId);
      return {
        ...run,
        brandName: brand?.companyName ?? "",
        consultantName: consultant?.name ?? "",
      };
    });

    // Filter by status
    if (statusFilter !== "all") {
      rows = rows.filter((r) => r.status === statusFilter);
    }

    // Filter by tool type
    if (toolFilter !== "all") {
      rows = rows.filter((r) => r.toolType === toolFilter);
    }

    // Filter by search
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.runRef.toLowerCase().includes(q) ||
          r.brandName.toLowerCase().includes(q) ||
          r.briefTitle.toLowerCase().includes(q) ||
          r.consultantName.toLowerCase().includes(q)
      );
    }

    // Sort
    rows.sort((a, b) => {
      let av: string | number | null, bv: string | number | null;
      switch (sortKey) {
        case "runRef":
          av = a.runRef;
          bv = b.runRef;
          break;
        case "brandName":
          av = a.brandName;
          bv = b.brandName;
          break;
        case "toolType":
          av = a.toolType;
          bv = b.toolType;
          break;
        case "overallScore":
          av = a.overallScore ?? -1;
          bv = b.overallScore ?? -1;
          break;
        case "status":
          av = a.status;
          bv = b.status;
          break;
        case "createdAt":
        default:
          av = a.createdAt;
          bv = b.createdAt;
          break;
      }
      if (av === null || av === undefined) return 1;
      if (bv === null || bv === undefined) return -1;
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return rows;
  }, [search, statusFilter, toolFilter, sortKey, sortDir]);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col)
      return <ChevronUp className="w-3 h-3 opacity-20" />;
    return sortDir === "asc" ? (
      <ChevronUp className="w-3 h-3" />
    ) : (
      <ChevronDown className="w-3 h-3" />
    );
  }

  return (
    <div className="p-[var(--content-padding,1.25rem)] space-y-5 max-w-screen-xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Scorecards</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Complete history of scoring runs — search, filter, and review detailed scorecards
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="w-3.5 h-3.5" />
            Export Archive
          </Button>
          <Button size="sm" className="gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            New Scoring Run
          </Button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search scoring runs, brands, consultants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-sm"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-100"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as ScoringRunStatus | "all")}
        >
          <SelectTrigger className="w-[160px] h-9 text-sm">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((s) => (
              <SelectItem key={s} value={s} className="text-sm">
                {s === "all" ? "All Statuses" : s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={toolFilter}
          onValueChange={(v) => setToolFilter(v as ScoringToolType | "all")}
        >
          <SelectTrigger className="w-[200px] h-9 text-sm">
            <SelectValue placeholder="All tools" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-sm">
              All Tools
            </SelectItem>
            <SelectItem value="campaign_brief_scorer" className="text-sm">
              Campaign Brief Scorer
            </SelectItem>
            <SelectItem value="brand_health_scorer" className="text-sm">
              Brand Health Scorer
            </SelectItem>
          </SelectContent>
        </Select>

        <span className="text-sm text-muted-foreground shrink-0 font-mono">
          {displayed.length} of {scoringRuns.length} runs
        </span>
      </div>

      {/* Table */}
      <Card className="linear-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {(
                  [
                    { key: "runRef", label: "Run ID", sortable: true },
                    { key: "brandName", label: "Brand Account", sortable: true },
                    { key: "toolType", label: "Tool", sortable: true },
                    { key: "briefTitle", label: "Brief / Submission", sortable: false },
                    { key: "overallScore", label: "Score", sortable: true },
                    { key: "status", label: "Status", sortable: true },
                    { key: "consultant", label: "Consultant", sortable: false },
                    { key: "createdAt", label: "Created", sortable: true },
                  ] as Array<{ key: SortKey | "briefTitle" | "consultant"; label: string; sortable: boolean }>
                ).map((col) => (
                  <TableHead
                    key={col.key}
                    className={cn(
                      "bg-muted/50 text-[11px] font-medium text-muted-foreground uppercase tracking-wide whitespace-nowrap",
                      col.sortable && "cursor-pointer select-none hover:text-foreground transition-colors duration-100"
                    )}
                    onClick={
                      col.sortable
                        ? () => handleSort(col.key as SortKey)
                        : undefined
                    }
                  >
                    <div className="flex items-center gap-1">
                      {col.label}
                      {col.sortable && <SortIcon col={col.key as SortKey} />}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayed.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-32 text-center text-sm text-muted-foreground"
                  >
                    No scoring runs match this filter.
                  </TableCell>
                </TableRow>
              ) : (
                displayed.map((run) => {
                  const brand = getBrandAccountById(run.brandAccountId);
                  const consultant = getConsultantById(run.consultantId);
                  const isExpanded = expandedId === run.id;
                  const hasFlag = run.flags.length > 0;

                  return (
                    <>
                      <TableRow
                        key={run.id}
                        className={cn(
                          "cursor-pointer transition-colors duration-100",
                          isExpanded
                            ? "bg-primary/4"
                            : "hover:bg-[color:var(--surface-hover)]"
                        )}
                        onClick={() => setExpandedId(isExpanded ? null : run.id)}
                      >
                        {/* Run ID */}
                        <TableCell className="py-3">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-xs font-semibold text-foreground">
                              {run.runRef}
                            </span>
                            {hasFlag && (
                              <Flag className="w-3 h-3 text-destructive shrink-0" />
                            )}
                          </div>
                          <p className="text-[10px] text-muted-foreground font-mono mt-0.5">
                            {run.scoringPeriod}
                          </p>
                        </TableCell>

                        {/* Brand account */}
                        <TableCell className="py-3">
                          <p className="text-xs font-medium text-foreground">
                            {brand?.companyName ?? "—"}
                          </p>
                          <p className="text-[11px] text-muted-foreground capitalize">
                            {brand?.category.replace("_", " ")}
                          </p>
                        </TableCell>

                        {/* Tool type */}
                        <TableCell className="py-3">
                          <Badge
                            variant="outline"
                            className="text-[10px] border-0 bg-primary/6 text-primary rounded font-medium"
                          >
                            {run.toolType === "campaign_brief_scorer"
                              ? "Campaign"
                              : "Brand Health"}
                          </Badge>
                        </TableCell>

                        {/* Brief title */}
                        <TableCell className="py-3 max-w-[220px]">
                          <p className="text-xs text-foreground truncate">{run.briefTitle}</p>
                        </TableCell>

                        {/* Score */}
                        <TableCell className="py-3 text-right">
                          <p className="text-sm font-bold font-mono tabular-nums text-foreground">
                            {run.overallScore ?? "—"}
                          </p>
                          {run.scoreTier && <TierBadge tier={run.scoreTier} />}
                        </TableCell>

                        {/* Status */}
                        <TableCell className="py-3">
                          <StatusBadge status={run.status} />
                        </TableCell>

                        {/* Consultant */}
                        <TableCell className="py-3">
                          <p className="text-xs text-foreground">{consultant?.name}</p>
                          <p className="text-[10px] text-muted-foreground">{consultant?.role}</p>
                        </TableCell>

                        {/* Created date */}
                        <TableCell className="py-3">
                          <p className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                            {new Date(run.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </TableCell>
                      </TableRow>

                      {/* Expanded detail row */}
                      {isExpanded && (
                        <TableRow key={`${run.id}-expanded`}>
                          <TableCell
                            colSpan={8}
                            className="bg-muted/30 px-4 py-4 border-b border-border/50"
                          >
                            <ExpandedRow run={run} />
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
