import { useAllUserInfoQuery } from "@/redux/features/User/user.api";
import { AdminQuickAction } from "./AdminQuickAction";
import { useAllAgentInfoQuery } from "@/redux/features/Agent/agent.api";
import { useAllTransactionsInfoQuery } from "@/redux/features/Transaction/transaction.api";
import AdminChartArea from "./AdminChartArea";
import AdminChartPie from "./AdminChartPie";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorLoading from "@/utils/ErrorLoading";

const AdminOverView = () => {
  const {
    // data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
    refetch: refetchUser,
  } = useAllUserInfoQuery(undefined);

  // const totalUser = userData?.meta?.total | 0;

  const {
    // data: agentData,
    isLoading: isAgentLoading,
    isError: isAgentError,
    refetch: refetchAgent,
  } = useAllAgentInfoQuery(undefined);

  // const totalAgent = agentData?.meta?.total | 0;

  const {
    // data: transactionData,
    isLoading: isTransactionLoading,
    isError: isTransactionError,
    refetch: refetchTransaction,
  } = useAllTransactionsInfoQuery(undefined);
  // const totalTransaction = transactionData?.meta?.total | 0;

  if (isUserLoading || isAgentLoading) {
    return (
      <>
        <div className="p-6 rounded shadow bg-white dark:bg-gray-800 space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-8 w-1/2" />
        </div>
      </>
    );
  }

  if (isTransactionLoading) {
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

  if (isUserError) {
    return (
      <ErrorLoading
        message="Failed to load!"
        onRetry={() => {
          void refetchUser();
        }}
      />
    );
  }

  if (isAgentError) {
    return (
      <ErrorLoading
        message="Failed to load!"
        onRetry={() => {
          void refetchAgent();
        }}
      />
    );
  }
  if (isTransactionError) {
    return (
      <ErrorLoading
        message="Failed to load!"
        onRetry={() => {
          void refetchTransaction();
        }}
      />
    );
  }

  return (
    <>
      <AdminQuickAction />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center">
        {/* Total user */}
        {/* <div className="bg-green-100 dark:bg-green-900 p-6 rounded shadow">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            Total User
          </h3>
          <p className="text-2xl font-bold text-red-700 dark:text-red-300">
            {totalUser.toLocaleString()}
          </p>
        </div> */}

        {/* Total Transaction */}
        {/* <div className="bg-green-100 dark:bg-green-900 p-6 rounded shadow">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            Total Transaction
          </h3>
          <p className="text-2xl font-bold text-red-700 dark:text-red-300">
            {totalTransaction.toLocaleString()}
          </p>
        </div> */}
        {/* Total agents */}
        {/* <div className="bg-yellow-100 dark:bg-yellow-900 p-6 rounded shadow">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            Total Agent
          </h3>
          <p className="text-2xl font-bold text-green-700 dark:text-green-300">
            {totalAgent.toLocaleString()}
          </p>
        </div> */}
        {/*  */}
      </div>
      <AdminChartArea />
      <AdminChartPie />
    </>
  );
};

export default AdminOverView;
