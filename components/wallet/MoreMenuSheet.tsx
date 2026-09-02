"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

interface MoreMenuSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  iconSrc: string;
  href?: string;
}

const MAIN_MENU_ITEMS: MenuItem[] = [
  {
    id: "transfer",
    label: "Transfer",
    iconSrc: "/wallet/icons/icon-transfer.svg",
    href: "/wallet/transfer",
  },
  {
    id: "topup",
    label: "Top Up",
    iconSrc: "/wallet/icons/icon-wallet.svg",
  },
  {
    id: "withdraw",
    label: "Withdraw",
    iconSrc: "/wallet/icons/icon-wtihdraw.svg",
  },
  {
    id: "request",
    label: "Request",
    iconSrc: "/wallet/icons/icon-request.svg",
  },
];

const PAYMENT_LIST_ITEMS: MenuItem[] = [
  {
    id: "pulsa-data",
    label: "Pulsa & Data",
    iconSrc: "/wallet/icons/icon-phone.svg",
  },
  {
    id: "electricity",
    label: "Electricity",
    iconSrc: "/wallet/icons/icon-electirc.svg",
  },
  {
    id: "online-ticket",
    label: "Online Ticket",
    iconSrc: "/wallet/icons/icon-ticket.svg",
  },
  {
    id: "education",
    label: "Education",
    iconSrc: "/wallet/icons/icon-education.svg",
  },
  {
    id: "insurance",
    label: "Insurance",
    iconSrc: "/wallet/icons/icon-healthcare.svg",
  },
  {
    id: "invest",
    label: "Invest",
    iconSrc: "/wallet/icons/icon-invest.svg",
  },
  {
    id: "internet-tv",
    label: "Internet & TV Cable",
    iconSrc: "/wallet/icons/icon-internet.svg",
  },
  {
    id: "games-voucher",
    label: "Games Voucher",
    iconSrc: "/wallet/icons/icon-games.svg",
  },
  {
    id: "e-money",
    label: "E-Money",
    iconSrc: "/wallet/icons/icon-emoney.svg",
  },
  {
    id: "water",
    label: "Water",
    iconSrc: "/wallet/icons/icon-water.svg",
  },
  {
    id: "e-commerce",
    label: "E-Commerce",
    iconSrc: "/wallet/icons/icon-shopping.svg",
  },
  {
    id: "streaming",
    label: "Streaming",
    iconSrc: "/wallet/icons/icon-radio.svg",
  },
];

export function MoreMenuSheet({ isOpen, onClose }: MoreMenuSheetProps) {
  const [isRendered, setIsRendered] = useState<boolean>(isOpen);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    let animTimer: NodeJS.Timeout;
    let renderTimer: NodeJS.Timeout;

    if (isOpen) {
      renderTimer = setTimeout(() => {
        setIsRendered(true);
        animTimer = setTimeout(() => {
          setIsVisible(true);
        }, 30);
      }, 0);
    } else {
      renderTimer = setTimeout(() => {
        setIsVisible(false);
        animTimer = setTimeout(() => {
          setIsRendered(false);
        }, 450);
      }, 0);
    }

    return () => {
      clearTimeout(renderTimer);
      clearTimeout(animTimer);
    };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 450);
  }, [onClose]);

  // Handle ESC key press to close sheet smoothly
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isRendered) return null;

  return (
    <div
      className={`absolute inset-0 z-50 overflow-hidden flex flex-col justify-end ${
        isVisible ? "pointer-events-auto" : "pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="More Menu"
    >
      {/* Backdrop (rgba(0, 0, 0, 0.4)) with smooth cubic-bezier fade */}
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* Bottom Sheet Modal Frame with smooth iOS spring curve (duration-500 cubic-bezier(0.16,1,0.3,1)) */}
      <div
        className={`relative z-10 w-full max-h-[85vh] h-[680px] rounded-t-[40px] bg-white px-5 pt-5 pb-8 shadow-2xl overflow-y-auto scrollbar-none transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
          isVisible ? "translate-y-0" : "translate-y-full"
        } flex flex-col`}
      >
        {/* Drag Handle Bar (100px x 6px #E6E6E6) */}
        <div className="w-[100px] h-[6px] bg-[#E6E6E6] rounded-full mx-auto shrink-0 mb-5" />

        <div className="space-y-6 flex-1 pb-4">
          {/* SECTION 1: MAIN MENU */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[20px] font-bold text-[#121212] tracking-tight">
                Main Menu
              </h2>
              <button
                type="button"
                className="text-[14px] font-medium text-[#059D8B] hover:opacity-80 transition-opacity focus:outline-none"
              >
                Edit Menu
              </button>
            </div>

            {/* Main Menu 4-Columns Grid */}
            <div className="grid grid-cols-4 gap-2 text-center">
              {MAIN_MENU_ITEMS.map((item) => {
                const content = (
                  <div className="flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F9F5FE] transition-transform group-hover:scale-105 shadow-sm">
                      <Image
                        src={item.iconSrc}
                        alt={item.label}
                        width={36}
                        height={36}
                        className="h-9 w-9 object-contain"
                      />
                    </div>
                    <span className="text-[16px] font-semibold text-[#121212] group-hover:text-[#662AB2] transition-colors text-center">
                      {item.label}
                    </span>
                  </div>
                );

                if (item.href) {
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={handleClose}
                      className="focus:outline-none focus:ring-2 focus:ring-[#662AB2] rounded-2xl p-1"
                    >
                      {content}
                    </Link>
                  );
                }

                return (
                  <button
                    key={item.id}
                    type="button"
                    className="focus:outline-none focus:ring-2 focus:ring-[#662AB2] rounded-2xl p-1"
                    aria-label={item.label}
                  >
                    {content}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: PAYMENT LIST */}
          <div className="space-y-4 pt-2">
            <h2 className="text-[20px] font-bold text-[#121212] tracking-tight">
              Payment List
            </h2>

            {/* Payment List 4-Columns Grid (12 items) */}
            <div className="grid grid-cols-4 gap-x-2 gap-y-5 text-center">
              {PAYMENT_LIST_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="flex flex-col items-center gap-2 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#662AB2] rounded-2xl p-1"
                  aria-label={item.label}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F9F5FE] transition-transform group-hover:scale-105 shadow-sm">
                    <Image
                      src={item.iconSrc}
                      alt={item.label}
                      width={32}
                      height={32}
                      className="h-8 w-8 object-contain"
                    />
                  </div>
                  <span className="text-[14px] font-medium text-[#121212] leading-tight text-center group-hover:text-[#662AB2] transition-colors">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
