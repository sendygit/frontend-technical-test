/**
 * Menghitung nilai faktorial n (n!) secara rekursif.
 * 
 * Konsep:
 * - Base Case: Jika n === 0 atau n === 1, kembalikan nilai 1.
 * - Recursive Step: Jika n > 1, kembalikan n * calculateFactorial(n - 1).
 * 
 * @param n Bilangan bulat non-negatif
 * @returns Nilai n!
 */
export function calculateFactorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) {
    throw new Error("Input harus berupa bilangan bulat non-negatif.");
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * calculateFactorial(n - 1);
}

export interface FactorialValidationResult {
  isValid: boolean;
  value?: number;
  error?: string;
}

/**
 * Memvalidasi input string dari user sebelum dilakukan perhitungan faktorial.
 */
export function validateFactorialInput(rawInput: string): FactorialValidationResult {
  const trimmed = rawInput.trim();

  // Edge case: Input kosong
  if (trimmed === "") {
    return {
      isValid: false,
      error: "Input tidak boleh kosong. Masukkan bilangan bulat non-negatif.",
    };
  }

  // Edge case: Input bukan angka (misal: 'abc', '12a')
  // Number() atau regex pengecekan angka
  const parsed = Number(trimmed);
  if (Number.isNaN(parsed) || isNaN(parsed)) {
    return {
      isValid: false,
      error: "Input tidak valid. Harap masukkan angka saja.",
    };
  }

  // Edge case: Bilangan desimal (misal: 1.5)
  if (!Number.isInteger(parsed)) {
    return {
      isValid: false,
      error: "Input tidak valid. Faktorial hanya berlaku untuk bilangan bulat (integer), bukan desimal.",
    };
  }

  // Edge case: Bilangan negatif (misal: -1)
  if (parsed < 0) {
    return {
      isValid: false,
      error: "Input tidak valid. Faktorial tidak terdefinisi untuk bilangan negatif.",
    };
  }

  // Edge case: Limit Number JavaScript (n > 170 menghasilkan Infinity pada 64-bit float)
  if (parsed > 170) {
    return {
      isValid: false,
      error: "Nilai terlalu besar (maksimum 170) karena melebihi batas batas representasi angka numerik JavaScript (Infinity).",
    };
  }

  return {
    isValid: true,
    value: parsed,
  };
}

/**
 * Menghasilkan visualisasi string langkah perkalian faktorial (misal: "6 × 5 × 4 × 3 × 2 × 1").
 */
export function getFactorialFormula(n: number): string {
  if (n === 0) return "1 (Definisi: 0! = 1)";
  if (n === 1) return "1";
  if (n > 15) {
    // Jika n terlalu panjang untuk ditampilkan semua, ringkas representasinya
    return `${n} × ${n - 1} × ... × 2 × 1`;
  }
  const factors: number[] = [];
  for (let i = n; i >= 1; i--) {
    factors.push(i);
  }
  return factors.join(" × ");
}
