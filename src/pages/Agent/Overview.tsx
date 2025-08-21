import { useGetMyTransactionQuery } from "@/redux/features/Transaction/transaction.api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type Invoice = {
  _id: string;
  amount: number;
  commission: number;
  fee: number;
  type: "cash-in" | "cash-out";
  status: string;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    _id: string;
    name: string;
    role: string;
  };
};

const Overview = () => {
  const { data, isLoading, isError } = useGetMyTransactionQuery(undefined);
  const invoices: Invoice[] = data?.data ?? [];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load transactions.</div>;

  const totalCashIn = invoices
    .filter((t) => t.type === "cash-in")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalCashOut = invoices
    .filter((t) => t.type === "cash-out")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      {/* Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
        <div className="bg-green-100 dark:bg-green-900 p-6 rounded shadow">
          <h3 className="text-sm text-gray-600 dark:text-gray-300">
            Total Cash In
          </h3>
          <p className="text-2xl font-bold text-green-700 dark:text-green-300">
            ৳{totalCashIn.toLocaleString()}
          </p>
        </div>
        <div className="bg-red-100 dark:bg-red-900 p-6 rounded shadow">
          <h3 className="text-sm text-gray-600 dark:text-gray-300">
            Total Cash Out
          </h3>
          <p className="text-2xl font-bold text-red-700 dark:text-red-300">
            ৳{totalCashOut.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <Table>
          <TableCaption>Recent Cash-In and Cash-Out Transactions</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice._id}>
                <TableCell>{invoice.createdBy?.name ?? "Unknown"}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell>{invoice.type}</TableCell>
                <TableCell className="text-right">
                  ৳{invoice.amount.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Overview;
