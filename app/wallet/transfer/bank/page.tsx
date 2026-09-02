import Link from "next/link";
import { ArrowLeft, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBar } from "@/components/wallet/StatusBar";

export default function TransferBankPlaceholderPage() {
  return (
    <div className="space-y-6 pb-12">
      {/* Top Bar Navigation */}
      <div className="flex items-center gap-4">
        <Link href="/wallet/transfer">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Kembali ke Transfer Hub
          </Button>
        </Link>
        <span className="text-sm font-medium text-slate-500">Transfer to Bank</span>
      </div>

      {/* Mobile Container */}
      <div className="mx-auto w-full max-w-[430px] rounded-[36px] bg-[#662AB2] shadow-2xl shadow-purple-950/20 border border-purple-900/30 overflow-hidden flex flex-col min-h-[932px] font-product-sans relative">
        {/* Background Decorative Rings */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
          <div className="size-80 -left-[113px] top-[68px] absolute rounded-full border-[38px] border-[#5C26A1]" />
          <div className="size-56 left-[300px] top-[69px] absolute rounded-full border-[32px] border-[#5C26A1]" />
        </div>

        <div className="relative z-10 flex flex-col flex-1 justify-between">
          <div>
            <StatusBar />
            <div className="flex items-center px-6 py-4 text-white">
              <Link
                href="/wallet/transfer"
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10 active:scale-95 transition-all"
                aria-label="Kembali"
              >
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-xl font-bold ml-4">Transfer to Bank</h1>
            </div>
          </div>

          <div className="flex-1 bg-white rounded-t-[40px] p-8 flex flex-col items-center justify-center text-center space-y-4">
            <div className="flex size-20 items-center justify-center rounded-full bg-[#F9F5FE] text-[#662AB2]">
              <Building2 className="size-10" />
            </div>
            <h2 className="text-xl font-bold text-[#121212]">Transfer to Bank Flow</h2>
            <p className="text-sm text-slate-500 max-w-70">
              Screen detail form Transfer to Bank akan dikerjakan pada task berikutnya sesuai panduan.
            </p>
            <Link href="/wallet/transfer">
              <Button className="bg-[#662AB2] hover:bg-[#5C26A1] text-white cursor-pointer">
                Kembali ke Menu Transfer
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
