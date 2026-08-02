import { useMemo, useState } from 'react'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function MatchingPuzzle({ config, accent, onComplete, lang }) {
  const lefts = useMemo(() => shuffle(config.pairs.map((p, id) => ({ id, text: p.left[lang] }))), [config, lang])
  const rights = useMemo(() => shuffle(config.pairs.map((p, id) => ({ id, text: p.right[lang] }))), [config, lang])
  
  const [selectedLeft, setSelectedLeft] = useState(null)
  const [answers, setAnswers] = useState({}) // { leftId: rightId }
  const [reactionEmote, setReactionEmote] = useState('🤔') // Emote bereaksi sesuai status
  
  const total = config.pairs.length

  const pickLeft = (id) => {
    if (answers[id] !== undefined) return
    setSelectedLeft(id)
    setReactionEmote('👀') // Reaksi saat memilih opsi
  }

  const pickRight = (id) => {
    if (selectedLeft === null) return
    if (Object.values(answers).includes(id)) return 

    const newAnswers = { ...answers, [selectedLeft]: id }
    setAnswers(newAnswers)
    setSelectedLeft(null)
    setReactionEmote('✅') // Reaksi saat berhasil memasangkan

    if (Object.keys(newAnswers).length === total) {
      setReactionEmote('🎉')
      setTimeout(() => onComplete(newAnswers), 800)
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center px-4 sm:px-8 py-6 overflow-y-auto">
      <div className="w-full max-w-3xl relative">
        
        {/* Floating Reaction Emote */}
        <div className="absolute -top-2 right-0 text-4xl sm:text-5xl animate-floaty">
          {reactionEmote}
        </div>

        <p className="font-display font-black text-sand text-2xl sm:text-3xl mb-1 text-center">
          {lang === 'nl' ? 'Koppel de Situatie' : 'Cocokkan Situasinya'}
        </p>
        <p className="text-sand/80 font-medium text-sm sm:text-base text-center mb-8">{config.instruction[lang]}</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="flex flex-col gap-3">
            <p className="font-display font-black text-sand/60 text-xs uppercase tracking-widest text-center sm:text-left">{lang === 'nl' ? 'Situatie' : 'Kejadian'}</p>
            {lefts.map((item) => {
              const isAnswered = answers[item.id] !== undefined
              const isSelected = selectedLeft === item.id
              return (
                <button
                  key={`l-${item.id}`}
                  disabled={isAnswered}
                  onClick={() => pickLeft(item.id)}
                  className={`text-left px-5 py-4 rounded-2xl border-4 border-dusk2 font-body font-bold text-sm sm:text-base transition-all
                    ${isAnswered ? 'bg-sun/30 text-sand/50 shadow-none scale-95' : 'bg-sand shadow-[0_6px_0_0_rgba(10,44,45,1)] hover:-translate-y-1'}
                    ${isSelected ? 'ring-4 ring-offset-4 ring-offset-dusk' : ''}`}
                  style={isSelected ? { borderColor: accent } : {}}
                >
                  {item.text}
                </button>
              )
            })}
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-display font-black text-sand/60 text-xs uppercase tracking-widest text-center sm:text-left">{lang === 'nl' ? 'Jouw Actie' : 'Tindakanmu'}</p>
            {rights.map((item) => {
              const isAnswered = Object.values(answers).includes(item.id)
              return (
                <button
                  key={`r-${item.id}`}
                  disabled={isAnswered}
                  onClick={() => pickRight(item.id)}
                  className={`text-left px-5 py-4 rounded-2xl border-4 border-dusk2 font-body font-bold text-sm sm:text-base transition-all
                    ${isAnswered ? 'bg-coral/30 text-sand/50 shadow-none scale-95' : 'bg-sand shadow-[0_6px_0_0_rgba(10,44,45,1)] hover:-translate-y-1'}`}
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
