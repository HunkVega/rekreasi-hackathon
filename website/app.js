const roles = [
  {id:'receptie',title:'Frontoffice',short:'Gastvrij en praktisch.',desc:'Werk aan de receptie: reserveringen en gastenservice.'},
  {id:'animatie',title:'Animatie & Events',short:'Creatief en energiek.',desc:'Leid activiteiten en organiseert evenementen.'},
  {id:'beheer',title:'Facilitair & Techniek',short:'Aanpakker en technisch.',desc:'Onderhoud, logistiek en technische taken.'},
  {id:'marketing',title:'Marketing & Communicatie',short:'Vertel het verhaal.',desc:'Promotie, social media en branding.'},
  {id:'horeca',title:'F&B & Horeca',short:'Snel en servicegericht.',desc:'Werk in keuken of bediening.'},
  {id:'marina',title:'Marina & Watersport',short:'Buiten en watergericht.',desc:'Booten, materiaal en instructie op het water.'}
];

const startBtn = document.getElementById('startBtn');
const game = document.getElementById('game');
const hook = document.getElementById('hook');
const cardsEl = document.getElementById('cards');
const result = document.getElementById('result');
const resultTitle = document.getElementById('resultTitle');
const resultDesc = document.getElementById('resultDesc');
const resetBtn = document.getElementById('resetBtn');
const shareBtn = document.getElementById('shareBtn');

function makeCard(role){
  const el = document.createElement('button');
  el.className='card';
  el.type='button';
  el.setAttribute('role','listitem');
  el.innerHTML = `<strong>${role.title}</strong><small>${role.short}</small>`;
  el.addEventListener('click',()=>selectRole(role));
  return el;
}

function startGame(){
  hook.classList.add('hidden');
  game.classList.remove('hidden');
  cardsEl.innerHTML='';
  // show 4 random roles as quick choices (deterministic shuffle for low CPU)
  const shuffled = deterministicShuffle(roles).slice(0,4);
  shuffled.forEach(r=>cardsEl.appendChild(makeCard(r)));
  // timer (visual only) with single interval to minimize work
  let t = 60; const timerEl = document.getElementById('timer');
  timerEl.textContent = `00:${String(t).padStart(2,'0')}`;
  const iv = setInterval(()=>{
    t--; timerEl.textContent = `00:${String(t).padStart(2,'0')}`;
    if(t<=0){ clearInterval(iv); showResult(null); }
  },1000);
  // store iv to reset later
  game.dataset.timer = iv;
}

function deterministicShuffle(arr){
  // simple low-cost shuffle that doesn't allocate large arrays
  const out = arr.slice();
  for(let i=out.length-1;i>0;i--){
    const j = Math.floor(Math.abs(Math.sin(i + Date.now()%1000)) * (i+1));
    const tmp = out[i]; out[i]=out[j]; out[j]=tmp;
  }
  return out;
}

function selectRole(role){
  // brief animation then show result
  showResult(role);
}

function showResult(role){
  // clear timer
  const iv = game.dataset.timer; if(iv) try{ clearInterval(iv); }catch(e){}
  result.classList.remove('hidden');
  if(role){
    resultTitle.textContent = `Misschien: ${role.title}`;
    resultDesc.textContent = role.desc + ' Dit kan een eerste stap zijn in jouw carrière.';
    document.getElementById('vacancyLink').href = 'https://hiswarecron.nl/placeholder-vacatures';
  } else {
    resultTitle.textContent = 'Tijd op';
    resultDesc.textContent = 'De ronde is voorbij — druk op Volgende speler om te resetten.';
  }
  // ensure visible on small screens
  result.scrollIntoView({behavior:'smooth',block:'center'});
}

function resetGame(){
  result.classList.add('hidden');
  game.classList.add('hidden');
  hook.classList.remove('hidden');
}

startBtn.addEventListener('click',startGame);
resetBtn && resetBtn.addEventListener('click',resetGame);
shareBtn && shareBtn.addEventListener('click',()=>{
  if(navigator.clipboard){
    navigator.clipboard.writeText(location.href).then(()=>safeAlert('Link gekopieerd'));
  } else {
    safeAlert('Kopieer deze URL handmatig: ' + location.href);
  }
});

function safeAlert(msg){
  // non-blocking toast fallback for very slow devices
  const t = document.createElement('div');
  t.textContent = msg; t.style.position='fixed'; t.style.bottom='12px'; t.style.left='50%';
  t.style.transform='translateX(-50%)'; t.style.background='rgba(0,0,0,.75)'; t.style.color='white';
  t.style.padding='8px 12px'; t.style.borderRadius='8px'; t.style.zIndex=9999; document.body.appendChild(t);
  setTimeout(()=>t.remove(),2200);
}

// register service worker for offline capability (graceful)
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('sw.js').catch(()=>{});
}

// --- Anonymous aggregate counters (localStorage) ---
const COUNTS_KEY = 'rec_counts_v1';
function loadCounts(){
  try{
    const s = localStorage.getItem(COUNTS_KEY);
    if(!s) return initCounts();
    return JSON.parse(s);
  }catch(e){return initCounts();}
}
function initCounts(){
  const base = {total:0, byRole:{}};
  roles.forEach(r=> base.byRole[r.id]=0);
  localStorage.setItem(COUNTS_KEY, JSON.stringify(base));
  return base;
}
function saveCounts(c){ localStorage.setItem(COUNTS_KEY, JSON.stringify(c)); }
function incrementCount(roleId){
  const c = loadCounts();
  if(!c.byRole[roleId]) c.byRole[roleId]=0;
  c.byRole[roleId]++;
  c.total = (c.total||0)+1;
  saveCounts(c);
  broadcastCounts(c);
}

// BroadcastChannel sync (works across tabs on same origin)
let bc = null;
function setupBroadcast(){
  if('BroadcastChannel' in self){
    try{ bc = new BroadcastChannel('rec_channel');
      bc.onmessage = e=>{ if(e.data && e.data.type==='counts') saveCounts(e.data.counts); if(window.displayMode) renderDisplayCounts(); };
    }catch(e){}
  }
}
function broadcastCounts(counts){ if(bc) bc.postMessage({type:'counts',counts}); }

// Integrate counting into result flow
const originalShowResult = showResult;
showResult = function(role){
  if(role && role.id) incrementCount(role.id);
  originalShowResult(role);
};

// --- Seed demo data ---
function seedData(){
  const c = {total:0, byRole:{}};
  roles.forEach(r=>{ const v = Math.floor(Math.random()*40); c.byRole[r.id]=v; c.total+=v; });
  saveCounts(c); broadcastCounts(c); safeAlert('Seeded demo data');
  scheduleSupabaseSync();
}

// hook seed button
const seedBtn = document.getElementById('seedBtn');
seedBtn && seedBtn.addEventListener('click', seedData);

// --- Supabase optional sync ---
const supabaseBtn = document.getElementById('supabaseBtn');
function getSupabaseConfig(){
  // read from localStorage first, then URL params
  const params = new URLSearchParams(location.search);
  const url = localStorage.getItem('SUPABASE_URL') || params.get('SUPABASE_URL');
  const key = localStorage.getItem('SUPABASE_KEY') || params.get('SUPABASE_KEY');
  if(url && key) return {url, key};
  return null;
}

async function sendCountsToSupabase(counts){
  const cfg = getSupabaseConfig();
  if(!cfg) return;
  try{
    const endpoint = cfg.url.replace(/\/$/,'') + '/rest/v1/rec_counts?on_conflict=id';
    const body = [{id:'aggregated', counts}];
    await fetch(endpoint, {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'apikey': cfg.key,
        'Authorization': 'Bearer ' + cfg.key,
        'Prefer':'return=representation'
      },
      body: JSON.stringify(body)
    });
  }catch(e){ console.warn('Supabase sync failed', e); }
}

// call supabase sync in a debounced way to reduce network calls
let _supabaseTimer = null;
function scheduleSupabaseSync(){ if(_supabaseTimer) clearTimeout(_supabaseTimer); _supabaseTimer = setTimeout(()=>{ sendCountsToSupabase(loadCounts()); _supabaseTimer=null; }, 1200); }

// wire up supabase button
supabaseBtn && supabaseBtn.addEventListener('click', ()=>{
  const url = prompt('Supabase URL (example: https://xyz.supabase.co)');
  if(!url) return;
  const key = prompt('Supabase ANON KEY (keep this private for production)');
  if(!key) return;
  localStorage.setItem('SUPABASE_URL', url.trim());
  localStorage.setItem('SUPABASE_KEY', key.trim());
  safeAlert('Supabase configured (stored locally)');
});

// extend incrementCount to schedule remote sync
const _origIncrement = incrementCount;
incrementCount = function(roleId){ _origIncrement(roleId); scheduleSupabaseSync(); };

// --- Big-screen / display mode ---
const bigScreenBtn = document.getElementById('bigScreenBtn');
bigScreenBtn && bigScreenBtn.addEventListener('click', ()=>{
  const url = location.pathname + '?display=1'; window.open(url, '_blank');
});

// detect display mode via ?display=1 or #display
const params = new URLSearchParams(location.search);
if(params.get('display')==='1' || location.hash==='#display'){
  window.displayMode = true;
  setupBroadcast();
  renderDisplay();
}

function renderDisplay(){
  document.body.innerHTML = '';
  const wrapper = document.createElement('div'); wrapper.className='display-screen';
  const title = document.createElement('h1'); title.textContent='Beleef — Live'; title.style.textAlign='center';
  const subtitle = document.createElement('p'); subtitle.textContent='Anonieme teller: welke rollen trekken aandacht'; subtitle.style.textAlign='center';
  const list = document.createElement('div'); list.id='displayList'; list.style.display='flex'; list.style.flexWrap='wrap'; list.style.justifyContent='center'; list.style.gap='14px'; list.style.padding='20px';
  const ctrl = document.createElement('div'); ctrl.style.textAlign='center';
  const exportBtn = document.createElement('button'); exportBtn.className='btn'; exportBtn.textContent='Export counts';
  exportBtn.onclick = ()=>{ const c = loadCounts(); const blob = new Blob([JSON.stringify(c)],{type:'application/json'}); const url = URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='counts.json'; a.click(); URL.revokeObjectURL(url); };
  ctrl.appendChild(exportBtn);
  wrapper.appendChild(title); wrapper.appendChild(subtitle); wrapper.appendChild(ctrl); wrapper.appendChild(list);
  document.body.appendChild(wrapper);
  renderDisplayCounts();
  // poll for updates every 2s (works offline)
  setInterval(renderDisplayCounts,2000);
}

function renderDisplayCounts(){
  const c = loadCounts();
  const list = document.getElementById('displayList'); if(!list) return;
  // prepare array of roles with counts
  const arr = roles.map(r=>({id:r.id,title:r.title,count:(c.byRole[r.id]||0)}));
  arr.sort((a,b)=>b.count-a.count);
  list.innerHTML='';
  arr.forEach((it,idx)=>{
    const el = document.createElement('div'); el.className='display-role'; el.style.minWidth='180px'; el.style.padding='12px'; el.style.borderRadius='10px'; el.style.background='#fff'; el.style.boxShadow='0 12px 30px rgba(3,20,40,.06)'; el.style.textAlign='center';
    el.innerHTML = `<div style="font-size:18px;font-weight:700">${it.title}</div><div style="font-size:28px;margin-top:8px">${it.count}</div>`;
    if(idx===0) el.style.border = '3px solid #0b66a3';
    list.appendChild(el);
  });
}

// setup broadcast channel for regular mode too
setupBroadcast();

// accessibility quick start
document.addEventListener('keydown',e=>{ if(e.key==='Enter' && hook && !hook.classList.contains('hidden')) startGame(); });

