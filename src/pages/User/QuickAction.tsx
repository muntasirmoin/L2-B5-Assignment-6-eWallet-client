import { Button } from "@/components/ui/button";
import { useMyWalletQuery } from "@/redux/features/Wallet/wallet.api";
import ErrorLoading from "@/utils/ErrorLoading";
import { ArrowDown, ArrowUpRight, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

export function QuickAction() {
  const { data: userWallet, isError, isLoading, refetch } = useMyWalletQuery();

  if (isLoading)
    return (
      <div className="flex flex-col gap-1 leading-none ml-1.5 animate-pulse">
        <span className="h-4 w-16 bg-gray-300 rounded-md mb-1"></span>
        <span className="h-6 w-24 bg-gray-300 rounded-md"></span>
      </div>
    );
  if (isError)
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
      <div className="px-4 md:px-0 border border-green-300 dark:border-green-700 rounded-2xl bg-gradient-to-r from-green-50 to-lime-100 dark:from-green-900 dark:to-lime-900 transition-all duration-300 ">
        <h2 className="mt-2 text-2xl font-semibold mb-6 text-center text-green-800 dark:text-green-300 tracking-tight">
          Wallet Balance :{" "}
          <span className="font-bold mb-0.5 text-rose-500 bg-white rounded-md border px-2 py-1 inline-block">
            {userWallet?.myWallet?.balance} Taka
          </span>
        </h2>

        <div className="w-full flex flex-col md:flex-row items-center justify-around gap-4 pb-4 mb-2">
          {/* Send Money */}
          <Link to="/user/user-send-money">
            <Button
              variant="outline"
              className="w-full sm:w-[150px] md:w-[200px] border border-red-500 bg-gradient-to-r from-red-100 to-red-200 text-red-700 dark:from-red-900 dark:to-red-800 dark:text-red-200 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer"
            >
              <ArrowUpRight className="mr-2 h-5 w-5" />
              Send Money
            </Button>
          </Link>

          {/* Add Money */}
          <Link to="/user/user-add-money">
            <Button className="w-full sm:w-[150px] md:w-[200px] bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold border border-green-600 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer">
              <Wallet className="mr-2 h-5 w-5" />
              Add Money
            </Button>
          </Link>

          {/* Withdraw Money */}
          <Link to="/user/user-withdraw-money">
            <Button
              variant="outline"
              className="w-full sm:w-[150px] md:w-[200px] border border-yellow-500 bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700 dark:from-yellow-900 dark:to-yellow-800 dark:text-yellow-200 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer"
            >
              <ArrowDown className="mr-2 h-5 w-5" />
              Withdraw Money
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
