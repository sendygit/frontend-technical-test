import { ChangeEvent } from "react";
import { Search, Plus } from "lucide-react";

interface ContactSearchProps {
  value: string;
  onChange: (value: string) => void;
  onAddContact?: () => void;
}

export function ContactSearch({ value, onChange, onAddContact }: ContactSearchProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex items-center gap-3 w-full">
      {/* Search Bar (Pill Shape) */}
      <div className="flex-1 flex items-center gap-3 h-[52px] rounded-full border border-neutral-400/70 px-5 bg-white focus-within:border-[#662AB2] focus-within:ring-2 focus-within:ring-purple-100 transition-all">
        <Search className="size-5 text-neutral-400 shrink-0" />
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Search Phone Number"
          className="w-full bg-transparent text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
          aria-label="Cari nomor telepon atau nama kontak"
        />
      </div>

      {/* Add Contact Button */}
      <button
        type="button"
        onClick={onAddContact}
        className="size-13 rounded-full bg-[#F9F5FE] hover:bg-[#F0E6FC] active:scale-95 transition-all flex items-center justify-center text-[#662AB2] shadow-sm shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#662AB2]"
        aria-label="Tambah Kontak Baru"
      >
        <Plus className="size-6 stroke-[2.5]" />
      </button>
    </div>
  );
}
