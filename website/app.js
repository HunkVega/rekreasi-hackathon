const roles = [
  {id:'receptie','title':'Frontoffice','short':'Gastvrij en praktisch.','desc':'Werk aan balie, reserveringen, gastcontact.'},
  {id:'animatie','title':'Animatie & Events','short':'Creatief en energiek.','desc':'Activiteiten leiden, evenementen organiseren.'},
  {id:'beheer','title':'Facilitair & Techniek','short':'Aanpakker met technisch inzicht.','desc':'Onderhoud, technische taken en logistiek.'},
  {id:'marketing','title':'Marketing & Communicatie','short':'Verhalenmaker online en offline.','desc':'Promotie, social media en branding.'},
  {id:'horeca','title':'F&B & Horeca','short':'Snel en servicegericht.','desc':'Keuken, bediening en gastvrijheid.'},
  {id:'marina','title':'Marina & Watersport','short':'Buiten en watergericht.','desc':'Bootbeheer, instructie watersport.'}
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
  el.innerHTML = `<strong>${role.title}</strong><div style="font-size:12px;margin-top:6px">${role.short}</div>`;
  el.addEventListener('click',()=>selectRole(role));
  return el;
}

function startGame(){
  hook.classList.add('hidden');
  game.classList.remove('hidden');
  cardsEl.innerHTML='';
  // show 4 random roles as quick choices
  const shuffled = roles.sort(()=>Math.random()-0.5).slice(0,4);
  shuffled.forEach(r=>cardsEl.appendChild(makeCard(r)));
  // simple timer (visual only)
  let t = 45; const timerEl = document.getElementById('timer');
  timerEl.textContent = `00:${String(t).padStart(2,'0')}`;
  const iv = setInterval(()=>{
    t--; timerEl.textContent = `00:${String(t).padStart(2,'0')}`;
    if(t<=0){ clearInterval(iv); showResult(null); }
  },1000);
  // store iv to reset later
  game.dataset.timer = iv;
}

function selectRole(role){
  // brief animation then show result
  showResult(role);
}

function showResult(role){
  // clear timer
  const iv = game.dataset.timer; if(iv) clearInterval(iv);
  result.classList.remove('hidden');
  if(role){
    resultTitle.textContent = `Misschien: ${role.title}`;
    resultDesc.textContent = role.desc + ' Dit kan een eerste stap zijn in jouw carrière.';
    document.getElementById('vacancyLink').href = 'https://hiswarecron.nl/placeholder-vacatures';
  } else {
    resultTitle.textContent = 'Stopgezet';
    resultDesc.textContent = 'Tijd is op — probeer opnieuw voor een rol-match.';
  }
}

function resetGame(){
  result.classList.add('hidden');
  game.classList.add('hidden');
  hook.classList.remove('hidden');
}

startBtn.addEventListener('click',startGame);
resetBtn && resetBtn.addEventListener('click',resetGame);
shareBtn && shareBtn.addEventListener('click',()=>{
  navigator.clipboard && navigator.clipboard.writeText(location.href).then(()=>alert('Link gekopieerd'));
});

// register service worker for offline capability
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('sw.js').catch(()=>{});
}
