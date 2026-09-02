"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
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

  useEffect(() => {
    let isMounted = true;

    getContacts({
      delayMs: 400,
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
  }, []);

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
    getContacts({ delayMs: 400 })
      .then((data) => {
        setAllContacts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        const msg = err instanceof Error ? err.message : "Terjadi kesalahan saat memuat kontak.";
        setErrorMessage(msg);
        setIsLoading(false);
      });
  };

  return (
    <main className="w-full max-w-[430px] mx-auto min-h-dvh flex flex-col justify-between relative bg-[#662AB2] overflow-x-hidden font-product-sans">
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
    </main>
  );
}
