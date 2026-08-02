import React, { useState, useEffect } from 'react';
import FieldSelector from './components/FieldSelector';
import DialogueBox from './components/DialogueBox';
import HotspotPuzzle from './components/puzzles/HotspotPuzzle';
import MatchingPuzzle from './components/puzzles/MatchingPuzzle';
import SequencePuzzle from './components/puzzles/SequencePuzzle';
import WordOrderPuzzle from './components/puzzles/WordOrderPuzzle';
import { fields } from './data/fields';
import { supabase } from './lib/supabase';

export default function App() {
  const [lang, setLang] = useState('nl');
  const [selectedField, setSelectedField] = useState(null);
  const [gameState, setGameState] = useState('selector'); // selector, dialogue, puzzle, success
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [sessionId, setSessionId] = useState(null);

  // Initialize anonymous session
  useEffect(() => {
    const initSession = async () => {
      const { data, error } = await supabase
        .from('sessions')
        .insert([{ started_at: new Date() }])
        .select()
        .single();
      
      if (data) {
        setSessionId(data.id);
      }
    };
    initSession();
  }, []);

  const handleSelectField = (field) => {
    setSelectedField(field);
    setGameState('dialogue');
    setDialogueIndex(0);
  };

  const handleNextDialogue = () => {
    if (selectedField && dialogueIndex < selectedField.dialogue[lang].length - 1) {
      setDialogueIndex(prev => prev + 1);
    } else {
      setGameState('puzzle');
    }
  };

  const handlePuzzleComplete = async () => {
    setGameState('success');
    if (sessionId && selectedField) {
      await supabase
        .from('progress')
        .insert([{ session_id: sessionId, field_id: selectedField.id, completed: true }]);
    }
  };

  const renderPuzzle = () => {
    if (!selectedField) return null;
    switch (selectedField.puzzleType) {
      case 'hotspot':
        return <HotspotPuzzle field={selectedField} lang={lang} onComplete={handlePuzzleComplete} />;
      case 'matching':
        return <MatchingPuzzle field={selectedField} lang={lang} onComplete={handlePuzzleComplete} />;
      case 'sequence':
        return <SequencePuzzle field={selectedField} lang={lang} onComplete={handlePuzzleComplete} />;
      case 'wordorder':
        return <WordOrderPuzzle field={selectedField} lang={lang} onComplete={handlePuzzleComplete} />;
      default:
        return <HotspotPuzzle field={selectedField} lang={lang} onComplete={handlePuzzleComplete} />;
    }
  };

  return (
    <div className="min-h-screen bg-dusk text-sand font-body flex flex-col relative overflow-hidden select-none">
      {/* Top Navigation / Language Toggle */}
      <header className="w-full p-4 flex justify-between items-center z-10">
        {gameState !== 'selector' ? (
          <button
            onClick={() => { setGameState('selector'); setSelectedField(null); }}
            className="bg-sand text-dusk font-black px-4 py-2 rounded-xl border-2 border-dusk2 shadow-[0_4px_0_0_rgba(10,44,45,1)] hover:translate-y-0.5 transition-all text-sm uppercase tracking-wider"
          >
            {lang === 'nl' ? 'Terug' : 'Kembali'}
          </button>
        ) : <div />}

        <button
          onClick={() => setLang(l => l === 'nl' ? 'id' : 'nl')}
          className="bg-sand text-dusk font-black px-4 py-2 rounded-xl border-2 border-dusk2 shadow-[0_4px_0_0_rgba(10,44,45,1)] hover:translate-y-0.5 transition-all text-sm uppercase"
        >
          {lang === 'nl' ? 'NL 🇳🇱' : 'ID 🇮🇩'}
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 z-10">
        {gameState === 'selector' && (
          <FieldSelector fields={fields} lang={lang} onSelect={handleSelectField} />
        )}

        {gameState === 'dialogue' && selectedField && (
          <DialogueBox
            field={selectedField}
            lang={lang}
            dialogueIndex={dialogueIndex}
            onNext={handleNextDialogue}
          />
        )}

        {gameState === 'puzzle' && renderPuzzle()}

        {gameState === 'success' && selectedField && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dusk2/80 backdrop-blur-sm">
            <div className="bg-sand p-6 sm:p-8 rounded-3xl w-full max-w-lg shadow-[0_16px_0_0_rgba(10,44,45,1)] border-4 border-dusk2 relative animate-fade-in-up">
              
              {/* Header Section */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-sun rounded-full flex items-center justify-center text-4xl border-4 border-dusk2 shadow-[0_4px_0_0_rgba(10,44,45,1)]">
                  🥳
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-dusk2 font-display">
                    {lang === 'nl' ? 'Missie Voltooid!' : 'Misi Selesai!'}
                  </h2>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                    {selectedField.title[lang]}
                  </p>
                </div>
              </div>

              {/* Pesan Apresiasi */}
              <div className="bg-sun/20 border-2 border-sun p-4 rounded-xl w-full mb-6 relative">
                <span className="absolute -top-4 -right-2 text-3xl bg-sand rounded-full">💡</span>
                <p className="text-dusk2 font-medium font-body leading-relaxed">
                  {selectedField.message[lang]}
                </p>
              </div>

              {/* Bullet Points */}
              <div className="bg-[#F5ECE0] p-5 rounded-xl w-full mb-8 border-2 border-[#E5DCC0]">
                <p className="font-bold text-dusk2 mb-3 text-sm font-display">
                  {lang === 'nl' ? 'Waarom dit leuk is:' : 'Kenapa ini seru:'}
                </p>
                <ul className="space-y-3">
                  {selectedField.benefits[lang].map((item, index) => (
                    <li key={index} className="flex gap-3 text-dusk2 text-sm font-body items-start">
                      <span className="text-coral text-lg leading-none">★</span>
                      <span className="leading-tight">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons (Tombol Perbaikan Hypertext/Link Eksternal) */}
              <div className="flex flex-col sm:flex-row gap-4 w-full mb-4">
                <button
                  onClick={() => {
                    const jobUrl = selectedField?.jobLink || `https://www.google.com/search?q=lowongan+kerja+${encodeURIComponent(selectedField.title[lang])}`;
                    window.open(jobUrl, '_blank', 'noopener,noreferrer');
                  }}
                  className="flex-1 bg-coral text-white font-black py-4 px-4 rounded-xl border-4 border-dusk2 shadow-[0_6px_0_0_rgba(10,44,45,1)] hover:translate-y-1 hover:shadow-[0_2px_0_0_rgba(10,44,45,1)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {lang === 'nl' ? 'Bekijk Vacatures 🎯' : 'Lihat Lowongan 🎯'}
                </button>
                
                <button
                  onClick={() => { setGameState('selector'); setSelectedField(null); }}
                  className="flex-1 bg-dusk2 text-white font-black py-4 px-4 rounded-xl border-4 border-dusk2 shadow-[0_6px_0_0_rgba(10,44,45,1)] hover:translate-y-1 hover:shadow-[0_2px_0_0_rgba(10,44,45,1)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {lang === 'nl' ? 'Ander Gebied 🗺️' : 'Bidang Lain 🗺️'}
                </button>
              </div>

              {/* Footer Text */}
              <p className="text-xs text-gray-400 text-center mt-6 font-medium">
                {lang === 'nl' ? 'Vraag je docent of bezoek een recreatiepark voor de Open Dag!' : 'Tanyakan gurumu atau kunjungi taman rekreasi saat Open House!'}
              </p>

            </div>
          </div>
        )}
      </main>
    </div>
  );
}
