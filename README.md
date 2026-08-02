# Jejak Karier — Petualangan di Dunia Rekreasi

Visual novel interaktif untuk memperkenalkan anak muda (12–15 tahun) pada berbagai jalur karier
di sektor rekreasi & wisata (campsite, taman rekreasi, dsb). Dibuat sebagai produk hackathon —
tinggal deploy, tidak ada placeholder.

## Cara kerja game

1. Layar awal menampilkan **4 "pintu" bidang karier** berbentuk persegi panjang vertikal berjajar
   (Hospitality, Teknik & Pemeliharaan, Event/Marketing, Alam & Keselamatan).
2. Ketuk satu pintu → panel meluas menampilkan deskripsi singkat bidang tersebut → tombol "Mulai".
3. Dialog visual novel dengan mentor (efek ketik/typewriter, tap untuk lanjut).
4. Puzzle unik per bidang:
   - **Hospitality** → *matching puzzle*: cocokkan situasi tamu dengan tindakan yang tepat.
   - **Teknik & Pemeliharaan** → *sequence puzzle*: urutkan langkah perbaikan genset dengan benar.
   - **Event & Marketing** → *word-order puzzle*: susun kata jadi caption promosi.
   - **Alam & Keselamatan** → *hotspot / point-and-click*: temukan 3 titik bahaya di area sungai.
5. Layar sukses menampilkan fakta karier singkat + tombol menuju situs lowongan resmi sektor
   rekreasi + ajakan mengecek jadwal Hari Terbuka (Open Day) terdekat.
6. Progress (bidang yang sudah selesai) tersimpan selama sesi berjalan (di memori, tanpa login).

Semua interaksi berbasis **klik/tap** (bukan drag), jadi jalan mulus di HP maupun layar besar
untuk booth/pameran (mis. LOP X).

## Menjalankan secara lokal

```bash
npm install
npm run dev
``` 

Buka `http://localhost:5173`.

## Build produksi

```bash
npm run build
npm run preview   # opsional, untuk cek hasil build
```

Hasil build ada di folder `dist/`.

## Deploy ke Vercel (via GitHub)

1. Push folder ini ke repository GitHub baru.
2. Buka [vercel.com](https://vercel.com) → **Add New Project** → pilih repo tersebut.
3. Vercel otomatis mendeteksi framework **Vite** — biarkan default:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Klik **Deploy**. Selesai — tidak perlu environment variable atau backend apa pun (100% statis).

Atau lewat CLI:

```bash
npm i -g vercel
vercel --prod
```

## Menyesuaikan konten (tanpa sentuh komponen)

Semua teks dialog, deskripsi bidang, konfigurasi puzzle, fakta karier, dan link lowongan ada
di **satu file**: `src/data/fields.js`. Untuk:

- **Ganti/tambah bidang karier** → duplikasi salah satu objek di array `FIELDS`, ubah `id`,
  `title`, `icon`, `accent` (warna hex), teks `intro`/`success`, dan `facts`.
- **Ganti link lowongan resmi** → ubah `VACANCY_URL`.
- **Ganti puzzle suatu bidang** → ubah `puzzle.type` ke salah satu dari `matching`, `sequence`,
  `wordorder`, atau `hotspot`, lalu sesuaikan field konfigurasinya (lihat contoh bidang lain
  dengan tipe yang sama).
- **Tambah tipe puzzle baru** → buat komponen baru di `src/components/puzzles/`, lalu daftarkan
  di `PUZZLE_COMPONENTS` pada `src/App.jsx`.

## Struktur proyek

```
src/
  data/fields.js              # semua konten & konfigurasi puzzle
  components/
    FieldSelector.jsx         # layar pilihan bidang (rectangle accordion)
    DialogueBox.jsx           # kotak dialog visual novel + efek ketik
    puzzles/
      MatchingPuzzle.jsx
      SequencePuzzle.jsx
      WordOrderPuzzle.jsx
      HotspotPuzzle.jsx
  App.jsx                     # state machine: select → intro → puzzle → success
index.html
tailwind.config.js             # palet warna & tipografi tema "campsite signage"
```

## Kompatibilitas perangkat

- **Ponsel pribadi**: layout responsif penuh, target sentuh besar (≥40px), tanpa drag-and-drop
  (semua puzzle berbasis tap agar nyaman di layar kecil).
- **Layar besar / kiosk (mis. booth LOP X)**: layout melebar otomatis pada breakpoint `sm:`,
  kontras tinggi supaya terbaca dari jarak, dan tidak butuh keyboard/mouse — murni sentuh atau klik.

## Catatan implementasi

- Tanpa dependency eksternal untuk drag-and-drop — semua puzzle dibuat dengan interaksi klik
  berurutan supaya ringan dan stabil di berbagai perangkat.
- Tidak ada backend/database — cocok untuk deploy statis di Vercel, dan progres cukup disimpan
  di state React selama sesi (sesuai kebutuhan demo/booth, bukan akun personal).
- Font: **Baloo 2** (display, playful) + **Manrope** (body, mudah dibaca) via Google Fonts.
- Menghormati `prefers-reduced-motion` dan menyediakan focus ring yang jelas untuk aksesibilitas.
