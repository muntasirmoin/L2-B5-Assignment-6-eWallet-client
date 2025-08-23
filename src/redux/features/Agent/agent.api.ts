import { baseApi } from "@/redux/baseApi";

export const agentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // cash in
    cashIn: builder.mutation({
      query: (cashInInfo) => ({
        url: "/agent/cash-in",
        method: "POST",
        data: cashInInfo,
      }),
      invalidatesTags: ["TRANSACTION"],
    }),

    //   cash out
    cashOut: builder.mutation({
      query: (cashInInfo) => ({
        url: "/agent/cash-out",
        method: "POST",
        data: cashInInfo,
      }),
      invalidatesTags: ["TRANSACTION"],
    }),
  }),
});

export const { useCashInMutation, useCashOutMutation } = agentApi;
