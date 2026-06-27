import React, { useState } from 'react';
import { UserProfile, ComplaintRecord } from '../types.ts';
import { useLanguage } from '../context/LanguageContext.tsx';

interface OfficerPortalProps {
  user: UserProfile | null;
  complaints: ComplaintRecord[];
  onLoginOfficer: (officerUser: UserProfile) => void;
  onUpdateComplaintStatus: (cmpId: string, newStatus: string, note?: string, afterPhoto?: string) => void;
  onGenerateOtp?: (cmpId: string) => string;
  activeOtps?: Record<string, string>;
}

export const OfficerPortal: React.FC<OfficerPortalProps> = ({
  user,
  complaints,
  onLoginOfficer,
  onUpdateComplaintStatus,
  onGenerateOtp,
  activeOtps = {}
}) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('rajesh.sharma@civichero.gov.in');
  const [password, setPassword] = useState('officer@123');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [activeTab, setActiveTab] = useState<'triage' | 'resolved' | 'ai-insights'>('triage');

  // Action Modal State
  const [actionModalCmp, setActionModalCmp] = useState<ComplaintRecord | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [closureOtp, setClosureOtp] = useState('');
  const [completionProofImg, setCompletionProofImg] = useState('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isOtpRequestSent, setIsOtpRequestSent] = useState<boolean>(false);
  const [simulatedOtpSms, setSimulatedOtpSms] = useState<string | null>(null);

  const handleClosurePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setCompletionProofImg(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const depts = ['ALL', 'Solid Waste Management', 'Water Supply & Sewerage', 'Roads & Traffic', 'Electrical & Lighting', 'Horticulture & Trees'];

  const handleOfficerAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const officerProfile: UserProfile = {
      id: 'OFF-MH-941',
      name: 'Rajesh Sharma (Senior Health Officer)',
      mobile: '9823011223',
      role: 'OFFICER',
      rewardPoints: 950,
      resolvedCount: 42,
      department: 'Solid Waste Management',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RajeshOfficer'
    };
    onLoginOfficer(officerProfile);
  };

  if (!user || user.role === 'CITIZEN') {
    return (
      <div className="max-w-md mx-auto card-box-vibrant dark:bg-slate-800 dark:border-slate-700 p-8 my-10 animate-fadeIn">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-3xl mx-auto shadow-lg shadow-emerald-500/30">
            <i className="bi bi-shield-lock-fill"></i>
          </div>
          <h2 className="text-2xl font-bold font-heading mt-4 dark:text-white">Municipal Officer Portal</h2>
          <p className="text-xs text-slate-500 mt-1">Authorized Department Supervisors & Field Engineers only</p>
        </div>

        <form onSubmit={handleOfficerAuth} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">GOVERNMENT EMAIL ID</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border text-sm font-medium dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">SECURE TOKEN / PASSWORD</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border text-sm font-medium dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs border border-emerald-200">
            💡 Preview Demo Credentials Auto-Filled above. Simply tap Login.
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold font-heading shadow-lg shadow-emerald-500/25 transition"
          >
            Authenticate Officer Portal
          </button>
        </form>
      </div>
    );
  }

  const filteredList = complaints.filter(c => {
    const matchDept = selectedDept === 'ALL' || c.department.includes(selectedDept);
    if (activeTab === 'triage') return matchDept && c.status !== 'COMPLETED' && c.status !== 'REJECTED';
    if (activeTab === 'resolved') return matchDept && c.status === 'COMPLETED';
    return matchDept;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Officer Hero Header */}
      <div className="ai-panel-vibrant flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <div className="ai-header-vibrant mb-2">
            <i className="bi bi-shield-check text-base"></i>
            <span>{t('officer.title')} • SWACHH BHARAT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            Dashboard: {user.name.split('(')[0]}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Department: <strong className="text-cyan-300">{user.department}</strong> • {t('officer.subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl border border-white/10">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block">PENDING TRIAGE</span>
            <span className="text-2xl font-bold font-heading text-amber-400">{filteredList.length} Tasks</span>
          </div>
        </div>
      </div>

      {/* Dept Filter Tabs */}
      <div className="flex flex-wrap gap-2 pb-2 border-b">
        {depts.map(d => (
          <button
            key={d}
            onClick={() => setSelectedDept(d)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              selectedDept === d ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            {d === 'ALL' ? '🏢 All Departments' : d}
          </button>
        ))}
      </div>

      {/* Dashboard Sub-Tabs */}
      <div className="flex gap-4">
        <button
          onClick={() => setActiveTab('triage')}
          className={`pb-2 text-sm font-bold border-b-2 transition ${activeTab === 'triage' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-400'}`}
        >
          ⚡ Action Triage Queue ({complaints.filter(c => c.status !== 'COMPLETED').length})
        </button>
        <button
          onClick={() => setActiveTab('resolved')}
          className={`pb-2 text-sm font-bold border-b-2 transition ${activeTab === 'resolved' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-400'}`}
        >
          ✓ Completed Archive
        </button>
        <button
          onClick={() => setActiveTab('ai-insights')}
          className={`pb-2 text-sm font-bold border-b-2 transition ${activeTab === 'ai-insights' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-400'}`}
        >
          🤖 Gemini AI Triage Diagnostics
        </button>
      </div>

      {/* Complaint List Table / Cards */}
      <div className="space-y-4">
        {filteredList.map(cmp => (
          <div key={cmp.id} className="card-box-vibrant dark:bg-slate-800 dark:border-slate-700 p-5 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm">
            
            <div className="flex items-start gap-4 flex-1">
              <img src={cmp.images[0]} className="w-20 h-20 rounded-2xl object-cover border flex-shrink-0" alt="Issue" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">{cmp.id}</span>
                  <span className={`badge-vibrant text-[10px] ${cmp.priority === 'CRITICAL' ? 'badge-urgent' : 'badge-pending'}`}>{cmp.priority}</span>
                  <span className="text-[10px] font-bold text-slate-400">AI Confidence: {cmp.aiAnalysis.confidenceScore}%</span>
                </div>

                <h3 className="font-bold text-base mt-1 dark:text-white font-heading">{cmp.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">📍 {cmp.address}</p>

                <div className="mt-2 text-[11px] text-slate-600 dark:text-slate-300 font-medium bg-slate-50 dark:bg-slate-900 p-2 rounded-xl border">
                  <strong>🤖 AI Summary:</strong> {cmp.aiAnalysis.summary}
                </div>
              </div>
            </div>

            {/* Officer Workflow Actions */}
            <div className="flex flex-wrap md:flex-col gap-2 w-full md:w-48">
              {cmp.status === 'VERIFIED' || cmp.status === 'SUBMITTED' ? (
                <>
                  <button
                    onClick={() => onUpdateComplaintStatus(cmp.id, 'ACCEPTED', 'Accepted by Field Supervisor')}
                    className="flex-1 py-2 px-3 rounded-xl bg-blue-600 text-white text-xs font-bold shadow hover:bg-blue-700 transition"
                  >
                    ✓ Accept Task
                  </button>
                  <button
                    onClick={() => { setActionModalCmp(cmp); }}
                    className="flex-1 py-2 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition"
                  >
                    ✗ Reject / Re-Route
                  </button>
                </>
              ) : cmp.status === 'ACCEPTED' || cmp.status === 'ASSIGNED' ? (
                <button
                  onClick={() => onUpdateComplaintStatus(cmp.id, 'IN_PROGRESS', 'Sanitation fleet arrived at spot')}
                  className="w-full py-2.5 px-3 rounded-xl bg-amber-500 text-white text-xs font-bold shadow hover:bg-amber-600 transition animate-pulse"
                >
                  🚀 Start In-Progress
                </button>
              ) : cmp.status === 'IN_PROGRESS' ? (
                <button
                  onClick={() => {
                    setClosureOtp('');
                    setValidationError(null);
                    setIsOtpRequestSent(false);
                    setSimulatedOtpSms(null);
                    setCompletionProofImg('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80');
                    setActionModalCmp(cmp);
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow hover:bg-emerald-700 transition flex items-center justify-center gap-1.5"
                >
                  <i className="bi bi-camera-fill"></i>
                  <span>Upload Closure Proof</span>
                </button>
              ) : (
                <span className="badge-vibrant badge-resolved text-xs py-2 w-full justify-center">
                  ✓ Task Completed
                </span>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* Officer Workflow Action Modal */}
      {actionModalCmp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border relative">
            <button onClick={() => setActionModalCmp(null)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600">
              <i className="bi bi-x-lg"></i>
            </button>

            <h3 className="text-lg font-bold font-heading dark:text-white mb-2">
              Officer Action: {actionModalCmp.id}
            </h3>

            {actionModalCmp.status === 'IN_PROGRESS' ? (
              <div className="space-y-4 text-left mt-4">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs border border-emerald-100 flex items-center gap-2">
                  <i className="bi bi-info-circle-fill text-emerald-500"></i>
                  <span>📸 Fill the work closure form. Enter real-time citizen OTP & upload "After" picture to successfully resolve.</span>
                </div>

                {/* 1. File Upload Selector for Resolution Proof Photo */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase mb-1.5 tracking-wider">
                    Upload Solved Site Photo <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                    <label className="py-3.5 px-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 hover:border-emerald-500 hover:bg-emerald-50/50 transition flex items-center justify-center gap-2 cursor-pointer shadow-sm group">
                      <input type="file" accept="image/*" onChange={handleClosurePhotoSelect} className="hidden" />
                      <i className="bi bi-image text-emerald-600 text-lg group-hover:scale-110 transition"></i>
                      <span className="font-bold text-xs text-slate-800 dark:text-white">Choose File</span>
                    </label>
                    <label className="py-3.5 px-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 hover:border-blue-500 hover:bg-blue-50/50 transition flex items-center justify-center gap-2 cursor-pointer shadow-sm group">
                      <input type="file" accept="image/*" capture="environment" onChange={handleClosurePhotoSelect} className="hidden" />
                      <i className="bi bi-camera-fill text-blue-600 text-lg group-hover:scale-110 transition"></i>
                      <span className="font-bold text-xs text-slate-800 dark:text-white">Live Capture</span>
                    </label>
                  </div>

                  {/* Work Photo Preview / Text URL Fallback */}
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={completionProofImg}
                      onChange={e => setCompletionProofImg(e.target.value)}
                      placeholder="Or input image URL manually"
                      className="w-full p-2.5 rounded-xl border text-xs bg-slate-50 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                    {completionProofImg && (
                      <div className="relative rounded-xl overflow-hidden border max-h-40">
                        <img src={completionProofImg} className="w-full h-32 object-cover" alt="Proof" />
                        <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded font-mono">
                          Closure Proof Preview
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Real-time OTP System */}
                <div className="border-t border-slate-100 dark:border-slate-700/60 pt-4">
                  <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase mb-1.5 tracking-wider">
                    Real-time Citizen OTP Verification <span className="text-red-500">*</span>
                  </label>

                  {!isOtpRequestSent ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (onGenerateOtp) {
                          const otpVal = onGenerateOtp(actionModalCmp.id);
                          setSimulatedOtpSms(otpVal);
                          setIsOtpRequestSent(true);
                          setValidationError(null);
                        }
                      }}
                      className="w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition"
                    >
                      <i className="bi bi-chat-left-dots-fill"></i>
                      <span>Request Dynamic OTP from Citizen</span>
                    </button>
                  ) : (
                    <div className="space-y-3">
                      {/* Simulated SMS Toast for testing */}
                      <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-900/60 text-[11px] animate-pulse">
                        <div className="font-bold mb-1 flex items-center gap-1.5">
                          <i className="bi bi-envelope-fill"></i>
                          <span>Simulated Mobile Gateway SMS Transmitted</span>
                        </div>
                        <div>To citizen: "Your OTP for verifying cleanup of report #{actionModalCmp.id} is <strong>{simulatedOtpSms}</strong>."</div>
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          maxLength={6}
                          value={closureOtp}
                          onChange={e => {
                            setClosureOtp(e.target.value.replace(/\D/g, ''));
                            setValidationError(null);
                          }}
                          placeholder="Enter 6-digit OTP code"
                          className="flex-1 p-2.5 rounded-xl border text-center font-mono font-bold tracking-widest text-sm bg-slate-50 dark:bg-slate-900 dark:text-white focus:ring-1 focus:ring-emerald-500"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (onGenerateOtp) {
                              const otpVal = onGenerateOtp(actionModalCmp.id);
                              setSimulatedOtpSms(otpVal);
                              setValidationError(null);
                            }
                          }}
                          className="px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-xl text-xs font-semibold"
                          title="Resend OTP"
                        >
                          Resend
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Validation Errors */}
                {validationError && (
                  <div className="p-3 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/60 rounded-xl text-xs font-bold flex items-center gap-2">
                    <i className="bi bi-exclamation-triangle-fill"></i>
                    <span>{validationError}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  onClick={() => {
                    if (!completionProofImg) {
                      setValidationError('Please select or capture a work closure photo.');
                      return;
                    }
                    if (!isOtpRequestSent) {
                      setValidationError('Please request and enter the Citizen verification OTP first.');
                      return;
                    }
                    if (!closureOtp || closureOtp !== simulatedOtpSms) {
                      setValidationError('Invalid Citizen OTP. Please verify the code transmitted to the citizen.');
                      return;
                    }

                    onUpdateComplaintStatus(actionModalCmp.id, 'COMPLETED', 'Work verified & closed by officer via OTP authorization', completionProofImg);
                    setActionModalCmp(null);
                    // Reset local states
                    setClosureOtp('');
                    setValidationError(null);
                    setIsOtpRequestSent(false);
                    setSimulatedOtpSms(null);
                  }}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2"
                >
                  <i className="bi bi-shield-fill-check"></i>
                  <span>✓ Verify OTP & Mark Resolved</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-left mt-4">
                <p className="text-xs text-slate-500">Provide official reason for rejecting or re-routing this complaint:</p>
                <textarea
                  rows={3}
                  value={rejectReason}
                  onChange={e => setRejectReason(e.target.value)}
                  placeholder="e.g. Duplicate report already tracked under CMP-8102..."
                  className="w-full p-3 rounded-xl border text-xs bg-slate-50 dark:bg-slate-900 dark:text-white"
                ></textarea>
                <button
                  onClick={() => {
                    onUpdateComplaintStatus(actionModalCmp.id, 'REJECTED', rejectReason || 'Rejected by officer');
                    setActionModalCmp(null);
                  }}
                  className="w-full py-3 bg-red-600 text-white font-bold rounded-xl text-xs"
                >
                  Confirm Rejection
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
