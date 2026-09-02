import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function ShowcaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg tracking-tight hover:opacity-80 transition-opacity"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-black text-sm">
              TT
            </div>
            <span>Frontend Tech Test</span>
          </Link>

          <nav className="flex items-center gap-1 sm:gap-2 text-sm font-medium">
            <Link
              href="/factorial"
              className="rounded-md px-3 py-1.5 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            >
              1. Factorial
            </Link>
            <Link
              href="/palindrome"
              className="rounded-md px-3 py-1.5 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            >
              2. Palindrome
            </Link>
            <a
              href="/wallet"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-3 py-1.5 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 flex items-center gap-1.5"
            >
              <span>3. CashEase</span>
              <ExternalLink className="size-3.5 text-slate-400" />
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1 py-8 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <div className="mx-auto max-w-6xl px-4">
          Frontend Technical Assessment Foundation &bull; Next.js App Router &bull; TypeScript &bull; Tailwind CSS
        </div>
      </footer>
    </div>
  );
}
