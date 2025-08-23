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
    }),
  }),
});

export const { useCashInMutation } = agentApi;
