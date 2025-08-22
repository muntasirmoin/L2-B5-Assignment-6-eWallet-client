import { useGetMyTransactionQuery } from "@/redux/features/Transaction/transaction.api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import PaginationComponent from "@/components/pagination";
import type { ITransaction } from "@/types/transaction";
import { getTotalByTypeAndStatus } from "@/utils/getTotalByTypeAndStatus";
import { Skeleton } from "@/components/ui/skeleton";

const Overview = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [limit, setLimit] = useState(5);

  // Paginated data
  const {
    data: paginatedData,
    isLoading: isPaginatedLoading,
    isError: isPaginatedError,
  } = useGetMyTransactionQuery({ page: currentPage, limit });

  // All data
  const {
    data: allData,
    isLoading: isAllLoading,
    isError: isAllError,
  } = useGetMyTransactionQuery(undefined);

  const invoices: ITransaction[] = paginatedData?.data ?? [];

  const totalPages = paginatedData?.meta?.totalPage ?? 1;

  const allInvoices: ITransaction[] = allData?.data ?? [];
  console.log("all", allInvoices);
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

  //  loading & error
  if (isAllLoading || isPaginatedLoading) {
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
        <div className="flex justify-center space-x-3 py-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-8 rounded-full" />
          ))}
        </div>
      </>
    );
  }

  if (isPaginatedError || isAllError) return <div>Failed to load data.</div>;

  return (
    <div className="space-y-6">
      {/* Summary Section */}
      <div className="bg-green-100 dark:bg-green-900 p-4 sm:p-6 rounded shadow text-center">
        <h2 className="text-lg sm:text-2xl font-bold text-green-700 dark:text-green-300">
          Cash-In and Cash-Out Summary
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center">
        {/* Completed Cash In */}
        <div className="bg-green-100 dark:bg-green-900 p-6 rounded shadow">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            Total Cash In (Completed)
          </h3>
          <p className="text-2xl font-bold text-green-700 dark:text-green-300">
            {totalCashInCompleted.toLocaleString()}
          </p>
        </div>

        {/* Completed Cash Out */}
        <div className="bg-red-100 dark:bg-red-900 p-6 rounded shadow">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            Total Cash Out (Completed)
          </h3>
          <p className="text-2xl font-bold text-red-700 dark:text-red-300">
            {totalCashOutCompleted.toLocaleString()}
          </p>
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

      {/* Table Section */}
      <div className="overflow-x-auto">
        <div className="bg-green-100 dark:bg-green-900 p-4 sm:p-6 rounded shadow text-center">
          <h2 className="text-lg sm:text-2xl font-bold text-green-700 dark:text-green-300">
            Recent Cash-In and Cash-Out Transactions
          </h2>
        </div>
        {invoices.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-6">
            No recent transactions found.
          </p>
        ) : (
          <>
            <Table>
              {/* <TableCaption>Recent Cash-In and Cash-Out Transactions</TableCaption> */}
              <TableHeader>
                <TableRow className="text-center bg-gray-100 dark:bg-gray-800 font-semibold text-gray-700 dark:text-gray-300">
                  <TableHead className="py-3 px-2 text-center font-bold">
                    Name
                  </TableHead>
                  <TableHead className="py-3 px-2 text-center font-bold">
                    Phone
                  </TableHead>
                  <TableHead className="py-3 px-2 text-center font-bold">
                    Status
                  </TableHead>
                  <TableHead className="py-3 px-2 text-center font-bold">
                    TRX No
                  </TableHead>
                  <TableHead className="py-3 px-2 text-center font-bold">
                    TRX Date
                  </TableHead>
                  <TableHead className="py-3 px-2 text-center font-bold">
                    Type
                  </TableHead>
                  <TableHead className="py-3 px-2 text-center font-bold">
                    Amount
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow
                    key={invoice._id}
                    className={`text-center ${
                      invoice.type === "cash-in"
                        ? "bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-300"
                        : invoice.type === "cash-out"
                        ? "bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-300"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <TableCell className="text-center font-bold">
                      {invoice.type === "cash-out"
                        ? invoice.sender?.name
                        : invoice.type === "cash-in"
                        ? invoice.receiver?.name
                        : invoice.createdBy?.name}
                    </TableCell>
                    <TableCell className="text-center font-semibold">
                      {invoice.type === "cash-out"
                        ? invoice.sender?.phone
                        : invoice.type === "cash-in"
                        ? invoice.receiver?.phone
                        : invoice.createdBy?.phone}
                    </TableCell>
                    <TableCell className="text-center font-semibold uppercase">
                      {invoice.status}
                    </TableCell>
                    <TableCell className="text-center font-semibold">
                      {invoice._id}
                    </TableCell>
                    <TableCell className="text-center font-semibold">
                      {new Date(invoice.createdAt)
                        .toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: false,
                        })
                        .replace(",", "")
                        .replace(/\//g, "-")
                        .replace(" ", " (") + ")"}
                    </TableCell>
                    <TableCell className="text-center font-semibold uppercase">
                      {invoice.type}
                    </TableCell>
                    <TableCell className="text-center font-extrabold">
                      {invoice.amount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* pagination */}
            <div className="mt-6">
              <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page: number) => setCurrentPage(page)}
              />
            </div>
          </>
        )}
        {/*  */}
      </div>
    </div>
  );
};

export default Overview;
