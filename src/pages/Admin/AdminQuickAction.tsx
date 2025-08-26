import { Button } from "@/components/ui/button";
import { ArrowDown, Ban, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function AdminQuickAction() {
  return (
    <>
      <div className="px-4 md:px-0 border border-green-300 dark:border-green-700 rounded-2xl bg-gradient-to-r from-green-50 to-lime-100 dark:from-green-900 dark:to-lime-900 transition-all duration-300 ">
        <h1 className="font-bold mb-0.5 text-rose-500   px-2 py-1 inline-block"></h1>

        <div className="w-full flex flex-col md:flex-row items-center justify-around gap-4 pb-4 mb-2 py-1">
          {/* Block/unblock */}
          <Link to="/admin/block-unblock">
            <Button
              variant="outline"
              className="w-full sm:w-[150px] md:w-[200px] border border-red-500 bg-gradient-to-r from-red-100 to-red-200 text-red-700 dark:from-red-900 dark:to-red-800 dark:text-red-200 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer"
            >
              <Ban className="mr-2 h-5 w-5" />
              User Block/Unblock
            </Button>
          </Link>

          {/* Approve/Suspend */}
          <Link to="/admin/approve-suspend">
            <Button className="w-full sm:w-[150px] md:w-[200px] bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold border border-green-600 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer">
              <CheckCircle className="mr-2 h-5 w-6" />
              Agent Approve/Suspend
            </Button>
          </Link>

          {/* admin/transaction*/}
          <Link to="/admin/transaction">
            <Button
              variant="outline"
              className="w-full sm:w-[150px] md:w-[200px] border border-yellow-500 bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700 dark:from-yellow-900 dark:to-yellow-800 dark:text-yellow-200 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer"
            >
              <ArrowDown className="mr-2 h-5 w-5" />
              All Transaction
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
