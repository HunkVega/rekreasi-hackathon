const gameData = {
    // PROFESI 1: TECH & LOGIC
    'tech': {
        mapTitle: 'Tech & IT Kaart',
        mapTheme: 'bg-blue-200', // Nantinya bisa diganti URL gambar peta spesifik
        cases: [
            {
                id: 'router_fix',
                posY: '35%', // Koordinat Y (Top)
                posX: '25%', // Koordinat X (Left)
                pinColor: 'bg-blue-600',
                title: 'WiFi Storing!',
                instruction: 'Sleep de kabel naar de kapotte router.',
                itemIcon: '🔌',
                dropIcon: '📡',
                successMsg: 'Het internet werkt weer! IT is onmisbaar in de recreatie.'
            },
            {
                id: 'server_down',
                posY: '65%',
                posX: '70%',
                pinColor: 'bg-indigo-600',
                title: 'Server Error',
                instruction: 'Verplaats de harde schijf naar de server.',
                itemIcon: '💽',
                dropIcon: '🖥️',
                successMsg: 'Systeem hersteld! Gasten kunnen weer online reserveren.'
            }
        ]
    },
    
    // PROFESI 2: NATURE & LANDSCAPE
    'nature': {
        mapTitle: 'Natuur Kaart',
        mapTheme: 'bg-emerald-200',
        cases: [
            {
                id: 'fallen_tree',
                posY: '40%',
                posX: '60%',
                pinColor: 'bg-emerald-600',
                title: 'Boom op de weg',
                instruction: 'Sleep de kettingzaag naar de omgevallen boom.',
                itemIcon: '🪚',
                dropIcon: '🪵',
                successMsg: 'Weg is weer vrij! Buitenonderhoud houdt het park veilig.'
            },
            {
                id: 'dirty_pool',
                posY: '75%',
                posX: '35%',
                pinColor: 'bg-cyan-600',
                title: 'Vies Zwembad',
                instruction: 'Verplaats het chloor naar het zwembadwater.',
                itemIcon: '🧪',
                dropIcon: '🏊‍♂️',
                successMsg: 'Water is weer helder blauw. Top gedaan!'
            }
        ]
    }
};
