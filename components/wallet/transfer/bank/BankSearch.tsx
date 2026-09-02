"use client";

import { Search, X } from "lucide-react";

interface BankSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function BankSearch({ value, onChange }: BankSearchProps) {
  return (
    <div className="w-full relative font-product-sans">
      <div className="w-full h-14 sm:h-15 px-4 sm:px-5 bg-white rounded-xl border border-[#999999] flex items-center gap-3 focus-within:border-[#662AB2] focus-within:ring-2 focus-within:ring-[#662AB2]/20 transition-all">
        <Search className="size-5 text-[#999999] shrink-0" aria-hidden="true" />
        <input
          id="bank-search-input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search Bank"
          className="w-full h-full bg-transparent text-base text-[#121212] placeholder:text-[#999999] placeholder:text-sm sm:placeholder:text-base focus:outline-none"
          aria-label="Cari nama bank"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 focus:outline-none"
            aria-label="Hapus kata kunci pencarian"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}
