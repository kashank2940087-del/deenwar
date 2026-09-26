import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, X, Volume2, ArrowRight } from 'lucide-react';

export const WelcomeSplashModal: React.FC = () => {
  const {
    showWelcomeModal,
    setShowWelcomeModal,
    ambientAdhanOn,
    toggleAmbientAdhan,
    showToast
  } = useApp();

  if (!showWelcomeModal) return null;

  const handleEnter = () => {
    // Play subtle harmonic chime using Web Audio API
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(528, ctx.currentTime); // 528Hz Solfeggio / peaceful frequency
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.8);
      }
    } catch {
      // Audio context restricted or muted
    }

    setShowWelcomeModal(false);
    showToast('Entered Blessed DEENWAR Sanctuary');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b0f0d]/95 backdrop-blur-2xl transition-all duration-500 animate-fadeIn">
      {/* Ambient Radial Golden Aura */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(242,202,80,0.12),transparent_70%)]"></div>

      <div className="relative w-full max-w-sm rounded-3xl bg-[#181c1a]/95 border border-[#f2ca50]/30 p-6 sm:p-8 flex flex-col items-center text-center shadow-[0_24px_70px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Top Close & Sanctuary Badge */}
        <div className="w-full flex items-center justify-between mb-6">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#272b28]/80 text-[#f2ca50] border border-[#f2ca50]/20 text-[11px] font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Blessed Sanctuary</span>
          </div>

          <button
            onClick={() => setShowWelcomeModal(false)}
            className="w-8 h-8 rounded-full bg-[#272b28] flex items-center justify-center text-[#d0c5af] hover:text-[#f2ca50] transition-colors"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Central Golden Emblem with Pulsing Glow */}
        <div className="relative my-2 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[#f2ca50]/20 blur-2xl scale-150 animate-pulse pointer-events-none"></div>
          <div className="w-28 h-28 rounded-2xl bg-gradient-to-tr from-[#1c211e] via-[#272b28] to-[#1c211e] p-1.5 border border-[#f2ca50]/60 shadow-2xl flex items-center justify-center overflow-hidden">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhZmE9X-D12pEA-Wk-mw8B0Dy3YSkbrd1hGaOTLyvzC-62gfh2S7INzKUm2xsjxtkdzOlJqUJfL_iPo67_4H5vHaWMIJ6ti1RQuhb4s1VN0lFkWwWmmdl8OWko5JM81AOZhLSk8LFhRyvxNCMaQiGnHY7MDHmG7tyniVQqwMw3fi-KAMj-WthArtiSaCFaG6UK_doRxaIYeGZ9DYk0GI71RoYPsIsI3QFiyyZIJDlTZke_sy_hfbPzyfJDfsE4fvUXdLU"
              alt="DEENWAR Golden Crest"
              className="w-full h-full object-contain rounded-xl"
            />
          </div>
        </div>

        {/* Bismillah and Welcome Text */}
        <div className="mt-4 space-y-2">
          <span className="text-sm font-quran text-[#f2ca50] font-bold tracking-widest block">
            بِسْمِ ٱللّٰهِ ٱلرَّحْمٰنِ ٱلرَّحِيمِ
          </span>
          <h2 className="font-playfair text-2xl font-bold tracking-wide text-[#f2ca50]">
            ASSALAMU ALAIKUM
          </h2>
          <p className="text-xs text-[#d0c5af]/80 leading-relaxed max-w-xs mx-auto">
            Enter a peaceful haven for the mindful heart, curated Quranic study, authentic Hadith, and sacred remembrance.
          </p>
        </div>

        {/* Ambient Adhan Chimes Toggle */}
        <div className="w-full py-2.5 px-4 my-6 rounded-xl bg-[#1c211e] border border-[#4d4635]/40 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-medium text-[#e0e3df]">
            <Volume2 className="w-4 h-4 text-[#a7cfbd]" />
            <span>Ambient Adhan Chimes</span>
          </div>

          <button
            onClick={toggleAmbientAdhan}
            className={`w-11 h-6 rounded-full p-0.5 flex items-center transition-colors cursor-pointer ${
              ambientAdhanOn ? 'bg-[#294e40] justify-end' : 'bg-[#313633] justify-start'
            }`}
            type="button"
          >
            <span className="w-5 h-5 rounded-full bg-[#f2ca50] shadow-md"></span>
          </button>
        </div>

        {/* Enter Sanctuary Button */}
        <button
          onClick={handleEnter}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#f2ca50] to-[#d4af37] text-[#3c2f00] font-bold text-sm tracking-wider uppercase shadow-[0_4px_24px_rgba(242,202,80,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          type="button"
        >
          <span>Enter Sanctuary</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="mt-4 text-[11px] text-[#99907c] tracking-widest uppercase font-mono">
          DEENWAR PRO • 14 RAMADAN 1446 AH
        </p>
      </div>
    </div>
  );
};
