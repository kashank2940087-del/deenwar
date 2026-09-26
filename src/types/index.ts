export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isPro: boolean;
  proExpiresAt?: string;
  createdAt: string;
}

export type AdType = 'banner' | 'photo' | 'video' | 'link';

export interface AdItem {
  id: string;
  title: string;
  description: string;
  type: AdType;
  mediaUrl: string;
  linkUrl: string;
  sponsorName: string;
  days: number;
  frequency: number;
  status: 'active' | 'paused';
  submittedBy?: string;
}

export interface AdSubmission {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  title: string;
  description: string;
  type: AdType;
  mediaUrl: string;
  linkUrl: string;
  days: number;
  frequencyPerDay: number;
  submittedAt: string;
  status: 'pending' | 'approved' | 'declined';
  adminNotes?: string;
}

export interface SubscriptionRequest {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  plan: '1_month_pro';
  amount: number; // $12 discounted (regular $20)
  paymentMethod: 'card' | 'apple_pay' | 'crypto' | 'bank_transfer';
  submittedAt: string;
  status: 'pending' | 'approved' | 'declined';
  durationDays: number;
}

export interface AppMessage {
  id: string;
  userId: string; // recipient
  title: string;
  body: string;
  type: 'subscription_approved' | 'subscription_declined' | 'ad_approved' | 'ad_declined' | 'welcome' | 'system';
  isRead: boolean;
  createdAt: string;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
  juz: number;
}

export interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
  translation: string;
  transliteration: string;
  audioUrl?: string;
}

export interface Hadith {
  id: string;
  collection: string;
  bookName: string;
  hadithNumber: string;
  grade: string;
  arabicText: string;
  englishText: string;
  narrator: string;
  topic: string;
  commentary?: string;
}

export interface DivineName {
  id: number;
  arabic: string;
  transliteration: string;
  meaning: string;
  quranRef: string;
  category: string;
  explanation: string;
}

export interface PropheticTitle {
  id: number;
  arabic: string;
  title: string;
  meaning: string;
  explanation: string;
  source: string;
}
