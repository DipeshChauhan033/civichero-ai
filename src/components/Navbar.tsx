import React, { useState } from 'react';
import { UserProfile, NotificationItem } from '../types.ts';
import { useLanguage, Language } from '../context/LanguageContext.tsx';

interface NavbarProps {
  user: UserProfile | null;
  currentTab: string;
  onTabChange: (tab: string) => void;
  onOpenLogin: () => void;
  onLogout: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  notifications?: NotificationItem[];
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  currentTab,
  onTabChange,
  onOpenLogin,
  onLogout,
  darkMode,
  onToggleDarkMode,
  notifications = []
}) => {
  const { lang, setLang, t } = useLanguage();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [navMenuOpen, setNavMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: t('nav.explore'), icon: 'bi-grid-1x2-fill' },
    { id: 'post', label: t('nav.report'), icon: 'bi-plus-circle-fill', highlight: true },
    { id: 'categories', label: 'Categories', icon: 'bi-grid-3x3-gap-fill' },
    { id: 'my-complaints', label: t('nav.complaints'), icon: 'bi-card-list' },
    { id: 'nearby', label: t('nav.nearby'), icon: 'bi-geo-alt-fill' },
    { id: 'leaderboard', label: t('nav.leaderboard'), icon: 'bi-trophy-fill' },
    { id: 'officer-portal', label: 'Officer Portal', icon: 'bi-shield-shaded', officer: true },
    { id: 'admin-panel', label: 'Admin Panel', icon: 'bi-gear-wide-connected', admin: true },
  ];

  const currentNavItem = navItems.find(item => item.id === currentTab);

  return (
    <header className="sticky top-0 z-40 bg-blue-600 dark:bg-slate-900 text-white shadow-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between min-h-[56px] sm:min-h-[64px] py-1.5 sm:py-0 gap-2 sm:gap-4">
          
          {/* Left: Brand & Unified Nav Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-6 min-w-0">
            {/* Logo */}
            <div className="flex items-center gap-1.5 sm:gap-2 cursor-pointer shrink-0" onClick={() => onTabChange('dashboard')}>
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 via-slate-100 to-orange-500 p-[1.5px] flex items-center justify-center shadow">
                <div className="w-full h-full bg-blue-600 dark:bg-slate-900 rounded-[10px] flex items-center justify-center text-xs text-white">
                  <i className="bi bi-shield-fill-check"></i>
                </div>
              </div>
              <div className="font-extrabold text-sm sm:text-xl tracking-tight text-white flex items-center gap-0.5 sm:gap-1 font-heading">
                <span className="hidden sm:inline">CivicHero</span>
                <span className="sm:hidden font-black tracking-tighter">CH</span>
                <span className="text-blue-200 dark:text-blue-400 font-normal text-[10px] sm:text-sm bg-white/20 dark:bg-blue-900/50 px-1 sm:px-1.5 py-0.5 rounded ml-0.5 sm:ml-1">AI</span>
              </div>
            </div>

            {/* Unified Toggle Dropdown Button for All Navigation */}
            <div className="relative shrink-0">
              <button
                onClick={() => setNavMenuOpen(!navMenuOpen)}
                className="px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 text-white border border-white/20 font-bold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 shadow-sm backdrop-blur transition duration-150"
              >
                <i className={`bi ${currentNavItem?.icon || 'bi-grid-3x3-gap-fill'} text-blue-200 text-xs sm:text-sm`}></i>
                <span className="truncate max-w-[85px] sm:max-w-[140px] md:max-w-none">{currentNavItem?.label || 'Menu'}</span>
                <i className={`bi bi-chevron-down text-[9px] sm:text-[10px] transition-transform duration-200 ${navMenuOpen ? 'rotate-180' : ''}`}></i>
              </button>

              {/* Navigation Dropdown Menu */}
              {navMenuOpen && (
                <div className="absolute left-0 mt-2 w-64 max-w-[90vw] bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 py-2 px-1.5 z-50 animate-fadeIn">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Navigation</span>
                    <span className="text-[9px] bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-500 dark:text-slate-300 font-mono">Enterprise</span>
                  </div>
                  <div className="space-y-1 mt-1 max-h-[70vh] overflow-y-auto">
                    {navItems.map(item => {
                      const isOfficerOrAdmin = user && (user.role === 'OFFICER' || user.role === 'SUPERVISOR' || user.role === 'ADMIN');
                      const isCitizenOnly = !item.officer && !item.admin;

                      if (isOfficerOrAdmin && isCitizenOnly) return null;

                      if (item.officer && (!user || (user.role !== 'OFFICER' && user.role !== 'SUPERVISOR' && user.role !== 'ADMIN'))) return null;
                      if (item.admin && (!user || user.role !== 'ADMIN')) return null;

                      const active = currentTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            onTabChange(item.id);
                            setNavMenuOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-between transition ${
                            active
                              ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                              : 'hover:bg-slate-100 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200 font-medium'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <i className={`bi ${item.icon} text-sm ${active ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`}></i>
                            <span>{item.label}</span>
                          </div>
                          {item.highlight && !active && (
                            <span className="px-1.5 py-0.5 text-[10px] bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 rounded font-bold">
                              Report
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-wrap ml-auto">
            
            {/* Language Dropdown */}
            <div className="relative block shrink-0">
              <select
                value={lang}
                onChange={e => setLang(e.target.value as Language)}
                className="bg-white/10 dark:bg-slate-800 border border-white/20 dark:border-slate-700 text-white dark:text-slate-200 rounded-lg px-2 sm:px-2.5 py-1.5 text-xs font-medium cursor-pointer focus:outline-none backdrop-blur hover:bg-white/20 transition"
              >
                <option value="English" className="text-slate-800 dark:text-slate-200">🌐 EN</option>
                <option value="Hindi" className="text-slate-800 dark:text-slate-200">🌐 हिन्दी</option>
                <option value="Marathi" className="text-slate-800 dark:text-slate-200">🌐 मराठी</option>
                <option value="Gujarati" className="text-slate-800 dark:text-slate-200">🌐 ગુજરાતી</option>
              </select>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-xl bg-white/10 dark:bg-slate-800 text-white dark:text-amber-400 flex items-center justify-center hover:bg-white/20 dark:hover:bg-slate-700 border border-white/20 dark:border-slate-700 transition"
              title="Toggle Dark Mode"
            >
              <i className={`bi ${darkMode ? 'bi-sun-fill text-amber-400' : 'bi-moon-stars-fill text-white'}`}></i>
            </button>

            {/* Notification Bell */}
            <div className="relative shrink-0">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/10 dark:bg-slate-800 text-white dark:text-slate-200 flex items-center justify-center hover:bg-white/20 dark:hover:bg-slate-700 border border-white/20 dark:border-slate-700 transition relative"
              >
                <i className="bi bi-bell-fill"></i>
                {notifications.length > 0 && (
                  <>
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-red-500"></span>
                  </>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 max-w-[90vw] bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 p-4 z-50 animate-fadeIn">
                  <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100 dark:border-slate-700">
                    <h4 className="font-bold text-sm dark:text-white flex items-center gap-2">
                      <i className="bi bi-bell text-blue-600"></i>
                      <span>Recent Notifications</span>
                    </h4>
                    {notifications.length > 0 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold">{notifications.length} Active</span>
                    )}
                  </div>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="text-center py-6 text-slate-400 dark:text-slate-500">
                        <i className="bi bi-bell-slash text-2xl block mb-1"></i>
                        <span className="text-xs">No new notifications</span>
                      </div>
                    ) : (
                      notifications.map((notif) => {
                        let bgClass = 'bg-blue-50 dark:bg-blue-950/40 border-blue-100 dark:border-blue-900';
                        let textClass = 'text-blue-950 dark:text-blue-300';
                        if (notif.type === 'COMPLETED') {
                          bgClass = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900';
                          textClass = 'text-emerald-950 dark:text-emerald-300';
                        } else if (notif.type === 'REJECTED') {
                          bgClass = 'bg-red-50 dark:bg-red-950/40 border-red-100 dark:border-red-900';
                          textClass = 'text-red-950 dark:text-red-300';
                        } else if (notif.type === 'IN_PROGRESS' || notif.type === 'ACCEPTED') {
                          bgClass = 'bg-amber-50 dark:bg-amber-950/40 border-amber-100 dark:border-amber-900';
                          textClass = 'text-amber-950 dark:text-amber-300';
                        }

                        return (
                          <div key={notif.id} className={`p-2.5 rounded-xl border text-xs ${bgClass}`}>
                            <div className={`font-bold ${textClass}`}>{notif.title}</div>
                            <p className="text-slate-600 dark:text-slate-300 mt-0.5">{notif.description}</p>
                            <span className="text-[10px] text-slate-400 mt-1 block font-mono">{notif.time}</span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile / Login Button */}
            {user ? (
              <div className="relative shrink-0">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-1.5 sm:gap-2 pl-1.5 pr-2 sm:pr-2.5 py-1 sm:py-1.5 rounded-xl bg-white/10 dark:bg-slate-800 hover:bg-white/20 dark:hover:bg-slate-700 transition border border-white/20 dark:border-slate-700"
                >
                  <img
                    src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                    alt="Avatar"
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-blue-500 object-cover shrink-0"
                  />
                  <span className="font-semibold text-xs text-white dark:text-slate-200 max-w-[80px] truncate hidden md:inline">
                    {user.name.split(' ')[0]}
                  </span>
                  <i className="bi bi-chevron-down text-[10px] text-blue-200"></i>
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-64 max-w-[90vw] bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 p-3 z-50 animate-fadeIn">
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl mb-2 text-center">
                      <img src={user.avatar} alt="Avatar" className="w-12 h-12 rounded-full mx-auto mb-2 bg-blue-100" />
                      <div className="font-bold text-sm dark:text-white">{user.name}</div>
                      <div className="text-xs text-slate-500 font-mono">+91 {user.mobile}</div>
                      <div className="mt-2 inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-bold">
                        <i className="bi bi-star-fill text-amber-500"></i>
                        <span>{user.rewardPoints} Civic Points</span>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs">
                      <button
                        onClick={() => { onTabChange('profile'); setShowProfileMenu(false); }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 dark:text-slate-200 flex items-center gap-2"
                      >
                        <i className="bi bi-person text-slate-400"></i>
                        <span>My Profile Settings</span>
                      </button>
                      {user.role === 'CITIZEN' && (
                        <button
                          onClick={() => { onTabChange('my-complaints'); setShowProfileMenu(false); }}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 dark:text-slate-200 flex items-center gap-2"
                        >
                          <i className="bi bi-card-list text-slate-400"></i>
                          <span>My Complaints ({user.resolvedCount} Resolved)</span>
                        </button>
                      )}
                      {(user.role === 'OFFICER' || user.role === 'SUPERVISOR') && (
                        <button
                          onClick={() => { onTabChange('officer-portal'); setShowProfileMenu(false); }}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 dark:text-slate-200 flex items-center gap-2"
                        >
                          <i className="bi bi-shield-shaded text-slate-400"></i>
                          <span>My Officer Tasks ({user.resolvedCount} Resolved)</span>
                        </button>
                      )}
                      {user.role === 'ADMIN' && (
                        <button
                          onClick={() => { onTabChange('admin-panel'); setShowProfileMenu(false); }}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 dark:text-slate-200 flex items-center gap-2"
                        >
                          <i className="bi bi-gear-wide-connected text-slate-400"></i>
                          <span>Admin Control Center</span>
                        </button>
                      )}
                      <div className="border-t border-slate-100 dark:border-slate-700 my-1"></div>
                      <button
                        onClick={() => { onLogout(); setShowProfileMenu(false); }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 font-semibold flex items-center gap-2"
                      >
                        <i className="bi bi-box-arrow-right"></i>
                        <span>{t('btn.logout')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                <button
                  onClick={onOpenLogin}
                  className="px-2 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs shadow-md transition flex items-center gap-1 sm:gap-1.5"
                >
                  <i className="bi bi-person-badge-fill"></i>
                  <span className="hidden md:inline">{t('btn.requester')}</span>
                  <span className="md:hidden">Login</span>
                </button>
                <button
                  onClick={() => onTabChange('officer-portal')}
                  className="px-2 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white border border-white/30 font-bold text-xs shadow-md transition flex items-center gap-1 sm:gap-1.5"
                >
                  <i className="bi bi-shield-lock-fill"></i>
                  <span className="hidden md:inline">{t('btn.solver')}</span>
                  <span className="md:hidden">Solver</span>
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </header>
  );
};
