import { useAllUserInfoQuery } from "@/redux/features/User/user.api";
import { AdminQuickAction } from "./AdminQuickAction";
import { useAllAgentInfoQuery } from "@/redux/features/Agent/agent.api";
import { useAllTransactionsInfoQuery } from "@/redux/features/Transaction/transaction.api";
import AdminChartArea from "./AdminChartArea";
import AdminChartPie from "./AdminChartPie";

const AdminOverView = () => {
  const { data: userData } = useAllUserInfoQuery(undefined);
  const totalUser = userData?.meta?.total | 0;

  const { data: agentData } = useAllAgentInfoQuery(undefined);
  const totalAgent = agentData?.meta?.total | 0;

  const { data: transactionData } = useAllTransactionsInfoQuery(undefined);
  const totalTransaction = transactionData?.meta?.total | 0;

  return (
    <>
      <AdminQuickAction />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center">
        {/* Total user */}
        <div className="bg-green-100 dark:bg-green-900 p-6 rounded shadow">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            Total User
          </h3>
          <p className="text-2xl font-bold text-red-700 dark:text-red-300">
            {totalUser.toLocaleString()}
          </p>
        </div>

        {/* Total Transaction */}
        <div className="bg-green-100 dark:bg-green-900 p-6 rounded shadow">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            Total Transaction
          </h3>
          <p className="text-2xl font-bold text-red-700 dark:text-red-300">
            {totalTransaction.toLocaleString()}
          </p>
        </div>
        {/* Total agents */}
        <div className="bg-yellow-100 dark:bg-yellow-900 p-6 rounded shadow">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            Total Agent
          </h3>
          <p className="text-2xl font-bold text-green-700 dark:text-green-300">
            {totalAgent.toLocaleString()}
          </p>
        </div>
        {/*  */}
      </div>
      <AdminChartArea />
      <AdminChartPie />
    </>
  );
};

export default AdminOverView;
