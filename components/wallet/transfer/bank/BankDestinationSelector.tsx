"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Building2 } from "lucide-react";
import { Bank } from "@/lib/types/bank";
import { formatMaskedAccountNumber } from "./BankAccountNumber";

interface BankDestinationSelectorProps {
  selectedBank: Bank | null;
  onClick: () => void;
  error?: string | null;
}

export function BankDestinationSelector({
  selectedBank,
  onClick,
  error,
}: BankDestinationSelectorProps) {
  const [logoError, setLogoError] = useState(false);

  // If bank is selected (Filled State matching Figma Node 1:2269)
  if (selectedBank) {
    const rawAcc = selectedBank.accountNumber || "12345678980901";
    const maskedAcc = formatMaskedAccountNumber(rawAcc);
    const recipientName = selectedBank.accountName || "KAROLINA MCMILLAN";

    return (
      <div className="w-full space-y-1 font-product-sans">
        <div className="w-full flex items-center justify-between py-1">
          {/* Left: 60x60 Bank Logo & Account Info */}
          <div className="flex items-center gap-3.5 min-w-0 flex-1 mr-3">
            <div className="size-15 shrink-0 rounded-full bg-[#FAFAFA] border border-slate-100 flex items-center justify-center overflow-hidden p-2 shadow-xs">
              {selectedBank.logo && !logoError ? (
                <Image
                  src={selectedBank.logo}
                  alt={selectedBank.name}
                  width={42}
                  height={42}
                  className="h-full w-full object-contain"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <Building2 className="size-6 text-[#662AB2]" />
              )}
            </div>

            <div className="min-w-0 flex-1 space-y-0.5">
              <h3 className="text-lg font-medium text-[#121212] tracking-tight truncate">
                {recipientName}
              </h3>
              <p className="text-base text-[#999999] font-normal truncate tracking-wider">
                {maskedAcc}
              </p>
            </div>
          </div>

          {/* Right: Edit Button with official icon-edit.svg (24px) */}
          <button
            type="button"
            onClick={onClick}
            className="flex size-10 items-center justify-center rounded-full hover:bg-[#F9F5FE] text-[#662AB2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#662AB2] cursor-pointer shrink-0"
            aria-label="Edit destination account"
          >
            <Image
              src="/wallet/icons/icon-edit.svg"
              alt="Edit"
              width={24}
              height={24}
              className="size-6 object-contain"
            />
          </button>
        </div>
        {error && <p className="text-xs font-semibold text-red-500 pl-1">{error}</p>}
      </div>
    );
  }

  // Default / Empty State (Matching Figma Node 1:1479)
  return (
    <div className="w-full flex flex-col gap-1.5 font-product-sans">
      <button
        type="button"
        onClick={onClick}
        className={`w-full h-15 px-5 bg-white rounded-xl border flex items-center justify-between text-left transition-all hover:border-[#662AB2] focus:outline-none focus:ring-2 focus:ring-[#662AB2]/30 cursor-pointer ${
          error ? "border-red-500" : "border-[#999999]"
        }`}
        aria-label="Pilih bank tujuan transfer"
      >
        <span className="text-base font-normal text-[#999999]">
          Select bank destination
        </span>

        <ChevronDown className="size-5 text-neutral-400 shrink-0 ml-2" />
      </button>

      {error && (
        <p className="text-xs font-semibold text-red-500 pl-1">{error}</p>
      )}
    </div>
  );
}
