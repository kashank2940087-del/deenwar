import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  CheckCheck,
  Trash2,
  Sparkles,
  Inbox,
  ArrowRight,
  ShieldCheck,
  XCircle,
  FileCheck
} from 'lucide-react';

export const MessageBoxModal: React.FC = () => {
  const {
    messages,
    markAsRead,
    markAllAsRead,
    deleteMessage,
    setActiveTab,
    setShowProModal
  } = useApp();

  const [filter, setFilter] = useState<'all' | 'subscription' | 'ad'>('all');

  const filtered = messages.filter(m => {
    if (filter === 'subscription') {
      return m.type.includes('subscription');
    }
    if (filter === 'ad') {
      return m.type.includes('ad');
    }
    return true;
  });

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#181c1a] border border-[#f2ca50]/20 p-5 rounded-2xl shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#f2ca50]/20 to-[#a7cfbd]/20 border border-[#f2ca50]/40 flex items-center justify-center text-[#f2ca50]">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#f2ca50]">
                Sanctuary Message Box
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-[#f2ca50]/15 text-[#f2ca50] text-xs font-semibold">
                {messages.length} Total
              </span>
            </div>
            <p className="text-xs text-[#d0c5af]/80">
              Real-time notices for subscriptions, ad approvals, and sanctuary broadcasts
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#272b28] hover:bg-[#313633] text-xs font-medium text-[#d0c5af] hover:text-[#f2ca50] transition-colors cursor-pointer border border-[#313633]"
              type="button"
            >
              <CheckCheck className="w-4 h-4 text-[#a7cfbd]" />
              <span>Mark All Read</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('home')}
            className="px-3 py-1.5 rounded-lg bg-[#294e40]/40 text-xs font-semibold text-[#a7cfbd] hover:text-[#f2ca50] transition-colors border border-[#a7cfbd]/30"
            type="button"
          >
            Back to Sanctuary
          </button>
        </div>
      </div>

      {/* Segmented Filter Bar */}
      <div className="flex items-center gap-2 p-1 bg-[#101412] rounded-xl border border-[#313633]">
        <button
          onClick={() => setFilter('all')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            filter === 'all'
              ? 'bg-[#272b28] text-[#f2ca50] shadow-sm border border-[#f2ca50]/30'
              : 'text-[#d0c5af]/70 hover:text-[#e0e3df]'
          }`}
          type="button"
        >
          All Messages ({messages.length})
        </button>

        <button
          onClick={() => setFilter('subscription')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            filter === 'subscription'
              ? 'bg-[#272b28] text-[#f2ca50] shadow-sm border border-[#f2ca50]/30'
              : 'text-[#d0c5af]/70 hover:text-[#e0e3df]'
          }`}
          type="button"
        >
          Subscriptions
        </button>

        <button
          onClick={() => setFilter('ad')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            filter === 'ad'
              ? 'bg-[#272b28] text-[#f2ca50] shadow-sm border border-[#f2ca50]/30'
              : 'text-[#d0c5af]/70 hover:text-[#e0e3df]'
          }`}
          type="button"
        >
          Ad Approvals &amp; Declines
        </button>
      </div>

      {/* Messages Stream */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="py-16 text-center bg-[#181c1a] rounded-2xl border border-[#313633] flex flex-col items-center justify-center gap-3">
            <Inbox className="w-12 h-12 text-[#99907c]/50" />
            <p className="text-sm font-semibold text-[#d0c5af]">No messages in this folder</p>
            <p className="text-xs text-[#99907c]">New updates will appear automatically.</p>
          </div>
        ) : (
          filtered.map((msg) => {
            const isApproved = msg.type === 'subscription_approved' || msg.type === 'ad_approved';
            const isDeclined = msg.type === 'subscription_declined' || msg.type === 'ad_declined';

            return (
              <div
                key={msg.id}
                onClick={() => markAsRead(msg.id)}
                className={`relative p-4 sm:p-5 rounded-2xl transition-all border cursor-pointer ${
                  !msg.isRead
                    ? 'bg-[#1c211e] border-[#f2ca50]/40 shadow-[0_4px_16px_rgba(242,202,80,0.12)]'
                    : 'bg-[#181c1a]/80 border-[#313633] hover:bg-[#1c211e]'
                }`}
              >
                {!msg.isRead && (
                  <span className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-[#f2ca50] ring-4 ring-[#101412] animate-pulse"></span>
                )}

                <div className="flex items-start gap-3.5">
                  {/* Category icon */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isApproved
                        ? 'bg-[#294e40] text-[#a7cfbd] border border-[#a7cfbd]/40'
                        : isDeclined
                        ? 'bg-red-950/60 text-red-400 border border-red-500/30'
                        : 'bg-[#272b28] text-[#f2ca50] border border-[#f2ca50]/30'
                    }`}
                  >
                    {isApproved ? (
                      <ShieldCheck className="w-5 h-5" />
                    ) : isDeclined ? (
                      <XCircle className="w-5 h-5" />
                    ) : (
                      <FileCheck className="w-5 h-5" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 pr-6">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm sm:text-base font-bold text-[#e0e3df] truncate">
                        {msg.title}
                      </h4>
                      {isApproved && (
                        <span className="text-[10px] font-bold text-[#a7cfbd] bg-[#294e40] px-2 py-0.5 rounded uppercase">
                          Approved
                        </span>
                      )}
                      {isDeclined && (
                        <span className="text-[10px] font-bold text-red-400 bg-red-950/70 px-2 py-0.5 rounded uppercase">
                          Declined
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#d0c5af] mt-1.5 leading-relaxed">
                      {msg.body}
                    </p>

                    <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-[#313633]/60 text-[11px] text-[#99907c]">
                      <span>{new Date(msg.createdAt).toLocaleString()}</span>

                      <div className="flex items-center gap-3">
                        {msg.type === 'subscription_declined' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowProModal(true);
                            }}
                            className="text-[#f2ca50] hover:underline font-semibold flex items-center gap-1"
                          >
                            <span>Try Again ($12)</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteMessage(msg.id);
                          }}
                          className="hover:text-red-400 transition-colors p-1"
                          title="Delete message"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
