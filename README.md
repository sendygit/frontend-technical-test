# Frontend Technical Assessment

Repositori ini memuat implementasi komprehensif untuk Frontend Technical Test yang dibangun menggunakan **Next.js (App Router)**, **React**, **TypeScript (Strict Mode)**, dan **Tailwind CSS**.

Seluruh modul soal disatukan dalam satu repository terstruktur dengan fokus pada clean, maintainable, dan modular code, optimal performance, serta menghindari over-engineering.

---

## Tech Stack

| Teknologi                 | Versi            | Peran / Deskripsi                                                      |
| :------------------------ | :--------------- | :--------------------------------------------------------------------- |
| **Next.js**               | 15+ (App Router) | Framework React modern untuk routing, optimasi performa, dan SSR/CSR   |
| **React**                 | 19               | UI Library inti berbasis komponen                                      |
| **TypeScript**            | 5 (Strict Mode)  | Type safety statis tanpa penggunaan `any`                              |
| **Tailwind CSS**          | 4                | Utility-first CSS framework untuk styling yang konsisten dan responsif |
| **clsx & tailwind-merge** | Latest           | Utility `cn()` helper untuk manipulasi className yang aman             |
| **lucide-react**          | Latest           | Ikon antarmuka modern yang ringan dan ter-tree-shake                   |

---

## Struktur Folder

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

## Struktur Route

| Route URL          | Nama Modul                     | Deskripsi                                      |
| :----------------- | :----------------------------- | :--------------------------------------------- |
| `/`                | **Dashboard / Hub**            | Halaman utama navigasi ke seluruh modul soal   |
| `/factorial`       | **Soal 1 — Factorial**         | Recursive Factorial Calculator                 |
| `/palindrome`      | **Soal 2 — Palindrome**        | Palindrome Checker                             |
| `/wallet`          | **Soal 3 — CashEase Home**     | Ringkasan saldo, menu cepat, & riwayat mutasi  |
| `/wallet/transfer` | **Soal 3 — CashEase Transfer** | Formulir transfer dana ke sesama/rekening lain |

---

## Panduan Instalasi & Menjalankan Project

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

## Modul Soal & Implementasi

### Soal 1 — Recursive Factorial Calculator (`/factorial`)

- **Deskripsi:** Perhitungan nilai faktorial dari angka input bilangan bulat non-negatif menggunakan fungsi rekursif murni TypeScript (`n! = n * (n - 1)!`).
- **Edge Cases Ditangani:**
  - `0! = 1` (Base case)
  - `1! = 1` (Base case)
  - Bilangan negatif (cth: `-1`) → Ditolak dengan pesan validasi yang jelas
  - Input kosong → Ditolak dengan pesan validasi yang jelas
  - Bilangan desimal (cth: `1.5`) → Ditolak dengan pesan validasi yang jelas
  - Input non-angka (cth: `abc`) → Ditolak dengan pesan validasi yang jelas
  - Limit representasi JS float (`n > 170`) → Ditolak dengan pesan peringatan batas overflow JavaScript

---

### Soal 2 — Palindrome Checker (`/palindrome`)

- **Deskripsi:** Pengecekan keaslian kata atau kalimat palindrome dengan normalisasi huruf kecil (_case-insensitive_), penghapusan spasi serta karakter simbol/tanda baca (`/[^a-z0-9]/g`), dan dieksekusi dengan algoritma _Two-Pointer_ $O(n)$.
- **Kriteria & Pengujian:**
  - Case-insensitive (cth: `"Race Car"` → Palindrome)
  - Mengabaikan spasi & tanda baca (cth: `"A man, a plan, a canal: Panama"` → Palindrome)
  - Kalimat bukan palindrome (cth: `"Hello World"` → Bukan Palindrome)
  - Deteksi kalimat baku (cth: `"Kasur ini rusak"` → Palindrome)
  - Validasi input kosong atau string tanpa alfanumerik → Menampilkan pesan error yang jelas

---

### Soal 3 — CashEase E-Wallet (`/wallet` & `/wallet/transfer`)

- **Deskripsi:** Fitur aplikasi dompet digital interaktif:
  - **Halaman Utama (`/wallet`):** ✅ Selesai Diimplementasikan (Figma Node `1:243`). Memuat status bar, header logo & points badge, saldo dengan toggle visibility, main action menu (Transfer, Top Up, Withdraw, More), section _Send Again_ dengan scrolling horizontal dan tombol _Add New_, daftar _Latest Transaction_ dengan formatting nominal positif (hijau) & negatif (merah), simulated REST API delay 1200ms, loading skeleton UI, error state dengan tombol retry, serta penanganan empty state.
  - **Halaman Transfer (`/wallet/transfer`):** ✅ Selesai Diimplementasikan (Figma Node `1:244`). Memuat pemilihan kontak penerima tersimpan dengan status verifikasi, input nominal Rupiah dinamis, validasi saldo (`amount <= balance`), quick preset nominal (50k, 100k, 250k, 500k, 1jt), input catatan opsional, tombol submit dengan simulated REST API delay 1000ms, serta modal receipt konfirmasi transfer sukses lengkap dengan nomor transaksi dan biaya admin Rp 0.

---

### Soal 4 — Studi Kasus Performa (Performance Case Study)

> **Skenario:** API hanya membutuhkan waktu respons ~200 ms, namun halaman membutuhkan 5–8 detik untuk dimuat sepenuhnya.

---

#### 1. Titik Awal Pengecekan (Root Cause Investigation)

Langkah pertama adalah membuka **Chrome DevTools** pada tab **Network** dan **Performance** untuk menganalisis di mana waktu 5–8 detik tersebut terkuras:

- **JavaScript execution & Long Tasks:** Skrip blocking di main thread browser.
- **Rendering & Painting:** Layout recalculation, reflow berlebihan, atau rendering DOM tree yang terlalu dalam.
- **Network Request Overhead:** Jumlah request asset yang terlalu banyak (request waterfall) atau chain fetching beruntun.
- **Ukuran Bundle:** Ukuran file JavaScript/CSS yang terlalu besar (unminified / uncompressed).
- **Aset Media:** Ukuran gambar, ikon SVG kompleks, atau font yang belum dioptimasi.
- **Post-fetch Client Processing:** Adanya manipulasi data / komputasi berat di client-side (seperti parsing data besar, filtering array ribuan item) setelah respons API diterima.

---

#### 2. Membedakan Bottleneck Frontend vs Backend

Untuk memastikan sumber bottleneck secara terisolasi:

1. **Analisis Timing di Chrome DevTools Network Tab:**
   - Periksa metrik **TTFB (Time to First Byte)** dan **Download Time** pada request API.
   - Jika API: `Request → Response = ~200 ms`, namun browser membutuhkan beberapa detik setelahnya sebelum UI tampil, maka **bottleneck berada di sisi Frontend**.
2. **Validasi Eksternal (API Isolation):**
   - Lakukan pengujian endpoint secara independen menggunakan **Postman** atau **cURL**.
   - Jika respons tetap konsisten ~200 ms, hal ini memvalidasi bahwa backend / database sehat dan isu murni terjadi di browser rendering/lifecycle client.

---

#### 3. Tools Diagnostik & Analisis

| Tool                              | Fungsi & Metrik yang Dianalisis                                                                                                                                                  |
| :-------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Chrome DevTools (Network)**     | Request waterfall, ukuran payload aset (JS/CSS/Image), HTTP headers, compression (Gzip/Brotli), dan request chaining/duplikasi.                                                  |
| **Chrome DevTools (Performance)** | Main thread activity, deteksi **Long Tasks (>50ms)**, scripting time, layout/reflow duration, serta painting/composite overhead.                                                 |
| **Lighthouse**                    | Audit Core Web Vitals menyeluruh: **LCP** (Largest Contentful Paint), **CLS** (Cumulative Layout Shift), **INP** (Interaction to Next Paint), dan **TBT** (Total Blocking Time). |
| **React DevTools Profiler**       | _(Advanced)_ Melacak frekuensi render komponen, durasi commit, serta penyebab component re-render.                                                                               |
| **Next.js Bundle Analyzer**       | _(Advanced)_ Visualisasi ukuran bundle per modul/halaman pasca-build.                                                                                                            |

---

#### 4. Checklist Analisis di Chrome DevTools

- **Tab Network:**
  - [x] **Request Waterfall:** Memeriksa apakah ada _waterfall requests_ (request baru jalan setelah request lain selesai).
  - [x] **API Timing:** Memastikan durasi DNS lookup, initial connection, TTFB, dan content download.
  - [x] **Response Size & Compression:** Memastikan aset terkompresi (Brotli/Gzip) dan cache header (`Cache-Control`) terpasang.
  - [x] **JavaScript & CSS Chunk Size:** Mengecek file `.js` atau `.css` berukuran ratusan KB/MB yang memblokir rendering.
  - [x] **Duplicate Requests:** Memastikan tidak ada double fetch (misal akibat `useEffect` tanpa cleanup atau re-render loop).

- **Tab Performance:**
  - [x] **Record Page Load:** Merekam jejak loading halaman sejak navigasi awal hingga _idle state_.
  - [x] **Identifikasi Long Tasks:** Menemukan blok bar merah (tasks > 50ms) yang membekukan main thread.
  - [x] **Flamechart Deep Dive:** Melacak function call spesifik dari JavaScript execution yang memakan waktu terlama.
  - [x] **Excessive Layout/Painting:** Mendeteksi layout thrashing (recalculating style berulang kali dalam satu frame).

---

#### 5. Analisis & Optimasi JavaScript Bundle di Next.js

Untuk membedah ukuran bundle JavaScript Next.js:

1. Pasang package `@next/bundle-analyzer`:
   ```bash
   npm install --save-dev @next/bundle-analyzer
   ```
2. Konfigurasikan pada `next.config.ts`:

   ```typescript
   import withBundleAnalyzer from "@next/bundle-analyzer";

   const bundleAnalyzer = withBundleAnalyzer({
     enabled: process.env.ANALYZE === "true",
   });

   export default bundleAnalyzer(nextConfig);
   ```

3. Jalankan production build dengan analyzer flag:
   ```bash
   ANALYZE=true npm run build
   ```
4. **Strategi Mitigasi Berdasarkan Hasil Visualisasi Analyzer:**
   - **Dynamic Import / Lazy Loading (`next/dynamic`):** Memisahkan komponen berat (misal: visual chart, PDF viewer, map renderer, modal) agar hanya di-load saat dibutuhkan (`ssr: false` jika murni client-side).
   - **Code Splitting:** Memecah rute dan fitur besar menjadi sub-chunks terpisah.
   - **Pruning / Tree-shaking Dependency:** Mengganti library monolitik besar dengan alternatif modular yang lebih ringan (misal: `lodash-es` daripada `lodash`, date utilities modular, atau ikon individual dari `lucide-react`).

---

#### 6. Deteksi & Mitigasi Unnecessary Re-render (React)

1. **Investigasi Menggunakan React DevTools Profiler:**
   - Rekam interaksi saat halaman dimuat atau state berubah.
   - Periksa panel _"Flamegraph"_ dan _"Ranked Chart"_ untuk menemukan komponen dengan waktu render terlama dan frekuensi render tertinggi.
   - Aktifkan fitur _"Highlight updates when components render"_ di settings React DevTools untuk melihat visualisasi komponen mana yang berkedip/re-render.
   - Cek root cause render pada bar info: _"Why did this render?"_ (misal: props change, hook change, atau parent re-render).

2. **Strategi Solusi & Optimasi:**
   - **State Colocation:** Memindahkan local state sedekat mungkin ke komponen yang membutuhkan alih-alih meletakkannya di root/parent context.
   - **Komposisi Komponen (Component Composition):** Memanfaatkan pattern `children` atau memecah komponen besar menjadi komponen atomik yang independen.
   - **Memoization Terukur:**
     - Gunakan `React.memo` untuk komponen leaf murni yang berat dan sering terpicu re-render oleh parent.
     - Gunakan `useMemo` untuk komputasi atau transformasi data array/object yang mahal.
     - Gunakan `useCallback` untuk menjaga stabilitas referensi handler function yang di-pass ke memoized child components.
       > **Prinsip Utama:** _Profiling First, Optimize Second._ Hindari pemakaian `useMemo`/`useCallback` secara prematur tanpa bukti profiling nyata, guna menghindari overhead alokasi memori yang tidak perlu.

---

#### 7. Refleksi Pengalaman Nyata — Proyek SARAS (Real-World Case)

Pada proyek **SARAS**, saya mengembangkan Dashboard kompleks yang mengintegrasikan beberapa modul komputasi berat secara bersamaan: **Leaflet Map**, visualisasi data **Chart.js**, komunikasi real-time via **WebSocket**, serta **data agregasi dashboard**.

Berikut pendekatan optimasi arsitektural yang saya terapkan:

- **Penyederhanaan Endpoint (Batching API):** Menggabungkan multiple query data dashboard ke dalam satu endpoint agregasi `/dashboard` guna mengeliminasi network round-trip overhead.
- **Debouncing Input Filter (300 ms):** Mencegah spam request dan re-rendering beruntun saat pengguna mengubah parameter filter dashboard.
- **On-demand Data Fetching:** Data detail status hanya di-fetch ketika modal/drawer dibuka oleh pengguna, bukan di-load semua di awal (_eager loading_).
- **Hybrid Real-Time Pipeline:** Initial dataset di-load via REST API, kemudian perubahan state berikutnya di-stream secara diferensial via WebSocket.
- **Optimasi Canvas Rendering:** Mengaktifkan opsi `preferCanvas` pada Leaflet Map untuk meningkatkan performa rendering ribuan titik koordinat di browser.
- **Marker Reuse vs Recreation:** Menggunakan method `setLatLng()` pada instance marker yang sudah ada daripada menghancurkan (_destroy_) dan membuat ulang (_instantiate_) elemen DOM marker setiap kali ada data baru.
- **Debounced Viewport Calculation:** Memberikan jeda debounce 300 ms pada fungsi `fitBounds` map saat update titik lokasi.
- **Isolasi State Timer:** Memisahkan state countdown/timer real-time ke dalam sub-komponen terisolasi, sehingga tick update setiap 1 detik tidak memicu re-render pada Canvas Map maupun Chart.
- **Proper Resource Cleanup:** Menerapkan cleanup function di `useEffect` untuk membersihkan WebSocket subscription, interval timer, dan melepaskan (_destroy_) instance Leaflet/Chart saat komponen unmount guna mencegah memory leak.

> **Pendekatan Metrik & Validasi Data:**
> Pada proyek SARAS, langkah-langkah optimasi di atas diterapkan sejak tahap desain arsitektur awal (_built-in performance_).
> Jika dihadapkan pada skenario perbaikan sistem _production existing_, metodologi yang saya gunakan adalah **menetapkan Baseline Metrik terlebih dahulu** (menggunakan Lighthouse, Chrome DevTools Performance, Network waterfall, dan React Profiler), mengeksekusi targeted fixes, dan **membandingkan data Before vs After secara kuantitatif** untuk memastikan peningkatan performa dapat dibuktikan secara terukur, bukan sekadar asumsi subjektif.

---

## Kebijakan & Pengungkapan Penggunaan AI (AI Usage Disclosure)

Proyek ini dikerjakan dengan bantuan AI (**Antigravity AI Assistant**) sebagai pair-programming dan productivity tool.

AI digunakan untuk membantu proses eksplorasi solusi, scaffolding, review implementasi, penyesuaian UI terhadap desain Figma, serta penyusunan dokumentasi.

Seluruh hasil yang dihasilkan dengan bantuan AI telah saya review, uji, dan pahami. Saya bertanggung jawab terhadap kode, arsitektur, dan keputusan teknis yang terdapat di repository ini, serta siap menjelaskannya pada sesi **Demo & Code Defense**.

---

### 1. Rincian Pemanfaatan AI per Modul

| Modul / Bagian               | Bantuan AI                                                                                                                        | Kontribusi & Validasi Kandidat                                                                                                                                                     |
| :--------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Arsitektur & Scaffolding** | Membantu pembuatan boilerplate Next.js App Router, TypeScript interfaces, reusable UI primitives, dan helper `cn()`.              | Menentukan struktur direktori, konvensi penamaan, component architecture, serta memastikan typing tetap strict dan tidak menggunakan `any` yang tidak diperlukan.                  |
| **Soal 1 — Factorial**       | Membantu review edge case dan batas numerik JavaScript.                                                                           | Menentukan dan memahami implementasi fungsi rekursif, validasi input, penanganan `0!`, input negatif, desimal, dan input kosong.                                                   |
| **Soal 2 — Palindrome**      | Membantu review pendekatan normalisasi string dan algoritma pengecekan palindrome.                                                | Mengimplementasikan dan memahami normalisasi input, case-insensitive comparison, serta algoritma Two-Pointer.                                                                      |
| **Soal 3 — CashEase Wallet** | Membantu menerjemahkan desain Figma menjadi struktur komponen React/Tailwind, membuat mock data/service, dan melakukan review UI. | Menentukan component architecture, state flow, validasi transfer, loading/error/empty states, responsive behavior, serta melakukan testing dan penyesuaian visual terhadap desain. |
| **Soal 4 — Case Study**      | Membantu merapikan struktur dan formatting dokumentasi teknis.                                                                    | Menentukan substansi analisis performa, tools yang digunakan, strategi optimasi, serta contoh pengalaman nyata dari proyek SARAS.                                                  |

---

### 2. Contoh Prompt yang Digunakan

Berikut beberapa contoh prompt yang digunakan selama proses pengerjaan:

#### A. Scaffolding UI Primitives & Types

> _"Buatkan UI primitives (Button, Input, Card) menggunakan Tailwind CSS dan helper `cn()` yang reusable serta type-safe di Next.js App Router."_

#### B. Review Algoritma & Edge Cases

> _"Bantu review edge case untuk fungsi rekursif faktorial di TypeScript. Bagaimana penanganan terbaik untuk input negatif, float, dan batas limit floating point JavaScript?"_

#### C. Implementasi CashEase

> _"Bantu terjemahkan layout Figma CashEase menjadi komponen React responsif dengan Tailwind CSS, termasuk penanganan loading state, error state, empty state, dan mock API."_

#### D. Review Responsive

> _"Review seluruh halaman CashEase pada viewport 375px, 390px, dan 430px. Identifikasi horizontal overflow, fixed width yang bermasalah, spacing yang tidak konsisten, dan layout yang tidak responsif. Berikan perbaikan menggunakan Tailwind CSS tanpa mengubah business flow."_

#### E. Dokumentasi Soal 4

> _"Rapikan poin-poin analisis studi kasus performa Network, Chrome DevTools, Bundle Analyzer, React Profiler, dan studi kasus proyek SARAS ke dalam format GitHub Markdown yang terstruktur."_
