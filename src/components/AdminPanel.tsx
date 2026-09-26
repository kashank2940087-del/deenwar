import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  LogOut,
  Megaphone,
  Sparkles,
  Sliders,
  Check,
  X,
  ExternalLink,
  Plus,
  Radio,
  Calendar,
  Clock,
  Send,
  AlertCircle
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const {
    isAdminAuthenticated,
    logoutAdmin,
    adSubmissions,
    approveAdSubmission,
    declineAdSubmission,
    subscriptionRequests,
    approveSubscriptionRequest,
    declineSubscriptionRequest,
    ads,
    adsEnabled,
    toggleAdsGlobally,
    adIntervalSeconds,
    setAdIntervalSeconds,
    triggerManualAd,
    setActiveTab,
    showToast
  } = useApp();

  const [adminTab, setAdminTab] = useState<'ad_requests' | 'subscriptions' | 'ad_controls'>('ad_requests');
  const [declineReason, setDeclineReason] = useState<Record<string, string>>({});
  const [showDeclineInput, setShowDeclineInput] = useState<Record<string, boolean>>({});

  if (!isAdminAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 text-center bg-[#181c1a] border border-red-500/30 rounded-3xl space-y-4">
        <ShieldAlert className="w-12 h-12 text-red-400 mx-auto" />
        <h2 className="font-playfair text-xl font-bold text-[#e0e3df]">Admin Vault Locked</h2>
        <p className="text-xs text-[#d0c5af]/80">Please enter the security access key to enter the administration console.</p>
        <button
          onClick={() => setActiveTab('home')}
          className="px-5 py-2.5 rounded-xl bg-[#272b28] text-xs font-semibold text-[#f2ca50]"
        >
          Return to Sanctuary
        </button>
      </div>
    );
  }

  const pendingAdsCount = adSubmissions.filter(s => s.status === 'pending').length;
  const pendingSubsCount = subscriptionRequests.filter(s => s.status === 'pending').length;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Admin Panel Header */}
      <div className="bg-[#181c1a] border border-[#f2ca50]/40 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600/30 to-[#f2ca50]/20 border border-[#f2ca50]/60 flex items-center justify-center text-[#f2ca50] shadow-md">
            <ShieldAlert className="w-6 h-6 text-[#f2ca50]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-playfair text-xl sm:text-2xl font-bold text-[#f2ca50]">
                DEENWAR Administration Console
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-[#f2ca50]/20 text-[#f2ca50] text-[10px] font-bold uppercase tracking-wider border border-[#f2ca50]/40">
                MASTER SECURE
              </span>
            </div>
            <p className="text-xs text-[#d0c5af]/80 mt-0.5">
              Governing Ad Broadcasts, Pro Subscriptions ($12), and System Messages
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('home')}
            className="px-3.5 py-1.5 rounded-xl bg-[#272b28] hover:bg-[#313633] text-xs font-semibold text-[#d0c5af] hover:text-[#f2ca50] border border-[#313633] transition-colors"
          >
            Visit Sanctuary Web
          </button>
          <button
            onClick={logoutAdmin}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-950/70 hover:bg-red-900/80 text-xs font-semibold text-red-300 border border-red-500/30 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock Admin</span>
          </button>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-[#101412] rounded-2xl border border-[#313633] overflow-x-auto">
        <button
          onClick={() => setAdminTab('ad_requests')}
          className={`flex-1 min-w-[160px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            adminTab === 'ad_requests'
              ? 'bg-[#272b28] text-[#f2ca50] shadow-md border border-[#f2ca50]/40'
              : 'text-[#d0c5af]/70 hover:text-[#e0e3df]'
          }`}
        >
          <Megaphone className="w-4 h-4" />
          <span>User Ad Requests</span>
          {pendingAdsCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-[#f2ca50] text-[#3c2f00] text-[10px] font-black">
              {pendingAdsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setAdminTab('subscriptions')}
          className={`flex-1 min-w-[160px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            adminTab === 'subscriptions'
              ? 'bg-[#272b28] text-[#f2ca50] shadow-md border border-[#f2ca50]/40'
              : 'text-[#d0c5af]/70 hover:text-[#e0e3df]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Pro Subscriptions ($12)</span>
          {pendingSubsCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-[#f2ca50] text-[#3c2f00] text-[10px] font-black">
              {pendingSubsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setAdminTab('ad_controls')}
          className={`flex-1 min-w-[160px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            adminTab === 'ad_controls'
              ? 'bg-[#272b28] text-[#f2ca50] shadow-md border border-[#f2ca50]/40'
              : 'text-[#d0c5af]/70 hover:text-[#e0e3df]'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Ad System Controls</span>
        </button>
      </div>

      {/* TAB 1: USER AD REQUESTS */}
      {adminTab === 'ad_requests' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#f2ca50] uppercase tracking-wider">
              Incoming User Ad Submissions ({adSubmissions.length})
            </h2>
            <span className="text-xs text-[#d0c5af]/70">
              Approvals auto-dispatch confirmation message to user
            </span>
          </div>

          {adSubmissions.length === 0 ? (
            <div className="p-12 text-center bg-[#181c1a] rounded-2xl border border-[#313633]">
              <p className="text-sm text-[#d0c5af]">No ad requests submitted yet.</p>
            </div>
          ) : (
            adSubmissions.map((sub) => {
              const showDecline = showDeclineInput[sub.id];

              return (
                <div
                  key={sub.id}
                  className="bg-[#181c1a] border border-[#313633] rounded-2xl p-5 shadow-lg space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      {/* Thumbnail */}
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#101412] border border-[#313633] flex-shrink-0">
                        <img
                          src={sub.mediaUrl}
                          alt={sub.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).setAttribute(
                              'src',
                              'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'
                            );
                          }}
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-playfair text-base sm:text-lg font-bold text-[#e0e3df]">
                            {sub.title}
                          </h3>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                              sub.status === 'approved'
                                ? 'bg-[#294e40] text-[#a7cfbd]'
                                : sub.status === 'declined'
                                ? 'bg-red-950 text-red-400'
                                : 'bg-[#f2ca50]/20 text-[#f2ca50]'
                            }`}
                          >
                            {sub.status}
                          </span>
                        </div>

                        <p className="text-xs text-[#d0c5af] leading-relaxed">
                          {sub.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-[#99907c]">
                          <span>By: <strong className="text-[#e0e3df]">{sub.userName}</strong> ({sub.userEmail})</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-[#f2ca50]" />
                            {sub.days} Days
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#f2ca50]" />
                            {sub.frequencyPerDay}x / day
                          </span>
                          <span>•</span>
                          <a
                            href={sub.linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#f2ca50] hover:underline flex items-center gap-0.5"
                          >
                            <span>Link</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex sm:flex-col items-center gap-2 flex-shrink-0 self-end sm:self-start">
                      {sub.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => approveAdSubmission(sub.id)}
                            className="w-full sm:w-28 py-2 px-3 rounded-xl bg-[#294e40] hover:bg-[#294e40]/80 text-[#a7cfbd] border border-[#a7cfbd]/40 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                            type="button"
                          >
                            <Check className="w-4 h-4" />
                            <span>Approve</span>
                          </button>

                          <button
                            onClick={() => {
                              setShowDeclineInput(prev => ({ ...prev, [sub.id]: !prev[sub.id] }));
                            }}
                            className="w-full sm:w-28 py-2 px-3 rounded-xl bg-red-950/70 hover:bg-red-900/80 text-red-300 border border-red-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                            type="button"
                          >
                            <X className="w-4 h-4" />
                            <span>Decline</span>
                          </button>
                        </>
                      ) : (
                        <span className="text-xs text-[#99907c] italic">
                          Action completed ({sub.status})
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Optional Decline Reason Input */}
                  {showDecline && sub.status === 'pending' && (
                    <div className="p-3 rounded-xl bg-[#101412] border border-red-500/30 flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Reason for declining (sent to user inbox)..."
                        value={declineReason[sub.id] || ''}
                        onChange={e => setDeclineReason({ ...declineReason, [sub.id]: e.target.value })}
                        className="flex-1 bg-[#181c1a] border border-[#313633] rounded-lg px-3 py-1.5 text-xs text-[#e0e3df] focus:outline-none focus:border-red-400"
                      />
                      <button
                        onClick={() => declineAdSubmission(sub.id, declineReason[sub.id])}
                        className="py-1.5 px-3 rounded-lg bg-red-800 text-white text-xs font-bold hover:bg-red-700 transition-colors"
                      >
                        Confirm Decline
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* TAB 2: PRO SUBSCRIPTIONS */}
      {adminTab === 'subscriptions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#f2ca50] uppercase tracking-wider">
              1-Month Pro Subscription Requests ($12 Flat Rate)
            </h2>
            <span className="text-xs text-[#d0c5af]/70">
              Approvals auto-grant 30-day Pro VIP access and message user
            </span>
          </div>

          {subscriptionRequests.length === 0 ? (
            <div className="p-12 text-center bg-[#181c1a] rounded-2xl border border-[#313633]">
              <p className="text-sm text-[#d0c5af]">No pending subscription requests.</p>
            </div>
          ) : (
            subscriptionRequests.map((req) => (
              <div
                key={req.id}
                className="bg-[#181c1a] border border-[#313633] rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-playfair text-base font-bold text-[#e0e3df]">
                      {req.userName}
                    </h3>
                    <span className="text-xs text-[#a7cfbd] bg-[#294e40] px-2 py-0.5 rounded font-bold">
                      ${req.amount}.00 Flat Discount
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        req.status === 'approved'
                          ? 'bg-[#294e40] text-[#a7cfbd]'
                          : req.status === 'declined'
                          ? 'bg-red-950 text-red-400'
                          : 'bg-[#f2ca50]/20 text-[#f2ca50]'
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>

                  <p className="text-xs text-[#d0c5af]">
                    Email: <strong>{req.userEmail}</strong> • Method: <span className="capitalize">{req.paymentMethod.replace('_', ' ')}</span>
                  </p>
                  <p className="text-[11px] text-[#99907c]">
                    Requested: {new Date(req.submittedAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {req.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => approveSubscriptionRequest(req.id)}
                        className="py-2 px-4 rounded-xl bg-gradient-to-r from-[#f2ca50] to-[#d4af37] text-[#3c2f00] text-xs font-bold flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                        type="button"
                      >
                        <Check className="w-4 h-4" />
                        <span>Approve Pro ($12)</span>
                      </button>

                      <button
                        onClick={() => declineSubscriptionRequest(req.id)}
                        className="py-2 px-3 rounded-xl bg-red-950/70 hover:bg-red-900/80 text-red-300 border border-red-500/30 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                        type="button"
                      >
                        <X className="w-4 h-4" />
                        <span>Decline</span>
                      </button>
                    </>
                  ) : (
                    <span className="text-xs text-[#99907c] italic">
                      Status: {req.status}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 3: ADS SYSTEM CONTROLS */}
      {adminTab === 'ad_controls' && (
        <div className="space-y-6">
          {/* Global Toggle & Interval Controller */}
          <div className="bg-[#181c1a] border border-[#f2ca50]/30 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
            <h2 className="text-sm font-bold text-[#f2ca50] uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4" />
              <span>Ad Network Global Dispatcher</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Global ON / OFF */}
              <div className="p-4 rounded-xl bg-[#101412] border border-[#313633] flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#e0e3df]">
                    Global Ads System
                  </h4>
                  <p className="text-[11px] text-[#99907c]">
                    Enables automatic modal broadcast across the website
                  </p>
                </div>

                <button
                  onClick={() => toggleAdsGlobally(!adsEnabled)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    adsEnabled
                      ? 'bg-[#294e40] text-[#a7cfbd] border border-[#a7cfbd]/40'
                      : 'bg-red-950/80 text-red-400 border border-red-500/30'
                  }`}
                  type="button"
                >
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  <span>{adsEnabled ? 'ACTIVE (ON)' : 'PAUSED (OFF)'}</span>
                </button>
              </div>

              {/* Interval Frequency Slider (Default 60s / 1 min) */}
              <div className="p-4 rounded-xl bg-[#101412] border border-[#313633] flex flex-col justify-between gap-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs sm:text-sm font-bold text-[#e0e3df]">
                    Display Frequency
                  </h4>
                  <span className="text-xs font-mono font-bold text-[#f2ca50] bg-[#181c1a] px-2 py-0.5 rounded border border-[#4d4635]/40">
                    Every {adIntervalSeconds} Seconds ({Math.round(adIntervalSeconds / 60)} min)
                  </span>
                </div>

                <input
                  type="range"
                  min={15}
                  max={180}
                  step={15}
                  value={adIntervalSeconds}
                  onChange={e => setAdIntervalSeconds(Number(e.target.value))}
                  className="w-full accent-[#f2ca50] cursor-pointer"
                />

                <span className="text-[10px] text-[#99907c]">
                  Requested: "every 1 minut user willsee ads" (Default: 60s)
                </span>
              </div>
            </div>

            {/* Quick broadcast test trigger */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-[#313633]">
              <div className="flex items-center gap-2 text-xs text-[#d0c5af]">
                <AlertCircle className="w-4 h-4 text-[#f2ca50]" />
                <span>Test how ads appear immediately to non-Pro visitors:</span>
              </div>

              <button
                onClick={triggerManualAd}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#272b28] hover:bg-[#313633] text-xs font-bold text-[#f2ca50] border border-[#f2ca50]/40 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                type="button"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Dispatch Test Ad Broadcast Now</span>
              </button>
            </div>
          </div>

          {/* Active Broadcast Ad Pool */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#d0c5af] uppercase tracking-wider">
              Active Broadcast Ad Pool ({ads.length})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {ads.map((ad) => (
                <div
                  key={ad.id}
                  className="bg-[#181c1a] border border-[#313633] rounded-2xl p-4 shadow-md space-y-2 flex flex-col justify-between"
                >
                  <div className="w-full h-28 rounded-xl overflow-hidden bg-[#101412] relative">
                    <img
                      src={ad.mediaUrl}
                      alt={ad.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).setAttribute(
                          'src',
                          'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'
                        );
                      }}
                    />
                    <span className="absolute top-1.5 right-1.5 bg-[#101412]/80 text-[#f2ca50] text-[9px] font-bold px-1.5 py-0.5 rounded">
                      {ad.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-[#e0e3df] line-clamp-1">{ad.title}</h4>
                    <p className="text-[11px] text-[#d0c5af]/70 line-clamp-2 mt-0.5">{ad.description}</p>
                  </div>

                  <div className="pt-2 border-t border-[#313633] flex items-center justify-between text-[10px] text-[#99907c]">
                    <span>{ad.sponsorName}</span>
                    <a
                      href={ad.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#f2ca50] hover:underline flex items-center gap-0.5"
                    >
                      <span>Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
