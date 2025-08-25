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
    //get all users by admin
    allAgentInfo: builder.query({
      query: (params) => ({
        url: "/agent/get-all-agent",
        method: "GET",
        params,
      }),
      providesTags: ["USER"],
    }),

    //

    //isAgentApproved  suspend
    agentApproved: builder.mutation({
      query: (userId) => ({
        url: `/user/approval-agent/${userId}`,
        method: "PATCH",
        data: { isAgentApproved: false },
      }),
      invalidatesTags: ["USER"],
    }),

    agentSuspended: builder.mutation({
      query: (userId) => ({
        url: `/user/approval-agent/${userId}`,
        method: "PATCH",
        data: { isAgentApproved: true },
      }),
      invalidatesTags: ["USER"],
    }),

    //
  }),
});

export const {
  useCashInMutation,
  useCashOutMutation,
  useAllAgentInfoQuery,
  useAgentApprovedMutation,
  useAgentSuspendedMutation,
} = agentApi;
