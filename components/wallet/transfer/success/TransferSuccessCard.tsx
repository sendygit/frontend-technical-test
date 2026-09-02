"use client";

import { useState } from "react";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils/format";
import { TransferReceipt } from "@/lib/types/transfer";

interface TransferSuccessCardProps {
  receipt: TransferReceipt;
}

export function TransferSuccessCard({ receipt }: TransferSuccessCardProps) {
  const [avatarError, setAvatarError] = useState(false);

  return (
    <div className="relative w-full max-w-[390px] mx-auto pt-10">
      {/* Outer White Badge with Success Checkmark (matching Figma: p-1 bg-white rounded-full) */}
      <div className="p-1 left-1/2 -translate-x-1/2 top-0 absolute bg-white rounded-full inline-flex justify-center items-center z-20 ">
        <div className="size-16 relative rounded-full overflow-hidden flex items-center justify-center">
          <Image
            src="/wallet/icons/icon-success.svg"
            alt="Transfer Successful"
            width={64}
            height={64}
            className="size-16 object-contain"
            priority
          />
        </div>
      </div>

      {/* Main White Card with 24px rounded corners */}
      <div className="w-full px-5 pt-12 pb-8 bg-white rounded-3xl flex flex-col justify-start items-center gap-6 overflow-hidden shadow-2xl shadow-purple-950/25 relative z-10 font-product-sans">
        {/* Success Message Header & Amount */}
        <div className="w-full flex flex-col justify-start items-center gap-4">
          <div className="flex flex-col justify-start items-center gap-1 text-center">
            <div className="text-[#03B961] text-lg font-bold">
              Transfer Successful
            </div>
            <div className="text-neutral-400 text-base font-normal">
              Your transaction was successfull
            </div>
          </div>
          <div className="text-[#121212] text-4xl font-bold tracking-tight">
            {formatCurrency(receipt.amount)}
          </div>
        </div>

        {/* Recipient Section */}
        <div className="w-full flex flex-col justify-start items-center gap-3">
          <div className="text-black text-lg font-bold">Send to</div>
          <div className="inline-flex justify-start items-center gap-4">
            <div className="size-12 rounded-full overflow-hidden bg-[#F9F5FE] shrink-0">
              {receipt.recipient.avatar && !avatarError ? (
                <Image
                  src={receipt.recipient.avatar}
                  alt={receipt.recipient.name}
                  width={48}
                  height={48}
                  className="size-12 rounded-full object-cover"
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <div className="flex size-12 items-center justify-center rounded-full bg-[#662AB2] text-white font-bold text-base">
                  {receipt.recipient.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="inline-flex flex-col justify-center items-start gap-0.5">
              <div className="text-[#121212] text-base font-normal">
                {receipt.recipient.name}
              </div>
              <div className="text-neutral-400 text-sm font-medium">
                {receipt.recipient.phoneNumber}
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="w-full flex flex-col justify-center items-start gap-3">
          <div className="text-black text-lg font-bold">
            Transaction Details
          </div>
          <div className="w-full flex flex-col justify-center items-start gap-2.5 text-sm">
            <div className="w-full inline-flex justify-between items-center">
              <div className="text-neutral-400 text-sm font-medium">Payment</div>
              <div className="text-black text-sm font-bold">
                {formatCurrency(receipt.amount)}
              </div>
            </div>
            <div className="w-full inline-flex justify-between items-center">
              <div className="text-neutral-400 text-sm font-medium">Date</div>
              <div className="text-black text-sm font-bold">
                {receipt.date}
              </div>
            </div>
            <div className="w-full inline-flex justify-between items-center">
              <div className="text-neutral-400 text-sm font-medium">Time</div>
              <div className="text-black text-sm font-bold">
                {receipt.time}
              </div>
            </div>
            <div className="w-full inline-flex justify-between items-center gap-2">
              <div className="text-neutral-400 text-sm font-medium shrink-0">
                Reference Number
              </div>
              <div className="text-black text-sm font-bold font-mono text-right truncate">
                {receipt.referenceNumber}
              </div>
            </div>
            <div className="w-full inline-flex justify-between items-center">
              <div className="text-neutral-400 text-sm font-medium">Fee</div>
              <div className="text-black text-sm font-bold">
                {formatCurrency(receipt.fee)}
              </div>
            </div>
          </div>
        </div>

        {/* Total Payment */}
        <div className="w-full inline-flex justify-between items-center pt-2 border-t border-slate-100">
          <div className="text-[#662AB2] text-lg font-bold">
            Total Payment
          </div>
          <div className="text-[#662AB2] text-2xl font-bold">
            {formatCurrency(receipt.total)}
          </div>
        </div>
      </div>
    </div>
  );
}
