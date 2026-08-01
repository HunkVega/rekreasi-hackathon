// Referensi DOM
const scenes = {
    home: document.getElementById('scene-home'),
    map: document.getElementById('scene-map'),
    puzzle: document.getElementById('scene-puzzle')
};
const mapContainer = document.getElementById('map-container');
const mapTitle = document.getElementById('map-title');

// Variabel Status Game
let currentProfession = null;
let currentActiveCase = null;

// --- 1. SCENE MANAGEMENT ---
function switchScene(sceneName) {
    Object.values(scenes).forEach(s => s.classList.remove('active-scene'));
    scenes[sceneName].classList.add('active-scene');
}

function goHome() {
    currentProfession = null;
    switchScene('home');
}

// --- 2. MAP GENERATOR ---
function loadMap(professionId) {
    currentProfession = professionId;
    const data = gameData[professionId];
    
    mapTitle.innerText = data.mapTitle;
    mapContainer.className = `absolute inset-0 w-full h-full transition-colors duration-500 ${data.mapTheme}`;
    
    // Bersihkan pin lama
    mapContainer.innerHTML = '';

    // Generate pin berdasarkan koordinat di data.js
    data.cases.forEach(caseData => {
        const pinBtn = document.createElement('button');
        pinBtn.className = `map-pin w-14 h-14 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-xl transform hover:scale-110 active:scale-95 transition-all ${caseData.pinColor}`;
        pinBtn.style.top = caseData.posY;
        pinBtn.style.left = caseData.posX;
        pinBtn.onclick = () => startPuzzle(caseData);
        
        // Efek radar berkedip
        pinBtn.innerHTML = `
            <div class="map-pin-pulse"></div>
            <span class="relative z-10 text-white font-black">!</span>
        `;
        
        mapContainer.appendChild(pinBtn);
    });

    switchScene('map');
}

// --- 3. PUZZLE INITIALIZER ---
function startPuzzle(caseData) {
    currentActiveCase = caseData;
    
    // Setup UI Puzzle
    document.getElementById('puzzle-title').innerText = caseData.title;
    document.getElementById('puzzle-instruction').innerText = caseData.instruction;
    document.getElementById('item-icon').innerText = caseData.itemIcon;
    document.getElementById('dropzone-icon').innerText = caseData.dropIcon;
    document.getElementById('success-message').innerText = caseData.successMsg;
    
    resetPuzzleState();
    switchScene('puzzle');
}

function closePuzzle() {
    currentActiveCase = null;
    switchScene('map'); // Kembali ke map profesi tersebut
}

// --- 4. DRAG & DROP MECHANICS (AABB COLLISION) ---
const draggable = document.getElementById('draggable-item');
const dropzone = document.getElementById('dropzone');
const successOverlay = document.getElementById('success-overlay');

let isDragging = false;
let initialX, initialY, xOffset = 0, yOffset = 0;

function resetPuzzleState() {
    successOverlay.classList.add('hidden');
    successOverlay.classList.remove('flex');
    dropzone.className = 'absolute w-32 h-32 border-4 border-dashed border-slate-600 rounded-2xl flex items-center justify-center bg-slate-800/50 transition-colors z-0';
    
    // Acak posisi item sedikit
    xOffset = (Math.random() - 0.5) * 160; 
    yOffset = (Math.random() - 0.5) * 120 + 80;
    setTranslate(xOffset, yOffset, draggable);
}

draggable.addEventListener('pointerdown', (e) => {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
    isDragging = true;
});

document.addEventListener('pointermove', (e) => {
    if (isDragging) {
        e.preventDefault(); 
        xOffset = e.clientX - initialX;
        yOffset = e.clientY - initialY;
        setTranslate(xOffset, yOffset, draggable);
        checkCollision();
    }
});

document.addEventListener('pointerup', () => {
    if (!isDragging) return;
    initialX = xOffset;
    initialY = yOffset;
    isDragging = false;
    
    if (checkCollision()) {
        xOffset = 0; yOffset = 0;
        setTranslate(0, 0, draggable);
        
        setTimeout(() => {
            successOverlay.classList.remove('hidden');
            successOverlay.classList.add('flex');
        }, 300);
    }
});

function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}

function checkCollision() {
    const dragRect = draggable.getBoundingClientRect();
    const dropRect = dropzone.getBoundingClientRect();

    // Logika pembatas AABB (Trigger Enter)
    const isColliding = !(
        dragRect.top > dropRect.bottom ||
        dragRect.right < dropRect.left ||
        dragRect.bottom < dropRect.top ||
        dragRect.left > dropRect.right
    );

    if (isColliding) {
        dropzone.classList.replace('border-slate-600', 'border-emerald-500');
        dropzone.classList.replace('bg-slate-800/50', 'bg-emerald-500/30');
        return true;
    } else {
        dropzone.classList.replace('border-emerald-500', 'border-slate-600');
        dropzone.classList.replace('bg-emerald-500/30', 'bg-slate-800/50');
        return false;
    }
}
