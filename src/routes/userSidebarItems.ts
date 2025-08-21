import Admin from "@/pages/Admin/Admin";
import type { ISidebarItem } from "@/types";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Admin",
        url: "/admin/admin",
        component: Admin,
      },
    ],
  },
];
