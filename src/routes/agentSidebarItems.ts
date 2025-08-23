import CashIn from "@/pages/Agent/CashIn";
import CashOut from "@/pages/Agent/CashOut";
import MyCommissionTable from "@/pages/Agent/MyCommissionTable";

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
    title: "Add Money",
    items: [
      {
        title: "Cash In",
        url: "/agent/cash-in",
        component: CashIn,
      },
    ],
  },
  {
    title: "Withdraw Money",
    items: [
      {
        title: "Cash Out",
        url: "/agent/cash-out",
        component: CashOut,
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
    title: "Commission History",
    items: [
      {
        title: "All Commission",
        url: "/agent/all-commission",
        component: MyCommissionTable,
      },
    ],
  },
];
