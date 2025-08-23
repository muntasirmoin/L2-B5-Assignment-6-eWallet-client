type TransactionType =
  | "cash-in"
  | "cash-out"
  | "reversal"
  | "send-money"
  | "withdraw-money"
  | "add-money";
type TransactionStatus = "completed" | "pending" | "reversed";

interface Invoice {
  type: TransactionType;
  status: TransactionStatus;
  amount: number;
  // other props...
}

export function getTotalByTypeAndStatus(
  invoices: Invoice[],
  type: TransactionType,
  status: TransactionStatus
): number {
  return invoices
    .filter((t) => t.type === type && t.status === status)
    .reduce((sum, t) => sum + t.amount, 0);
}
