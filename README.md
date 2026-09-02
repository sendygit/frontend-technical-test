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
* **Deskripsi:** Perhitungan nilai faktorial dari angka input positif menggunakan algoritma rekursif murni.
* **Status:** Fondasi routing dan types siap. *(Placeholder)*

---

### Soal 2 — Palindrome Checker (`/palindrome`)
* **Deskripsi:** Pengecekan kata atau kalimat palindrome dengan normalisasi huruf kecil, penghapusan karakter khusus/spasi, serta riwayat pengecekan.
* **Status:** Fondasi routing dan types siap. *(Placeholder)*

---

### Soal 3 — CashEase E-Wallet (`/wallet` & `/wallet/transfer`)
* **Deskripsi:** Fitur aplikasi dompet digital interaktif:
  - **Halaman Utama (`/wallet`):** Menampilkan profil pengguna, ringkasan saldo terkini, aksi cepat, dan riwayat transaksi.
  - **Halaman Transfer (`/wallet/transfer`):** Formulir pengiriman saldo ke daftar kontak/nomor rekening tujuan dengan validasi kecukupan saldo dan feedback status transaksi.
* **Status:** Fondasi routing, types, mocks, dan UI primitives siap. *(Placeholder)*

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
