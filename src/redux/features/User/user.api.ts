import { baseApi } from "@/redux/baseApi";
import type { IUser, UpdateProfileResponse } from "@/types/user";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // register
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    // my-profile
    userInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    //get  user by phone number
    userByPhoneNumber: builder.query({
      query: (phone) => ({
        url: `/user/get-user-by-number?phone=${phone}`,
        method: "GET",
      }),
    }),
    //update profile

    updateProfile: builder.mutation<UpdateProfileResponse, Partial<IUser>>({
      query: (payload) => ({
        url: "/user/profile-update",
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: ["USER"], // Optional: triggers cache invalidation
    }),
    //user add-money
    addMoney: builder.mutation({
      query: (addMoneyInfo) => ({
        url: "/wallet/add-money",
        method: "POST",
        data: addMoneyInfo,
      }),
      invalidatesTags: ["TRANSACTION"],
    }),

    //transaction complete
    completeTransaction: builder.mutation({
      query: (transactionId: string) => ({
        url: `/transaction/complete/${transactionId}`,
        method: "POST",
      }),
      invalidatesTags: ["TRANSACTION", "USER"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useUserInfoQuery,
  useUserByPhoneNumberQuery,
  useLazyUserByPhoneNumberQuery,
  useUpdateProfileMutation,
  useAddMoneyMutation,
  useCompleteTransactionMutation,
} = userApi;
