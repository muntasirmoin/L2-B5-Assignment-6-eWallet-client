import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

import { toast } from "sonner";
import type { IUser } from "@/types/user";
import PaginationComponent from "@/components/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAllAgentInfoQuery,
  useAgentApprovedMutation,
  useAgentSuspendedMutation,
} from "@/redux/features/Agent/agent.api";
import ErrorLoading from "@/utils/ErrorLoading";

const isApproveType = {
  ALL: "",
  Approve: "true",
  Suspend: "false",
} as const;

export type isApproveTypeKey = keyof typeof isApproveType;
export type isApproveTypeValue = (typeof isApproveType)[isApproveTypeKey];

export function ManageAgentTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  console.log("search", search);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [limit, setLimit] = useState(8);
  const [typeFilter, setTypeFilter] = useState<isApproveTypeValue>(
    isApproveType.ALL
  );
  const isApprovedFilter =
    typeFilter === "true" ? true : typeFilter === "false" ? false : undefined;

  console.log(isApprovedFilter);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const queryParams: Record<string, any> = {
    page: currentPage,
    limit,
    searchTerm: search || undefined,
  };

  // `isBlocked` if it's  true or false
  if (typeFilter === "true") {
    queryParams.isAgentApproved = true;
  } else if (typeFilter === "false") {
    queryParams.isAgentApproved = false;
  }

  const { data, isLoading, error, refetch } = useAllAgentInfoQuery(queryParams);
  const [approveAgent] = useAgentSuspendedMutation();
  const [suspendAgent] = useAgentApprovedMutation();

  const handleToggleApprove = async (userId: string, isApprove: boolean) => {
    setLoadingUserId(userId);
    try {
      if (isApprove) {
        await approveAgent(userId).unwrap();
        toast.success("Approved Agent");
      } else {
        await suspendAgent(userId).unwrap();
        toast.success("Suspended Agent");
      }
      await refetch();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoadingUserId(null);
    }
  };

  // loading

  if (isLoading)
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

  // error
  if (error)
    return (
      <ErrorLoading
        message="Failed to load!"
        onRetry={() => {
          void refetch();
        }}
      />
    );

  const users: IUser[] = data?.data || [];
  const totalPages = data?.meta?.totalPage || 1;

  return (
    <>
      <div className="overflow-x-auto">
        <div className="bg-green-100 dark:bg-green-900 p-4 sm:p-6 rounded shadow text-center">
          <h2 className="text-lg sm:text-2xl font-bold text-green-700 dark:text-green-300">
            All Agents
          </h2>
        </div>

        {/* serach & filter  */}
        <div className="mt-4 sm:mt-6 mb-4 flex flex-col sm:flex-row justify-between items-center gap-4 px-4">
          <input
            type="text"
            placeholder="Search by Name, Phone, Email"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded p-2 w-full sm:w-1/4"
          />

          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value as isApproveTypeValue);
              setCurrentPage(1);
            }}
            className="border rounded p-2 w-full sm:w-auto bg-white text-black dark:bg-gray-800 dark:text-white"
          >
            <option value={isApproveType.ALL}>All Status</option>
            <option value={isApproveType.Approve}>Approve</option>
            <option value={isApproveType.Suspend}>Suspend</option>
          </select>
        </div>

        {users.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-6">
            {search
              ? `No transactions found for "${search}".`
              : "No recent transactions found."}
          </p>
        ) : (
          <>
            <Table className="min-w-[720px]">
              <TableHeader>
                <TableRow className="text-center bg-gray-100 dark:bg-gray-800 font-semibold text-gray-700 dark:text-gray-300">
                  <TableHead className="py-3 px-2 text-center font-bold">
                    Name
                  </TableHead>
                  <TableHead className="py-3 px-2 text-center font-bold">
                    Phone
                  </TableHead>
                  <TableHead className="py-3 px-2 text-center font-bold">
                    Email
                  </TableHead>
                  <TableHead className="py-3 px-2 text-center font-bold">
                    Role
                  </TableHead>
                  <TableHead className="py-3 px-2 text-center font-bold">
                    Status
                  </TableHead>
                  <TableHead className="py-3 px-2 text-center font-bold">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user._id}
                    className={`text-center ${
                      user.isAgentApproved
                        ? "bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-300"
                        : "bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-300"
                    }`}
                  >
                    <TableCell className="text-center font-bold">
                      {user.name}
                    </TableCell>
                    <TableCell className="text-center font-bold">
                      {user.phone}
                    </TableCell>
                    <TableCell className="text-center font-bold">
                      {user.email || "—"}
                    </TableCell>
                    <TableCell className="uppercase">{user.role}</TableCell>
                    <TableCell className="text-center font-bold">
                      {user.isAgentApproved === true ? "Approved" : "Suspended"}
                    </TableCell>
                    <TableCell className="text-center font-bold">
                      <button
                        disabled={loadingUserId === user._id?.toString()}
                        onClick={() =>
                          user._id &&
                          handleToggleApprove(
                            user._id.toString(),
                            !user.isAgentApproved
                          )
                        }
                        className={`px-3 py-1 rounded text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed ${
                          user.isAgentApproved
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-green-500 text-white hover:bg-green-600"
                        }`}
                      >
                        {loadingUserId === user._id?.toString()
                          ? "Processing..."
                          : user.isAgentApproved
                          ? "Suspend"
                          : "Approve"}
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="mt-6">
              <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page: number) => setCurrentPage(page)}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
