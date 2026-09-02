import Image from "next/image";

interface WalletHeaderProps {
  points?: number;
}

export function WalletHeader({ points = 1250 }: WalletHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-3">
      {/* Brand Logo */}
      <div className="flex items-center">
        <Image src="/wallet/logos/logo-cashease.svg" alt="CashEase Logo" width={100} height={22} priority />
      </div>

      {/* Points Badge */}
      <div className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 font-bold text-xs text-[#121212] shadow-sm">
        <Image src="/wallet/icons/icon-award-star.svg" alt="Award Star Logo" width={18} height={18} priority />
        <span>{points.toLocaleString("id-ID")}</span>
        <span className="text-[10px] text-[#121212] font-semibold">Points</span>
      </div>
    </div>
  );
}
