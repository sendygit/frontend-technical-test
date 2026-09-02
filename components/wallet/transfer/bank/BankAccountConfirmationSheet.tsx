"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Building2 } from "lucide-react";
import { Bank } from "@/lib/types/bank";
import { BankAccountNumber } from "./BankAccountNumber";

interface BankAccountConfirmationSheetProps {
  isOpen: boolean;
  bank: Bank | null;
  onClose: () => void;
  onContinue: (bank: Bank, accountNumber: string) => void;
}

export function BankAccountConfirmationSheet({
  isOpen,
  bank,
  onClose,
  onContinue,
}: BankAccountConfirmationSheetProps) {
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !bank) return null;

  const rawAccountNumber = bank.accountNumber || "12345678980901";

  const handleContinue = () => {
    onContinue(bank, rawAccountNumber);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end justify-center animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmation-sheet-title"
    >
      <div
        className="w-full max-w-107 bg-white rounded-t-4xl pt-5 px-5 pb-7 shadow-2xl flex flex-col justify-between space-y-6 animate-in slide-in-from-bottom duration-200 font-product-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. Drag Indicator (100px x 6px #E6E6E6) */}
        <div className="w-24 h-1.5 bg-[#E6E6E6] rounded-full mx-auto" />

        {/* Sheet Content Body */}
        <div className="space-y-5">
          {/* 2. Destination Bank Section */}
          <div className="space-y-2.5">
            <h3
              id="confirmation-sheet-title"
              className="text-base font-bold text-[#999999]"
            >
              Destination Bank
            </h3>
            <div className="flex items-center gap-3">
              <div className="size-12.5 rounded-full bg-[#FAFAFA] border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden p-2 shadow-xs">
                {bank.logo && !logoError ? (
                  <Image
                    src={bank.logo}
                    alt={bank.name}
                    width={36}
                    height={36}
                    className="h-full w-full object-contain"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <Building2 className="size-5 text-[#662AB2]" />
                )}
              </div>
              <p className="text-lg font-medium text-[#121212] truncate">
                {bank.name}
              </p>
            </div>
          </div>

          {/* 3. Destination Account Number Section */}
          <div className="space-y-2">
            <label
              htmlFor="destination-account-number"
              className="text-base font-bold text-[#999999] block"
            >
              Destination Account Number
            </label>
            <BankAccountNumber accountNumber={rawAccountNumber} />
          </div>
        </div>

        {/* 4. Continue Button */}
        <button
          type="button"
          onClick={handleContinue}
          className="w-full h-14 rounded-full bg-[#662AB2] hover:bg-[#5C26A1] active:scale-[0.99] text-white text-xl font-bold font-product-sans flex items-center justify-center cursor-pointer shadow-lg shadow-purple-950/20 transition-all focus:outline-none focus:ring-2 focus:ring-[#662AB2]/50"
          aria-label="Lanjutkan transfer dengan rekening ini"
        >
          <span>Continue</span>
        </button>
      </div>
    </div>
  );
}
