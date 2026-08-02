import { useState } from 'react'
import { FIELDS } from '../data/fields.js'

export default function FieldSelector({ completed, onStart }) {
  const [openId, setOpenId] = useState(null)

  return (
    <div className="w-full h-full flex flex-col">
      <header className="px-5 sm:px-10 pt-8 sm:pt-12 pb-4 sm:pb-6 text-center">
        <p className="font-display text-sun font-bold tracking-[0.3em] text-xs sm:text-sm uppercase mb-2">Jejak Karier</p>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-sand leading-tight">
          Petualangan di Dunia Rekreasi
        </h1>
        <p className="font-body text-sand/70 mt-3 max-w-xl mx-auto text-sm sm:text-base">
          Buka salah satu pintu di bawah, kenalan sama mentornya, lalu bantu selesaikan tantangan mereka.
        </p>
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-thin px-4 sm:px-10 pb-8 sm:pb-12">
        <div className="max-w-3xl mx-auto flex flex-col gap-3 sm:gap-4">
          {FIELDS.map((f) => {
            const isOpen = openId === f.id
            const isDone = completed.includes(f.id)
            return (
              <div
                key={f.id}
                className="rounded-2xl chunky-border overflow-hidden transition-all duration-300 ease-out"
                style={{ backgroundColor: f.accent }}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : f.id)}
                  className="w-full flex items-center gap-4 px-4 sm:px-6 py-4 sm:py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-2xl sm:text-3xl shrink-0">{f.icon}</span>
                  <span className="flex-1 min-w-0">
                    <span className="font-display font-bold text-lg sm:text-2xl text-dusk2 block truncate">
                      {f.title}
                    </span>
                  </span>
                  {isDone && (
                    <span className="shrink-0 text-[10px] sm:text-xs font-bold bg-dusk2 text-sand px-2 py-1 rounded-full">
                      ✓ Selesai
                    </span>
                  )}
                  <span
                    className={`shrink-0 text-dusk2 text-xl sm:text-2xl font-bold transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>

                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-0">
                      <div className="bg-sand/90 rounded-xl p-4 sm:p-5 chunky-border">
                        <p className="font-body text-ink text-sm sm:text-base mb-4">{f.short}</p>
                        <button
                          onClick={() => onStart(f.id)}
                          className="font-display font-bold text-sm sm:text-base bg-dusk2 text-sand px-5 py-2.5 rounded-full hover:bg-coral active:scale-95 transition-all"
                        >
                          {isDone ? 'Main lagi ▸' : 'Mulai ▸'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {completed.length === FIELDS.length && (
          <p className="text-center text-sun font-display font-bold mt-6 animate-popin">
            🎉 Semua bidang selesai dijelajahi! Ketuk salah satu pintu lagi kapan saja.
          </p>
        )}
      </div>
    </div>
  )
}
