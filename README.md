# 🏕️ Petualangan Dunia Rekreasi (Avontuur in Recreatie)

Sebuah aplikasi web interaktif edukatif yang dirancang untuk memperkenalkan berbagai jalur karier di industri rekreasi dan pariwisata. Menggunakan pendekatan *fail-forward* (tanpa sistem penalti), pengguna dapat bereksplorasi dan belajar melalui *mini-games* interaktif bersama mentor virtual.

## ✨ Fitur Utama
- **Multi-Bahasa (i18n):** Mendukung Bahasa Belanda (NL) sebagai *default* dan Bahasa Indonesia (ID) yang dapat diubah secara *real-time*.
- **4 Bidang Karier Interaktif:** Hospitality, Teknik & Pemeliharaan, Marketing & Event, serta Alam & Keselamatan.
- **Fail-Forward Gameplay:** Tidak ada *Game Over*. Pengguna bebas bereksperimen dan belajar dari kesalahan tanpa takut mendapat penalti.
- **UI/UX Responsif & Tegas:** Desain *chunky-border* dan *hard shadow* yang modern dan ramah pengguna.
- **Progress Sync:** Menggunakan Supabase untuk menyimpan progres area mana saja yang sudah diselesaikan oleh pengguna.

## 🛠️ Tech Stack
- **Frontend:** React.js, Tailwind CSS
- **Backend/Database:** Supabase
- **Deployment:** Vercel

---

## 🗺️ Alur Aplikasi (User Flow)
*Bagian ini dapat digunakan sebagai referensi utama untuk pembuatan Flowchart sistem.*

1. **[Start] Akses Aplikasi**
   - Pengguna membuka *link* Vercel.
   - Sistem memuat UI utama.

2. **[Proses] Pemilihan Bahasa**
   - Sistem membaca *state* bahasa *default* (NL).
   - *Decision:* Apakah pengguna mengeklik *toggle* bahasa?
     - Jika Ya -> Ubah *state* ke (ID), *render* ulang seluruh teks komponen.
     - Jika Tidak -> Lanjut dengan bahasa saat ini.

3. **[Menu Utama] Pemilihan Bidang Karier (Field Selector)**
   - Menampilkan 4 opsi pintu karier: Hospitality, Teknik, Marketing, Alam.
   - *Decision:* Pengguna memilih salah satu pintu.
     - Sistem memuat data bidang (`fields.js`) sesuai pilihan.

4. **[Proses] Sesi Dialog Mentor (Dialogue Box)**
   - Sistem memunculkan karakter mentor terkait (contoh: Kak Nara untuk Hospitality).
   - Menampilkan narasi pengantar dan instruksi tugas menggunakan elemen *emote* dinamis.
   - Pengguna menekan tombol "Lanjut" untuk masuk ke *puzzle*.

5. **[Interaksi] Sesi Mini-Game (Berdasarkan Pilihan Bidang)**
   - **Tipe A (Hospitality):** *Matching Puzzle* -> Pengguna mencocokkan situasi tamu dengan tindakan yang tepat.
   - **Tipe B (Teknik):** *Sequence Puzzle* -> Pengguna menyusun urutan langkah perbaikan genset.
   - **Tipe C (Marketing):** *Word Order Puzzle* -> Pengguna menyusun acakan kata menjadi kalimat promo.
   - **Tipe D (Alam):** *Hotspot Puzzle* -> Pengguna mencari dan mengeklik 3 titik bahaya pada gambar visual.

6. **[Validasi] Sistem Fail-Forward**
   - *Decision:* Apakah jawaban/interaksi pengguna benar?
     - Jika Salah -> Berikan efek visual/animasi (misal: warna merah sejenak, atau diam), reset pilihan, **tanpa mengurangi nyawa**. Pengguna mencoba lagi.
     - Jika Benar -> Lanjut ke tahap berikutnya.

7. **[Output] Feedback & Edukasi**
   - Menampilkan pesan apresiasi dan wawasan/fakta menarik mengenai bidang karier tersebut.
   - Supabase menyimpan progres (`completed: true` untuk bidang tersebut).

8. **[Looping / End] Pengecekan Progres**
   - Sistem mengecek total bidang yang telah diselesaikan.
   - *Decision:* Apakah ke-4 bidang sudah selesai?
     - Jika Belum -> Kembali ke [Menu Utama] (Langkah 3), pintu yang selesai dilabeli "SELESAI".
     - Jika Sudah -> Tampilkan pesan "Semua bidang selesai dijelajahi! 🎉" dan akses ke *link* lowongan/Open Day.
