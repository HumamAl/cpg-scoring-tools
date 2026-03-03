"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { scoringDimensions } from "@/data/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Settings,
  CheckCircle,
  Zap,
  Cloud,
  Shield,
  Users,
  Save,
  RotateCcw,
  AlertTriangle,
  ChevronRight,
  Lock,
  Globe,
} from "lucide-react";

// ─── Toggle switch ─────────────────────────────────────────────────────────
function Toggle({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => !disabled && onChange(!checked)}
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-100",
        checked ? "bg-primary" : "bg-muted",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform duration-100",
          checked ? "translate-x-4.5" : "translate-x-0.5"
        )}
      />
    </button>
  );
}

// ─── Status indicator dot ──────────────────────────────────────────────────
function StatusDot({ status }: { status: "connected" | "active" | "live" | "error" }) {
  const colorMap = {
    connected: "bg-[color:var(--success)]",
    active: "bg-[color:var(--success)]",
    live: "bg-[color:var(--success)]",
    error: "bg-destructive",
  };
  return (
    <span className="relative inline-flex h-2 w-2 shrink-0">
      <span
        className={cn(
          "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
          colorMap[status]
        )}
      />
      <span className={cn("relative inline-flex rounded-full h-2 w-2", colorMap[status])} />
    </span>
  );
}

// ─── Notification settings state ──────────────────────────────────────────
type NotifSettings = {
  onFlaggedRun: boolean;
  onScorecardDelivered: boolean;
  onIncompleteBrief: boolean;
  onCriticalDimension: boolean;
  onNewAccount: boolean;
  dailyDigest: boolean;
};

// ─── Dimension weight state ────────────────────────────────────────────────
type WeightMap = Record<string, number>;

const initialWeights: WeightMap = Object.fromEntries(
  scoringDimensions.map((d) => [d.id, d.weight])
);

// ─── Page ─────────────────────────────────────────────────────────────────
export default function SettingsPage() {
  const [notifSettings, setNotifSettings] = useState<NotifSettings>({
    onFlaggedRun: true,
    onScorecardDelivered: true,
    onIncompleteBrief: true,
    onCriticalDimension: true,
    onNewAccount: false,
    dailyDigest: true,
  });

  const [weights, setWeights] = useState<WeightMap>(initialWeights);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");
  const [apiKeyVisible, setApiKeyVisible] = useState(false);

  function handleNotifToggle(key: keyof NotifSettings, val: boolean) {
    setNotifSettings((prev) => ({ ...prev, [key]: val }));
  }

  function handleWeightChange(dimId: string, raw: string) {
    const val = parseInt(raw, 10);
    if (!isNaN(val) && val >= 0 && val <= 100) {
      setWeights((prev) => ({ ...prev, [dimId]: val }));
    }
  }

  function handleSave() {
    setSaveState("saving");
    setTimeout(() => setSaveState("saved"), 800);
    setTimeout(() => setSaveState("idle"), 2800);
  }

  function handleReset() {
    setWeights(initialWeights);
  }

  const campaignDims = scoringDimensions.filter((d) => d.toolType === "campaign_brief_scorer");
  const healthDims = scoringDimensions.filter((d) => d.toolType === "brand_health_scorer");

  const campaignTotal = campaignDims.reduce((sum, d) => sum + (weights[d.id] ?? 0), 0);
  const healthTotal = healthDims.reduce((sum, d) => sum + (weights[d.id] ?? 0), 0);

  return (
    <div className="p-[var(--content-padding,1.25rem)] space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            API connections, scoring configuration, and notification preferences
          </p>
        </div>
      </div>

      {/* ── API & Service Status ─────────────────────────────── */}
      <Card className="linear-card">
        <CardHeader className="pb-3 border-b border-border/50">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
              <Cloud className="w-3.5 h-3.5 text-primary" />
            </div>
            <CardTitle className="text-sm font-semibold">API & Service Status</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-4 space-y-3">
          {/* Anthropic API */}
          <div className="flex items-center justify-between py-2 border-b border-border/40">
            <div className="flex items-center gap-3">
              <StatusDot status="connected" />
              <div>
                <p className="text-sm font-medium text-foreground">Anthropic API</p>
                <p className="text-xs text-muted-foreground">claude-3-opus-20240229 · Server-side proxy active</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className="text-xs border-0 bg-[color:var(--success)]/10 text-[color:var(--success)] font-medium"
              >
                Connected
              </Badge>
              <div className="flex items-center gap-1.5">
                <input
                  type={apiKeyVisible ? "text" : "password"}
                  value="sk-ant-••••••••••••••••••••••••••••••••"
                  readOnly
                  className="text-xs font-mono bg-muted border border-border/60 rounded px-2 py-1 w-48 text-muted-foreground"
                />
                <button
                  onClick={() => setApiKeyVisible((v) => !v)}
                  className="text-[11px] text-primary hover:text-primary/80 transition-colors duration-100"
                >
                  {apiKeyVisible ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>

          {/* Clerk.dev Auth */}
          <div className="flex items-center justify-between py-2 border-b border-border/40">
            <div className="flex items-center gap-3">
              <StatusDot status="active" />
              <div>
                <p className="text-sm font-medium text-foreground">Clerk.dev Authentication</p>
                <p className="text-xs text-muted-foreground">Session management · JWT validation active</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className="text-xs border-0 bg-[color:var(--success)]/10 text-[color:var(--success)] font-medium"
              >
                Active
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="w-3.5 h-3.5" />
                <span className="font-mono">10 consultants</span>
              </div>
            </div>
          </div>

          {/* Vercel deployment */}
          <div className="flex items-center justify-between py-2 border-b border-border/40">
            <div className="flex items-center gap-3">
              <StatusDot status="live" />
              <div>
                <p className="text-sm font-medium text-foreground">Vercel Deployment</p>
                <p className="text-xs text-muted-foreground">Edge runtime · Global CDN · HTTPS enforced</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className="text-xs border-0 bg-[color:var(--success)]/10 text-[color:var(--success)] font-medium"
              >
                Live
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Globe className="w-3.5 h-3.5" />
                <span className="font-mono">HTTPS</span>
                <Lock className="w-3 h-3 ml-1" />
              </div>
            </div>
          </div>

          {/* GitHub */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <StatusDot status="connected" />
              <div>
                <p className="text-sm font-medium text-foreground">GitHub Repository</p>
                <p className="text-xs text-muted-foreground">Private repo · Auto-deploy on main push</p>
              </div>
            </div>
            <Badge
              variant="outline"
              className="text-xs border-0 bg-[color:var(--success)]/10 text-[color:var(--success)] font-medium"
            >
              Private
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* ── Notification Preferences ─────────────────────────── */}
      <Card className="linear-card">
        <CardHeader className="pb-3 border-b border-border/50">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-primary" />
            </div>
            <CardTitle className="text-sm font-semibold">Notification Preferences</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-4 space-y-0">
          {(
            [
              {
                key: "onFlaggedRun",
                label: "Flagged Scoring Runs",
                desc: "Notify when a run is flagged for review or has critical dimension scores",
              },
              {
                key: "onScorecardDelivered",
                label: "Scorecard Delivered",
                desc: "Notify when a completed scorecard is sent to the brand client",
              },
              {
                key: "onIncompleteBrief",
                label: "Incomplete Brief Submissions",
                desc: "Alert when a brief is submitted with missing required sections",
              },
              {
                key: "onCriticalDimension",
                label: "Critical Dimension Alerts",
                desc: "Notify when any dimension scores 14 or below — regardless of overall score",
              },
              {
                key: "onNewAccount",
                label: "New Brand Account Onboarded",
                desc: "Alert when a new brand account is added to the portfolio",
              },
              {
                key: "dailyDigest",
                label: "Daily Scoring Digest",
                desc: "Receive a morning summary of active scoring runs and pending reviews",
              },
            ] as Array<{ key: keyof NotifSettings; label: string; desc: string }>
          ).map((item, i, arr) => (
            <div
              key={item.key}
              className={cn(
                "flex items-center justify-between py-3",
                i < arr.length - 1 && "border-b border-border/40"
              )}
            >
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
              <Toggle
                checked={notifSettings[item.key]}
                onChange={(v) => handleNotifToggle(item.key, v)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ── Dimension Weight Configuration ───────────────────── */}
      <Card className="linear-card">
        <CardHeader className="pb-3 border-b border-border/50">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
                <Settings className="w-3.5 h-3.5 text-primary" />
              </div>
              <CardTitle className="text-sm font-semibold">Scoring Dimension Weights</CardTitle>
            </div>
            <p className="text-xs text-muted-foreground">
              Weights must sum to 100% per tool
            </p>
          </div>
        </CardHeader>
        <CardContent className="pt-4 space-y-5">
          {/* Campaign Brief Scorer weights */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Campaign Brief Scorer
              </p>
              <span
                className={cn(
                  "text-xs font-mono font-semibold",
                  campaignTotal === 100
                    ? "text-[color:var(--success)]"
                    : "text-[color:var(--warning)]"
                )}
              >
                Total: {campaignTotal}% {campaignTotal !== 100 && "⚠ must equal 100%"}
              </span>
            </div>
            <div className="space-y-2">
              {campaignDims.map((dim) => (
                <div key={dim.id} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-foreground truncate">{dim.name}</p>
                    <p className="text-[10px] text-muted-foreground">{dim.pillar}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={weights[dim.id] ?? dim.weight}
                      onChange={(e) => handleWeightChange(dim.id, e.target.value)}
                      className="w-16 h-7 text-xs text-right font-mono"
                    />
                    <span className="text-xs text-muted-foreground w-3">%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Brand Health Scorer weights */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Brand Health Scorer
              </p>
              <span
                className={cn(
                  "text-xs font-mono font-semibold",
                  healthTotal === 100
                    ? "text-[color:var(--success)]"
                    : "text-[color:var(--warning)]"
                )}
              >
                Total: {healthTotal}% {healthTotal !== 100 && "⚠ must equal 100%"}
              </span>
            </div>
            <div className="space-y-2">
              {healthDims.map((dim) => (
                <div key={dim.id} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-foreground truncate">{dim.name}</p>
                    <p className="text-[10px] text-muted-foreground">{dim.pillar}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={weights[dim.id] ?? dim.weight}
                      onChange={(e) => handleWeightChange(dim.id, e.target.value)}
                      className="w-16 h-7 text-xs text-right font-mono"
                    />
                    <span className="text-xs text-muted-foreground w-3">%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Save / reset */}
          <div className="flex items-center gap-2 pt-1">
            <Button
              size="sm"
              onClick={handleSave}
              disabled={saveState === "saving"}
              className="gap-1.5"
            >
              {saveState === "saving" ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : saveState === "saved" ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5" />
                  Saved
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  Save Weights
                </>
              )}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleReset}
              className="gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset to Defaults
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ── Danger Zone ──────────────────────────────────────── */}
      <Card className="linear-card border-destructive/30">
        <CardHeader className="pb-3 border-b border-destructive/20">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-3.5 h-3.5 text-destructive" />
            </div>
            <CardTitle className="text-sm font-semibold text-destructive">Danger Zone</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-4 space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-border/40">
            <div>
              <p className="text-sm font-medium text-foreground">Archive All Delivered Runs</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Move all &quot;Delivered&quot; runs to Archived status. Scorecards remain accessible.
              </p>
            </div>
            <Button size="sm" variant="outline" className="border-destructive/30 text-destructive hover:bg-destructive/5 shrink-0">
              Archive
            </Button>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-foreground">Revoke API Access</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Disconnect the Anthropic API key from this deployment. Scoring tools will become unavailable.
              </p>
            </div>
            <Button size="sm" variant="outline" className="border-destructive/30 text-destructive hover:bg-destructive/5 shrink-0">
              Revoke
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
