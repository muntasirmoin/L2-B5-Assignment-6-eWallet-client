export type ITransaction = {
  _id: string;
  amount: number;
  commission?: number;
  fee?: number;
  type:
    | "cash-in"
    | "cash-out"
    | "reversal"
    | "send-money"
    | "withdraw-money"
    | "add-money";

  status: "completed" | "pending" | "reversed";

  sender?: {
    _id: string;
    name: string;
    role: string;
    phone: string;
  };
  receiver?: {
    _id: string;
    name: string;
    role: string;
    phone: string;
  };
  createdBy: {
    _id: string;
    name: string;
    role: string;
    phone: string;
  };

  createdAt: string;
  updatedAt: string;
  source: string;
};
