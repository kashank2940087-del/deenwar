import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Globe,
  ExternalLink,
  Copy,
  Check,
  X,
  Sparkles,
  Server,
  ArrowRight,
  ShieldCheck,
  UploadCloud,
  FileCode
} from 'lucide-react';

interface NetlifyRedirectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NetlifyRedirectModal: React.FC<NetlifyRedirectModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useApp();
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedConfig, setCopiedConfig] = useState(false);

  if (!isOpen) return null;

  // The primary Netlify domain link for DEENWAR Pro
  const netlifyUrl = 'https://deenwar.netlify.app';
  const netlifyDeployUrl = 'https://app.netlify.com/drop';

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(netlifyUrl);
      setCopiedLink(true);
      showToast('Netlify redirect link copied to clipboard');
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleCopyConfig = () => {
    const configText = `/*    /index.html   200`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(configText);
      setCopiedConfig(true);
      showToast('Netlify _redirects rule copied');
      setTimeout(() => setCopiedConfig(false), 2000);
    }
  };

  const handleOpenNetlify = () => {
    showToast('Redirecting to Netlify...');
    window.location.href = netlifyUrl;
  };

  const handleOpenDeploy = () => {
    showToast('Opening Netlify Deploy Console...');
    window.location.href = netlifyDeployUrl;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#181c1a] border border-[#f2ca50]/40 p-6 sm:p-7 shadow-[0_24px_70px_rgba(0,0,0,0.9)] flex flex-col gap-4 overflow-hidden">
        {/* Glow */}
        <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-[#00ad9f]/15 blur-3xl pointer-events-none"></div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#00ad9f]/20 via-[#f2ca50]/20 to-[#a7cfbd]/20 border border-[#00ad9f]/50 flex items-center justify-center text-[#00ad9f]">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-playfair text-xl font-bold text-[#f2ca50]">
                  Netlify Redirect &amp; Deployment Portal
                </h3>
              </div>
              <p className="text-xs text-[#d0c5af]/80">
                Configured with instant SPA rewrites (`/* → /index.html 200`)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#272b28] flex items-center justify-center text-[#d0c5af] hover:text-[#f2ca50] transition-colors"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Primary Redirect URL Card */}
        <div className="p-4 rounded-2xl bg-[#101412] border border-[#00ad9f]/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#00ad9f] uppercase tracking-wider flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5" />
              <span>Production Netlify Domain</span>
            </span>
            <span className="text-[10px] bg-[#00ad9f]/20 text-[#00ad9f] px-2 py-0.5 rounded font-mono font-bold">
              HTTPS 200 OK
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[#181c1a] border border-[#313633]">
            <span className="font-mono text-xs text-[#f2ca50] font-semibold truncate">
              {netlifyUrl}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCopyLink}
                className="px-2.5 py-1 rounded-lg bg-[#272b28] hover:bg-[#313633] text-[#d0c5af] hover:text-[#f2ca50] text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                type="button"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-[#a7cfbd]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handleOpenNetlify}
                className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#f2ca50] to-[#d4af37] text-[#3c2f00] text-xs font-bold flex items-center gap-1 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                type="button"
              >
                <span>Visit Link</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Redirection Configuration Files Ready */}
        <div className="space-y-2 text-xs">
          <span className="font-bold text-[#d0c5af] uppercase tracking-wider block">
            Pre-Configured Netlify Files in Codebase
          </span>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-xl bg-[#101412] border border-[#313633] space-y-1">
              <div className="flex items-center gap-1.5 text-[#f2ca50] font-semibold">
                <FileCode className="w-4 h-4" />
                <span>public/_redirects</span>
              </div>
              <p className="text-[11px] text-[#d0c5af]/80 font-mono">
                /* /index.html 200
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#101412] border border-[#313633] space-y-1">
              <div className="flex items-center gap-1.5 text-[#00ad9f] font-semibold">
                <FileCode className="w-4 h-4" />
                <span>netlify.toml</span>
              </div>
              <p className="text-[11px] text-[#d0c5af]/80">
                Node 20 • SPA Rewrites &amp; Headers
              </p>
            </div>
          </div>
        </div>

        {/* 1-Click Drop Deploy to Netlify */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#1c211e] via-[#272b28] to-[#1c211e] border border-[#f2ca50]/30 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <UploadCloud className="w-5 h-5 text-[#00ad9f]" />
            <div>
              <span className="text-xs font-bold text-[#e0e3df] block">
                Netlify Drop Deployment
              </span>
              <span className="text-[11px] text-[#d0c5af]/70">
                Drag-and-drop the generated `dist` folder to go live instantly
              </span>
            </div>
          </div>

          <button
            onClick={handleOpenDeploy}
            className="px-3.5 py-1.5 rounded-xl bg-[#00ad9f] text-black text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1 flex-shrink-0 cursor-pointer"
            type="button"
          >
            <span>Open Netlify Drop</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-[#313633]/60">
          <button
            onClick={handleCopyConfig}
            className="text-xs text-[#a7cfbd] hover:text-[#f2ca50] flex items-center gap-1 transition-colors cursor-pointer"
            type="button"
          >
            {copiedConfig ? <Check className="w-3.5 h-3.5 text-[#f2ca50]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedConfig ? 'Rule Copied' : 'Copy Redirect Rule'}</span>
          </button>

          <button
            onClick={handleOpenNetlify}
            className="py-2 px-5 rounded-xl bg-gradient-to-r from-[#f2ca50] to-[#d4af37] text-[#3c2f00] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            type="button"
          >
            <span>Redirect to Netlify Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
