import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { Contact } from "@/lib/types/contact";

interface RecipientInputProps {
  value: string;
  onChange: (value: string) => void;
  selectedContact?: Contact | null;
  onOpenContacts?: () => void;
  onEditContact?: () => void;
  error?: string | null;
}

export function RecipientInput({
  value,
  onChange,
  selectedContact,
  onOpenContacts,
  onEditContact,
  error,
}: RecipientInputProps) {
  const [prevAvatar, setPrevAvatar] = useState(selectedContact?.avatar);
  const [imgError, setImgError] = useState(false);

  // Sync / Reset imgError when avatar URL changes (React 19 pattern)
  if (selectedContact?.avatar !== prevAvatar) {
    setPrevAvatar(selectedContact?.avatar);
    setImgError(false);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  // If a contact is selected (State matching Figma Node 1:1114)
  if (selectedContact) {
    return (
      <div className="w-full space-y-1">
        <div className="w-full flex items-center justify-between py-1">
          {/* Left: Avatar & Contact Info */}
          <div className="flex items-center gap-3.5 min-w-0 flex-1 mr-3">
            {/* Avatar (60x60) */}
            <div className="relative size-15 shrink-0 rounded-full overflow-hidden bg-[#F9F5FE] shadow-sm">
              {!imgError && selectedContact.avatar ? (
                <Image
                  key={selectedContact.avatar}
                  src={selectedContact.avatar}
                  alt={selectedContact.name}
                  width={60}
                  height={60}
                  className="h-full w-full object-cover rounded-full"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-[#662AB2] text-white font-bold text-lg">
                  {selectedContact.name.charAt(0)}
                </div>
              )}
            </div>

            {/* Name and Phone Number */}
            <div className="min-w-0 flex-1 space-y-0.5">
              <h3 className="text-lg font-medium text-[#121212] tracking-tight truncate">
                {selectedContact.name}
              </h3>
              <p className="text-base text-[#999999] font-normal truncate">
                {selectedContact.phoneNumber}
              </p>
            </div>
          </div>

          {/* Right: Edit Button with official icon-edit.svg (24px) */}
          <button
            type="button"
            onClick={onEditContact || onOpenContacts}
            className="flex size-10 items-center justify-center rounded-full hover:bg-[#F9F5FE] text-[#662AB2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#662AB2] cursor-pointer shrink-0"
            aria-label="Ubah penerima transfer"
          >
            <Image
              src="/wallet/icons/icon-edit.svg"
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

  // Default / Empty State (State matching Figma Node 1:920)
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
