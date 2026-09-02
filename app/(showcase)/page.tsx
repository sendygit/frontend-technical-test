import Link from "next/link";
import { ArrowRight, Calculator, CheckCircle2, Wallet, Gauge, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const sections = [
    {
      id: "soal-1",
      number: "Soal 1",
      title: "Factorial Calculator",
      description:
        "Fungsi rekursif & iteratif untuk menghitung faktorial angka secara akurat dengan penanganan batas BigInt dan validasi input negatif.",
      href: "/factorial",
      icon: Calculator,
      badge: "Algorithm & Logic",
      actions: [{ label: "Buka Kalkulator", href: "/factorial", variant: "primary" as const, isExternal: false }],
    },
    {
      id: "soal-2",
      number: "Soal 2",
      title: "Palindrome Validator",
      description:
        "Algoritma two-pointer untuk memvalidasi teks palindrom dengan normalisasi karakter alfanumerik (case-insensitive & spasi diabaikan).",
      href: "/palindrome",
      icon: CheckCircle2,
      badge: "String Processing",
      actions: [{ label: "Buka Validator", href: "/palindrome", variant: "primary" as const, isExternal: false }],
    },
    {
      id: "soal-3",
      number: "Soal 3",
      title: "CashEase E-Wallet",
      description:
        "Aplikasi dompet digital modern (Mobile-First SPA) dengan ringkasan saldo, kontak transfer, dan alur transfer dana.",
      href: "/wallet",
      icon: Wallet,
      badge: "Standalone Mobile App",
      actions: [
        { label: "Open CashEase (Tab Baru)", href: "/wallet", variant: "primary" as const, isExternal: true },
      ],
    },
    {
      id: "soal-4",
      number: "Soal 4",
      title: "Performance Case Study",
      description:
        "Analisis performa mendalam, strategi optimasi rendering, lazy loading, dan caching yang didokumentasikan pada README.md.",
      href: "#",
      icon: Gauge,
      badge: "Architecture & Optimization",
      externalNote: "Tersedia di README.md",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
          <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
          Frontend Technical Assessment
        </div>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
          Technical Test Navigation Hub
        </h1>
        <p className="mt-3 max-w-2xl text-base text-slate-600 dark:text-slate-300">
          Repositori monorepo terstruktur untuk seluruh modul technical assessment. Dibangun dengan Next.js App Router, TypeScript murni (strict mode), dan Tailwind CSS.
        </p>

        <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
          <span className="rounded-md bg-slate-100 px-2.5 py-1 dark:bg-slate-800">Next.js 15+</span>
          <span className="rounded-md bg-slate-100 px-2.5 py-1 dark:bg-slate-800">React 19</span>
          <span className="rounded-md bg-slate-100 px-2.5 py-1 dark:bg-slate-800">TypeScript (Strict)</span>
          <span className="rounded-md bg-slate-100 px-2.5 py-1 dark:bg-slate-800">Tailwind CSS</span>
        </div>
      </div>

      {/* Grid of Sections */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.id} className="flex flex-col justify-between hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    {section.number}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {section.badge}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/80 dark:text-blue-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                </div>
                <CardDescription className="pt-2 text-sm leading-relaxed">
                  {section.description}
                </CardDescription>
              </CardHeader>

              <CardFooter className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4 dark:border-slate-800/80">
                {section.actions ? (
                  section.actions.map((act) =>
                    act.isExternal ? (
                      <a
                        key={act.href}
                        href={act.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                      >
                        <Button variant={act.variant} size="sm">
                          {act.label}
                          <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                        </Button>
                      </a>
                    ) : (
                      <Link key={act.href} href={act.href} className="inline-block">
                        <Button variant={act.variant} size="sm">
                          {act.label}
                          <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                        </Button>
                      </Link>
                    )
                  )
                ) : (
                  <span className="text-xs font-medium text-slate-500 italic">
                    {section.externalNote}
                  </span>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
