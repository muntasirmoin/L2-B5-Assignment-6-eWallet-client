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

    // Mark a single notification as seen
    markNotificationSeen: builder.mutation({
      query: (id: string) => ({
        url: `/notification/seen/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["NOTIFICATION"],
    }),

   

export const {
  useGetMyNotificationsQuery,
  useMarkNotificationSeenMutation,

} = notificationApi;
