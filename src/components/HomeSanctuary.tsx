import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AYATUL_KURSI } from '../data/quranData';
import { DailyAyahWidget } from './DailyAyahWidget';
import {
  Compass,
  Calendar,
  Sparkles,
  Bookmark,
  Share2,
  Play,
  Pause,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldCheck,
  Moon,
  SunMedium
} from 'lucide-react';

export const HomeSanctuary: React.FC = () => {
  const {
    setActiveTab,
    setShowProModal,
    isPlayingAudio,
    togglePlayAudio,
    showToast
  } = useApp();

  const [dhikrCount, setDhikrCount] = useState(68);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleDhikrTap = () => {
    setDhikrCount(prev => {
      const next = prev >= 100 ? 1 : prev + 1;
      return next;
    });

    // Gentle tactile chime
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(740, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      }
    } catch {
      // Audio optional
    }
  };

  const handleCopyAyah = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${AYATUL_KURSI.text}\n\n"${AYATUL_KURSI.translation}" (Al-Baqarah 255)`);
      showToast('Ayatul Kursi copied to clipboard');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 py-4 space-y-6 perspective-1000">
      {/* 1. Live Prayer & Astrological Timepiece Banner (Card 1) */}
      <section className="relative overflow-hidden rounded-3xl bg-[#181c1a] border border-[#f2ca50]/30 p-5 sm:p-6 shadow-2xl transition-transform hover:[transform:rotateX(1deg)_rotateY(1deg)] duration-300">
        {/* Ambient emerald radial light */}
        <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-[#294e40]/40 blur-3xl pointer-events-none"></div>

        {/* Top Row: Qibla & Hijri Date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#272b28] border border-[#f2ca50]/30 flex items-center justify-center text-[#f2ca50]">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[#f2ca50] uppercase tracking-wider">
                Qibla Direction
              </span>
              <span className="text-xs font-semibold text-[#e0e3df]">
                118° ESE • Holy Kaaba, Mecca
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#101412] text-[#a7cfbd] border border-[#4d4635]/40 text-xs">
            <Calendar className="w-3.5 h-3.5 text-[#f2ca50]" />
            <span>14 Ramadan 1446</span>
          </div>
        </div>

        {/* Central Next Prayer Countdown & Progress Circle */}
        <div className="flex items-center justify-between gap-4 pt-4 pb-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-[#d0c5af]/80">
              <span className="material-symbols-outlined text-[16px] text-[#f2ca50]">sunny_snowing</span>
              <span className="text-xs uppercase tracking-wider font-semibold">Next Prayer</span>
            </div>
            <h2 className="font-playfair text-2xl sm:text-4xl font-extrabold text-[#e0e3df] tracking-tight mt-0.5">
              Maghrib
            </h2>
            <p className="text-xs text-[#f2ca50] font-medium flex items-center gap-1.5 mt-1">
              <span className="w-2 h-2 rounded-full bg-[#f2ca50] animate-ping"></span>
              <span>Iftar &amp; Adhan in 42m 18s</span>
            </p>
          </div>

          {/* Circular SVG Ring */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center flex-shrink-0">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 72 72">
              <circle
                className="text-[#313633]"
                cx="36"
                cy="36"
                fill="transparent"
                r="30"
                stroke="currentColor"
                strokeWidth="5"
              />
              <circle
                className="text-[#f2ca50]"
                cx="36"
                cy="36"
                fill="transparent"
                r="30"
                stroke="currentColor"
                strokeDasharray="188.4"
                strokeDashoffset="45"
                strokeLinecap="round"
                strokeWidth="5"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs sm:text-sm font-bold text-[#f2ca50] font-mono">18:42</span>
              <span className="text-[10px] text-[#d0c5af]/70">PM</span>
            </div>
          </div>
        </div>

        {/* 5 Daily Prayers schedule strip */}
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2 pt-3 border-t border-[#313633]/60">
          <div className="p-2 rounded-xl bg-[#101412]/80 flex flex-col items-center text-center">
            <span className="text-[10px] text-[#d0c5af]/80">Fajr</span>
            <span className="text-xs font-semibold text-[#e0e3df] font-mono">05:08</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-[#a7cfbd] mt-1" />
          </div>
          <div className="p-2 rounded-xl bg-[#101412]/80 flex flex-col items-center text-center">
            <span className="text-[10px] text-[#d0c5af]/80">Dhuhr</span>
            <span className="text-xs font-semibold text-[#e0e3df] font-mono">12:31</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-[#a7cfbd] mt-1" />
          </div>
          <div className="p-2 rounded-xl bg-[#101412]/80 flex flex-col items-center text-center">
            <span className="text-[10px] text-[#d0c5af]/80">Asr</span>
            <span className="text-xs font-semibold text-[#e0e3df] font-mono">15:54</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-[#a7cfbd] mt-1" />
          </div>
          <div className="p-2 rounded-xl bg-[#294e40]/70 flex flex-col items-center text-center ring-1 ring-[#f2ca50]/50 shadow-md">
            <span className="text-[10px] text-[#f2ca50] font-bold">Maghrib</span>
            <span className="text-xs font-bold text-[#f2ca50] font-mono">18:42</span>
            <span className="material-symbols-outlined text-[14px] text-[#f2ca50] mt-0.5">notifications_active</span>
          </div>
          <div className="p-2 rounded-xl bg-[#101412]/80 flex flex-col items-center text-center">
            <span className="text-[10px] text-[#d0c5af]/80">Isha</span>
            <span className="text-xs font-semibold text-[#e0e3df] font-mono">20:06</span>
            <span className="material-symbols-outlined text-[14px] text-[#99907c] mt-0.5">schedule</span>
          </div>
        </div>
      </section>

      {/* 2. Sacred Gateways: 6-Card Bento Grid */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="font-playfair text-lg sm:text-xl font-bold text-[#e0e3df] flex items-center gap-2">
            <span>Sacred Portals</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50]"></span>
          </h2>
          <span className="text-xs font-bold text-[#f2ca50] uppercase tracking-wider">
            6 Modules
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {/* Portal 1: Noble Quran */}
          <div
            onClick={() => setActiveTab('quran')}
            className="p-4 rounded-2xl bg-[#181c1a] hover:bg-[#272b28] border border-[#313633] hover:border-[#f2ca50]/40 transition-all flex flex-col justify-between h-32 active:scale-95 cursor-pointer shadow-md group"
          >
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-xl bg-[#101412] border border-[#f2ca50]/30 flex items-center justify-center text-[#f2ca50] group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[22px]">menu_book</span>
              </div>
              <span className="text-[10px] font-bold text-[#f2ca50] bg-[#f2ca50]/15 px-2 py-0.5 rounded">
                114 Surahs
              </span>
            </div>
            <div>
              <p className="text-sm font-bold text-[#e0e3df] group-hover:text-[#f2ca50] transition-colors">
                Noble Quran
              </p>
              <p className="text-[11px] text-[#d0c5af]/70">Read &amp; Audio Tajweed</p>
            </div>
          </div>

          {/* Portal 2: Audio Reciters */}
          <div
            onClick={() => {
              setActiveTab('quran');
              togglePlayAudio();
            }}
            className="p-4 rounded-2xl bg-[#181c1a] hover:bg-[#272b28] border border-[#313633] hover:border-[#f2ca50]/40 transition-all flex flex-col justify-between h-32 active:scale-95 cursor-pointer shadow-md group"
          >
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-xl bg-[#101412] border border-[#a7cfbd]/30 flex items-center justify-center text-[#a7cfbd] group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[22px]">headphones</span>
              </div>
              <span className="text-[10px] font-bold text-[#a7cfbd] bg-[#294e40] px-2 py-0.5 rounded">
                Lossless
              </span>
            </div>
            <div>
              <p className="text-sm font-bold text-[#e0e3df] group-hover:text-[#a7cfbd] transition-colors">
                Audio Sanctuary
              </p>
              <p className="text-[11px] text-[#d0c5af]/70">Top World Reciters</p>
            </div>
          </div>

          {/* Portal 3: Hadith Vault */}
          <div
            onClick={() => setActiveTab('hadith')}
            className="p-4 rounded-2xl bg-[#181c1a] hover:bg-[#272b28] border border-[#313633] hover:border-[#f2ca50]/40 transition-all flex flex-col justify-between h-32 active:scale-95 cursor-pointer shadow-md group"
          >
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-xl bg-[#101412] border border-[#dccf96]/30 flex items-center justify-center text-[#dccf96] group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[22px]">library_books</span>
              </div>
              <span className="text-[10px] font-bold text-[#dccf96] bg-[#dccf96]/15 px-2 py-0.5 rounded">
                6 Books
              </span>
            </div>
            <div>
              <p className="text-sm font-bold text-[#e0e3df] group-hover:text-[#dccf96] transition-colors">
                Hadith Vault
              </p>
              <p className="text-[11px] text-[#d0c5af]/70">Bukhari &amp; Muslim</p>
            </div>
          </div>

          {/* Portal 4: Smart Tasbeeh */}
          <div
            onClick={() => setActiveTab('tasbeeh')}
            className="p-4 rounded-2xl bg-[#181c1a] hover:bg-[#272b28] border border-[#313633] hover:border-[#f2ca50]/40 transition-all flex flex-col justify-between h-32 active:scale-95 cursor-pointer shadow-md group"
          >
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-xl bg-[#101412] border border-[#f2ca50]/30 flex items-center justify-center text-[#f2ca50] group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[22px]">fingerprint</span>
              </div>
              <span className="text-[10px] font-bold text-[#f2ca50] bg-[#f2ca50]/15 px-2 py-0.5 rounded">
                Tactile Chime
              </span>
            </div>
            <div>
              <p className="text-sm font-bold text-[#e0e3df] group-hover:text-[#f2ca50] transition-colors">
                Smart Tasbeeh
              </p>
              <p className="text-[11px] text-[#d0c5af]/70">Count &amp; Remembrance</p>
            </div>
          </div>

          {/* Portal 5: 99 Names of Allah */}
          <div
            onClick={() => setActiveTab('hadith')}
            className="p-4 rounded-2xl bg-[#181c1a] hover:bg-[#272b28] border border-[#313633] hover:border-[#f2ca50]/40 transition-all flex flex-col justify-between h-32 active:scale-95 cursor-pointer shadow-md group"
          >
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-xl bg-[#101412] border border-[#a7cfbd]/30 flex items-center justify-center text-[#a7cfbd] group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[22px]">flare</span>
              </div>
              <span className="text-[10px] font-bold text-[#a7cfbd] bg-[#294e40] px-2 py-0.5 rounded">
                99 Divine
              </span>
            </div>
            <div>
              <p className="text-sm font-bold text-[#e0e3df] group-hover:text-[#a7cfbd] transition-colors">
                Divine Names
              </p>
              <p className="text-[11px] text-[#d0c5af]/70">Meanings &amp; Audio</p>
            </div>
          </div>

          {/* Portal 6: 100 Prophetic Titles */}
          <div
            onClick={() => setActiveTab('hadith')}
            className="p-4 rounded-2xl bg-[#181c1a] hover:bg-[#272b28] border border-[#313633] hover:border-[#f2ca50]/40 transition-all flex flex-col justify-between h-32 active:scale-95 cursor-pointer shadow-md group"
          >
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-xl bg-[#101412] border border-[#f2ca50]/30 flex items-center justify-center text-[#f2ca50] group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[22px]">verified</span>
              </div>
              <span className="text-[10px] font-bold text-[#f2ca50] bg-[#f2ca50]/15 px-2 py-0.5 rounded">
                Prophetic
              </span>
            </div>
            <div>
              <p className="text-sm font-bold text-[#e0e3df] group-hover:text-[#f2ca50] transition-colors">
                Noble Titles ﷺ
              </p>
              <p className="text-[11px] text-[#d0c5af]/70">100 Epithets of Grace</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Daily Inspiration Sanctuary: Daily Ayah Widget, Ayatul Kursi, Hadith, Dhikr Counter */}
      <section className="space-y-4">
        {/* Daily Ayah Widget */}
        <DailyAyahWidget />

        <div className="flex items-center justify-between px-1 pt-2">
          <h2 className="font-playfair text-lg sm:text-xl font-bold text-[#e0e3df] flex items-center gap-2">
            <span>Daily Revelation</span>
            <Sparkles className="w-4 h-4 text-[#f2ca50]" />
          </h2>
          <span className="text-xs text-[#d0c5af]/70">Surah Al-Baqarah 2:255</span>
        </div>

        {/* Ayatul Kursi Card */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#181c1a] border border-[#f2ca50]/40 shadow-xl space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#f2ca50]/20 text-[#f2ca50] flex items-center justify-center text-xs font-bold font-serif">
                ۞
              </span>
              <span className="text-xs font-bold tracking-wider text-[#f2ca50] uppercase">
                Ayatul Kursi • The Throne Verse
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  setIsBookmarked(!isBookmarked);
                  showToast(isBookmarked ? 'Ayatul Kursi unbookmarked' : 'Ayatul Kursi saved to bookmarks');
                }}
                className={`w-8 h-8 rounded-full bg-[#272b28] flex items-center justify-center transition-colors cursor-pointer ${
                  isBookmarked ? 'text-[#f2ca50]' : 'text-[#d0c5af]'
                }`}
                title="Bookmark"
                type="button"
              >
                <Bookmark className="w-4 h-4" />
              </button>

              <button
                onClick={handleCopyAyah}
                className="w-8 h-8 rounded-full bg-[#272b28] flex items-center justify-center text-[#d0c5af] hover:text-[#f2ca50] transition-colors cursor-pointer"
                title="Copy Verse"
                type="button"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Arabic Calligraphy Typography */}
          <div className="py-2 text-right">
            <p className="text-xl sm:text-2xl leading-[2.2] text-[#f2ca50] font-quran font-medium tracking-wide" dir="rtl">
              {AYATUL_KURSI.text}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#e0e3df] italic leading-relaxed">
            "{AYATUL_KURSI.translation}"
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-[#313633]/60">
            <button
              onClick={togglePlayAudio}
              className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#f2ca50] to-[#d4af37] text-[#3c2f00] text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-transform cursor-pointer"
              type="button"
            >
              {isPlayingAudio ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isPlayingAudio ? 'Pause' : 'Listen Ayah'}</span>
            </button>
            <span className="text-xs text-[#a7cfbd] font-medium">Al-Baqarah 255</span>
          </div>
        </div>

        {/* Daily Hadith Spotlight */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#1c211e] border border-[#313633] space-y-2 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#a7cfbd] uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Sahih al-Bukhari 5027</span>
            </span>
            <span className="text-[11px] text-[#d0c5af]/60">Virtues of the Quran</span>
          </div>

          <p className="text-xs sm:text-sm text-[#e0e3df] leading-relaxed">
            "The best among you (Muslims) are those who learn the Quran and teach it to others."
          </p>

          <div className="flex items-center justify-between pt-1 text-[11px] text-[#99907c]">
            <span>Narrated by Uthman bin Affan (RA)</span>
            <button
              onClick={() => setActiveTab('hadith')}
              className="text-[#f2ca50] hover:underline font-semibold"
            >
              Reflect &amp; Study
            </button>
          </div>
        </div>

        {/* Daily Dhikr Goal Tracker with Interactive Bead Tap */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#181c1a] border border-[#313633] flex items-center justify-between gap-4 shadow-md">
          <div className="flex flex-col gap-1 min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#f2ca50]" />
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#f2ca50]">
                Daily Dhikr Target
              </span>
            </div>
            <p className="text-sm font-bold text-[#e0e3df] truncate">
              SubhanAllahi wa bihamdihi
            </p>
            <div className="w-full bg-[#101412] h-2 rounded-full overflow-hidden mt-1 border border-[#313633]">
              <div
                className="h-full bg-gradient-to-r from-[#f2ca50] to-[#a7cfbd] transition-all duration-300 rounded-full"
                style={{ width: `${Math.min(100, dhikrCount)}%` }}
              ></div>
            </div>
            <span className="text-[10px] text-[#d0c5af]/70 mt-0.5">
              {dhikrCount} of 100 beads completed today
            </span>
          </div>

          {/* Interactive Tap Counter Button */}
          <button
            onClick={handleDhikrTap}
            className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#f2ca50] to-[#d4af37] text-[#3c2f00] flex flex-col items-center justify-center flex-shrink-0 shadow-[0_4px_16px_rgba(242,202,80,0.35)] active:scale-90 transition-transform cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">touch_app</span>
            <span className="text-xs font-black leading-none mt-0.5">{dhikrCount}</span>
          </button>
        </div>
      </section>

      {/* 4. Sacred Islamic Calendar & Fasting Highlights */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="font-playfair text-lg sm:text-xl font-bold text-[#e0e3df] flex items-center gap-2">
            <span>Sacred Calendar</span>
            <Moon className="w-4 h-4 text-[#a7cfbd]" />
          </h2>
          <span className="text-xs font-bold text-[#f2ca50] uppercase tracking-wider">Fast Tracker</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Ramadan Countdown */}
          <div className="p-4 rounded-2xl bg-[#181c1a] border border-[#313633] flex flex-col justify-between gap-3 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#f2ca50] uppercase tracking-wider">
                Holy Month
              </span>
              <Moon className="w-4 h-4 text-[#f2ca50]" />
            </div>
            <div>
              <p className="font-playfair text-2xl font-bold text-[#e0e3df]">16 Days</p>
              <p className="text-xs text-[#d0c5af]/70">Remaining in Blessed Ramadan</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#a7cfbd]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Laylat al-Qadr approaches soon</span>
            </div>
          </div>

          {/* White Days Indicator */}
          <div className="p-4 rounded-2xl bg-[#181c1a] border border-[#313633] flex flex-col justify-between gap-3 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#a7cfbd] uppercase tracking-wider">
                Ayyam al-Beed
              </span>
              <SunMedium className="w-4 h-4 text-[#a7cfbd]" />
            </div>
            <div>
              <p className="font-playfair text-2xl font-bold text-[#e0e3df]">Full Moon</p>
              <p className="text-xs text-[#d0c5af]/70">White Days: 13, 14, 15 Ramadan</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#f2ca50] font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Today's Fast Active (Alhamdulillah)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DEENWAR Pro Banner ($20 was, now $12!) */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1c211e] via-[#272b28] to-[#294e40]/50 border border-[#f2ca50]/40 p-5 sm:p-6 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#f2ca50]/20 border border-[#f2ca50]/40 text-[#f2ca50] flex items-center justify-center shadow-inner">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-playfair text-xl font-bold text-[#f2ca50]">
                  DEENWAR VIP Sanctuary
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#f2ca50] text-[#3c2f00] text-[10px] font-black uppercase">
                  $12 Flat Rate
                </span>
              </div>
              <p className="text-xs text-[#d0c5af]/80">
                1-Month Unrestricted Access • 30 Days Ramadan Discount
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-[#e0e3df]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#f2ca50] flex-shrink-0" />
            <span>100% Ad-Free Listening</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#f2ca50] flex-shrink-0" />
            <span>Lossless Studio Quran Audio</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#f2ca50] flex-shrink-0" />
            <span>30+ Tafseer Volumes</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#f2ca50] flex-shrink-0" />
            <span>Exclusive Reciters</span>
          </div>
        </div>

        <button
          onClick={() => setShowProModal(true)}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#f2ca50] to-[#d4af37] text-[#3c2f00] font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_4px_24px_rgba(242,202,80,0.35)] hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          type="button"
        >
          <span>Upgrade to VIP Patron ($12 Flat Rate)</span>
          <Lock className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
