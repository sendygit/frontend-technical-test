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

export interface TransferRecipientData {
  id?: string;
  name: string;
  phoneNumber: string;
  avatar?: string;
}

export interface TransferReceipt {
  id: string;
  type: "friend" | "bank";
  amount: number;
  recipient: TransferRecipientData;
  notes?: string;
  date: string;
  time: string;
  referenceNumber: string;
  fee: number;
  total: number;
  status: "success";
}
