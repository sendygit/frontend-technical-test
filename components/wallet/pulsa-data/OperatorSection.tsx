"use client";

import { useState } from "react";
import Image from "next/image";
import { Operator } from "@/lib/types/pulsa-data";

interface OperatorSectionProps {
  operator?: Operator | null;
}

export function OperatorSection({ operator }: OperatorSectionProps) {
  const [logoError, setLogoError] = useState(false);

  return (
    <div className="w-full flex items-center gap-3.5 py-1 font-product-sans">
      <div className="size-15 rounded-full bg-[#F9F5FE] border border-slate-100 flex items-center justify-center shrink-0 shadow-xs overflow-hidden p-2">
        {operator && operator.logo && !logoError ? (
          <Image
            src={operator.logo}
            alt={operator.name}
            width={40}
            height={40}
            className="h-full w-full object-contain"
            onError={() => setLogoError(true)}
          />
        ) : (
          <Image
            src="/wallet/icons/icon-phone.svg"
            alt=""
            width={36}
            height={36}
            className="size-9 object-contain"
            aria-hidden="true"
          />
        )}
      </div>

      <div className="space-y-0.5 min-w-0">
        <span className="text-lg font-medium text-[#121212] truncate block">
          {operator ? operator.name : "Operator"}
        </span>
      </div>
    </div>
  );
}
