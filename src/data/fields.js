export const MENTOR = {
  hospitality: { name: 'Kak Nara', color: '#FF6B4A', baseEmote: '💁‍♀️' },
  teknik: { name: 'Om Bagas', color: '#4FB3BF', baseEmote: '👷‍♂️' },
  marketing: { name: 'Kak Zea', color: '#FFC145', baseEmote: '👩‍💻' },
  alam: { name: 'Kak Rio', color: '#5FA777', baseEmote: '🧗‍♂️' },
};

export const FIELDS = [
  {
    id: 'hospitality',
    title: {
      nl: 'Gastvrijheid & Klantenservice',
      id: 'Hospitality & Pelayanan Tamu'
    },
    short: {
      nl: 'Wees het gezicht dat hun vakantie onvergetelijk maakt.',
      id: 'Jadi wajah pertama yang bikin liburan tamu berkesan.'
    },
    icon: '🏕️',
    accent: '#FF6B4A',
    intro: [
      { m: 'hospitality', emote: '👋', t: { nl: 'Hallo! Ik ben Nara. Welkom bij de receptie!', id: 'Halo! Aku Nara. Selamat datang di meja depan!' } },
      { m: 'hospitality', emote: '🤔', t: { nl: 'Elke gast heeft een ander verhaal en probleem.', id: 'Tiap tamu punya cerita dan masalah yang beda-beda.' } },
      { m: 'hospitality', emote: '🤝', t: { nl: 'Koppel de situatie aan jouw actie. Er is geen fout, laat je instelling zien!', id: 'Pasangkan situasi dengan tindakanmu. Apapun pilihanmu, mari kita lihat insting melayanimu!' } },
    ],
    puzzle: {
      type: 'matching',
      instruction: {
        nl: 'Kies een gast en kies jouw actie.',
        id: 'Pilih situasi tamu, lalu ketuk tindakan yang akan kamu ambil.'
      },
      pairs: [
        { left: { nl: 'Tent lekt door regen', id: 'Tenda keluarga bocor kena hujan' }, right: { nl: 'Geef reserve zeil', id: 'Pinjamkan terpal cadangan' } },
        { left: { nl: 'Kind huilt, ouders kwijt', id: 'Anak menangis terpisah dari ortu' }, right: { nl: 'Bel de infobalie', id: 'Hubungi pos informasi' } },
        { left: { nl: 'Vraagt naar middagschema', id: 'Tamu tanya jadwal aktivitas sore' }, right: { nl: 'Geef activiteitenbrochure', id: 'Bagikan brosur kegiatan' } },
        { left: { nl: 'Geen wifi-signaal', id: 'Sinyal wifi tidak nyambung' }, right: { nl: 'Verwijs naar de kantine', id: 'Arahkan ke kantin utama' } },
      ],
    },
    feedback: {
      nl: 'Geweldig! In de hospitality draait alles om jouw unieke benadering om gasten blij te maken.',
      id: 'Luar biasa! Di bidang hospitality, ketanggapanmu dan caramu bereaksi terhadap tamu adalah kunci. Tindakan yang kamu pilih menunjukkan bahwa melayani orang lain adalah sebuah seni dan keasyikan tersendiri!'
    },
    facts: {
      nl: ['Ontmoet veel verschillende mensen', 'Traint probleemoplossend vermogen', 'Ideaal als bijbaan tijdens je studie'],
      id: ['Bertemu ratusan tamu unik dari berbagai latar belakang', 'Melatih problem-solving super cepat', 'Bisa mulai dari part-time saat sekolah']
    }
  },
  {
    id: 'teknik',
    title: {
      nl: 'Techniek & Onderhoud',
      id: 'Teknik & Pemeliharaan'
    },
    short: {
      nl: 'Zorg dat alle faciliteiten elke dag veilig werken.',
      id: 'Pastikan semua fasilitas aman dan berfungsi.'
    },
    icon: '🔧',
    accent: '#4FB3BF',
    intro: [
      { m: 'teknik', emote: '👋', t: { nl: 'Yo! Ik ben Bagas van het technische team.', id: 'Yo! Aku Bagas, tim teknik di sini.' } },
      { m: 'teknik', emote: '⚙️', t: { nl: 'Technicus zijn is logica en zorgvuldigheid.', id: 'Kerjaan teknisi itu separuh logika, separuh kehati-hatian.' } },
      { m: 'teknik', emote: '⚡', t: { nl: 'Probeer de generatorstappen in jouw volgorde te zetten!', id: 'Coba susun langkah perbaikan genset sesuai nalurimu!' } },
    ],
    puzzle: {
      type: 'sequence',
      instruction: {
        nl: 'Tik op de stappen in de volgorde die jij logisch vindt.',
        id: 'Ketuk langkah-langkah berikut sesuai urutan yang menurutmu paling aman.'
      },
      steps: {
        nl: [
          'Schakel de hoofdschakelaar uit',
          'Controleer op brandstoflekken',
          'Reinig het luchtfilter',
          'Zet de schakelaar weer aan'
        ],
        id: [
          'Matikan saklar utama',
          'Periksa kebocoran bahan bakar',
          'Bersihkan filter udara',
          'Nyalakan kembali saklar'
        ]
      }
    },
    feedback: {
      nl: 'Goed geprobeerd! Elke monteur heeft zijn eigen ritme, zolang veiligheid voorop staat.',
      id: 'Eksperimen yang bagus! Di dunia teknik, urutan logika sangat penting, namun keberanianmu merakit solusi menunjukkan insting seorang problem solver sejati. Mengutak-atik mesin itu seru, kan?'
    },
    facts: {
      nl: ['Werken met elektriciteit, zwembaden en machines', 'Veiligheid (K3) is altijd prioriteit', 'Het hele jaar door veel vraag naar'],
      id: ['Kerja dengan listrik, mesin, sampai wahana permainan', 'Selalu ada standar keselamatan (K3) yang ketat', 'Banyak dibutuhkan sepanjang tahun']
    }
  },
  {
    id: 'marketing',
    title: {
      nl: 'Evenementen, Marketing & Media',
      id: 'Event, Marketing & Media'
    },
    short: {
      nl: 'Creëer verhalen die mensen willen laten bezoeken.',
      id: 'Ciptakan cerita yang bikin orang pengen datang berkunjung.'
    },
    icon: '📸',
    accent: '#FFC145',
    intro: [
      { m: 'marketing', emote: '✨', t: { nl: 'Hoi! Ik ben Zea, ik doe de content en evenementen hier.', id: 'Hai! Aku Zea, aku pegang konten & event di taman rekreasi ini.' } },
      { m: 'marketing', emote: '📱', t: { nl: 'Deze week hebben we een promo nodig, maar mijn tekst is een puinhoop!', id: 'Minggu ini kita mau posting promo. Tapi draf kata-kataku masih berantakan!' } },
      { m: 'marketing', emote: '💡', t: { nl: 'Help me de woorden in een pakkende zin te zetten.', id: 'Bantu susun ulang kata-katanya jadi kalimat promosi yang kece, yuk.' } },
    ],
    puzzle: {
      type: 'wordorder',
      instruction: {
        nl: 'Tik op de woorden op volgorde om een goede promo-zin te maken.',
        id: 'Ketuk kata-kata di bawah secara berurutan supaya membentuk kalimat promosi.'
      },
      target: {
        nl: 'Spannende vakanties, onvergetelijke herinneringen, alleen hier!',
        id: 'Liburan seru, kenangan tak terlupakan, hanya di sini!'
      }
    },
    feedback: {
      nl: 'Perfect! Met de juiste woorden kun je honderden mensen nieuwsgierig maken. Jouw creativiteit is de sleutel tot succes in marketing!',
      id: 'Sip, captionnya siap posting! Merangkai kata itu sangat asyik. Pilihan katamu bisa bikin ratusan orang penasaran dan langsung ingin datang liburan kemari!'
    },
    facts: {
      nl: ['Beheer sociale media, foto\'s en video\'s', 'Nauw samenwerken met alle andere afdelingen', 'Je creativiteit wordt door duizenden gezien'],
      id: ['Mengelola media sosial, foto, video, sampai event', 'Kerja sama erat dengan semua divisi lain', 'Kreativitasmu langsung dilihat ribuan orang']
    }
  },
  {
    id: 'alam',
    title: {
      nl: 'Natuur & Veiligheid',
      id: 'Alam, Aktivitas & Keselamatan'
    },
    short: {
      nl: 'Houd gasten veilig tijdens spannende natuuractiviteiten.',
      id: 'Jaga pengunjung tetap aman saat seru-seruan di alam.'
    },
    icon: '🧗‍♂️',
    accent: '#5FA777',
    intro: [
      { m: 'alam', emote: '🌿', t: { nl: 'Hé! Ik ben Rio, de outdoor gids. Veiligheid komt altijd eerst.', id: 'Hei! Aku Rio, pemandu aktivitas luar ruang. Sebelum mulai, aku wajib cek area.' } },
      { m: 'alam', emote: '👀', t: { nl: 'Een scherp oog is cruciaal; één gemist gevaar kan groot uitpakken.', id: 'Mata yang jeli itu penting banget. Satu bahaya yang terlewat bisa berakibat fatal.' } },
      { m: 'alam', emote: '🔍', t: { nl: 'Laten we de rivier checken. Zoek de 3 gevaren!', id: 'Yuk, bantu aku cek area sungai ini. Temukan 3 potensi bahaya!' } },
    ],
    puzzle: {
      type: 'hotspot',
      instruction: {
        nl: 'Tik op 3 plekken die je gevaarlijk lijken in dit gebied.',
        id: 'Ketuk 3 titik yang menurutmu berbahaya di area sungai ini.'
      }
    },
    feedback: {
      nl: 'Goed gedaan, het gebied is veilig! Als je van buiten zijn houdt en om anderen geeft, is dit jouw plek.',
      id: 'Area sudah aman! Insting perlindunganmu sangat bagus. Menjaga keselamatan orang lain sambil bekerja di alam terbuka itu sebuah panggilan jiwa yang luar biasa!'
    },
    facts: {
      nl: ['Gids voor wandelen, kajakken en klimmen', 'Certificering voor EHBO en veiligheid vereist', 'Werken in de buitenlucht, weg van een bureau'],
      id: ['Memandu aktivitas outdoor: hiking, kayak, panjat tebing', 'Punya sertifikasi keselamatan & pertolongan pertama', 'Kerja murni di alam terbuka, jauh dari meja kantor']
    }
  }
];

export const VACANCY_URL = 'https://werkeninrecreatie.nl';
export const OPEN_DAY_INFO = {
  nl: 'Vraag je docent of bezoek een recreatiepark voor de Open Dag!',
  id: 'Tanya guru atau kunjungi taman rekreasi terdekat untuk info Open Day!'
};
