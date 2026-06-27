import React, { useState } from 'react';
import { ComplaintRecord } from '../types.ts';
import { useLanguage } from '../context/LanguageContext.tsx';

interface NearbyComplaintsScreenProps {
  complaints: ComplaintRecord[];
  onVoteComplaint: (complaintId: string) => void;
  upvotedIds?: string[];
}

export const NearbyComplaintsScreen: React.FC<NearbyComplaintsScreenProps> = ({
  complaints,
  onVoteComplaint,
  upvotedIds = []
}) => {
  const { t } = useLanguage();
  const [selectedPinId, setSelectedPinId] = useState<string | null>(complaints[0]?.id || null);
  const selectedPin = complaints.find(c => c.id === selectedPinId) || complaints[0] || null;
  const [commentInput, setCommentInput] = useState('');

  const handleAddComment = async (cmp: ComplaintRecord) => {
    if (!commentInput.trim()) return;
    try {
      await fetch(`/api/complaints/${cmp.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author: 'Citizen Vigilante', text: commentInput, isOfficer: false })
      });
      cmp.comments.push({
        id: `c_${Date.now()}`,
        author: 'Citizen Vigilante',
        text: commentInput,
        timestamp: new Date().toISOString(),
        isOfficer: false
      });
      setCommentInput('');
    } catch (err) {
      cmp.comments.push({
        id: `c_${Date.now()}`,
        author: 'Citizen Vigilante',
        text: commentInput,
        timestamp: new Date().toISOString(),
        isOfficer: false
      });
      setCommentInput('');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Title */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 p-8 rounded-3xl text-white shadow-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold uppercase tracking-wider">
            📍 GIS COMMUNITY HEATMAP
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading mt-2">{t('nearby.title')}</h1>
          <p className="text-xs text-slate-300 mt-1">{t('nearby.subtitle')}</p>
        </div>

        <div className="flex items-center gap-2 bg-white/10 p-3 rounded-2xl backdrop-blur-md">
          <i className="bi bi-broadcast text-emerald-400 text-xl animate-pulse"></i>
          <span className="text-xs font-mono font-bold">LIVE TELEMETRY ACTIVE</span>
        </div>
      </div>

      {/* Map + Hotspot List Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Interactive GIS Map Simulation Container */}
        <div className="lg:col-span-2 rounded-3xl overflow-hidden bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 h-[500px] relative shadow-lg flex items-center justify-center">
          
          {/* Simulated Google Map Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
          
          {/* Map Pins */}
          {complaints.map((cmp, idx) => {
            // Simulated position offsets
            const top = 20 + ((idx * 37) % 65);
            const left = 15 + ((idx * 43) % 70);
            const isSelected = selectedPin?.id === cmp.id;

            return (
              <div
                key={cmp.id}
                onClick={() => setSelectedPinId(cmp.id)}
                style={{ top: `${top}%`, left: `${left}%` }}
                className={`absolute cursor-pointer transition-all duration-300 group z-10 ${isSelected ? 'scale-125 z-20' : 'hover:scale-110'}`}
              >
                <div className={`px-2.5 py-1 rounded-full text-white font-bold text-[10px] shadow-lg flex items-center gap-1 font-mono ${
                  cmp.priority === 'CRITICAL' ? 'bg-red-600 animate-bounce' : cmp.status === 'COMPLETED' ? 'bg-emerald-600' : 'bg-blue-600'
                }`}>
                  <i className="bi bi-geo-alt-fill"></i>
                  <span>{cmp.votes} {t('nearby.votes')}</span>
                </div>
                {/* Pin Tip */}
                <div className={`w-2 h-2 rotate-45 mx-auto -mt-1 ${
                  cmp.priority === 'CRITICAL' ? 'bg-red-600' : cmp.status === 'COMPLETED' ? 'bg-emerald-600' : 'bg-blue-600'
                }`}></div>
              </div>
            );
          })}

          <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold shadow-md dark:text-white flex items-center gap-3 border">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block"></span> Critical</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span> Active</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block"></span> Resolved</span>
          </div>
        </div>

        {/* Hotspot Selected Pin Detail Rail */}
        <div className="card-box-vibrant dark:bg-slate-800 dark:border-slate-700 flex flex-col h-[500px]">
          {selectedPin ? (
            <div className="flex-1 flex flex-col justify-between overflow-y-auto pr-1">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded">
                    {selectedPin.id}
                  </span>
                  <span className="text-[10px] text-slate-400">~1.2 km away</span>
                </div>

                <img src={selectedPin.images[0]} className="w-full h-36 rounded-2xl object-cover mb-3 shadow-sm border" alt="Hotspot" />

                <h3 className="font-bold text-base font-heading dark:text-white">{selectedPin.title}</h3>
                <p className="text-xs text-slate-500 mt-1">📍 {selectedPin.address}</p>

                {/* Rapid Fleet Dispatch Alert if votes >= 16 */}
                {selectedPin.votes >= 16 ? (
                  <div className="mt-3 p-3 rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 text-xs font-bold flex items-center gap-2 animate-pulse shadow-sm">
                    <i className="bi bi-shield-fill-lightning text-red-500 text-lg"></i>
                    <div>
                      <span className="block text-[11px] font-extrabold uppercase tracking-wide">🚨 RAPID FLEET DISPATCH</span>
                      <span className="block text-[10px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">Remediation team emergency-dispatched via 16+ community votes.</span>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 p-2.5 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[10px] font-bold flex items-center gap-1.5">
                    <i className="bi bi-info-circle-fill text-amber-500"></i>
                    <span>⚡ Reaching 16 upvotes triggers automatic Priority Upgrade and Instant Fleet Dispatch.</span>
                  </div>
                )}

                {/* Vote Action */}
                <div className="mt-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-extrabold text-sm text-slate-900 dark:text-white font-heading">{selectedPin.votes} {t('nearby.votes')}</div>
                    <div className="text-[9px] text-slate-400 font-medium">Higher votes trigger rapid fleet dispatch</div>
                  </div>
                  <button
                    disabled={upvotedIds.includes(selectedPin.id)}
                    onClick={() => onVoteComplaint(selectedPin.id)}
                    className={`px-4 py-2.5 rounded-xl text-white font-bold text-xs shadow-md active:scale-95 transition flex items-center gap-1.5 ${
                      upvotedIds.includes(selectedPin.id)
                        ? 'bg-emerald-600 dark:bg-emerald-700/80 cursor-not-allowed opacity-90'
                        : 'bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-600 hover:to-amber-600'
                    }`}
                  >
                    {upvotedIds.includes(selectedPin.id) ? (
                      <>
                        <i className="bi bi-check-circle-fill"></i>
                        <span>Upvoted</span>
                      </>
                    ) : (
                      <>
                        <i className="bi bi-arrow-up-circle-fill"></i>
                        <span>+1 Upvote</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Comments Section */}
                <div className="mt-6">
                  <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">{t('nearby.comments')} ({selectedPin.comments.length})</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto text-xs">
                    {selectedPin.comments.map((c, i) => (
                      <div key={i} className={`p-2.5 rounded-xl ${c.isOfficer ? 'bg-blue-50 text-blue-900 border border-blue-200' : 'bg-slate-100 dark:bg-slate-900 dark:text-slate-200'}`}>
                        <div className="font-bold flex items-center justify-between">
                          <span>{c.author} {c.isOfficer && '🛡️ (Officer)'}</span>
                          <span className="text-[9px] opacity-60 font-mono">{new Date(c.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                        <p className="mt-0.5 opacity-90">{c.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Add Comment Box */}
              <div className="mt-4 pt-3 border-t flex gap-2">
                <input
                  type="text"
                  value={commentInput}
                  onChange={e => setCommentInput(e.target.value)}
                  placeholder={t('nearby.addComment')}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-xs focus:outline-none dark:text-white"
                />
                <button onClick={() => handleAddComment(selectedPin)} className="px-3 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold">
                  {t('nearby.commentBtn')}
                </button>
              </div>

            </div>
          ) : (
            <div className="text-center py-20 text-slate-400">
              <i className="bi bi-pin-map text-4xl"></i>
              <p className="text-xs mt-2">Tap any pin on map to view details</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
