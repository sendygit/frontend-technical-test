import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { formatCurrency } from "@/lib/utils/format";

interface BalanceSectionProps {
  balance: number;
}

export function BalanceSection({ balance }: BalanceSectionProps) {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  return (
    <div className="px-6 pt-8 pb-14 text-white flex flex-col items-center justify-center text-center space-y-1">
      <span className="text-xs font-medium text-purple-200">Your Balance</span>

      <div className="flex items-center justify-center gap-2">
        <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {isVisible ? formatCurrency(balance) : "Rp ••••••••"}
        </span>
        <button
          type="button"
          onClick={() => setIsVisible(!isVisible)}
          className="text-purple-200 hover:text-white transition-colors focus:outline-none rounded p-1 cursor-pointer"
          aria-label={isVisible ? "Sembunyikan saldo" : "Tampilkan saldo"}
        >
          {isVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}
