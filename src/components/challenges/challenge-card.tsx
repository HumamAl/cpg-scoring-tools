import { cn } from "@/lib/utils";
import { OutcomeStatement } from "./outcome-statement";
import type { ReactNode } from "react";

interface ChallengeCardProps {
  title: string;
  description: string;
  outcome?: string;
  children: ReactNode;
  index?: number;
  className?: string;
}

export function ChallengeCard({
  title,
  description,
  outcome,
  children,
  index = 0,
  className,
}: ChallengeCardProps) {
  const stepNumber = String(index + 1).padStart(2, "0");

  return (
    <div
      className={cn(
        "linear-card bg-card p-6 space-y-4",
        className
      )}
      style={{
        animationDelay: `${index * 80}ms`,
      }}
    >
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-sm font-medium text-primary/60 w-6 shrink-0 tabular-nums">
            {stepNumber}
          </span>
          <h2 className="text-base font-semibold">{title}</h2>
        </div>
        <p className="text-sm text-muted-foreground pl-[calc(1.5rem+0.75rem)]">
          {description}
        </p>
      </div>

      {/* Visualization slot */}
      <div className="pl-0">{children}</div>

      {/* Outcome statement */}
      {outcome && <OutcomeStatement outcome={outcome} index={index} />}
    </div>
  );
}
