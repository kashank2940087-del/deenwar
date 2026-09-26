import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Lock, Eye, EyeOff, X, AlertTriangle, KeyRound } from 'lucide-react';

export const AdminAuthModal: React.FC = () => {
  const {
    showAdminAuthModal,
    setShowAdminAuthModal,
    loginAdmin,
    showToast
  } = useApp();

  const [inputKey, setInputKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  if (!showAdminAuthModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (attempts >= 5) {
      setErrorMsg('Too many invalid attempts. Admin security lockout engaged.');
      return;
    }

    const success = loginAdmin(inputKey);
    if (success) {
      setInputKey('');
      setErrorMsg('');
      setAttempts(0);
    } else {
      setAttempts(prev => prev + 1);
      setErrorMsg(`Access Denied: Invalid Security Access Key (${4 - attempts} attempts left)`);
      showToast('Security Alert: Unauthorized access key attempt');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-fadeIn">
      <div className="relative w-full max-w-sm rounded-3xl bg-[#181c1a] border border-red-500/30 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.9)] flex flex-col gap-4">
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent rounded-3xl pointer-events-none"></div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-red-950/80 border border-red-500/40 flex items-center justify-center text-red-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-playfair text-lg font-bold text-[#e0e3df]">
                Admin Security Vault
              </h3>
              <p className="text-[11px] text-[#d0c5af]/60">Authorized Personnel Only</p>
            </div>
          </div>

          <button
            onClick={() => {
              setShowAdminAuthModal(false);
              setErrorMsg('');
              setInputKey('');
            }}
            className="w-8 h-8 rounded-full bg-[#272b28] flex items-center justify-center text-[#d0c5af] hover:text-white"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 rounded-xl bg-[#101412] border border-[#313633] text-xs text-[#d0c5af] space-y-1">
          <div className="flex items-center gap-1.5 text-[#f2ca50] font-semibold">
            <KeyRound className="w-3.5 h-3.5" />
            <span>Master Access Required</span>
          </div>
          <p className="text-[11px] text-[#99907c]">
            Enter the private access key to manage ad broadcasts, approve user ad requests, and verify Pro subscriptions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-[#d0c5af] block mb-1">
              Admin Access Key
            </label>
            <div className="relative flex items-center">
              <input
                type={showKey ? 'text' : 'password'}
                value={inputKey}
                onChange={e => {
                  setInputKey(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="••••••••••••"
                className="w-full bg-[#101412] border border-[#313633] rounded-xl pl-3.5 pr-10 py-2.5 text-xs text-[#e0e3df] focus:outline-none focus:border-[#f2ca50] font-mono tracking-wider"
                required
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 text-[#d0c5af]/60 hover:text-[#f2ca50]"
                title={showKey ? 'Hide key' : 'Show key'}
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="flex items-center gap-1.5 text-xs text-red-400 bg-red-950/60 p-2.5 rounded-lg border border-red-500/30">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 via-amber-600 to-[#f2ca50] text-black font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <Lock className="w-4 h-4" />
            <span>Authenticate Admin Vault</span>
          </button>
        </form>

        <p className="text-[10px] text-center text-[#99907c]">
          Protected by SHA-256 session isolation. Session terminates automatically on tab close.
        </p>
      </div>
    </div>
  );
};
