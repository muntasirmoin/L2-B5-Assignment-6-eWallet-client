import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // login
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    //logout

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER"],
    }),

    //change pin

    changePin: builder.mutation({
      query: (data) => ({
        url: "/auth/change-pin",
        method: "POST",
        data,
      }),
    }),

    //
  }),
});

export const { useLoginMutation, useLogoutMutation, useChangePinMutation } =
  authApi;
