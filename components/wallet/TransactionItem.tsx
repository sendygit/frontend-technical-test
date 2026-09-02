import React from "react";
import Image from "next/image";
import { WalletTransaction } from "@/lib/types/wallet";
import { formatCurrency } from "@/lib/utils/format";

function getTransactionIconSrc(category?: string, type?: string, title?: string) {
  const key = `${category || ""} ${type || ""} ${title || ""}`.toLowerCase();
  if (key.includes("transfer")) {
    return "/wallet/icons/icon-transfer.svg";
  }
  if (key.includes("topup") || key.includes("top up") || key.includes("salary") || key.includes("wallet")) {
    return "/wallet/icons/icon-wallet.svg";
  }
  if (key.includes("internet") || key.includes("wifi") || key.includes("subscription")) {
    return "/wallet/icons/icon-internet.svg";
  }
  return "/wallet/icons/icon-wallet.svg";
}

interface TransactionItemProps {
  transaction: WalletTransaction;
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const iconSrc = getTransactionIconSrc(transaction.category, transaction.type, transaction.title);

  return (
    <div className="flex items-center justify-between py-2.5 group hover:bg-slate-50 -mx-2 px-2 rounded-xl transition-colors">
      {/* Left: Icon & Info */}
      <div className="flex items-center gap-3">
        {/* Background lingkaran warna #F9F5FE dengan padding 12px */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F9F5FE] p-[12px] shadow-sm">
          <Image
            src={iconSrc}
            alt={transaction.title}
            width={24}
            height={24}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="space-y-0.5">
          <h4 className="text-sm font-bold text-[#121212] tracking-tight">
            {transaction.title}
          </h4>
          <p className="text-xs text-neutral-400 font-medium">
            {transaction.date}
          </p>
        </div>
      </div>

      {/* Right: Amount */}
      <div className="text-right">
        <span
          className={`text-sm font-extrabold tracking-tight ${
            transaction.isPositive
              ? "text-[#03B961]"
              : "text-[#F90B1B]"
          }`}
        >
          {transaction.isPositive ? "+" : "-"}
          {formatCurrency(transaction.amount)}
        </span>
      </div>
    </div>
  );
}
