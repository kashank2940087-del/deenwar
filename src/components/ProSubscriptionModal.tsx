import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Check,
  CreditCard,
  Flame,
  X,
  Coins,
  Building2,
  Lock,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ProSubscriptionModal: React.FC = () => {
  const {
    showProModal,
    setShowProModal,
    submitSubscriptionRequest,
    discountSecondsRemaining,
    user
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'crypto' | 'bank_transfer'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardHolder, setCardHolder] = useState(user?.name || 'Shayan Kashan');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const days = Math.floor(discountSecondsRemaining / 86400);
  const hours = Math.floor((discountSecondsRemaining % 86400) / 3600);
  const minutes = Math.floor((discountSecondsRemaining % 3600) / 60);

  if (!showProModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      submitSubscriptionRequest(paymentMethod);
      setIsSubmitting(false);

      // Trigger celebratory gold confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#f2ca50', '#d4af37', '#a7cfbd']
        });
      } catch {
        // Confetti optional
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#181c1a] border border-[#f2ca50]/40 p-6 sm:p-7 shadow-[0_24px_70px_rgba(0,0,0,0.9)] flex flex-col gap-4 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Glow backdrop */}
        <div className="absolute -right-20 -top-20 w-48 h-48 rounded-full bg-[#f2ca50]/15 blur-3xl pointer-events-none"></div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f2ca50]/20 to-[#a7cfbd]/20 border border-[#f2ca50]/40 flex items-center justify-center text-[#f2ca50]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-playfair text-xl font-bold text-[#f2ca50]">
                  DEENWAR VIP Sanctuary
                </h3>
              </div>
              <p className="text-xs text-[#d0c5af]/80">
                1-Month Unrestricted Pro Membership
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowProModal(false)}
            className="w-8 h-8 rounded-full bg-[#272b28] flex items-center justify-center text-[#d0c5af] hover:text-[#f2ca50] transition-colors"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 30-Day Ramadan Flat Discount Banner */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#294e40]/70 via-[#1c211e] to-[#294e40]/70 border border-[#f2ca50]/40 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#f2ca50] text-[#3c2f00] flex items-center justify-center font-bold flex-shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#f2ca50] uppercase tracking-wider">
                  RAMADAN 30-DAY FLAT DISCOUNT
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-sm line-through text-[#d0c5af]/60 font-semibold">$20.00 / month</span>
                <span className="text-xl font-extrabold text-[#f2ca50] font-playfair">$12.00 ONLY</span>
              </div>
            </div>
          </div>

          {/* Mini Countdown */}
          <div className="text-right">
            <span className="text-[10px] text-[#a7cfbd] uppercase tracking-wider font-semibold block">Ends In</span>
            <span className="text-xs font-mono font-bold text-[#f2ca50] bg-[#101412] px-2 py-0.5 rounded border border-[#4d4635]/40 inline-block mt-0.5">
              {days}d {hours}h {minutes}m
            </span>
          </div>
        </div>

        {/* Features Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#e0e3df] pt-1">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#f2ca50]/20 text-[#f2ca50] flex items-center justify-center flex-shrink-0">
              <Check className="w-3.5 h-3.5" />
            </span>
            <span>100% Zero Popup Ads or Interruptions</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#f2ca50]/20 text-[#f2ca50] flex items-center justify-center flex-shrink-0">
              <Check className="w-3.5 h-3.5" />
            </span>
            <span>Lossless Studio Quran Audio (4 Reciters)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#f2ca50]/20 text-[#f2ca50] flex items-center justify-center flex-shrink-0">
              <Check className="w-3.5 h-3.5" />
            </span>
            <span>30+ Classical Tafseer &amp; Hadith Sanad</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#f2ca50]/20 text-[#f2ca50] flex items-center justify-center flex-shrink-0">
              <Check className="w-3.5 h-3.5" />
            </span>
            <span>Priority Sponsor Ad Verification</span>
          </div>
        </div>

        {/* Payment Method Selector */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 pt-2">
          <label className="text-xs font-bold text-[#d0c5af] uppercase tracking-wider">
            Select Payment Method ($12 Flat)
          </label>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setPaymentMethod('card')}
              className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs font-semibold cursor-pointer ${
                paymentMethod === 'card'
                  ? 'bg-[#294e40]/60 border-[#f2ca50] text-[#f2ca50]'
                  : 'bg-[#1c211e] border-[#313633] text-[#d0c5af]'
              }`}
            >
              <CreditCard className="w-5 h-5" />
              <span>Credit Card</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('crypto')}
              className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs font-semibold cursor-pointer ${
                paymentMethod === 'crypto'
                  ? 'bg-[#294e40]/60 border-[#f2ca50] text-[#f2ca50]'
                  : 'bg-[#1c211e] border-[#313633] text-[#d0c5af]'
              }`}
            >
              <Coins className="w-5 h-5" />
              <span>Crypto (USDT)</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('bank_transfer')}
              className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs font-semibold cursor-pointer ${
                paymentMethod === 'bank_transfer'
                  ? 'bg-[#294e40]/60 border-[#f2ca50] text-[#f2ca50]'
                  : 'bg-[#1c211e] border-[#313633] text-[#d0c5af]'
              }`}
            >
              <Building2 className="w-5 h-5" />
              <span>Bank Slip</span>
            </button>
          </div>

          {/* Payment Details Inputs */}
          {paymentMethod === 'card' && (
            <div className="space-y-2 mt-1 bg-[#101412] p-3 rounded-xl border border-[#313633]">
              <input
                type="text"
                value={cardHolder}
                onChange={e => setCardHolder(e.target.value)}
                placeholder="Cardholder Name"
                className="w-full bg-[#181c1a] border border-[#313633] rounded-lg px-3 py-2 text-xs text-[#e0e3df] focus:outline-none focus:border-[#f2ca50]"
                required
              />
              <input
                type="text"
                value={cardNumber}
                onChange={e => setCardNumber(e.target.value)}
                placeholder="Card Number"
                className="w-full bg-[#181c1a] border border-[#313633] rounded-lg px-3 py-2 text-xs text-[#e0e3df] focus:outline-none focus:border-[#f2ca50]"
                required
              />
            </div>
          )}

          {paymentMethod === 'crypto' && (
            <div className="p-3 rounded-xl bg-[#101412] border border-[#313633] text-xs text-[#d0c5af] space-y-1">
              <p className="font-semibold text-[#f2ca50]">Send 12.00 USDT (TRC-20 / ERC-20):</p>
              <code className="block bg-[#181c1a] p-2 rounded text-[11px] font-mono text-[#a7cfbd] break-all">
                0x71C...DEENWAR99VIP...313F
              </code>
              <p className="text-[10px] text-[#99907c]">Admin approves instantly upon transaction confirmation.</p>
            </div>
          )}

          {paymentMethod === 'bank_transfer' && (
            <div className="p-3 rounded-xl bg-[#101412] border border-[#313633] text-xs text-[#d0c5af] space-y-1">
              <p className="font-semibold text-[#f2ca50]">Direct Sanctuary Wire:</p>
              <p>IBAN: DE89 3704 0044 0532 0130 00</p>
              <p className="text-[10px] text-[#99907c]">Reference: {user?.email || 'kashank2940087@gmail.com'}</p>
            </div>
          )}

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#f2ca50] to-[#d4af37] text-[#3c2f00] font-bold text-sm uppercase tracking-wider shadow-[0_4px_20px_rgba(242,202,80,0.35)] hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {isSubmitting ? (
              <span>Submitting Request to Admin...</span>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Submit Subscription Request ($12)</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-[11px] text-center text-[#99907c]">
          Requests are sent directly to the Admin Panel. You will receive an approval confirmation in your Message Box.
        </p>
      </div>
    </div>
  );
};
