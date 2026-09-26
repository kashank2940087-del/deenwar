import React from 'react';
import { Crown, Sparkles, ShieldCheck } from 'lucide-react';

export const FooterShineBox: React.FC = () => {
  return (
    <footer className="w-full mt-12 mb-28 px-4 flex flex-col items-center">
      {/* Premium Shine Box Requested by User: Web.DESIGNE.AND.dev.BY.SHAYAN */}
      <div className="relative group w-full max-w-xl overflow-hidden rounded-2xl p-[1.5px] bg-gradient-to-r from-[#d4af37]/60 via-[#f2ca50] to-[#a7cfbd]/60 shadow-[0_8px_32px_rgba(212,175,55,0.25)] hover:shadow-[0_12px_44px_rgba(242,202,80,0.4)] transition-all duration-500">
        {/* Animated background shimmer sweep */}
        <div className="absolute inset-0 premium-shine-gold opacity-90"></div>

        {/* Card inner body */}
        <div className="relative bg-[#101412]/95 backdrop-blur-2xl rounded-2xl py-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#d4af37]/20 via-[#f2ca50]/30 to-[#a7cfbd]/20 border border-[#f2ca50]/40 flex items-center justify-center text-[#f2ca50] shadow-inner flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
              <Crown className="w-6 h-6 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                <Sparkles className="w-3.5 h-3.5 text-[#f2ca50]" />
                <span className="text-[11px] font-bold tracking-[0.25em] text-[#f2ca50] uppercase">
                  Master Architect & Engineering
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-playfair font-extrabold tracking-wider bg-gradient-to-r from-[#fff] via-[#f2ca50] to-[#d4af37] bg-clip-text text-transparent mt-0.5">
                WEB DESIGN &amp; DEV BY SHAYAN
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1c211e] border border-[#f2ca50]/30 text-[#f2ca50] text-xs font-semibold tracking-wider flex-shrink-0">
            <ShieldCheck className="w-4 h-4 text-[#a7cfbd]" />
            <span>AUTHENTIC LUXURY</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-[#d0c5af]/60">
        <span>DEENWAR PRO SANCTUARY</span>
        <span>•</span>
        <span>14 RAMADAN 1446 AH</span>
        <span>•</span>
        <span>ALL 114 SURAHS</span>
        <span>•</span>
        <span>HIGH SECURITY ADMIN</span>
      </div>
    </footer>
  );
};
