/**
 * Memformat angka nominal menjadi format mata uang Rupiah standar (contoh: Rp 24.321.900).
 *
 * @param amount Nilai numerik nominal
 * @param showSign Jika true, menambahkan tanda + untuk angka positif atau - untuk angka negatif
 * @returns String terformat Rupiah
 */
export function formatCurrency(amount: number, showSign: boolean = false): string {
  const formatted = Math.abs(amount).toLocaleString("id-ID");
  const base = `Rp ${formatted}`;

  if (!showSign || amount === 0) {
    return base;
  }

  return amount > 0 ? `+${base}` : `-${base}`;
}
