"use client";

import { PulsaDataType } from "@/lib/types/pulsa-data";

interface PulsaDataTabsProps {
  activeTab: PulsaDataType;
  onTabChange: (tab: PulsaDataType) => void;
}

export function PulsaDataTabs({ activeTab, onTabChange }: PulsaDataTabsProps) {
  return (
    <div className="w-full flex items-center border-b border-slate-100 font-product-sans">
      {/* Tab: Pulsa */}
      <button
        type="button"
        onClick={() => onTabChange("pulsa")}
        className={`flex-1 py-3.5 text-center text-lg font-bold transition-all relative cursor-pointer focus:outline-none ${
          activeTab === "pulsa"
            ? "text-[#662AB2]"
            : "text-[#999999] hover:text-slate-700"
        }`}
        aria-selected={activeTab === "pulsa"}
        role="tab"
      >
        <span>Pulsa</span>
        {activeTab === "pulsa" && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#662AB2] rounded-full" />
        )}
      </button>

      {/* Tab: Data */}
      <button
        type="button"
        onClick={() => onTabChange("data")}
        className={`flex-1 py-3.5 text-center text-lg font-bold transition-all relative cursor-pointer focus:outline-none ${
          activeTab === "data"
            ? "text-[#662AB2]"
            : "text-[#999999] hover:text-slate-700"
        }`}
        aria-selected={activeTab === "data"}
        role="tab"
      >
        <span>Data</span>
        {activeTab === "data" && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#662AB2] rounded-full" />
        )}
      </button>
    </div>
  );
}
