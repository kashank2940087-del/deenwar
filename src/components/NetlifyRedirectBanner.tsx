import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Globe, ArrowRight, Copy, Check, ExternalLink, ShieldCheck } from 'lucide-react';

export const NetlifyRedirectBanner: React.FC = () => {
  const { showToast } = useApp();
  const [copied, setCopied] = useState(false);

  const netlifyUrl = 'https://deenwar.netlify.app';

  const handleRedirect = () => {
    showToast('Redirecting to Netlify...');
    window.location.href = netlifyUrl;
  };

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(netlifyUrl);
      setCopied(true);
      showToast('Netlify link copied: ' + netlifyUrl);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#00ad9f]/30 via-[#1c211e] to-[#00ad9f]/30 border-b border-[#00ad9f]/50 shadow-lg px-3 py-2">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
        {/* Left Information */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded-lg bg-[#00ad9f]/20 border border-[#00ad9f]/40 flex items-center justify-center text-[#00ad9f] flex-shrink-0">
            <Globe className="w-3.5 h-3.5 animate-spin-slow" />
          </div>
          <div className="flex items-center gap-2 truncate">
            <span className="font-bold text-[#00ad9f] uppercase tracking-wider text-[10px] bg-[#00ad9f]/20 px-1.5 py-0.5 rounded">
              NETLIFY REDIRECT
            </span>
            <span className="text-[#e0e3df] font-medium hidden sm:inline truncate">
              Sanctuary Domain:
            </span>
            <a
              href={netlifyUrl}
              className="font-mono text-[#f2ca50] font-bold hover:underline truncate"
            >
              {netlifyUrl}
            </a>
          </div>
        </div>

        {/* Right Redirect Action Controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleCopy}
            className="px-2.5 py-1 rounded-lg bg-[#272b28] hover:bg-[#313633] text-[#d0c5af] hover:text-[#f2ca50] text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer border border-[#313633]"
            type="button"
          >
            {copied ? <Check className="w-3 h-3 text-[#00ad9f]" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy Link'}</span>
          </button>

          <button
            onClick={handleRedirect}
            className="px-3.5 py-1 rounded-lg bg-[#00ad9f] hover:bg-[#00c7b7] text-black text-xs font-bold flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,173,159,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            type="button"
          >
            <span>Redirect to Netlify</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
