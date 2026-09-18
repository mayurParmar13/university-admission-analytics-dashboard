import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { ProgramApplication } from "../../types/analytics";
import NoDataComponent from "../common/NoDataComponent";

interface ApplicationBarChartProps {
  data: ProgramApplication[];
}

export default function ApplicationBarChart({
  data,
}: ApplicationBarChartProps) {
  if (data.length === 0) {
    return (
      <NoDataComponent
        title="No program data available"
        subtitle="There are no applications to display."
      />
    );
  }

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis
            dataKey="program"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip cursor={{ fill: "rgba(37, 99, 235, 0.05)" }} />

          <Bar
            dataKey="applications"
            name="Applications"
            fill="#2563eb"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
