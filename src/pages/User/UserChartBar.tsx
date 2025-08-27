"use client";

import { useGetMyTransactionQuery } from "@/redux/features/Transaction/transaction.api";
import { useUserInfoQuery } from "@/redux/features/User/user.api";
import type { ITransaction } from "@/types/transaction";
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

const STATUS_COLORS = {
  completed: "#72f1c6",
  pending: "#f7d6bae2",
  reversed: "#ff6b6b",
};

export default function UserChartBar() {
  const { data: currentUser } = useUserInfoQuery(undefined);
  const {
    data: allData,
    isLoading,
    isError,
  } = useGetMyTransactionQuery({ limit: "all" });

  const allInvoices: ITransaction[] = allData?.data ?? [];
  const myInvoices: ITransaction[] = allInvoices.filter(
    (invoice) => invoice.createdBy?._id === currentUser?.data?._id
  );

  const totalPendingSendMoney = getTotalByTypeAndStatus(
    myInvoices,
    "send-money",
    "pending"
  );
  const totalPendingWithdrawMoney = getTotalByTypeAndStatus(
    myInvoices,
    "withdraw-money",
    "pending"
  );
  const totalPendingAddMoney = getTotalByTypeAndStatus(
    myInvoices,
    "add-money",
    "pending"
  );

  const totalCompletedSendMoney = getTotalByTypeAndStatus(
    myInvoices,
    "send-money",
    "completed"
  );
  const totalCompletedWithdrawMoney = getTotalByTypeAndStatus(
    myInvoices,
    "withdraw-money",
    "completed"
  );
  const totalCompletedAddMoney = getTotalByTypeAndStatus(
    myInvoices,
    "add-money",
    "completed"
  );

  const totalReversedSendMoney = getTotalByTypeAndStatus(
    myInvoices,
    "send-money",
    "reversed"
  );
  const totalReversedWithdrawMoney = getTotalByTypeAndStatus(
    myInvoices,
    "withdraw-money",
    "reversed"
  );
  const totalReversedAddMoney = getTotalByTypeAndStatus(
    myInvoices,
    "add-money",
    "reversed"
  );

  const chartData = [
    {
      name: "Send Money",
      Completed: totalCompletedSendMoney,
      Pending: totalPendingSendMoney,
      Reversed: totalReversedSendMoney,
    },
    {
      name: "Withdraw Money",
      Completed: totalCompletedWithdrawMoney,
      Pending: totalPendingWithdrawMoney,
      Reversed: totalReversedWithdrawMoney,
    },
    {
      name: "Add Money",
      Completed: totalCompletedAddMoney,
      Pending: totalPendingAddMoney,
      Reversed: totalReversedAddMoney,
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
      <p className="text-center text-red-500">
        Failed to load transaction data.
      </p>
    );
  }

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 border border-green-300 dark:border-green-700 rounded-2xl bg-gradient-to-r from-green-50 to-lime-100 dark:from-green-900 dark:to-lime-900 shadow-sm dark:shadow-md transition-all duration-300 w-full mx-auto">
      <h2 className="text-center text-xl md:text-2xl font-semibold mb-6 md:mb-8 text-gray-800 dark:text-white">
        {/* Transaction Totals by Type & Status (Stacked) */}
      </h2>
      <div className="w-full h-64 md:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
            <Bar dataKey="Completed" fill={STATUS_COLORS.completed} />
            <Bar dataKey="Pending" fill={STATUS_COLORS.pending} />
            <Bar dataKey="Reversed" fill={STATUS_COLORS.reversed} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
