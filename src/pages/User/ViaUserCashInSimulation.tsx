import UserCompleteTransactionTable from "./UserCompleteTransactiontable";
import UserPendingTransactionTable from "./UserPendingTransactionTable";

import { UserCashInModal } from "@/components/modules/User/UserCashInModal";

const ViaUserCashInSimulation = () => {
  return (
    <>
      <div className="min-h-[400px] sm:min-h-[500px] md:min-h-[500px] bg-gradient-to-r from-emerald-100 to-lime-200 px-4 py-5">
        {/* ✅ Centered Modal Card */}
        <div className="flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-6 sm:p-8 md:p-10 w-full max-w-md transition-all duration-300 hover:shadow-green-300 text-center">
            <h1 className="text-xl sm:text-xl font-bold text-green-700 dark:text-green-300 mb-4">
              Quickly Cash-In Money to Your wallet.
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-4">
              {/* description text */}
            </p>
            <div className="w-full flex justify-center">
              <UserCashInModal />
            </div>
          </div>
        </div>

        {/* ✅ Responsive Transaction Table Below */}
        <div className="mt-10 px-2 sm:px-4 md:px-8 overflow-x-auto">
          <div className="min-w-[320px] w-full max-w-7xl mx-auto">
            <UserPendingTransactionTable />
            <UserCompleteTransactionTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViaUserCashInSimulation;
