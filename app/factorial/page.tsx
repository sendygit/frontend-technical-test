import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calculator, Clock } from "lucide-react";

export const metadata = {
  title: "Soal 1: Factorial Calculator | Technical Test",
  description: "Recursive Factorial Calculator implementation placeholder",
};

export default function FactorialPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Dashboard
          </Button>
        </Link>
        <span className="text-sm font-medium text-slate-500">Soal 1 &bull; Recursive Factorial Calculator</span>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/80 dark:text-blue-400">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-2xl">Recursive Factorial Calculator</CardTitle>
              <CardDescription>
                Modul kalkulator faktorial berbasis algoritma rekursif.
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
              Placeholder Halaman Soal 1
            </h4>
            <p className="mt-1 text-sm text-slate-500 max-w-md mx-auto">
              Fondasi routing dan styling telah siap. Logika kalkulator rekursif, input form, dan riwayat kalkulasi akan diimplementasikan pada tahap pengerjaan soal.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
