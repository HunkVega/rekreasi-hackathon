import { useState } from 'react'

const SPOTS = [
  { id: 'fire', x: 22, y: 62, emoji: '🔥', hazard: true, label: 'Api unggun masih menyala tanpa pengawasan' },
  { id: 'rock', x: 68, y: 70, emoji: '🪨', hazard: true, label: 'Batu di tepi sungai licin, tanpa pegangan' },
  { id: 'wire', x: 46, y: 30, emoji: '⚡', hazard: true, label: 'Kabel genset terkelupas & terbuka' },
  { id: 'tent', x: 12, y: 32, emoji: '⛺', hazard: false, label: 'Tenda sudah terpasang rapi — aman' },
  { id: 'vest', x: 80, y: 38, emoji: '🦺', hazard: false, label: 'Rompi pelampung tergantung rapi — aman' },
  { id: 'table', x: 58, y: 50, emoji: '🧺', hazard: false, label: 'Meja piknik bersih — aman' },
  { id: 'tree', x: 88, y: 66, emoji: '🌳', hazard: false, label: 'Pohon rindang, tempat istirahat — aman' },
]
const HAZARD_TOTAL = SPOTS.filter((s) => s.hazard).length

export default function HotspotPuzzle({ accent, onComplete }) {
  const [found, setFound] = useState([])
  const [active, setActive] = useState(null) // { id, ok }

  const click = (spot) => {
    if (found.includes(spot.id)) return
    if (spot.hazard) {
      const next = [...found, spot.id]
      setFound(next)
      setActive({ id: spot.id, ok: true })
      if (next.length === HAZARD_TOTAL) {
        setTimeout(() => onComplete(), 700)
      } else {
        setTimeout(() => setActive(null), 1400)
      }
    } else {
      setActive({ id: spot.id, ok: false })
      setTimeout(() => setActive(null), 1400)
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center px-4 sm:px-8 py-6 sm:py-10 overflow-y-auto scrollbar-thin">
      <div className="w-full max-w-2xl">
        <p className="font-display font-bold text-sand text-xl sm:text-2xl mb-1 text-center">Periksa Area Sungai</p>
        <p className="text-sand/70 text-sm sm:text-base text-center mb-2">
          Ketuk titik yang menurutmu berbahaya. Ditemukan: {found.length}/{HAZARD_TOTAL}
        </p>

        <div
          className="relative w-full aspect-[4/3] rounded-2xl chunky-border overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #BFE3D0 0%, #8FCB9E 38%, #5FA777 55%, #3E7D63 100%)',
          }}
        >
          {/* simple river shape for scene grounding */}
          <div
            className="absolute left-0 right-0 bottom-0 h-[38%]"
            style={{ background: 'linear-gradient(180deg, #4FB3BF 0%, #2F8A96 100%)', clipPath: 'ellipse(75% 100% at 50% 100%)' }}
          />

          {SPOTS.map((spot) => {
            const isFound = found.includes(spot.id)
            const isActive = active?.id === spot.id
            return (
              <button
                key={spot.id}
                onClick={() => click(spot)}
                aria-label={spot.hazard ? 'Titik potensi bahaya' : 'Titik area'}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              >
                <span
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-xl chunky-border transition-transform
                    ${isFound ? 'bg-sun scale-110' : 'bg-sand/90 hover:scale-110'}
                    ${isActive && !spot.hazard ? 'animate-shake' : ''}`}
                >
                  {spot.emoji}
                </span>
                {isActive && (
                  <span
                    className={`mt-1 px-2 py-1 rounded-md text-[10px] sm:text-xs font-bold max-w-[140px] whitespace-normal text-center animate-popin ${active.ok ? 'bg-sun text-dusk2' : 'bg-coral text-sand'}`}
                >
                    {spot.label}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <p className="text-center text-sand/50 text-xs sm:text-sm mt-4">
          Tips: fokus pada hal yang terlihat tidak terurus, terbuka, atau licin.
        </p>
      </div>
    </div>
  )
}
