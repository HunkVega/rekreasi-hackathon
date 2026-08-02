import { useEffect, useRef, useState } from 'react'
import { MENTOR } from '../data/fields.js'

export default function DialogueBox({ lines, onDone, accent = '#FF6B4A' }) {
  const [index, setIndex] = useState(0)
  const [shown, setShown] = useState('')
  const [typing, setTyping] = useState(true)
  const timerRef = useRef(null)

  const line = lines[index]
  const mentor = MENTOR[line.m]

  useEffect(() => {
    setShown('')
    setTyping(true)
    let i = 0
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      i += 1
      setShown(line.t.slice(0, i))
      if (i >= line.t.length) {
        clearInterval(timerRef.current)
        setTyping(false)
      }
    }, 14)
    return () => clearInterval(timerRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  const advance = () => {
    if (typing) {
      clearInterval(timerRef.current)
      setShown(line.t)
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
    <div
      className="w-full h-full flex flex-col items-center justify-end p-4 sm:p-8 cursor-pointer select-none"
      onClick={advance}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') advance() }}
      aria-label="Ketuk untuk melanjutkan dialog"
    >
      <div
        className="w-full max-w-2xl bg-sand chunky-border rounded-3xl shadow-panel p-5 sm:p-7 animate-popin"
        style={{ borderColor: '#0A2C2D' }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-2xl chunky-border shrink-0"
            style={{ backgroundColor: accent }}
          >
            {mentor.emoji}
          </div>
          <div>
            <p className="font-display font-bold text-lg sm:text-xl text-ink leading-none">{mentor.name}</p>
            <p className="text-[11px] sm:text-xs text-ink/50 font-semibold tracking-wide uppercase mt-1">berbicara</p>
          </div>
        </div>
        <p className="font-body text-base sm:text-lg text-ink leading-relaxed min-h-[3.5em]">
          {shown}
          {typing && <span className="inline-block w-[2px] h-[1em] bg-ink/60 ml-0.5 align-middle animate-pulse" />}
        </p>
        <div className="flex justify-end mt-2">
          <span className="text-xs sm:text-sm font-bold text-ink/40 flex items-center gap-1">
            {typing ? 'ketuk untuk percepat' : (index < lines.length - 1 ? 'lanjut ▸' : 'mulai ▸')}
          </span>
        </div>
      </div>
    </div>
  )
}
