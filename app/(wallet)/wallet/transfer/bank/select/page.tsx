"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { StatusBar } from "@/components/wallet/StatusBar";
import { TransferHeader } from "@/components/wallet/transfer/TransferHeader";
import { BankSearch, BankList } from "@/components/wallet/transfer/bank";
import { Bank } from "@/lib/types/bank";
import { getBanks } from "@/lib/api/bank";

export default function BankSelectPage() {
  const router = useRouter();

  const [allBanks, setAllBanks] = useState<Bank[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    getBanks({ delayMs: 400 })
      .then((data) => {
        if (isMounted) {
          setAllBanks(data);
          setErrorMessage(null);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          const msg = err instanceof Error ? err.message : "Unable to load banks. Please try again.";
          setErrorMessage(msg);
          setAllBanks([]);
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
    getBanks({ delayMs: 400 })
      .then((data) => {
        setAllBanks(data);
        setIsLoading(false);
      })
      .catch((err) => {
        const msg = err instanceof Error ? err.message : "Unable to load banks. Please try again.";
        setErrorMessage(msg);
        setIsLoading(false);
      });
  };

  // Client-side case-insensitive filter
  const filteredBanks = useMemo(() => {
    if (!searchQuery.trim()) return allBanks;

    const query = searchQuery.toLowerCase().trim();
    return allBanks.filter(
      (b) =>
        b.name.toLowerCase().includes(query) ||
        b.code.toLowerCase().includes(query)
    );
  }, [allBanks, searchQuery]);

  const handleSelectBank = (bank: Bank) => {
    const params = new URLSearchParams({
      bankId: bank.id,
      bank: bank.code,
    });
    router.push(`/wallet/transfer/bank?${params.toString()}`);
  };

  return (
    <main className="w-full max-w-[430px] mx-auto h-dvh flex flex-col justify-between relative bg-[#662AB2] overflow-hidden font-product-sans">
      {/* Background Decorative Rings */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="size-80 -left-[113px] top-[68px] absolute rounded-full border-[38px] border-[#5C26A1]" />
        <div className="size-56 left-[300px] top-[69px] absolute rounded-full border-[32px] border-[#5C26A1]" />
      </div>

      {/* Top Purple Header */}
      <div className="text-white relative z-10 pb-3 shrink-0">
        <StatusBar />
        <TransferHeader
          title="Transfer to Bank"
          backHref="/wallet/transfer/bank"
        />
      </div>

      {/* White Content Sheet (starts around y=121, rounded-t-[40px]) */}
      <div className="flex-1 bg-white rounded-t-[40px] px-5 pt-6 pb-4 shadow-md space-y-4 relative z-10 flex flex-col min-h-0 overflow-hidden">
        {/* Search Box (Fixed at top of sheet) */}
        <div className="shrink-0">
          <BankSearch
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        {/* Bank List with All Banks (Scrollable internally) */}
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          <BankList
            banks={filteredBanks}
            isLoading={isLoading}
            errorMessage={errorMessage}
            onRetry={handleRetry}
            onSelectBank={handleSelectBank}
          />
        </div>
      </div>
    </main>
  );
}
