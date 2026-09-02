import React from "react";
import Image from "next/image";
import { WalletFriend } from "@/lib/types/wallet";

interface FriendItemProps {
  friend: WalletFriend;
}

export function FriendItem({ friend }: FriendItemProps) {
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer">
      <div className="relative flex h-14 w-14 items-center justify-center rounded-full overflow-hidden">
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
      <span className="text-xs font-medium text-[#121212] max-w-[60px] truncate text-center">
        {friend.name}
      </span>
    </div>
  );
}
