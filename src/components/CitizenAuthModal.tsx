import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types.ts';

interface CitizenAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile, token: string) => void;
}

export const CitizenAuthModal: React.FC<CitizenAuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [demoOtp, setDemoOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 mins in seconds

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpSent && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setError('OTP has expired. Please generate a new OTP.');
      setOtpSent(false);
    }
    return () => clearInterval(timer);
  }, [otpSent, timeLeft]);

  if (!isOpen) return null;

  const handleGenerateOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!mobile || mobile.length !== 10 || !/^\d+$/.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/otp/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, mobile })
      });
      const data = await res.json();
      if (res.ok) {
        setOtpSent(true);
        setTimeLeft(300);
        setDemoOtp(data.demoOtp || '123456');
      } else {
        setError(data.error || 'Failed to generate OTP');
      }
    } catch (err) {
      // Fallback for standalone preview
      setOtpSent(true);
      setTimeLeft(300);
      setDemoOtp('123456');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!otpInput || otpInput.length !== 6) {
      setError('Please enter the 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile, otp: otpInput })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        onLoginSuccess(data.user, data.token);
        onClose();
      } else {
        setError(data.error || 'Invalid OTP verification');
      }
    } catch (err) {
      // Fallback
      if (otpInput === '123456' || otpInput === demoOtp) {
        const fakeUser: UserProfile = {
          id: `USR-${mobile.slice(-4)}`,
          name: name || 'John Doe',
          mobile,
          role: 'CITIZEN',
          rewardPoints: 180,
          resolvedCount: 4,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name || 'Citizen'}`
        };
        onLoginSuccess(fakeUser, 'dummy_jwt_token');
        onClose();
      } else {
        setError('Invalid OTP code. Try 123456');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white text-center relative">
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition">
            <i className="bi bi-x-lg"></i>
          </button>
          <div className="w-16 h-16 rounded-2xl bg-white text-blue-600 font-extrabold text-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
            CH
          </div>
          <h2 className="text-2xl font-bold font-heading">Citizen Quick Login</h2>
          <p className="text-blue-100 text-xs mt-1">No Password • No Signup • Instant Access</p>
        </div>

        <div className="p-6 sm:p-8">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-sm flex items-center gap-2 border border-red-100">
              <i className="bi bi-exclamation-triangle-fill text-red-500"></i>
              <span>{error}</span>
            </div>
          )}

          {!otpSent ? (
            <form onSubmit={handleGenerateOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">FULL NAME</label>
                <div className="relative">
                  <i className="bi bi-person absolute left-3.5 top-3 text-slate-400"></i>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">MOBILE NUMBER</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-slate-500 font-medium text-sm">+91</span>
                  <input
                    type="tel"
                    maxLength={10}
                    required
                    value={mobile}
                    onChange={e => setMobile(e.target.value.replace(/\D/g, ''))}
                    placeholder="9876543210"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition disabled:opacity-50 flex items-center justify-center gap-2 mt-2 font-heading text-sm"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Generating OTP...</span>
                  </>
                ) : (
                  <>
                    <span>Generate OTP</span>
                    <i className="bi bi-arrow-right"></i>
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center mb-4">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1.5">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>OTP Sent to +91 {mobile}</span>
                </span>
                {demoOtp && (
                  <div className="mt-2 text-xs bg-amber-50 p-2 rounded-lg text-amber-800 border border-amber-200">
                    💡 Preview Test OTP: <strong className="font-mono text-sm tracking-widest">{demoOtp}</strong>
                  </div>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-600">ENTER 6-DIGIT OTP</label>
                  <span className="text-xs font-mono text-blue-600 font-bold">Expires in: {formatTime(timeLeft)}</span>
                </div>
                <input
                  type="text"
                  maxLength={6}
                  required
                  autoFocus
                  value={otpInput}
                  onChange={e => setOtpInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="123456"
                  className="w-full py-3 text-center tracking-[0.5em] font-mono font-bold text-xl bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 transition disabled:opacity-50 flex items-center justify-center gap-2 mt-2 font-heading text-sm"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <i className="bi bi-shield-check"></i>
                    <span>Verify & Login</span>
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => { setOtpSent(false); setOtpInput(''); }}
                  className="text-xs text-slate-500 hover:text-blue-600 font-medium underline transition"
                >
                  Change Mobile Number or Resend OTP
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400">
              By logging in, you agree to transparent public grievance reporting under Municipal Governance Guidelines.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
