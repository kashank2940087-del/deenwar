import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, AdItem, AdSubmission, SubscriptionRequest, AppMessage } from '../types';
import { INITIAL_ADS } from '../data/islamicTreasury';

interface AppContextType {
  // User & Auth
  user: User | null;
  login: (email: string, name?: string) => void;
  signup: (email: string, name: string, avatar?: string) => void;
  logout: () => void;
  upgradeUserToPro: () => void;
  
  // Modals & Navigation
  activeTab: 'home' | 'quran' | 'hadith' | 'tasbeeh' | 'ad_submit' | 'messages' | 'admin' | 'more';
  setActiveTab: (tab: 'home' | 'quran' | 'hadith' | 'tasbeeh' | 'ad_submit' | 'messages' | 'admin' | 'more') => void;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
  showProModal: boolean;
  setShowProModal: (show: boolean) => void;
  showWelcomeModal: boolean;
  setShowWelcomeModal: (show: boolean) => void;
  showAdminAuthModal: boolean;
  setShowAdminAuthModal: (show: boolean) => void;
  showNetlifyModal: boolean;
  setShowNetlifyModal: (show: boolean) => void;
  
  // Message Box System
  messages: AppMessage[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteMessage: (id: string) => void;
  sendSystemMessage: (userId: string, title: string, body: string, type: AppMessage['type']) => void;

  // Ad Submissions
  adSubmissions: AdSubmission[];
  submitNewAd: (ad: Omit<AdSubmission, 'id' | 'userId' | 'userEmail' | 'userName' | 'submittedAt' | 'status'>) => void;
  approveAdSubmission: (id: string) => void;
  declineAdSubmission: (id: string, reason?: string) => void;

  // Subscription Requests
  subscriptionRequests: SubscriptionRequest[];
  submitSubscriptionRequest: (paymentMethod: SubscriptionRequest['paymentMethod']) => void;
  approveSubscriptionRequest: (id: string) => void;
  declineSubscriptionRequest: (id: string) => void;

  // Ads Network Management
  ads: AdItem[];
  adsEnabled: boolean;
  adIntervalSeconds: number;
  toggleAdsGlobally: (enabled: boolean) => void;
  setAdIntervalSeconds: (seconds: number) => void;
  currentAdPopup: AdItem | null;
  closeAdPopup: () => void;
  triggerManualAd: () => void;

  // Admin Security
  isAdminAuthenticated: boolean;
  loginAdmin: (key: string) => boolean;
  logoutAdmin: () => void;

  // Audio Playback HUD
  currentReciter: string;
  setCurrentReciter: (r: string) => void;
  playingSurahNumber: number;
  setPlayingSurahNumber: (num: number) => void;
  playingAyahNumber: number;
  setPlayingAyahNumber: (num: number) => void;
  isPlayingAudio: boolean;
  togglePlayAudio: () => void;
  audioSpeed: string;
  cycleAudioSpeed: () => void;
  ambientAdhanOn: boolean;
  toggleAmbientAdhan: () => void;

  // Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // 30 Days Ramadan Discount countdown
  discountDaysRemaining: number;
  discountSecondsRemaining: number;
}

const AppContext = createContext<AppContextType | null>(null);

const DEFAULT_USER: User = {
  id: 'usr-kashan-101',
  name: 'Shayan Kashan',
  email: 'kashank2940087@gmail.com',
  avatar: 'https://lh3.googleusercontent.com/aida/AEtjO1XqM_kosWi3cZKOKBvysnMaItT4bdNYQ1_4Xw8qs2ZJaASyrUyOLMTxPTlPQgk140TnbFDgzB77PIPvPu5oLDotAvw2z1UrnJiMmvM9iqbrQyIDVe_-Lj9BkgsmIQwgCK9NsfBtFQ4QifAsev5veiIq_2B2O9V2FMeBsZ8FxsJDzEWYVa-qrVCD8tz_yG8KkjRtGydojJ5jrzzl7OM5opCHt1xs0HxQtYp9qg3vV_fzCmjkRxkwTxUBDF4pKfRxYH6ywoVRdKcJ2w',
  isPro: false,
  createdAt: new Date().toISOString(),
};

const INITIAL_MESSAGES: AppMessage[] = [
  {
    id: 'msg-welcome',
    userId: 'usr-kashan-101',
    title: 'Welcome to DEENWAR Sanctuary',
    body: 'Assalamu Alaikum. May this sanctuary bring peace, guidance, and illuminated knowledge to your heart. Explore all 114 Surahs, authentic Hadith, and Smart Tasbeeh.',
    type: 'welcome',
    isRead: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'msg-promo',
    userId: 'usr-kashan-101',
    title: '30-Day Ramadan Pro Sanctuary Flat Discount',
    body: 'DEENWAR VIP Sanctuary is now available for just $12 (originally $20) for 1 month! Enjoy zero ads, 30+ Tafseer volumes, and lossless audio recitations.',
    type: 'system',
    isRead: false,
    createdAt: new Date(Date.now() - 1800000).toISOString(),
  }
];

const INITIAL_SUBMISSIONS: AdSubmission[] = [
  {
    id: 'sub-01',
    userId: 'usr-kashan-101',
    userEmail: 'kashank2940087@gmail.com',
    userName: 'Shayan Kashan',
    title: 'Al-Haramain Luxury Prayer Rugs',
    description: 'Orthopedic memory foam prayer rugs inspired by the rawdah design of Masjid an-Nabawi. Worldwide shipping.',
    type: 'banner',
    mediaUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    linkUrl: 'https://deenwar.netlify.app',
    days: 30,
    frequencyPerDay: 5,
    submittedAt: new Date(Date.now() - 7200000).toISOString(),
    status: 'pending'
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persisted or default states
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('deenwar_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const [activeTab, setActiveTab] = useState<'home' | 'quran' | 'hadith' | 'tasbeeh' | 'ad_submit' | 'messages' | 'admin' | 'more'>('home');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProModal, setShowProModal] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showAdminAuthModal, setShowAdminAuthModal] = useState(false);
  const [showNetlifyModal, setShowNetlifyModal] = useState(false);

  const [messages, setMessages] = useState<AppMessage[]>(() => {
    const saved = localStorage.getItem('deenwar_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  const [adSubmissions, setAdSubmissions] = useState<AdSubmission[]>(() => {
    const saved = localStorage.getItem('deenwar_ad_submissions');
    return saved ? JSON.parse(saved) : INITIAL_SUBMISSIONS;
  });

  const [subscriptionRequests, setSubscriptionRequests] = useState<SubscriptionRequest[]>(() => {
    const saved = localStorage.getItem('deenwar_sub_requests');
    return saved ? JSON.parse(saved) : [
      {
        id: 'sub-req-demo',
        userId: 'usr-kashan-101',
        userEmail: 'kashank2940087@gmail.com',
        userName: 'Shayan Kashan',
        plan: '1_month_pro',
        amount: 12,
        paymentMethod: 'card',
        submittedAt: new Date(Date.now() - 3600000).toISOString(),
        status: 'pending',
        durationDays: 30
      }
    ];
  });

  const [ads, setAds] = useState<AdItem[]>(() => {
    const saved = localStorage.getItem('deenwar_ads');
    return saved ? JSON.parse(saved) : INITIAL_ADS;
  });

  const [adsEnabled, setAdsEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('deenwar_ads_enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [adIntervalSeconds, setAdIntervalSecondsState] = useState<number>(() => {
    const saved = localStorage.getItem('deenwar_ad_interval');
    return saved ? Number(saved) : 60; // default 1 minute (60s)
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('deenwar_admin_auth') === 'true';
  });

  const [currentAdPopup, setCurrentAdPopup] = useState<AdItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Audio Playback
  const [currentReciter, setCurrentReciter] = useState('mishary');
  const [playingSurahNumber, setPlayingSurahNumber] = useState(67);
  const [playingAyahNumber, setPlayingAyahNumber] = useState(14);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState('1.0x');
  const [ambientAdhanOn, setAmbientAdhanOn] = useState(true);

  // 30 Days flat discount countdown
  const [discountSecondsRemaining, setDiscountSecondsRemaining] = useState<number>(30 * 24 * 3600 - 12450);

  useEffect(() => {
    const timer = setInterval(() => {
      setDiscountSecondsRemaining(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const discountDaysRemaining = Math.floor(discountSecondsRemaining / 86400);

  // Save changes to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('deenwar_user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('deenwar_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('deenwar_ad_submissions', JSON.stringify(adSubmissions));
  }, [adSubmissions]);

  useEffect(() => {
    localStorage.setItem('deenwar_sub_requests', JSON.stringify(subscriptionRequests));
  }, [subscriptionRequests]);

  useEffect(() => {
    localStorage.setItem('deenwar_ads', JSON.stringify(ads));
  }, [ads]);

  useEffect(() => {
    localStorage.setItem('deenwar_ads_enabled', JSON.stringify(adsEnabled));
  }, [adsEnabled]);

  useEffect(() => {
    localStorage.setItem('deenwar_ad_interval', String(adIntervalSeconds));
  }, [adIntervalSeconds]);

  // Toast helper
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  }, []);

  // Ad timer: triggers every 1 minute (60 seconds) for free users
  useEffect(() => {
    if (!adsEnabled || (user && user.isPro)) {
      return;
    }

    const intervalMs = Math.max(15, adIntervalSeconds) * 1000;
    const interval = setInterval(() => {
      if (ads.length > 0 && !currentAdPopup) {
        // Pick random or next active ad
        const randomIndex = Math.floor(Math.random() * ads.length);
        setCurrentAdPopup(ads[randomIndex]);
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [adsEnabled, adIntervalSeconds, ads, user, currentAdPopup]);

  const closeAdPopup = () => {
    setCurrentAdPopup(null);
  };

  const triggerManualAd = () => {
    if (ads.length > 0) {
      const randomIndex = Math.floor(Math.random() * ads.length);
      setCurrentAdPopup(ads[randomIndex]);
      showToast('Sponsored Ad dispatched');
    }
  };

  const toggleAdsGlobally = (enabled: boolean) => {
    setAdsEnabled(enabled);
    showToast(enabled ? 'Ad system activated globally' : 'Ad system paused globally');
  };

  const setAdIntervalSeconds = (seconds: number) => {
    setAdIntervalSecondsState(seconds);
    showToast(`Ad frequency set to every ${seconds} seconds`);
  };

  // Auth functions
  const login = (email: string, name?: string) => {
    const existing = user && user.email === email ? user : null;
    const newUser: User = existing || {
      id: 'usr-' + Date.now(),
      name: name || email.split('@')[0],
      email,
      avatar: 'https://lh3.googleusercontent.com/aida/AEtjO1XqM_kosWi3cZKOKBvysnMaItT4bdNYQ1_4Xw8qs2ZJaASyrUyOLMTxPTlPQgk140TnbFDgzB77PIPvPu5oLDotAvw2z1UrnJiMmvM9iqbrQyIDVe_-Lj9BkgsmIQwgCK9NsfBtFQ4QifAsev5veiIq_2B2O9V2FMeBsZ8FxsJDzEWYVa-qrVCD8tz_yG8KkjRtGydojJ5jrzzl7OM5opCHt1xs0HxQtYp9qg3vV_fzCmjkRxkwTxUBDF4pKfRxYH6ywoVRdKcJ2w',
      isPro: false,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    setShowLoginModal(false);
    showToast(`Welcome back, ${newUser.name}!`);
  };

  const signup = (email: string, name: string, avatar?: string) => {
    const newUser: User = {
      id: 'usr-' + Date.now(),
      name,
      email,
      avatar: avatar || 'https://lh3.googleusercontent.com/aida/AEtjO1XqM_kosWi3cZKOKBvysnMaItT4bdNYQ1_4Xw8qs2ZJaASyrUyOLMTxPTlPQgk140TnbFDgzB77PIPvPu5oLDotAvw2z1UrnJiMmvM9iqbrQyIDVe_-Lj9BkgsmIQwgCK9NsfBtFQ4QifAsev5veiIq_2B2O9V2FMeBsZ8FxsJDzEWYVa-qrVCD8tz_yG8KkjRtGydojJ5jrzzl7OM5opCHt1xs0HxQtYp9qg3vV_fzCmjkRxkwTxUBDF4pKfRxYH6ywoVRdKcJ2w',
      isPro: false,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    setShowLoginModal(false);
    sendSystemMessage(
      newUser.id,
      'Welcome to DEENWAR Sanctuary',
      `Welcome ${name}! Your account has been registered. You can submit ads, track daily Dhikr, and upgrade to VIP Sanctuary Pro.`,
      'welcome'
    );
    showToast(`Account created for ${name}!`);
  };

  const logout = () => {
    setUser(null);
    showToast('Signed out of DEENWAR');
  };

  const upgradeUserToPro = () => {
    if (user) {
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + 30);
      setUser({
        ...user,
        isPro: true,
        proExpiresAt: expiry.toISOString()
      });
      showToast('Mabrook! VIP Sanctuary Pro activated ($12 offer)');
    }
  };

  // Messages
  const unreadCount = messages.filter(m => !m.isRead).length;

  const markAsRead = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m));
  };

  const markAllAsRead = () => {
    setMessages(prev => prev.map(m => ({ ...m, isRead: true })));
    showToast('All messages marked as read');
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
    showToast('Message deleted');
  };

  const sendSystemMessage = (userId: string, title: string, body: string, type: AppMessage['type']) => {
    const newMsg: AppMessage = {
      id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      userId,
      title,
      body,
      type,
      isRead: false,
      createdAt: new Date().toISOString()
    };
    setMessages(prev => [newMsg, ...prev]);
  };

  // Ad Submissions
  const submitNewAd = (adData: Omit<AdSubmission, 'id' | 'userId' | 'userEmail' | 'userName' | 'submittedAt' | 'status'>) => {
    const currentUserId = user?.id || 'guest-' + Date.now();
    const currentUserEmail = user?.email || 'guest@deenwar.com';
    const currentUserName = user?.name || 'Sanctuary Guest';

    const newSubmission: AdSubmission = {
      ...adData,
      id: 'sub-' + Date.now(),
      userId: currentUserId,
      userEmail: currentUserEmail,
      userName: currentUserName,
      submittedAt: new Date().toISOString(),
      status: 'pending'
    };

    setAdSubmissions(prev => [newSubmission, ...prev]);
    showToast('Your ad request has been submitted to Admin for review!');

    sendSystemMessage(
      currentUserId,
      'Ad Submission Received',
      `Your ad "${adData.title}" has been submitted for review. Once approved by the administrator, you will receive an approval confirmation in this message box and it will be broadcast across the web network.`,
      'system'
    );
  };

  const approveAdSubmission = (id: string) => {
    const target = adSubmissions.find(s => s.id === id);
    if (!target) return;

    setAdSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: 'approved' } : s));

    // Also add to active ad pool so it actually displays!
    const newAd: AdItem = {
      id: 'ad-' + target.id,
      title: target.title,
      description: target.description,
      type: target.type,
      mediaUrl: target.mediaUrl,
      linkUrl: target.linkUrl,
      sponsorName: target.userName,
      days: target.days,
      frequency: target.frequencyPerDay,
      status: 'active',
      submittedBy: target.userEmail
    };
    setAds(prev => [newAd, ...prev]);

    // Send required message to user's message box!
    sendSystemMessage(
      target.userId,
      'Your Ad is Approved on DEENWAR!',
      `Congratulations! Your ad "${target.title}" is approved on this web. It is now active in rotation for ${target.days} days across the DEENWAR global audience.`,
      'ad_approved'
    );

    showToast(`Ad "${target.title}" approved & broadcast!`);
  };

  const declineAdSubmission = (id: string, reason?: string) => {
    const target = adSubmissions.find(s => s.id === id);
    if (!target) return;

    setAdSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: 'declined', adminNotes: reason } : s));

    // Send required message to user's message box!
    sendSystemMessage(
      target.userId,
      'Your Ad is Declined by Admin',
      `Your ad "${target.title}" was declined by the administrator. ${reason ? 'Reason: ' + reason : 'Please review our sanctuary advertising guidelines and feel free to submit again.'}`,
      'ad_declined'
    );

    showToast(`Ad "${target.title}" has been declined.`);
  };

  // Subscription Requests
  const submitSubscriptionRequest = (paymentMethod: SubscriptionRequest['paymentMethod']) => {
    const currentUserId = user?.id || 'guest-' + Date.now();
    const currentUserEmail = user?.email || 'kashank2940087@gmail.com';
    const currentUserName = user?.name || 'Shayan Kashan';

    const newReq: SubscriptionRequest = {
      id: 'subreq-' + Date.now(),
      userId: currentUserId,
      userEmail: currentUserEmail,
      userName: currentUserName,
      plan: '1_month_pro',
      amount: 12, // Discounted from $20
      paymentMethod,
      submittedAt: new Date().toISOString(),
      status: 'pending',
      durationDays: 30
    };

    setSubscriptionRequests(prev => [newReq, ...prev]);
    setShowProModal(false);
    showToast('Pro Sanctuary request ($12) submitted! Pending Admin approval.');

    sendSystemMessage(
      currentUserId,
      'Pro Subscription Request Submitted ($12)',
      'Your request for 1 Month DEENWAR VIP Sanctuary Pro ($12 discounted flat rate) has been sent to Admin. You will receive an approval message here shortly.',
      'system'
    );
  };

  const approveSubscriptionRequest = (id: string) => {
    const target = subscriptionRequests.find(r => r.id === id);
    if (!target) return;

    setSubscriptionRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' } : r));

    // If current logged in user matches, or update their record
    if (user && (user.id === target.userId || user.email === target.userEmail)) {
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + 30);
      setUser({
        ...user,
        isPro: true,
        proExpiresAt: expiry.toISOString()
      });
    }

    // Send approval message into message box!
    sendSystemMessage(
      target.userId,
      'DEENWAR Pro Subscription APPROVED!',
      'Mabrook! Your DEENWAR Pro Subscription (1 Month / $12 Flat Rate) has been APPROVED by the Admin. You now enjoy zero ads, unlimited lossless recitations, and premium sanctuary features.',
      'subscription_approved'
    );

    showToast(`Approved Pro subscription for ${target.userName}!`);
  };

  const declineSubscriptionRequest = (id: string) => {
    const target = subscriptionRequests.find(r => r.id === id);
    if (!target) return;

    setSubscriptionRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'declined' } : r));

    sendSystemMessage(
      target.userId,
      'Subscription Request Declined',
      'Your request for DEENWAR Pro subscription could not be verified by Admin. Please check payment verification details or contact sanctuary support.',
      'subscription_declined'
    );

    showToast(`Declined subscription for ${target.userName}`);
  };

  // High Security Admin Auth with Key: shayan2010@
  const loginAdmin = (key: string): boolean => {
    // Exact requested key: shayan2010@
    if (key.trim() === 'shayan2010@') {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('deenwar_admin_auth', 'true');
      setShowAdminAuthModal(false);
      setActiveTab('admin');
      showToast('Admin Vault Authenticated Successfully');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('deenwar_admin_auth');
    setActiveTab('home');
    showToast('Admin logged out securely');
  };

  // Audio controllers
  const togglePlayAudio = () => {
    setIsPlayingAudio(prev => !prev);
    showToast(isPlayingAudio ? 'Recitation paused' : 'Reciting Surah Al-Mulk');
  };

  const cycleAudioSpeed = () => {
    const speeds = ['1.0x', '1.25x', '1.5x', '0.75x'];
    const idx = speeds.indexOf(audioSpeed);
    const next = speeds[(idx + 1) % speeds.length];
    setAudioSpeed(next);
    showToast(`Speed: ${next}`);
  };

  const toggleAmbientAdhan = () => {
    setAmbientAdhanOn(prev => !prev);
    showToast(ambientAdhanOn ? 'Ambient Adhan muted' : 'Ambient Adhan Chimes active');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        upgradeUserToPro,
        activeTab,
        setActiveTab,
        showLoginModal,
        setShowLoginModal,
        showProModal,
        setShowProModal,
        showWelcomeModal,
        setShowWelcomeModal,
        showAdminAuthModal,
        setShowAdminAuthModal,
        showNetlifyModal,
        setShowNetlifyModal,
        messages,
        unreadCount,
        markAsRead,
        markAllAsRead,
        deleteMessage,
        sendSystemMessage,
        adSubmissions,
        submitNewAd,
        approveAdSubmission,
        declineAdSubmission,
        subscriptionRequests,
        submitSubscriptionRequest,
        approveSubscriptionRequest,
        declineSubscriptionRequest,
        ads,
        adsEnabled,
        adIntervalSeconds,
        toggleAdsGlobally,
        setAdIntervalSeconds,
        currentAdPopup,
        closeAdPopup,
        triggerManualAd,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        currentReciter,
        setCurrentReciter,
        playingSurahNumber,
        setPlayingSurahNumber,
        playingAyahNumber,
        setPlayingAyahNumber,
        isPlayingAudio,
        togglePlayAudio,
        audioSpeed,
        cycleAudioSpeed,
        ambientAdhanOn,
        toggleAmbientAdhan,
        toastMessage,
        showToast,
        discountDaysRemaining,
        discountSecondsRemaining
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
