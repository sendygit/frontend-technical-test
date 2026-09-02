"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight, Building2 } from "lucide-react";
import { Bank } from "@/lib/types/bank";

interface BankListItemProps {
  bank: Bank;
  onSelect: (bank: Bank) => void;
}

export function BankListItem({ bank, onSelect }: BankListItemProps) {
  const [logoError, setLogoError] = useState(false);

  return (
    <button
      type="button"
      onClick={() => onSelect(bank)}
      className="w-full py-3.5 px-2 -mx-2 flex items-center justify-between group hover:bg-slate-50/80 rounded-2xl transition-all cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[#662AB2]/30 font-product-sans"
      aria-label={`Pilih bank ${bank.name}`}
    >
      {/* Left: 50x50 Circular Logo & Name */}
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="size-12.5 rounded-full bg-[#FAFAFA] border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden shadow-xs group-hover:border-[#662AB2]/30 transition-colors p-2">
          {bank.logo && !logoError ? (
            <Image
              src={bank.logo}
              alt={bank.name}
              width={38}
              height={38}
              className="h-full w-full object-contain"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Building2 className="size-5 text-[#662AB2]" />
              <span className="text-[10px] font-bold text-[#662AB2] leading-none mt-0.5">
                {bank.code}
              </span>
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-medium text-[#121212] group-hover:text-[#662AB2] transition-colors truncate">
            {bank.name}
          </h3>
        </div>
      </div>

      {/* Right: 28x28 Chevron Icon */}
      <ChevronRight
        className="size-7 text-[#999999] group-hover:text-[#662AB2] group-hover:translate-x-0.5 transition-all shrink-0 ml-2"
        aria-hidden="true"
      />
    </button>
  );
}
