// Semua teks & konfigurasi puzzle terpusat di sini.
// Ganti teks / tambah bidang baru cukup dengan menyunting array FIELDS di bawah.

export const MENTOR = {
  hospitality: { name: 'Kak Nara', color: '#FF6B4A', emoji: '🙋‍♀️' },
  teknik: { name: 'Om Bagas', color: '#4FB3BF', emoji: '🔧' },
  marketing: { name: 'Kak Zea', color: '#FFC145', emoji: '📣' },
  alam: { name: 'Kak Rio', color: '#5FA777', emoji: '🌲' },
}

export const FIELDS = [
  {
    id: 'hospitality',
    title: 'Hospitality & Pelayanan Tamu',
    short: 'Jadi wajah pertama yang bikin liburan tamu berkesan.',
    icon: '🏨',
    accent: '#FF6B4A',
    intro: [
      { m: 'hospitality', t: 'Halo! Aku Nara, aku kerja di bagian front office taman rekreasi ini. Setiap hari aku ketemu puluhan tamu dengan masalah yang beda-beda.' },
      { m: 'hospitality', t: 'Tugasku bukan cuma senyum di depan meja — aku harus cepat mikir, dengerin keluhan, dan kasih solusi yang tepat.' },
      { m: 'hospitality', t: 'Nih, coba bantu aku. Ada 4 tamu yang butuh bantuan sekarang. Cocokkan tiap situasi dengan tindakan yang paling pas ya!' },
    ],
    puzzle: {
      type: 'matching',
      instruction: 'Ketuk satu situasi tamu, lalu ketuk tindakan yang paling tepat untuk situasi itu.',
      pairs: [
        { left: 'Tenda keluarga bocor kena hujan semalam', right: 'Antar ke gudang & pinjamkan terpal cadangan' },
        { left: 'Anak kecil menangis, terpisah dari orang tua', right: 'Hubungi pos informasi, umumkan lewat pengeras suara' },
        { left: 'Tamu tanya jadwal aktivitas sore ini', right: 'Tunjukkan papan jadwal & bagikan brosur kegiatan' },
        { left: 'Sinyal wifi di area tenda tidak nyambung', right: 'Arahkan ke titik wifi gratis di kantin utama' },
      ],
    },
    success: [
      { m: 'hospitality', t: 'Keren, semua tamu terbantu! Ini yang bikin kerja di hospitality seru — tiap hari beda cerita, dan kamu yang bikin liburan orang jadi lebih baik.' },
      { m: 'hospitality', t: 'Kalau kamu suka ngobrol, sabar, dan cepat cari solusi, bidang ini cocok banget buat kamu.' },
    ],
    facts: [
      'Bertemu ratusan tamu dari berbagai latar belakang setiap musim liburan',
      'Melatih kemampuan komunikasi & problem-solving super cepat',
      'Bisa mulai dari kerja paruh waktu saat masih sekolah',
    ],
  },
  {
    id: 'teknik',
    title: 'Teknik & Pemeliharaan',
    short: 'Pastikan semua fasilitas aman dan berfungsi tiap hari.',
    icon: '🔧',
    accent: '#4FB3BF',
    intro: [
      { m: 'teknik', t: 'Yo! Aku Bagas, tim teknik di sini. Kalau kolam renang, genset, atau wahana rusak — aku yang turun tangan pertama.' },
      { m: 'teknik', t: 'Kerjaan teknisi itu separuh logika, separuh kehati-hatian. Salah urutan kerja, bisa bahaya!' },
      { m: 'teknik', t: 'Genset cadangan taman lagi mati. Bantu aku urutkan langkah perbaikannya dengan BENAR dan AMAN, ya.' },
    ],
    puzzle: {
      type: 'sequence',
      instruction: 'Ketuk langkah-langkah berikut sesuai urutan yang paling aman & benar.',
      steps: [
        'Matikan saklar utama sebelum memeriksa apa pun',
        'Periksa kemungkinan kebocoran bahan bakar di sekitar mesin',
        'Bersihkan / ganti filter udara yang kotor',
        'Nyalakan kembali saklar utama & uji coba mesin',
      ],
    },
    success: [
      { m: 'teknik', t: 'Mantap, genset nyala lagi dan aman! Di balik layar, tim teknik yang jaga supaya liburan semua orang tetap lancar.' },
      { m: 'teknik', t: 'Kalau kamu suka bongkar-pasang, mikir sistematis, dan senang lihat sesuatu berfungsi lagi — teknik & pemeliharaan bisa jadi jalan kariermu.' },
    ],
    facts: [
      'Kerja dengan listrik, mesin, kolam renang, sampai wahana permainan',
      'Selalu ada standar keselamatan (K3) yang wajib diikuti',
      'Banyak dibutuhkan sepanjang tahun, bukan cuma musim liburan',
    ],
  },
  {
    id: 'marketing',
    title: 'Event, Marketing & Media',
    short: 'Ciptakan cerita yang bikin orang pengen datang berkunjung.',
    icon: '📣',
    accent: '#FFC145',
    intro: [
      { m: 'marketing', t: 'Hai! Aku Zea, aku pegang konten & event di taman rekreasi ini. Foto, video, sampai promo yang kamu lihat di medsos — itu kerjaanku.' },
      { m: 'marketing', t: 'Minggu ini kita mau posting caption promosi buat event musim panas. Tapi kata-katanya masih berantakan di draf-ku!' },
      { m: 'marketing', t: 'Bantu susun ulang kata-katanya jadi kalimat promosi yang enak dibaca, yuk.' },
    ],
    puzzle: {
      type: 'wordorder',
      instruction: 'Ketuk kata-kata di bawah secara berurutan supaya membentuk kalimat promosi yang tepat.',
      target: 'Liburan seru, kenangan tak terlupakan, hanya di sini!',
    },
    success: [
      { m: 'marketing', t: 'Sip, captionnya siap posting! Kata-kata yang tepat bisa bikin ratusan orang penasaran datang berkunjung.' },
      { m: 'marketing', t: 'Kalau kamu suka nulis, motret, atau bikin video, bidang marketing & event kasih ruang buat kreativitas kamu berkembang.' },
    ],
    facts: [
      'Mengelola media sosial, foto, video, sampai event tahunan',
      'Kerja sama erat dengan semua divisi lain di taman rekreasi',
      'Kreativitas kamu langsung terlihat hasilnya oleh ribuan orang',
    ],
  },
  {
    id: 'alam',
    title: 'Alam, Aktivitas & Keselamatan',
    short: 'Jaga pengunjung tetap aman saat seru-seruan di alam.',
    icon: '🌲',
    accent: '#5FA777',
    intro: [
      { m: 'alam', t: 'Hei! Aku Rio, pemandu aktivitas luar ruang. Sebelum tamu boleh mulai kegiatan seperti kayak atau flying fox, aku wajib cek dulu area amannya.' },
      { m: 'alam', t: 'Mata yang jeli itu penting banget di kerjaan ini — satu bahaya kecil yang kelewat bisa berakibat besar.' },
      { m: 'alam', t: 'Yuk, bantu aku cek area sungai ini. Temukan 3 potensi bahaya sebelum aktivitas boleh dimulai!' },
    ],
    puzzle: {
      type: 'hotspot',
      instruction: 'Ketuk 3 titik yang menurutmu berbahaya di area ini. Hati-hati, ada titik yang aman-aman saja!',
    },
    success: [
      { m: 'alam', t: 'Sip, area sudah aman! Karena kamu teliti, semua tamu bisa main dengan tenang hari ini.' },
      { m: 'alam', t: 'Kalau kamu suka alam terbuka, olahraga, dan peduli keselamatan orang lain, bidang ini bisa jadi panggilan hidupmu.' },
    ],
    facts: [
      'Memandu aktivitas outdoor: hiking, kayak, panjat tebing, dan lainnya',
      'Punya sertifikasi keselamatan & pertolongan pertama',
      'Kerja di alam terbuka, jauh dari meja kantor',
    ],
  },
]

export const VACANCY_URL = 'https://werkeninrecreatie.nl'
export const OPEN_DAY_INFO = 'Tanya guru atau kunjungi taman rekreasi terdekat untuk info Hari Terbuka (Open Day) berikutnya!'
