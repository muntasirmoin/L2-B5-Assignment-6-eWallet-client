"use client";

import { useGetMyTransactionQuery } from "@/redux/features/Transaction/transaction.api";
import type { ITransaction } from "@/types/transaction";
import ErrorLoading from "@/utils/ErrorLoading";
import { getTotalByTypeAndStatus } from "@/utils/getTotalByTypeAndStatus";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const COLORS = {
  completedIn: "#72f1c6",
  completedOut: "#9798e8",
  pendingIn: "#f7d6bae2",
  pendingOut: "#fcbf49",
  reversedIn: "#ff6b6b",
  reversedOut: "#06d6a0",
};

export default function AgentChartBar() {
  const {
    data: allData,
    isLoading,
    isError,
    refetch,
  } = useGetMyTransactionQuery({ limit: "all" });

  const allInvoices: ITransaction[] = allData?.data ?? [];

  const totalCashInCompleted = getTotalByTypeAndStatus(
    allInvoices,
    "cash-in",
    "completed"
  );
  const totalCashOutCompleted = getTotalByTypeAndStatus(
    allInvoices,
    "cash-out",
    "completed"
  );

  const totalPendingCashIn = getTotalByTypeAndStatus(
    allInvoices,
    "cash-in",
    "pending"
  );
  const totalPendingCashOut = getTotalByTypeAndStatus(
    allInvoices,
    "cash-out",
    "pending"
  );

  const totalReversedCashIn = getTotalByTypeAndStatus(
    allInvoices,
    "cash-in",
    "reversed"
  );
  const totalReversedCashOut = getTotalByTypeAndStatus(
    allInvoices,
    "cash-out",
    "reversed"
  );

  const chartData = [
    {
      name: "Completed",
      "Cash In": totalCashInCompleted,
      "Cash Out": totalCashOutCompleted,
    },
    {
      name: "Pending",
      "Cash In": totalPendingCashIn,
      "Cash Out": totalPendingCashOut,
    },
    {
      name: "Reversed",
      "Cash In": totalReversedCashIn,
      "Cash Out": totalReversedCashOut,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-64 md:h-96">
        <div className="animate-pulse rounded-full bg-gray-300 dark:bg-gray-700 w-48 h-48 md:w-72 md:h-72" />
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorLoading
        message="Failed to load!"
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 border border-green-300 dark:border-green-700 rounded-2xl bg-gradient-to-r from-green-50 to-lime-100 dark:from-green-900 dark:to-lime-900 shadow-sm dark:shadow-md transition-all duration-300 w-full mx-auto">
      <h2 className="text-center text-xl md:text-2xl font-semibold mb-6 md:mb-8 text-gray-800 dark:text-white">
        {/* Cash In & Out Totals by Status */}
      </h2>
      <div className="w-full h-64 md:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
            <Bar dataKey="Cash In" fill={COLORS.completedIn} />
            <Bar dataKey="Cash Out" fill={COLORS.completedOut} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
