import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { WalletFriend } from "@/lib/types/wallet";

interface FriendItemProps {
  friend: WalletFriend;
}

export function FriendItem({ friend }: FriendItemProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      href="/wallet/transfer/friend"
      className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer focus:outline-none"
      aria-label={`Transfer ke ${friend.name}`}
    >
      <div className="relative flex size-14 items-center justify-center rounded-full overflow-hidden hover:scale-105 active:scale-95 transition-transform">
        {friend.avatar && !imageError ? (
          <Image
            src={friend.avatar}
            alt={friend.name}
            width={56}
            height={56}
            className="h-full w-full object-cover rounded-full"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-full bg-[#662AB2] text-white font-bold text-sm">
            {friend.name.charAt(0)}
          </div>
        )}
      </div>
      <span className="text-xs font-medium text-[#121212] max-w-15 truncate text-center">
        {friend.name}
      </span>
    </Link>
  );
}
