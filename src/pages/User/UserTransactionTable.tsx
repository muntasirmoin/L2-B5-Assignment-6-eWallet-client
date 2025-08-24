import { Skeleton } from "@/components/ui/skeleton";
import { useGetMyTransactionQuery } from "@/redux/features/Transaction/transaction.api";
import type { ITransaction } from "@/types/transaction";
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

const UserTransactionTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [limit, setLimit] = useState(8);

  // Paginated data
  const {
    data: paginatedData,
    isLoading: isPaginatedLoading,
    isError: isPaginatedError,
  } = useGetMyTransactionQuery({
    page: currentPage,
    limit,
    searchTerm: search,
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

  if (isPaginatedError) return <div>Failed to load data.</div>;

  return (
    <>
      <div className="overflow-x-auto">
        <div className="bg-green-100 dark:bg-green-900 p-4 sm:p-6 rounded shadow text-center">
          <h2 className="text-lg sm:text-2xl font-bold text-green-700 dark:text-green-300">
            All Transactions
          </h2>
        </div>

        {/* search */}
        <div className="mt-4 sm:mt-6 mb-4 flex justify-center px-4">
          <input
            type="text"
            placeholder="Search by status, type, or by exact amount/TRX No"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded p-2 w-full max-w-md"
          />
        </div>
        {/* search end */}

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
    </>
  );
};

export default UserTransactionTable;
