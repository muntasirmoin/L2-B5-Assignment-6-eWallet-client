// import { useState } from "react";
// import { BellIcon } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// const initialNotifications = [
//   {
//     id: 1,
//     user: "Chowdhury",
//     action: "added money to",
//     target: "your wallet",
//     timestamp: "15 minutes ago",
//     unread: true,
//   },
//   {
//     id: 2,
//     user: "Syed",
//     action: "sent money to",
//     target: "....",
//     timestamp: "45 minutes ago",
//     unread: true,
//   },
//   {
//     id: 3,
//     user: "Khan",
//     action: "withdrew money from",
//     target: "your account",
//     timestamp: "4 hours ago",
//     unread: false,
//   },
//   {
//     id: 4,
//     user: "Fatema",
//     action: "completed cash in for",
//     target: "your wallet",
//     timestamp: "12 hours ago",
//     unread: false,
//   },
//   {
//     id: 5,
//     user: "Muntasir",
//     action: "processed cash out request for",
//     target: "your account",
//     timestamp: "2 days ago",
//     unread: false,
//   },
//   {
//     id: 6,
//     user: "Chowdhury",
//     action: "requested withdrawal from",
//     target: "your wallet",
//     timestamp: "2 weeks ago",
//     unread: false,
//   },
// ];

// function Dot({ className }: { className?: string }) {
//   return (
//     <svg
//       width="6"
//       height="6"
//       fill="currentColor"
//       viewBox="0 0 6 6"
//       xmlns="http://www.w3.org/2000/svg"
//       className={className}
//       aria-hidden="true"
//     >
//       <circle cx="3" cy="3" r="3" />
//     </svg>
//   );
// }

// export default function NotificationMenu() {
//   const [notifications, setNotifications] = useState(initialNotifications);
//   const unreadCount = notifications.filter((n) => n.unread).length;

//   const handleMarkAllAsRead = () => {
//     setNotifications(
//       notifications.map((notification) => ({
//         ...notification,
//         unread: false,
//       }))
//     );
//   };

//   const handleNotificationClick = (id: number) => {
//     setNotifications(
//       notifications.map((notification) =>
//         notification.id === id
//           ? { ...notification, unread: false }
//           : notification
//       )
//     );
//   };

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button
//           size="icon"
//           variant="ghost"
//           className="text-muted-foreground relative size-8 rounded-full shadow-none"
//           aria-label="Open notifications"
//         >
//           <BellIcon size={16} aria-hidden="true" />
//           {unreadCount > 0 && (
//             <div
//               aria-hidden="true"
//               className="bg-primary absolute top-0.5 right-0.5 size-1 rounded-full"
//             />
//           )}
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-80 p-1">
//         <div className="flex items-baseline justify-between gap-4 px-3 py-2">
//           <div className="text-sm font-semibold">Notifications</div>
//           {unreadCount > 0 && (
//             <button
//               className="text-xs font-medium hover:underline"
//               onClick={handleMarkAllAsRead}
//             >
//               Mark all as read
//             </button>
//           )}
//         </div>
//         <div
//           role="separator"
//           aria-orientation="horizontal"
//           className="bg-border -mx-1 my-1 h-px"
//         ></div>
//         {notifications.map((notification) => (
//           <div
//             key={notification.id}
//             className="hover:bg-accent rounded-md px-3 py-2 text-sm transition-colors"
//           >
//             <div className="relative flex items-start pe-3">
//               <div className="flex-1 space-y-1">
//                 <button
//                   className="text-foreground/80 text-left after:absolute after:inset-0"
//                   onClick={() => handleNotificationClick(notification.id)}
//                 >
//                   <span className="text-foreground font-medium hover:underline">
//                     {notification.user}
//                   </span>{" "}
//                   {notification.action}{" "}
//                   <span className="text-foreground font-medium hover:underline">
//                     {notification.target}
//                   </span>
//                   .
//                 </button>
//                 <div className="text-muted-foreground text-xs">
//                   {notification.timestamp}
//                 </div>
//               </div>
//               {notification.unread && (
//                 <div className="absolute end-0 self-center">
//                   <span className="sr-only">Unread</span>
//                   <Dot />
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </PopoverContent>
//     </Popover>
//   );
// }

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

function Dot({ className }: { className?: string }) {
  return (
    <svg
      width="6"
      height="6"
      fill="currentColor"
      viewBox="0 0 6 6"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="3" cy="3" r="3" />
    </svg>
  );
}

export default function NotificationMenu() {
  // Fetch notifications from backend
  const { data, refetch } = useGetMyNotificationsQuery(undefined);

  // Ensure notifications is ALWAYS an array
  const notifications = Array.isArray(data?.data) ? data.data : [];

  const [markNotificationSeen] = useMarkNotificationSeenMutation();
  const [markAllNotificationsSeen] = useMarkAllNotificationsSeenMutation();

  const useUserName = (userId?: string) => {
    const { data } = useUserByIdQuery(userId!, { skip: !userId });

    // Ensure we respect the actual response shape
    const userData = (data as GetUserByIdResponse | undefined)?.data;
    return userData?.name || "Unknown User";
  };

  // user phone
  const useUserPhone = (userId?: string) => {
    const { data } = useUserByIdQuery(userId!, { skip: !userId });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const unreadCount = notifications.filter((n: any) => !n.seen).length;

  const handleMarkAllAsRead = async () => {
    await markAllNotificationsSeen(undefined).unwrap();
    refetch(); // Refresh notifications
  };

  const handleNotificationClick = async (id: string) => {
    await markNotificationSeen(id);
    refetch(); // Refresh notifications
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="text-muted-foreground relative size-8 rounded-full shadow-none"
          aria-label="Open notifications"
        >
          <BellIcon size={16} aria-hidden="true" />
          {unreadCount > 0 && (
            <div
              aria-hidden="true"
              className="bg-primary absolute top-0.5 right-0.5 size-1 rounded-full"
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-1">
        <div className="flex items-baseline justify-between gap-4 px-3 py-2">
          <div className="text-sm font-semibold">Notifications</div>
          {unreadCount > 0 && (
            <button
              className="text-xs font-medium hover:underline"
              onClick={handleMarkAllAsRead}
            >
              Mark all as read
            </button>
          )}
        </div>
        <div
          role="separator"
          aria-orientation="horizontal"
          className="bg-border -mx-1 my-1 h-px"
        ></div>

        {notifications.map((notification: INotification) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const userName = useUserName(notification.user); // fetch name from userId

          return (
            <div
              key={notification._id}
              className="hover:bg-accent rounded-md px-3 py-2 text-sm transition-colors"
            >
              <div className="relative flex items-start pe-3">
                <div className="flex-1 space-y-1">
                  <button
                    className="text-foreground/80 text-left after:absolute after:inset-0"
                    onClick={() => handleNotificationClick(notification._id!)}
                  >
                    <span className="text-foreground font-medium hover:underline">
                      {userName}
                    </span>{" "}
                    {notification.message}
                  </button>
                  <div className="text-muted-foreground text-xs">
                    {new Date(notification.createdAt!).toLocaleString()}
                  </div>
                </div>
                {!notification.seen && (
                  <div className="absolute end-0 self-center">
                    <span className="sr-only">Unread</span>
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
