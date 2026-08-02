const vnCases = [
    {
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
        tag: "DE JACHTHAVEN",
        dialogue: "Er is paniek! Een gast heeft een lekke boot. De boot zinkt langzaam. Wat is jouw eerste reactie?",
        choices: [
            { text: "Pak gereedschap en repareer het lek.", profile: "Techniek" },
            { text: "Stel de gast gerust en regel een andere boot.", profile: "Frontoffice" }
        ]
    },
    {
        image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=600&q=80",
        tag: "DE CAMPING",
        dialogue: "Het regent keihard tijdens de barbecue. Iedereen rent naar binnen.",
        choices: [
            { text: "Verplaats het feest en start de muziek!", profile: "Animatie" },
            { text: "Serveer direct warme chocomel.", profile: "Horeca" }
        ]
    },
    {
        image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80",
        tag: "HET VAKANTIEPARK",
        dialogue: "Een influencer wil gratis verblijven voor promotie. Wat doe je?",
        choices: [
            { text: "Ik check hun bereik en maak een deal.", profile: "Marketing" },
            { text: "Ik regel een VIP-huisje voor een topsfeer.", profile: "Management" }
        ]
    }
];

let currentCase = 0;
let userProfiles = [];
let autoResetTimer;

// DOM Elements
const screenHome = document.getElementById('screen-home');
const screenGame = document.getElementById('screen-game');
const screenResult = document.getElementById('screen-result');

function showScreen(screen) {
    screenHome.classList.add('hidden');
    screenGame.classList.add('hidden');
    screenResult.classList.add('hidden');
    screen.classList.remove('hidden');
}

function startGame() {
    currentCase = 0;
    userProfiles = [];
    showScreen(screenGame);
    loadCase();
}

function loadCase() {
    if (currentCase >= vnCases.length) {
        showResult();
        return;
    }

    const data = vnCases[currentCase];
    document.getElementById('vn-image').src = data.image;
    document.getElementById('vn-tag').innerText = `${data.tag} (${currentCase + 1}/${vnCases.length})`;
    
    const dialogueEl = document.getElementById('vn-dialogue');
    dialogueEl.classList.remove('vn-enter');
    void dialogueEl.offsetWidth; // Trigger reflow
    dialogueEl.classList.add('vn-enter');
    dialogueEl.innerText = data.dialogue;

    const choicesContainer = document.getElementById('vn-choices');
    choicesContainer.innerHTML = '';
    
    data.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = "w-full text-left bg-dominant hover:bg-gray-200 border border-gray-200 text-textDark font-medium p-4 rounded-xl transition-colors active:scale-[0.98]";
        btn.innerText = choice.text;
        btn.onclick = () => selectChoice(choice.profile);
        choicesContainer.appendChild(btn);
    });
}

function selectChoice(profile) {
    userProfiles.push(profile);
    currentCase++;
    loadCase();
}

function showResult() {
    showScreen(screenResult);
    const finalProfile = userProfiles[userProfiles.length - 1]; 
    document.getElementById('result-title').innerText = `De ${finalProfile} Expert`;
    
    // Hit API backend (sync-counts.js) secara anonim
    fetch('/api/sync-counts', {
        method: 'POST',
        body: JSON.stringify({ profile: finalProfile }),
        headers: { 'Content-Type': 'application/json' }
    }).catch(e => console.log('Offline/Analytics diabaikan'));

    clearTimeout(autoResetTimer);
    autoResetTimer = setTimeout(() => resetGame(), 20000);
}

function resetGame() {
    clearTimeout(autoResetTimer);
    showScreen(screenHome);
}

// Event Listeners
document.getElementById('btn-start').addEventListener('click', startGame);
document.getElementById('btn-restart').addEventListener('click', resetGame);
document.getElementById('secret-reset').addEventListener('click', resetGame);
document.getElementById('btn-share').addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href)
        .then(() => alert("Link gekopieerd! Deel het met je vrienden."));
});
