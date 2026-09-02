import { StatusBar } from "./StatusBar";
import { BottomNavigation } from "./BottomNavigation";

export function WalletSkeleton() {
  return (
    <div className="relative flex min-h-dvh sm:min-h-[932px] flex-col justify-between overflow-hidden bg-[#662AB2]">
      {/* Background Decorative Rings */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="size-80 -left-[113px] top-[68px] absolute rounded-full border-[38px] border-[#5C26A1]" />
        <div className="size-56 left-[300px] top-[69px] absolute rounded-full border-[32px] border-[#5C26A1]" />
      </div>

      {/* Large White Oval Background */}
      <div className="w-[863px] h-[860px] -left-[217px] top-[260px] absolute bg-white rounded-full z-0 shadow-lg pointer-events-none" />

      <div className="relative z-10 pb-6">
        {/* Top Purple Header Background */}
        <div>
          <StatusBar />

          {/* Header Skeleton */}
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-24 rounded-lg bg-white/20 animate-pulse" />
            </div>
            <div className="h-7 w-20 rounded-full bg-white/20 animate-pulse" />
          </div>

          {/* Balance Skeleton (matching pt-8 pb-14 from BalanceSection) */}
          <div className="px-6 pt-8 pb-14 space-y-2 flex flex-col items-center">
            <div className="h-4 w-24 rounded bg-white/20 animate-pulse" />
            <div className="h-9 w-48 rounded-lg bg-white/25 animate-pulse" />
          </div>
        </div>

        {/* Main Menu Card Skeleton (matching mt-1 from page.tsx) */}
        <div className="mt-1 relative z-20 mx-6 rounded-2xl bg-white p-4 shadow-xl border border-slate-100">
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="size-11 rounded-full bg-slate-100 animate-pulse" />
                <div className="h-3 w-12 rounded bg-slate-100 animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* White Section Skeleton on Oval Background */}
        <div className="px-6 pt-6 space-y-6 relative z-10">
          {/* Send Again Skeleton */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-5 w-24 rounded bg-slate-200 animate-pulse" />
              <div className="h-4 w-12 rounded bg-slate-100 animate-pulse" />
            </div>
            <div className="flex items-center gap-4 overflow-hidden -mx-6 px-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 shrink-0">
                  <div className="size-14 rounded-full bg-slate-100 animate-pulse" />
                  <div className="h-3 w-10 rounded bg-slate-100 animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Transaction List Skeleton */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-5 w-32 rounded bg-slate-200 animate-pulse" />
              <div className="h-4 w-12 rounded bg-slate-100 animate-pulse" />
            </div>
            <div className="space-y-3 pt-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="size-11 rounded-full bg-slate-100 animate-pulse" />
                    <div className="space-y-1.5">
                      <div className="h-4 w-28 rounded bg-slate-200 animate-pulse" />
                      <div className="h-3 w-20 rounded bg-slate-100 animate-pulse" />
                    </div>
                  </div>
                  <div className="h-4 w-20 rounded bg-slate-100 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Nav Skeleton */}
      <BottomNavigation />
    </div>
  );
}
