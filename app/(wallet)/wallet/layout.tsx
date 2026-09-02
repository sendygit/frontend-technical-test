export default function WalletLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-dvh w-full bg-[#662AB2] font-product-sans overflow-x-hidden flex flex-col">
      {children}
    </div>
  );
}
