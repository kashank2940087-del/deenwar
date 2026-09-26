import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User as UserIcon,
  Mail,
  Lock,
  Eye,
  EyeOff,
  X,
  Sparkles,
  CheckCircle2,
  LogOut,
  Crown
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    showLoginModal,
    setShowLoginModal,
    user,
    login,
    signup,
    logout,
    setShowProModal
  } = useApp();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(
    'https://lh3.googleusercontent.com/aida/AEtjO1XqM_kosWi3cZKOKBvysnMaItT4bdNYQ1_4Xw8qs2ZJaASyrUyOLMTxPTlPQgk140TnbFDgzB77PIPvPu5oLDotAvw2z1UrnJiMmvM9iqbrQyIDVe_-Lj9BkgsmIQwgCK9NsfBtFQ4QifAsev5veiIq_2B2O9V2FMeBsZ8FxsJDzEWYVa-qrVCD8tz_yG8KkjRtGydojJ5jrzzl7OM5opCHt1xs0HxQtYp9qg3vV_fzCmjkRxkwTxUBDF4pKfRxYH6ywoVRdKcJ2w'
  );

  const avatarOptions = [
    'https://lh3.googleusercontent.com/aida/AEtjO1XqM_kosWi3cZKOKBvysnMaItT4bdNYQ1_4Xw8qs2ZJaASyrUyOLMTxPTlPQgk140TnbFDgzB77PIPvPu5oLDotAvw2z1UrnJiMmvM9iqbrQyIDVe_-Lj9BkgsmIQwgCK9NsfBtFQ4QifAsev5veiIq_2B2O9V2FMeBsZ8FxsJDzEWYVa-qrVCD8tz_yG8KkjRtGydojJ5jrzzl7OM5opCHt1xs0HxQtYp9qg3vV_fzCmjkRxkwTxUBDF4pKfRxYH6ywoVRdKcJ2w',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
  ];

  if (!showLoginModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      login(email, name);
    } else {
      signup(email, name || email.split('@')[0], selectedAvatar);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-md rounded-3xl bg-[#181c1a] border border-[#f2ca50]/40 p-6 sm:p-7 shadow-[0_24px_70px_rgba(0,0,0,0.9)] flex flex-col gap-4 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-[#f2ca50]/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Close */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f2ca50]/20 to-[#a7cfbd]/20 border border-[#f2ca50]/40 flex items-center justify-center text-[#f2ca50]">
              <UserIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-playfair text-xl font-bold text-[#f2ca50]">
                {user ? 'Sanctuary Profile' : mode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h3>
              <p className="text-xs text-[#d0c5af]/80">
                {user ? 'Manage your credentials and VIP status' : 'Join the global mindful community'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowLoginModal(false)}
            className="w-8 h-8 rounded-full bg-[#272b28] flex items-center justify-center text-[#d0c5af] hover:text-[#f2ca50] transition-colors"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* If User is already Logged In */}
        {user ? (
          <div className="space-y-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#101412] border border-[#313633] flex items-center gap-4">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#f2ca50]"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                {user.isPro && (
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#f2ca50] text-[#3c2f00] flex items-center justify-center shadow">
                    <Crown className="w-3 h-3 font-bold" />
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-base font-bold text-[#e0e3df] truncate">{user.name}</h4>
                <p className="text-xs text-[#d0c5af]/80 truncate">{user.email}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      user.isPro
                        ? 'bg-[#f2ca50] text-[#3c2f00]'
                        : 'bg-[#272b28] text-[#a7cfbd] border border-[#a7cfbd]/30'
                    }`}
                  >
                    {user.isPro ? 'VIP Sanctuary Pro' : 'Free Member'}
                  </span>
                </div>
              </div>
            </div>

            {!user.isPro && (
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#294e40]/80 to-[#1c211e] border border-[#f2ca50]/40 flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-[#f2ca50] block">Upgrade to Pro ($12 Offer)</span>
                  <span className="text-[11px] text-[#d0c5af]">Zero Ads + Lossless Audio Recitations</span>
                </div>
                <button
                  onClick={() => {
                    setShowLoginModal(false);
                    setShowProModal(true);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#f2ca50] text-[#3c2f00] text-xs font-bold whitespace-nowrap"
                >
                  Upgrade $12
                </button>
              </div>
            )}

            <button
              onClick={() => {
                logout();
                setShowLoginModal(false);
              }}
              className="w-full py-3 rounded-xl bg-red-950/70 hover:bg-red-900/80 text-red-300 border border-red-500/30 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out of DEENWAR</span>
            </button>
          </div>
        ) : (
          <>
            {/* Mode Switcher Tabs */}
            <div className="flex items-center gap-2 p-1 bg-[#101412] rounded-xl border border-[#313633]">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  mode === 'login'
                    ? 'bg-[#272b28] text-[#f2ca50] shadow-sm border border-[#f2ca50]/30'
                    : 'text-[#d0c5af]/70 hover:text-[#e0e3df]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  mode === 'signup'
                    ? 'bg-[#272b28] text-[#f2ca50] shadow-sm border border-[#f2ca50]/30'
                    : 'text-[#d0c5af]/70 hover:text-[#e0e3df]'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3 pt-1">
              {mode === 'signup' && (
                <>
                  <div>
                    <label className="text-xs font-semibold text-[#d0c5af] block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Shayan Kashan"
                      className="w-full bg-[#101412] border border-[#313633] rounded-xl px-3.5 py-2.5 text-xs text-[#e0e3df] focus:outline-none focus:border-[#f2ca50]"
                      required
                    />
                  </div>

                  {/* Avatar Picker */}
                  <div>
                    <label className="text-xs font-semibold text-[#d0c5af] block mb-1">
                      Select Sanctuary Avatar
                    </label>
                    <div className="flex items-center gap-2.5">
                      {avatarOptions.map((av, idx) => (
                        <img
                          key={idx}
                          src={av}
                          alt="Avatar option"
                          onClick={() => setSelectedAvatar(av)}
                          className={`w-10 h-10 rounded-full object-cover cursor-pointer border-2 transition-transform hover:scale-105 ${
                            selectedAvatar === av ? 'border-[#f2ca50] ring-2 ring-[#f2ca50]/50' : 'border-[#313633]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="text-xs font-semibold text-[#d0c5af] block mb-1">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-[#99907c] absolute left-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@deenwar.com"
                    className="w-full bg-[#101412] border border-[#313633] rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-[#e0e3df] focus:outline-none focus:border-[#f2ca50]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#d0c5af] block mb-1">
                  Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-[#99907c] absolute left-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[#101412] border border-[#313633] rounded-xl pl-9 pr-10 py-2.5 text-xs text-[#e0e3df] focus:outline-none focus:border-[#f2ca50]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-[#d0c5af]/60 hover:text-[#f2ca50]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#f2ca50] to-[#d4af37] text-[#3c2f00] font-bold text-xs uppercase tracking-wider shadow-[0_4px_20px_rgba(242,202,80,0.35)] hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer mt-3"
              >
                <Sparkles className="w-4 h-4" />
                <span>{mode === 'login' ? 'Sign In to Sanctuary' : 'Complete Registration'}</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
