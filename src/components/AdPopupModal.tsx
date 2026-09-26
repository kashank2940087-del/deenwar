import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ExternalLink, X, ShieldAlert } from 'lucide-react';

export const AdPopupModal: React.FC = () => {
  const {
    currentAdPopup,
    closeAdPopup,
    setShowProModal,
    user
  } = useApp();

  const [secondsToSkip, setSecondsToSkip] = useState(5);

  useEffect(() => {
    if (currentAdPopup) {
      setSecondsToSkip(5);
      const timer = setInterval(() => {
        setSecondsToSkip(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentAdPopup]);

  if (!currentAdPopup || user?.isPro) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md rounded-2xl bg-[#181c1a] border border-[#f2ca50]/40 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col gap-3.5 overflow-hidden">
        {/* Top Header: Sponsor Info and Skip Countdown */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#f2ca50]/20 text-[#f2ca50] text-[10px] font-bold uppercase tracking-wider border border-[#f2ca50]/30">
              Sponsored Ad (1 Min Interval)
            </span>
            <span className="text-xs text-[#d0c5af]/80 font-medium truncate max-w-[150px]">
              {currentAdPopup.sponsorName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {secondsToSkip > 0 ? (
              <span className="text-xs text-[#f2ca50] font-mono bg-[#101412] px-2.5 py-1 rounded-full border border-[#4d4635]/40">
                Skip in {secondsToSkip}s
              </span>
            ) : (
              <button
                onClick={closeAdPopup}
                className="flex items-center gap-1 text-xs font-bold text-[#e0e3df] hover:text-[#f2ca50] bg-[#272b28] px-3 py-1 rounded-full border border-[#f2ca50]/40 transition-colors cursor-pointer"
                type="button"
              >
                <span>Skip Ad</span>
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Media Banner Image / Graphic */}
        <div className="w-full h-44 rounded-xl overflow-hidden bg-[#101412] border border-[#313633] relative group">
          <img
            src={currentAdPopup.mediaUrl}
            alt={currentAdPopup.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Fallback
              (e.target as HTMLElement).setAttribute(
                'src',
                'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'
              );
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101412]/90 via-transparent to-transparent flex items-end p-3">
            <span className="text-xs text-[#a7cfbd] font-medium bg-[#101412]/80 px-2 py-0.5 rounded-md backdrop-blur-sm border border-[#a7cfbd]/20">
              Broadcast Campaign
            </span>
          </div>
        </div>

        {/* Ad Title & Body */}
        <div className="space-y-1">
          <h3 className="font-playfair text-lg font-bold text-[#f2ca50] leading-snug">
            {currentAdPopup.title}
          </h3>
          <p className="text-xs text-[#d0c5af] leading-relaxed line-clamp-2">
            {currentAdPopup.description}
          </p>
        </div>

        {/* Action Buttons: Visit Link & Pro Upgrade */}
        <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
          <a
            href={currentAdPopup.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#f2ca50] to-[#d4af37] text-[#3c2f00] text-xs font-bold flex items-center justify-center gap-1.5 shadow-md hover:scale-[1.02] active:scale-95 transition-all text-center"
          >
            <span>Learn More &amp; Visit</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => {
              closeAdPopup();
              setShowProModal(true);
            }}
            className="w-full sm:flex-1 py-2.5 px-3 rounded-xl bg-[#294e40]/70 hover:bg-[#294e40] text-[#a7cfbd] border border-[#a7cfbd]/40 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            type="button"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#f2ca50]" />
            <span>Remove Ads ($12 Offer)</span>
          </button>
        </div>

        <div className="flex items-center justify-center gap-1 text-[10px] text-[#99907c] pt-1">
          <ShieldAlert className="w-3 h-3 text-[#f2ca50]" />
          <span>Broadcast governed by DEENWAR Admin Panel</span>
        </div>
      </div>
    </div>
  );
};
