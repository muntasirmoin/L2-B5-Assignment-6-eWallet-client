import Overview from "@/pages/Agent/Overview";
import type { ISidebarItem } from "@/types";

export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Overview",
    items: [
      {
        title: "CashIn/CashOut Summary",
        url: "/agent/overview",
        component: Overview,
      },
    ],
  },
];
