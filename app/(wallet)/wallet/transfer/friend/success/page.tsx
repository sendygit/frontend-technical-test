"use client";

import { useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { StatusBar } from "@/components/wallet/StatusBar";
import {
  TransferSuccessCard,
  TransferSuccessActions,
} from "@/components/wallet/transfer/success";
import { TransferReceipt } from "@/lib/types/transfer";
import { findContactByPhoneOrName, MOCK_CONTACTS_DATA } from "@/lib/mocks/contacts";

function TransferSuccessContent() {
  const searchParams = useSearchParams();

  const refParam = searchParams.get("ref") || "QOIU-0012-ADFE-2234";
  const amountParam = Number(searchParams.get("amount")) || 200000;
  const nameParam = searchParams.get("name") || "Abdul Mustakim";
  const phoneParam = searchParams.get("phone") || "+62 12345678910";
  const avatarParam = searchParams.get("avatar") || "";
  const dateParam = searchParams.get("date") || "June 12, 2023";
  const timeParam = searchParams.get("time") || "20:32";
  const feeParam = Number(searchParams.get("fee")) || 0;

  // Find matching contact for fallback avatar
  const matchedContact = findContactByPhoneOrName(phoneParam || nameParam) || MOCK_CONTACTS_DATA[0];

  const receipt: TransferReceipt = useMemo(() => {
    return {
      id: refParam,
      type: "friend",
      amount: amountParam,
      recipient: {
        id: matchedContact?.id || "recipient_1",
        name: nameParam,
        phoneNumber: phoneParam,
        avatar: avatarParam || matchedContact?.avatar,
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
    phoneParam,
    avatarParam,
    dateParam,
    timeParam,
    feeParam,
    matchedContact,
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

export default function TransferSuccessPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-white font-medium">Memuat bukti transfer...</div>}>
      <TransferSuccessContent />
    </Suspense>
  );
}
