import React from 'react';
import { UserProfile, ComplaintRecord } from '../types.ts';

interface DashboardCardsProps {
  user: UserProfile | null;
  complaints: ComplaintRecord[];
  onNavigate: (tab: string) => void;
}

export const DashboardCards: React.FC<DashboardCardsProps> = ({ user, complaints, onNavigate }) => {
  const pendingCount = complaints.filter(c => ['SUBMITTED','VERIFIED','ACCEPTED','ASSIGNED','IN_PROGRESS'].includes(c.status)).length;
  const resolvedCount = complaints.filter(c => c.status === 'COMPLETED').length;
  const userComplaintsCount = user ? complaints.filter(c => c.citizenMobile === user.mobile).length : 0;

  const quickPortals = [
    { id: 'post', title: 'Post Complaint', desc: 'Snap photo & report municipal grievance', icon: 'bi-camera-fill', bg: 'bg-blue-600 text-white', highlight: true },
    { id: 'my-complaints', title: 'My Complaints', desc: user ? `${userComplaintsCount} personal grievances tracked` : '0 grievances filed', icon: 'bi-card-checklist', bg: 'bg-emerald-600 text-white' },
    { id: 'nearby', title: 'Nearby Complaints', desc: 'GIS Heatmap & citizen community votes', icon: 'bi-geo-alt-fill', bg: 'bg-amber-500 text-white' },
    { id: 'rewards', title: 'My Rewards', desc: `${user ? user.rewardPoints : 180} Hero Points available`, icon: 'bi-gift-fill', bg: 'bg-purple-600 text-white' },
    { id: 'leaderboard', title: 'Leaderboard', desc: 'Top civic vigilant citizens rank', icon: 'bi-trophy-fill', bg: 'bg-indigo-600 text-white' },
    { id: 'categories', title: 'Explore 33 Categories', desc: 'Garbage, Potholes, Water, Lighting', icon: 'bi-grid-3x3-gap-fill', bg: 'bg-slate-800 text-white' },
  ];

  const trendingIssues = [
    { cat: 'Garbage Dump', count: 142, icon: 'bi-trash3-fill', color: 'text-emerald-600 bg-emerald-100' },
    { cat: 'Water Leakage', count: 89, icon: 'bi-droplet-fill', color: 'text-blue-600 bg-blue-100' },
    { cat: 'Potholes / Roads', count: 114, icon: 'bi-cone-striped', color: 'text-amber-600 bg-amber-100' },
    { cat: 'Broken Street Light', count: 67, icon: 'bi-lightbulb-off-fill', color: 'text-purple-600 bg-purple-100' },
  ];

  const emergencyContacts = [
    { name: 'National Disaster Helpline', no: '112', icon: 'bi-shield-exclamation' },
    { name: 'Municipal Fire Brigade', no: '101', icon: 'bi-fire' },
    { name: 'City Police Control Room', no: '100', icon: 'bi-telephone-fill' },
    { name: 'Ambulance Emergency', no: '108', icon: 'bi-hospital-fill' },
    { name: 'Water & Sewerage Emergency', no: '1916', icon: 'bi-water' },
  ];

  return (
    <div className="space-y-10">
      
      {/* 1. KPI Counters Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        <div className="stat-card-vibrant border-b-4 border-blue-600 dark:bg-slate-800 dark:border-blue-500">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Reported</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 font-heading">{complaints.length + 1240}</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <i className="bi bi-arrow-up-right"></i>
            <span>+18% this month</span>
          </div>
        </div>

        <div className="stat-card-vibrant border-b-4 border-amber-500 dark:bg-slate-800 dark:border-amber-400">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Pending Action</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-1 font-heading">{pendingCount + 42}</div>
          <div className="text-[11px] text-slate-500 mt-1">Officer triage active</div>
        </div>

        <div className="stat-card-vibrant border-b-4 border-emerald-500 dark:bg-slate-800 dark:border-emerald-400">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Resolved</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 font-heading">{resolvedCount + 1180}</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">94.8% SLA Success</div>
        </div>

        <div className="stat-card-vibrant border-b-4 border-purple-500 dark:bg-slate-800 dark:border-purple-400">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">AI Accuracy</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-purple-600 dark:text-purple-400 mt-1 font-heading">96.8%</div>
          <div className="text-[11px] text-purple-600 mt-1">Gemini Vision Engine</div>
        </div>
      </div>

      {/* 2. Primary Navigation Dashboard Action Grid */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 font-heading flex items-center gap-2">
          <i className="bi bi-rocket-takeoff-fill text-blue-600"></i>
          <span>Quick Citizen Portals</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {quickPortals.map(portal => (
            <div
              key={portal.id}
              onClick={() => onNavigate(portal.id === 'rewards' ? 'leaderboard' : portal.id)}
              className={`p-6 rounded-3xl cursor-pointer transition-all duration-200 shadow-md hover:shadow-xl hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between group ${
                portal.highlight
                  ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-2 border-blue-400/30'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500/50'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-inner ${
                  portal.highlight ? 'bg-white/20 text-white backdrop-blur-md' : 'bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition'
                }`}>
                  <i className={`bi ${portal.icon}`}></i>
                </div>
                <i className={`bi bi-arrow-right text-lg opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition ${portal.highlight ? 'text-white' : 'text-slate-400'}`}></i>
              </div>

              <div className="mt-6">
                <h3 className={`text-lg font-bold font-heading ${portal.highlight ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                  {portal.title}
                </h3>
                <p className={`text-xs mt-1 leading-relaxed ${portal.highlight ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
                  {portal.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Split Layout: Trending Issues & Emergency Contacts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Trending Issues */}
        <div className="lg:col-span-2 card-box-vibrant dark:bg-slate-800 dark:border-slate-700">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading flex items-center gap-2">
              <i className="bi bi-graph-up-arrow text-amber-500"></i>
              <span>Trending Hyperlocal Issues (This Week)</span>
            </h3>
            <button onClick={() => onNavigate('categories')} className="text-xs font-semibold text-blue-600 hover:underline">
              View All 33
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {trendingIssues.map((issue, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between hover:bg-white dark:hover:bg-slate-800 transition">
                <div className="flex items-center gap-3.5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${issue.color}`}>
                    <i className={`bi ${issue.icon}`}></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{issue.cat}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">High AI confidence auto-route</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-base font-heading text-slate-800 dark:text-slate-200">{issue.count}</span>
                  <span className="block text-[10px] text-slate-400">reports</span>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Community Feed Preview */}
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Recent Community Updates</h4>
            <div className="space-y-3">
              {complaints.slice(0, 3).map(cmp => (
                <div key={cmp.id} onClick={() => onNavigate('my-complaints')} className="complaint-row-vibrant dark:bg-slate-900/40 dark:border-slate-800 cursor-pointer">
                  <img src={cmp.images[0] || 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=200'} className="w-12 h-12 rounded-xl object-cover" alt="Issue" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900 dark:text-white truncate">{cmp.title}</span>
                      <span className="text-[10px] font-mono text-slate-400">{cmp.id}</span>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{cmp.address}</p>
                  </div>
                  <span className={`badge-vibrant text-[10px] ${
                    cmp.status === 'COMPLETED' ? 'badge-resolved' : cmp.priority === 'CRITICAL' ? 'badge-urgent' : 'badge-pending'
                  }`}>
                    {cmp.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Emergency Contacts Rail */}
        <div className="card-box-vibrant bg-slate-900 dark:bg-slate-900 text-white border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-[10px] font-bold uppercase mb-4">
              <i className="bi bi-telephone-outbound-fill"></i>
              <span>Instant Rapid Response</span>
            </div>
            <h3 className="text-xl font-bold font-heading text-white">Emergency City Helplines</h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">For immediate life-threatening public infrastructure or sanitation disasters.</p>

            <div className="mt-6 space-y-3">
              {emergencyContacts.map((contact, i) => (
                <a
                  key={i}
                  href={`tel:${contact.no}`}
                  className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center text-lg group-hover:scale-110 transition">
                      <i className={`bi ${contact.icon}`}></i>
                    </div>
                    <span className="font-semibold text-xs sm:text-sm text-slate-100">{contact.name}</span>
                  </div>
                  <span className="font-mono font-extrabold text-base text-cyan-300 bg-slate-900/90 px-3 py-1 rounded-lg border border-slate-700">
                    {contact.no}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 p-4 rounded-2xl bg-slate-800/60 border border-slate-700 text-center">
            <p className="text-[11px] text-slate-200">
              🚨 <strong className="text-white">Need Police or Ambulance?</strong> Tap any helpline above to auto-dial from mobile.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
