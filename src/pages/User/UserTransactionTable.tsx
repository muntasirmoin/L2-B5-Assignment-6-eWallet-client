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
import ErrorLoading from "@/utils/ErrorLoading";
import { useUserInfoQuery } from "@/redux/features/User/user.api";

const UserTransactionTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const [limit] = useState(8);
  const { data: currentUser } = useUserInfoQuery(undefined);
  // Paginated data
  const {
    data: paginatedData,
    isLoading: isPaginatedLoading,
    isError: isPaginatedError,
    refetch,
  } = useGetMyTransactionQuery({
    page: currentPage,
    limit,
    searchTerm: search,
  });

  console.log("paginatedData", paginatedData);

  const invoices: ITransaction[] = paginatedData?.data ?? [];

  const totalPages = paginatedData?.meta?.totalPage ?? 1;

  //  loading
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

  // error
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
              <TableHeader>
                <TableRow className="text-center bg-gray-100 dark:bg-gray-800 font-semibold text-gray-700 dark:text-gray-300">
                  <TableHead className="py-3 px-2 text-center font-bold">
                    Do By Name
                  </TableHead>
                  <TableHead className="py-3 px-2 text-center font-bold">
                    A/C Number / Source
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
                  .filter(
                    (invoice) =>
                      !(
                        invoice?.status === "pending" &&
                        invoice?.receiver?._id === currentUser?.data?._id &&
                        invoice?.createdBy?._id !== currentUser?.data?._id
                      )
                  )
                  .map((invoice) => (
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
                          ? invoice?.createdBy?._id ===
                              currentUser?.data?._id &&
                            invoice?.sender?._id === currentUser?.data?._id
                            ? "You"
                            : invoice?.receiver?._id === currentUser?.data?._id
                            ? `${invoice.sender?.name}`
                            : "---"
                          : [
                              "add-money",
                              "withdraw-money",
                              "cash-in",
                              "cash-out",
                            ].includes(invoice.type) &&
                            invoice?.createdBy?._id === currentUser?.data?._id
                          ? "You"
                          : invoice.createdBy?.name}
                      </TableCell>
                      <TableCell className="text-center font-semibold">
                        {/* {invoice.type === "send-money"
                        ? invoice?.createdBy?._id === currentUser?.data?._id &&
                          invoice?.sender?._id === currentUser?.data?._id
                          ? invoice.receiver?.phone
                          : invoice?.receiver?._id === currentUser?.data?._id
                          ? invoice.sender?.phone
                          : invoice.receiver?.phone
                        : ["add-money", "withdraw-money"].includes(invoice.type)
                        ? invoice.source
                        : "---"} */}

                        {invoice.type === "send-money"
                          ? invoice?.createdBy?._id ===
                              currentUser?.data?._id &&
                            invoice?.sender?._id === currentUser?.data?._id
                            ? invoice.receiver?.phone
                            : invoice?.receiver?._id === currentUser?.data?._id
                            ? invoice.sender?.phone
                            : invoice.receiver?.phone
                          : ["add-money", "withdraw-money"].includes(
                              invoice.type
                            )
                          ? invoice.source
                          : invoice.type === "cash-in"
                          ? invoice?.createdBy?._id === currentUser?.data?._id
                            ? invoice.source
                            : invoice?.createdBy?.phone
                          : invoice.type === "cash-out"
                          ? invoice?.createdBy?.phone
                          : "---"}

                        {/*  */}
                      </TableCell>
                      <TableCell className="text-center font-semibold uppercase">
                        {invoice.status}
                      </TableCell>
                      <TableCell className="text-center font-semibold">
                        {invoice._id}
                      </TableCell>
                      <TableCell className="text-center font-semibold">
                        {new Date(invoice.updatedAt).toLocaleString("en-GB", {
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
                        {invoice.type === "send-money" &&
                        invoice?.createdBy?._id !== currentUser?.data?._id
                          ? "send-Money[Received]"
                          : invoice.type}
                      </TableCell>
                      <TableCell className="text-center font-extrabold">
                        {invoice.type === "cash-out"
                          ? (
                              invoice?.amount + (invoice?.commission ?? 0)
                            ).toLocaleString()
                          : invoice.amount.toLocaleString()}
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
