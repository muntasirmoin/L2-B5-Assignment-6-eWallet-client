import { Skeleton } from "@/components/ui/skeleton";
import { useAllTransactionsInfoQuery } from "@/redux/features/Transaction/transaction.api";
import type { ITransaction } from "@/types/transaction";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginationComponent from "@/components/pagination";
import ErrorLoading from "@/utils/ErrorLoading";
export const TransactionType = {
  ALL: "",
  Add: "add-money",
  Withdraw: "withdraw-money",
  SendMoney: "send-money",
  CashIn: "cash-in",
  CashOut: "cash-out",
} as const;

type sortType = "asc" | "desc" | "";

export type TransactionTypeKey = keyof typeof TransactionType;
export type TransactionTypeValue = (typeof TransactionType)[TransactionTypeKey];

const AdminAllTransactionsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const [limit] = useState(8);
  const [typeFilter, setTypeFilter] = useState<TransactionTypeValue>(
    TransactionType.ALL
  );

  const actualTypeFilter = typeFilter === "" ? undefined : typeFilter;
  const [sortOrder, setSortOrder] = useState<sortType>("");

  const {
    data: paginatedData,
    isLoading: isPaginatedLoading,
    isError: isPaginatedError,
    refetch,
  } = useAllTransactionsInfoQuery({
    page: currentPage,
    limit,
    // sort: "-updatedAt",
    sort:
      sortOrder === "asc"
        ? "amount"
        : sortOrder === "desc"
        ? "-amount"
        : "-updatedAt",
    searchTerm: search,
    type: actualTypeFilter,
  });

  console.log("paginatedData", paginatedData);

  const invoices: ITransaction[] = paginatedData?.data ?? [];

  const totalPages = paginatedData?.meta?.totalPage ?? 1;

  //  loading & error
  if (isPaginatedLoading) {
    return (
      <>
        <div className="w-full overflow-x-auto mt-4">
          <div className="min-w-[600px]">
            {/* Table Header Skeleton */}
            <div className="grid grid-cols-7 gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md">
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>

            {/* Table Rows Skeleton */}
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
        <div className="flex justify-center space-x-3 py-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-8 rounded-full" />
          ))}
        </div>
      </>
    );
  }

  if (isPaginatedError)
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
      <div className="overflow-x-auto">
        <div className="bg-green-100 dark:bg-green-900 p-4 sm:p-6 rounded shadow text-center">
          <h2 className="text-lg sm:text-2xl font-bold text-green-700 dark:text-green-300">
            All Transactions
          </h2>
        </div>

        {/* serach & filter & Sort  */}
        <div className="mt-4 sm:mt-6 mb-4 flex flex-col sm:flex-row justify-between items-center gap-4 px-4">
          <input
            type="text"
            placeholder="Search by status, type, or by exact amount/TRX No"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded p-2 w-full sm:w-1/3"
          />

          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value as TransactionTypeValue);
              setCurrentPage(1);
            }}
            className="border rounded p-2 w-full sm:w-auto bg-white text-black dark:bg-gray-800 dark:text-white"
          >
            <option value={TransactionType.ALL}>All Type</option>
            <option value={TransactionType.Add}>Add Money</option>
            <option value={TransactionType.CashIn}>Cash In</option>
            <option value={TransactionType.CashOut}>Cash Out</option>
            <option value={TransactionType.SendMoney}>Send Money</option>
            <option value={TransactionType.Withdraw}>Withdraw Money</option>
          </select>

          {/* Sort Order */}
          <select
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value as "asc" | "desc" | "");
              setCurrentPage(1);
            }}
            className="border rounded p-2 w-full sm:w-auto bg-white text-black dark:bg-gray-800 dark:text-white"
          >
            <option value="">Sort by Amount</option>
            <option value="desc">Amount: High to Low</option>
            <option value="asc">Amount: Low to High</option>
          </select>
        </div>

        {/* search */}

        {invoices.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-6">
            {search
              ? `No transactions found for "${search}".`
              : "No recent transactions found."}
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
                    Phone/source
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
                {invoices
                  .filter((invoice) => invoice.status !== "reversed")
                  .map((invoice) => (
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
                        {invoice.type === "send-money"
                          ? invoice.receiver?.name
                          : invoice.type === "cash-in" ||
                            invoice.type === "cash-out" ||
                            invoice.type === "withdraw-money" ||
                            invoice.type === "add-money"
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
    </>
  );
};

export default AdminAllTransactionsTable;
