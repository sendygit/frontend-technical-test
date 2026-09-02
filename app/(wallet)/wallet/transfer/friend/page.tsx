"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { StatusBar } from "@/components/wallet/StatusBar";
import { TransferHeader } from "@/components/wallet/transfer/TransferHeader";
import {
  RecipientInput,
  SetAmount,
  NotesInput,
  ProceedTransferButton,
} from "@/components/wallet/transfer/friends";
import { formatCurrency } from "@/lib/utils/format";
import { MOCK_WALLET_DATA } from "@/lib/mocks/wallet";
import { findContactByPhoneOrName } from "@/lib/mocks/contacts";
import { Contact } from "@/lib/types/contact";
import { submitTransferToFriend } from "@/lib/api/transfer";

function TransferFriendContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const phoneParam = searchParams.get("phone") || "";
  const nameParam = searchParams.get("name") || "";
  const avatarParam = searchParams.get("avatar") || "";

  // Auto-resolve matched contact from mock data if avatar or name wasn't explicitly passed
  const matchedContact = findContactByPhoneOrName(phoneParam || nameParam);

  const initialPhone = phoneParam || matchedContact?.phoneNumber || "";
  const initialName = nameParam || matchedContact?.name || "";
  const initialAvatar = avatarParam || matchedContact?.avatar || "";

  const [recipientPhone, setRecipientPhone] = useState(initialPhone);
  const [recipientName, setRecipientName] = useState(initialName);
  const [recipientAvatar, setRecipientAvatar] = useState(initialAvatar);

  const [prevParamsKey, setPrevParamsKey] = useState(`${phoneParam}_${nameParam}_${avatarParam}`);

  // Sync state dynamically when searchParams changes
  if (`${phoneParam}_${nameParam}_${avatarParam}` !== prevParamsKey) {
    setPrevParamsKey(`${phoneParam}_${nameParam}_${avatarParam}`);
    setRecipientPhone(initialPhone);
    setRecipientName(initialName);
    setRecipientAvatar(initialAvatar);
  }

  const selectedContact: Contact | null =
    recipientName || recipientPhone
      ? {
          id: matchedContact?.id || "selected_contact",
          name: recipientName || "Recipient",
          phoneNumber: recipientPhone,
          avatar: recipientAvatar,
        }
      : null;

  const [amount, setAmount] = useState<number>(0);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const balance = MOCK_WALLET_DATA.balance;

  const isRecipientValid = recipientPhone.trim().length >= 4;
  const isAmountValid = amount >= 10000 && amount <= balance;
  const isFormValid = isRecipientValid && isAmountValid;

  const handleProceed = async () => {
    if (!isRecipientValid) {
      setError("Silakan masukkan nomor telepon penerima.");
      return;
    }
    if (amount < 10000) {
      setError("Nominal transfer minimum adalah Rp 10.000.");
      return;
    }
    if (amount > balance) {
      setError("Saldo dompet digital Anda tidak mencukupi.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const receipt = await submitTransferToFriend({
        amount,
        recipient: {
          id: selectedContact?.id,
          name: selectedContact?.name || recipientName || "Recipient",
          phoneNumber: recipientPhone,
          avatar: selectedContact?.avatar || recipientAvatar,
        },
        notes,
      });

      const params = new URLSearchParams({
        ref: receipt.referenceNumber,
        amount: receipt.amount.toString(),
        name: receipt.recipient.name,
        phone: receipt.recipient.phoneNumber,
        avatar: receipt.recipient.avatar || "",
        date: receipt.date,
        time: receipt.time,
        fee: receipt.fee.toString(),
      });

      router.push(`/wallet/transfer/friend/success?${params.toString()}`);
    } catch {
      setError("Terjadi kesalahan saat memproses transfer. Silakan coba lagi.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="w-full max-w-[430px] mx-auto min-h-dvh flex flex-col justify-between relative bg-[#662AB2] overflow-x-hidden font-product-sans">
      {/* Background Decorative Rings */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="size-80 -left-[113px] top-[68px] absolute rounded-full border-[38px] border-[#5C26A1]" />
        <div className="size-56 left-[300px] top-[69px] absolute rounded-full border-[32px] border-[#5C26A1]" />
      </div>

      {/* Top Purple Section with StatusBar, Header, and Balance */}
      <div className="text-white relative z-10 pb-4">
        <StatusBar />
        <TransferHeader title="Transfer to Friends" backHref="/wallet/transfer" />

        {/* Balance Section */}
        <div className="px-6 pt-2 pb-3 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs text-purple-200 font-medium">Your Balance</span>
            <p className="text-2xl font-bold tracking-tight text-white">
              {formatCurrency(balance)}
            </p>
          </div>
          <button
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-[#662AB2] font-semibold text-xs shadow-sm hover:bg-purple-50 transition-colors focus:outline-none cursor-pointer"
            aria-label="Top Up Saldo"
          >
            <Image
              src="/wallet/icons/icon-wallet.svg"
              alt=""
              width={18}
              height={18}
              className="size-4.5 object-contain"
              aria-hidden="true"
            />
            <span>Top Up</span>
          </button>
        </div>
      </div>

      {/* White Content Container (starts below purple balance area, rounded-t-[40px]) */}
      <div className="flex-1 bg-white rounded-t-[40px] px-5 pt-5 pb-7 shadow-md flex flex-col justify-between space-y-6 relative z-10">
        <div className="space-y-5">
          {/* Drag Handle (96px x 6px) */}
          <div className="w-24 h-1.5 bg-neutral-200 rounded-full mx-auto" />

          {/* Form Fields */}
          <div className="space-y-4">
            {/* 1. Recipient Section (Supports Unselected & Selected with Edit button) */}
            <RecipientInput
              value={recipientPhone}
              selectedContact={selectedContact}
              onChange={(val) => {
                setRecipientPhone(val);
                if (error) setError(null);
              }}
              onOpenContacts={() => router.push("/wallet/transfer/friend/contacts")}
              onEditContact={() => router.push("/wallet/transfer/friend/contacts")}
              error={!isRecipientValid && recipientPhone ? "Nomor telepon minimal 4 digit." : null}
            />

            {/* 2. Set Amount */}
            <SetAmount
              amount={amount}
              onChange={(val) => {
                setAmount(val);
                if (error) setError(null);
              }}
              maxBalance={balance}
              error={amount > 0 && amount < 10000 ? "Nominal minimum Rp 10.000" : null}
            />

            {/* 3. Notes */}
            <NotesInput value={notes} onChange={setNotes} />
          </div>
        </div>

        {/* Bottom Action Area */}
        <div className="space-y-3 pt-2">
          {error && (
            <p className="text-xs font-semibold text-red-500 text-center">{error}</p>
          )}

          <ProceedTransferButton
            disabled={!isFormValid}
            isLoading={isSubmitting}
            onClick={handleProceed}
          />
        </div>
      </div>
    </main>
  );
}

export default function TransferFriendPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 font-medium">Memuat form transfer...</div>}>
      <TransferFriendContent />
    </Suspense>
  );
}
