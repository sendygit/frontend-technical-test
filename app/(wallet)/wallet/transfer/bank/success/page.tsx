"use client";

import { useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { StatusBar } from "@/components/wallet/StatusBar";
import {
  TransferSuccessCard,
  TransferSuccessActions,
} from "@/components/wallet/transfer/success";
import { TransferReceipt } from "@/lib/types/transfer";
import { findBankByIdOrCode } from "@/lib/mocks/bank";

function BankTransferSuccessContent() {
  const searchParams = useSearchParams();

  const refParam = searchParams.get("ref") || "ALKS-9928-HGJD-1134";
  const amountParam = Number(searchParams.get("amount")) || 760000;
  const bankParam = searchParams.get("bank") || searchParams.get("bankId") || "bank_bca";
  const matchedBank = findBankByIdOrCode(bankParam);

  const nameParam = searchParams.get("name") || matchedBank?.accountName || "Karolina McMillan";
  const accountParam = searchParams.get("accountNumber") || searchParams.get("account") || matchedBank?.accountNumber || "12345678980901";
  const avatarParam = searchParams.get("avatar") || matchedBank?.logo || "/wallet/logos/logo-bca.svg";
  const dateParam = searchParams.get("date") || "June 9, 2023";
  const timeParam = searchParams.get("time") || "12:35";
  const feeParam = searchParams.get("fee") !== null ? Number(searchParams.get("fee")) : 2500;

  const receipt: TransferReceipt = useMemo(() => {
    return {
      id: refParam,
      type: "bank",
      amount: amountParam,
      recipient: {
        id: matchedBank?.id || "bank_bca",
        name: nameParam,
        phoneNumber: accountParam,
        avatar: avatarParam,
      },
      date: dateParam,
      time: timeParam,
      referenceNumber: refParam,
      fee: feeParam,
      total: amountParam + feeParam,
      status: "success",
    };
  }, [
    refParam,
    amountParam,
    nameParam,
    accountParam,
    avatarParam,
    dateParam,
    timeParam,
    feeParam,
    matchedBank,
  ]);

  return (
    <main className="w-full max-w-107 mx-auto min-h-dvh flex flex-col justify-between py-5 px-5 relative bg-[#662AB2] font-product-sans overflow-x-hidden">
      {/* Background Decorative Rings */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="size-80 -left-28.25 top-17 absolute rounded-full border-38 border-[#5C26A1]" />
        <div className="size-56 left-75 top-17 absolute rounded-full border-32 border-[#5C26A1]" />
      </div>

      {/* Top Status Bar Spacing */}
      <div className="relative z-10">
        <StatusBar />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col justify-center py-4 space-y-6">
        {/* Transaction Success White Card */}
        <TransferSuccessCard receipt={receipt} />

        {/* Action Buttons: Share & Back to Home */}
        <TransferSuccessActions receipt={receipt} />
      </div>
    </main>
  );
}

export default function BankTransferSuccessPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-white font-medium">Memuat bukti transfer bank...</div>}>
      <BankTransferSuccessContent />
    </Suspense>
  );
}
