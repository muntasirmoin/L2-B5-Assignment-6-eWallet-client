export const WalletStatus = {
  BLOCKED: "blocked",
  UNBLOCKED: "unblocked",
} as const;

export type WalletStatus = (typeof WalletStatus)[keyof typeof WalletStatus];

export interface IWallet {
  user: string;
  balance: number;
  isBlocked: WalletStatus;
  createdAt?: Date;
  updatedAt?: Date;
  currency?: string;
}
