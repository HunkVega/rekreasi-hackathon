import { useMemo, useState } from 'react'
import FieldSelector from './components/FieldSelector.jsx'
import DialogueBox from './components/DialogueBox.jsx'
import MatchingPuzzle from './components/puzzles/MatchingPuzzle.jsx'
import SequencePuzzle from './components/puzzles/SequencePuzzle.jsx'
import WordOrderPuzzle from './components/puzzles/WordOrderPuzzle.jsx'
import HotspotPuzzle from './components/puzzles/HotspotPuzzle.jsx'
import { FIELDS, VACANCY_URL, OPEN_DAY_INFO } from './data/fields.js'

const PUZZLE_COMPONENTS = {
  matching: MatchingPuzzle,
  sequence: SequencePuzzle,
  wordorder: WordOrderPuzzle,
  hotspot: HotspotPuzzle,
}

export default function App() {
  const [screen, setScreen] = useState('select') // select | intro | puzzle | success
  const [currentId, setCurrentId] = useState(null)
  const [completed, setCompleted] = useState([])

  const field = useMemo(() => FIELDS.find((f) => f.id === currentId) || null, [currentId])

  const startField = (id) => {
    setCurrentId(id)
    setScreen('intro')
  }

  const backToSelect = () => {
    setScreen('select')
    setCurrentId(null)
  }

  const finishField = () => {
    setCompleted((c) => (c.includes(currentId) ? c : [...c, currentId]))
    setScreen('success')
  }

  const PuzzleComp = field ? PUZZLE_COMPONENTS[field.puzzle.type] : null

  return (
    <div className="min-h-screen w-full bg-dusk flex flex-col relative overflow-hidden">
      {/* ambient decoration, purely visual, respects reduced motion via global CSS rule */}
      <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-sun/10 animate-floaty" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-coral/10 animate-floaty" style={{ animationDelay: '1.2s' }} />

      {screen !== 'select' && field && (
        <TopBar field={field} onBack={backToSelect} step={screen} />
      )}

      <main className="flex-1 flex flex-col relative z-10">
        {screen === 'select' && (
          <FieldSelector completed={completed} onStart={startField} />
        )}

        {screen === 'intro' && field && (
          <DialogueBox
            key={`${field.id}-intro`}
            lines={field.intro}
            accent={field.accent}
            onDone={() => setScreen('puzzle')}
          />
        )}

        {screen === 'puzzle' && field && PuzzleComp && (
          <PuzzleComp config={field.puzzle} accent={field.accent} onComplete={finishField} />
        )}

        {screen === 'success' && field && (
          <SuccessScreen field={field} onBack={backToSelect} />
        )}
      </main>

      <footer className="relative z-10 text-center text-sand/30 text-[10px] sm:text-xs py-3">
        Jejak Karier — dibuat untuk sektor rekreasi & wisata
      </footer>
    </div>
  )
}

function TopBar({ field, onBack, step }) {
  const stepLabel = { intro: 'Cerita', puzzle: 'Tantangan', success: 'Selesai' }[step]
  return (
    <div className="relative z-10 flex items-center justify-between px-4 sm:px-8 pt-4 sm:pt-6">
      <button
        onClick={onBack}
        className="font-display font-bold text-xs sm:text-sm text-sand/70 hover:text-sand flex items-center gap-1 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors"
      >
        ◂ Semua bidang
      </button>
      <span
        className="font-display font-bold text-xs sm:text-sm px-3 py-1.5 rounded-full text-dusk2"
        style={{ backgroundColor: field.accent }}
      >
        {field.icon} {field.title} · {stepLabel}
      </span>
    </div>
  )
}

function SuccessScreen({ field, onBack }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4 sm:px-8 py-8 overflow-y-auto scrollbar-thin">
      <div className="w-full max-w-xl bg-sand chunky-border rounded-3xl shadow-panel p-6 sm:p-8 animate-popin">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl sm:text-4xl">🏅</span>
          <div>
            <p className="font-display font-extrabold text-xl sm:text-2xl text-ink leading-tight">Tantangan Selesai!</p>
            <p className="text-ink/50 text-xs sm:text-sm font-semibold">{field.title}</p>
          </div>
        </div>

        {field.success.map((line, i) => (
          <p key={i} className="font-body text-ink text-sm sm:text-base mb-3 leading-relaxed">
            {line.t}
          </p>
        ))}

        <div className="bg-dusk2/5 rounded-xl p-4 my-4">
          <p className="font-display font-bold text-ink text-sm mb-2">Fakta seputar bidang ini:</p>
          <ul className="space-y-1.5">
            {field.facts.map((f, i) => (
              <li key={i} className="text-ink/80 text-sm flex items-start gap-2">
                <span className="text-coral font-bold">•</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-5">
          <a
            href={VACANCY_URL}
            target="_blank"
            rel="noreferrer"
            className="flex-1 text-center font-display font-bold text-sm bg-coral text-sand px-4 py-3 rounded-full hover:brightness-110 active:scale-95 transition-all"
          >
            Lihat Lowongan Sektor Rekreasi ▸
          </a>
          <button
            onClick={onBack}
            className="flex-1 text-center font-display font-bold text-sm bg-dusk2 text-sand px-4 py-3 rounded-full hover:brightness-110 active:scale-95 transition-all"
          >
            Jelajahi Bidang Lain
          </button>
        </div>
        <p className="text-center text-ink/40 text-[11px] sm:text-xs mt-4">{OPEN_DAY_INFO}</p>
      </div>
    </div>
  )
}
