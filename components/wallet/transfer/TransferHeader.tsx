import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

interface TransferHeaderProps {
  title?: string;
  backHref?: string;
  onHelpClick?: () => void;
}

export function TransferHeader({
  title = "Transfer",
  backHref = "/wallet",
  onHelpClick,
}: TransferHeaderProps) {
  return (
    <header className="relative flex items-center justify-between px-6 py-4 text-white z-10">
      {/* Back Button */}
      <Link
        href={backHref}
        className="flex size-10 items-center justify-center rounded-full hover:bg-white/10 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Kembali"
      >
        <ArrowLeft className="size-6" />
      </Link>

      {/* Title */}
      <h1 className="text-xl font-bold tracking-tight text-center text-white">
        {title}
      </h1>

      {/* Help Button */}
      <button
        type="button"
        onClick={onHelpClick}
        className="flex size-10 items-center justify-center rounded-full hover:bg-white/10 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
        aria-label="Bantuan Transfer"
      >
        <Image
          src="/wallet/icons/icon-help.svg"
          alt=""
          width={28}
          height={28}
          className="size-7 object-contain"
          aria-hidden="true"
        />
      </button>
    </header>
  );
}
