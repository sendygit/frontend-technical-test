import React from "react";
import Image from "next/image";

export function BottomNavigation() {
  return (
    <div className="sticky bottom-0 left-0 right-0 z-30 w-full border-t border-slate-100 bg-white px-4 py-3 shadow-[0px_-8px_20px_0px_rgba(172,172,172,0.10)]">
      <div className="flex items-center justify-between">
        {/* 1. Home (Active) */}
        <button
          type="button"
          className="flex flex-1 flex-col items-center gap-1 text-[#662AB2] focus:outline-none"
          aria-label="Home"
        >
          <div className="flex h-7 w-7 items-center justify-center">
            <Image
              src="/wallet/icons/icon-transfer.svg"
              alt="Home"
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />
          </div>
          <span className="text-xs font-semibold text-[#662AB2]">Home</span>
        </button>

        {/* 2. Report */}
        <button
          type="button"
          className="flex flex-1 flex-col items-center gap-1 text-neutral-400 hover:text-slate-600 transition-colors focus:outline-none"
          aria-label="Report"
        >
          <div className="flex h-7 w-7 items-center justify-center">
            <Image
              src="/wallet/icons/icon-report.svg"
              alt="Report"
              width={26}
              height={26}
              className="h-6 w-6 object-contain"
            />
          </div>
          <span className="text-xs font-medium text-neutral-400">Report</span>
        </button>

        {/* 3. Center QR Scan Floating Button */}
        <div className="flex flex-1 flex-col items-center">
          <button
            type="button"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#662AB2] text-white shadow-[0px_6px_20px_0px_rgba(102,42,178,0.35)] hover:scale-105 active:scale-95 transition-transform "
            aria-label="Scan QR Code"
          >
            <Image
              src="/wallet/icons/icon-qr.svg"
              alt="Scan QR"
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />
          </button>
        </div>

        {/* 4. History */}
        <button
          type="button"
          className="flex flex-1 flex-col items-center gap-1 text-neutral-400 hover:text-slate-600 transition-colors focus:outline-none"
          aria-label="History"
        >
          <div className="flex h-7 w-7 items-center justify-center">
            <Image
              src="/wallet/icons/icon-history.svg"
              alt="History"
              width={26}
              height={26}
              className="h-6 w-6 object-contain"
            />
          </div>
          <span className="text-xs font-medium text-neutral-400">History</span>
        </button>

        {/* 5. Profile */}
        <button
          type="button"
          className="flex flex-1 flex-col items-center gap-1 text-neutral-400 hover:text-slate-600 transition-colors focus:outline-none"
          aria-label="Profile"
        >
          <div className="flex h-7 w-7 items-center justify-center">
            <Image
              src="/wallet/icons/icon-profile.svg"
              alt="Profile"
              width={26}
              height={26}
              className="h-6 w-6 object-contain"
            />
          </div>
          <span className="text-xs font-medium text-neutral-400">Profile</span>
        </button>
      </div>
    </div>
  );
}
