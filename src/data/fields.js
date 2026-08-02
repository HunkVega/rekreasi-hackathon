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
      nl: ['Ontmoet veel verschillende mensen', 'Traint probleemoplossend vermogen'],
      id: ['Bertemu ratusan tamu unik', 'Melatih problem-solving super cepat']
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
      { m: 'teknik', emote: 'yo', t: { nl: 'Yo! Ik ben Bagas van het technische team.', id: 'Yo! Aku Bagas, tim teknik di sini.' } },
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
      id: 'Eksperimen yang bagus! Di dunia teknik, urutan logika sangat penting, namun keberanianmu merakit solusi menunjukkan insting seorang *problem solver* sejati. Mengutak-atik mesin itu seru, kan?'
    },
    facts: {
      nl: ['Werken met elektriciteit en machines', 'Veiligheid (K3) is altijd prioriteit'],
      id: ['Kerja dengan listrik dan mesin', 'Selalu ada standar keselamatan (K3)']
    }
  }
  // Kamu bisa menambahkan bidang 'marketing' dan 'alam' dengan struktur objek { nl, id } yang sama.
];

export const VACANCY_URL = 'https://werkeninrecreatie.nl';
export const OPEN_DAY_INFO = {
  nl: 'Vraag je docent of bezoek een recreatiepark voor de Open Dag!',
  id: 'Tanya guru atau kunjungi taman rekreasi terdekat untuk info Open Day!'
};
