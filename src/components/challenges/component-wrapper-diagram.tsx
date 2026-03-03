import { FileCode, Lock, Layers } from "lucide-react";

export function ComponentWrapperDiagram() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {/* Before: standalone .jsx files */}
      <div
        className="rounded-lg border p-4 space-y-3"
        style={{
          backgroundColor: "color-mix(in oklch, var(--destructive) 5%, transparent)",
          borderColor: "color-mix(in oklch, var(--destructive) 15%, transparent)",
        }}
      >
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-medium uppercase tracking-wide text-destructive">
            Current — Standalone .jsx
          </span>
        </div>
        <div className="space-y-2">
          {[
            { name: "CampaignScorer.jsx", note: "No auth, no routing" },
            { name: "BrandHealthScorer.jsx", note: "No auth, no routing" },
          ].map((file) => (
            <div
              key={file.name}
              className="flex items-start gap-2 rounded border border-destructive/20 bg-card px-2.5 py-2"
            >
              <FileCode className="h-3.5 w-3.5 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-mono font-medium">{file.name}</p>
                <p className="text-[10px] text-muted-foreground">{file.note}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-destructive/80">
          Anyone with the URL can access the tool
        </p>
      </div>

      {/* After: wrapped in Next.js protected pages */}
      <div
        className="rounded-lg border p-4 space-y-3"
        style={{
          backgroundColor: "color-mix(in oklch, var(--success) 5%, transparent)",
          borderColor: "color-mix(in oklch, var(--success) 15%, transparent)",
        }}
      >
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-medium uppercase tracking-wide text-[color:var(--success)]">
            After — Protected Next.js Pages
          </span>
        </div>
        <div className="space-y-1">
          {/* Clerk auth layer */}
          <div
            className="rounded border border-primary/20 bg-primary/5 px-2.5 py-1.5 flex items-center gap-2"
          >
            <Lock className="h-3.5 w-3.5 text-primary shrink-0" />
            <p className="text-[10px] font-mono text-primary font-medium">
              Clerk middleware (auth check)
            </p>
          </div>
          {/* Arrow down */}
          <div className="flex justify-center text-muted-foreground text-xs">↓</div>
          {/* Page wrapper */}
          <div className="rounded border border-border/60 bg-card px-2.5 py-1.5 flex items-center gap-2">
            <Layers className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <p className="text-[10px] font-mono text-muted-foreground">
              /campaign-scorer, /brand-health
            </p>
          </div>
          {/* Arrow down */}
          <div className="flex justify-center text-muted-foreground text-xs">↓</div>
          {/* Components unchanged */}
          <div className="space-y-1.5">
            {[
              { name: "CampaignScorer.jsx", note: "Unchanged — zero refactor" },
              { name: "BrandHealthScorer.jsx", note: "Unchanged — zero refactor" },
            ].map((file) => (
              <div
                key={file.name}
                className="flex items-start gap-2 rounded border border-border/60 bg-card px-2.5 py-1.5"
              >
                <FileCode className="h-3.5 w-3.5 text-[color:var(--success)] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-mono font-medium">{file.name}</p>
                  <p className="text-[10px] text-muted-foreground">{file.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-[10px] text-[color:var(--success)]">
          Auth enforced above — components never touched
        </p>
      </div>
    </div>
  );
}
