/**
 * Membersihkan string dengan mengubah ke huruf kecil dan menghapus karakter non-alfanumerik.
 */
export function cleanString(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/**
 * Memeriksa apakah suatu teks merupakan palindrome menggunakan algoritma Two-Pointer.
 */
export function isPalindrome(value: string): boolean {
  const cleaned = cleanString(value);
  if (cleaned.length === 0) return false;

  let left = 0;
  let right = cleaned.length - 1;

  while (left < right) {
    if (cleaned[left] !== cleaned[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}
