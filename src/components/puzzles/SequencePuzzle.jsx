import { useMemo, useState } from 'react'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function SequencePuzzle({ config, accent, onComplete }) {
  const items = useMemo(
    () => shuffle(config.steps.map((text, id) => ({ id, text }))),
    [config]
  )
  const [picked, setPicked] = useState([]) // array of ids in chosen order
  const [errorAt, setErrorAt] = useState(null)

  const pick = (id) => {
    if (picked.includes(id)) return
    const expectedId = picked.length // since correct order is by original id 0..n-1
    if (id === expectedId) {
      const next = [...picked, id]
      setPicked(next)
      if (next.length === config.steps.length) {
        setTimeout(() => onComplete(), 500)
      }
    } else {
      setErrorAt(id)
      setTimeout(() => setErrorAt(null), 450)
    }
  }

  const reset = () => setPicked([])

  return (
    <div className="w-full h-full flex flex-col items-center px-4 sm:px-8 py-6 sm:py-10 overflow-y-auto scrollbar-thin">
      <div className="w-full max-w-xl">
        <p className="font-display font-bold text-sand text-xl sm:text-2xl mb-1 text-center">Urutkan Langkahnya</p>
        <p className="text-sand/70 text-sm sm:text-base text-center mb-6">{config.instruction}</p>

        <div className="bg-sand/10 rounded-2xl chunky-border p-4 mb-5 min-h-[64px] flex flex-wrap gap-2 items-center">
          {picked.length === 0 && (
            <span className="text-sand/40 text-sm italic px-1">Urutan yang kamu pilih akan muncul di sini…</span>
          )}
          {picked.map((id, i) => (
            <span
              key={id}
              className="flex items-center gap-2 bg-sun text-dusk2 font-bold text-xs sm:text-sm px-3 py-2 rounded-full animate-popin"
            >
              <span className="w-5 h-5 rounded-full bg-dusk2 text-sun flex items-center justify-center text-[10px]">{i + 1}</span>
              {items.find((it) => it.id === id).text}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {items.map((item) => {
            const done = picked.includes(item.id)
            const isError = errorAt === item.id
            return (
              <button
                key={item.id}
                disabled={done}
                onClick={() => pick(item.id)}
                className={`text-left px-4 py-3 rounded-xl chunky-border font-body text-sm sm:text-base transition-all
                  ${done ? 'bg-sun/30 opacity-50 cursor-default' : 'bg-sand hover:-translate-y-0.5'}
                  ${isError ? 'animate-shake bg-coral/50' : ''}`}
              >
                {item.text}
              </button>
            )
          })}
        </div>

        {picked.length > 0 && picked.length < config.steps.length && (
          <button
            onClick={reset}
            className="mt-4 text-sand/60 text-xs sm:text-sm font-semibold underline underline-offset-2 mx-auto block"
          >
            Ulangi urutan
          </button>
        )}
      </div>
    </div>
  )
}
