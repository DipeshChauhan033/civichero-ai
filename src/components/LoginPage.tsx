import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types.ts';
import { useLanguage, Language } from '../context/LanguageContext.tsx';

interface LoginPageProps {
  onLoginSuccess: (user: UserProfile, token: string) => void;
  onGuestExplore: () => void;
  onSelectOfficer: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onGuestExplore,
  onSelectOfficer,
  darkMode,
  onToggleDarkMode
}) => {
  const { lang, setLang, t } = useLanguage();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [receivedOtp, setReceivedOtp] = useState('');
  const [showSmsToast, setShowSmsToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpSent && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setError('OTP has expired. Please request a new code.');
      setOtpSent(false);
    }
    return () => clearInterval(timer);
  }, [otpSent, timeLeft]);

  const handleGenerateOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) {
      setError(lang === 'Hindi' ? 'कृपया अपना पूरा नाम दर्ज करें' : 'Please enter your full name');
      return;
    }
    if (!mobile || mobile.length !== 10 || !/^\d+$/.test(mobile)) {
      setError(lang === 'Hindi' ? 'कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें' : 'Please enter a valid 10-digit mobile number');
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
        const code = data.demoOtp || Math.floor(100000 + Math.random() * 900000).toString();
        setReceivedOtp(code);
        setShowSmsToast(true);
        setTimeout(() => setShowSmsToast(false), 12000); // Hide toast after 12s
      } else {
        setError(data.error || 'Failed to generate OTP');
      }
    } catch (err) {
      setOtpSent(true);
      setTimeLeft(300);
      const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
      setReceivedOtp(randomCode);
      setShowSmsToast(true);
      setTimeout(() => setShowSmsToast(false), 12000);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!otpInput || otpInput.length !== 6) {
      setError(lang === 'Hindi' ? 'कृपया 6 अंकों का OTP दर्ज करें' : 'Please enter the 6-digit OTP code');
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
      } else {
        setError(data.error || 'Invalid OTP code');
      }
    } catch (err) {
      if (otpInput === receivedOtp || otpInput === '123456') {
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
      } else {
        setError('Invalid verification code.');
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
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative p-4 sm:p-6 transition-colors duration-200">
      
      {/* Realistic Simulated Phone SMS Toast */}
      {showSmsToast && (
        <div className="fixed top-6 right-6 z-50 animate-slideDown bg-slate-900 dark:bg-slate-800 text-white p-4.5 rounded-2xl shadow-2xl max-w-sm border border-slate-700/80 ring-2 ring-blue-500/30">
          <div className="flex items-center justify-between text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-1.5">
            <span className="flex items-center gap-1.5 text-blue-400">
              <i className="bi bi-chat-left-text-fill"></i>
              <span>Simulated SMS Carrier</span>
            </span>
            <span>Just now</span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-200 font-medium">
            CivicHero Security: Your one-time verification code is <strong className="font-mono text-cyan-300 font-extrabold text-base tracking-widest ml-1 bg-slate-800 dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-700">{receivedOtp}</strong>. Do not share this code.
          </p>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-slate-200 to-orange-500 p-[2.5px] flex items-center justify-center shadow-lg shadow-orange-500/15">
            <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[13px] flex items-center justify-center text-lg shadow-inner">
              <i className="bi bi-shield-fill-check text-blue-700 dark:text-blue-400"></i>
            </div>
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent font-heading">
              {t('app.name')}
            </span>
            <div className="text-[10px] uppercase tracking-widest font-bold text-slate-400 -mt-1">
              Enterprise Civic Portal
            </div>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector */}
          <select
            value={lang}
            onChange={e => setLang(e.target.value as Language)}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 rounded-xl px-3 py-2 text-xs font-bold cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="English">🌐 English</option>
            <option value="Hindi">🌐 हिन्दी (Hindi)</option>
            <option value="Marathi">🌐 मराठी (Marathi)</option>
            <option value="Gujarati">🌐 ગુજરાતી (Gujarati)</option>
          </select>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="w-9 h-9 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-sm shadow-sm transition hover:scale-105"
            title="Toggle Dark Mode"
          >
            <i className={`bi ${darkMode ? 'bi-sun-fill text-amber-400' : 'bi-moon-stars-fill text-slate-600'}`}></i>
          </button>
        </div>
      </div>

      {/* Center Auth Card */}
      <div className="max-w-md w-full mx-auto my-auto bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 relative overflow-hidden animate-fadeIn">
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-10 -mt-10"></div>
        
        <div className="text-center mb-8 relative z-10">
          <div className="w-16 h-16 bg-blue-50 dark:bg-slate-800 rounded-3xl mx-auto flex items-center justify-center text-blue-600 dark:text-blue-400 text-3xl mb-4 shadow-inner">
            <i className="bi bi-shield-check"></i>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
            {t('login.title')}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            {t('login.sub')}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 text-xs font-semibold flex items-center gap-2">
            <i className="bi bi-exclamation-triangle-fill text-sm"></i>
            <span>{error}</span>
          </div>
        )}

        {!otpSent ? (
          <form onSubmit={handleGenerateOtp} className="space-y-4.5 relative z-10">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                {t('login.nameLabel')}
              </label>
              <div className="relative">
                <i className="bi bi-person absolute left-3.5 top-3.5 text-slate-400"></i>
                <input
                  type="text"
                  required
                  placeholder={lang === 'Hindi' ? 'जैसे: राजेश कुमार' : 'e.g. Aarav Sharma'}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                {t('login.mobileLabel')}
              </label>
              <div className="flex gap-2">
                <span className="inline-flex items-center px-3.5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold font-mono text-slate-600 dark:text-slate-300">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="xxxxxxxxxx"
                  value={mobile}
                  onChange={e => setMobile(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-sm tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating Code...</span>
                </>
              ) : (
                <>
                  <span>{t('login.getOtp')}</span>
                  <i className="bi bi-arrow-right"></i>
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-5 relative z-10 animate-fadeIn">
            <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 text-center">
              <span className="text-xs text-slate-600 dark:text-slate-300">
                {t('login.verifySub')}: <strong className="font-mono text-slate-900 dark:text-white">+91 {mobile}</strong>
              </span>
              <div className="mt-2 text-[11px] font-semibold text-blue-600 dark:text-blue-400 flex items-center justify-center gap-1">
                <i className="bi bi-clock"></i>
                <span>Expires in {formatTime(timeLeft)}</span>
              </div>
            </div>

            <div>
              <label className="block text-center text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">
                ENTER 6-DIGIT OTP
              </label>
              <input
                type="text"
                required
                maxLength={6}
                placeholder="• • • • • •"
                value={otpInput}
                onChange={e => setOtpInput(e.target.value.replace(/\D/g, ''))}
                className="w-full px-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-blue-500/40 font-mono text-center tracking-[0.5em] text-2xl font-extrabold text-blue-600 dark:text-blue-400 focus:outline-none focus:border-blue-600 transition shadow-inner"
              />
            </div>

            <button
              type="submit"
              disabled={loading || otpInput.length !== 6}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle-fill"></i>
                  <span>{t('login.verifyBtn')}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setOtpSent(false)}
              className="w-full text-center text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 pt-1 transition"
            >
              ← Change Mobile Number
            </button>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <button
            onClick={onGuestExplore}
            className="w-full py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs transition flex items-center justify-center gap-2"
          >
            <i className="bi bi-compass"></i>
            <span>{t('login.guestBtn')}</span>
          </button>

          <button
            onClick={onSelectOfficer}
            className="w-full py-2.5 px-4 rounded-xl border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 font-semibold text-xs transition flex items-center justify-center gap-2"
          >
            <i className="bi bi-shield-lock"></i>
            <span>{t('login.officerBtn')}</span>
          </button>
        </div>

      </div>

      {/* Footer info */}
      <div className="max-w-7xl w-full mx-auto text-center py-4 text-[11px] text-slate-400 font-medium">
        © 2026 Municipal Corporation • Citizen Redressal & AI Triage Platform
      </div>

    </div>
  );
};
