"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, RefreshCw, AlertTriangle, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBar } from "@/components/wallet/StatusBar";
import { TransferHeader } from "@/components/wallet/transfer/TransferHeader";
import {
  ContactSearch,
  ContactList,
} from "@/components/wallet/transfer/friends/contacts";
import { Contact } from "@/lib/types/contact";
import { getContacts } from "@/lib/api/contacts";

export default function ContactsPickerPage() {
  const router = useRouter();

  const [allContacts, setAllContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Evaluator simulation controls
  const [simulateMode, setSimulateMode] = useState<"normal" | "error" | "empty">("normal");
  const [refreshKey, setRefreshKey] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;

    getContacts({
      shouldFail: simulateMode === "error",
      empty: simulateMode === "empty",
      delayMs: 600,
    })
      .then((data) => {
        if (isMounted) {
          setAllContacts(data);
          setErrorMessage(null);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          const msg = err instanceof Error ? err.message : "Terjadi kesalahan saat memuat kontak.";
          setErrorMessage(msg);
          setAllContacts([]);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [simulateMode, refreshKey]);

  // Frontend filtering based on searchQuery
  const filteredContacts = useMemo(() => {
    if (!searchQuery.trim()) return allContacts;

    const query = searchQuery.toLowerCase().trim();
    const cleanPhoneQuery = query.replace(/[^0-9]/g, "");

    return allContacts.filter((contact) => {
      const matchName = contact.name.toLowerCase().includes(query);
      const matchPhone = cleanPhoneQuery
        ? contact.phoneNumber.replace(/[^0-9]/g, "").includes(cleanPhoneQuery)
        : false;
      return matchName || matchPhone;
    });
  }, [allContacts, searchQuery]);

  const handleSelectContact = (contact: Contact) => {
    const params = new URLSearchParams({
      phone: contact.phoneNumber,
      name: contact.name,
      avatar: contact.avatar,
    });
    router.push(`/wallet/transfer/friend?${params.toString()}`);
  };

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
      {/* Top Bar Navigation for Evaluator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/wallet/transfer/friend">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              Kembali ke Transfer Form
            </Button>
          </Link>
          <span className="text-sm font-medium text-slate-500">
            Soal 3 &bull; Contact Picker
          </span>
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
            title="Refresh Data"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Main Mobile Frame Container (430px x 932px) */}
      <div className="mx-auto w-full max-w-[430px] rounded-[36px] bg-[#662AB2] shadow-2xl shadow-purple-950/20 border border-purple-900/30 overflow-hidden flex flex-col min-h-[932px] font-product-sans relative">
        {/* Background Decorative Rings */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
          <div className="size-80 -left-[113px] top-[68px] absolute rounded-full border-[38px] border-[#5C26A1]" />
          <div className="size-56 left-[300px] top-[69px] absolute rounded-full border-[32px] border-[#5C26A1]" />
        </div>

        {/* Top Purple Header */}
        <div className="text-white relative z-10 pb-2">
          <StatusBar />
          <TransferHeader
            title="Transfer to Friends"
            backHref="/wallet/transfer/friend"
          />
        </div>

        {/* White Content Container (starts below header area, rounded-t-[40px]) */}
        <div className="flex-1 bg-white rounded-t-[40px] px-5 pt-6 pb-8 shadow-md space-y-6 relative z-10 flex flex-col">
          {/* Search Box & Add Contact Button Row */}
          <ContactSearch
            value={searchQuery}
            onChange={setSearchQuery}
            onAddContact={() => {
              // Interactive visual callback for Add Contact
            }}
          />

          {/* Contact List */}
          <div className="flex-1">
            <ContactList
              contacts={filteredContacts}
              isLoading={isLoading}
              errorMessage={errorMessage}
              onRetry={handleRetry}
              onSelectContact={handleSelectContact}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
