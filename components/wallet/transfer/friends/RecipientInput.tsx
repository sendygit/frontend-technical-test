import { ChangeEvent } from "react";
import Image from "next/image";

interface RecipientInputProps {
  value: string;
  onChange: (value: string) => void;
  onOpenContacts?: () => void;
  error?: string | null;
}

export function RecipientInput({
  value,
  onChange,
  onOpenContacts,
  error,
}: RecipientInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-full space-y-1">
      <div className="w-full flex items-center gap-3">
        {/* Underline Input Field */}
        <div
          className={`flex-1 px-1 py-3.5 border-b transition-colors flex items-center ${
            error
              ? "border-red-400"
              : "border-neutral-400 focus-within:border-[#662AB2]"
          }`}
        >
          <input
            id="recipient-phone"
            type="text"
            inputMode="numeric"
            value={value}
            onChange={handleChange}
            placeholder="Input Phone Number"
            className="w-full bg-transparent text-base font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
          />
        </div>

        {/* Circular Phonebook Icon Button */}
        <button
          type="button"
          onClick={onOpenContacts}
          className="size-12 p-2.5 bg-purple-50 hover:bg-purple-100 rounded-full flex justify-center items-center shrink-0 transition-colors focus:outline-none focus:ring-2 focus:ring-[#662AB2] cursor-pointer"
          aria-label="Buka buku kontak"
        >
          <Image
            src="/wallet/icons/icon-phonebook.svg"
            alt=""
            width={24}
            height={24}
            className="size-6 object-contain"
            aria-hidden="true"
          />
        </button>
      </div>
      {error && <p className="text-xs font-medium text-red-500 pl-1">{error}</p>}
    </div>
  );
}
