import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ArrowRight, ShieldCheck, Flame } from 'lucide-react';

export const DiscountCountdownBanner: React.FC = () => {
  const { discountSecondsRemaining, setShowProModal, user } = useApp();

  const days = Math.floor(discountSecondsRemaining / 86400);
  const hours = Math.floor((discountSecondsRemaining % 86400) / 3600);
  const minutes = Math.floor((discountSecondsRemaining % 3600) / 60);
  const seconds = discountSecondsRemaining % 60;

  if (user?.isPro) {
    return (
      <div className="w-full bg-gradient-to-r from-[#1c211e] via-[#294e40]/40 to-[#1c211e] border-b border-[#f2ca50]/20 px-4 py-2 flex items-center justify-between text-xs text-[#a7cfbd]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#f2ca50]" />
          <span className="font-semibold text-[#f2ca50]">VIP SANCTUARY PRO ACTIVE</span>
          <span className="hidden sm:inline text-[#e0e3df]/70">• Zero Interruptions &amp; Ad-Free</span>
        </div>
        <span className="text-[11px] bg-[#f2ca50]/20 text-[#f2ca50] px-2 py-0.5 rounded-full font-bold">
          LIFETIME ACCESS
        </span>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-r from-[#181c1a] via-[#294e40]/70 to-[#181c1a] border-b border-[#f2ca50]/30 shadow-md">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2.5">
        {/* Left Info with Promo Badge */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[#f2ca50]/20 border border-[#f2ca50]/40 flex items-center justify-center text-[#f2ca50] flex-shrink-0 animate-pulse">
            <Flame className="w-4 h-4" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="bg-[#f2ca50] text-[#3c2f00] text-[10px] font-black tracking-widest px-2 py-0.5 rounded uppercase flex-shrink-0">
                30-DAY FLAT DISCOUNT
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#e0e3df] truncate">
                Pro Sanctuary 1 Month:
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="line-through text-[#d0c5af]/60 font-medium">$20.00</span>
              <span className="text-sm font-bold text-[#f2ca50] bg-[#f2ca50]/10 px-2 py-0.5 rounded-md border border-[#f2ca50]/30">
                NOW $12 ONLY!
              </span>
              <span className="hidden md:inline text-[#a7cfbd] font-medium">(Save 40%)</span>
            </div>
          </div>
        </div>

        {/* Right Countdown & CTA */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Ticking live countdown */}
          <div className="flex items-center gap-1 font-mono text-xs">
            <div className="flex flex-col items-center bg-[#101412] px-1.5 py-0.5 rounded border border-[#4d4635]/60 min-w-[28px]">
              <span className="text-[#f2ca50] font-bold">{String(days).padStart(2, '0')}</span>
              <span className="text-[8px] text-[#d0c5af]/60 uppercase">d</span>
            </div>
            <span className="text-[#f2ca50] font-bold">:</span>
            <div className="flex flex-col items-center bg-[#101412] px-1.5 py-0.5 rounded border border-[#4d4635]/60 min-w-[28px]">
              <span className="text-[#f2ca50] font-bold">{String(hours).padStart(2, '0')}</span>
              <span className="text-[8px] text-[#d0c5af]/60 uppercase">h</span>
            </div>
            <span className="text-[#f2ca50] font-bold">:</span>
            <div className="flex flex-col items-center bg-[#101412] px-1.5 py-0.5 rounded border border-[#4d4635]/60 min-w-[28px]">
              <span className="text-[#f2ca50] font-bold">{String(minutes).padStart(2, '0')}</span>
              <span className="text-[8px] text-[#d0c5af]/60 uppercase">m</span>
            </div>
            <span className="text-[#f2ca50] font-bold">:</span>
            <div className="flex flex-col items-center bg-[#101412] px-1.5 py-0.5 rounded border border-[#4d4635]/60 min-w-[28px]">
              <span className="text-[#f2ca50] font-bold">{String(seconds).padStart(2, '0')}</span>
              <span className="text-[8px] text-[#d0c5af]/60 uppercase">s</span>
            </div>
          </div>

          <button
            onClick={() => setShowProModal(true)}
            className="flex items-center gap-1.5 bg-gradient-to-r from-[#f2ca50] to-[#d4af37] text-[#3c2f00] text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-[0_2px_12px_rgba(242,202,80,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Claim $12 Offer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
