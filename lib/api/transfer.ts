import { TransferTransaction, TransferReceipt, TransferRecipientData } from "../types/transfer";
import { Bank } from "../types/bank";
import { MOCK_LATEST_TRANSFERS } from "../mocks/transfer";

interface GetLatestTransfersOptions {
  shouldFail?: boolean;
  empty?: boolean;
  delayMs?: number;
}

export async function getLatestTransfers(
  options: GetLatestTransfersOptions = {}
): Promise<TransferTransaction[]> {
  const { shouldFail = false, empty = false, delayMs = 600 } = options;

  await new Promise((resolve) => setTimeout(resolve, delayMs));

  if (shouldFail) {
    throw new Error("Gagal mengambil riwayat transfer terakhir. Silakan coba lagi.");
  }

  if (empty) {
    return [];
  }

  return [...MOCK_LATEST_TRANSFERS];
}

export interface SubmitTransferParams {
  amount: number;
  recipient: TransferRecipientData;
  notes?: string;
}

export async function submitTransferToFriend(
  params: SubmitTransferParams,
  delayMs: number = 500
): Promise<TransferReceipt> {
  await new Promise((resolve) => setTimeout(resolve, delayMs));

  const now = new Date();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const dateStr = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const timeStr = `${hours}:${minutes}`;

  // Generate reference number e.g. QOIU-0012-ADFE-2234
  const randomBlock = () => Math.random().toString(36).substring(2, 6).toUpperCase();
  const refNumber = `QOIU-${randomBlock()}-${randomBlock()}-${randomBlock()}`;

  return {
    id: `tx_${Date.now()}`,
    type: "friend",
    amount: params.amount,
    recipient: params.recipient,
    notes: params.notes,
    date: dateStr,
    time: timeStr,
    referenceNumber: refNumber,
    fee: 0,
    total: params.amount,
    status: "success",
  };
}

export interface SubmitBankTransferParams {
  bank: Bank;
  accountNumber: string;
  amount: number;
  notes?: string;
  fee?: number;
}

export async function submitBankTransfer(
  params: SubmitBankTransferParams,
  delayMs: number = 500
): Promise<TransferReceipt> {
  await new Promise((resolve) => setTimeout(resolve, delayMs));

  const now = new Date();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const dateStr = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const timeStr = `${hours}:${minutes}`;

  const fee = params.fee !== undefined ? params.fee : 2500;
  const randomBlock = () => Math.random().toString(36).substring(2, 6).toUpperCase();
  const refNumber = `ALKS-${randomBlock()}-${randomBlock()}-${randomBlock()}`;

  return {
    id: `tx_${Date.now()}`,
    type: "bank",
    amount: params.amount,
    recipient: {
      id: params.bank.id,
      name: params.bank.accountName || "KAROLINA MCMILLAN",
      phoneNumber: params.accountNumber,
      avatar: params.bank.logo,
    },
    notes: params.notes,
    date: dateStr,
    time: timeStr,
    referenceNumber: refNumber,
    fee: fee,
    total: params.amount + fee,
    status: "success",
  };
}
