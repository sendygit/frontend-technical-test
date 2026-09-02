"use client";

import { ChangeEvent } from "react";

interface BankNotesInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function BankNotesInput({ value, onChange }: BankNotesInputProps) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-full flex flex-col justify-start items-start gap-2.5 font-product-sans">
      <div className="inline-flex justify-start items-center gap-2">
        <label htmlFor="bank-transfer-notes" className="text-[#121212] text-lg font-medium cursor-pointer">
          Notes
        </label>
        <span className="text-[#999999] text-sm font-normal">(Optional)</span>
      </div>

      <div className="w-full h-25 p-4 bg-[#F7F7F7] rounded-xl border border-[#E6E6E6] focus-within:border-[#662AB2] focus-within:bg-white transition-all">
        <textarea
          id="bank-transfer-notes"
          rows={3}
          value={value}
          onChange={handleChange}
          placeholder="Write your notes here"
          className="w-full h-full resize-none bg-transparent text-base text-[#121212] placeholder:text-[#999999] focus:outline-none"
        />
      </div>
    </div>
  );
}
