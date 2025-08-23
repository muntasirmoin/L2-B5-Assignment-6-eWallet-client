import { Skeleton } from "@/components/ui/skeleton";
import { useGetMyCommissionQuery } from "@/redux/features/Transaction/transaction.api";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
interface ICommission {
  _id: string;
  createdAt: string;
  type: "cash-in" | "cash-out";
  commission: number;
  amount: number;
}

const MyCommissionTable = () => {
  const { data, isLoading, error } = useGetMyCommissionQuery(undefined);
  const commissions = data?.data?.myCommissionTransactions;
  const totalCommission = data?.data?.totalCommission;
  console.log("commission", data?.data?.myCommissionTransactions);
  console.log("Total Commission:", data?.data?.totalCommission, error);

  //  loading & error
  if (isLoading) {
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

  if (error) return <div>Failed to load data.</div>;

  return (
    <>
      <div className="overflow-x-auto">
        <div className="bg-green-100 dark:bg-green-900 p-4 sm:p-6 rounded shadow text-center">
          <h2 className="text-lg sm:text-2xl font-bold text-green-700 dark:text-green-300">
            Commissions
          </h2>
        </div>

        {/* totalCommission  */}
        <div className="mt-4 sm:mt-6 mb-4 flex justify-center px-4">
          <span className="font-bold mb-0.5 text-rose-500 bg-white rounded-md border px-2 py-1 inline-block">
            Commission Balance:{" "}
            <span className="text-green-600">{totalCommission}</span> Taka
          </span>
        </div>
        {/* totalCommission end */}

        {commissions.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-6">
            No recent commission found.
          </p>
        ) : (
          <>
            <Table>
              {/* <TableCaption>Recent Cash-In and Cash-Out Transactions</TableCaption> */}
              <TableHeader>
                <TableRow className="text-center bg-gray-100 dark:bg-gray-800 font-semibold text-gray-700 dark:text-gray-300">
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
                    Commission
                  </TableHead>
                  <TableHead className="py-3 px-2 text-center font-bold">
                    Amount
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commissions.map((commission: ICommission) => (
                  <TableRow
                    key={commission._id}
                    className={`text-center ${
                      commission.type === "cash-in"
                        ? "bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-300"
                        : commission.type === "cash-out"
                        ? "bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-300"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <TableCell className="text-center font-semibold">
                      {commission._id}
                    </TableCell>
                    <TableCell className="text-center font-semibold">
                      {new Date(commission.createdAt)
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
                      {commission.type}
                    </TableCell>
                    <TableCell className="text-center font-extrabold">
                      {commission.commission.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center font-extrabold">
                      {commission.amount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
        {/*  */}
      </div>
    </>
  );
};

export default MyCommissionTable;
