import { AddMoneyModal } from "@/components/modules/Agent/CashInModal";

const CashIn = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-[400px] sm:min-h-[500px] md:h-[600px] bg-gradient-to-r from-emerald-100 to-lime-200 px-4 py-10">
        <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-6 sm:p-8 md:p-10 max-w-md w-full transition-all duration-300 hover:shadow-green-300 text-center">
          <h1 className="text-xl sm:text-xl font-bold text-green-700 dark:text-green-300 mb-4">
            Quickly add Money to a user's wallet.
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-4"></p>
          <div className="w-full flex justify-center">
            <AddMoneyModal />
          </div>
        </div>
      </div>
    </>
  );
};

export default CashIn;
