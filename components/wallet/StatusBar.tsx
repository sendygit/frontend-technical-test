import { Signal, Wifi } from "lucide-react";

export function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-3.5 pb-2 text-white text-xs font-semibold select-none z-10 relative">
      <span className="text-sm font-semibold tracking-tight">9:41</span>

      {/* Status Icons */}
      <div className="flex items-center gap-2">
        <Signal className="h-3.5 w-3.5" />
        <Wifi className="h-3.5 w-3.5" />
        <div className="flex items-center">
          <div className="w-5 h-2.5 rounded-[3px] border border-white p-px flex items-center">
            <div className="h-full w-full bg-white rounded-[1px]" />
          </div>
          <div className="w-[1.5px] h-1 bg-white rounded-r-[1px] ml-[0.5px]" />
        </div>
      </div>
    </div>
  );
}
