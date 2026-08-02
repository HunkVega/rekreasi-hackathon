import { useState } from 'react'

export default function HotspotPuzzle({ config, onComplete, lang }) {
  const [found, setFound] = useState([])
  
  // Koordinat titik bahaya di area sungai
  const hotspots = [
    { id: 1, top: '75%', left: '25%' }, // Batu licin
    { id: 2, top: '55%', left: '50%' }, // Arus deras
    { id: 3, top: '35%', left: '75%' }  // Kayu lapuk
  ]

  const handleSpotClick = (id) => {
    if (!found.includes(id)) {
      const newFound = [...found, id]
      setFound(newFound)
      
      // Jika semua titik sudah ditemukan
      if (newFound.length === hotspots.length) {
        setTimeout(() => onComplete(), 600)
      }
    }
  }

  return (
    <div className="flex flex-col gap-6 items-center w-full">
      <p className="font-body text-sand font-bold text-center text-sm sm:text-base bg-dusk2/40 px-4 py-3 rounded-xl border-2 border-dusk2/20 w-full">
        {config.instruction[lang]}
      </p>
      
      <div className="relative w-full aspect-video bg-[#5FA777] rounded-3xl border-4 border-dusk2 overflow-hidden shadow-[0_8px_0_0_rgba(10,44,45,1)]">
        
        {/* Gambar Latar Belakang Asli dari Unsplash */}
        <img 
          src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=1000&auto=format&fit=crop" 
          alt="Area Sungai Deras" 
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />

        {/* Render titik-titik Hotspot */}
        {hotspots.map((spot) => {
          const isFound = found.includes(spot.id)
          return (
            <button
              key={spot.id}
              onClick={() => handleSpotClick(spot.id)}
              style={{ top: spot.top, left: spot.left }}
              className={`absolute w-12 h-12 sm:w-16 sm:h-16 -ml-6 -mt-6 sm:-ml-8 sm:-mt-8 rounded-full border-4 transition-all duration-300 z-10 flex items-center justify-center ${
                isFound 
                  ? 'border-coral bg-coral/80 scale-110 shadow-[0_0_20px_rgba(255,107,74,0.9)]' 
                  : 'border-sun/60 hover:bg-sun/30 hover:scale-110 hover:border-sun animate-[pulse_2s_ease-in-out_infinite]'
              }`}
            >
              {isFound && <span className="text-2xl sm:text-3xl drop-shadow-md">⚠️</span>}
            </button>
          )
        })}
      </div>

      {/* Indikator Progres */}
      <div className="flex gap-2 items-center mt-2 bg-dusk2 px-6 py-2 rounded-xl border-2 border-sun">
        <span className="font-display font-black text-sun text-lg sm:text-xl">
          {found.length} / {hotspots.length} {lang === 'nl' ? 'Gevonden' : 'Ditemukan'}
        </span>
      </div>
    </div>
  )
}
