import { useState, useEffect } from 'react'

export default function WordOrderPuzzle({ config, onComplete, lang }) {
  const [words, setWords] = useState([])
  const [selected, setSelected] = useState([])
  const [isError, setIsError] = useState(false)

  // Ambil target kalimat berdasarkan bahasa yang aktif
  const targetSentence = config.target[lang]
  const targetWords = targetSentence.split(' ')

  useEffect(() => {
    // Acak urutan kata setiap kali komponen dimuat
    const shuffled = [...targetWords].sort(() => Math.random() - 0.5)
    setWords(shuffled.map((word, id) => ({ id, text: word })))
    setSelected([])
  }, [lang, targetSentence])

  const handleSelect = (word) => {
    if (selected.find(w => w.id === word.id)) return
    
    const newSelected = [...selected, word]
    setSelected(newSelected)

    // Cek apakah jumlah kata yang dipilih sudah sesuai dengan target
    if (newSelected.length === targetWords.length) {
      const formedSentence = newSelected.map(w => w.text).join(' ')
      if (formedSentence === targetSentence) {
        // Jika benar, panggil onComplete
        setTimeout(() => onComplete(), 500)
      } else {
        // Jika salah urutan, beri efek error lalu reset
        setIsError(true)
        setTimeout(() => {
          setSelected([])
          setIsError(false)
        }, 1000)
      }
    }
  }

  const handleDeselect = (word) => {
    setSelected(selected.filter(w => w.id !== word.id))
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <p className="font-body text-sand font-bold text-center text-sm sm:text-base bg-dusk2/40 px-4 py-3 rounded-xl border-2 border-dusk2/20">
        {config.instruction[lang]}
      </p>
      
      {/* Area Jawaban (Drop zone) */}
      <div className={`min-h-[120px] p-5 rounded-3xl border-4 border-dusk2 shadow-[inset_0_4px_0_0_rgba(10,44,45,0.1)] bg-sand flex flex-wrap gap-2 items-start transition-colors duration-300 ${isError ? 'bg-coral/20 border-coral' : ''}`}>
        {selected.map((word) => (
          <button
            key={word.id}
            onClick={() => handleDeselect(word)}
            className="font-display font-black text-sm sm:text-base bg-dusk2 text-sand px-4 py-2 rounded-xl shadow-[0_4px_0_0_rgba(23,33,31,1)] active:translate-y-1 active:shadow-none transition-all"
          >
            {word.text}
          </button>
        ))}
      </div>

      {/* Pilihan Kata (Word Bank) */}
      <div className="flex flex-wrap gap-3 justify-center mt-2">
        {words.map((word) => {
          const isSelected = selected.find(w => w.id === word.id)
          return (
            <button
              key={word.id}
              onClick={() => handleSelect(word)}
              disabled={isSelected}
              className={`font-display font-black text-sm sm:text-base px-4 py-2 rounded-xl transition-all duration-200 ${
                isSelected 
                  ? 'bg-dusk2/20 text-dusk2/40 border-4 border-transparent scale-95 cursor-not-allowed shadow-none' 
                  : 'bg-sun text-dusk2 border-4 border-dusk2 shadow-[0_4px_0_0_rgba(10,44,45,1)] hover:-translate-y-1 hover:shadow-[0_6px_0_0_rgba(10,44,45,1)] active:translate-y-1 active:shadow-none'
              }`}
            >
              {word.text}
            </button>
          )
        })}
      </div>
    </div>
  )
}
