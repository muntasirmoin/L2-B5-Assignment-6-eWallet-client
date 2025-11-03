import { useGetMyTransactionQuery } from "@/redux/features/Transaction/transaction.api";

import type { ITransaction } from "@/types/transaction";
import { getTotalByTypeAndStatus } from "@/utils/getTotalByTypeAndStatus";
import { Skeleton } from "@/components/ui/skeleton";
import MyRecentTransactionTable from "./MyRecentTransactionTable";
import AgentChartBar from "./AgentChartBar";
import ErrorLoading from "@/utils/ErrorLoading";

const Overview = () => {
  // All data
  const {
    data: allData,
    isLoading: isAllLoading,
    isError: isAllError,
    refetch,
  } = useGetMyTransactionQuery({ limit: "all" });

  const allInvoices: ITransaction[] = allData?.data ?? [];

  console.log("allInvoices", allInvoices);
  //  all data for totals cash-in-out
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

  //  loading
  if (isAllLoading) {
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="p-6 rounded shadow space-y-4">
              <Skeleton className="h-4 w-1/2 mx-auto" />
              <Skeleton className="h-8 w-3/4 mx-auto" />
            </div>
          ))}
        </div>
      </>
    );
  }

  // error
  if (isAllError)
    return (
      <ErrorLoading
        message="Failed to load!"
        onRetry={() => {
          void refetch();
        }}
      />
    );

  return (
    <div className="space-y-6">
      {/* Summary Section */}
      <div className="bg-green-100 dark:bg-green-900 p-4 sm:p-6 rounded shadow text-center">
        <h2 className="text-lg sm:text-2xl font-bold text-green-700 dark:text-green-300">
          Cash-In and Cash-Out Summary
        </h2>
      </div>
      {/*  */}
      <AgentChartBar />
      {/*  */}
      {/* summary data start */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center">
        {/* Completed Cash In */}
        // //{" "}
        <div className="bg-green-100 dark:bg-green-900 p-6 rounded shadow">
          // // //{" "}
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            // // Total Cash In (Completed) // //{" "}
          </h3>
          // // //{" "}
          <p className="text-2xl font-bold text-green-700 dark:text-green-300">
            // // {totalCashInCompleted.toLocaleString()}
            // // //{" "}
          </p>
          // // //{" "}
        </div>
        "{/* Completed Cash Out */}
        //{" "}
        <div className="bg-red-100 dark:bg-red-900 p-6 rounded shadow">
          //{" "}
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            // Total Cash Out (Completed) //{" "}
          </h3>
          //{" "}
          <p className="text-2xl font-bold text-red-700 dark:text-red-300">
            // {totalCashOutCompleted.toLocaleString()}
            //{" "}
          </p>
          //{" "}
        </div>
        {/* Pending Cash In */}
        <div className="bg-green-100 dark:bg-green-900 p-6 rounded shadow">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            Total Pending Cash In
          </h3>
          <p className="text-2xl font-bold text-green-700 dark:text-green-300">
            {totalPendingCashIn.toLocaleString()}
          </p>
        </div>
        {/* Pending Cash Out */}
        <div className="bg-red-100 dark:bg-red-900 p-6 rounded shadow">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            Total Pending Cash Out
          </h3>
          <p className="text-2xl font-bold text-red-700 dark:text-red-300">
            {totalPendingCashOut.toLocaleString()}
          </p>
        </div>
        {/* Reversed Cash In */}
        <div className="bg-green-100 dark:bg-green-900 p-6 rounded shadow">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            Total Reversed Cash In
          </h3>
          <p className="text-2xl font-bold text-red-700 dark:text-red-300">
            {totalReversedCashIn.toLocaleString()}
          </p>
        </div>
        {/* Reversed Cash Out */}
        <div className="bg-red-100 dark:bg-red-900 p-6 rounded shadow">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            Total Reversed Cash Out
          </h3>
          <p className="text-2xl font-bold text-green-700 dark:text-green-300">
            {totalReversedCashOut.toLocaleString()}
          </p>
        </div>
      </div>
      {/* summary data end */}
      {/* Table Section */}
      <MyRecentTransactionTable />
    </div>
  );
};

export default Overview;
