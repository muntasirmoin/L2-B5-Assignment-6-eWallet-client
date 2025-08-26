import { useAllTransactionsInfoQuery } from "@/redux/features/Transaction/transaction.api";
import ErrorLoading from "@/utils/ErrorLoading";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type ITotalsByType = {
  [type: string]: number;
};

const COLORS = [
  "#9798e8",
  "#72f1c6",
  "#f09648e1",
  "#fcbf49",
  "#ff6b6b",
  "#06d6a0",
];

type ITransaction = {
  type: string;
  amount: number;
};

export default function AdminChartPie() {
  const { data, isLoading, isError, refetch } = useAllTransactionsInfoQuery({
    limit: 1000,
    // limit: "all",
  });

  const prepareChartData = (): { name: string; value: number }[] => {
    const totals: ITotalsByType = {};

    if (!data?.data) return [];
    console.log(data);

    data.data.forEach((tx: ITransaction) => {
      const { type, amount } = tx;
      if (!totals[type]) {
        totals[type] = 0;
      }
      totals[type] += amount;
    });

    return Object.entries(totals).map(([type, value]) => ({
      name: type.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      value,
    }));
  };

  const chartData = prepareChartData();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-64 md:h-96">
        <div className="animate-pulse rounded-full bg-gray-300 dark:bg-gray-700 w-48 h-48 md:w-72 md:h-72" />
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorLoading
        message="Failed to load!"
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 border border-green-300 dark:border-green-700 rounded-2xl bg-gradient-to-r from-green-50 to-lime-100 dark:from-green-900 dark:to-lime-900 transition-all duration-300 w-full mx-auto">
      <h2 className="text-center text-xl md:text-2xl font-semibold mb-6 md:mb-8">
        Transaction Totals
      </h2>
      <div className="w-full h-64 md:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="80%"
              label
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
