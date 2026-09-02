import React from "react";
import Link from "next/link";
import Image from "next/image";

export function MainMenu() {
  const menuItems = [
    {
      id: "transfer",
      label: "Transfer",
      href: "/wallet/transfer",
      iconSrc: "/wallet/icons/icon-transfer.svg",
      isClickable: true,
    },
    {
      id: "topup",
      label: "Top Up",
      href: "#",
      iconSrc: "/wallet/icons/icon-wallet.svg",
      isClickable: false,
    },
    {
      id: "withdraw",
      label: "Withdraw",
      href: "#",
      iconSrc: "/wallet/icons/icon-wtihdraw.svg",
      isClickable: false,
    },
    {
      id: "more",
      label: "More",
      href: "#",
      iconSrc: "/wallet/icons/icon-more.svg",
      isClickable: false,
    },
  ];

  return (
    <div className="mx-6 rounded-2xl bg-[#FFFFFF] p-4 shadow-xl shadow-purple-950/10 border border-slate-100 relative z-20">
      <div className="grid grid-cols-4 gap-2 text-center">
        {menuItems.map((item) => {
          const content = (
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="flex h-11 w-11 items-center justify-center transition-transform group-hover:scale-105">
                <Image
                  src={item.iconSrc}
                  alt={item.label}
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain"
                />
              </div>
              <span className="text-base  text-[#121212] group-hover:text-[#662AB2] transition-colors">
                {item.label}
              </span>
            </div>
          );

          if (item.isClickable) {
            return (
              <Link key={item.id} href={item.href} className="focus:outline-none focus:ring-2 focus:ring-[#662AB2] rounded-xl p-1">
                {content}
              </Link>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              className="focus:outline-none focus:ring-2 focus:ring-[#662AB2] rounded-xl p-1 cursor-default opacity-90"
              aria-label={item.label}
            >
              {content}
            </button>
          );
        })}
      </div>
    </div>
  );
}
