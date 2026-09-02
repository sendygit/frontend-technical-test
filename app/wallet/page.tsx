import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Wallet, ArrowLeftRight, Clock } from "lucide-react";

export const metadata = {
  title: "Soal 3: CashEase E-Wallet | Technical Test",
  description: "CashEase E-Wallet application home placeholder",
};

export default function WalletPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Dashboard
            </Button>
          </Link>
          <span className="text-sm font-medium text-slate-500">Soal 3 &bull; CashEase E-Wallet</span>
        </div>

        <Link href="/wallet/transfer">
          <Button variant="primary" size="sm">
            <ArrowLeftRight className="h-4 w-4" />
            Halaman Transfer
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/80 dark:text-blue-400">
              <Wallet className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-2xl">CashEase E-Wallet Home</CardTitle>
              <CardDescription>
                Aplikasi dompet digital dengan ringkasan saldo, menu aksi cepat, dan riwayat mutasi transaksi.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              <Clock className="h-6 w-6" />
            </div>
            <h4 className="mt-3 text-base font-semibold text-slate-800 dark:text-slate-200">
              Placeholder Halaman CashEase Wallet
            </h4>
            <p className="mt-1 text-sm text-slate-500 max-w-md mx-auto">
              Fondasi routing, types (WalletUser, Balance, Transaction), dan mock data telah siap di <code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded dark:bg-slate-800">lib/</code>. Tampilan dashboard dan interaktivitas akan diimplementasikan pada tahap pengerjaan soal.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
