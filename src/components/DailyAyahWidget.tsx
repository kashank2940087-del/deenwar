import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getDailyAyahForToday, DAILY_AYAHS_POOL, DailyAyahItem } from '../data/dailyAyahs';
import {
  Sparkles,
  Share2,
  Copy,
  Check,
  Bookmark,
  Volume2,
  Shuffle,
  ExternalLink,
  X,
  Globe,
  MessageCircle,
  Twitter,
  Send,
  Facebook
} from 'lucide-react';

export const DailyAyahWidget: React.FC = () => {
  const {
    showToast,
    setPlayingSurahNumber,
    setPlayingAyahNumber,
    togglePlayAudio,
    isPlayingAudio,
    playingSurahNumber,
    playingAyahNumber
  } = useApp();

  const [seedOffset, setSeedOffset] = useState<number>(0);
  const [currentAyah, setCurrentAyah] = useState<DailyAyahItem>(() => getDailyAyahForToday(0));
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleShuffle = () => {
    const nextOffset = seedOffset + 1;
    setSeedOffset(nextOffset);
    const newAyah = getDailyAyahForToday(nextOffset);
    setCurrentAyah(newAyah);
    setIsBookmarked(false);
    showToast(`Loaded Verse: Surah ${newAyah.surahNameEnglish} (${newAyah.ayahNumber})`);
  };

  const formattedShareText = `📖 Daily Ayah • Surah ${currentAyah.surahNameEnglish} [${currentAyah.surahNumber}:${currentAyah.ayahNumber}]
\n"${currentAyah.arabicText}"
\n"${currentAyah.translation}"
\n✨ Reflection: ${currentAyah.reflection}
\n🌐 Read on Netlify: https://deenwar.netlify.app`;

  const handleCopyText = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(formattedShareText);
      setCopied(true);
      showToast('Daily Ayah copied to clipboard');
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Daily Ayah: Surah ${currentAyah.surahNameEnglish} (${currentAyah.ayahNumber})`,
          text: formattedShareText,
          url: 'https://deenwar.netlify.app',
        });
        showToast('Shared successfully');
      } catch {
        // Share cancelled or unavailable
      }
    } else {
      setShowShareModal(true);
    }
  };

  const isCurrentPlaying =
    isPlayingAudio &&
    playingSurahNumber === currentAyah.surahNumber &&
    playingAyahNumber === currentAyah.ayahNumber;

  const handlePlayAyahAudio = () => {
    setPlayingSurahNumber(currentAyah.surahNumber);
    setPlayingAyahNumber(currentAyah.ayahNumber);
    if (!isPlayingAudio) {
      togglePlayAudio();
    }
    showToast(`Reciting Surah ${currentAyah.surahNameEnglish} • Ayah ${currentAyah.ayahNumber}`);
  };

  const handleRedirectNetlify = () => {
    // Open Netlify redirection URL
    showToast('Redirecting to Netlify...');
    window.location.href = 'https://deenwar.netlify.app';
  };

  return (
    <>
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1c211e] via-[#181c1a] to-[#121614] border border-[#f2ca50]/40 p-5 sm:p-6 shadow-2xl transition-all duration-300 hover:[transform:rotateX(0.5deg)_rotateY(0.5deg)]">
        {/* Ambient Gold & Emerald Light Glow */}
        <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-[#f2ca50]/10 blur-3xl pointer-events-none"></div>
        <div className="absolute -left-12 -bottom-12 w-44 h-44 rounded-full bg-[#294e40]/20 blur-3xl pointer-events-none"></div>

        {/* Top Meta Bar */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#f2ca50]/20 to-[#a7cfbd]/20 border border-[#f2ca50]/40 text-[#f2ca50] flex items-center justify-center font-bold text-xs shadow-inner">
              ۞
            </span>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm font-bold tracking-wider text-[#f2ca50] uppercase font-playfair">
                  Daily Ayah
                </span>
                <span className="px-1.5 py-0.2 rounded-full bg-[#294e40] text-[#a7cfbd] text-[10px] font-bold uppercase">
                  {currentAyah.theme}
                </span>
              </div>
              <span className="text-[11px] text-[#d0c5af]/70">
                Surah {currentAyah.surahNameEnglish} • Ayah {currentAyah.ayahNumber} (Juz {currentAyah.juz})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Randomize / New Verse Button */}
            <button
              onClick={handleShuffle}
              className="px-2.5 py-1.5 rounded-xl bg-[#272b28] hover:bg-[#313633] text-[#d0c5af] hover:text-[#f2ca50] text-[11px] font-semibold transition-all flex items-center gap-1 border border-[#313633] cursor-pointer"
              title="Get another random inspirational verse"
              type="button"
            >
              <Shuffle className="w-3.5 h-3.5 text-[#f2ca50]" />
              <span className="hidden sm:inline">Random Verse</span>
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => {
                setIsBookmarked(!isBookmarked);
                showToast(isBookmarked ? 'Verse removed from saved' : 'Verse bookmarked');
              }}
              className={`w-8 h-8 rounded-full bg-[#272b28] flex items-center justify-center transition-colors cursor-pointer ${
                isBookmarked ? 'text-[#f2ca50]' : 'text-[#d0c5af] hover:text-[#f2ca50]'
              }`}
              title="Bookmark verse"
              type="button"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Prominent Share Button */}
            <button
              onClick={() => setShowShareModal(true)}
              className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#f2ca50] to-[#d4af37] text-[#3c2f00] text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
              title="Share Daily Ayah"
              type="button"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Arabic Calligraphy Typography Presentation */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#101412]/80 border border-[#313633] text-right space-y-2 my-2">
          <p
            className="text-xl sm:text-2xl lg:text-3xl text-right text-[#f2ca50] font-quran font-medium leading-[2.2] tracking-wide"
            dir="rtl"
          >
            {currentAyah.arabicText}
          </p>
        </div>

        {/* Transliteration */}
        <p className="text-xs text-[#a7cfbd] italic font-medium leading-relaxed mt-2">
          {currentAyah.transliteration}
        </p>

        {/* English Translation */}
        <p className="text-xs sm:text-sm text-[#e0e3df] leading-relaxed mt-1.5 font-normal">
          "{currentAyah.translation}"
        </p>

        {/* Scholarly Reflection */}
        <div className="mt-3 p-3 rounded-xl bg-[#101412]/50 border border-[#313633]/60 text-[11px] text-[#d0c5af]/80 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-[#f2ca50] flex-shrink-0 mt-0.5" />
          <p>
            <strong className="text-[#f2ca50]">Reflection:</strong> {currentAyah.reflection}
          </p>
        </div>

        {/* Bottom Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 mt-3 border-t border-[#313633]/60">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePlayAyahAudio}
              className="px-3.5 py-1.5 rounded-full bg-[#272b28] hover:bg-[#313633] text-[#f2ca50] border border-[#f2ca50]/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              type="button"
            >
              <Volume2 className="w-4 h-4" />
              <span>{isCurrentPlaying ? 'Reciting Now' : 'Listen Ayah'}</span>
            </button>

            <span className="text-[11px] text-[#d0c5af]/60">
              Surah {currentAyah.surahNumber} • {currentAyah.revelationType}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="text-xs text-[#a7cfbd] hover:text-[#f2ca50] flex items-center gap-1 transition-colors cursor-pointer"
              type="button"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#f2ca50]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Quick Copy'}</span>
            </button>

            <span className="text-[#313633]">•</span>

            <button
              onClick={handleRedirectNetlify}
              className="text-xs text-[#f2ca50] hover:underline flex items-center gap-1 font-medium cursor-pointer"
              title="Redirect to Netlify"
              type="button"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Netlify</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Share Modal Dialog */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
          <div className="relative w-full max-w-md rounded-3xl bg-[#181c1a] border border-[#f2ca50]/40 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#272b28] border border-[#f2ca50]/30 flex items-center justify-center text-[#f2ca50]">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-playfair text-lg font-bold text-[#f2ca50]">
                    Share Daily Ayah
                  </h3>
                  <p className="text-[11px] text-[#d0c5af]/70">
                    Surah {currentAyah.surahNameEnglish} [{currentAyah.surahNumber}:{currentAyah.ayahNumber}]
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowShareModal(false)}
                className="w-8 h-8 rounded-full bg-[#272b28] flex items-center justify-center text-[#d0c5af] hover:text-[#f2ca50]"
                type="button"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Formatted Preview Box */}
            <div className="p-3.5 rounded-2xl bg-[#101412] border border-[#313633] text-xs text-[#e0e3df] space-y-2 max-h-48 overflow-y-auto">
              <p className="font-quran text-base text-right text-[#f2ca50]" dir="rtl">
                {currentAyah.arabicText}
              </p>
              <p className="text-xs text-[#d0c5af] italic">
                "{currentAyah.translation}"
              </p>
              <p className="text-[10px] text-[#99907c]">
                — Surah {currentAyah.surahNameEnglish} ({currentAyah.ayahNumber}) • DEENWAR Sanctuary
              </p>
            </div>

            {/* Social Share Grid */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(formattedShareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-[#101412] hover:bg-[#272b28] border border-[#313633] flex flex-col items-center gap-1.5 transition-all text-[#25D366] hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-[10px] text-[#e0e3df]">WhatsApp</span>
              </a>

              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(formattedShareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-[#101412] hover:bg-[#272b28] border border-[#313633] flex flex-col items-center gap-1.5 transition-all text-[#1DA1F2] hover:scale-105"
              >
                <Twitter className="w-5 h-5" />
                <span className="text-[10px] text-[#e0e3df]">Twitter/X</span>
              </a>

              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(formattedShareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-[#101412] hover:bg-[#272b28] border border-[#313633] flex flex-col items-center gap-1.5 transition-all text-[#0088cc] hover:scale-105"
              >
                <Send className="w-5 h-5" />
                <span className="text-[10px] text-[#e0e3df]">Telegram</span>
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-[#101412] hover:bg-[#272b28] border border-[#313633] flex flex-col items-center gap-1.5 transition-all text-[#4267B2] hover:scale-105"
              >
                <Facebook className="w-5 h-5" />
                <span className="text-[10px] text-[#e0e3df]">Facebook</span>
              </a>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleCopyText}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#f2ca50] to-[#d4af37] text-[#3c2f00] text-xs font-bold uppercase tracking-wider shadow-md hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                type="button"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Verse Text Copied!' : 'Copy Formatted Verse'}</span>
              </button>

              {/* Redirect to Netlify button as requested */}
              <button
                onClick={handleRedirectNetlify}
                className="w-full py-2.5 rounded-xl bg-[#101412] hover:bg-[#272b28] border border-[#f2ca50]/40 text-[#f2ca50] text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                type="button"
              >
                <Globe className="w-4 h-4 text-[#a7cfbd]" />
                <span>Redirect to Netlify (Live App &amp; Deploy)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
