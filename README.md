# Frontend Technical Assessment — Monorepo

Repositori ini memuat implementasi komprehensif untuk Frontend Technical Test yang dibangun menggunakan **Next.js (App Router)**, **React**, **TypeScript (Strict Mode)**, dan **Tailwind CSS**.

Seluruh modul soal disatukan dalam satu repository terstruktur dengan penekanan pada kode yang bersih, mudah dipelihara, modular, berperforma tinggi, dan bebas dari over-engineering.

---

## 🚀 Tech Stack

| Teknologi | Versi | Peran / Deskripsi |
| :--- | :--- | :--- |
| **Next.js** | 15+ (App Router) | Framework React modern untuk routing, optimasi performa, dan SSR/CSR |
| **React** | 19 | UI Library inti berbasis komponen |
| **TypeScript** | 5 (Strict Mode) | Type safety statis tanpa penggunaan `any` |
| **Tailwind CSS** | 4 | Utility-first CSS framework untuk styling yang konsisten dan responsif |
| **clsx & tailwind-merge** | Latest | Utility `cn()` helper untuk manipulasi className yang aman |
| **lucide-react** | Latest | Ikon antarmuka modern yang ringan dan ter-tree-shake |

---

## 📁 Struktur Folder

```text
frontend-technical-test/
├── app/
│   ├── layout.tsx             # Root layout (Header navigasi global, font Geist, SEO)
│   ├── globals.css            # Styling global & Tailwind directives
│   ├── page.tsx               # Hub navigasi utama / Dashboard Technical Test
│   ├── factorial/
│   │   └── page.tsx           # Halaman Soal 1: Recursive Factorial Calculator
│   ├── palindrome/
│   │   └── page.tsx           # Halaman Soal 2: Palindrome Checker
│   └── wallet/
│       ├── page.tsx           # Halaman Soal 3: CashEase E-Wallet Dashboard
│       └── transfer/
│           └── page.tsx       # Halaman Soal 3: Form Transfer Dana
├── components/
│   └── ui/                    # Reusable UI primitives (Button, Input, Card)
│       ├── button.tsx
│       ├── input.tsx
│       ├── card.tsx
│       └── index.ts
├── lib/
│   ├── types/                 # Type definitions terpusat & strict
│   │   ├── factorial.ts
│   │   ├── palindrome.ts
│   │   ├── wallet.ts
│   │   └── index.ts
│   ├── utils/                 # Helper utilities (cn helper)
│   │   └── index.ts
│   └── mocks/                 # Mock data untuk simulasi backend/API
│       └── wallet.ts
├── public/                    # Aset statis publik
├── README.md                  # Dokumentasi & panduan teknis
├── tsconfig.json              # Konfigurasi TypeScript
├── package.json               # Dependensi & script eksekusi
└── eslint.config.mjs          # Konfigurasi linter code-quality
```

---

## 🗺️ Struktur Route

| Route URL | Nama Modul | Deskripsi |
| :--- | :--- | :--- |
| `/` | **Dashboard / Hub** | Halaman utama navigasi ke seluruh modul soal |
| `/factorial` | **Soal 1 — Factorial** | Recursive Factorial Calculator |
| `/palindrome` | **Soal 2 — Palindrome** | Palindrome Checker |
| `/wallet` | **Soal 3 — CashEase Home** | Ringkasan saldo, menu cepat, & riwayat mutasi |
| `/wallet/transfer` | **Soal 3 — CashEase Transfer** | Formulir transfer dana ke sesama/rekening lain |

---

## 🛠️ Panduan Instalasi & Menjalankan Project

### Prasyarat:
- Node.js versi 18.18.0 atau lebih baru (direkomendasikan Node.js v20+)
- npm versi 9+

### Langkah-langkah:

1. **Clone repository & masuk ke direktori:**
   ```bash
   git clone <repository-url>
   cd frontend-technical-test
   ```

2. **Instalasi dependencies:**
   ```bash
   npm install
   ```

3. **Menjalankan server development:**
   ```bash
   npm run dev
   ```
   Buka browser di [http://localhost:3000](http://localhost:3000).

4. **Menjalankan type check & linting:**
   ```bash
   # Type check
   npx tsc --noEmit

   # Lint check
   npm run lint
   ```

5. **Membangun versi production (Production Build):**
   ```bash
   npm run build
   npm run start
   ```

---

## 📝 Modul Soal & Implementasi

### Soal 1 — Recursive Factorial Calculator (`/factorial`)
* **Deskripsi:** Perhitungan nilai faktorial dari angka input bilangan bulat non-negatif menggunakan fungsi rekursif murni TypeScript (`n! = n * (n - 1)!`).
* **Status:** ✅ Selesai Diimplementasikan.
* **Edge Cases Ditangani:**
  - `0! = 1` (Base case)
  - `1! = 1` (Base case)
  - Bilangan negatif (cth: `-1`) → Ditolak dengan pesan validasi yang jelas
  - Input kosong → Ditolak dengan pesan validasi yang jelas
  - Bilangan desimal (cth: `1.5`) → Ditolak dengan pesan validasi yang jelas
  - Input non-angka (cth: `abc`) → Ditolak dengan pesan validasi yang jelas
  - Limit representasi JS float (`n > 170`) → Ditolak dengan pesan peringatan batas overflow JavaScript

---

### Soal 2 — Palindrome Checker (`/palindrome`)
* **Deskripsi:** Pengecekan keaslian kata atau kalimat palindrome dengan normalisasi huruf kecil (*case-insensitive*), penghapusan spasi serta karakter simbol/tanda baca (`/[^a-z0-9]/g`), dan dieksekusi dengan algoritma *Two-Pointer* $O(n)$.
* **Status:** ✅ Selesai Diimplementasikan.
* **Kriteria & Pengujian:**
  - Case-insensitive (cth: `"Race Car"` → Palindrome)
  - Mengabaikan spasi & tanda baca (cth: `"A man, a plan, a canal: Panama"` → Palindrome)
  - Kalimat bukan palindrome (cth: `"Hello World"` → Bukan Palindrome)
  - Deteksi kalimat baku (cth: `"Kasur ini rusak"` → Palindrome)
  - Validasi input kosong atau string tanpa alfanumerik → Menampilkan pesan error yang jelas

---

### Soal 3 — CashEase E-Wallet (`/wallet` & `/wallet/transfer`)
* **Deskripsi:** Fitur aplikasi dompet digital interaktif:
  - **Halaman Utama (`/wallet`):** ✅ Selesai Diimplementasikan (Figma Node `1:243`). Memuat status bar, header logo & points badge, saldo dengan toggle visibility, main action menu (Transfer, Top Up, Withdraw, More), section *Send Again* dengan scrolling horizontal dan tombol *Add New*, daftar *Latest Transaction* dengan formatting nominal positif (hijau) & negatif (merah), simulated REST API delay 1200ms, loading skeleton UI, error state dengan tombol retry, serta penanganan empty state.
  - **Halaman Transfer (`/wallet/transfer`):** ✅ Selesai Diimplementasikan (Figma Node `1:244`). Memuat pemilihan kontak penerima tersimpan dengan status verifikasi, input nominal Rupiah dinamis, validasi saldo (`amount <= balance`), quick preset nominal (50k, 100k, 250k, 500k, 1jt), input catatan opsional, tombol submit dengan simulated REST API delay 1000ms, serta modal receipt konfirmasi transfer sukses lengkap dengan nomor transaksi dan biaya admin Rp 0.

---

### Soal 4 — Performance Case Study
* **Deskripsi:** Studi kasus analisis performa aplikasi web modern dan strategi mitigasinya.
* **Status:** Dokumen analisis akan dilengkapi pada bagian ini. *(Placeholder)*

---

## 🤖 AI Usage Disclosure

Dalam pengerjaan technical test ini:
- **Alat Bantu AI yang Digunakan:** Antigravity AI Assistant.
- **Tujuan Penggunaan:** Membantu scaffolding project, pembuatan boilerplate arsitektur awal (Next.js, TypeScript types, Tailwind styling, UI primitives), serta formatting dokumentasi teknis.
- **Verifikasi Mandiri:** Seluruh arsitektur, logic type definitions, integrasi styling, dan standar penulisan kode telah ditinjau dan divalidasi secara manual agar memenuhi standar kualitas engineering tingkat senior (clean, minimal, type-safe, dan tanpa over-engineering).
