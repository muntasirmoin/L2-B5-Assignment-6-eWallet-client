"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AdminChartPie() {
  const chartData = [
    { name: "Users", value: 20 },
    { name: "Agents", value: 10 },
    { name: "Transactions", value: 50 },
  ];

  // Define colors for each slice
  const COLORS = ["#6366f1", "#10b981", "#f59e0b"]; // purple, green, amber

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 border border-green-300 dark:border-green-700 rounded-2xl bg-gradient-to-r from-green-50 to-lime-100 dark:from-green-900 dark:to-lime-900 transition-all duration-300 w-full mx-auto">
      <h2 className="text-center text-xl md:text-2xl font-semibold mb-6 md:mb-8">
        Users, Agents & Transaction Totals
      </h2>
      <div className="w-full h-64 md:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="80%"
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
