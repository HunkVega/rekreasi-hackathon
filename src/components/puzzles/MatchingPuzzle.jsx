import { useMemo, useState } from 'react'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function MatchingPuzzle({ config, accent, onComplete }) {
  const lefts = useMemo(
    () => shuffle(config.pairs.map((p, id) => ({ id, text: p.left }))),
    [config]
  )
  const rights = useMemo(
    () => shuffle(config.pairs.map((p, id) => ({ id, text: p.right }))),
    [config]
  )

  const [selectedLeft, setSelectedLeft] = useState(null)
  const [solved, setSolved] = useState([])
  const [wrongFlash, setWrongFlash] = useState(null) // {leftId, rightId}

  const total = config.pairs.length

  const pickLeft = (id) => {
    if (solved.includes(id)) return
    setSelectedLeft(id)
  }

  const pickRight = (id) => {
    if (selectedLeft === null || solved.includes(id)) return
    if (selectedLeft === id) {
      const next = [...solved, id]
      setSolved(next)
      setSelectedLeft(null)
      if (next.length === total) {
        setTimeout(() => onComplete(), 500)
      }
    } else {
      setWrongFlash({ leftId: selectedLeft, rightId: id })
      setTimeout(() => setWrongFlash(null), 450)
      setSelectedLeft(null)
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center px-4 sm:px-8 py-6 sm:py-10 overflow-y-auto scrollbar-thin">
      <div className="w-full max-w-3xl">
        <p className="font-display font-bold text-sand text-xl sm:text-2xl mb-1 text-center">Cocokkan Situasinya</p>
        <p className="text-sand/70 text-sm sm:text-base text-center mb-6">{config.instruction}</p>

        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="flex gap-1">
            {config.pairs.map((_, i) => (
              <span
                key={i}
                className={`w-3 h-3 rounded-full transition-colors ${solved.includes(i) ? 'bg-sun' : 'bg-sand/20'}`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="flex flex-col gap-3">
            <p className="font-display font-bold text-sand/60 text-xs uppercase tracking-wider text-center sm:text-left">Situasi Tamu</p>
            {lefts.map((item) => {
              const isSolved = solved.includes(item.id)
              const isSelected = selectedLeft === item.id
              const isWrong = wrongFlash?.leftId === item.id
              return (
                <button
                  key={item.id}
                  disabled={isSolved}
                  onClick={() => pickLeft(item.id)}
                  className={`text-left px-4 py-3 rounded-xl chunky-border font-body text-sm sm:text-base transition-all
                    ${isSolved ? 'bg-sun/40 opacity-60 cursor-default' : 'bg-sand hover:-translate-y-0.5'}
                    ${isSelected ? 'ring-4 ring-offset-2 ring-offset-dusk' : ''}
                    ${isWrong ? 'animate-shake' : ''}`}
                  style={isSelected ? { boxShadow: `0 0 0 4px ${accent}` } : {}}
                >
                  {item.text}
                </button>
              )
            })}
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-display font-bold text-sand/60 text-xs uppercase tracking-wider text-center sm:text-left">Tindakan yang Tepat</p>
            {rights.map((item) => {
              const isSolved = solved.includes(item.id)
              const isWrong = wrongFlash?.rightId === item.id
              return (
                <button
                  key={item.id}
                  disabled={isSolved}
                  onClick={() => pickRight(item.id)}
                  className={`text-left px-4 py-3 rounded-xl chunky-border font-body text-sm sm:text-base transition-all
                    ${isSolved ? 'bg-sun/40 opacity-60 cursor-default' : 'bg-sand hover:-translate-y-0.5'}
                    ${isWrong ? 'bg-coral/50' : ''}`}
                >
                  {item.text}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
