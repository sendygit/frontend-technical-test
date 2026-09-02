import React from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WalletErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export function WalletErrorState({
  message = "Gagal memuat data dompet digital. Silakan coba beberapa saat lagi.",
  onRetry,
}: WalletErrorStateProps) {
  return (
    <div className="flex min-h-125 flex-col items-center justify-center p-8 text-center bg-white rounded-3xl">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
        <AlertCircle className="h-8 w-8" />
      </div>

      <h3 className="mt-4 text-lg font-bold text-[#121212]">
        Terjadi Kendala Koneksi
      </h3>
      <p className="mt-2 text-sm text-slate-500 max-w-xs leading-relaxed">
        {message}
      </p>

      <div className="mt-6">
        <Button onClick={onRetry} variant="primary" size="md">
          <RotateCcw className="h-4 w-4 mr-2" />
          Coba Lagi
        </Button>
      </div>
    </div>
  );
}
