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
import {
  calculateFactorial,
  validateFactorialInput,
  getFactorialFormula,
} from "@/lib/utils/factorial";
import {
  ArrowLeft,
  Calculator,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export default function FactorialPage() {
  const [inputValue, setInputValue] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentResult, setCurrentResult] = useState<{
    input: number;
    value: number;
    formula: string;
  } | null>(null);

  const handleCalculate = () => {
    const validation = validateFactorialInput(inputValue);

    if (!validation.isValid || validation.value === undefined) {
      setErrorMessage(validation.error || "Input tidak valid.");
      setCurrentResult(null);
      return;
    }

    try {
      setErrorMessage(null);
      const num = validation.value;
      const result = calculateFactorial(num);
      const formula = getFactorialFormula(num);

      setCurrentResult({
        input: num,
        value: result,
        formula,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan saat menghitung faktorial.";
      setErrorMessage(msg);
      setCurrentResult(null);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCalculate();
  };

  const handleReset = () => {
    setInputValue("");
    setErrorMessage(null);
    setCurrentResult(null);
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
        <span className="text-sm font-medium text-slate-500">Soal 1 &bull; Algoritma Rekursif</span>
      </div>

      {/* Header Info */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/80 dark:text-blue-400">
            <Calculator className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Recursive Factorial Calculator
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Kalkulator faktorial berbasis fungsi rekursif murni (<code className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-blue-600 dark:text-blue-400">n! = n &times; (n - 1)!</code>) dengan penanganan komprehensif terhadap edge cases.
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
              <CardTitle className="text-lg">Form Perhitungan</CardTitle>
              <CardDescription>
                Masukkan bilangan bulat positif untuk menghitung nilai faktorial.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    label="Nilai n (Bilangan Bulat Non-Negatif)"
                    placeholder="Contoh: 6"
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    error={errorMessage || undefined}
                    helperText={!errorMessage ? "Menerima bilangan bulat n ≥ 0 (maks. 170)" : undefined}
                    autoComplete="off"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <Button type="submit" variant="primary" size="md">
                    <Sparkles className="h-4 w-4" />
                    Hitung Faktorial
                  </Button>
                  {(inputValue !== "" || currentResult !== null || errorMessage !== null) && (
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

          {/* Result Card */}
          {currentResult && (
            <Card className="border-blue-200 bg-blue-50/40 dark:border-blue-900/60 dark:bg-blue-950/20">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-semibold text-sm">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Hasil Perhitungan Faktorial</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-blue-100 pb-3 dark:border-blue-900/40">
                  <span className="text-base text-slate-600 dark:text-slate-300">
                    Notasi Matematika:
                  </span>
                  <span className="font-mono text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                    {currentResult.input}! = {currentResult.value.toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Langkah Perhitungan:
                  </span>
                  <div className="font-mono text-sm text-slate-800 dark:text-slate-200 bg-white/70 dark:bg-slate-900/70 p-3 rounded-lg border border-blue-100 dark:border-blue-900/30 overflow-x-auto">
                    {currentResult.input}! = {currentResult.formula} ={" "}
                    <strong className="text-blue-600 dark:text-blue-400">
                      {currentResult.value.toLocaleString("id-ID")}
                    </strong>
                  </div>
                </div>

                <p className="text-xs text-slate-500 pt-1">
                  &bull; Dihitung secara rekursif via <code className="font-mono">calculateFactorial({currentResult.input})</code>
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

        {/* Right Column: Code Explanation (5 cols) */}
        <div className="space-y-6 lg:col-span-5">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Aturan & Edge Cases</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">&bull;</span>
                  <span>
                    <strong>Base Case (0! & 1!):</strong> <code>0! = 1</code> dan <code>1! = 1</code>.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-red-500">&bull;</span>
                  <span>
                    <strong>Bilangan Negatif:</strong> Faktorial tidak terdefinisi pada bilangan riil negatif (menghasilkan error).
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-red-500">&bull;</span>
                  <span>
                    <strong>Bilangan Desimal:</strong> Hanya menerima integer bulat murni (misal 1.5 menghasilkan error).
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-red-500">&bull;</span>
                  <span>
                    <strong>Input Non-Angka:</strong> String kosong atau karakter alfanumerik (seperti &quot;abc&quot;) ditolak oleh validator.
                  </span>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-slate-900 p-3 text-slate-100 font-mono text-[11px] leading-relaxed dark:bg-slate-950 border border-slate-800">
                <div className="text-slate-400">{"// Recursive Logic"}</div>
                <div>function calculateFactorial(n: number): number &#123;</div>
                <div className="pl-3 text-amber-300">if (n === 0 || n === 1) return 1;</div>
                <div className="pl-3 text-emerald-300">return n * calculateFactorial(n - 1);</div>
                <div>&#125;</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
