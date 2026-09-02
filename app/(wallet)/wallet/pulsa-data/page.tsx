"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { StatusBar } from "@/components/wallet/StatusBar";
import { TransferHeader } from "@/components/wallet/transfer/TransferHeader";
import {
  PulsaDataTabs,
  PhoneNumberCard,
  OperatorSection,
  PulsaDataEmptyState,
  PulsaProductList,
} from "@/components/wallet/pulsa-data";
import { PulsaDataType, Operator, PulsaProduct } from "@/lib/types/pulsa-data";
import { findOperatorByPhoneNumber } from "@/lib/mocks/pulsa-data";
import { getPulsaProducts } from "@/lib/api/pulsa-data";

function PulsaDataContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const phoneParam = searchParams.get("phone") || "";
  const [phoneNumber, setPhoneNumber] = useState<string>(phoneParam);
  const [activeTab, setActiveTab] = useState<PulsaDataType>("pulsa");

  const [products, setProducts] = useState<PulsaProduct[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Reactively detect operator from phone prefix
  const detectedOperator: Operator | undefined = useMemo(() => {
    return findOperatorByPhoneNumber(phoneNumber);
  }, [phoneNumber]);

  // Load pulsa/data products when operator is detected and active tab changes
  useEffect(() => {
    if (!detectedOperator) {
      return;
    }

    let isMounted = true;

    getPulsaProducts({
      operatorId: detectedOperator.id,
      type: activeTab,
      delayMs: 300,
    })
      .then((data) => {
        if (isMounted) {
          setProducts(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setProducts([]);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [detectedOperator, activeTab]);

  const handleOpenContacts = () => {
    // Navigasi ke existing contact picker jika user ingin memilih dari kontak
    router.push("/wallet/transfer/friend/contacts?returnTo=/wallet/pulsa-data");
  };

  const handleSelectProduct = (product: PulsaProduct) => {
    setSelectedProductId(product.id);
  };

  const hasValidPhone = Boolean(phoneNumber && phoneNumber.trim().length >= 4);
  const displayedProducts = detectedOperator ? products : [];

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
            onChange={(val) => {
              setPhoneNumber(val);
              if (selectedProductId) setSelectedProductId(undefined);
            }}
            onOpenContacts={handleOpenContacts}
          />
        </div>
      </div>

      {/* White Content Sheet */}
      <div className="flex-1 bg-white rounded-t-[40px] px-5 pt-6 pb-8 shadow-md space-y-5 relative z-10 flex flex-col mt-2">
        {/* Operator Section */}
        <OperatorSection operator={detectedOperator} />

        {/* Pulsa / Data Tabs */}
        <PulsaDataTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Content Body: Empty State when phone is empty / Product List when valid */}
        <div className="flex-1 flex flex-col justify-start">
          {!hasValidPhone ? (
            <div className="my-auto py-6">
              <PulsaDataEmptyState />
            </div>
          ) : (
            <div className="space-y-4 pt-1">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#121212]">
                  Pilihan Paket {activeTab === "pulsa" ? "Pulsa" : "Data"}
                </h3>
                {detectedOperator && (
                  <span className="text-xs font-semibold text-[#662AB2] bg-[#F9F5FE] px-2.5 py-1 rounded-full">
                    {detectedOperator.name}
                  </span>
                )}
              </div>

              <PulsaProductList
                products={displayedProducts}
                selectedProductId={selectedProductId}
                onSelectProduct={handleSelectProduct}
                isLoading={isLoading}
              />
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
