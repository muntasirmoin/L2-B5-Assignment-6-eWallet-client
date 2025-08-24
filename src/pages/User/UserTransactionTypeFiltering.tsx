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

// 👇 Add this enum or import if defined elsewhere
// enum TransactionType {
//   ALL = "",
//   Add = "add-money",
//   Withdraw = "withdraw-money",
//   CashOut = "cash-out",
//   Reversal = "reversal",

// }

export const TransactionType = {
  ALL: "",
  Add: "add-money",
  Withdraw: "withdraw-money",
  SendMoney: "send-money",
} as const;

export type TransactionTypeKey = keyof typeof TransactionType;
export type TransactionTypeValue = (typeof TransactionType)[TransactionTypeKey];

const UserTransactionTypeFiltering = () => {
  const [currentPage, setCurrentPage] = useState(1);
  //   const [search, setSearch] = useState("");
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
  } = useGetMyTransactionQuery({
    page: currentPage,
    limit,
    // searchTerm: search,
    // type: typeFilter, // Filtering by type
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
  if (isError) return <div className="text-center">Failed to load data.</div>;

  return (
    <div className="overflow-x-auto">
      <div className="bg-green-100 dark:bg-green-900 p-4 sm:p-6 rounded shadow text-center">
        <h2 className="text-lg sm:text-2xl font-bold text-green-700 dark:text-green-300">
          All Transactions
        </h2>
      </div>

      {/* Search and Filter */}
      <div className="mt-4 sm:mt-6 mb-4 flex flex-col sm:flex-row justify-center items-center gap-4 px-4">
        {/* <input
          type="text"
          placeholder="Search by status, type, or by exact amount/TRX No"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded p-2 w-full max-w-md"
        /> */}

        <select
          value={typeFilter}
          onChange={(e) => {
            setTypeFilter(e.target.value as TransactionTypeValue);
            setCurrentPage(1);
          }}
          className="border rounded p-2"
        >
          <option value={TransactionType.ALL}>All Types</option>
          <option value={TransactionType.Withdraw}>Withdraw Money</option>

          <option value={TransactionType.Add}>Add Money</option>
          <option value={TransactionType.SendMoney}>Send Money</option>
        </select>
      </div>

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
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>TRX No</TableHead>
                <TableHead>TRX Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((trx) => (
                <TableRow
                  key={trx._id}
                  className={`text-center ${
                    trx.type === "cash-in"
                      ? "bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-300"
                      : trx.type === "cash-out"
                      ? "bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-300"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <TableCell>
                    {trx.type === "cash-out"
                      ? trx.sender?.name
                      : trx.type === "cash-in"
                      ? trx.receiver?.name
                      : trx.createdBy?.name}
                  </TableCell>
                  <TableCell>
                    {trx.type === "cash-out"
                      ? trx.sender?.phone
                      : trx.type === "cash-in"
                      ? trx.receiver?.phone
                      : trx.createdBy?.phone}
                  </TableCell>
                  <TableCell className="uppercase">{trx.status}</TableCell>
                  <TableCell>{trx._id}</TableCell>
                  <TableCell>
                    {new Date(trx.createdAt)
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
                  <TableCell className="uppercase">{trx.type}</TableCell>
                  <TableCell className="font-extrabold">
                    {trx.amount.toLocaleString()}
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
