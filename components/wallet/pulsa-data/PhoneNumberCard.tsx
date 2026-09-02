"use client";

import Image from "next/image";

interface PhoneNumberCardProps {
  value: string;
  onChange: (value: string) => void;
  onOpenContacts?: () => void;
}

export function PhoneNumberCard({
  value,
  onChange,
  onOpenContacts,
}: PhoneNumberCardProps) {
  return (
    <div className="w-full bg-white rounded-[20px] p-5 shadow-lg shadow-purple-950/10 space-y-2 font-product-sans">
      <h3 className="text-lg font-bold text-[#121212] tracking-tight">
        Phone Number
      </h3>

      <div className="w-full border-b border-[#999999] pb-2 pt-1 flex items-center justify-between gap-3 focus-within:border-[#662AB2] transition-colors">
        <input
          id="pulsa-phone-input"
          type="text"
          inputMode="tel"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Input Phone Number"
          className="w-full bg-transparent text-base font-medium text-[#121212] placeholder:text-[#999999] focus:outline-none"
          aria-label="Nomor telepon"
        />

        <button
          type="button"
          onClick={onOpenContacts}
          className="size-11 rounded-full bg-[#F9F5FE] hover:bg-purple-100 flex items-center justify-center shrink-0 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#662AB2]/40"
          aria-label="Pilih dari buku kontak"
        >
          <Image
            src="/wallet/icons/icon-phonebook.svg"
            alt=""
            width={24}
            height={24}
            className="size-6 object-contain"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
}
