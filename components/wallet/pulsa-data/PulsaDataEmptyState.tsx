"use client";

import Image from "next/image";

export function PulsaDataEmptyState() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-10 px-4 text-center font-product-sans space-y-3">
      {/* 100x100 Illustration Container */}
      <div className="size-24 rounded-full bg-[#F9F5FE] flex items-center justify-center shadow-xs">
        <Image
          src="/wallet/icons/icon-phone.svg"
          alt=""
          width={48}
          height={48}
          className="size-12 object-contain"
          aria-hidden="true"
        />
      </div>

      {/* Typography */}
      <div className="space-y-1.5 flex flex-col items-center">
        <h3 className="text-xl font-bold text-[#121212] tracking-tight">
          Enter Your Phone Number First
        </h3>
        <p className="text-base text-[#999999] font-normal max-w-[219px] leading-snug">
          Let&apos;s start by entering your phone number
        </p>
      </div>
    </div>
  );
}
