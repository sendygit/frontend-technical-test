import { useState } from "react";
import Image from "next/image";
import { TransferTransaction } from "@/lib/types/transfer";
import { formatCurrency } from "@/lib/utils/format";

interface LatestTransferItemProps {
  transaction: TransferTransaction;
}

export function LatestTransferItem({ transaction }: LatestTransferItemProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex items-center justify-between py-3 group hover:bg-slate-50/80 -mx-2 px-2 rounded-2xl transition-colors cursor-pointer">
      {/* Left: Avatar & Details */}
      <div className="flex items-center gap-3 min-w-0 flex-1 mr-3">
        {/* Avatar (size-15 rounded-full) */}
        <div className="relative flex size-15 shrink-0 items-center justify-center rounded-full overflow-hidden bg-[#F9F5FE]">
          {transaction.type === "friend" && transaction.avatar && !imgError ? (
            <Image
              src={transaction.avatar}
              alt={transaction.name}
              width={60}
              height={60}
              className="h-full w-full object-cover rounded-full"
              onError={() => setImgError(true)}
            />
          ) : transaction.type === "bank" ? (
            <div className="flex h-full w-full items-center justify-center p-3">
              <Image
                src="/wallet/icons/icon-bank.svg"
                alt={transaction.bankName || "Bank"}
                width={36}
                height={36}
                className="h-full w-full object-contain"
              />
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-full bg-[#662AB2] text-white font-bold text-lg">
              {transaction.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Text Info */}
        <div className="min-w-0 flex-1 space-y-0.5">
          <h3 className="text-lg font-medium text-[#121212] tracking-tight truncate">
            {transaction.name}
          </h3>
          <p className="text-sm text-[#999999] font-normal truncate">
            {transaction.date}
          </p>
        </div>
      </div>

      {/* Right: Amount */}
      <div className="shrink-0 text-right">
        <span className="text-lg font-bold text-[#121212] tracking-tight">
          {formatCurrency(transaction.amount)}
        </span>
      </div>
    </div>
  );
}
