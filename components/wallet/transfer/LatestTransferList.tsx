import { TransferTransaction } from "@/lib/types/transfer";
import { LatestTransferItem } from "./LatestTransferItem";
import { AlertCircle, RefreshCw, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LatestTransferListProps {
  transfers: TransferTransaction[];
  isLoading?: boolean;
  errorMessage?: string | null;
  onRetry?: () => void;
}

export function LatestTransferList({
  transfers,
  isLoading = false,
  errorMessage = null,
  onRetry,
}: LatestTransferListProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#121212] tracking-tight">
          Latest Transfer
        </h2>
      </div>

      {isLoading ? (
        <div className="space-y-4 pt-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between py-2 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="size-15 rounded-full bg-slate-100 shrink-0" />
                <div className="space-y-2">
                  <div className="h-5 w-36 rounded bg-slate-200" />
                  <div className="h-3.5 w-24 rounded bg-slate-100" />
                </div>
              </div>
              <div className="h-5 w-24 rounded bg-slate-100" />
            </div>
          ))}
        </div>
      ) : errorMessage ? (
        <div className="p-6 text-center bg-red-50/70 rounded-2xl border border-red-100 space-y-3">
          <div className="flex justify-center text-red-500">
            <AlertCircle className="h-8 w-8" />
          </div>
          <p className="text-sm font-medium text-red-700">{errorMessage}</p>
          {onRetry && (
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={onRetry}
              className="border-red-200 text-red-700 hover:bg-red-100 cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
              Coba Lagi
            </Button>
          )}
        </div>
      ) : transfers.length === 0 ? (
        <div className="p-8 text-center bg-slate-50/80 rounded-2xl border border-slate-100 space-y-2">
          <div className="flex justify-center text-slate-300">
            <Inbox className="h-10 w-10" />
          </div>
          <p className="text-sm font-semibold text-slate-600">Belum ada riwayat transfer</p>
          <p className="text-xs text-slate-400">
            Mulai transfer pertama Anda ke teman atau rekening bank sekarang.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100/70">
          {transfers.map((tx) => (
            <LatestTransferItem key={tx.id} transaction={tx} />
          ))}
        </div>
      )}
    </div>
  );
}
