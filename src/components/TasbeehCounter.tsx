import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Volume2,
  VolumeX,
  RotateCcw,
  Vibrate,
  Flame,
  ChevronDown,
  ChevronUp,
  Share2,
  Bookmark,
  Plus
} from 'lucide-react';

interface DhikrPreset {
  id: string;
  arabic: string;
  title: string;
  transliteration: string;
  target: number;
  hadith: string;
}

const PRESETS: DhikrPreset[] = [
  {
    id: 'subhanallah',
    arabic: 'سُبْحَانَ اللَّهِ',
    title: 'SubhanAllah',
    transliteration: 'Glory be to Allah',
    target: 33,
    hadith: '“Whoever says SubhanAllah 33 times after every prayer, his sins are forgiven even if they were like the foam of the sea.” (Sahih Muslim)'
  },
  {
    id: 'alhamdulillah',
    arabic: 'الْحَمْدُ لِلَّهِ',
    title: 'Alhamdulillah',
    transliteration: 'All praise is for Allah',
    target: 33,
    hadith: '“And Alhamdulillah (Praise be to Allah) fills the divine scale of deeds.” (Sahih Muslim 223)'
  },
  {
    id: 'allahuakbar',
    arabic: 'اللَّهُ أَكْبَرُ',
    title: 'Allahu Akbar',
    transliteration: 'Allah is the Greatest',
    target: 34,
    hadith: '“Say Takbir 34 times before sleeping; it is greater for you than having a servant.” (Sahih Bukhari)'
  },
  {
    id: 'astaghfirullah',
    arabic: 'أَسْتَغْفِرُ اللَّهَ',
    title: 'Astaghfirullah',
    transliteration: 'I seek Allah\'s forgiveness',
    target: 100,
    hadith: '“By Allah, I seek Allah\'s forgiveness and turn to Him in repentance more than seventy times a day.” (Bukhari)'
  },
  {
    id: 'tahlil',
    arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ',
    title: 'La ilaha illallah',
    transliteration: 'There is no god but Allah',
    target: 100,
    hadith: '“The best Dhikr is \'La ilaha illallah\' and the best supplication is \'Alhamdulillah\'. (Sunan at-Tirmidhi)'
  },
  {
    id: 'salawat',
    arabic: 'اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ',
    title: 'Salawat on Prophet',
    transliteration: 'O Allah, send blessings upon Muhammad',
    target: 100,
    hadith: '“Whoever sends blessings upon me once, Allah will send blessings upon him tenfold.” (Sahih Muslim 408)'
  }
];

export const TasbeehCounter: React.FC = () => {
  const { setShowProModal, showToast, user } = useApp();

  const [selectedPreset, setSelectedPreset] = useState<DhikrPreset>(PRESETS[0]);
  const [currentCount, setCurrentCount] = useState(23);
  const [dailyTotal, setDailyTotal] = useState(342);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isHapticOn, setIsHapticOn] = useState(true);
  const [accordionOpen, setAccordionOpen] = useState(true);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customTarget, setCustomTarget] = useState(33);
  const [tapRipple, setTapRipple] = useState(false);

  // Web Audio Context for synthesized serene sound chime
  const playBeadChime = () => {
    if (!isSoundOn) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
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

  const triggerHaptic = () => {
    if (isHapticOn && 'vibrate' in navigator) {
      try {
        navigator.vibrate(15);
      } catch {
        // Fallback
      }
    }
  };

  const handleTap = () => {
    setCurrentCount(prev => prev + 1);
    setDailyTotal(prev => prev + 1);
    playBeadChime();
    triggerHaptic();

    setTapRipple(true);
    setTimeout(() => setTapRipple(false), 250);
  };

  const handleReset = () => {
    setCurrentCount(0);
    showToast('Counter reset to 0');
    if ('vibrate' in navigator) {
      try { navigator.vibrate([20, 50, 20]); } catch {}
    }
  };

  const handleSelectPreset = (p: DhikrPreset) => {
    setSelectedPreset(p);
    setCurrentCount(0);
    showToast(`Loaded ${p.title} (${p.target} beads)`);
  };

  const handleSaveCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle) return;

    const newPreset: DhikrPreset = {
      id: 'custom-' + Date.now(),
      arabic: 'ذِكْرٌ مُبَارَكٌ',
      title: customTitle,
      transliteration: 'Sacred Custom Invocation',
      target: customTarget || 33,
      hadith: 'Engage continuous remembrance with sincere heart and complete peace.'
    };

    setSelectedPreset(newPreset);
    setCurrentCount(0);
    setShowCustomModal(false);
    showToast(`Custom Dhikr "${customTitle}" initiated`);
  };

  // SVG Circular math
  const radius = 96;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(1, currentCount / selectedPreset.target);
  const strokeOffset = circumference - (progress * circumference);
  const cycleNumber = Math.floor(currentCount / selectedPreset.target) + 1;

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 py-4 space-y-6">
      {/* 1. Patron Banner (Free users only) */}
      {!user?.isPro && (
        <div className="w-full bg-[#181c1a] border border-[#f2ca50]/30 rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#272b28] border border-[#f2ca50]/30 flex items-center justify-center text-[#f2ca50] flex-shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-[#f2ca50] uppercase tracking-wider block">
                Patron Offer • 30-Day Ramadan Discount
              </span>
              <p className="text-xs text-[#e0e3df] truncate">
                Go 100% Ad-Free for Life • VIP Sanctuary ($12 Flat Rate)
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowProModal(true)}
            className="px-3.5 py-1.5 rounded-full bg-[#f2ca50] text-[#3c2f00] text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all flex-shrink-0 cursor-pointer"
          >
            Upgrade $12
          </button>
        </div>
      )}

      {/* 2. Dhikr Preset Selector Carousel */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-[#f2ca50] uppercase tracking-wider">
            Sacred Invocations
          </span>
          <button
            onClick={() => setShowCustomModal(true)}
            className="flex items-center gap-1 text-xs text-[#a7cfbd] hover:text-[#f2ca50] transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Custom Dhikr</span>
          </button>
        </div>

        {/* Carousel */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
          {PRESETS.map((p) => {
            const isSelected = selectedPreset.id === p.id;

            return (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p)}
                className={`flex-shrink-0 min-w-[136px] p-3.5 rounded-2xl flex flex-col text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#294e40]/70 border border-[#f2ca50] shadow-lg ring-1 ring-[#f2ca50]/40'
                    : 'bg-[#181c1a] border border-[#313633] hover:border-[#4d4635]'
                }`}
                type="button"
              >
                <span className="text-[10px] font-bold text-[#f2ca50]">
                  {p.target} Beads
                </span>
                <span className="font-quran text-xl text-[#e0e3df] mt-1 line-clamp-1" dir="rtl">
                  {p.arabic}
                </span>
                <span className="text-xs text-[#d0c5af]/80 truncate mt-0.5">
                  {p.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. The Grand Digital Tasbeeh Counter Centerpiece */}
      <div className="relative w-full flex flex-col items-center bg-[#181c1a] border border-[#f2ca50]/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Ambient Gold Halo */}
        <div className="absolute -top-16 w-64 h-64 rounded-full bg-[#f2ca50]/10 blur-3xl pointer-events-none"></div>

        {/* Active Inscription */}
        <div className="relative z-10 flex flex-col items-center text-center mb-4 space-y-1">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#294e40]/60 border border-[#f2ca50]/30 mb-1">
            <Sparkles className="w-3 h-3 text-[#f2ca50]" />
            <span className="text-[10px] font-bold text-[#a7cfbd] uppercase tracking-wider">
              Cycle {cycleNumber} • Target: {selectedPreset.target}
            </span>
          </div>

          <h2 className="font-quran text-3xl sm:text-4xl text-[#f2ca50] font-bold tracking-wide" dir="rtl">
            {selectedPreset.arabic}
          </h2>
          <p className="text-xs text-[#d0c5af] font-medium">
            {selectedPreset.transliteration} • {selectedPreset.title}
          </p>
        </div>

        {/* Circular SVG Gauge & Bead Trigger */}
        <div className="relative w-64 h-64 flex items-center justify-center my-2">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 240 240">
            {/* Outer ticks */}
            <circle
              className="text-[#272b28]"
              cx="120"
              cy="120"
              fill="none"
              r="110"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4 8"
              opacity="0.5"
            />
            {/* Background track */}
            <circle
              className="text-[#272b28]"
              cx="120"
              cy="120"
              fill="none"
              r={radius}
              stroke="currentColor"
              strokeWidth="12"
            />
            {/* Glowing active progress track */}
            <circle
              className="text-[#f2ca50] transition-all duration-200 ease-out"
              cx="120"
              cy="120"
              fill="none"
              r={radius}
              stroke="currentColor"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeOffset}
            />
          </svg>

          {/* Center Tactile Bead Trigger */}
          <button
            onClick={handleTap}
            aria-label="Tap to increment dhikr count"
            className="absolute inset-5 rounded-full bg-gradient-to-b from-[#1c211e] via-[#272b28] to-[#101412] border border-[#f2ca50]/40 flex flex-col items-center justify-center shadow-[inset_0_2px_12px_rgba(242,202,80,0.3)] active:scale-90 transition-transform duration-100 select-none group cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px] text-[#f2ca50]/70 group-hover:text-[#f2ca50] mb-0.5 transition-colors">
              touch_app
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-playfair text-4xl sm:text-5xl font-black text-[#e0e3df] tracking-tight leading-none">
                {currentCount}
              </span>
              <span className="text-lg text-[#d0c5af]/60 font-medium">
                /{selectedPreset.target}
              </span>
            </div>
            <span className="text-[10px] text-[#a7cfbd] font-bold uppercase tracking-widest mt-1">
              Tap Bead
            </span>

            {/* Tap Ripple Pulse */}
            <div
              className={`absolute inset-0 rounded-full bg-[#f2ca50]/20 pointer-events-none transition-all duration-200 ${
                tapRipple ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}
            ></div>
          </button>
        </div>

        {/* HUD Controls: Chime, Haptic, Reset */}
        <div className="w-full flex items-center justify-between pt-4 mt-2 border-t border-[#313633]/60 px-2 sm:px-6">
          <button
            onClick={() => {
              setIsSoundOn(!isSoundOn);
              showToast(isSoundOn ? 'Chime muted' : 'Chime active');
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#101412] border border-[#313633] text-xs font-semibold text-[#d0c5af] hover:text-[#f2ca50] transition-colors cursor-pointer"
            type="button"
          >
            {isSoundOn ? <Volume2 className="w-4 h-4 text-[#f2ca50]" /> : <VolumeX className="w-4 h-4" />}
            <span>{isSoundOn ? 'Chime On' : 'Chime Off'}</span>
          </button>

          <button
            onClick={() => {
              setIsHapticOn(!isHapticOn);
              showToast(isHapticOn ? 'Haptics disabled' : 'Haptics enabled');
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#294e40]/40 border border-[#a7cfbd]/30 text-xs font-semibold text-[#a7cfbd] transition-colors cursor-pointer"
            type="button"
          >
            <Vibrate className="w-4 h-4 text-[#a7cfbd]" />
            <span>{isHapticOn ? 'Haptic: Subtle' : 'Haptic: Off'}</span>
          </button>

          <button
            onClick={handleReset}
            className="w-10 h-10 rounded-xl bg-[#101412] border border-[#313633] flex items-center justify-center text-[#d0c5af] hover:text-red-400 transition-colors cursor-pointer"
            title="Reset Counter"
            type="button"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4. Analytics & Devotion Streak */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-[#f2ca50] uppercase tracking-wider">
            Spiritual Sanctuary Analytics
          </span>
          <span className="text-xs text-[#a7cfbd]">Cloud Synced</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Today's Praises */}
          <div className="bg-[#181c1a] border border-[#313633] rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#d0c5af]/80 uppercase">Daily Praises</span>
              <span className="material-symbols-outlined text-[18px] text-[#f2ca50]">stacked_line_chart</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-playfair text-3xl font-extrabold text-[#e0e3df]">{dailyTotal}</span>
              <span className="text-xs text-[#d0c5af]/60">/ 500 Target</span>
            </div>
            <div className="w-full bg-[#101412] h-2 rounded-full overflow-hidden mt-3 border border-[#313633]">
              <div
                className="bg-gradient-to-r from-[#f2ca50] to-[#a7cfbd] h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (dailyTotal / 500) * 100)}%` }}
              ></div>
            </div>
            <span className="text-[11px] text-[#a7cfbd] mt-1.5 font-medium">
              {Math.round((dailyTotal / 500) * 100)}% of daily goal reached
            </span>
          </div>

          {/* Devotion Streak */}
          <div className="bg-[#181c1a] border border-[#313633] rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#d0c5af]/80 uppercase">Devotion Streak</span>
              <Flame className="w-4 h-4 text-[#f2ca50]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-playfair text-3xl font-extrabold text-[#f2ca50]">7</span>
              <span className="text-xs text-[#e0e3df] font-bold">Days Unbroken</span>
            </div>
            <p className="text-[11px] text-[#d0c5af]/80 mt-2">
              Lifetime Praises: <strong className="text-[#f2ca50]">14,280</strong>
            </p>
            <span className="text-[11px] text-[#a7cfbd] mt-0.5">
              Rank: Tahajjud Devotee
            </span>
          </div>
        </div>
      </div>

      {/* 5. Virtues & Hadith Accordion */}
      <div className="bg-[#181c1a] border border-[#313633] rounded-2xl p-4 sm:p-5 shadow-md space-y-3">
        <div
          onClick={() => setAccordionOpen(!accordionOpen)}
          className="flex items-center justify-between cursor-pointer select-none"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#272b28] border border-[#f2ca50]/30 flex items-center justify-center text-[#f2ca50]">
              <span className="material-symbols-outlined text-[18px]">menu_book</span>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#e0e3df]">
                Virtues &amp; Prophetic Hadith
              </h4>
              <p className="text-[11px] text-[#d0c5af]/70">
                Wisdom behind {selectedPreset.title}
              </p>
            </div>
          </div>

          {accordionOpen ? (
            <ChevronUp className="w-4 h-4 text-[#d0c5af]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#d0c5af]" />
          )}
        </div>

        {accordionOpen && (
          <div className="pt-2 border-t border-[#313633]/60 space-y-2">
            <p className="p-3.5 rounded-xl bg-[#101412] text-xs text-[#d0c5af] leading-relaxed italic border border-[#313633]">
              {selectedPreset.hadith}
            </p>
            <div className="flex items-center justify-between text-[11px] text-[#99907c] px-1">
              <span>Verified in Classical Sunnah Compendiums</span>
              <button
                onClick={() => showToast('Dhikr virtue shared')}
                className="text-[#a7cfbd] hover:underline"
              >
                Share Blessing
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Custom Dhikr Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-sm rounded-3xl bg-[#181c1a] border border-[#f2ca50]/40 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-playfair text-lg font-bold text-[#f2ca50]">
                Custom Invocation
              </h3>
              <button
                onClick={() => setShowCustomModal(false)}
                className="text-[#d0c5af] hover:text-[#f2ca50]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCustom} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#d0c5af] block mb-1">
                  Invocation Title or Transliteration
                </label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={e => setCustomTitle(e.target.value)}
                  placeholder="e.g. Hasbunallahu Wa Ni'mal Wakeel"
                  className="w-full bg-[#101412] border border-[#313633] rounded-xl px-3 py-2 text-xs text-[#e0e3df] focus:outline-none focus:border-[#f2ca50]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#d0c5af] block mb-1">
                  Target Bead Count
                </label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {[33, 100, 1000].map(cnt => (
                    <button
                      type="button"
                      key={cnt}
                      onClick={() => setCustomTarget(cnt)}
                      className={`py-1.5 rounded-lg border text-xs font-bold transition-all ${
                        customTarget === cnt
                          ? 'bg-[#f2ca50] text-[#3c2f00] border-[#f2ca50]'
                          : 'bg-[#101412] border-[#313633] text-[#d0c5af]'
                      }`}
                    >
                      {cnt}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  value={customTarget}
                  onChange={e => setCustomTarget(Number(e.target.value))}
                  className="w-full bg-[#101412] border border-[#313633] rounded-xl px-3 py-2 text-xs text-[#e0e3df] focus:outline-none focus:border-[#f2ca50]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#f2ca50] to-[#d4af37] text-[#3c2f00] font-bold text-xs uppercase tracking-wider shadow-md hover:scale-[1.01] active:scale-95 transition-all mt-2"
              >
                Begin Custom Dhikr
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
