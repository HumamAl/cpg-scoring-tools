"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import type { ScoreTierDistribution } from "@/lib/types";

const TIER_COLORS: Record<string, string> = {
  excellent: "var(--success)",
  strong: "var(--chart-1)",
  adequate: "var(--warning)",
  needs_work: "oklch(0.72 0.19 40)",
  critical: "var(--destructive)",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload as ScoreTierDistribution;
  return (
    <div className="rounded-md border border-border/60 bg-background p-3 text-xs shadow-sm">
      <p className="font-medium text-foreground">{d.tier}</p>
      <p className="text-muted-foreground mt-0.5">
        <span className="font-mono font-medium text-foreground">{d.count}</span>{" "}
        scorecards &nbsp;·&nbsp; {d.pct}%
      </p>
    </div>
  );
}

export function ScoreTierDistributionChart({
  data,
}: {
  data: ScoreTierDistribution[];
}) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 0, right: 8, bottom: 0, left: 0 }}
        barSize={18}
      >
        <XAxis
          type="number"
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="tier"
          width={76}
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          content={CustomTooltip}
          cursor={{ fill: "var(--surface-hover)" }}
        />
        <Bar dataKey="count" name="Scorecards" radius={[0, 3, 3, 0]}>
          {data.map((entry) => (
            <Cell
              key={entry.colorKey}
              fill={TIER_COLORS[entry.colorKey] ?? "var(--chart-1)"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
