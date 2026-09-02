"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw, AlertTriangle, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWalletData } from "@/lib/mocks/wallet";
import { WalletData } from "@/lib/types/wallet";
import {
  StatusBar,
  WalletHeader,
  BalanceSection,
  MainMenu,
  SendAgain,
  TransactionList,
  BottomNavigation,
  WalletSkeleton,
  WalletErrorState,
} from "@/components/wallet";

export default function WalletPage() {
  const [data, setData] = useState<WalletData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Simulation mode toggles for assessment verification
  const [simulateMode, setSimulateMode] = useState<"normal" | "error" | "empty">("normal");
  const [refreshKey, setRefreshKey] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;

    getWalletData({
      shouldFail: simulateMode === "error",
      emptyFriends: simulateMode === "empty",
      emptyTransactions: simulateMode === "empty",
      delayMs: 1200,
    })
      .then((result) => {
        if (isMounted) {
          setData(result);
          setErrorMessage(null);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          const msg = err instanceof Error ? err.message : "Terjadi kesalahan saat memuat data.";
          setErrorMessage(msg);
          setData(null);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [simulateMode, refreshKey]);

  const handleRetry = () => {
    setIsLoading(true);
    setErrorMessage(null);
    setRefreshKey((prev) => prev + 1);
  };

  const handleModeChange = (mode: "normal" | "error" | "empty") => {
    setIsLoading(true);
    setErrorMessage(null);
    setSimulateMode(mode);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Bar Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Dashboard
            </Button>
          </Link>
          <span className="text-sm font-medium text-slate-500">Soal 3 &bull; CashEase E-Wallet</span>
        </div>

        {/* Evaluator Simulation Control */}
        <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-1 text-xs shadow-sm">
          <span className="px-2 font-semibold text-slate-400">Mode Uji:</span>
          <button
            type="button"
            onClick={() => handleModeChange("normal")}
            className={`rounded-lg px-2.5 py-1 font-medium transition-colors ${
              simulateMode === "normal"
                ? "bg-[#662AB2] text-white shadow-sm"
                : "text-[#121212] hover:text-[#662AB2]"
            }`}
          >
            Normal
          </button>
          <button
            type="button"
            onClick={() => handleModeChange("error")}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-medium transition-colors ${
              simulateMode === "error"
                ? "bg-red-600 text-white shadow-sm"
                : "text-[#121212] hover:text-red-600"
            }`}
          >
            <AlertTriangle className="h-3 w-3" />
            Simulasi Error
          </button>
          <button
            type="button"
            onClick={() => handleModeChange("empty")}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-medium transition-colors ${
              simulateMode === "empty"
                ? "bg-amber-600 text-white shadow-sm"
                : "text-[#121212] hover:text-amber-600"
            }`}
          >
            <Inbox className="h-3 w-3" />
            Simulasi Empty
          </button>
          <button
            type="button"
            onClick={handleRetry}
            disabled={isLoading}
            className="rounded-lg p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 disabled:opacity-50"
            title="Refresh API Call"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Main Mobile App Frame Container (430px x 932px centered) */}
      <div className="mx-auto w-full max-w-[430px] rounded-[36px] bg-[#662AB2] shadow-2xl shadow-purple-950/20 border border-purple-900/30 overflow-hidden flex flex-col min-h-233 font-product-sans relative">
        {/* Background Decorative Rings (matching Figma image) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
          <div className="size-80 -left-[113px] top-17 absolute rounded-full border-38px border-[#5C26A1]" />
          <div className="size-56 left-75 top-[69px] absolute rounded-full border-32px border-[#5C26A1]" />
        </div>

        {/* Large White Oval Background that overlaps behind Main Menu */}
        <div className="w-[863px] h-215 -left-[217px] top-65 absolute bg-white rounded-full z-0 shadow-lg pointer-events-none" />

        {isLoading ? (
          <div className="relative z-10 flex-1 flex flex-col justify-between">
            <WalletSkeleton />
          </div>
        ) : errorMessage ? (
          <div className="relative z-10 flex flex-col flex-1 justify-between">
            <div>
              <StatusBar />
              <WalletHeader />
            </div>
            <div className="p-6 flex-1 flex items-center justify-center">
              <WalletErrorState message={errorMessage} onRetry={handleRetry} />
            </div>
            <BottomNavigation />
          </div>
        ) : data ? (
          <div className="relative z-10 flex flex-col flex-1 justify-between">
            {/* Scrollable Content Container */}
            <div className="pb-6">
              {/* Top Purple Section */}
              <div>
                <StatusBar />
                <WalletHeader points={data.user.points} />
                <BalanceSection balance={data.balance} />
              </div>

              {/* Main Menu Card (Overlapping the purple background and white oval) */}
              <div className="mt-1 relative z-20">
                <MainMenu />
              </div>

              {/* White Content Section on Oval Background */}
              <div className="px-6 pt-6 space-y-6 relative z-10">
                {/* Send Again */}
                <SendAgain friends={data.friends} />

                {/* Lastest Transaction */}
                <TransactionList transactions={data.transactions} />
              </div>
            </div>

            {/* Sticky Bottom Navigation */}
            <BottomNavigation />
          </div>
        ) : null}
      </div>
    </div>
  );
}
