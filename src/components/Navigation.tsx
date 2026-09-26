import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Home,
  BookOpen,
  Library,
  Fingerprint,
  PlusSquare,
  Bell,
  ShieldAlert
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    unreadCount,
    isAdminAuthenticated,
    setShowAdminAuthModal
  } = useApp();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#101412]/95 backdrop-blur-2xl border-t border-[#313633]/70 pb-safe shadow-[0_-4px_24px_rgba(0,0,0,0.6)]">
      <div className="max-w-md mx-auto flex items-center justify-around h-16 px-1">
        {/* Tab 1: Home */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center flex-1 h-full min-w-[50px] transition-all cursor-pointer ${
            activeTab === 'home' ? 'text-[#f2ca50] font-bold scale-105' : 'text-[#d0c5af]/70 hover:text-[#d0c5af]'
          }`}
          type="button"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-1">Home</span>
        </button>

        {/* Tab 2: Quran */}
        <button
          onClick={() => setActiveTab('quran')}
          className={`flex flex-col items-center justify-center flex-1 h-full min-w-[50px] transition-all cursor-pointer ${
            activeTab === 'quran' ? 'text-[#f2ca50] font-bold scale-105' : 'text-[#d0c5af]/70 hover:text-[#d0c5af]'
          }`}
          type="button"
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-1">Quran</span>
        </button>

        {/* Tab 3: Hadith */}
        <button
          onClick={() => setActiveTab('hadith')}
          className={`flex flex-col items-center justify-center flex-1 h-full min-w-[50px] transition-all cursor-pointer ${
            activeTab === 'hadith' ? 'text-[#f2ca50] font-bold scale-105' : 'text-[#d0c5af]/70 hover:text-[#d0c5af]'
          }`}
          type="button"
        >
          <Library className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-1">Hadith</span>
        </button>

        {/* Tab 4: Tasbeeh */}
        <button
          onClick={() => setActiveTab('tasbeeh')}
          className={`flex flex-col items-center justify-center flex-1 h-full min-w-[50px] transition-all cursor-pointer ${
            activeTab === 'tasbeeh' ? 'text-[#f2ca50] font-bold scale-105' : 'text-[#d0c5af]/70 hover:text-[#d0c5af]'
          }`}
          type="button"
        >
          <Fingerprint className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-1">Tasbeeh</span>
        </button>

        {/* Tab 5: Submit Ad */}
        <button
          onClick={() => setActiveTab('ad_submit')}
          className={`flex flex-col items-center justify-center flex-1 h-full min-w-[50px] transition-all cursor-pointer ${
            activeTab === 'ad_submit' ? 'text-[#f2ca50] font-bold scale-105' : 'text-[#d0c5af]/70 hover:text-[#d0c5af]'
          }`}
          type="button"
        >
          <PlusSquare className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-1">Post Ad</span>
        </button>

        {/* Tab 6: Messages */}
        <button
          onClick={() => setActiveTab('messages')}
          className={`relative flex flex-col items-center justify-center flex-1 h-full min-w-[50px] transition-all cursor-pointer ${
            activeTab === 'messages' ? 'text-[#f2ca50] font-bold scale-105' : 'text-[#d0c5af]/70 hover:text-[#d0c5af]'
          }`}
          type="button"
        >
          <div className="relative">
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 rounded-full bg-red-500 text-white text-[8px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-1">Inbox</span>
        </button>

        {/* Tab 7: Admin Panel */}
        <button
          onClick={() => {
            if (isAdminAuthenticated) {
              setActiveTab('admin');
            } else {
              setShowAdminAuthModal(true);
            }
          }}
          className={`flex flex-col items-center justify-center flex-1 h-full min-w-[50px] transition-all cursor-pointer ${
            activeTab === 'admin' ? 'text-[#f2ca50] font-bold scale-105' : 'text-[#d0c5af]/70 hover:text-[#d0c5af]'
          }`}
          type="button"
        >
          <ShieldAlert className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-1">Admin</span>
        </button>
      </div>
    </nav>
  );
};
