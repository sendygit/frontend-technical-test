import Link from "next/link";
import { ArrowLeft, HelpCircle } from "lucide-react";

interface TransferHeaderProps {
  title?: string;
  onHelpClick?: () => void;
}

export function TransferHeader({ title = "Transfer", onHelpClick }: TransferHeaderProps) {
  return (
    <header className="relative flex items-center justify-between px-6 py-4 text-white z-10">
      {/* Back Button */}
      <Link
        href="/wallet"
        className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Kembali ke Wallet"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      {/* Title */}
      <h1 className="text-xl font-bold tracking-tight text-center text-white">
        {title}
      </h1>

      {/* Help Button */}
      <button
        type="button"
        onClick={onHelpClick}
        className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
        aria-label="Bantuan Transfer"
      >
        <HelpCircle className="h-6 w-6 text-white" />
      </button>
    </header>
  );
}
