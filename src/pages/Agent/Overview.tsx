import { useGetMyTransactionQuery } from "@/redux/features/Transaction/transaction.api";

import type { ITransaction } from "@/types/transaction";
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
