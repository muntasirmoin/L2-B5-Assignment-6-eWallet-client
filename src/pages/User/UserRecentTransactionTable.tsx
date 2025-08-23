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

const UserRecentTransactionTable = () => {
  // Fetch only the 5 most recent transactions
  const { data, isLoading, isError } = useGetMyTransactionQuery({
    limit: 5,
    sort: "-createdAt",
  });

  const invoices: ITransaction[] = data?.data ?? [];

  console.log("user invoice", invoices);

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
    return <div className="text-center py-4">Failed to load data.</div>;

  return (
    <div className="overflow-x-auto">
      <div className="bg-green-100 dark:bg-green-900 p-4 sm:p-6 rounded shadow text-center">
        <h2 className="text-lg sm:text-2xl font-bold text-green-700 dark:text-green-300">
          Recent Transactions
        </h2>
      </div>

      {invoices.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground py-6">
          No recent transactions found.
        </p>
      ) : (
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
            {invoices.map((invoice) => (
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
                    : `You`}
                </TableCell>
                <TableCell className="text-center font-semibold">
                  {invoice.type === "send-money"
                    ? invoice.receiver?.phone
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
      )}
    </div>
  );
};

export default UserRecentTransactionTable;
