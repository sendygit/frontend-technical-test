import { WalletUser, WalletBalance, Transaction, TransferRecipient } from "@/lib/types";

export const MOCK_WALLET_USER: WalletUser = {
  id: "usr_001",
  name: "Alex Pratama",
  email: "alex.pratama@example.com",
  accountNumber: "8801-9234-5678",
};

export const MOCK_WALLET_BALANCE: WalletBalance = {
  amount: 2450000,
  currency: "IDR",
  lastUpdated: new Date().toISOString(),
};

export const MOCK_RECIPIENTS: TransferRecipient[] = [
  {
    id: "rec_001",
    name: "Siti Rahmawati",
    accountNumber: "8801-1122-3344",
    bankOrWallet: "CashEase Wallet",
  },
  {
    id: "rec_002",
    name: "Budi Santoso",
    accountNumber: "0142-9988-7766",
    bankOrWallet: "Bank BCA",
  },
  {
    id: "rec_003",
    name: "Dewi Lestari",
    accountNumber: "0088-5544-3322",
    bankOrWallet: "Bank Mandiri",
  },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "tx_001",
    type: "transfer",
    title: "Transfer ke Siti Rahmawati",
    description: "Bayar makan siang",
    amount: 75000,
    fee: 0,
    recipient: {
      name: "Siti Rahmawati",
      accountNumber: "8801-1122-3344",
    },
    status: "success",
    createdAt: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
  },
  {
    id: "tx_002",
    type: "receive",
    title: "Terima Saldo dari Budi Santoso",
    description: "Reimburse transport",
    amount: 150000,
    fee: 0,
    sender: {
      name: "Budi Santoso",
      accountNumber: "0142-9988-7766",
    },
    status: "success",
    createdAt: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
  },
  {
    id: "tx_003",
    type: "topup",
    title: "Top Up via Virtual Account BCA",
    amount: 500000,
    fee: 0,
    status: "success",
    createdAt: new Date(Date.now() - 3600 * 1000 * 48).toISOString(),
  },
];
