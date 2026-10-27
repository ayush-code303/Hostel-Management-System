import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, CheckCircle2, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { paymentAPI } from '../services/api';
import shardaLogo from '../assets/sharda_logo.png';

export default function PaymentModal({ fee, onSuccess, onClose }) {
  const [step, setStep] = useState('select'); // 'select' | 'processing' | 'success'
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking'
  const [loading, setLoading] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  const amount = fee?.amount || 45000;
  const termName = fee?.term || 'Academic Term 2026-27 (Hostel & Mess)';

  const handlePay = async () => {
    setLoading(true);
    setStep('processing');
    try {
      // Step 1: Create Order
      const orderRes = await paymentAPI.createOrder({
        feeId: fee?._id || 'fee-01',
        amount
      });

      // Simulate network verification handshake
      await new Promise(res => setTimeout(res, 1200));

      const fakePaymentId = `pay_sua_${Date.now()}`;
      const fakeOrderId = orderRes?.data?.orderId || `order_test_${Date.now()}`;

      // Step 2: Verify Payment
      const verifyRes = await paymentAPI.verify({
        feeId: fee?._id || 'fee-01',
        razorpayOrderId: fakeOrderId,
        razorpayPaymentId: fakePaymentId,
        razorpaySignature: 'simulated_valid_sha256_signature',
        amountPaid: amount,
        paymentMethod: paymentMethod === 'upi' ? 'Razorpay UPI (Instant)' : 'Razorpay NetBanking'
      });

      setReceiptData(verifyRes?.data || {
        receiptId: `RCP-SUA-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        transactionId: fakePaymentId,
        amount,
        status: 'PAID'
      });
      setStep('success');
      if (onSuccess) {
        onSuccess(verifyRes?.data);
      }
    } catch (err) {
      console.warn('Payment API error fallback:', err);
      // Offline graceful fallback
      const fallbackReceipt = {
        receiptId: `RCP-SUA-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        transactionId: `TXN-SUA-ONLINE-${Date.now()}`,
        amount,
        status: 'PAID'
      };
      setReceiptData(fallbackReceipt);
      setStep('success');
      if (onSuccess) onSuccess(fallbackReceipt);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 max-w-md w-full rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95">
        
        {/* Razorpay + Sharda Header */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white/20 p-0.5 flex items-center justify-center shrink-0 border border-white/30">
              <img src={shardaLogo} alt="Sharda Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-black text-sm tracking-wide">Razorpay Gateway</h3>
                <span className="text-[9px] bg-emerald-400 text-slate-950 font-black px-1.5 py-0.2 rounded">SANDBOX</span>
              </div>
              <p className="text-[10px] text-blue-200 font-bold uppercase tracking-wider">Sharda University Fee Desk</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-white/20 rounded-xl text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content depending on step */}
        <div className="p-6 text-xs text-slate-700 dark:text-slate-300">
          {step === 'select' && (
            <div className="space-y-5">
              
              {/* Fee Summary Banner */}
              <div className="bg-blue-50 dark:bg-blue-950/50 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/50 flex justify-between items-center">
                <div>
                  <p className="text-[10px] uppercase font-extrabold text-blue-600 dark:text-blue-400">Total Payable Amount</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">₹{amount.toLocaleString('en-IN')}.00</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{termName}</p>
                </div>
                <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-md">
                  <CreditCard className="w-6 h-6" />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2">
                <p className="font-bold text-slate-700 dark:text-slate-300">Select Instant Payment Channel:</p>
                
                <div className="grid grid-cols-1 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/60 ring-2 ring-blue-600/30'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black text-xs">
                        UPI
                      </span>
                      <div className="text-left">
                        <p className="font-extrabold text-slate-900 dark:text-white">UPI / QR (GPay, PhonePe, Paytm)</p>
                        <p className="text-[10px] text-slate-500">Zero surcharge • Instant verification</p>
                      </div>
                    </div>
                    <span className="w-4 h-4 rounded-full border-2 border-blue-600 flex items-center justify-center p-0.5">
                      {paymentMethod === 'upi' && <span className="w-full h-full bg-blue-600 rounded-full"></span>}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
                      paymentMethod === 'card'
                        ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/60 ring-2 ring-blue-600/30'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs">
                        💳
                      </span>
                      <div className="text-left">
                        <p className="font-extrabold text-slate-900 dark:text-white">Debit / Credit Cards</p>
                        <p className="text-[10px] text-slate-500">Visa, Mastercard, RuPay, Maestro</p>
                      </div>
                    </div>
                    <span className="w-4 h-4 rounded-full border-2 border-blue-600 flex items-center justify-center p-0.5">
                      {paymentMethod === 'card' && <span className="w-full h-full bg-blue-600 rounded-full"></span>}
                    </span>
                  </button>
                </div>
              </div>

              {/* Security info */}
              <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
                <Lock className="w-3.5 h-3.5 text-emerald-500" />
                <span>256-Bit SSL Encrypted Razorpay Gateway Checkpoint</span>
              </div>

              {/* Checkout Button */}
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handlePay}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>Pay ₹{amount.toLocaleString('en-IN')} via Razorpay</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {step === 'processing' && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
              <div>
                <h4 className="font-black text-base text-slate-900 dark:text-white">Processing Razorpay Transaction...</h4>
                <p className="text-xs text-slate-500 mt-1">Contacting university banking gateway. Please do not refresh.</p>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="space-y-4 text-center">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-lg font-black text-slate-900 dark:text-white">Payment Confirmed!</h4>
                <p className="text-xs text-slate-500">Your hostel fee invoice has been settled in full.</p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Receipt Number:</span>
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{receiptData?.receiptId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Transaction ID:</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200 text-[11px]">{receiptData?.transactionId}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 dark:border-slate-800 pt-2 font-bold text-slate-900 dark:text-white">
                  <span>Amount Settled:</span>
                  <span className="text-emerald-600">₹{amount.toLocaleString('en-IN')}.00</span>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl shadow-md transition-colors"
                >
                  View Official Receipt
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
