"use client";

import { useState } from "react";
import { StatusBar } from "@/components/wallet/StatusBar";
import { WalletHeader } from "@/components/wallet/WalletHeader";
import { BalanceSection } from "@/components/wallet/BalanceSection";
import { MainMenu } from "@/components/wallet/MainMenu";
import { SendAgain } from "@/components/wallet/SendAgain";
import { TransactionList } from "@/components/wallet/TransactionList";
import { BottomNavigation } from "@/components/wallet/BottomNavigation";
import { MoreMenuSheet } from "@/components/wallet/MoreMenuSheet";
import { MOCK_WALLET_DATA } from "@/lib/mocks/wallet";

export default function WalletPage() {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState<boolean>(false);

  return (
    <main className="w-full max-w-107 mx-auto h-dvh flex flex-col justify-between relative bg-[#662AB2] overflow-hidden font-product-sans">
      {/* Background Decorative Rings */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="size-80 -left-28.25 top-17 absolute rounded-full border-38 border-[#5C26A1]" />
        <div className="size-56 left-75 top-17 absolute rounded-full border-32 border-[#5C26A1]" />
      </div>

      {/* Top Purple Header Content */}
      <div className="relative z-10 shrink-0 text-white">
        <StatusBar />
        <WalletHeader points={MOCK_WALLET_DATA.user.points} />
        <BalanceSection balance={MOCK_WALLET_DATA.balance} />
      </div>

      {/* Floating Main Menu (Overlapping purple header and white bottom sheet) */}
      <div className="relative z-20 shrink-0">
        <MainMenu onMoreClick={() => setIsMoreMenuOpen(true)} />
      </div>

      {/* White Bottom Sheet Area with Exact Ellipse Background from Figma */}
      <div className="flex-1 w-full relative overflow-hidden flex flex-col min-h-0 -mt-25 pt-30 px-6 pb-2 z-10">
        {/* Exact Ellipse Shape from Figma (863px x 860px at left -217px top 0) */}
        <div className="w-216 h-215 -left-54 top-0 absolute bg-white rounded-full pointer-events-none" />

        {/* Send Again */}
        <div className="relative z-10 shrink-0 pb-4">
          <SendAgain friends={MOCK_WALLET_DATA.friends} />
        </div>

        {/* Latest Transaction (Scrollable internally if items exceed available height) */}
        <div className="relative z-10 flex-1 min-h-0 flex flex-col overflow-hidden pb-1">
          <TransactionList transactions={MOCK_WALLET_DATA.transactions} />
        </div>
      </div>

      {/* Fixed Sticky Bottom Navigation (Pinned solidly at bottom of viewport) */}
      <div className="shrink-0 relative z-30 bg-white">
        <BottomNavigation />
      </div>

      {/* More Menu Bottom Sheet Modal */}
      <MoreMenuSheet
        isOpen={isMoreMenuOpen}
        onClose={() => setIsMoreMenuOpen(false)}
      />
    </main>
  );
}
