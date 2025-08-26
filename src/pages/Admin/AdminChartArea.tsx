import { useAllAgentInfoQuery } from "@/redux/features/Agent/agent.api";
import { useAllTransactionsInfoQuery } from "@/redux/features/Transaction/transaction.api";
import { useAllUserInfoQuery } from "@/redux/features/User/user.api";
import ErrorLoading from "@/utils/ErrorLoading";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminChartArea() {
  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
    refetch: refetchUsers,
  } = useAllUserInfoQuery(undefined);
  const totalUser = userData?.meta?.total | 0;

  const {
    data: agentData,
    isLoading: isAgentLoading,
    isError: isAgentError,
    refetch: refetchAgents,
  } = useAllAgentInfoQuery(undefined);
  const totalAgent = agentData?.meta?.total | 0;

  const {
    data: transactionData,
    isLoading: isTransactionLoading,
    isError: isTransactionError,
    refetch: refetchTransactions,
  } = useAllTransactionsInfoQuery(undefined);
  const totalTransaction = transactionData?.meta?.total | 0;

  // loading
  if (isUserLoading || isAgentLoading || isTransactionLoading) {
    <div className="flex space-x-4">
      <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
    </div>;
  }

  // loading
  if (isUserError) {
    return (
      <ErrorLoading
        message="Failed to load!"
        onRetry={() => {
          void refetchUsers();
        }}
      />
    );
  }

  if (isAgentError) {
    return (
      <ErrorLoading
        message="Failed to load!"
        onRetry={() => {
          void refetchAgents();
        }}
      />
    );
  }

  if (isTransactionError) {
    return (
      <ErrorLoading
        message="Failed to load!"
        onRetry={() => {
          void refetchTransactions();
        }}
      />
    );
  }

  //

  const chartData = [
    {
      name: "User",
      Total: totalUser,
    },

    {
      name: "Transaction",
      Total: totalTransaction,
    },
    {
      name: "Agent",
      Total: totalAgent,
    },
  ];

  return (
    <div className="px-1 py-4 md:px-0 border border-green-300 dark:border-green-700 rounded-2xl bg-gradient-to-r from-green-50 to-lime-100 dark:from-green-900 dark:to-lime-900 transition-all duration-300 ">
      <div className="w-full max-w-4xl mx-auto rounded-lg border bg-background p-4 shadow-sm sm:p-6">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          {/* <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
            Users vs Agents
          </h2> */}
          <p className="text-sm text-muted-foreground">
            Users & Agents — Transaction Volume
          </p>
        </div>

        {/* Chart */}
        <div className="w-full h-[250px] sm:h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="Total"
                stroke="var(--chart-1)"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
