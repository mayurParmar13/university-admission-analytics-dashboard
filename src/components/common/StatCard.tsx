import type { ReactNode } from "react";
import {
  getApplicantCountColor,
  getTrendColor,
} from "../../utils/statCardUtils";

interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  trend?: number;
  trendLabel?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  trend,
  trendLabel = "from last period",
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-secondary">{title}</p>

          <p
            className={`mt-2 text-3xl font-bold tracking-tight ${getApplicantCountColor(
              value,
            )}`}
          >
            {value.toLocaleString()}
          </p>

          {trend !== undefined && (
            <div className="mt-2 flex items-center gap-1.5 text-xs">
              <span className={`font-semibold ${getTrendColor(trend)}`}>
                {trend > 0 ? "+" : ""}
                {trend}%
              </span>

              <span className="text-secondary">{trendLabel}</span>
            </div>
          )}
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>
      </div>
    </div>
  );
}
