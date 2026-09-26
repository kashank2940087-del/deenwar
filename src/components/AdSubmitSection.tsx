import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AdType } from '../types';
import {
  Megaphone,
  Image as ImageIcon,
  Video,
  Globe,
  Calendar,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AdSubmitSection: React.FC = () => {
  const { submitNewAd, setActiveTab, user } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<AdType>('banner');
  const [mediaUrl, setMediaUrl] = useState('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80');
  const [linkUrl, setLinkUrl] = useState('https://deenwar.netlify.app');
  const [days, setDays] = useState(30);
  const [frequencyPerDay, setFrequencyPerDay] = useState(10);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const presets = [
    {
      name: 'Ornate Mosque & Academy',
      url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Kaaba Sanctuary Makkah',
      url: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Islamic Architectural Arch',
      url: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Sacred Lantern & Calligraphy',
      url: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !mediaUrl) return;

    submitNewAd({
      title,
      description,
      type,
      mediaUrl,
      linkUrl: linkUrl || 'https://deenwar.netlify.app',
      days,
      frequencyPerDay
    });

    try {
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.7 }
      });
    } catch {
      // Confetti fallback
    }

    setSubmittedSuccess(true);
  };

  if (submittedSuccess) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-12 text-center bg-[#181c1a] border border-[#f2ca50]/40 rounded-3xl p-8 shadow-2xl space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-[#294e40] text-[#a7cfbd] border border-[#a7cfbd]/40 flex items-center justify-center mx-auto shadow-lg">
          <CheckCircle2 className="w-8 h-8 text-[#f2ca50]" />
        </div>
        <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#f2ca50]">
          Ad Submission Received!
        </h2>
        <p className="text-sm text-[#d0c5af] max-w-md mx-auto leading-relaxed">
          Your advertising campaign <strong className="text-[#f2ca50]">"{title}"</strong> has been routed directly to the Admin Panel for verification.
        </p>
        <div className="p-4 rounded-xl bg-[#101412] border border-[#313633] text-xs text-[#a7cfbd] max-w-md mx-auto text-left space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-[#f2ca50]">
            <ShieldCheck className="w-4 h-4" />
            <span>Admin Review Protocol</span>
          </div>
          <p>• If approved by Admin, you will receive an approval confirmation in your <strong>Message Box</strong>, and the ad will be broadcast across the web.</p>
          <p>• If declined by Admin, you will receive a detailed notice in your <strong>Message Box</strong>.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
          <button
            onClick={() => setActiveTab('messages')}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#272b28] hover:bg-[#313633] text-xs font-semibold text-[#f2ca50] border border-[#f2ca50]/30 transition-all cursor-pointer"
          >
            Check Message Box
          </button>
          <button
            onClick={() => {
              setSubmittedSuccess(false);
              setTitle('');
              setDescription('');
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#f2ca50] to-[#d4af37] text-[#3c2f00] text-xs font-bold transition-all cursor-pointer"
          >
            Submit Another Ad
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#181c1a] border border-[#f2ca50]/30 p-5 rounded-2xl shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#f2ca50]/20 to-[#a7cfbd]/20 border border-[#f2ca50]/40 flex items-center justify-center text-[#f2ca50] flex-shrink-0">
            <Megaphone className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#f2ca50]">
                Submit Sponsor Ad
              </h2>
              <span className="text-[10px] font-bold text-[#a7cfbd] bg-[#294e40] px-2 py-0.5 rounded uppercase">
                Global Network
              </span>
            </div>
            <p className="text-xs text-[#d0c5af]/80">
              Submit your banner, photo, video, or web link to reach global sanctuary visitors
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#a7cfbd] bg-[#101412] px-3 py-1 rounded-full border border-[#4d4635]/40 font-mono">
            Sender: {user?.name || 'Guest'}
          </span>
        </div>
      </div>

      {/* Grid: Form on Left, Live Mockup on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Container (7 cols) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 bg-[#181c1a] border border-[#313633] p-5 sm:p-6 rounded-2xl space-y-4 shadow-lg">
          {/* Ad Format Selector */}
          <div>
            <label className="text-xs font-bold text-[#d0c5af] uppercase tracking-wider block mb-2">
              1. Choose Ad Media Type
            </label>
            <div className="grid grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setType('banner')}
                className={`py-2 px-2 rounded-xl border flex flex-col items-center gap-1 text-[11px] font-semibold transition-all cursor-pointer ${
                  type === 'banner'
                    ? 'bg-[#294e40]/70 border-[#f2ca50] text-[#f2ca50]'
                    : 'bg-[#1c211e] border-[#313633] text-[#d0c5af]'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Banner</span>
              </button>

              <button
                type="button"
                onClick={() => setType('photo')}
                className={`py-2 px-2 rounded-xl border flex flex-col items-center gap-1 text-[11px] font-semibold transition-all cursor-pointer ${
                  type === 'photo'
                    ? 'bg-[#294e40]/70 border-[#f2ca50] text-[#f2ca50]'
                    : 'bg-[#1c211e] border-[#313633] text-[#d0c5af]'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Photo Post</span>
              </button>

              <button
                type="button"
                onClick={() => setType('video')}
                className={`py-2 px-2 rounded-xl border flex flex-col items-center gap-1 text-[11px] font-semibold transition-all cursor-pointer ${
                  type === 'video'
                    ? 'bg-[#294e40]/70 border-[#f2ca50] text-[#f2ca50]'
                    : 'bg-[#1c211e] border-[#313633] text-[#d0c5af]'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>Video Link</span>
              </button>

              <button
                type="button"
                onClick={() => setType('link')}
                className={`py-2 px-2 rounded-xl border flex flex-col items-center gap-1 text-[11px] font-semibold transition-all cursor-pointer ${
                  type === 'link'
                    ? 'bg-[#294e40]/70 border-[#f2ca50] text-[#f2ca50]'
                    : 'bg-[#1c211e] border-[#313633] text-[#d0c5af]'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>Web URL</span>
              </button>
            </div>
          </div>

          {/* Ad Name & Pitch */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-[#d0c5af] block mb-1">
                Campaign / Sponsor Name *
              </label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Al-Noor Islamic Arabic Academy"
                className="w-full bg-[#101412] border border-[#313633] rounded-xl px-3.5 py-2.5 text-xs text-[#e0e3df] focus:outline-none focus:border-[#f2ca50]"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#d0c5af] block mb-1">
                Description / Advertising Copy *
              </label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Highlight your offerings, discounts, or noble cause..."
                rows={3}
                className="w-full bg-[#101412] border border-[#313633] rounded-xl px-3.5 py-2.5 text-xs text-[#e0e3df] focus:outline-none focus:border-[#f2ca50] resize-none"
                required
              />
            </div>
          </div>

          {/* Media URL with quick presets */}
          <div>
            <label className="text-xs font-semibold text-[#d0c5af] block mb-1">
              Banner / Photo / Video Media URL *
            </label>
            <input
              type="url"
              value={mediaUrl}
              onChange={e => setMediaUrl(e.target.value)}
              placeholder="https://..."
              className="w-full bg-[#101412] border border-[#313633] rounded-xl px-3.5 py-2 text-xs text-[#e0e3df] focus:outline-none focus:border-[#f2ca50]"
              required
            />
            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span className="text-[10px] text-[#99907c] self-center">Quick Presets:</span>
              {presets.map(p => (
                <button
                  type="button"
                  key={p.name}
                  onClick={() => setMediaUrl(p.url)}
                  className="text-[10px] bg-[#272b28] hover:bg-[#313633] text-[#a7cfbd] px-2 py-0.5 rounded border border-[#313633] transition-colors"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Destination URL */}
          <div>
            <label className="text-xs font-semibold text-[#d0c5af] block mb-1">
              Destination Website / Social Link *
            </label>
            <input
              type="url"
              value={linkUrl}
              onChange={e => setLinkUrl(e.target.value)}
              placeholder="https://deenwar.netlify.app"
              className="w-full bg-[#101412] border border-[#313633] rounded-xl px-3.5 py-2 text-xs text-[#e0e3df] focus:outline-none focus:border-[#f2ca50]"
              required
            />
          </div>

          {/* Campaign Schedule: Days & Frequency */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="text-xs font-semibold text-[#d0c5af] flex items-center gap-1.5 mb-1">
                <Calendar className="w-3.5 h-3.5 text-[#f2ca50]" />
                <span>Campaign Duration</span>
              </label>
              <select
                value={days}
                onChange={e => setDays(Number(e.target.value))}
                className="w-full bg-[#101412] border border-[#313633] rounded-xl px-3 py-2 text-xs text-[#f2ca50] focus:outline-none focus:border-[#f2ca50]"
              >
                <option value={7}>7 Days Broadcast</option>
                <option value={15}>15 Days Broadcast</option>
                <option value={30}>30 Days (Full Ramadan)</option>
                <option value={60}>60 Days Extensive</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#d0c5af] flex items-center gap-1.5 mb-1">
                <Clock className="w-3.5 h-3.5 text-[#f2ca50]" />
                <span>Frequency / Day</span>
              </label>
              <select
                value={frequencyPerDay}
                onChange={e => setFrequencyPerDay(Number(e.target.value))}
                className="w-full bg-[#101412] border border-[#313633] rounded-xl px-3 py-2 text-xs text-[#f2ca50] focus:outline-none focus:border-[#f2ca50]"
              >
                <option value={5}>5 times per day</option>
                <option value={10}>10 times per day</option>
                <option value={25}>25 times per day</option>
                <option value={60}>60 times per day (High Reach)</option>
              </select>
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#f2ca50] to-[#d4af37] text-[#3c2f00] font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_4px_20px_rgba(242,202,80,0.35)] hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
          >
            <Sparkles className="w-4 h-4" />
            <span>Submit Ad for Admin Review</span>
          </button>
        </form>

        {/* Live Mockup Preview (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#f2ca50] uppercase tracking-wider">
              Live Network Preview
            </span>
            <span className="text-[11px] text-[#a7cfbd]">Shown to 10k+ Daily Muslims</span>
          </div>

          <div className="bg-[#181c1a] border border-[#f2ca50]/30 rounded-2xl p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#f2ca50] bg-[#f2ca50]/15 px-2 py-0.5 rounded uppercase">
                {type} Sponsor Ad
              </span>
              <span className="text-[10px] text-[#d0c5af]/70">{days} Days • {frequencyPerDay}x/day</span>
            </div>

            <div className="w-full h-40 rounded-xl overflow-hidden bg-[#101412] border border-[#313633] relative">
              <img
                src={mediaUrl}
                alt="Ad Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).setAttribute(
                    'src',
                    'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'
                  );
                }}
              />
              <div className="absolute top-2 right-2 bg-[#101412]/80 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-[#f2ca50] font-bold">
                Sponsored
              </div>
            </div>

            <div>
              <h4 className="font-playfair text-base font-bold text-[#e0e3df] line-clamp-1">
                {title || 'Your Campaign Headline Here'}
              </h4>
              <p className="text-xs text-[#d0c5af]/80 mt-1 line-clamp-2 leading-relaxed">
                {description || 'Detailed copy and description of your sponsored service will appear here in the live broadcast.'}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-[#313633]">
              <span className="text-[11px] text-[#a7cfbd] font-medium truncate max-w-[180px]">
                {linkUrl || 'https://deenwar.netlify.app'}
              </span>
              <span className="text-xs text-[#f2ca50] font-bold flex items-center gap-1">
                <span>Visit</span>
                <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1c211e] border border-[#313633] text-xs text-[#d0c5af]/80 space-y-1">
            <span className="font-semibold text-[#f2ca50] block">Automated Message Delivery:</span>
            <p>1. When Admin clicks <strong>Approve</strong>, your ad enters active rotation and you will receive a notification: <em>"Your ad is approved on this web"</em>.</p>
            <p>2. If Admin declines, you will receive: <em>"Your ad is declined by admin"</em>.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
