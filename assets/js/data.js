const gameData = {
    // PROFESI 1: TECH & LOGIC
    'tech': {
        mapTitle: 'Tech & IT Kaart',
        mapTheme: 'bg-blue-200', 
        cases: [
            {
                id: 'router_fix',
                posY: '35%', 
                posX: '25%', 
                pinColor: 'bg-blue-600',
                title: 'WiFi Storing!',
                funDesc: 'Gasten flippen! Geen WiFi betekent geen TikTok of Insta. Red hun vakantie en fix de router als een echte IT-held!',
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
                title: 'Systeem Plat',
                funDesc: 'Drama! Het reserveringssysteem is offline. Niemand kan een plek boeken. Tijd om je tech-skills te gebruiken.',
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
                funDesc: 'Oeps, een dikke boom blokkeert de weg na de storm van gister. Tijd voor actie! Grijp de zaag en maak de weg vrij.',
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
                title: 'Moeras Zwembad',
                funDesc: 'Iew, het zwembad lijkt wel een groen moeras! Niemand wil hierin zwemmen. Voeg de juiste spullen toe om het water helder te maken.',
                instruction: 'Verplaats het chloor naar het zwembadwater.',
                itemIcon: '🧪',
                dropIcon: '🏊‍♂️',
                successMsg: 'Water is weer helder blauw. Top gedaan!'
            }
        ]
    }
};
