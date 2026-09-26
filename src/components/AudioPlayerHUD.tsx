import React from 'react';
import { useApp } from '../context/AppContext';
import { ALL_114_SURAHS } from '../data/quranData';
import { BookOpen, Play, Pause, SkipBack, SkipForward } from 'lucide-react';

export const AudioPlayerHUD: React.FC = () => {
  const {
    playingSurahNumber,
    playingAyahNumber,
    isPlayingAudio,
    togglePlayAudio,
    currentReciter,
    setPlayingSurahNumber,
    setActiveTab,
    showToast
  } = useApp();

  const currentSurah = ALL_114_SURAHS.find(s => s.number === playingSurahNumber) || ALL_114_SURAHS[66];

  const reciterNames: Record<string, string> = {
    mishary: 'Mishary Rashid Alafasy',
    abdulbasit: 'Abdul Basit (Murattal)',
    sudais: 'Abdur-Rahman As-Sudais',
    maher: 'Maher Al-Muaiqly'
  };

  const handleNext = () => {
    const nextNum = playingSurahNumber >= 114 ? 1 : playingSurahNumber + 1;
    setPlayingSurahNumber(nextNum);
    showToast(`Next: ${ALL_114_SURAHS[nextNum - 1]?.englishName}`);
  };

  const handlePrev = () => {
    const prevNum = playingSurahNumber <= 1 ? 114 : playingSurahNumber - 1;
    setPlayingSurahNumber(prevNum);
    showToast(`Previous: ${ALL_114_SURAHS[prevNum - 1]?.englishName}`);
  };

  return (
    <div className="fixed bottom-20 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md z-30 pb-safe">
      <div className="bg-[#1c211e]/95 backdrop-blur-2xl rounded-2xl p-2.5 sm:p-3 border border-[#f2ca50]/25 shadow-[0_12px_36px_rgba(0,0,0,0.7)] flex items-center justify-between gap-3">
        {/* Left Information */}
        <div
          onClick={() => setActiveTab('quran')}
          className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#101412] border border-[#f2ca50]/30 flex items-center justify-center text-[#f2ca50] flex-shrink-0 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <p className="text-xs sm:text-sm font-semibold text-[#e0e3df] truncate group-hover:text-[#f2ca50] transition-colors">
                Surah {currentSurah.englishName}
              </p>
              <span className="text-[10px] text-[#f2ca50] font-bold">
                (Ayah {playingAyahNumber})
              </span>
            </div>
            <p className="text-[11px] text-[#d0c5af]/70 truncate">
              {reciterNames[currentReciter] || 'Mishary Rashid Alafasy'}
            </p>
          </div>
        </div>

        {/* Right Playback Controls */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={handlePrev}
            aria-label="Previous Surah"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#d0c5af] hover:text-[#f2ca50] active:scale-95 transition-all"
            type="button"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlayAudio}
            aria-label={isPlayingAudio ? 'Pause recitation' : 'Play recitation'}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-[#f2ca50] to-[#d4af37] text-[#3c2f00] flex items-center justify-center shadow-[0_0_15px_rgba(242,202,80,0.4)] active:scale-90 transition-transform cursor-pointer"
            type="button"
          >
            {isPlayingAudio ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          <button
            onClick={handleNext}
            aria-label="Next Surah"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#d0c5af] hover:text-[#f2ca50] active:scale-95 transition-all"
            type="button"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
