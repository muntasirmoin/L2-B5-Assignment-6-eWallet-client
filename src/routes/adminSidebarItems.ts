import { ManageUserTable } from "@/pages/Admin/MangeUserTable";
import UpdatePersonalInfo from "@/pages/Agent/UpdatePersonalInfo";
import ChangePin from "@/pages/ChangePin";
import type { ISidebarItem } from "@/types";

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Profile Management",
    items: [
      {
        title: "Update personal Info",
        url: "/admin/update-profile-info",
        component: UpdatePersonalInfo,
      },
      {
        title: "Change Pin",
        url: "/admin/change-pin",
        component: ChangePin,
      },
    ],
  },

  // manage user
  {
    title: "Mange Users",
    items: [
      {
        title: "Block/Unblock",
        url: "/admin/block-unblock",
        component: ManageUserTable,
      },
    ],
  },
];
