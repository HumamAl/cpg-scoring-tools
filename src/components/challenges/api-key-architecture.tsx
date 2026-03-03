"use client";

import { useState } from "react";
import { ShieldAlert, ShieldCheck, Globe, Server, Eye, EyeOff } from "lucide-react";

export function ApiKeyArchitecture() {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="space-y-3">
      {/* Toggle */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowSolution(false)}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-100 ${
            !showSolution
              ? "bg-destructive/10 text-destructive border border-destructive/20"
              : "text-muted-foreground border border-border/60 hover:bg-muted"
          }`}
        >
          Current Setup
        </button>
        <button
          onClick={() => setShowSolution(true)}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-100 ${
            showSolution
              ? "bg-[color-mix(in_oklch,var(--success)_10%,transparent)] text-[color:var(--success)] border border-[color-mix(in_oklch,var(--success)_20%,transparent)]"
              : "text-muted-foreground border border-border/60 hover:bg-muted"
          }`}
        >
          After Fix
        </button>
      </div>

      {/* Architecture diagram */}
      {!showSolution ? (
        <div
          className="rounded-lg border p-4 space-y-3"
          style={{
            backgroundColor: "color-mix(in oklch, var(--destructive) 5%, transparent)",
            borderColor: "color-mix(in oklch, var(--destructive) 15%, transparent)",
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <ShieldAlert className="h-4 w-4 text-destructive shrink-0" />
            <p className="text-xs font-semibold text-destructive uppercase tracking-wide">
              API key exposed in browser
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Browser box */}
            <div className="rounded-md border border-destructive/25 bg-card px-3 py-2 flex items-start gap-2 flex-1">
              <Globe className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-medium">Browser</p>
                <p className="text-[10px] text-muted-foreground">React component</p>
                <div className="mt-1.5 rounded px-1.5 py-0.5 inline-flex items-center gap-1"
                  style={{ backgroundColor: "color-mix(in oklch, var(--destructive) 8%, transparent)" }}>
                  <Eye className="h-3 w-3 text-destructive" />
                  <span className="text-[10px] font-mono text-destructive">ANTHROPIC_API_KEY</span>
                </div>
              </div>
            </div>
            {/* Arrow */}
            <div className="text-xs text-muted-foreground font-mono hidden sm:block shrink-0">→</div>
            {/* Anthropic box */}
            <div className="rounded-md border border-border/60 bg-card px-3 py-2 flex items-start gap-2 flex-1">
              <Server className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-medium">Anthropic API</p>
                <p className="text-[10px] text-muted-foreground">Direct SDK call</p>
                <p className="text-[10px] text-muted-foreground mt-1">
                  Key visible in network tab
                </p>
              </div>
            </div>
          </div>
          <p className="text-xs text-destructive/80 font-mono bg-destructive/5 rounded px-2 py-1">
            Anyone can extract the key from browser devtools
          </p>
        </div>
      ) : (
        <div
          className="rounded-lg border p-4 space-y-3"
          style={{
            backgroundColor: "color-mix(in oklch, var(--success) 5%, transparent)",
            borderColor: "color-mix(in oklch, var(--success) 15%, transparent)",
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="h-4 w-4 text-[color:var(--success)] shrink-0" />
            <p className="text-xs font-semibold text-[color:var(--success)] uppercase tracking-wide">
              API key secured server-side
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Browser box */}
            <div className="rounded-md border border-border/60 bg-card px-3 py-2 flex items-start gap-2 flex-1">
              <Globe className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-medium">Browser</p>
                <p className="text-[10px] text-muted-foreground">React component</p>
                <div className="mt-1.5 rounded px-1.5 py-0.5 inline-flex items-center gap-1 bg-primary/5 border border-primary/15">
                  <span className="text-[10px] font-mono text-primary">POST /api/score</span>
                </div>
              </div>
            </div>
            {/* Arrow */}
            <div className="text-xs text-muted-foreground font-mono hidden sm:block shrink-0">→</div>
            {/* Next.js API Route box */}
            <div className="rounded-md border border-primary/20 bg-primary/5 px-3 py-2 flex items-start gap-2 flex-1">
              <Server className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-medium text-primary">Next.js API Route</p>
                <p className="text-[10px] text-muted-foreground">Server-side only</p>
                <div className="mt-1.5 rounded px-1.5 py-0.5 inline-flex items-center gap-1"
                  style={{ backgroundColor: "color-mix(in oklch, var(--success) 8%, transparent)" }}>
                  <EyeOff className="h-3 w-3 text-[color:var(--success)]" />
                  <span className="text-[10px] font-mono text-[color:var(--success)]">ANTHROPIC_API_KEY</span>
                </div>
              </div>
            </div>
            {/* Arrow */}
            <div className="text-xs text-muted-foreground font-mono hidden sm:block shrink-0">→</div>
            {/* Anthropic box */}
            <div className="rounded-md border border-border/60 bg-card px-3 py-2 flex items-start gap-2 flex-1">
              <Server className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-medium">Anthropic API</p>
                <p className="text-[10px] text-muted-foreground">Server-to-server</p>
                <p className="text-[10px] text-muted-foreground mt-1">
                  Key never leaves Vercel
                </p>
              </div>
            </div>
          </div>
          <p className="text-xs text-[color:var(--success)] font-mono rounded px-2 py-1"
            style={{ backgroundColor: "color-mix(in oklch, var(--success) 6%, transparent)" }}>
            Browser only sees /api/score — key is invisible to devtools
          </p>
        </div>
      )}
    </div>
  );
}
