"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cleanString, isPalindrome } from "@/lib/utils/palindrome";
import {
  ArrowLeft,
  SpellCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RotateCcw,
  Sparkles,
} from "lucide-react";

export default function PalindromePage() {
  const [inputText, setInputText] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<{
    original: string;
    cleaned: string;
    isPalindrome: boolean;
  } | null>(null);

  const handleCheck = () => {
    const trimmed = inputText.trim();

    // Validasi input kosong
    if (!trimmed) {
      setErrorMessage("Input tidak boleh kosong. Masukkan kata atau kalimat yang ingin diperiksa.");
      setResult(null);
      return;
    }

    // Validasi apakah terdapat karakter alfanumerik setelah dibersihkan
    const cleaned = cleanString(trimmed);
    if (!cleaned) {
      setErrorMessage("Input tidak memuat karakter alfanumerik (huruf/angka) yang dapat diperiksa.");
      setResult(null);
      return;
    }

    setErrorMessage(null);
    setResult({
      original: trimmed,
      cleaned,
      isPalindrome: isPalindrome(trimmed),
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCheck();
  };

  const handleReset = () => {
    setInputText("");
    setErrorMessage(null);
    setResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link href="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Dashboard
          </Button>
        </Link>
        <span className="text-sm font-medium text-slate-500">Soal 2 &bull; String Manipulation</span>
      </div>

      {/* Header Info */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/80 dark:text-blue-400">
            <SpellCheck className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Palindrome Checker
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Pemeriksa kata atau kalimat palindrome. Pengecekan bersifat <em>case-insensitive</em> serta secara otomatis mengabaikan spasi, simbol, dan tanda baca.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Form & Result (7 cols) */}
        <div className="space-y-6 lg:col-span-7">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Form Pengecekan</CardTitle>
              <CardDescription>
                Masukkan kata atau kalimat yang ingin diuji keaslian palindromenya.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    label="Teks / Kalimat"
                    placeholder="Contoh: Kasur ini rusak / Race Car"
                    value={inputText}
                    onChange={(e) => {
                      setInputText(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    error={errorMessage || undefined}
                    helperText={!errorMessage ? "Mengabaikan huruf kapital, spasi, dan tanda baca" : undefined}
                    autoComplete="off"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <Button type="submit" variant="primary" size="md">
                    <Sparkles className="h-4 w-4" />
                    Periksa Palindrome
                  </Button>
                  {(inputText !== "" || result !== null || errorMessage !== null) && (
                    <Button
                      type="button"
                      variant="outline"
                      size="md"
                      onClick={handleReset}
                    >
                      <RotateCcw className="h-4 w-4" />
                      Reset
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Result Display */}
          {result && (
            <Card
              className={
                result.isPalindrome
                  ? "border-emerald-200 bg-emerald-50/40 dark:border-emerald-900/60 dark:bg-emerald-950/20"
                  : "border-amber-200 bg-amber-50/40 dark:border-amber-900/60 dark:bg-amber-950/20"
              }
            >
              <CardHeader className="pb-3">
                <div
                  className={`flex items-center gap-2 font-semibold text-sm ${
                    result.isPalindrome
                      ? "text-emerald-700 dark:text-emerald-400"
                      : "text-amber-700 dark:text-amber-400"
                  }`}
                >
                  {result.isPalindrome ? (
                    <>
                      <CheckCircle2 className="h-5 w-5" />
                      <span>Hasil: Teks Merupakan Palindrome</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5" />
                      <span>Hasil: Teks Bukan Palindrome</span>
                    </>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Result Status */}
                <div className="flex items-center justify-between border-b pb-3 border-slate-200/60 dark:border-slate-800">
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    Status Validasi:
                  </span>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
                      result.isPalindrome
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300"
                        : "bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300"
                    }`}
                  >
                    {result.isPalindrome ? "PALINDROME" : "BUKAN PALINDROME"}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-2 text-xs">
                  <div className="rounded-lg bg-white/80 p-3 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 space-y-2">
                    <div>
                      <span className="text-slate-400 font-medium">Teks Asli:</span>
                      <p className="font-mono text-sm text-slate-800 dark:text-slate-200 mt-0.5 break-words">
                        &quot;{result.original}&quot;
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium">
                        Teks Normalisasi (Hanya Alfanumerik Huruf Kecil):
                      </span>
                      <p className="font-mono text-sm font-semibold text-blue-600 dark:text-blue-400 mt-0.5 break-all">
                        {result.cleaned}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-500">
                  {result.isPalindrome
                    ? "✓ Karakter dibaca sama persis baik dari depan maupun dari belakang."
                    : "✕ Teks menghasilkan urutan karakter yang berbeda saat dibaca terbalik."}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Error Alert Display */}
          {errorMessage && (
            <Card className="border-red-200 bg-red-50/50 dark:border-red-900/50 dark:bg-red-950/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3 text-red-700 dark:text-red-400">
                  <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">Validasi Input Gagal</h4>
                    <p className="text-sm leading-relaxed">{errorMessage}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column: Explanation (5 cols) */}
        <div className="space-y-6 lg:col-span-5">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Kriteria & Aturan Pengecekan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">&bull;</span>
                  <span>
                    <strong>Case-Insensitive:</strong> Huruf kapital dan huruf kecil diperlakukan sama (cth: <code>&quot;Race Car&quot;</code> &rarr; <code>&quot;racecar&quot;</code>).
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">&bull;</span>
                  <span>
                    <strong>Abaikan Spasi & Punctuation:</strong> Seluruh spasi, tanda koma, titik dua, tanda seru, dll. dibersihkan via regex <code>/[^a-z0-9]/g</code>.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-emerald-600">&bull;</span>
                  <span>
                    <strong>Algoritma Two-Pointer:</strong> Karakter diperiksa dari indeks terluar (kiri & kanan) bergerak ke tengah dengan kompleksitas waktu linear <code>O(n)</code> dan ruang memori <code>O(1)</code>.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-red-500">&bull;</span>
                  <span>
                    <strong>Validasi Input Kosong:</strong> Input yang tidak memuat karakter alfanumerik akan menampilkan pesan error yang jelas.
                  </span>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-slate-900 p-3 text-slate-100 font-mono text-[11px] leading-relaxed dark:bg-slate-950 border border-slate-800">
                <div className="text-slate-400">{"// Normalization & Two-Pointer Logic"}</div>
                <div>const cleaned = text.toLowerCase().replace(/[^a-z0-9]/g, &quot;&quot;);</div>
                <div>let left = 0, right = cleaned.length - 1;</div>
                <div className="text-amber-300">while (left &lt; right) &#123;</div>
                <div className="pl-3 text-emerald-300">if (cleaned[left] !== cleaned[right]) return false;</div>
                <div className="pl-3">left++; right--;</div>
                <div className="text-amber-300">&#125;</div>
                <div>return true;</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
