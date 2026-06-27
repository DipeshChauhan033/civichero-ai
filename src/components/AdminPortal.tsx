import React, { useState } from 'react';
import { UserProfile, ComplaintRecord } from '../types.ts';
import { useLanguage } from '../context/LanguageContext.tsx';

interface AdminPortalProps {
  user: UserProfile | null;
  complaints: ComplaintRecord[];
  onLoginAdmin: (adminProfile: UserProfile) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ user, complaints, onLoginAdmin }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'analytics' | 'departments' | 'ai-rules'>('analytics');

  const deptsList = [
    { name: 'Solid Waste Management', code: 'SWM', activeFleets: 42, slaRate: '96.2%', head: 'Dr. Ramesh Gupta' },
    { name: 'Water Supply & Sewerage', code: 'WSS', activeFleets: 18, slaRate: '92.4%', head: 'Er. S. K. Kulkarni' },
    { name: 'Roads & Bridges Department', code: 'RBD', activeFleets: 25, slaRate: '89.1%', head: 'Er. A. B. Deshmukh' },
    { name: 'Electrical & Street Lighting', code: 'ESL', activeFleets: 14, slaRate: '98.0%', head: 'Er. P. V. Shinde' },
  ];

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const adminUser: UserProfile = {
      id: 'ADM-SUPER-01',
      name: 'Vikramaditya Rao (Municipal Commissioner)',
      mobile: '9800000001',
      role: 'ADMIN',
      rewardPoints: 9999,
      resolvedCount: 1240,
      department: 'Central Municipal Secretariat',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AdminCommissioner'
    };
    onLoginAdmin(adminUser);
  };

  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="max-w-md mx-auto card-box-vibrant dark:bg-slate-800 dark:border-slate-700 p-8 my-10 animate-fadeIn">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-danger text-white bg-red-600 flex items-center justify-center text-3xl mx-auto shadow-lg shadow-red-500/30">
            <i className="bi bi-gear-wide-connected"></i>
          </div>
          <h2 className="text-2xl font-bold font-heading mt-4 dark:text-white">Admin Command Center</h2>
          <p className="text-xs text-slate-500 mt-1">Municipal Commissioners & System Root Administrators only</p>
        </div>

        <form onSubmit={handleAdminAuth} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">ADMIN USERNAME / SECRET KEY</label>
            <input type="text" readOnly value="commissioner.root" className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border text-sm font-mono dark:text-white" />
          </div>
          <button type="submit" className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold font-heading shadow-lg shadow-red-500/25 transition">
            Launch Admin Command Center
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900 via-slate-900 to-indigo-950 p-8 rounded-3xl text-white shadow-2xl flex justify-between items-center">
        <div>
          <span className="px-3 py-1 rounded-full bg-red-500/30 text-red-300 text-xs font-bold uppercase tracking-widest border border-red-400/30">
            🚨 SYSTEM ROOT OVERRIDE
          </span>
          <h1 className="text-3xl font-bold font-heading mt-2">{t('admin.title')}</h1>
          <p className="text-xs text-slate-300 mt-1">{t('admin.subtitle')}</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="stat-card-vibrant dark:bg-slate-800 border-b-4 border-red-600">
          <div className="text-xs font-bold text-slate-400 uppercase">Total Grievances</div>
          <div className="text-3xl font-extrabold mt-1 dark:text-white font-heading">{complaints.length + 3420}</div>
        </div>
        <div className="stat-card-vibrant dark:bg-slate-800 border-b-4 border-emerald-600">
          <div className="text-xs font-bold text-slate-400 uppercase">City SLA Rate</div>
          <div className="text-3xl font-extrabold mt-1 text-emerald-500 font-heading">94.8%</div>
        </div>
        <div className="stat-card-vibrant dark:bg-slate-800 border-b-4 border-blue-600">
          <div className="text-xs font-bold text-slate-400 uppercase">Active Fleets</div>
          <div className="text-3xl font-extrabold mt-1 text-blue-500 font-heading">99 Units</div>
        </div>
        <div className="stat-card-vibrant dark:bg-slate-800 border-b-4 border-purple-600">
          <div className="text-xs font-bold text-slate-400 uppercase">AI Triage Savings</div>
          <div className="text-3xl font-extrabold mt-1 text-purple-500 font-heading">₹42.5 Lakh</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b pb-2">
        <button onClick={() => setActiveTab('analytics')} className={`text-sm font-bold pb-2 ${activeTab === 'analytics' ? 'border-b-2 border-red-600 text-red-600' : 'text-slate-400'}`}>
          📊 GIS Chart Analytics
        </button>
        <button onClick={() => setActiveTab('departments')} className={`text-sm font-bold pb-2 ${activeTab === 'departments' ? 'border-b-2 border-red-600 text-red-600' : 'text-slate-400'}`}>
          🏢 Department Fleets & Heads
        </button>
      </div>

      {activeTab === 'analytics' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card-box-vibrant dark:bg-slate-800 dark:border-slate-700 p-6">
            <h3 className="font-bold text-base font-heading dark:text-white mb-4">Complaint Status Distribution</h3>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between mb-1"><span className="dark:text-white">Resolved (Completed)</span> <strong>78%</strong></div>
                <div className="w-full bg-slate-100 dark:bg-slate-900 h-3 rounded-full"><div className="bg-emerald-500 h-full rounded-full w-[78%]"></div></div>
              </div>
              <div>
                <div className="flex justify-between mb-1"><span className="dark:text-white">In Progress (Fleets Active)</span> <strong>14%</strong></div>
                <div className="w-full bg-slate-100 dark:bg-slate-900 h-3 rounded-full"><div className="bg-blue-500 h-full rounded-full w-[14%]"></div></div>
              </div>
              <div>
                <div className="flex justify-between mb-1"><span className="dark:text-white">Pending Officer Triage</span> <strong>8%</strong></div>
                <div className="w-full bg-slate-100 dark:bg-slate-900 h-3 rounded-full"><div className="bg-amber-500 h-full rounded-full w-[8%]"></div></div>
              </div>
            </div>
          </div>

          <div className="card-box-vibrant dark:bg-slate-800 dark:border-slate-700 p-6 flex flex-col justify-center text-center">
            <i className="bi bi-robot text-6xl text-blue-500 mb-2 animate-bounce"></i>
            <h3 className="font-bold text-lg font-heading dark:text-white">Gemini Vision 2.5 Active</h3>
            <p className="text-xs text-slate-500 mt-1">Auto duplicate elimination & geofence coordinate matching operating at 99.1% precision.</p>
          </div>
        </div>
      ) : (
        <div className="card-box-vibrant dark:bg-slate-800 dark:border-slate-700 p-6 space-y-4">
          <h3 className="font-bold text-base font-heading dark:text-white mb-4">Municipal Departments Registry</h3>
          {deptsList.map((d, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border flex justify-between items-center text-xs">
              <div>
                <span className="font-mono font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">{d.code}</span>
                <h4 className="font-bold text-sm dark:text-white mt-1">{d.name}</h4>
                <span className="text-slate-400">Head: {d.head}</span>
              </div>
              <div className="text-right">
                <span className="block font-bold text-emerald-500 text-sm">SLA: {d.slaRate}</span>
                <span className="text-slate-400">{d.activeFleets} Active Fleets</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
