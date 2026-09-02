"use client";

import { useState, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { StatusBar } from "@/components/wallet/StatusBar";
import { TransferHeader } from "@/components/wallet/transfer/TransferHeader";
import {
  PulsaDataTabs,
  PhoneNumberCard,
  OperatorSection,
  PulsaDataEmptyState,
} from "@/components/wallet/pulsa-data";
import { PulsaDataType, Operator } from "@/lib/types/pulsa-data";
import { findOperatorByPhoneNumber } from "@/lib/mocks/pulsa-data";

function PulsaDataContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const phoneParam = searchParams.get("phone") || "";
  const [phoneNumber, setPhoneNumber] = useState<string>(phoneParam);
  const [activeTab, setActiveTab] = useState<PulsaDataType>("pulsa");

  // Reactively detect operator from phone prefix
  const detectedOperator: Operator | undefined = useMemo(() => {
    return findOperatorByPhoneNumber(phoneNumber);
  }, [phoneNumber]);

  const handleOpenContacts = () => {
    // Navigasi ke existing contact picker jika user ingin memilih dari kontak
    router.push("/wallet/transfer/friend/contacts?returnTo=/wallet/pulsa-data");
  };

  return (
    <main className="w-full max-w-[430px] mx-auto min-h-dvh flex flex-col justify-between relative bg-[#662AB2] overflow-x-hidden font-product-sans">
      {/* Background Decorative Rings */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="size-80 -left-[113px] top-[68px] absolute rounded-full border-[38px] border-[#5C26A1]" />
        <div className="size-56 left-[300px] top-[69px] absolute rounded-full border-[32px] border-[#5C26A1]" />
      </div>

      {/* Top Purple Header Section */}
      <div className="text-white relative z-10 pb-4">
        <StatusBar />
        <TransferHeader
          title="Pulsa & Data"
          backHref="/wallet"
        />

        {/* Phone Number Floating White Card (y ≈ 128px) */}
        <div className="px-5 pt-3">
          <PhoneNumberCard
            value={phoneNumber}
            onChange={setPhoneNumber}
            onOpenContacts={handleOpenContacts}
          />
        </div>
      </div>

      {/* White Content Sheet */}
      <div className="flex-1 bg-white rounded-t-[40px] px-5 pt-6 pb-8 shadow-md space-y-6 relative z-10 flex flex-col mt-2">
        {/* Operator Section */}
        <OperatorSection operator={detectedOperator} />

        {/* Pulsa / Data Tabs */}
        <PulsaDataTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Content Body: Empty State when phone number is empty */}
        <div className="flex-1 flex flex-col justify-center">
          {!phoneNumber ? (
            <PulsaDataEmptyState />
          ) : (
            <div className="p-6 text-center text-sm font-medium text-slate-500">
              Menampilkan paket {activeTab === "pulsa" ? "Pulsa" : "Data"} untuk operator{" "}
              <span className="font-bold text-[#662AB2]">
                {detectedOperator ? detectedOperator.name : "Nomor Telepon"}
              </span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function PulsaDataPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-white font-medium">Memuat Pulsa & Data...</div>}>
      <PulsaDataContent />
    </Suspense>
  );
}
