import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetMyTransactionQuery } from "@/redux/features/Transaction/transaction.api";
import type { ITransaction } from "@/types/transaction";
import PaginationComponent from "@/components/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorLoading from "@/utils/ErrorLoading";

export const TransactionType = {
  ALL: "",
  Add: "add-money",
  Withdraw: "withdraw-money",
  SendMoney: "send-money",
  CashIn: "cash-in",
  CashOut: "cash-out",
} as const;

export type TransactionTypeKey = keyof typeof TransactionType;
export type TransactionTypeValue = (typeof TransactionType)[TransactionTypeKey];

const UserTransactionTypeFiltering = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [limit] = useState(8);
  const [typeFilter, setTypeFilter] = useState<TransactionTypeValue>(
    TransactionType.ALL
  );

  // Fetch filtered data
  const actualTypeFilter = typeFilter === "" ? undefined : typeFilter;
  const {
    data: paginatedData,
    isLoading,
    isError,
    refetch,
  } = useGetMyTransactionQuery({
    page: currentPage,
    limit,
    type: actualTypeFilter,
  });

  const transactions: ITransaction[] = paginatedData?.data ?? [];
  const totalPages = paginatedData?.meta?.totalPage ?? 1;

  // Handle loading
  if (isLoading) {
    return (
      <div className="w-full overflow-x-auto mt-4">
        <div className="min-w-[600px]">
          <div className="grid grid-cols-7 gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-7 gap-2 px-4 py-3 mt-2 bg-gray-50 dark:bg-gray-900 rounded-md"
            >
              {Array.from({ length: 7 }).map((_, colIndex) => (
                <Skeleton key={colIndex} className="h-4 w-full" />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Handle error
  if (isError)
    return (
      <ErrorLoading
        message="Failed to load!"
        onRetry={() => {
          void refetch();
        }}
      />
    );

  return (
    <div className="overflow-x-auto">
      <div className="bg-green-100 dark:bg-green-900 p-4 sm:p-6 rounded shadow text-center">
        <h2 className="text-lg sm:text-2xl font-bold text-green-700 dark:text-green-300">
          All Transactions
        </h2>
      </div>

      {/*  Filter */}
      <div className="mt-4 sm:mt-6 mb-4 flex flex-col sm:flex-row justify-center items-center gap-4 px-4">
        <select
          value={typeFilter}
          onChange={(e) => {
            setTypeFilter(e.target.value as TransactionTypeValue);
            setCurrentPage(1);
          }}
          className="border rounded p-2  bg-white text-black dark:bg-gray-800 dark:text-white"
        >
          <option value={TransactionType.ALL}>All Types</option>
          <option value={TransactionType.Withdraw}>Withdraw Money</option>

          <option value={TransactionType.Add}>Add Money</option>
          <option value={TransactionType.SendMoney}>Send Money</option>
          <option value={TransactionType.CashIn}>Cash In</option>
          <option value={TransactionType.CashOut}>Cash Out</option>
        </select>
      </div>
      {/* Filter end */}
      {/* Table or No Result */}
      {transactions.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground py-6">
          {typeFilter
            ? `No transactions found for type "${typeFilter}".`
            : "No transactions found."}
        </p>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow className="text-center bg-gray-100 dark:bg-gray-800 font-semibold text-gray-700 dark:text-gray-300">
                <TableHead className="py-3 px-2 text-center font-bold">
                  Name
                </TableHead>
                <TableHead className="py-3 px-2 text-center font-bold">
                  Phone/Source
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
              {transactions.map((invoice) => (
                <TableRow
                  key={invoice._id}
                  className={`text-center ${
                    invoice.type === "add-money"
                      ? "bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-300"
                      : "bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-300"
                  }`}
                >
                  <TableCell className="text-center font-bold">
                    {invoice.type === "send-money"
                      ? invoice.receiver?.name
                      : invoice.type === "cash-in" ||
                        invoice.type === "cash-out"
                      ? invoice.createdBy?.name
                      : "You"}
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    {invoice.type === "send-money"
                      ? invoice.receiver?.phone
                      : invoice.type === "cash-in" ||
                        invoice.type === "cash-out"
                      ? invoice.createdBy?.phone
                      : invoice.source}
                  </TableCell>
                  <TableCell className="text-center font-semibold uppercase">
                    {invoice.status}
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    {invoice._id}
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    {new Date(invoice.createdAt).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: false,
                    })}
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

          {/* Pagination */}
          <div className="mt-6">
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UserTransactionTypeFiltering;
