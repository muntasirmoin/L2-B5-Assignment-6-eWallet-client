import { baseApi } from "@/redux/baseApi";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all notifications for the logged-in user
    getMyNotifications: builder.query({
      query: () => ({
        url: "/notification/my-notifications",
        method: "GET",
      }),
      providesTags: ["NOTIFICATION"],
    }),



export const {
  useGetMyNotificationsQuery,
  
} = notificationApi;
