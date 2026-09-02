"use client";

import { PulsaProduct } from "@/lib/types/pulsa-data";
import { formatCurrency } from "@/lib/utils/format";

interface PulsaProductListProps {
  products: PulsaProduct[];
  selectedProductId?: string;
  onSelectProduct: (product: PulsaProduct) => void;
  isLoading?: boolean;
}

export function PulsaProductList({
  products,
  selectedProductId,
  onSelectProduct,
  isLoading = false,
}: PulsaProductListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3.5 pt-1" aria-busy="true" aria-label="Memuat paket pulsa">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div
            key={idx}
            className="h-24 rounded-2xl bg-slate-100 animate-pulse border border-slate-200 p-4 flex flex-col justify-between"
          >
            <div className="h-5 w-24 bg-slate-200 rounded-md" />
            <div className="h-4 w-16 bg-slate-200 rounded-md" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="p-8 text-center text-slate-400 text-sm font-medium">
        Tidak ada paket yang tersedia untuk operator ini.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3.5 font-product-sans">
      {products.map((product) => {
        const isSelected = selectedProductId === product.id;
        const isData = product.type === "data";

        return (
          <button
            key={product.id}
            type="button"
            onClick={() => onSelectProduct(product)}
            className={`rounded-2xl p-4 border transition-all cursor-pointer flex flex-col justify-between min-h-24 text-left focus:outline-none ${
              isSelected
                ? "bg-[#F9F5FE] border-[#662AB2] ring-2 ring-[#662AB2]/20 shadow-sm"
                : "bg-white border-[#E6E6E6] hover:border-[#662AB2]/50 hover:bg-slate-50/60 shadow-xs"
            }`}
            aria-label={`${product.name}, harga ${formatCurrency(product.price)}`}
          >
            {/* Top: Nominal / Package Name */}
            <div className="space-y-0.5">
              <span className="text-lg font-bold text-[#121212] tracking-tight line-clamp-1">
                {isData ? product.name : formatCurrency(product.nominal)}
              </span>
              {product.validity && (
                <span className="text-xs text-neutral-400 font-medium block">
                  {product.validity}
                </span>
              )}
            </div>

            {/* Bottom: Price */}
            <div className="pt-2">
              <span
                className={`text-sm font-bold ${
                  isSelected ? "text-[#662AB2]" : "text-[#662AB2]"
                }`}
              >
                {formatCurrency(product.price)}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
