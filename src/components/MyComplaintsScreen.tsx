import React, { useState } from 'react';
import { ComplaintRecord, UserProfile } from '../types.ts';
import { useLanguage } from '../context/LanguageContext.tsx';

interface MyComplaintsScreenProps {
  complaints: ComplaintRecord[];
  onTrackDetail: (complaint: ComplaintRecord) => void;
  user: UserProfile | null;
}

export const MyComplaintsScreen: React.FC<MyComplaintsScreenProps> = ({ complaints, onTrackDetail, user }) => {
  const { t } = useLanguage();
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedModalCmp, setSelectedModalCmp] = useState<ComplaintRecord | null>(null);

  const statuses = ['ALL', 'SUBMITTED', 'VERIFIED', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'REJECTED'];

  const list = complaints.filter(c => {
    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    const matchesUser = user ? c.citizenMobile === user.mobile : false;
    return matchesStatus && matchesUser;
  });

  const getStatusStepIndex = (st: string) => {
    switch (st) {
      case 'SUBMITTED': return 1;
      case 'VERIFIED': return 2;
      case 'ACCEPTED': case 'ASSIGNED': return 3;
      case 'IN_PROGRESS': return 4;
      case 'COMPLETED': return 5;
      case 'REJECTED': return -1;
      default: return 1;
    }
  };

  const simulateDownloadPdf = (cmp: ComplaintRecord) => {
    alert(`📄 Generating Official Grievance Acknowledgement PDF receipt for ${cmp.id}...\n\nCitizen: ${cmp.citizenName}\nDepartment: ${cmp.department}\nStatus: ${cmp.status}\n\nDownloaded to local machine simulator.`);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
            <i className="bi bi-card-checklist text-blue-600"></i>
            <span>{t('my.title')}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">{t('my.subtitle')}</p>
        </div>

        {/* Filter Pill Bar */}
        <div className="flex flex-wrap gap-1.5">
          {statuses.map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                statusFilter === st
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Complaint Card List */}
      <div className="space-y-6">
        {list.length === 0 && (
          <div className="text-center py-12 px-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-3xl mx-auto mb-4 text-slate-400 dark:text-slate-500">
              <i className="bi bi-card-checklist"></i>
            </div>
            <h3 className="font-bold text-lg text-slate-800 dark:text-white">{t('my.noGrievance')}</h3>
            {user ? (
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
                We couldn't find any filed reports registered under your mobile number <strong className="text-blue-600 dark:text-blue-400 font-mono">+91 {user.mobile}</strong>. Switch to the <strong className="text-slate-700 dark:text-slate-300">Report Issue</strong> tab to register one!
              </p>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
                You are currently exploring as a guest. Please log in with a mobile number to see and track your custom grievances.
              </p>
            )}
          </div>
        )}
        {list.map(cmp => {
          const step = getStatusStepIndex(cmp.status);

          return (
            <div key={cmp.id} className="card-box-vibrant dark:bg-slate-800 dark:border-slate-700 p-6 rounded-3xl shadow-md transition hover:shadow-lg">
              <div className="flex flex-col lg:flex-row gap-6 justify-between items-start">
                
                {/* Left Photo & Meta */}
                <div className="flex gap-4 sm:gap-5 w-full lg:w-auto">
                  <img
                    src={cmp.images[0] || 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=300'}
                    alt="Complaint"
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border border-slate-200 shadow-sm flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-md">
                        {cmp.id}
                      </span>
                      <span className={`badge-vibrant text-[10px] ${
                        cmp.status === 'COMPLETED' ? 'badge-resolved' : cmp.status === 'REJECTED' ? 'badge-urgent' : 'badge-pending'
                      }`}>
                        {cmp.status.replace('_', ' ')}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        • {new Date(cmp.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900 dark:text-white mt-1.5 truncate">
                      {cmp.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
                      📍 {cmp.address}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-300 font-medium">
                      <span className="inline-flex items-center gap-1">
                        <i className="bi bi-building text-blue-500"></i>
                        <span>{cmp.department.split(' ')[0]}</span>
                      </span>
                      {cmp.assignedOfficer && (
                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                          <i className="bi bi-person-badge"></i>
                          <span>{cmp.assignedOfficer.split('(')[0]}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex lg:flex-col justify-end gap-2 w-full lg:w-auto border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100">
                  <button
                    onClick={() => setSelectedModalCmp(cmp)}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-1.5"
                  >
                    <i className="bi bi-eye-fill"></i>
                    <span>Timeline & Details</span>
                  </button>

                  <button
                    onClick={() => simulateDownloadPdf(cmp)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-semibold transition flex items-center justify-center gap-1.5"
                  >
                    <i className="bi bi-file-earmark-pdf-fill text-red-500"></i>
                    <span>Download Receipt</span>
                  </button>
                </div>

              </div>

              {/* Status Timeline Progress Bar */}
              {step !== -1 ? (
                <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-700/60">
                  <div className="flex justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    <span className={step >= 1 ? 'text-blue-600 dark:text-blue-400' : ''}>1. Submitted</span>
                    <span className={step >= 2 ? 'text-blue-600 dark:text-blue-400' : ''}>2. AI Verified</span>
                    <span className={step >= 3 ? 'text-blue-600 dark:text-blue-400' : ''}>3. Officer Accepted</span>
                    <span className={step >= 4 ? 'text-blue-600 dark:text-blue-400' : ''}>4. In Progress</span>
                    <span className={step >= 5 ? 'text-emerald-600 font-extrabold' : ''}>5. Resolved ✓</span>
                  </div>

                  <div className="w-full bg-slate-100 dark:bg-slate-900 h-2.5 rounded-full overflow-hidden p-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        step === 5 ? 'bg-emerald-500' : 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 animate-pulse'
                      }`}
                      style={{ width: `${(step / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ) : (
                <div className="mt-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs font-semibold flex items-center gap-2">
                  <i className="bi bi-x-circle-fill"></i>
                  <span>Complaint Rejected: {cmp.rejectionReason || 'Duplicate or invalid site report.'}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedModalCmp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 dark:border-slate-700 p-6 sm:p-8 relative">
            <button onClick={() => setSelectedModalCmp(null)} className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center dark:text-white">
              <i className="bi bi-x-lg"></i>
            </button>

            <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {selectedModalCmp.id}
            </span>
            <h2 className="text-xl font-bold font-heading mt-2 dark:text-white">{selectedModalCmp.title}</h2>
            <p className="text-xs text-slate-500 mt-1">📍 {selectedModalCmp.address}</p>

            <div className="my-6 aspect-video rounded-2xl overflow-hidden bg-slate-100 border">
              <img src={selectedModalCmp.images[0]} className="w-full h-full object-cover" alt="Detail" />
            </div>

            {/* AI Analysis Snapshot */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border mb-6 text-xs space-y-2">
              <div className="font-bold text-blue-600 uppercase">✦ Gemini AI Technical Diagnostics</div>
              <p className="dark:text-slate-200">{selectedModalCmp.aiAnalysis.summary}</p>
              <div className="grid grid-cols-3 gap-2 pt-2 text-center font-mono">
                <div className="bg-white dark:bg-slate-800 p-2 rounded-xl border">
                  <span className="text-[10px] text-slate-400 block">SEVERITY SCORE</span>
                  <strong className="text-sm text-red-500">{selectedModalCmp.aiAnalysis.severityScore}/100</strong>
                </div>
                <div className="bg-white dark:bg-slate-800 p-2 rounded-xl border">
                  <span className="text-[10px] text-slate-400 block">CONFIDENCE</span>
                  <strong className="text-sm text-emerald-500">{selectedModalCmp.aiAnalysis.confidenceScore}%</strong>
                </div>
                <div className="bg-white dark:bg-slate-800 p-2 rounded-xl border">
                  <span className="text-[10px] text-slate-400 block">SLA DEADLINE</span>
                  <strong className="text-sm text-blue-500">{selectedModalCmp.expectedResolutionHours}h</strong>
                </div>
              </div>
            </div>

            {/* Timeline Events Log */}
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Audit Trail Log Log Log</h3>
            <div className="space-y-3 pl-4 border-l-2 border-blue-500 mb-6 text-xs">
              {selectedModalCmp.timeline.map((t, idx) => (
                <div key={idx} className="relative pl-4">
                  <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-blue-600 border-2 border-white dark:border-slate-800"></span>
                  <div className="font-bold dark:text-white">{t.status} • <span className="text-slate-400 font-normal">{new Date(t.timestamp).toLocaleTimeString()}</span></div>
                  {t.note && <p className="text-slate-500 mt-0.5">{t.note}</p>}
                  <span className="text-[10px] text-blue-500 font-mono">Actor: {t.actor}</span>
                </div>
              ))}
            </div>

            {/* Completion After photos if resolved */}
            {selectedModalCmp.workPhotosAfter && selectedModalCmp.workPhotosAfter.length > 0 && (
              <div className="mt-6 pt-6 border-t">
                <h3 className="text-xs font-bold text-emerald-600 uppercase mb-3">✓ Officer Resolution Proof</h3>
                <div className="aspect-video rounded-2xl overflow-hidden border">
                  <img src={selectedModalCmp.workPhotosAfter[0]} className="w-full h-full object-cover" alt="Resolved" />
                </div>
              </div>
            )}

            <button onClick={() => setSelectedModalCmp(null)} className="w-full mt-6 py-3.5 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-md">
              Close Detail View
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
