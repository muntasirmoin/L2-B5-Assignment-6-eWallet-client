import CashIn from "@/pages/Agent/CashIn";

import MyTransactionTable from "@/pages/Agent/MyTransactionTable";
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
  {
    title: "Transaction History",
    items: [
      {
        title: "All Transaction",
        url: "/agent/all-transaction",
        component: MyTransactionTable,
      },
    ],
  },
  {
    title: "Add Money",
    items: [
      {
        title: "Cash In",
        url: "/agent/cash-in",
        component: CashIn,
      },
    ],
  },
];
