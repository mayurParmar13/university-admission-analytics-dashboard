import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ApplicationTrend } from "../../types/analytics";
import NoDataComponent from "../common/NoDataComponent";

interface ApplicationTrendChartProps {
  data: ApplicationTrend[];
}

export default function ApplicationTrendChart({
  data,
}: ApplicationTrendChartProps) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesFromDate = !fromDate || item.date >= fromDate;

      const matchesToDate = !toDate || item.date <= toDate;

      return matchesFromDate && matchesToDate;
    });
  }, [data, fromDate, toDate]);

  return (
    <div>
      {/* Date Filter */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-end">
        <div className="w-full sm:w-auto">
          <label
            htmlFor="from-date"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            From
          </label>

          <input
            id="from-date"
            type="date"
            value={fromDate}
            max={toDate || undefined}
            onChange={(event) => setFromDate(event.target.value)}
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 sm:w-40"
          />
        </div>

        <div className="w-full sm:w-auto">
          <label
            htmlFor="to-date"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            To
          </label>

          <input
            id="to-date"
            type="date"
            value={toDate}
            min={fromDate || undefined}
            onChange={(event) => setToDate(event.target.value)}
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 sm:w-40"
          />
        </div>
      </div>

      {/* Empty State */}
      {filteredData.length === 0 ? (
        <NoDataComponent
          title="No application data found"
          subtitle="Try selecting a different date range."
        />
      ) : (
        /* Chart */
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={filteredData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickFormatter={(value: string) =>
                  new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }
              />

              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />

              <Tooltip
                labelFormatter={(value) =>
                  new Date(String(value)).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                }
              />

              <Line
                type="monotone"
                dataKey="applications"
                name="Applications"
                stroke="#2563eb"
                strokeWidth={2.5}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
