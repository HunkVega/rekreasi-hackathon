import { useMemo, useState } from 'react'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function SequencePuzzle({ config, accent, onComplete, lang }) {
  const items = useMemo(() => shuffle(config.steps[lang].map((text, id) => ({ id, text }))), [config, lang])
  const [picked, setPicked] = useState([])
  const [reactionEmote, setReactionEmote] = useState('🛠️')

  const pick = (id) => {
    if (picked.includes(id)) return
    const next = [...picked, id]
    setPicked(next)
    setReactionEmote('⚙️')

    if (next.length === config.steps[lang].length) {
      setReactionEmote('🚀')
      setTimeout(() => onComplete(next), 800)
    }
  }

  const reset = () => {
    setPicked([])
    setReactionEmote('🔄')
  }

  return (
    <div className="w-full h-full flex flex-col items-center px-4 sm:px-8 py-6 overflow-y-auto scrollbar-thin">
      <div className="w-full max-w-xl relative">
        <div className="absolute -top-2 right-0 text-4xl sm:text-5xl animate-floaty">{reactionEmote}</div>
        
        <p className="font-display font-black text-sand text-2xl sm:text-3xl mb-1 text-center">
          {lang === 'nl' ? 'Bepaal de Volgorde' : 'Tentukan Urutannya'}
        </p>
        <p className="text-sand/80 font-medium text-sm sm:text-base text-center mb-8">{config.instruction[lang]}</p>
        
        <div className="bg-sand/10 rounded-2xl border-4 border-dusk2 p-5 mb-6 min-h-[80px] flex flex-wrap gap-2 items-center shadow-[inset_0_4px_0_0_rgba(10,44,45,0.5)]">
          {picked.length === 0 && <span className="text-sand/40 font-bold text-sm px-1">...</span>}
          {picked.map((id, i) => (
            <span key={id} className="flex items-center gap-2 bg-sun border-2 border-dusk2 text-dusk2 font-black text-xs sm:text-sm px-3 py-2 rounded-xl animate-popin shadow-[0_4px_0_0_rgba(10,44,45,1)]">
              <span className="w-6 h-6 rounded-lg bg-dusk2 text-sun flex items-center justify-center text-xs">{i + 1}</span>
              {items.find((it) => it.id === id).text}
            </span>
          ))}
        </div>
        
        <div className="flex flex-col gap-3">
          {items.map((item) => {
            const done = picked.includes(item.id)
            return (
              <button
                key={item.id}
                disabled={done}
                onClick={() => pick(item.id)}
                className={`text-left px-5 py-4 rounded-2xl border-4 border-dusk2 font-body font-bold text-sm sm:text-base transition-all
                  ${done ? 'bg-sun/30 text-sand/50 shadow-none scale-95' : 'bg-sand shadow-[0_6px_0_0_rgba(10,44,45,1)] hover:-translate-y-1'}`}
              >
                {item.text}
              </button>
            )
          })}
        </div>
        
        {picked.length > 0 && picked.length < config.steps[lang].length && (
          <button onClick={reset} className="mt-6 text-sand font-black text-sm bg-dusk2/50 px-6 py-3 rounded-xl border-2 border-dusk2 hover:bg-coral transition-colors mx-auto block">
            {lang === 'nl' ? 'Reset Volgorde 🔄' : 'Ulangi Urutan 🔄'}
          </button>
        )}
      </div>
    </div>
  )
}
