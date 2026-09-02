import { ArrowRight } from "lucide-react";
import { WalletTransaction } from "@/lib/types/wallet";
import { TransactionItem } from "./TransactionItem";

interface TransactionListProps {
  transactions: WalletTransaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="space-y-2">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-1">
        <h2 className="text-base font-bold text-[#121212] tracking-tight">
          Lastest Transaction
        </h2>
        <button
          type="button"
          className="flex items-center gap-1 text-xs font-semibold text-[#059D8B] hover:opacity-80 transition-opacity focus:outline-none cursor-pointer"
        >
          <span>See all</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Transaction Items */}
      {transactions.length > 0 ? (
        <div className="divide-y divide-slate-100">
          {transactions.map((tx) => (
            <TransactionItem key={tx.id} transaction={tx} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-xs text-slate-400 italic">
          Belum ada riwayat transaksi terbaru.
        </div>
      )}
    </div>
  );
}
