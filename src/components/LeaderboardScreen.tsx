import React from 'react';
import { UserProfile } from '../types.ts';
import { useLanguage } from '../context/LanguageContext.tsx';

interface LeaderboardScreenProps {
  user: UserProfile | null;
}

export const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ user }) => {
  const { t } = useLanguage();
  const leaders = [
    { rank: 1, name: 'John Doe', points: 450, reports: 18, verified: 15, badge: '🌟 Platinum Vigilante', color: 'bg-amber-100 text-amber-800 border-amber-300' },
    { rank: 2, name: 'Priya Mehta', points: 390, reports: 14, verified: 13, badge: '🥇 Gold Sentinel', color: 'bg-slate-100 text-slate-800 border-slate-300' },
    { rank: 3, name: 'Rahul Sharma', points: 320, reports: 11, verified: 11, badge: '🥈 Silver Protector', color: 'bg-orange-100 text-orange-800 border-orange-300' },
    { rank: 4, name: 'Ananya Desai', points: 280, reports: 10, verified: 9, badge: '🥉 Bronze Warden', color: 'bg-blue-50 text-blue-800 border-blue-200' },
    { rank: 5, name: 'Amit Verma', points: 210, reports: 8, verified: 8, badge: '🛡️ Scout Hero', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  ];

  const rewardsStore = [
    { title: '₹100 Smart City Transit Pass', cost: 200, icon: 'bi-bus-front-fill', bg: 'bg-blue-500' },
    { title: 'Municipal Gym Monthly Voucher', cost: 350, icon: 'bi-bicycle', bg: 'bg-emerald-500' },
    { title: 'City Park Botanical Entry Coupon', cost: 150, icon: 'bi-tree-fill', bg: 'bg-amber-500' },
    { title: 'Official Mayor Certificate of Appreciation', cost: 500, icon: 'bi-award-fill', bg: 'bg-purple-600' },
  ];

  return (
    <div className="space-y-10 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-8 rounded-3xl text-white shadow-xl flex justify-between items-center relative overflow-hidden">
        <div>
          <span className="px-3 py-1 rounded-full bg-white/15 text-xs font-bold uppercase tracking-widest text-amber-300 backdrop-blur-md">
            🏆 SWACHH CITIZEN REWARDS ENGINE
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading mt-3">{t('leader.title')}</h1>
          <p className="text-blue-100 text-sm mt-1">{t('leader.subtitle')}</p>
        </div>
        <div className="text-right hidden sm:block">
          <div className="text-xs text-blue-200 uppercase font-semibold">Your Civic Balance</div>
          <div className="text-4xl font-extrabold font-heading text-amber-300 mt-1">{user ? user.rewardPoints : 180} PTS</div>
        </div>
      </div>

      {/* Leaderboard + Rewards Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Top Vigilante Table */}
        <div className="lg:col-span-2 card-box-vibrant dark:bg-slate-800 dark:border-slate-700">
          <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <i className="bi bi-bar-chart-line-fill text-blue-600"></i>
            <span>Top 5 Active Citizens (Nagpur Smart City)</span>
          </h2>

          <div className="space-y-3">
            {leaders.map((ldr) => (
              <div key={ldr.rank} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between transition hover:scale-[1.01] hover:bg-white dark:hover:bg-slate-800 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold font-mono text-sm ${
                    ldr.rank === 1 ? 'bg-amber-400 text-slate-900 shadow-md shadow-amber-400/30' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}>
                    #{ldr.rank}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-900 dark:text-white">{ldr.name}</div>
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border mt-1 ${ldr.color}`}>
                      {ldr.badge}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-right">
                  <div className="hidden sm:block">
                    <span className="font-bold text-xs text-slate-700 dark:text-slate-300">{ldr.reports}</span>
                    <span className="block text-[10px] text-slate-400">Reports</span>
                  </div>
                  <div>
                    <span className="font-extrabold text-lg font-heading text-blue-600 dark:text-blue-400">{ldr.points}</span>
                    <span className="block text-[10px] text-slate-400">Points</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Redeem Rewards Store */}
        <div className="card-box-vibrant dark:bg-slate-800 dark:border-slate-700">
          <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <i className="bi bi-gift-fill text-purple-600"></i>
            <span>Redeem Store Vouchers</span>
          </h2>

          <div className="space-y-4 mt-6">
            {rewardsStore.map((rew, i) => (
              <div key={i} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between hover:border-purple-500 transition">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl text-white flex items-center justify-center text-lg shadow-sm ${rew.bg}`}>
                    <i className={`bi ${rew.icon}`}></i>
                  </div>
                  <div className="max-w-[140px]">
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-tight">{rew.title}</h4>
                    <span className="text-[10px] font-mono text-purple-600 font-bold block mt-1">{rew.cost} PTS Required</span>
                  </div>
                </div>

                <button
                  onClick={() => alert(`🎁 Redeeming ${rew.title} voucher...\n\nVoucher Code: CH_PASS_${Math.floor(100000+Math.random()*900000)}\n\nRedeemed successfully!`)}
                  disabled={(user ? user.rewardPoints : 180) < rew.cost}
                  className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-[11px] transition shadow-sm"
                >
                  Redeem
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
