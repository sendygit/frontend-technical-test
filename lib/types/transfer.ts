export type TransferType = "friend" | "bank";

export interface TransferTransaction {
  id: string;
  name: string;
  date: string;
  amount: number;
  type: TransferType;
  avatar?: string;
  bankName?: string;
  accountNumber?: string;
}
