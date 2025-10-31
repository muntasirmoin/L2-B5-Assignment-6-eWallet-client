import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import {
  useCompleteTransactionMutation,
  useUserInfoQuery,
} from "@/redux/features/User/user.api";
import { toast } from "sonner";
import ErrorLoading from "@/utils/ErrorLoading";

const UserPendingTransactionTable = () => {
  const { data: currentUser } = useUserInfoQuery(undefined);

  const { data, isLoading, isError, refetch } = useGetMyTransactionQuery({
    limit: "all",
    sort: "-createdAt",
  });

  const [completeTransaction] = useCompleteTransactionMutation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleConfirm = async (transactionId: string) => {
    try {
      const res = await completeTransaction(transactionId).unwrap();
      if (res.success) {
        toast.success("Transaction Completed Successfully!");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to complete transaction");
    }
  };

  const invoices: ITransaction[] = data?.data ?? [];

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

  if (isError)
    return (
      <ErrorLoading
        message="Failed to load!"
        onRetry={() => {
          void refetch();
        }}
      />
    );

  // 🔹 Filter only pending transactions created by this user
  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.status === "pending" &&
      invoice.createdBy?._id === currentUser?.data?._id
  );

  // 🔹 Pagination calculations
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInvoices = filteredInvoices.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <>
      <div className="overflow-x-auto">
        <div className="bg-green-100 dark:bg-green-900 p-4 sm:p-6 rounded shadow text-center">
          <h2 className="text-lg sm:text-2xl font-bold text-green-700 dark:text-green-300">
            Most recent Pending Transactions
          </h2>
        </div>

        {filteredInvoices.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-6">
            No recent transactions found.
          </p>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow className="text-center bg-gray-100 dark:bg-gray-800 font-semibold text-gray-700 dark:text-gray-300">
                  <TableHead>Name</TableHead>
                  <TableHead>A/C Number</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>TRX No</TableHead>
                  <TableHead>TRX Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedInvoices.map((invoice) => (
                  <TableRow
                    key={invoice._id}
                    className={`text-center ${
                      invoice.type === "add-money"
                        ? "bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-300"
                        : "bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-300"
                    }`}
                  >
                    <TableCell className="font-bold">
                      {["bkash", "card", "bank"].includes(invoice.source)
                        ? "You"
                        : invoice?.sender?.phone === currentUser?.data?.phone
                        ? invoice?.receiver?.name
                        : invoice?.sender?.name}
                    </TableCell>

                    <TableCell className="font-semibold">
                      {["bkash", "card", "bank"].includes(invoice.source)
                        ? invoice.source
                        : invoice?.sender?.phone === currentUser?.data?.phone
                        ? invoice?.receiver?.phone
                        : invoice?.sender?.phone}
                    </TableCell>

                    <TableCell className="font-semibold uppercase">
                      {invoice.status}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {invoice._id}
                    </TableCell>
                    <TableCell className="font-semibold">
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
                    <TableCell className="font-semibold uppercase">
                      {invoice.type}
                    </TableCell>
                    <TableCell className="font-extrabold">
                      {invoice.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleConfirm(invoice._id)}
                        disabled={isLoading}
                        className="cursor-pointer font-bold hover:bg-green-600 hover:text-white transition-colors duration-200"
                        size="sm"
                      >
                        <CheckCircle2 size={16} className="mr-1" />
                        Complete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* 🔹 Pagination Controls */}
            <div className="bg-gradient-to-r from-emerald-100 to-lime-200  dark:from-gray-900 dark:to-gray-800 px-4 py-2 transition-colors duration-500">
              <div className="flex justify-center items-center gap-3 mt-1 mb-1">
                {/* Previous Button */}
                <Button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  variant="outline"
                  size="sm"
                  className={`flex items-center justify-center 
        bg-white text-gray-700 hover:bg-emerald-100 
        dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-emerald-900 
        transition-colors duration-300
        disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <ChevronLeft size={16} />
                </Button>

                {/* Page Info */}
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  Page {currentPage} of {totalPages}
                </span>

                {/* Next Button */}
                <Button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  variant="outline"
                  size="sm"
                  className={`flex items-center justify-center 
        bg-white text-gray-700 hover:bg-emerald-100 
        dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-emerald-900 
        transition-colors duration-300
        disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserPendingTransactionTable;
