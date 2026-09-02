"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { TransferReceipt } from "@/lib/types/transfer";
import { formatCurrency } from "@/lib/utils/format";

interface TransferSuccessActionsProps {
  receipt: TransferReceipt;
}

export function TransferSuccessActions({ receipt }: TransferSuccessActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareText = `Transfer Berhasil!\nNominal: ${formatCurrency(receipt.amount)}\nPenerima: ${receipt.recipient.name} (${receipt.recipient.phoneNumber})\nNo. Ref: ${receipt.referenceNumber}\nTanggal: ${receipt.date} ${receipt.time}`;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Bukti Transfer CashEase",
          text: shareText,
        });
      } catch {
        // User cancelled or share not permitted, silently ignore
      }
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        // Clipboard failed, fallback silently
      }
    }
  };

  return (
    <div className="w-full max-w-98 mx-auto space-y-3.5 font-product-sans pt-2">
      {/* Toast Notification when copied */}
      {copied && (
        <div className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-white/20 backdrop-blur-md text-white text-xs font-semibold text-center animate-in fade-in">
          <Check className="h-4 w-4 text-green-300" />
          <span>Detail transaksi berhasil disalin ke clipboard!</span>
        </div>
      )}

      {/* Share Button (Transparent purple with 2px white border, 20px Bold White Text) */}
      <button
        type="button"
        onClick={handleShare}
        className="w-full h-14 rounded-full border-2 border-white bg-transparent text-white font-bold text-xl hover:bg-white/10 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Bagikan bukti transfer"
      >
        <span>Share</span>
      </button>

      {/* Back to Home Button (White background, 20px Bold Purple Text) */}
      <Link
        href="/wallet"
        className="w-full h-14 rounded-full bg-white text-[#662AB2] font-bold text-xl hover:bg-purple-50 active:scale-[0.99] transition-all flex items-center justify-center shadow-lg shadow-purple-950/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Kembali ke Beranda"
      >
        <span>Back to Home</span>
      </Link>
    </div>
  );
}
