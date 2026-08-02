import { useMemo, useState } from 'react'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Splits target into displayable word tokens (keeps punctuation attached).
function tokenize(target) {
  return target.split(' ').filter(Boolean)
}

export default function WordOrderPuzzle({ config, accent, onComplete }) {
  const targetWords = useMemo(() => tokenize(config.target), [config])
  const pool = useMemo(
    () => shuffle(targetWords.map((text, id) => ({ id, text }))),
    [targetWords]
  )

  const [placed, setPlaced] = useState([]) // ids in chosen order
  const [shakeKey, setShakeKey] = useState(0)
  const [wrong, setWrong] = useState(false)
  const done = placed.length === targetWords.length

  const place = (id) => {
    if (placed.includes(id) || done) return
    setPlaced((p) => [...p, id])
  }

  const removeLast = () => {
    setPlaced((p) => p.slice(0, -1))
    setWrong(false)
  }

  const check = () => {
    const ok = placed.every((id, i) => id === i) // words authored in correct target order => id order == 0..n-1
    if (ok) {
      setTimeout(() => onComplete(), 500)
    } else {
      setWrong(true)
      setShakeKey((k) => k + 1)
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center px-4 sm:px-8 py-6 sm:py-10 overflow-y-auto scrollbar-thin">
      <div className="w-full max-w-2xl">
        <p className="font-display font-bold text-sand text-xl sm:text-2xl mb-1 text-center">Susun Caption Promosi</p>
        <p className="text-sand/70 text-sm sm:text-base text-center mb-6">{config.instruction}</p>

        <div
          key={shakeKey}
          className={`bg-sand rounded-2xl chunky-border p-4 sm:p-5 mb-6 min-h-[80px] flex flex-wrap gap-2 items-center content-start ${wrong ? 'animate-shake' : ''}`}
        >
          {placed.length === 0 && (
            <span className="text-ink/40 text-sm italic px-1">Susun kalimatnya di sini…</span>
          )}
          {placed.map((id, i) => (
            <span
              key={id}
              className="bg-dusk2 text-sand font-display font-semibold text-sm sm:text-base px-3 py-1.5 rounded-lg animate-popin"
            >
              {pool.find((w) => w.id === id).text}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {pool.map((w) => {
            const used = placed.includes(w.id)
            return (
              <button
                key={w.id}
                disabled={used}
                onClick={() => place(w.id)}
                className={`font-display font-semibold text-sm sm:text-base px-3 py-1.5 rounded-lg chunky-border transition-all
                  ${used ? 'opacity-30 cursor-default' : 'bg-sun hover:-translate-y-0.5'}`}
              >
                {w.text}
              </button>
            )
          })}
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={removeLast}
            disabled={placed.length === 0}
            className="text-sand/70 text-xs sm:text-sm font-semibold underline underline-offset-2 disabled:opacity-30"
          >
            Hapus kata terakhir
          </button>
          <button
            onClick={check}
            disabled={!done}
            className="font-display font-bold text-sm sm:text-base bg-coral text-sand px-5 py-2.5 rounded-full disabled:opacity-30 hover:brightness-110 active:scale-95 transition-all"
          >
            Periksa Kalimat ▸
          </button>
        </div>
      </div>
    </div>
  )
}
