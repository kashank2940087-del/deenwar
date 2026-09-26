import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ALL_114_SURAHS, FEATURED_SURAHS_AYAHS } from '../data/quranData';
import {
  Search,
  BookOpen,
  Volume2,
  Play,
  Pause,
  Repeat,
  Repeat1,
  Copy,
  Bookmark,
  Share2,
  Sparkles,
  ArrowRight,
  Palette,
  History,
  Check
} from 'lucide-react';

export const QuranExplorer: React.FC = () => {
  const {
    playingSurahNumber,
    setPlayingSurahNumber,
    playingAyahNumber,
    setPlayingAyahNumber,
    isPlayingAudio,
    togglePlayAudio,
    currentReciter,
    setCurrentReciter,
    audioSpeed,
    cycleAudioSpeed,
    showToast,
    setShowProModal
  } = useApp();

  const [activeTab, setActiveTab] = useState<'surah' | 'juz' | 'saved'>('surah');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJuz, setSelectedJuz] = useState<number | null>(null);
  const [arabicFontSize, setArabicFontSize] = useState<number>(30); // in px
  const [isRepeatOne, setIsRepeatOne] = useState(false);
  const [readingTheme, setReadingTheme] = useState<'dark' | 'emerald' | 'warm'>('dark');
  const [savedAyahs, setSavedAyahs] = useState<number[]>([14]);
  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);

  const currentSurah = ALL_114_SURAHS.find(s => s.number === playingSurahNumber) || ALL_114_SURAHS[66];
  const currentAyahs = FEATURED_SURAHS_AYAHS[playingSurahNumber] || FEATURED_SURAHS_AYAHS[67];

  // Filter 114 Surahs
  const filteredSurahs = ALL_114_SURAHS.filter(s => {
    const matchesSearch =
      s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.englishNameTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.includes(searchQuery) ||
      s.number.toString() === searchQuery;

    const matchesJuz = selectedJuz ? s.juz === selectedJuz : true;

    return matchesSearch && matchesJuz;
  });

  const handleAdjustFontSize = (delta: number) => {
    setArabicFontSize(prev => Math.max(20, Math.min(48, prev + delta)));
  };

  const handleCycleTheme = () => {
    const themes: Array<'dark' | 'emerald' | 'warm'> = ['dark', 'emerald', 'warm'];
    const next = themes[(themes.indexOf(readingTheme) + 1) % themes.length];
    setReadingTheme(next);
    showToast(`Reading theme: ${next.toUpperCase()}`);
  };

  const handleCopyAyah = (ayahNum: number, text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedAyah(ayahNum);
      showToast(`Ayah ${ayahNum} copied to clipboard`);
      setTimeout(() => setCopiedAyah(null), 2000);
    }
  };

  const handleToggleBookmark = (ayahNum: number) => {
    setSavedAyahs(prev => {
      const exists = prev.includes(ayahNum);
      const next = exists ? prev.filter(n => n !== ayahNum) : [...prev, ayahNum];
      showToast(exists ? `Ayah ${ayahNum} removed from saved` : `Ayah ${ayahNum} saved`);
      return next;
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 py-4 space-y-6">
      {/* 1. Search & Segment Tabs */}
      <div className="space-y-3">
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-[#f2ca50] absolute left-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search all 114 Surahs, Ayah, Juz or translation..."
            className="w-full bg-[#181c1a] border border-[#313633] rounded-2xl pl-11 pr-10 py-3 text-xs sm:text-sm text-[#e0e3df] focus:outline-none focus:border-[#f2ca50] transition-colors shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-xs text-[#d0c5af] hover:text-[#f2ca50]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Quick Segment Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#101412] rounded-xl border border-[#313633]">
          <button
            onClick={() => {
              setActiveTab('surah');
              setSelectedJuz(null);
            }}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'surah'
                ? 'bg-[#272b28] text-[#f2ca50] shadow-sm border border-[#f2ca50]/40'
                : 'text-[#d0c5af]/70 hover:text-[#e0e3df]'
            }`}
            type="button"
          >
            <BookOpen className="w-4 h-4" />
            <span>Surah (114)</span>
          </button>

          <button
            onClick={() => setActiveTab('juz')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'juz'
                ? 'bg-[#272b28] text-[#f2ca50] shadow-sm border border-[#f2ca50]/40'
                : 'text-[#d0c5af]/70 hover:text-[#e0e3df]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">view_agenda</span>
            <span>Juz / Para (30)</span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'saved'
                ? 'bg-[#272b28] text-[#f2ca50] shadow-sm border border-[#f2ca50]/40'
                : 'text-[#d0c5af]/70 hover:text-[#e0e3df]'
            }`}
            type="button"
          >
            <Bookmark className="w-4 h-4" />
            <span>Saved ({savedAyahs.length})</span>
          </button>
        </div>

        {/* Juz 1-30 Pills when Juz tab is active */}
        {activeTab === 'juz' && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 pt-1 no-scrollbar">
            {Array.from({ length: 30 }, (_, i) => i + 1).map(j => (
              <button
                key={j}
                onClick={() => setSelectedJuz(selectedJuz === j ? null : j)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold flex-shrink-0 transition-all ${
                  selectedJuz === j
                    ? 'bg-[#f2ca50] text-[#3c2f00]'
                    : 'bg-[#181c1a] border border-[#313633] text-[#d0c5af] hover:text-[#f2ca50]'
                }`}
              >
                Juz {j}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 2. Last Studied Ayah Card (Hero) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1c211e] via-[#181c1a] to-[#101412] border border-[#f2ca50]/30 p-5 sm:p-6 shadow-xl">
        <div className="absolute right-4 bottom-2 text-[#f2ca50]/10 font-serif text-[100px] select-none pointer-events-none leading-none">
          ٦٧
        </div>

        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f2ca50] animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#f2ca50]">
                Last Studied Ayah
              </span>
            </div>
            <span className="text-xs text-[#d0c5af]/80 bg-[#272b28] px-2.5 py-0.5 rounded-full border border-[#313633]">
              Juz 29
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <div>
              <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#e0e3df]">
                Surah Al-Mulk
              </h2>
              <p className="text-xs text-[#d0c5af]/80">The Sovereignty • Ayah 14</p>
            </div>
            <span className="font-quran text-3xl text-[#f2ca50]/90">الملك</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#101412]/80 border border-[#313633] space-y-1.5">
            <p className="text-lg sm:text-xl text-right text-[#f2ca50] font-quran font-medium leading-relaxed" dir="rtl">
              أَلَا يَعْلَمُ مَنْ خَلَقَ وَهُوَ ٱللَّطِيفُ ٱلْخَبِيرُ
            </p>
            <p className="text-xs text-[#d0c5af]/90 italic">
              "Does He not know that which He created, while He is the Subtle, the Acquainted?"
            </p>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5 text-xs text-[#d0c5af]/60">
              <History className="w-4 h-4 text-[#a7cfbd]" />
              <span>Yesterday at 11:42 PM</span>
            </div>

            <button
              onClick={() => {
                setPlayingSurahNumber(67);
                setPlayingAyahNumber(14);
                showToast('Resuming Surah Al-Mulk');
              }}
              className="flex items-center gap-1.5 py-1.5 px-3.5 rounded-full bg-gradient-to-r from-[#f2ca50] to-[#d4af37] text-[#3c2f00] text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Resume Reading</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Active Surah Interactive Reader Panel */}
      <div
        className={`rounded-3xl border p-5 sm:p-6 shadow-xl space-y-4 transition-colors ${
          readingTheme === 'dark'
            ? 'bg-[#181c1a] border-[#313633]'
            : readingTheme === 'emerald'
            ? 'bg-[#12241d] border-[#294e40]'
            : 'bg-[#211e17] border-[#4d4635]'
        }`}
      >
        {/* Reader Header & Font Scaling Buttons */}
        <div className="flex items-center justify-between border-b border-[#313633]/60 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#272b28] border border-[#f2ca50]/30 flex items-center justify-center text-[#f2ca50] font-bold text-xs">
              {currentSurah.number}
            </div>
            <div>
              <h3 className="font-playfair text-lg font-bold text-[#e0e3df]">
                {currentSurah.englishName}
              </h3>
              <span className="text-[11px] text-[#a7cfbd]">
                {currentSurah.numberOfAyahs} Ayahs • Revealed in {currentSurah.revelationType}
              </span>
            </div>
          </div>

          {/* Aesthetic Controls: Font scaling & Theme */}
          <div className="flex items-center gap-1.5 bg-[#101412] rounded-xl p-1 border border-[#313633]">
            <button
              onClick={() => handleAdjustFontSize(-2)}
              className="w-7 h-7 flex items-center justify-center text-xs font-bold text-[#d0c5af] hover:text-[#f2ca50] active:scale-90"
              title="Decrease Arabic font size"
            >
              A-
            </button>
            <div className="w-[1px] h-3 bg-[#313633]"></div>
            <button
              onClick={() => handleAdjustFontSize(2)}
              className="w-7 h-7 flex items-center justify-center text-xs font-bold text-[#d0c5af] hover:text-[#f2ca50] active:scale-90"
              title="Increase Arabic font size"
            >
              A+
            </button>
            <div className="w-[1px] h-3 bg-[#313633]"></div>
            <button
              onClick={handleCycleTheme}
              className="w-7 h-7 flex items-center justify-center text-[#f2ca50] hover:text-[#e0e3df] active:scale-90"
              title="Switch reading aura theme"
            >
              <Palette className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Audio Reciter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-2xl bg-[#101412] border border-[#313633] gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#f2ca50] text-[#3c2f00] flex items-center justify-center flex-shrink-0">
              <Volume2 className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-[#d0c5af]/60">Studio Recitation By</p>
              <p className="text-xs font-bold text-[#e0e3df] truncate">
                {currentReciter === 'mishary'
                  ? 'Mishary Rashid Alafasy'
                  : currentReciter === 'abdulbasit'
                  ? 'Abdul Basit (Murattal)'
                  : currentReciter === 'sudais'
                  ? 'Abdur-Rahman As-Sudais'
                  : 'Maher Al-Muaiqly'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={currentReciter}
              onChange={e => setCurrentReciter(e.target.value)}
              className="bg-[#181c1a] border border-[#313633] text-[#f2ca50] text-xs font-semibold py-1.5 px-3 rounded-xl focus:outline-none cursor-pointer"
            >
              <option value="mishary">Mishary Alafasy</option>
              <option value="abdulbasit">Abdul Basit (Murattal)</option>
              <option value="sudais">Abdur-Rahman As-Sudais</option>
              <option value="maher">Maher Al-Muaiqly</option>
            </select>

            <button
              onClick={cycleAudioSpeed}
              className="px-2 py-1 bg-[#181c1a] border border-[#313633] rounded-lg text-xs font-mono font-bold text-[#f2ca50]"
            >
              {audioSpeed}
            </button>

            <button
              onClick={() => {
                setIsRepeatOne(!isRepeatOne);
                showToast(isRepeatOne ? 'Continuous playback' : 'Repeat current Ayah');
              }}
              className={`p-1.5 rounded-lg border transition-colors ${
                isRepeatOne
                  ? 'bg-[#f2ca50]/20 border-[#f2ca50] text-[#f2ca50]'
                  : 'bg-[#181c1a] border-[#313633] text-[#d0c5af]'
              }`}
            >
              {isRepeatOne ? <Repeat1 className="w-4 h-4" /> : <Repeat className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Ayahs Stream */}
        <div className="space-y-4 pt-1">
          {currentAyahs.map((ayah) => {
            const isPlaying = ayah.numberInSurah === playingAyahNumber;
            const isSaved = savedAyahs.includes(ayah.numberInSurah);

            return (
              <div
                key={ayah.numberInSurah}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  isPlaying
                    ? 'bg-[#272b28] border-[#f2ca50] shadow-[0_4px_20px_rgba(242,202,80,0.15)] ring-1 ring-[#f2ca50]/50'
                    : 'bg-[#101412]/80 border-[#313633] hover:border-[#4d4635]'
                }`}
              >
                {/* Header row */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        isPlaying
                          ? 'bg-[#f2ca50] text-[#3c2f00] shadow'
                          : 'bg-[#272b28] text-[#f2ca50]'
                      }`}
                    >
                      {ayah.numberInSurah}
                    </span>
                    {isPlaying && (
                      <span className="text-[10px] font-bold text-[#f2ca50] bg-[#f2ca50]/20 px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">
                        Playing Ayah
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-[#d0c5af]">
                    <button
                      onClick={() => {
                        setPlayingAyahNumber(ayah.numberInSurah);
                        if (!isPlayingAudio) togglePlayAudio();
                      }}
                      className="w-7 h-7 flex items-center justify-center hover:text-[#f2ca50] transition-colors"
                      title="Play Ayah"
                    >
                      {isPlaying && isPlayingAudio ? (
                        <Pause className="w-4 h-4 fill-current text-[#f2ca50]" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </button>

                    <button
                      onClick={() => handleToggleBookmark(ayah.numberInSurah)}
                      className={`w-7 h-7 flex items-center justify-center transition-colors ${
                        isSaved ? 'text-[#f2ca50]' : 'hover:text-[#f2ca50]'
                      }`}
                      title="Bookmark Ayah"
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>

                    <button
                      onClick={() => handleCopyAyah(ayah.numberInSurah, ayah.text)}
                      className="w-7 h-7 flex items-center justify-center hover:text-[#f2ca50] transition-colors"
                      title="Copy Ayah text"
                    >
                      {copiedAyah === ayah.numberInSurah ? (
                        <Check className="w-4 h-4 text-[#a7cfbd]" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Arabic Quranic Script */}
                <p
                  className="text-right text-[#f2ca50] font-quran font-medium pt-2 pb-3 tracking-wide"
                  style={{
                    fontSize: `${arabicFontSize}px`,
                    lineHeight: `${arabicFontSize * 1.85}px`
                  }}
                  dir="rtl"
                >
                  {ayah.text}
                </p>

                {/* Transliteration */}
                <p className="text-xs text-[#a7cfbd] italic mb-1.5 leading-relaxed">
                  {ayah.transliteration}
                </p>

                {/* English Translation */}
                <p className="text-xs sm:text-sm text-[#e0e3df] leading-relaxed">
                  {ayah.translation}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Complete 114 Surah Directory */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-playfair text-lg font-bold text-[#e0e3df]">
            Complete Surah Directory
          </h3>
          <span className="text-xs text-[#d0c5af]/70">
            Showing {filteredSurahs.length} of 114 Surahs
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {filteredSurahs.map((surah) => {
            const isSelected = surah.number === playingSurahNumber;

            return (
              <div
                key={surah.number}
                onClick={() => {
                  setPlayingSurahNumber(surah.number);
                  setPlayingAyahNumber(1);
                  showToast(`Selected Surah ${surah.englishName}`);
                }}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-[#272b28] border-[#f2ca50] shadow-md ring-1 ring-[#f2ca50]/50'
                    : 'bg-[#181c1a] border-[#313633] hover:bg-[#1c211e] hover:border-[#4d4635]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                      isSelected
                        ? 'bg-[#f2ca50] text-[#3c2f00]'
                        : 'bg-[#101412] text-[#f2ca50] border border-[#f2ca50]/20'
                    }`}
                  >
                    {surah.number}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs sm:text-sm font-bold text-[#e0e3df] truncate">
                        {surah.englishName}
                      </h4>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#101412] text-[#a7cfbd] uppercase border border-[#313633]">
                        {surah.revelationType}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#d0c5af]/70 truncate">
                      {surah.englishNameTranslation} • {surah.numberOfAyahs} Ayahs
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="font-quran text-2xl text-[#f2ca50]">{surah.name}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setPlayingSurahNumber(surah.number);
                      togglePlayAudio();
                    }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isSelected && isPlayingAudio
                        ? 'bg-[#f2ca50] text-[#3c2f00]'
                        : 'bg-[#272b28] text-[#f2ca50] hover:bg-[#f2ca50] hover:text-[#3c2f00]'
                    }`}
                  >
                    {isSelected && isPlayingAudio ? (
                      <Pause className="w-4 h-4 fill-current" />
                    ) : (
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pro Sanctuary Ad-Free Banner ($12 Offer) */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#1c211e] via-[#294e40]/70 to-[#1c211e] border border-[#f2ca50]/30 shadow-md flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <Sparkles className="w-5 h-5 text-[#f2ca50] flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs font-bold text-[#e0e3df] truncate">
              Spiritual Sanctuary Uninterrupted
            </p>
            <p className="text-[11px] text-[#d0c5af]/80 truncate">
              Ad-free with DEENWAR Premium (30-Day Flat Discount)
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowProModal(true)}
          className="px-3.5 py-1.5 rounded-full bg-[#f2ca50] text-[#3c2f00] text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all flex-shrink-0"
        >
          Upgrade $12
        </button>
      </div>
    </div>
  );
};
