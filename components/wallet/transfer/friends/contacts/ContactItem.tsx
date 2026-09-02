import { useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Contact } from "@/lib/types/contact";

interface ContactItemProps {
  contact: Contact;
  onSelect: (contact: Contact) => void;
}

export function ContactItem({ contact, onSelect }: ContactItemProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <button
      type="button"
      onClick={() => onSelect(contact)}
      className="w-full flex items-center justify-between py-1 px-2 -mx-2 rounded-2xl hover:bg-slate-50 active:scale-[0.99] transition-all text-left group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#662AB2]"
      aria-label={`Pilih kontak ${contact.name}`}
    >
      {/* Left: Avatar & Contact Details */}
      <div className="flex items-center gap-3.5 min-w-0 flex-1 mr-2">
        {/* Avatar (50x50) */}
        <div className="relative size-[50px] shrink-0 rounded-full overflow-hidden bg-[#F9F5FE]">
          {!imgError && contact.avatar ? (
            <Image
              src={contact.avatar}
              alt={contact.name}
              width={50}
              height={50}
              className="h-full w-full object-cover rounded-full"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-full bg-[#662AB2] text-white font-bold text-base">
              {contact.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Text Info */}
        <div className="min-w-0 flex-1 space-y-0.5">
          <h3 className="text-lg font-medium text-[#121212] group-hover:text-[#662AB2] transition-colors truncate">
            {contact.name}
          </h3>
          <p className="text-base text-[#999999] font-normal truncate">
            {contact.phoneNumber}
          </p>
        </div>
      </div>

      {/* Right: Chevron Arrow */}
      <div className="shrink-0 text-neutral-400 group-hover:text-[#662AB2] transition-colors">
        <ChevronRight className="size-7" />
      </div>
    </button>
  );
}
