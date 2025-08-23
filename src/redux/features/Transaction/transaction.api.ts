import { baseApi } from "@/redux/baseApi";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //
    // get-my-transaction
    getMyTransaction: builder.query({
      query: (params) => {
        // If no params, return the base URL (get all)
        if (!params) {
          return {
            url: "/transaction/my-transactions",
            method: "GET",
          };
        }

        // If params exist, pass them (page & limit)
        return {
          url: "/transaction/my-transactions",
          method: "GET",
          params,
        };
      },
      providesTags: ["TRANSACTION"],
    }),
    // get my commission
    getMyCommission: builder.query({
      query: () => ({
        url: "/transaction/my-commission",
        method: "GET",
      }),
      providesTags: ["TRANSACTION"],
    }),
  }),
});

export const { useGetMyTransactionQuery, useGetMyCommissionQuery } =
  transactionApi;
