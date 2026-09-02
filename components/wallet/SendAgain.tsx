import { Plus, ArrowRight } from "lucide-react";
import { WalletFriend } from "@/lib/types/wallet";
import { FriendItem } from "./FriendItem";

interface SendAgainProps {
  friends: WalletFriend[];
}

export function SendAgain({ friends }: SendAgainProps) {
  return (
    <div className="space-y-3">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-[#121212] tracking-tight">
          Send Again
        </h2>
        <button
          type="button"
          className="flex items-center gap-1 text-xs font-semibold text-[#059D8B] hover:opacity-80 transition-opacity focus:outline-none cursor-pointer"
        >
          <span>See all</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Horizontal List */}
      <div className="flex items-center gap-4 overflow-x-auto pb-2 pt-1 -mx-6 px-6 scrollbar-none [-ms-overflow-style:none]">
        {/* Add New Button */}
        <div className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer">
          <button
            type="button"
            className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-[#662AB2] bg-white text-[#662AB2] focus:outline-none shadow-sm cursor-pointer"
            aria-label="Tambah penerima baru"
          >
            <Plus className="h-6 w-6" />
          </button>
          <span className="text-xs font-medium text-[#662AB2] max-w-15 truncate text-center">
            Add New
          </span>
        </div>

        {/* Friends */}
        {friends.length > 0 ? (
          friends.map((friend) => <FriendItem key={friend.id} friend={friend} />)
        ) : (
          <div className="flex items-center text-xs text-slate-400 italic py-3 pl-2">
            Belum ada kontak penerima tersimpan.
          </div>
        )}
      </div>
    </div>
  );
}
