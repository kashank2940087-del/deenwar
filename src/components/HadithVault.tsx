import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COMPENDIUMS, HADITH_LIST, NAMES_OF_ALLAH, PROPHETIC_TITLES } from '../data/islamicTreasury';
import {
  Library,
  Sparkles,
  Search,
  Bookmark,
  Share2,
  Copy,
  Volume2,
  Check,
  ChevronRight,
  ShieldCheck,
  Heart,
  Brain,
  SlidersHorizontal
} from 'lucide-react';

export const HadithVault: React.FC = () => {
  const { showToast } = useApp();

  const [activeSegment, setActiveSegment] = useState<'hadith' | 'names' | 'prophet'>('hadith');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All Topics');
  const [bookmarkedHadiths, setBookmarkedHadiths] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [salawatCount, setSalawatCount] = useState(313);
  const [activeNameCategory, setActiveNameCategory] = useState('All');

  const topics = [
    'All Topics',
    'Patience & Dua',
    'Character (Akhlaq)',
    'Prayer (Salah)',
    'Zakat & Charity',
    'Quran Study'
  ];

  const nameCategories = ['All', 'Mercy', 'Power', 'Majesty', 'Knowledge', 'Creation', 'Peace'];

  const filteredHadiths = HADITH_LIST.filter(h => {
    const matchesSearch =
      h.englishText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.narrator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.collection.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.arabicText.includes(searchQuery);

    const matchesTopic = selectedTopic === 'All Topics' ? true : h.topic === selectedTopic;

    return matchesSearch && matchesTopic;
  });

  const filteredNames = NAMES_OF_ALLAH.filter(n => {
    const matchesSearch =
      n.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.arabic.includes(searchQuery);

    const matchesCat = activeNameCategory === 'All' ? true : n.category === activeNameCategory;

    return matchesSearch && matchesCat;
  });

  const handleCopyHadith = (id: string, text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      showToast('Hadith copied to clipboard');
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleToggleBookmark = (id: string) => {
    setBookmarkedHadiths(prev => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter(item => item !== id) : [...prev, id];
      showToast(exists ? 'Hadith removed from saved' : 'Hadith saved to bookmarks');
      return next;
    });
  };

  const handleIncrementSalawat = () => {
    setSalawatCount(prev => prev + 1);
    showToast('اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ (+1)');

    // Gentle tactile chime
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(660, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      }
    } catch {
      // Audio optional
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 py-4 space-y-6">
      {/* 1. Sub-Header Pill & Segmented Navigation */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#f2ca50] animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#f2ca50]">
              Sanctuary Vault
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#181c1a] border border-[#f2ca50]/20 text-[#a7cfbd] text-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#f2ca50]" />
            <span>Verified Sanad</span>
          </div>
        </div>

        {/* 3 Main Segments: Hadith, 99 Names, Prophet ﷺ */}
        <div className="bg-[#101412] p-1 rounded-2xl border border-[#313633] flex items-center gap-1">
          <button
            onClick={() => setActiveSegment('hadith')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeSegment === 'hadith'
                ? 'bg-[#272b28] text-[#f2ca50] shadow-sm border border-[#f2ca50]/40'
                : 'text-[#d0c5af]/70 hover:text-[#e0e3df]'
            }`}
            type="button"
          >
            <Library className="w-4 h-4" />
            <span>Hadith Vault</span>
          </button>

          <button
            onClick={() => setActiveSegment('names')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeSegment === 'names'
                ? 'bg-[#272b28] text-[#f2ca50] shadow-sm border border-[#f2ca50]/40'
                : 'text-[#d0c5af]/70 hover:text-[#e0e3df]'
            }`}
            type="button"
          >
            <Sparkles className="w-4 h-4" />
            <span>99 Names</span>
          </button>

          <button
            onClick={() => setActiveSegment('prophet')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeSegment === 'prophet'
                ? 'bg-[#272b28] text-[#f2ca50] shadow-sm border border-[#f2ca50]/40'
                : 'text-[#d0c5af]/70 hover:text-[#e0e3df]'
            }`}
            type="button"
          >
            <Heart className="w-4 h-4" />
            <span>Prophet ﷺ</span>
          </button>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SEGMENT 1: HADITH COMPENDIUMS & SEARCH */}
      {/* ========================================================= */}
      {activeSegment === 'hadith' && (
        <div className="space-y-6">
          {/* Search & Topic Chips */}
          <div className="space-y-3">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-[#f2ca50] absolute left-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search narration, keyword, narrator, book..."
                className="w-full bg-[#181c1a] border border-[#313633] rounded-2xl pl-11 pr-10 py-3 text-xs sm:text-sm text-[#e0e3df] focus:outline-none focus:border-[#f2ca50] transition-colors shadow-inner"
              />
              <button
                type="button"
                className="absolute right-3 text-[#d0c5af] hover:text-[#f2ca50]"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Topic Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {topics.map(t => (
                <button
                  key={t}
                  onClick={() => setSelectedTopic(t)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedTopic === t
                      ? 'bg-[#f2ca50] text-[#3c2f00]'
                      : 'bg-[#181c1a] border border-[#313633] text-[#d0c5af] hover:text-[#e0e3df]'
                  }`}
                  type="button"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Classical Compendiums Grid (6 Books) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-[#e0e3df] uppercase tracking-wider">
                Classical Compendiums
              </span>
              <span className="text-xs text-[#f2ca50]">6 Authentic Books</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
              {COMPENDIUMS.map((comp) => (
                <div
                  key={comp.id}
                  onClick={() => {
                    setSearchQuery(comp.title);
                    showToast(`Filtering by ${comp.title}`);
                  }}
                  className="bg-[#181c1a] border border-[#313633] hover:border-[#f2ca50]/40 p-3 rounded-2xl flex items-center gap-3 shadow-md hover:bg-[#272b28] transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#101412] border border-[#313633] flex items-center justify-center text-[#f2ca50] group-hover:scale-105 transition-transform flex-shrink-0">
                    <span className="material-symbols-outlined text-[20px]">{comp.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-[#e0e3df] truncate group-hover:text-[#f2ca50] transition-colors">
                      {comp.title}
                    </h4>
                    <p className="text-[10px] text-[#d0c5af]/70">{comp.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hadith Narrations List */}
          <div className="space-y-4">
            {filteredHadiths.map((h) => {
              const isSaved = bookmarkedHadiths.includes(h.id);

              return (
                <div
                  key={h.id}
                  className="bg-[#181c1a] border border-[#313633] rounded-3xl p-5 sm:p-6 shadow-xl space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#294e40] text-[#a7cfbd] text-[10px] font-bold uppercase tracking-wider">
                        {h.grade}
                      </span>
                      <span className="text-xs text-[#d0c5af]/80">{h.bookName}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleToggleBookmark(h.id)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                          isSaved ? 'text-[#f2ca50]' : 'text-[#d0c5af] hover:text-[#f2ca50]'
                        }`}
                        title="Bookmark"
                        type="button"
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>

                      <button
                        onClick={() => handleCopyHadith(h.id, `${h.arabicText}\n\n"${h.englishText}"\n— ${h.narrator} (${h.collection})`)}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[#d0c5af] hover:text-[#f2ca50] transition-colors cursor-pointer"
                        title="Copy Hadith"
                        type="button"
                      >
                        {copiedId === h.id ? (
                          <Check className="w-4 h-4 text-[#a7cfbd]" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>

                      <button
                        onClick={() => showToast('Hadith share card link generated')}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[#d0c5af] hover:text-[#f2ca50] transition-colors cursor-pointer"
                        title="Share Hadith"
                        type="button"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Arabic Text */}
                  <div className="p-4 rounded-2xl bg-[#101412] border border-[#313633] text-right">
                    <p className="text-lg sm:text-xl font-quran text-[#f2ca50] leading-relaxed" dir="rtl">
                      {h.arabicText}
                    </p>
                  </div>

                  {/* English Translation & Narrator */}
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm text-[#e0e3df] leading-relaxed">
                      "{h.englishText}"
                    </p>
                    <p className="text-xs text-[#d0c5af]/80 italic">
                      {h.narrator}
                    </p>
                  </div>

                  {/* Citation Tag & Sanad */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-[#313633]/60 text-xs">
                    <div className="flex items-center gap-1.5 text-[#d0c5af]/70">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#f2ca50]" />
                      <span>{h.collection} • {h.hadithNumber}</span>
                    </div>

                    <button
                      onClick={() => showToast(h.commentary || 'Authentic Sanad transmission')}
                      className="text-[#f2ca50] hover:underline font-semibold text-left sm:text-right"
                    >
                      Study Sanad &amp; Commentary
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Daily Scholarly Reflection Card */}
          <div className="bg-gradient-to-r from-[#1c211e] via-[#272b28] to-[#1c211e] border border-[#f2ca50]/30 rounded-3xl p-5 shadow-lg flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#f2ca50]/20 text-[#f2ca50] flex items-center justify-center flex-shrink-0">
              <Brain className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-[#e0e3df]">Reflective Scholarly Commentary</h4>
              <p className="text-xs text-[#d0c5af]/80 line-clamp-2 mt-0.5">
                Imam An-Nawawi highlighted that sincerity forms the cornerstone of every righteous deed and spiritual purification.
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-[#f2ca50] flex-shrink-0" />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SEGMENT 2: 99 NAMES OF ALLAH (Asma-ul-Husna) */}
      {/* ========================================================= */}
      {activeSegment === 'names' && (
        <div className="space-y-6">
          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {nameCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveNameCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeNameCategory === cat
                    ? 'bg-[#f2ca50] text-[#3c2f00]'
                    : 'bg-[#181c1a] border border-[#313633] text-[#d0c5af] hover:text-[#e0e3df]'
                }`}
                type="button"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Names List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredNames.map((name) => (
              <div
                key={name.id}
                className="bg-[#181c1a] border border-[#313633] hover:border-[#f2ca50]/40 rounded-3xl p-4 sm:p-5 shadow-md flex items-center justify-between gap-3 hover:bg-[#272b28] transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-[#101412] border border-[#f2ca50]/30 flex items-center justify-center font-mono text-sm font-bold text-[#f2ca50] flex-shrink-0">
                    {String(name.id).padStart(2, '0')}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-playfair text-base font-bold text-[#e0e3df] truncate">
                        {name.transliteration}
                      </h4>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#f2ca50]/15 text-[#f2ca50] uppercase">
                        {name.quranRef}
                      </span>
                    </div>
                    <p className="text-xs text-[#d0c5af]/80 truncate mt-0.5">
                      {name.meaning}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className="font-quran text-2xl text-[#f2ca50]" dir="rtl">
                    {name.arabic}
                  </span>
                  <button
                    onClick={() => showToast(`Reciting: ${name.transliteration}`)}
                    className="w-7 h-7 rounded-full bg-[#101412] text-[#f2ca50] hover:bg-[#f2ca50] hover:text-[#3c2f00] flex items-center justify-center transition-all"
                    title="Pronunciation audio"
                    type="button"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Memorization Practice Banner */}
          <div className="bg-gradient-to-r from-[#1c211e] via-[#294e40]/70 to-[#1c211e] border border-[#f2ca50]/30 p-5 rounded-3xl shadow-lg flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#f2ca50]/20 text-[#f2ca50] flex items-center justify-center">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-bold text-[#e0e3df] block">Hifdh Memorization Mode</span>
                <span className="text-xs text-[#d0c5af]/80">Master the 99 Divine Names with active recall</span>
              </div>
            </div>

            <button
              onClick={() => showToast('Memorization mode engaged: Quiz coming up')}
              className="px-4 py-2 rounded-xl bg-[#f2ca50] text-[#3c2f00] text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all"
            >
              Practice Now
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SEGMENT 3: 100 TITLES OF PROPHET MUHAMMAD ﷺ */}
      {/* ========================================================= */}
      {activeSegment === 'prophet' && (
        <div className="space-y-6">
          {/* Salawat Tribute Header */}
          <div className="bg-[#181c1a] border border-[#f2ca50]/30 rounded-3xl p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-[#f2ca50] fill-[#f2ca50]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#f2ca50]">
                  Salawat &amp; Durood
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#e0e3df] leading-relaxed">
                "Indeed, Allah and His angels send blessings upon the Prophet. O you who have believed, ask [Allah to confer] blessings upon him and ask [Allah to grant him] peace."
              </p>
              <span className="text-xs text-[#a7cfbd]">Surah Al-Ahzab (33:56)</span>
            </div>

            <button
              onClick={handleIncrementSalawat}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#f2ca50] to-[#d4af37] text-[#3c2f00] text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer flex-shrink-0"
              type="button"
            >
              <span>Send Salawat</span>
              <Heart className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>

          {/* Titles List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PROPHETIC_TITLES.map((t) => (
              <div
                key={t.id}
                className="bg-[#181c1a] border border-[#313633] hover:border-[#f2ca50]/40 rounded-3xl p-4 sm:p-5 shadow-md flex flex-col justify-between gap-2 hover:bg-[#272b28] transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#101412] text-[#f2ca50] text-[10px] font-bold flex items-center justify-center">
                      {t.id}
                    </span>
                    <h4 className="font-playfair text-base font-bold text-[#e0e3df]">
                      {t.title}
                    </h4>
                  </div>
                  <span className="font-quran text-2xl text-[#f2ca50]" dir="rtl">
                    {t.arabic}
                  </span>
                </div>

                <p className="text-xs text-[#d0c5af] leading-relaxed">
                  <strong>"{t.meaning}"</strong> — {t.explanation}
                </p>

                <div className="pt-2 border-t border-[#313633]/60 flex items-center justify-between text-[11px] text-[#99907c]">
                  <span className="text-[#a7cfbd]">{t.source}</span>
                  <span className="material-symbols-outlined text-[14px] text-[#f2ca50]">verified</span>
                </div>
              </div>
            ))}
          </div>

          {/* Salawat Live Counter Card */}
          <div className="bg-[#1c211e] border border-[#313633] p-5 rounded-3xl shadow-xl flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[#f2ca50] uppercase tracking-wider">
                Daily Durood Recited
              </span>
              <span className="font-playfair text-3xl font-extrabold text-[#e0e3df] mt-0.5">
                {salawatCount}
              </span>
              <span className="text-xs text-[#d0c5af]/70">Salawat sent today</span>
            </div>

            <button
              onClick={handleIncrementSalawat}
              className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#f2ca50] to-[#d4af37] text-[#3c2f00] flex items-center justify-center shadow-lg active:scale-90 transition-transform cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[28px]">touch_app</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
