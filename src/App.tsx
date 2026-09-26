import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { DiscountCountdownBanner } from './components/DiscountCountdownBanner';
import { HomeSanctuary } from './components/HomeSanctuary';
import { QuranExplorer } from './components/QuranExplorer';
import { HadithVault } from './components/HadithVault';
import { TasbeehCounter } from './components/TasbeehCounter';
import { AdSubmitSection } from './components/AdSubmitSection';
import { MessageBoxModal } from './components/MessageBoxModal';
import { AdminPanel } from './components/AdminPanel';
import { FooterShineBox } from './components/FooterShineBox';
import { AudioPlayerHUD } from './components/AudioPlayerHUD';
import { Navigation } from './components/Navigation';
import { WelcomeSplashModal } from './components/WelcomeSplashModal';
import { AdPopupModal } from './components/AdPopupModal';
import { ProSubscriptionModal } from './components/ProSubscriptionModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { AuthModal } from './components/AuthModal';
import { NetlifyRedirectModal } from './components/NetlifyRedirectModal';
import { NetlifyRedirectBanner } from './components/NetlifyRedirectBanner';

const AppContent: React.FC = () => {
  const {
    activeTab,
    toastMessage,
    showWelcomeModal,
    setShowWelcomeModal,
    showNetlifyModal,
    setShowNetlifyModal
  } = useApp();

  // Show welcome splash once on initial load if not previously dismissed in this session
  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem('deenwar_welcome_shown');
    if (!hasSeenWelcome) {
      setShowWelcomeModal(true);
      sessionStorage.setItem('deenwar_welcome_shown', 'true');
    }
  }, [setShowWelcomeModal]);

  return (
    <div className="min-h-screen bg-[#101412] text-[#e0e3df] flex flex-col relative selection:bg-[#f2ca50] selection:text-[#3c2f00]">
      {/* Ambient background arabesque pattern & radial glow */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(212,175,55,0.08),rgba(16,20,18,0))] z-0"></div>

      {/* Netlify Redirection Banner */}
      <NetlifyRedirectBanner />

      {/* Top Header */}
      <Header />

      {/* 30-Day Ramadan Flat Discount Banner ($20 was, now $12 only!) */}
      <DiscountCountdownBanner />

      {/* Main Dynamic View Area */}
      <main className="flex-1 relative z-10 w-full pb-20">
        {activeTab === 'home' && <HomeSanctuary />}
        {activeTab === 'quran' && <QuranExplorer />}
        {activeTab === 'hadith' && <HadithVault />}
        {activeTab === 'tasbeeh' && <TasbeehCounter />}
        {activeTab === 'ad_submit' && <AdSubmitSection />}
        {activeTab === 'messages' && <MessageBoxModal />}
        {activeTab === 'admin' && <AdminPanel />}

        {/* User Requested Bottom Shining Box: Web.DESIGNE.AND.dev.BY.SHAYAN */}
        <FooterShineBox />
      </main>

      {/* Floating Audio Reciter HUD */}
      <AudioPlayerHUD />

      {/* Fixed Bottom Tab Navigation */}
      <Navigation />

      {/* Interactive Modals & Overlays */}
      <WelcomeSplashModal />
      <AdPopupModal />
      <ProSubscriptionModal />
      <AdminAuthModal />
      <AuthModal />
      <NetlifyRedirectModal
        isOpen={showNetlifyModal}
        onClose={() => setShowNetlifyModal(false)}
      />

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#1c211e]/95 backdrop-blur-xl border border-[#f2ca50]/50 text-[#f2ca50] px-4 py-2.5 rounded-full text-xs font-semibold shadow-2xl flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-[#f2ca50]"></span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
