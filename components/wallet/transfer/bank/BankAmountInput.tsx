"use client";

import { ChangeEvent } from "react";
import { formatCurrency } from "@/lib/utils/format";

interface BankAmountInputProps {
  amount: number;
  onChange: (amount: number) => void;
  maxBalance?: number;
  error?: string | null;
}

export function BankAmountInput({
  amount,
  onChange,
  maxBalance,
  error,
}: BankAmountInputProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, "");
    const numVal = rawVal ? parseInt(rawVal, 10) : 0;
    onChange(numVal);
  };

  const isOverBalance = maxBalance !== undefined && amount > maxBalance;

  return (
    <div className="w-full flex flex-col justify-center items-center gap-2 text-center my-4 font-product-sans">
      <label htmlFor="bank-transfer-amount" className="text-[#121212] text-xl font-medium cursor-pointer">
        Set Amount
      </label>

      <div className="relative w-full flex items-center justify-center">
        <input
          id="bank-transfer-amount"
          type="text"
          inputMode="numeric"
          value={`Rp ${amount === 0 ? "0" : amount.toLocaleString("id-ID")}`}
          onChange={handleInputChange}
          placeholder="Rp 0"
          className="w-full text-center bg-transparent text-[#121212] text-3xl sm:text-4xl font-bold focus:outline-none tracking-tight cursor-text select-all"
        />
      </div>

      {amount > 0 && amount < 10000 && (
        <span className="text-xs text-amber-600 font-medium">Min. Rp 10.000</span>
      )}

      {error ? (
        <p className="text-xs font-semibold text-red-500">{error}</p>
      ) : isOverBalance ? (
        <p className="text-xs font-semibold text-red-500">
          Saldo tidak mencukupi (Maks. {formatCurrency(maxBalance || 0)})
        </p>
      ) : null}
    </div>
  );
}
