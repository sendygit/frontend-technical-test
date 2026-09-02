"use client";

import { useState } from "react";
import Image from "next/image";

interface BankAccountNumberProps {
  accountNumber: string;
}

/**
 * Helper function to mask account numbers according to Figma specs
 * e.g., "12345678980901" -> "••••• •••• 80901"
 */
export function formatMaskedAccountNumber(rawAcc: string): string {
  if (!rawAcc) return "••••• •••• 80901";
  const clean = rawAcc.replace(/[^0-9]/g, "");
  if (clean.length <= 5) {
    return clean;
  }
  const last5 = clean.slice(-5);
  return `••••• •••• ${last5}`;
}

export function formatReadableAccountNumber(rawAcc: string): string {
  if (!rawAcc) return "";
  const clean = rawAcc.replace(/[^0-9]/g, "");
  return clean.match(/.{1,4}/g)?.join(" ") || clean;
}

export function BankAccountNumber({ accountNumber }: BankAccountNumberProps) {
  const [isVisible, setIsVisible] = useState(false);

  const displayValue = isVisible
    ? formatReadableAccountNumber(accountNumber)
    : formatMaskedAccountNumber(accountNumber);

  return (
    <div className="w-full border-b border-[#662AB2] px-1 py-3 flex items-center justify-between font-product-sans">
      <span className="text-lg font-medium text-[#121212] tracking-wider select-all">
        {displayValue}
      </span>

      <button
        type="button"
        onClick={() => setIsVisible(!isVisible)}
        className="p-1 rounded-full hover:bg-slate-100 cursor-pointer"
        aria-label={isVisible ? "Sembunyikan nomor rekening" : "Tampilkan nomor rekening"}
      >
        <Image
          src={isVisible ? "/wallet/icons/icon-visibility.svg" : "/wallet/icons/icon-visibility-off.svg"}
          alt="Icon Visibility"
          width={20}
          height={20}
          className="size-5 object-contain opacity-70 hover:opacity-100 transition-opacity"
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
