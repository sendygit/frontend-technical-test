import { WalletData } from "@/lib/types/wallet";

export const MOCK_WALLET_DATA: WalletData = {
  user: {
    id: "usr_001",
    name: "Alex Pratama",
    points: 1972,
    accountNumber: "8801-9234-5678",
  },
  balance: 24321900,
  friends: [
    {
      id: "fr_001",
      name: "Alexandria",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      accountNumber: "8801-1122-3344",
    },
    {
      id: "fr_002",
      name: "Immanuel",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
      accountNumber: "0142-9988-7766",
    },
    {
      id: "fr_003",
      name: "Kayshania",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      accountNumber: "0088-5544-3322",
    },
    {
      id: "fr_004",
      name: "Ibrahim",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      accountNumber: "0022-7711-4433",
    },
  ],
  transactions: [
    {
      id: "tx_001",
      title: "Transfer",
      type: "Yesterday · 19:12",
      category: "transfer",
      date: "Yesterday · 19:12",
      amount: 600000,
      isPositive: false,
    },
    {
      id: "tx_002",
      title: "Top Up",
      type: "May 29, 2023 · 19:12",
      category: "topup",
      date: "May 29, 2023 · 19:12",
      amount: 260000,
      isPositive: true,
    },
    {
      id: "tx_003",
      title: "Internet",
      type: "May 16, 2023 · 17:34",
      category: "internet",
      date: "May 16, 2023 · 17:34",
      amount: 350000,
      isPositive: false,
    },
  ],
};

export interface FetchWalletOptions {
  shouldFail?: boolean;
  emptyFriends?: boolean;
  emptyTransactions?: boolean;
  delayMs?: number;
}

/**
 * Simulasi fetch REST API dengan simulated delay untuk mengambil data dompet CashEase.
 */
export async function getWalletData(options: FetchWalletOptions = {}): Promise<WalletData> {
  const delay = options.delayMs ?? 1200;

  await new Promise((resolve) => setTimeout(resolve, delay));

  if (options.shouldFail) {
    throw new Error("Gagal memuat data dompet. Silakan periksa koneksi internet Anda dan coba lagi.");
  }

  return {
    ...MOCK_WALLET_DATA,
    friends: options.emptyFriends ? [] : MOCK_WALLET_DATA.friends,
    transactions: options.emptyTransactions ? [] : MOCK_WALLET_DATA.transactions,
  };
}

export interface TransferPayload {
  recipientId: string;
  recipientName: string;
  accountNumber: string;
  amount: number;
  notes?: string;
}

export interface TransferResponse {
  success: boolean;
  message: string;
  transactionId: string;
  timestamp: string;
  recipientName: string;
  accountNumber: string;
  amount: number;
  fee: number;
}

/**
 * Simulasi eksekusi transfer REST API.
 */
export async function sendTransfer(payload: TransferPayload): Promise<TransferResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (payload.amount <= 0) {
    throw new Error("Nominal transfer harus lebih besar dari Rp 0.");
  }
  if (payload.amount > MOCK_WALLET_DATA.balance) {
    throw new Error("Saldo Anda tidak mencukupi untuk melakukan transfer ini.");
  }

  return {
    success: true,
    message: "Transfer berhasil dikirim.",
    transactionId: `TRX-${Math.floor(10000000 + Math.random() * 90000000)}`,
    timestamp: new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }) + " • " + new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    recipientName: payload.recipientName,
    accountNumber: payload.accountNumber,
    amount: payload.amount,
    fee: 0,
  };
}
