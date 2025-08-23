import UserOverview from "@/pages/User/UserOverview";
import type { ISidebarItem } from "@/types";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/user/user-overview",
        component: UserOverview,
      },
    ],
  },
];
