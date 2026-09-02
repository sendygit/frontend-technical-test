"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Building2 } from "lucide-react";
import { Bank } from "@/lib/types/bank";

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

  return (
    <div className="w-full flex flex-col gap-1.5 font-product-sans">
      <button
        type="button"
        onClick={onClick}
        className={`w-full h-15 px-5 bg-white rounded-xl border flex items-center justify-between text-left transition-all hover:border-[#662AB2] focus:outline-none focus:ring-2 focus:ring-[#662AB2]/30 cursor-pointer ${
          error
            ? "border-red-500"
            : selectedBank
            ? "border-[#662AB2]"
            : "border-[#999999]"
        }`}
        aria-label="Pilih bank tujuan transfer"
      >
        {selectedBank ? (
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="size-10 shrink-0 rounded-full bg-[#FAFAFA] border border-slate-100 flex items-center justify-center overflow-hidden p-1.5 shadow-xs">
              {selectedBank.logo && !logoError ? (
                <Image
                  src={selectedBank.logo}
                  alt={selectedBank.name}
                  width={28}
                  height={28}
                  className="h-full w-full object-contain"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <Building2 className="size-5 text-[#662AB2]" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-base font-bold text-[#121212] truncate">
                {selectedBank.name}
              </p>
              {selectedBank.accountNumber && (
                <p className="text-xs text-neutral-400 font-medium truncate">
                  {selectedBank.accountNumber} &bull; {selectedBank.accountName || "Rekening Tujuan"}
                </p>
              )}
            </div>
          </div>
        ) : (
          <span className="text-base font-normal text-[#999999]">
            Select bank destination
          </span>
        )}

        <ChevronDown className="size-5 text-neutral-400 shrink-0 ml-2" />
      </button>

      {error && (
        <p className="text-xs font-semibold text-red-500 pl-1">{error}</p>
      )}
    </div>
  );
}
