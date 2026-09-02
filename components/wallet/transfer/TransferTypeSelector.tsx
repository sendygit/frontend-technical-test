import { TransferTypeCard } from "./TransferTypeCard";

export function TransferTypeSelector() {
  const transferOptions = [
    {
      id: "friend",
      label: "Transfer to Friends",
      iconSrc: "/wallet/icons/icon-friends.svg",
      href: "/wallet/transfer/friend",
    },
    {
      id: "bank",
      label: "Transfer to Bank",
      iconSrc: "/wallet/icons/icon-bank.svg",
      href: "/wallet/transfer/bank",
    },
  ];

  return (
    <section aria-label="Transfer Methods" className="w-full">
      <div className="grid grid-cols-2 gap-4">
        {transferOptions.map((option) => (
          <TransferTypeCard
            key={option.id}
            label={option.label}
            iconSrc={option.iconSrc}
            href={option.href}
          />
        ))}
      </div>
    </section>
  );
}
