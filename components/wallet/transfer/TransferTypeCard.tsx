import Link from "next/link";
import Image from "next/image";

interface TransferTypeCardProps {
  label: string;
  iconSrc: string;
  href: string;
  description?: string;
}

export function TransferTypeCard({ label, iconSrc, href, description }: TransferTypeCardProps) {
  return (
    <Link
      href={href}
      className="flex-1 flex flex-col items-center justify-center p-5 rounded-2xl bg-[#F9F5FE] hover:bg-[#F3EAFF] active:scale-[0.98] transition-all border border-purple-50/50 shadow-sm group focus:outline-none focus:ring-2 focus:ring-[#662AB2] text-center"
      aria-label={label}
    >
      <div className="flex size-14 items-center justify-center rounded-2xl bg-white/90 mb-3 shadow-xs transition-transform group-hover:scale-105">
        <Image
          src={iconSrc}
          alt=""
          width={40}
          height={40}
          className="size-10 object-contain"
          aria-hidden="true"
        />
      </div>
      <div className="flex flex-col items-center text-center">
        <h3 className="text-base font-bold text-[#121212] group-hover:text-[#662AB2] transition-colors leading-snug text-center">
          {label}
        </h3>
        {description && (
          <p className="text-xs text-neutral-400 mt-1 text-center">{description}</p>
        )}
      </div>
    </Link>
  );
}
