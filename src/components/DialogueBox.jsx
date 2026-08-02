import { useEffect, useRef, useState } from 'react'

export default function DialogueBox({ lines, onDone, accent = '#FF6B4A', lang }) {
  const [index, setIndex] = useState(0)
  const [shown, setShown] = useState('')
  const [typing, setTyping] = useState(true)
  const timerRef = useRef(null)
  
  const line = lines[index]
  const textToShow = line.t[lang]

  useEffect(() => {
    setShown('')
    setTyping(true)
    let i = 0
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      i += 1
      setShown(textToShow.slice(0, i))
      if (i >= textToShow.length) {
        clearInterval(timerRef.current)
        setTyping(false)
      }
    }, 14)
    return () => clearInterval(timerRef.current)
  }, [index, textToShow])

  const advance = () => {
    if (typing) {
      clearInterval(timerRef.current)
      setShown(textToShow)
      setTyping(false)
      return
    }
    if (index < lines.length - 1) {
      setIndex(index + 1)
    } else {
      onDone()
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-end p-4 sm:p-8 cursor-pointer select-none" onClick={advance}>
      {/* Kotak Dialog Lebih Tegas dengan Hard Shadow */}
      <div className="w-full max-w-2xl bg-sand border-4 border-dusk2 rounded-3xl p-5 sm:p-7 animate-popin shadow-[0_12px_0_0_rgba(10,44,45,1)] mb-4">
        
        <div className="flex items-center gap-4 mb-5 border-b-4 border-dusk2/10 pb-4">
          {/* Visual Avatar Karakter */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-4xl shrink-0 border-4 border-dusk2 shadow-[0_6px_0_0_rgba(10,44,45,1)] transition-transform hover:scale-105" style={{ backgroundColor: accent }}>
            {line.emote} {/* Emote tereksploitasi: bereaksi tiap dialog */}
          </div>
          <div>
            <p className="font-display font-black text-2xl sm:text-3xl text-ink leading-none">{line.m.toUpperCase()}</p>
            <p className="text-xs text-ink/50 font-black tracking-widest uppercase mt-1">
              {lang === 'nl' ? 'AAN HET WOORD' : 'BERBICARA'}
            </p>
          </div>
        </div>

        <p className="font-body font-bold text-base sm:text-xl text-ink leading-relaxed min-h-[3.5em]">
          {shown}
          {typing && <span className="inline-block w-[4px] h-[1em] bg-sun ml-1 align-middle animate-pulse" />}
        </p>

        <div className="flex justify-end mt-4">
          <span className="text-xs sm:text-sm font-black text-ink/30 uppercase tracking-widest flex items-center gap-2 bg-dusk2/5 px-3 py-1.5 rounded-lg">
            {typing ? (lang === 'nl' ? 'tik om te versnellen ⏩' : 'ketuk untuk percepat ⏩') : (index < lines.length - 1 ? (lang === 'nl' ? 'volgende ➡️' : 'lanjut ➡️') : (lang === 'nl' ? 'starten 🚀' : 'mulai 🚀'))}
          </span>
        </div>
      </div>
    </div>
  )
}
