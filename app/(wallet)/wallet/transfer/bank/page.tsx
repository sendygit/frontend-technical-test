"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { StatusBar } from "@/components/wallet/StatusBar";
import { TransferHeader } from "@/components/wallet/transfer/TransferHeader";
import {
  BankDestinationSelector,
  BankAmountInput,
  BankNotesInput,
  BankProceedButton,
} from "@/components/wallet/transfer/bank";
import { formatCurrency } from "@/lib/utils/format";
import { MOCK_WALLET_DATA } from "@/lib/mocks/wallet";
import { findBankByIdOrCode } from "@/lib/mocks/bank";
import { Bank } from "@/lib/types/bank";

function TransferBankContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const bankParam = searchParams.get("bank") || searchParams.get("bankId") || "";
  const initialBank = findBankByIdOrCode(bankParam) || null;

  const [selectedBank, setSelectedBank] = useState<Bank | null>(initialBank);
  const [prevBankParam, setPrevBankParam] = useState(bankParam);

  if (bankParam !== prevBankParam) {
    setPrevBankParam(bankParam);
    setSelectedBank(initialBank);
  }

  const [amount, setAmount] = useState<number>(0);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSuccessToast, setIsSuccessToast] = useState(false);

  const balance = MOCK_WALLET_DATA.balance;

  const isBankValid = Boolean(selectedBank);
  const isAmountValid = amount >= 10000 && amount <= balance;
  const isFormValid = isBankValid && isAmountValid;

  const handleOpenBankPicker = () => {
    // Navigasi ke bank destination selector / picker (untuk state lanjutan)
    router.push("/wallet/transfer/bank/select");
  };

  const handleProceed = () => {
    if (!isBankValid) {
      setError("Silakan pilih bank tujuan terlebih dahulu.");
      return;
    }
    if (amount < 10000) {
      setError("Nominal transfer minimum adalah Rp 10.000.");
      return;
    }
    if (amount > balance) {
      setError("Saldo dompet digital Anda tidak mencukupi.");
      return;
    }

    setError(null);
    setIsSuccessToast(true);
    setTimeout(() => setIsSuccessToast(false), 3000);
  };

  return (
    <main className="w-full max-w-[430px] mx-auto min-h-dvh flex flex-col justify-between relative bg-[#662AB2] overflow-x-hidden font-product-sans">
      {/* Background Decorative Rings */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="size-80 -left-[113px] top-[68px] absolute rounded-full border-[38px] border-[#5C26A1]" />
        <div className="size-56 left-[300px] top-[69px] absolute rounded-full border-[32px] border-[#5C26A1]" />
      </div>

      {/* Top Purple Section with StatusBar, Header, and Balance */}
      <div className="text-white relative z-10 pb-4">
        <StatusBar />
        <TransferHeader title="Transfer to Bank" backHref="/wallet/transfer" />

        {/* Balance Section */}
        <div className="px-6 pt-2 pb-3 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs text-purple-200 font-medium">Your Balance</span>
            <p className="text-2xl font-bold tracking-tight text-white">
              {formatCurrency(balance)}
            </p>
          </div>
          <button
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-[#662AB2] font-semibold text-xs shadow-sm hover:bg-purple-50 transition-colors focus:outline-none cursor-pointer"
            aria-label="Top Up Saldo"
          >
            <Image
              src="/wallet/icons/icon-wallet.svg"
              alt=""
              width={18}
              height={18}
              className="size-4.5 object-contain"
              aria-hidden="true"
            />
            <span>Top Up</span>
          </button>
        </div>
      </div>

      {/* White Content Container (starts around y=222, rounded-t-[40px]) */}
      <div className="flex-1 bg-white rounded-t-[40px] px-5 pt-5 pb-7 shadow-md flex flex-col justify-between space-y-6 relative z-10">
        <div className="space-y-5">
          {/* Drag Handle (100px x 6px #E6E6E6) */}
          <div className="w-24 h-1.5 bg-[#E6E6E6] rounded-full mx-auto" />

          {/* Form Fields */}
          <div className="space-y-4">
            {/* 1. Bank Destination Selector */}
            <BankDestinationSelector
              selectedBank={selectedBank}
              onClick={handleOpenBankPicker}
              error={!isBankValid && error ? "Pilih bank tujuan transfer." : null}
            />

            {/* 2. Set Amount */}
            <BankAmountInput
              amount={amount}
              onChange={(val) => {
                setAmount(val);
                if (error) setError(null);
              }}
              maxBalance={balance}
              error={amount > 0 && amount < 10000 ? "Nominal minimum Rp 10.000" : null}
            />

            {/* 3. Notes */}
            <BankNotesInput value={notes} onChange={setNotes} />
          </div>
        </div>

        {/* Bottom Action Area */}
        <div className="space-y-3 pt-2">
          {error && (
            <p className="text-xs font-semibold text-red-500 text-center">{error}</p>
          )}

          {isSuccessToast && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-center text-xs font-semibold text-green-700 animate-in fade-in">
              Data transfer bank valid!
            </div>
          )}

          <BankProceedButton
            disabled={!isFormValid}
            onClick={handleProceed}
          />
        </div>
      </div>
    </main>
  );
}

export default function TransferBankPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 font-medium">Memuat form transfer bank...</div>}>
      <TransferBankContent />
    </Suspense>
  );
}
