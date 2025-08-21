import Overview from "@/pages/Agent/Overview";
import type { ISidebarItem } from "@/types";

export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard Agent",
    items: [
      {
        title: "Agent",
        url: "/agent/overview",
        component: Overview,
      },
    ],
  },
];
