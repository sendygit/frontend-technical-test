"use client";

import { useState, useEffect } from "react";
import { StatusBar } from "@/components/wallet/StatusBar";
import {
  TransferHeader,
  TransferTypeSelector,
  LatestTransferList,
} from "@/components/wallet/transfer";
import { TransferTransaction } from "@/lib/types/transfer";
import { getLatestTransfers } from "@/lib/api/transfer";

export default function TransferPage() {
  const [transfers, setTransfers] = useState<TransferTransaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    getLatestTransfers({
      delayMs: 400,
    })
      .then((data) => {
        if (isMounted) {
          setTransfers(data);
          setErrorMessage(null);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          const msg = err instanceof Error ? err.message : "Terjadi kesalahan saat memuat data transfer.";
          setErrorMessage(msg);
          setTransfers([]);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRetry = () => {
    setIsLoading(true);
    setErrorMessage(null);
    getLatestTransfers({ delayMs: 400 })
      .then((data) => {
        setTransfers(data);
        setIsLoading(false);
      })
      .catch((err) => {
        const msg = err instanceof Error ? err.message : "Terjadi kesalahan saat memuat data transfer.";
        setErrorMessage(msg);
        setIsLoading(false);
      });
  };

  return (
    <main className="w-full max-w-107 mx-auto min-h-dvh flex flex-col justify-between relative bg-[#662AB2] overflow-x-hidden font-product-sans">
      {/* Background Decorative Rings */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="size-80 -left-28.25 top-17 absolute rounded-full border-38 border-[#5C26A1]" />
        <div className="size-56 left-75 top-17 absolute rounded-full border-32 border-[#5C26A1]" />
      </div>

      {/* Top Purple Banner Area with Status Bar & Header */}
      <div className="text-white relative z-10">
        <StatusBar />
        <TransferHeader title="Transfer" backHref="/wallet" />
      </div>

      {/* White Content Container (starts around y=128, rounded-t-[40px]) */}
      <div className="flex-1 bg-white rounded-t-[40px] px-5 pt-6 pb-8 shadow-md space-y-6 relative z-10 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Transfer Destination Type Selection Cards (Friends & Bank) */}
          <TransferTypeSelector />

          {/* Latest Transfers Section */}
          <LatestTransferList
            transfers={transfers}
            isLoading={isLoading}
            errorMessage={errorMessage}
            onRetry={handleRetry}
          />
        </div>
      </div>
    </main>
  );
}
