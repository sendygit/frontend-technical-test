export interface WalletUser {
  id: string;
  name: string;
  points: number;
  accountNumber?: string;
  avatarUrl?: string;
}

export interface WalletFriend {
  id: string;
  name: string;
  avatar?: string;
  accountNumber?: string;
}

export type TransactionDirection = "in" | "out";

export interface WalletTransaction {
  id: string;
  title: string;
  type: string;
  date: string;
  amount: number;
  isPositive: boolean;
  category?: string;
}

export interface WalletData {
  user: WalletUser;
  balance: number;
  friends: WalletFriend[];
  transactions: WalletTransaction[];
}

// Types for transfer in future task if needed
export interface TransferFormData {
  recipientId: string;
  amount: number;
  notes?: string;
}

export interface TransferResult {
  success: boolean;
  message: string;
  transaction?: WalletTransaction;
}
