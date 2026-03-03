"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import type { BrandHealthTrendPoint } from "@/lib/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const data = payload[0]?.payload as BrandHealthTrendPoint;
  return (
    <div className="rounded-md border border-border/60 bg-background p-3 text-xs shadow-sm min-w-[160px]">
      <p className="font-medium mb-1.5 text-foreground">{label}</p>
      <p className="text-muted-foreground flex items-center gap-2 leading-5">
        <span
          className="inline-block w-2 h-2 rounded-sm shrink-0"
          style={{ backgroundColor: "var(--chart-3)" }}
        />
        Avg Brand Health Index:{" "}
        <span className="font-mono font-medium text-foreground">
          {payload[0]?.value}
        </span>
      </p>
      <p className="text-muted-foreground mt-0.5">
        {data?.accountCount} accounts · {data?.decliningCount} declining
      </p>
    </div>
  );
}

export function BrandHealthTrendChart({
  data,
}: {
  data: BrandHealthTrendPoint[];
}) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart
        data={data}
        margin={{ top: 4, right: 8, bottom: 0, left: -8 }}
      >
        <defs>
          <linearGradient id="fillHealthIndex" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-3)" stopOpacity={0.22} />
            <stop offset="95%" stopColor="var(--chart-3)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
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
          domain={[60, 80]}
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={CustomTooltip} />
        <Area
          type="monotone"
          dataKey="avgHealthIndex"
          name="Avg Brand Health Index"
          stroke="var(--chart-3)"
          strokeWidth={2}
          fill="url(#fillHealthIndex)"
          dot={false}
          activeDot={{ r: 4, strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
