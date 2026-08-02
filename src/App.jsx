import { useMemo, useState } from 'react'
import FieldSelector from './components/FieldSelector.jsx'
import DialogueBox from './components/DialogueBox.jsx'
import MatchingPuzzle from './components/puzzles/MatchingPuzzle.jsx'
import SequencePuzzle from './components/puzzles/SequencePuzzle.jsx'
import WordOrderPuzzle from './components/puzzles/WordOrderPuzzle.jsx'
import HotspotPuzzle from './components/puzzles/HotspotPuzzle.jsx'
import { FIELDS, VACANCY_URL, OPEN_DAY_INFO } from './data/fields.js'
import { supabase } from './lib/supabase.js' // Pastikan file ini sudah ada

const PUZZLE_COMPONENTS = {
  matching: MatchingPuzzle,
  sequence: SequencePuzzle,
  wordorder: WordOrderPuzzle,
  hotspot: HotspotPuzzle,
}

export default function App() {
  const [lang, setLang] = useState('nl') // Bahasa Utama
  const [screen, setScreen] = useState('select') 
  const [currentId, setCurrentId] = useState(null)
  const [completed, setCompleted] = useState([])
  const [userAnswers, setUserAnswers] = useState(null)

  const field = useMemo(() => FIELDS.find((f) => f.id === currentId) || null, [currentId])

  const startField = (id) => {
    setCurrentId(id)
    setScreen('intro')
  }

  const backToSelect = () => {
    setScreen('select')
    setCurrentId(null)
    setUserAnswers(null)
  }

  const finishField = async (answers) => {
    // Simpan ke Supabase di background, tidak memblokir UI
    const { error } = await supabase
      .from('user_progress')
      .insert([{ field_id: currentId, answers: answers }])
    
    if (error) console.error('Gagal menyimpan:', error)

    setUserAnswers(answers)
    setCompleted((c) => (c.includes(currentId) ? c : [...c, currentId]))
    setScreen('reflection')
  }

  const PuzzleComp = field ? PUZZLE_COMPONENTS[field.puzzle.type] : null

  return (
    <div className="min-h-screen w-full bg-dusk flex flex-col relative overflow-hidden">
      <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-sun/10 animate-floaty" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-coral/10 animate-floaty" style={{ animationDelay: '1.2s' }} />
      
      {/* Toggle Bahasa Dinamis */}
      <div className="absolute top-4 right-4 z-50">
        <button 
          onClick={() => setLang(lang === 'nl' ? 'id' : 'nl')}
          className="bg-sand text-dusk2 font-display font-black px-4 py-2 rounded-xl chunky-border text-sm hover:bg-sun transition-colors shadow-[0_4px_0_0_rgba(10,44,45,1)] active:translate-y-1 active:shadow-none"
        >
          {lang === 'nl' ? '🇳🇱 NL' : '🇮🇩 ID'}
        </button>
      </div>

      {screen !== 'select' && field && (
        <TopBar field={field} onBack={backToSelect} step={screen} lang={lang} />
      )}
      
      <main className="flex-1 flex flex-col relative z-10">
        {screen === 'select' && (
          <FieldSelector completed={completed} onStart={startField} lang={lang} />
        )}
        {screen === 'intro' && field && (
          <DialogueBox key={`${field.id}-intro`} lines={field.intro} accent={field.accent} onDone={() => setScreen('puzzle')} lang={lang} />
        )}
        {screen === 'puzzle' && field && PuzzleComp && (
          <PuzzleComp config={field.puzzle} accent={field.accent} onComplete={finishField} lang={lang} />
        )}
        {screen === 'reflection' && field && (
          <ReflectionScreen field={field} answers={userAnswers} onBack={backToSelect} lang={lang} />
        )}
      </main>
    </div>
  )
}

function TopBar({ field, onBack, step, lang }) {
  const stepLabel = { intro: '💬', puzzle: '🧩', reflection: '✨' }[step]
  return (
    <div className="relative z-10 flex items-center justify-between px-4 sm:px-8 pt-4 sm:pt-6">
      <button onClick={onBack} className="font-display font-bold text-xs sm:text-sm text-sand/70 hover:text-sand flex items-center gap-1 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors">
        {lang === 'nl' ? 'Terug' : 'Kembali'}
      </button>
      <span className="font-display font-black text-xs sm:text-sm px-4 py-2 rounded-xl text-dusk2 chunky-border shadow-[0_4px_0_0_rgba(10,44,45,1)]" style={{ backgroundColor: field.accent }}>
        {field.icon} {field.title[lang]} {stepLabel}
      </span>
    </div>
  )
}

function ReflectionScreen({ field, onBack, lang }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4 sm:px-8 py-8 overflow-y-auto scrollbar-thin">
      <div className="w-full max-w-xl bg-sand chunky-border rounded-3xl p-6 sm:p-8 animate-popin shadow-[0_12px_0_0_rgba(10,44,45,1)]">
        
        <div className="flex items-center gap-4 mb-4 border-b-4 border-dusk2/10 pb-4">
          <span className="text-5xl sm:text-6xl animate-floaty">🥳</span>
          <div>
            <p className="font-display font-black text-2xl sm:text-3xl text-ink leading-tight">
              {lang === 'nl' ? 'Missie Voltooid!' : 'Eksplorasi Selesai!'}
            </p>
            <p className="text-ink/60 font-bold tracking-widest uppercase text-xs mt-1">{field.title[lang]}</p>
          </div>
        </div>
        
        {/* Pesan Edukatif Berbasis Afirmasi */}
        <div className="bg-sun/20 p-5 rounded-2xl border-4 border-sun mb-6 relative">
          <span className="absolute -top-4 -right-3 text-3xl rotate-12">💡</span>
          <p className="font-body text-ink text-sm sm:text-base leading-relaxed font-semibold">
            {field.feedback[lang]}
          </p>
        </div>

        <div className="bg-dusk2/5 rounded-2xl p-4 my-4 border-2 border-dusk2/10">
          <p className="font-display font-black text-ink text-sm mb-3">{lang === 'nl' ? 'Waarom dit leuk is:' : 'Fakta seru bidang ini:'}</p>
          <ul className="space-y-2">
            {field.facts[lang].map((f, i) => (
              <li key={i} className="text-ink/80 text-sm flex items-start gap-3 font-medium">
                <span className="text-coral font-black text-lg leading-none">★</span> <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <a href={VACANCY_URL} target="_blank" rel="noreferrer" className="flex-1 text-center font-display font-black text-sm bg-coral text-sand px-4 py-4 rounded-xl chunky-border shadow-[0_6px_0_0_rgba(10,44,45,1)] active:translate-y-1 active:shadow-none transition-all">
            {lang === 'nl' ? 'Bekijk Vacatures' : 'Lihat Lowongan'} 🚀
          </a>
          <button onClick={onBack} className="flex-1 text-center font-display font-black text-sm bg-dusk2 text-sand px-4 py-4 rounded-xl chunky-border shadow-[0_6px_0_0_rgba(10,44,45,1)] active:translate-y-1 active:shadow-none transition-all">
            {lang === 'nl' ? 'Ander Gebied' : 'Jelajahi Lainnya'} 🗺️
          </button>
        </div>
        <p className="text-center text-ink/40 font-bold text-[11px] sm:text-xs mt-6">{OPEN_DAY_INFO[lang]}</p>
      </div>
    </div>
  )
}
