import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  Volume2,
  VolumeX,
  Shield,
  Sparkles,
  User as UserIcon,
  Crown,
  Globe
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    user,
    setShowLoginModal,
    setShowProModal,
    setShowWelcomeModal,
    setShowAdminAuthModal,
    setShowNetlifyModal,
    isAdminAuthenticated,
    setActiveTab,
    unreadCount,
    ambientAdhanOn,
    toggleAmbientAdhan,
    activeTab
  } = useApp();

  return (
    <header className="sticky top-0 w-full z-40 bg-[#101412]/90 backdrop-blur-xl border-b border-[#313633]/60 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <div className="max-w-6xl mx-auto px-4 h-18 flex items-center justify-between gap-3">
        {/* Left: Brand Identity */}
        <div
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          {/* Gold Mosque Crest */}
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#1c211e] to-[#272b28] border border-[#f2ca50]/30 flex items-center justify-center text-[#f2ca50] shadow-md group-hover:border-[#f2ca50] transition-all overflow-hidden flex-shrink-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhZmE9X-D12pEA-Wk-mw8B0Dy3YSkbrd1hGaOTLyvzC-62gfh2S7INzKUm2xsjxtkdzOlJqUJfL_iPo67_4H5vHaWMIJ6ti1RQuhb4s1VN0lFkWwWmmdl8OWko5JM81AOZhLSk8LFhRyvxNCMaQiGnHY7MDHmG7tyniVQqwMw3fi-KAMj-WthArtiSaCFaG6UK_doRxaIYeGZ9DYk0GI71RoYPsIsI3QFiyyZIJDlTZke_sy_hfbPzyfJDfsE4fvUXdLU"
              alt="DEENWAR Emblem"
              className="w-full h-full object-cover rounded-xl"
              onError={(e) => {
                // Fallback to mosque symbol if needed
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="material-symbols-outlined text-[24px] absolute pointer-events-none opacity-0">mosque</span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-playfair text-xl tracking-wider text-[#f2ca50] font-bold leading-none">
                DEENWAR
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-[#f2ca50]/15 text-[#f2ca50] text-[10px] font-bold tracking-widest uppercase border border-[#f2ca50]/30">
                {user?.isPro ? 'VIP' : 'PRO'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="material-symbols-outlined text-[12px] text-[#f2ca50]">dark_mode</span>
              <span className="text-[11px] text-[#d0c5af]/80 font-medium">14 Ramadan 1446 AH</span>
            </div>
          </div>
        </div>

        {/* Desktop Quick Links */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-[#d0c5af]">
          <button
            onClick={() => setActiveTab('home')}
            className={`transition-colors hover:text-[#f2ca50] ${activeTab === 'home' ? 'text-[#f2ca50] font-bold' : ''}`}
          >
            Sanctuary Home
          </button>
          <button
            onClick={() => setActiveTab('quran')}
            className={`transition-colors hover:text-[#f2ca50] ${activeTab === 'quran' ? 'text-[#f2ca50] font-bold' : ''}`}
          >
            Noble Quran (114)
          </button>
          <button
            onClick={() => setActiveTab('hadith')}
            className={`transition-colors hover:text-[#f2ca50] ${activeTab === 'hadith' ? 'text-[#f2ca50] font-bold' : ''}`}
          >
            Hadith &amp; Names
          </button>
          <button
            onClick={() => setActiveTab('tasbeeh')}
            className={`transition-colors hover:text-[#f2ca50] ${activeTab === 'tasbeeh' ? 'text-[#f2ca50] font-bold' : ''}`}
          >
            Smart Tasbeeh
          </button>
          <button
            onClick={() => setActiveTab('ad_submit')}
            className={`transition-colors hover:text-[#f2ca50] ${activeTab === 'ad_submit' ? 'text-[#f2ca50] font-bold' : ''}`}
          >
            Submit Ad
          </button>
        </nav>

        {/* Right Action Icons: Sound, Messages, Admin Key, User Profile */}
        <div className="flex items-center gap-2">
          {/* Ambient Adhan audio toggle */}
          <button
            onClick={toggleAmbientAdhan}
            title={ambientAdhanOn ? 'Mute Ambient Adhan Chimes' : 'Unmute Ambient Adhan'}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[#272b28]/70 text-[#f2ca50] hover:bg-[#313633] active:scale-95 transition-all border border-[#4d4635]/40"
            type="button"
          >
            {ambientAdhanOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-[#d0c5af]/50" />}
          </button>

          {/* Netlify Redirection & Deployment Portal */}
          <button
            onClick={() => setShowNetlifyModal(true)}
            title="Redirect to Netlify & Deployment Link"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[#272b28]/70 text-[#00ad9f] hover:bg-[#313633] hover:text-[#f2ca50] active:scale-95 transition-all border border-[#00ad9f]/40 cursor-pointer"
            type="button"
          >
            <Globe className="w-5 h-5" />
          </button>

          {/* Welcome Screen Re-trigger */}
          <button
            onClick={() => setShowWelcomeModal(true)}
            title="Open Welcome Sanctuary"
            className="hidden sm:flex w-10 h-10 rounded-full items-center justify-center bg-[#272b28]/70 text-[#f2ca50] hover:bg-[#313633] active:scale-95 transition-all border border-[#4d4635]/40"
            type="button"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          {/* Message Box Button with Notification Badge */}
          <button
            onClick={() => setActiveTab('messages')}
            title="Open Message Box"
            className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all border ${
              activeTab === 'messages'
                ? 'bg-[#f2ca50] text-[#3c2f00] border-[#f2ca50]'
                : 'bg-[#272b28]/70 text-[#e0e3df] hover:text-[#f2ca50] border-[#4d4635]/40'
            }`}
            type="button"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center ring-2 ring-[#101412] animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Admin Vault Access Button */}
          <button
            onClick={() => {
              if (isAdminAuthenticated) {
                setActiveTab('admin');
              } else {
                setShowAdminAuthModal(true);
              }
            }}
            title={isAdminAuthenticated ? 'Admin Panel Active' : 'Admin Vault (Key Protected)'}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border ${
              isAdminAuthenticated || activeTab === 'admin'
                ? 'bg-gradient-to-tr from-[#d4af37] to-[#f2ca50] text-[#3c2f00] border-[#f2ca50] shadow-[0_0_12px_rgba(242,202,80,0.5)]'
                : 'bg-[#272b28]/70 text-[#d0c5af] hover:text-[#f2ca50] border-[#4d4635]/40'
            }`}
            type="button"
          >
            <Shield className="w-5 h-5" />
          </button>

          {/* User Profile Avatar / Sign In */}
          <div
            onClick={() => setShowLoginModal(true)}
            className="relative flex items-center justify-center cursor-pointer group pl-1"
          >
            <div className="p-[1.5px] rounded-full bg-gradient-to-tr from-[#f2ca50] via-[#d4af37] to-[#a7cfbd] shadow-md group-hover:scale-105 transition-transform">
              {user ? (
                <img
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover"
                  src={user.avatar}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-[#181c1a] flex items-center justify-center text-[#f2ca50]">
                  <UserIcon className="w-5 h-5" />
                </div>
              )}
            </div>

            {user?.isPro ? (
              <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#f2ca50] ring-2 ring-[#101412] flex items-center justify-center text-[#3c2f00] shadow">
                <Crown className="w-2.5 h-2.5 font-bold" />
              </span>
            ) : (
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#a7cfbd] ring-2 ring-[#101412] flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#101412]"></span>
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
