import { ChangeEvent } from "react";
import { formatCurrency } from "@/lib/utils/format";

interface SetAmountProps {
  amount: number;
  onChange: (amount: number) => void;
  maxBalance?: number;
  error?: string | null;
}

export function SetAmount({
  amount,
  onChange,
  maxBalance,
  error,
}: SetAmountProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, "");
    const numVal = rawVal ? parseInt(rawVal, 10) : 0;
    onChange(numVal);
  };

  const isOverBalance = maxBalance !== undefined && amount > maxBalance;

  return (
    <div className="w-full flex flex-col justify-center items-center gap-2 text-center my-6">
      <div className="text-neutral-900 text-xl font-medium">
        Set Amount
      </div>

      <div className="relative w-full flex items-center justify-center">
        <input
          id="transfer-amount"
          type="text"
          inputMode="numeric"
          value={`Rp ${amount === 0 ? "0" : amount.toLocaleString("id-ID")}`}
          onChange={handleInputChange}
          placeholder="Rp 0"
          className="w-full text-center bg-transparent text-neutral-900 text-3xl font-bold focus:outline-none tracking-tight cursor-text select-all"
        />
      </div>

      {amount > 0 && amount < 10000 && (
        <span className="text-xs text-amber-600 font-medium">Min. Rp 10.000</span>
      )}

      {error ? (
        <p className="text-xs font-medium text-red-500">{error}</p>
      ) : isOverBalance ? (
        <p className="text-xs font-medium text-red-500">
          Saldo tidak mencukupi (Maks. {formatCurrency(maxBalance || 0)})
        </p>
      ) : null}
    </div>
  );
}
