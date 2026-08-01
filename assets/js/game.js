// --- 3. PUZZLE INITIALIZER (DYNAMIC TOOLBOX) ---
const dropzone = document.getElementById('dropzone');
const toolbox = document.getElementById('toolbox');
const successOverlay = document.getElementById('success-overlay');
const errorToast = document.getElementById('error-toast');

function startPuzzle(caseData) {
    currentActiveCase = caseData;
    
    // Set Teks
    document.getElementById('puzzle-title').innerText = caseData.title;
    document.getElementById('puzzle-instruction').innerText = caseData.instruction;
    document.getElementById('problem-visual').innerText = caseData.problemVisual;
    document.getElementById('dropzone-label').innerText = caseData.dropIcon;
    document.getElementById('success-message').innerText = caseData.successMsg;
    
    // Render Toolbox
    toolbox.innerHTML = '';
    caseData.tools.forEach(tool => {
        const toolEl = document.createElement('div');
        // Data attribute untuk validasi
        toolEl.dataset.isCorrect = tool.isCorrect;
        toolEl.dataset.errorMsg = tool.errorMsg;
        
        toolEl.className = 'draggable relative w-20 h-20 bg-slate-700 rounded-2xl border-b-4 border-slate-900 flex flex-col items-center justify-center shadow-lg active:border-b-0 active:translate-y-1';
        toolEl.innerHTML = `
            <span class="text-4xl pointer-events-none">${tool.icon}</span>
            <span class="text-[10px] font-bold text-slate-300 mt-1 pointer-events-none">${tool.name}</span>
        `;
        
        // Attach Event Listeners ke masing-masing alat
        toolEl.addEventListener('pointerdown', dragStart);
        toolbox.appendChild(toolEl);
    });

    // Reset UI
    successOverlay.classList.add('hidden');
    successOverlay.classList.remove('flex');
    dropzone.className = 'relative flex-1 bg-slate-800 rounded-3xl border-4 border-dashed border-slate-600 overflow-hidden shadow-inner flex flex-col items-center justify-center mb-6 transition-colors duration-300';
    
    switchScene('puzzle');
}

// --- 4. ADVANCED DRAG & DROP MECHANICS ---
let activeItem = null;
let initialX, initialY, currentX = 0, currentY = 0;

function dragStart(e) {
    activeItem = e.currentTarget;
    activeItem.classList.add('dragging');
    
    // Reset transform internal
    const style = window.getComputedStyle(activeItem);
    const matrix = new WebKitCSSMatrix(style.transform);
    currentX = matrix.m41;
    currentY = matrix.m42;
    
    initialX = e.clientX - currentX;
    initialY = e.clientY - currentY;

    document.addEventListener('pointermove', drag);
    document.addEventListener('pointerup', dragEnd);
}

function drag(e) {
    if (!activeItem) return;
    e.preventDefault(); 
    
    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;
    
    activeItem.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
}

function dragEnd(e) {
    if (!activeItem) return;
    
    document.removeEventListener('pointermove', drag);
    document.removeEventListener('pointerup', dragEnd);
    activeItem.classList.remove('dragging');

    // Cek Tabrakan dengan Dropzone
    const itemRect = activeItem.getBoundingClientRect();
    const dropRect = dropzone.getBoundingClientRect();

    const isColliding = !(
        itemRect.top > dropRect.bottom ||
        itemRect.right < dropRect.left ||
        itemRect.bottom < dropRect.top ||
        itemRect.left > dropRect.right
    );

    if (isColliding) {
        // VALIDASI BENAR/SALAH
        if (activeItem.dataset.isCorrect === 'true') {
            // BENAR!
            dropzone.classList.replace('border-slate-600', 'border-emerald-500');
            dropzone.classList.replace('bg-slate-800', 'bg-emerald-900');
            
            setTimeout(() => {
                successOverlay.classList.remove('hidden');
                successOverlay.classList.add('flex');
            }, 400);
        } else {
            // SALAH ALAT!
            showError(activeItem.dataset.errorMsg);
            resetItemPosition(activeItem);
        }
    } else {
        // Dilepas di luar area, kembalikan ke toolbox
        resetItemPosition(activeItem);
    }
    
    activeItem = null;
}

function resetItemPosition(item) {
    item.style.transform = 'translate3d(0px, 0px, 0)';
}

function showError(msg) {
    errorToast.innerText = msg;
    errorToast.classList.remove('opacity-0', '-translate-y-4');
    errorToast.classList.add('opacity-100', 'translate-y-0');
    dropzone.classList.add('animate-shake', 'border-red-500');
    
    setTimeout(() => {
        errorToast.classList.add('opacity-0', '-translate-y-4');
        errorToast.classList.remove('opacity-100', 'translate-y-0');
        dropzone.classList.remove('animate-shake', 'border-red-500');
    }, 2000);
}
