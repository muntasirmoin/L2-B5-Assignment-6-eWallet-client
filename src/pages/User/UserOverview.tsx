import { Skeleton } from "@/components/ui/skeleton";
import { useGetMyTransactionQuery } from "@/redux/features/Transaction/transaction.api";
import type { ITransaction } from "@/types/transaction";
import { getTotalByTypeAndStatus } from "@/utils/getTotalByTypeAndStatus";
import UserRecentTransactionTable from "./UserRecentTransactionTable";
import { QuickAction } from "./QuickAction";
import UserChartBar from "./UserChartBar";
import ErrorLoading from "@/utils/ErrorLoading";
import { useUserInfoQuery } from "@/redux/features/User/user.api";

const UserOverview = () => {
  const { data: currentUser } = useUserInfoQuery(undefined);
  // All data
  const {
    data: allData,
    isLoading: isAllLoading,
    isError: isAllError,
    refetch,
  } = useGetMyTransactionQuery({ limit: "all" });

  const allInvoices: ITransaction[] = allData?.data ?? [];
  const myInvoices: ITransaction[] = allInvoices.filter(
    (invoice) => invoice.createdBy?._id === currentUser?.data?._id
  );

  // pending
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

  // completed
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

  // reversed
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
    <>
      <QuickAction />
      <div className="space-y-6">
        {/* Summary Section */}
        <div className="bg-green-100 dark:bg-green-900 p-4 sm:p-6 rounded shadow text-center">
          <h2 className="text-lg sm:text-2xl font-bold text-green-700 dark:text-green-300">
            {/* Summary OF Send Money - Withdraw Money - Add Money Summary */}
            Summary OF Transactions
          </h2>
        </div>
        {/*  */}
        <UserChartBar />
        {/*  */}
        {/* start */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center"> */}
        {/* Completed Send Money */}
        {/* <div className="bg-green-100 dark:bg-green-900 p-6 rounded shadow">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
              Total Send Money(Completed)
            </h3>
            <p className="text-2xl font-bold text-red-700 dark:text-red-300">
              {totalCompletedSendMoney.toLocaleString()}
            </p>
          </div> */}

        {/* Completed Add Money */}
        {/* <div className="bg-green-100 dark:bg-green-900 p-6 rounded shadow">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
              Total Add Money (Completed)
            </h3>
            <p className="text-2xl font-bold text-green-700 dark:text-green-300">
              {totalCompletedAddMoney.toLocaleString()}
            </p>
          </div> */}

        {/* Completed Withdraw Money */}
        {/* <div className="bg-green-100 dark:bg-green-900 p-6 rounded shadow">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
              Total Withdraw Money (Completed)
            </h3>
            <p className="text-2xl font-bold text-red-700 dark:text-red-300">
              {totalCompletedWithdrawMoney.toLocaleString()}
            </p>
          </div> */}
        {/* pending */}
        {/* pending Send Money */}
        {/* <div className="bg-yellow-100 dark:bg-yellow-900 p-6 rounded shadow">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
              Total Send Money(Pending)
            </h3>
            <p className="text-2xl font-bold text-green-700 dark:text-green-300">
              {totalPendingSendMoney.toLocaleString()}
            </p>
          </div> */}

        {/* Pending Add Money */}
        {/* <div className="bg-yellow-100 dark:bg-yellow-900 p-6 rounded shadow">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
              Total Add Money (Pending)
            </h3>
            <p className="text-2xl font-bold text-red-700 dark:text-red-300">
              {totalPendingAddMoney.toLocaleString()}
            </p>
          </div> */}

        {/* Pending Withdraw Money */}
        {/* <div className="bg-yellow-100 dark:bg-yellow-900 p-6 rounded shadow">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
              Total Withdraw Money (Pending)
            </h3>
            <p className="text-2xl font-bold text-green-700 dark:text-green-300">
              {totalPendingWithdrawMoney.toLocaleString()}
            </p>
          </div> */}
        {/* Reversed */}

        {/* ReversedSend Money */}
        {/* <div className="bg-red-100 dark:bg-red-900 p-6 rounded shadow">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
              Total Send Money(Reversed)
            </h3>
            <p className="text-2xl font-bold text-green-700 dark:text-green-300">
              {totalReversedSendMoney.toLocaleString()}
            </p>
          </div> */}

        {/* Reversed Add Money */}
        {/* <div className="bg-red-100 dark:bg-red-900 p-6 rounded shadow">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
              Total Add Money (Reversed)
            </h3>
            <p className="text-2xl font-bold text-red-700 dark:text-red-300">
              {totalReversedAddMoney.toLocaleString()}
            </p>
          </div> */}

        {/* ReversedWithdraw Money */}
        {/* <div className="bg-red-100 dark:bg-red-900 p-6 rounded shadow">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
              Total Withdraw Money (Reversed)
            </h3>
            <p className="text-2xl font-bold text-green-700 dark:text-green-300">
              {totalReversedWithdrawMoney.toLocaleString()}
            </p>
          </div> */}
        {/* </div> */}

        {/* end */}

        {/* Table Section */}
        <UserRecentTransactionTable />
      </div>
    </>
  );
};

export default UserOverview;
