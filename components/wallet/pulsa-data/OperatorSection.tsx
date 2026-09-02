"use client";

import Image from "next/image";
import { Operator } from "@/lib/types/pulsa-data";

interface OperatorSectionProps {
  operator?: Operator | null;
}

export function OperatorSection({ operator }: OperatorSectionProps) {
  return (
    <div className="w-full flex items-center gap-3.5 py-1 font-product-sans">
      <div className="size-15 rounded-full bg-[#F9F5FE] flex items-center justify-center shrink-0 shadow-xs">
        <Image
          src="/wallet/icons/icon-phone.svg"
          alt=""
          width={36}
          height={36}
          className="size-9 object-contain"
          aria-hidden="true"
        />
      </div>

      <div className="space-y-0.5">
        <span className="text-lg font-medium text-[#121212]">
          {operator ? operator.name : "Operator"}
        </span>
      </div>
    </div>
  );
}
