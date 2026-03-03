"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import type { ScoringVolumeByPeriod } from "@/lib/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-border/60 bg-background p-3 text-xs shadow-sm">
      <p className="font-medium mb-1.5 text-foreground">{label}</p>
      {payload.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (entry: any, i: number) => (
          <p
            key={i}
            className="text-muted-foreground flex items-center gap-2 leading-5"
          >
            <span
              className="inline-block w-2 h-2 rounded-sm shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            {entry.name}:{" "}
            <span className="font-mono font-medium text-foreground">
              {entry.value}
            </span>
          </p>
        )
      )}
    </div>
  );
}

export function ScoringVolumeChart({
  data,
}: {
  data: ScoringVolumeByPeriod[];
}) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
        data={data}
        margin={{ top: 4, right: 8, bottom: 0, left: -8 }}
        barCategoryGap="30%"
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="var(--border)"
          strokeOpacity={0.5}
          vertical={false}
        />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={CustomTooltip} />
        <Legend
          wrapperStyle={{
            fontSize: 11,
            color: "var(--muted-foreground)",
            paddingTop: 8,
          }}
        />
        <Bar
          dataKey="scoringRuns"
          name="Scoring Runs"
          fill="var(--chart-1)"
          radius={[3, 3, 0, 0]}
        />
        <Bar
          dataKey="delivered"
          name="Delivered"
          fill="var(--chart-2)"
          radius={[3, 3, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
