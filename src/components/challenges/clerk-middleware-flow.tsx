import { ArrowRight, Globe, ShieldCheck, BookOpen, XCircle } from "lucide-react";

interface FlowNode {
  id: string;
  label: string;
  sublabel?: string;
  type: "start" | "check" | "allow" | "deny";
  icon: React.ComponentType<{ className?: string }>;
}

const flowNodes: FlowNode[] = [
  {
    id: "request",
    label: "Incoming Request",
    sublabel: "Any route",
    type: "start",
    icon: Globe,
  },
  {
    id: "middleware",
    label: "Clerk Middleware",
    sublabel: "Edge — before render",
    type: "check",
    icon: ShieldCheck,
  },
  {
    id: "allow",
    label: "Authenticated",
    sublabel: "Session valid → render tool",
    type: "allow",
    icon: BookOpen,
  },
  {
    id: "deny",
    label: "Unauthenticated",
    sublabel: "Redirect to /sign-in",
    type: "deny",
    icon: XCircle,
  },
];

const nodeStyles: Record<FlowNode["type"], string> = {
  start: "border-border/60 bg-card",
  check: "border-primary/30 bg-primary/5",
  allow: "border-[color-mix(in_oklch,var(--success)_20%,transparent)] bg-[color-mix(in_oklch,var(--success)_8%,transparent)]",
  deny: "border-[color-mix(in_oklch,var(--destructive)_20%,transparent)] bg-[color-mix(in_oklch,var(--destructive)_8%,transparent)]",
};

const iconStyles: Record<FlowNode["type"], string> = {
  start: "text-muted-foreground",
  check: "text-primary",
  allow: "text-[color:var(--success)]",
  deny: "text-destructive",
};

const labelStyles: Record<FlowNode["type"], string> = {
  start: "text-foreground",
  check: "text-primary",
  allow: "text-[color:var(--success)]",
  deny: "text-destructive",
};

export function ClerkMiddlewareFlow() {
  const mainNodes = flowNodes.slice(0, 2);
  const outcomeNodes = flowNodes.slice(2);

  return (
    <div className="space-y-3">
      {/* Main flow: request → middleware */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        {mainNodes.map((node, i) => (
          <div key={node.id} className="flex items-center gap-2 w-full sm:w-auto">
            <div
              className={`rounded-lg border px-3 py-2 flex items-start gap-2 flex-1 sm:flex-none sm:min-w-[160px] ${nodeStyles[node.type]}`}
            >
              <node.icon className={`h-4 w-4 shrink-0 mt-0.5 ${iconStyles[node.type]}`} />
              <div>
                <p className={`text-xs font-medium ${labelStyles[node.type]}`}>
                  {node.label}
                </p>
                {node.sublabel && (
                  <p className="text-[10px] text-muted-foreground">{node.sublabel}</p>
                )}
              </div>
            </div>
            {i < mainNodes.length - 1 && (
              <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 hidden sm:block" />
            )}
          </div>
        ))}

        {/* Branching arrow label */}
        <div className="hidden sm:flex items-center gap-1 shrink-0">
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">auth check</span>
        </div>
      </div>

      {/* Branch outcomes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:pl-8">
        {outcomeNodes.map((node) => (
          <div
            key={node.id}
            className={`rounded-lg border px-3 py-2 flex items-start gap-2 ${nodeStyles[node.type]}`}
          >
            <node.icon className={`h-4 w-4 shrink-0 mt-0.5 ${iconStyles[node.type]}`} />
            <div>
              <p className={`text-xs font-medium ${labelStyles[node.type]}`}>
                {node.label}
              </p>
              {node.sublabel && (
                <p className="text-[10px] text-muted-foreground">{node.sublabel}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Code snippet note */}
      <div className="rounded-md bg-muted/50 border border-border/40 px-3 py-2">
        <p className="text-[10px] font-mono text-muted-foreground leading-relaxed">
          <span className="text-primary/80">middleware.ts</span>
          {" · "}
          <span>clerkMiddleware() runs at the edge before any page renders</span>
          <br />
          <span className="text-primary/80">matcher</span>
          {": ["}
          <span className="text-[color:var(--success)]">&apos;/((?!sign-in).*&apos;</span>
          {"] — protects all routes except /sign-in"}
        </p>
      </div>
    </div>
  );
}
