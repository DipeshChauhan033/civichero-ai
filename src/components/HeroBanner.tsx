import React from 'react';
import { UserProfile } from '../types.ts';
import { useLanguage } from '../context/LanguageContext.tsx';

interface HeroBannerProps {
  user: UserProfile | null;
  onPostClick: () => void;
  onExploreNearby: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ user, onPostClick, onExploreNearby }) => {
  const { t } = useLanguage();
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white p-6 sm:p-10 lg:p-14 shadow-2xl border border-white/10 mb-8 animate-fadeIn">
      
      {/* Background Smart City Ambient Image Collage Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay flex grid grid-cols-3 gap-1">
        <img src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Smart City" />
        <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Green Governance" />
        <img src="https://images.unsplash.com/photo-1519999482648-25049ddd37b1?w=800&auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Clean Roads" />
      </div>

      {/* Decorative Glowing Orbs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-3xl">
        
        {/* Welcome Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wide uppercase mb-6 text-cyan-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{t('hero.badge')}</span>
        </div>

        {/* Display Welcome User Name */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight leading-tight">
          {t('hero.title')}
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
          {t('hero.sub')}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={onPostClick}
            className="px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 active:scale-95 text-white font-bold text-sm sm:text-base shadow-xl shadow-blue-500/30 transition duration-200 flex items-center gap-3 font-heading"
          >
            <i className="bi bi-camera-fill text-lg animate-bounce"></i>
            <span>{t('hero.cta')}</span>
          </button>

          <button
            onClick={onExploreNearby}
            className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-semibold text-sm sm:text-base backdrop-blur-md border border-white/20 transition duration-200 flex items-center gap-2"
          >
            <i className="bi bi-map"></i>
            <span>{t('nav.nearby')}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
