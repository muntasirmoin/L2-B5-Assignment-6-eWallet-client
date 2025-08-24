import UserAddMoney from "@/pages/User/UserAddMoney";
import UserOverview from "@/pages/User/UserOverview";
import UserSendMoney from "@/pages/User/UserSendMoney";
import UserTransactionTable from "@/pages/User/UserTransactionTable";
import UserTransactionTypeFiltering from "@/pages/User/UserTransactionTypeFiltering";
import UserWithdrawMoney from "@/pages/User/UserWithdrawMoney";
import ViaUserCashInSimulation from "@/pages/User/ViaUserCashInSimulation";
import type { ISidebarItem } from "@/types";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Overview",
    items: [
      {
        title: "Transaction Summary",
        url: "/user/user-overview",
        component: UserOverview,
      },
    ],
  },

  {
    title: "Deposit Money",
    items: [
      {
        title: "Via Agent Cash-In",
        url: "/user/user-cash-in",
        component: ViaUserCashInSimulation,
      },
      {
        title: "Add Money",
        url: "/user/user-add-money",
        component: UserAddMoney,
      },
    ],
  },

  {
    title: "Withdraw Money",
    items: [
      {
        title: "Withdraw Money",
        url: "/user/user-withdraw-money",
        component: UserWithdrawMoney,
      },
    ],
  },
  {
    title: "Send Money",
    items: [
      {
        title: "Send Money",
        url: "/user/user-send-money",
        component: UserSendMoney,
      },
    ],
  },
  {
    title: "Transaction History",
    items: [
      {
        title: "All Transactions",
        url: "/user/user-all-transaction",
        component: UserTransactionTable,
      },
      {
        title: "Type Filtering Transactions",
        url: "/user/user-type-filtering-transaction",
        component: UserTransactionTypeFiltering,
      },
    ],
  },
];
