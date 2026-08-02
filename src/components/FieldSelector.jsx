import { useState } from 'react'
import { FIELDS } from '../data/fields.js'

export default function FieldSelector({ completed, onStart, lang }) {
  const [openId, setOpenId] = useState(null)

  return (
    <div className="w-full h-full flex flex-col">
      <header className="px-5 sm:px-10 pt-10 sm:pt-14 pb-4 sm:pb-6 text-center">
        <p className="font-display text-sun font-black tracking-[0.3em] text-xs sm:text-sm uppercase mb-3">
          {lang === 'nl' ? 'Carrièrepad' : 'Jejak Karier'}
        </p>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-sand leading-tight drop-shadow-[0_4px_0_rgba(10,44,45,1)]">
          {lang === 'nl' ? 'Avontuur in Recreatie' : 'Petualangan Dunia Rekreasi'}
        </h1>
        <p className="font-body text-sand mt-4 max-w-xl mx-auto text-sm sm:text-base font-bold bg-dusk2/40 px-4 py-2 rounded-xl">
          {lang === 'nl' 
            ? 'Open een deur, ontmoet je mentor en voltooi hun uitdagingen.' 
            : 'Buka salah satu pintu, kenalan dengan mentornya, dan selesaikan tantangan mereka.'}
        </p>
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-thin px-4 sm:px-10 pb-8 sm:pb-12">
        <div className="max-w-3xl mx-auto flex flex-col gap-4 sm:gap-5">
          {FIELDS.map((f) => {
            const isOpen = openId === f.id
            const isDone = completed.includes(f.id)
            return (
              <div
                key={f.id}
                className="rounded-3xl border-4 border-dusk2 overflow-hidden transition-all duration-300 ease-out shadow-[0_8px_0_0_rgba(10,44,45,1)]"
                style={{ backgroundColor: f.accent }}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : f.id)}
                  className="w-full flex items-center gap-4 px-5 sm:px-7 py-5 sm:py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-3xl sm:text-4xl shrink-0 drop-shadow-[0_2px_0_rgba(10,44,45,1)]">{f.icon}</span>
                  <span className="flex-1 min-w-0">
                    {/* Pemanggilan multi-bahasa yang benar untuk title */}
                    <span className="font-display font-black text-xl sm:text-2xl text-dusk2 block truncate drop-shadow-[0_1px_0_rgba(255,255,255,0.3)]">
                      {f.title[lang]}
                    </span>
                  </span>
                  
                  {isDone && (
                    <span className="shrink-0 text-[10px] sm:text-xs font-black bg-dusk2 text-sun px-3 py-1.5 rounded-xl uppercase tracking-wider">
                      {lang === 'nl' ? 'KLAAR' : 'SELESAI'}
                    </span>
                  )}
                  
                  <span
                    className={`shrink-0 text-dusk2 text-2xl sm:text-3xl font-black transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
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
                    <div className="px-5 sm:px-7 pb-6 sm:pb-7 pt-0">
                      <div className="bg-sand rounded-2xl p-5 sm:p-6 border-4 border-dusk2 shadow-[inset_0_4px_0_0_rgba(10,44,45,0.1)]">
                        {/* Pemanggilan multi-bahasa yang benar untuk deskripsi singkat */}
                        <p className="font-body font-bold text-ink text-sm sm:text-base mb-5">
                          {f.short[lang]}
                        </p>
                        <button
                          onClick={() => onStart(f.id)}
                          className="font-display font-black text-sm sm:text-base bg-dusk2 text-sand px-6 py-3 rounded-xl hover:bg-coral active:scale-95 transition-all shadow-[0_4px_0_0_rgba(23,33,31,1)] active:translate-y-1 active:shadow-none"
                        >
                          {isDone 
                            ? (lang === 'nl' ? 'Nog een keer 🔄' : 'Main lagi 🔄') 
                            : (lang === 'nl' ? 'Starten 🚀' : 'Mulai 🚀')}
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
          <p className="text-center text-sun font-display font-black mt-8 animate-popin text-lg bg-dusk2/50 py-3 rounded-xl border-2 border-sun mx-auto max-w-md">
            {lang === 'nl' ? 'Alle gebieden verkend! 🎉' : 'Semua bidang selesai dijelajahi! 🎉'}
          </p>
        )}
      </div>
    </div>
  )
}
