/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { BellIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  useGetMyNotificationsQuery,
  useMarkAllNotificationsSeenMutation,
  useMarkNotificationSeenMutation,
} from "@/redux/features/Notification/notification.api";

import { useUserByIdQuery } from "@/redux/features/User/user.api";
import type { IUser } from "@/types/user";
export interface INotification {
  _id?: string;
  user: string; // receiver of the notification
  title: string;
  message: string;
  type: string;
  seen: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
interface GetUserByIdResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: IUser;
}

// Fake dot
function Dot() {
  return (
    <svg
      width="6"
      height="6"
      fill="currentColor"
      viewBox="0 0 6 6"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="3" cy="3" r="3" />
    </svg>
  );
}

// Custom hook OUTSIDE component
function useUserInfo(userId?: string) {
  const { data, isLoading } = useUserByIdQuery(userId!, { skip: !userId });

  return {
    name:
      (data as GetUserByIdResponse | undefined)?.data?.name || "Unknown User",
    phone:
      (data as GetUserByIdResponse | undefined)?.data?.phone || "Unknown Phone",
    loading: isLoading,
  };
}

export default function NotificationMenu() {
  const { data, refetch } = useGetMyNotificationsQuery(undefined);

  const notifications = Array.isArray(data?.data) ? data.data : [];

  const [markNotificationSeen] = useMarkNotificationSeenMutation();
  const [markAllNotificationsSeen] = useMarkAllNotificationsSeenMutation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const unreadCount = notifications.filter((n: any) => !n.seen).length;

  const handleMarkAllAsRead = async () => {
    await markAllNotificationsSeen(undefined).unwrap();
    refetch();
  };

  const handleNotificationClick = async (id: string) => {
    await markNotificationSeen(id);
    refetch();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="relative size-8 rounded-full"
        >
          <BellIcon size={16} />
          {unreadCount > 0 && (
            <div className="bg-primary absolute top-0.5 right-0.5 size-1 rounded-full" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-1">
        <div className="flex justify-between px-3 py-2">
          <div className="text-sm font-semibold">Notifications</div>

          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="text-xs font-medium hover:underline"
            >
              Mark all as read
            </button>
          )}
        </div>

        <div className="bg-border -mx-1 my-1 h-px" />

        {notifications.map((notification: INotification) => {
          // Fetch user info OUTSIDE map via custom hook
          const { name, phone } = useUserInfo(notification.user);

          return (
            <div
              key={notification._id}
              className="hover:bg-accent rounded-md px-3 py-2 text-sm"
            >
              <div className="relative flex items-start pe-3">
                <div className="flex-1 space-y-1">
                  <button
                    onClick={() => handleNotificationClick(notification._id!)}
                    className="text-left"
                  >
                    <span className="font-medium hover:underline">
                      {name} ({phone})
                    </span>{" "}
                    {notification.message}
                  </button>

                  <div className="text-xs text-muted-foreground">
                    {new Date(notification.createdAt!).toLocaleString()}
                  </div>
                </div>

                {!notification.seen && (
                  <div className="absolute right-0 self-center">
                    <Dot />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
