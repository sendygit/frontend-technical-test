export type TransactionType = "transfer" | "receive" | "topup";
export type TransactionStatus = "success" | "pending" | "failed";

export interface WalletUser {
  id: string;
  name: string;
  email: string;
  accountNumber: string;
  avatarUrl?: string;
}

export interface WalletBalance {
  amount: number;
  currency: string;
  lastUpdated: string;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  title: string;
  description?: string;
  amount: number;
  fee: number;
  recipient?: {
    name: string;
    accountNumber: string;
    avatarUrl?: string;
  };
  sender?: {
    name: string;
    accountNumber: string;
  };
  status: TransactionStatus;
  createdAt: string;
}

export interface TransferRecipient {
  id: string;
  name: string;
  accountNumber: string;
  bankOrWallet: string;
  avatarUrl?: string;
}

export interface TransferFormData {
  recipientId: string;
  amount: number;
  notes?: string;
}

export interface TransferResult {
  success: boolean;
  transaction?: Transaction;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
