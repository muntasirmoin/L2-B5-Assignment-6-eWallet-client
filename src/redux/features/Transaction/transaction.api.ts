import { baseApi } from "@/redux/baseApi";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //
    // get-my-transaction
    getMyTransaction: builder.query({
      query: () => ({
        url: "/transaction/my-transactions",
        method: "GET",
      }),
      providesTags: ["TRANSACTION"],
    }),
  }),
});

export const { useGetMyTransactionQuery } = transactionApi;
