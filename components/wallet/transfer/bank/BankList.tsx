"use client";

import { AlertCircle, RefreshCw, SearchX } from "lucide-react";
import { Bank } from "@/lib/types/bank";
import { BankListItem } from "./BankListItem";

interface BankListProps {
  banks: Bank[];
  isLoading: boolean;
  errorMessage: string | null;
  onRetry: () => void;
  onSelectBank: (bank: Bank) => void;
}

export function BankList({
  banks,
  isLoading,
  errorMessage,
  onRetry,
  onSelectBank,
}: BankListProps) {
  return (
    <div className="w-full flex flex-col flex-1 min-h-0 overflow-hidden font-product-sans">
      {/* Section Heading */}
      <h2 className="text-xl font-bold text-[#121212] tracking-tight pb-2 shrink-0">
        All Banks
      </h2>

      {/* State Rendering */}
      {isLoading ? (
        <div className="space-y-4 pt-1 flex-1 overflow-hidden" aria-busy="true" aria-label="Memuat daftar bank">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div key={idx} className="flex items-center justify-between py-2 animate-pulse">
              <div className="flex items-center gap-3.5">
                <div className="size-[50px] rounded-full bg-slate-200" />
                <div className="space-y-2">
                  <div className="h-4 w-44 bg-slate-200 rounded-md" />
                  <div className="h-3 w-20 bg-slate-100 rounded-md" />
                </div>
              </div>
              <div className="size-6 rounded-full bg-slate-100" />
            </div>
          ))}
        </div>
      ) : errorMessage ? (
        <div className="rounded-2xl border border-red-100 bg-red-50/50 p-6 text-center space-y-3 my-auto">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-red-100 text-red-600">
            <AlertCircle className="size-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-800">Unable to load banks</h3>
            <p className="text-xs text-slate-500">{errorMessage}</p>
          </div>
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#662AB2] text-white text-xs font-semibold hover:bg-[#5C26A1] transition-colors cursor-pointer"
          >
            <RefreshCw className="size-3.5" />
            <span>Try Again</span>
          </button>
        </div>
      ) : banks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center space-y-2 my-auto">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <SearchX className="size-6" />
          </div>
          <h3 className="text-base font-bold text-[#121212]">No banks found</h3>
          <p className="text-xs text-neutral-400 max-w-xs mx-auto">
            Try searching with a different bank name or code abbreviation (e.g. BCA, BNI, Mandiri).
          </p>
        </div>
      ) : (
        /* Scrollable List of All Banks */
        <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 divide-y divide-slate-100 overscroll-contain pr-1">
          {banks.map((bank) => (
            <BankListItem
              key={bank.id}
              bank={bank}
              onSelect={onSelectBank}
            />
          ))}
        </div>
      )}
    </div>
  );
}
