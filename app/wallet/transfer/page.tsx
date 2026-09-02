"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Receipt,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBar } from "@/components/wallet/StatusBar";
import { MOCK_WALLET_DATA, sendTransfer, TransferResponse } from "@/lib/mocks/wallet";
import { WalletFriend } from "@/lib/types/wallet";
import { formatCurrency } from "@/lib/utils/format";

export default function TransferPage() {
  const [selectedRecipient, setSelectedRecipient] = useState<WalletFriend>(
    MOCK_WALLET_DATA.friends[0]
  );
  const [rawAmount, setRawAmount] = useState<string>("150000");
  const [notes, setNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [transferReceipt, setTransferReceipt] = useState<TransferResponse | null>(null);

  const numericAmount = parseInt(rawAmount.replace(/\D/g, ""), 10) || 0;
  const isOverBalance = numericAmount > MOCK_WALLET_DATA.balance;
  const isValidAmount = numericAmount > 0 && !isOverBalance;

  const quickAmounts = [50000, 100000, 250000, 500000, 1000000];

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setRawAmount(value);
    if (errorMessage) setErrorMessage(null);
  };

  const handleQuickAmount = (val: number) => {
    setRawAmount(val.toString());
    if (errorMessage) setErrorMessage(null);
  };

  const handleTransferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidAmount) {
      if (numericAmount <= 0) {
        setErrorMessage("Silakan masukkan nominal transfer yang valid.");
      } else if (isOverBalance) {
        setErrorMessage("Saldo Anda tidak mencukupi untuk nominal transfer ini.");
      }
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await sendTransfer({
        recipientId: selectedRecipient.id,
        recipientName: selectedRecipient.name,
        accountNumber: selectedRecipient.accountNumber || "8801-9922-3344",
        amount: numericAmount,
        notes: notes.trim() || undefined,
      });

      setTransferReceipt(response);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan saat memproses transfer.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setTransferReceipt(null);
    setRawAmount("");
    setNotes("");
    setErrorMessage(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between">
        <Link href="/wallet">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke CashEase Wallet
          </Button>
        </Link>
        <span className="text-sm font-medium text-slate-500">Soal 3 &bull; CashEase Transfer</span>
      </div>

      {/* Main Mobile Frame Container (430px) */}
      <div className="mx-auto w-full max-w-[430px] rounded-[36px] bg-[#662AB2] shadow-2xl shadow-purple-950/20 border border-purple-900/30 overflow-hidden flex flex-col min-h-[932px] font-product-sans relative">
        {/* Background Decorative Rings */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
          <div className="size-80 -left-[113px] top-[68px] absolute rounded-full border-[38px] border-[#5C26A1]" />
          <div className="size-56 left-[300px] top-[69px] absolute rounded-full border-[32px] border-[#5C26A1]" />
        </div>

        {/* Top Purple Banner Area with Status Bar & Header */}
        <div className="text-white pb-4 relative z-10">
          <StatusBar />

          <div className="flex items-center justify-between px-6 pt-2 pb-2">
            <Link
              href="/wallet"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-md text-white hover:bg-white/25 transition-colors focus:outline-none"
              aria-label="Kembali"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>

            <h1 className="text-lg font-bold tracking-tight text-white">Transfer</h1>

            <div className="w-10" />
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 flex flex-col justify-between p-6 bg-[#FFFFFF] rounded-t-[32px] shadow-md space-y-6 relative z-10">
          <form onSubmit={handleTransferSubmit} className="space-y-6 flex-1 flex flex-col justify-between">
            <div className="space-y-6">
              {/* 1. Recipient Selection Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Penerima Transfer
                  </label>
                  <span className="text-xs font-semibold text-[#059D8B]">Kontak Tersimpan</span>
                </div>

                {/* Horizontal Recipients Scroll */}
                <div className="flex items-center gap-3 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none]">
                  {MOCK_WALLET_DATA.friends.map((friend) => {
                    const isSelected = selectedRecipient.id === friend.id;
                    return (
                      <button
                        key={friend.id}
                        type="button"
                        onClick={() => setSelectedRecipient(friend)}
                        className={`flex flex-col items-center gap-1.5 shrink-0 rounded-2xl p-2 transition-all focus:outline-none ${
                          isSelected
                            ? "bg-[#F9F5FE] ring-2 ring-[#662AB2] scale-105"
                            : "hover:bg-slate-50 opacity-80 hover:opacity-100"
                        }`}
                      >
                        <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-purple-100">
                          {friend.avatar ? (
                            <Image
                              src={friend.avatar}
                              alt={friend.name}
                              width={48}
                              height={48}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-[#662AB2] text-white font-bold text-xs">
                              {friend.name.charAt(0)}
                            </div>
                          )}
                          {isSelected && (
                            <div className="absolute -bottom-0.5 -right-0.5 rounded-full bg-[#662AB2] p-0.5 text-white">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                            </div>
                          )}
                        </div>
                        <span className={`text-xs font-semibold max-w-[56px] truncate ${
                          isSelected ? "text-[#662AB2]" : "text-[#121212]"
                        }`}>
                          {friend.name}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Recipient Card */}
                <div className="flex items-center justify-between rounded-2xl bg-[#F9F5FE] p-3.5 border border-purple-100/80">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#662AB2] text-white font-bold text-sm shadow-sm">
                      {selectedRecipient.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#121212]">{selectedRecipient.name}</h4>
                      <p className="text-xs text-slate-500 font-mono">
                        CashEase &bull; {selectedRecipient.accountNumber || "8801-1122-3344"}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                    Terverifikasi
                  </span>
                </div>
              </div>

              {/* 2. Amount Input Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="amount" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Nominal Transfer
                  </label>
                  <span className="text-xs text-slate-500">
                    Saldo: <strong className="text-[#121212] font-mono">{formatCurrency(MOCK_WALLET_DATA.balance)}</strong>
                  </span>
                </div>

                {/* Amount Big Input Box */}
                <div className={`relative flex items-center rounded-2xl border px-4 py-3.5 transition-all bg-[#FFFFFF] ${
                  isOverBalance
                    ? "border-red-400 ring-2 ring-red-100"
                    : "border-slate-200 focus-within:border-[#662AB2] focus-within:ring-2 focus-within:ring-purple-100"
                }`}>
                  <span className="text-xl font-extrabold text-[#662AB2] mr-2">Rp</span>
                  <input
                    id="amount"
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    value={numericAmount > 0 ? numericAmount.toLocaleString("id-ID") : ""}
                    onChange={handleAmountChange}
                    className="w-full font-mono text-2xl font-extrabold text-[#121212] placeholder:text-slate-300 focus:outline-none bg-transparent"
                    autoComplete="off"
                  />
                </div>

                {/* Over-balance Warning */}
                {isOverBalance && (
                  <div className="flex items-center gap-1.5 text-xs font-medium text-red-600">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>Nominal melebihi saldo aktif Anda ({formatCurrency(MOCK_WALLET_DATA.balance)})</span>
                  </div>
                )}

                {/* Quick Amount Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {quickAmounts.map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleQuickAmount(val)}
                      className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                        numericAmount === val
                          ? "bg-[#662AB2] text-white shadow-sm"
                          : "bg-slate-50 text-slate-700 hover:bg-purple-50 hover:text-[#662AB2] border border-slate-200"
                      }`}
                    >
                      {formatCurrency(val)}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Notes Field */}
              <div className="space-y-1.5">
                <label htmlFor="notes" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Catatan (Opsional)
                </label>
                <input
                  id="notes"
                  type="text"
                  placeholder="Contoh: Makan siang, bayar sewa..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  maxLength={50}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-[#121212] placeholder:text-slate-400 focus:border-[#662AB2] focus:outline-none focus:ring-2 focus:ring-purple-100"
                />
              </div>

              {/* Error Banner */}
              {errorMessage && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={!isValidAmount || isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#662AB2] py-4 text-sm font-extrabold text-white shadow-lg shadow-purple-950/15 transition-all hover:bg-[#57229a] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-[#662AB2] focus:ring-offset-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Memproses Transfer...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>Kirim Transfer Sekarang</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Receipt Modal */}
      {transferReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-[#03B961] shadow-inner">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-[#121212]">Transfer Berhasil!</h3>
              <p className="text-xs text-slate-500">Dana telah sukses dikirim ke rekening tujuan</p>
            </div>

            <div className="rounded-2xl bg-[#F9F5FE] p-4 text-center border border-purple-100">
              <span className="text-xs font-semibold text-slate-500">Nominal Transfer</span>
              <div className="font-mono text-2xl font-black text-[#662AB2] mt-0.5">
                {formatCurrency(transferReceipt.amount)}
              </div>
            </div>

            {/* Receipt Table */}
            <div className="divide-y divide-slate-100 text-xs text-left">
              <div className="flex justify-between py-2">
                <span className="text-slate-400">Penerima</span>
                <span className="font-bold text-[#121212]">{transferReceipt.recipientName}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400">Nomor Rekening</span>
                <span className="font-mono font-medium text-[#121212]">{transferReceipt.accountNumber}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400">ID Transaksi</span>
                <span className="font-mono text-slate-600">{transferReceipt.transactionId}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400">Waktu</span>
                <span className="text-slate-600">{transferReceipt.timestamp}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400">Biaya Admin</span>
                <span className="font-bold text-emerald-600">Gratis (Rp 0)</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 space-y-2">
              <Link href="/wallet" className="block w-full">
                <Button variant="primary" size="md" className="w-full bg-[#662AB2] hover:bg-[#57229a]">
                  <Receipt className="h-4 w-4 mr-1.5" />
                  Kembali ke Dashboard Wallet
                </Button>
              </Link>
              <Button variant="outline" size="md" className="w-full" onClick={handleResetForm}>
                <RotateCcw className="h-4 w-4 mr-1.5" />
                Kirim Transfer Lain
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
