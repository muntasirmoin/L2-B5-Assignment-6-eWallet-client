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
    //
  }),
});

export const {
  useRegisterMutation,
  useUserInfoQuery,
  useUserByPhoneNumberQuery,
  useLazyUserByPhoneNumberQuery,
  useUpdateProfileMutation,
} = userApi;
