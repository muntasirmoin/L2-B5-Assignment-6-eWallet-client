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

      {/* summary data end */}
      {/* Table Section */}
      <MyRecentTransactionTable />
    </div>
  );
};

export default Overview;
