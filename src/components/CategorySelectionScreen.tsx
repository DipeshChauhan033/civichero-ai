import React, { useState } from 'react';
import { CategoryItem } from '../types.ts';
import { COMPLAINT_CATEGORIES } from '../data/categories.ts';

interface CategorySelectionScreenProps {
  onSelectCategory: (category: CategoryItem) => void;
}

export const CategorySelectionScreen: React.FC<CategorySelectionScreenProps> = ({ onSelectCategory }) => {
  const [search, setSearch] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('ALL');

  const groups = ['ALL', 'Sanitation', 'Water', 'Roads', 'Lighting', 'Trees', 'Pollution', 'Others'];

  const filtered = COMPLAINT_CATEGORIES.filter(c => {
    const matchGroup = selectedGroup === 'ALL' || c.group === selectedGroup;
    const matchSearch = search.trim() === '' || 
      c.name.toLowerCase().includes(search.toLowerCase()) || 
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.aiTags.some(t => t.includes(search.toLowerCase()));
    return matchGroup && matchSearch;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-15 text-9xl pointer-events-none">
          <i className="bi bi-grid-3x3-gap"></i>
        </div>
        <span className="px-3 py-1 rounded-full bg-white/15 text-xs font-bold uppercase tracking-wider text-cyan-300 backdrop-blur-md">
          🏛️ Municipal Governance Directory
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading mt-3">Explore 33 Standard Swachh Categories</h1>
        <p className="text-slate-200 text-sm mt-2 max-w-2xl">
          Designed after the official MoHUA Swachhata guidelines. Select any category below to immediately pre-fill a grievance report.
        </p>
      </div>

      {/* Filter Bar & Search Input */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <i className="bi bi-search absolute left-4 top-3.5 text-slate-400"></i>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search category (e.g. garbage, pothole, street light)..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500 transition shadow-sm dark:text-white focus:outline-none"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600">
              <i className="bi bi-x-circle-fill"></i>
            </button>
          )}
        </div>

        {/* Group Tabs */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          {groups.map(grp => (
            <button
              key={grp}
              onClick={() => setSelectedGroup(grp)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedGroup === grp
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {grp}
            </button>
          ))}
        </div>
      </div>

      {/* Category Grid (Bootstrap 5 Modern Vibrant Cards Reference) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map(cat => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory(cat)}
            className="card-box-vibrant dark:bg-slate-800 dark:border-slate-700 p-5 rounded-3xl cursor-pointer hover:border-blue-500 hover:-translate-y-1.5 transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm ${cat.bgClass} ${cat.colorClass} group-hover:scale-110 transition`}>
                <i className={`bi ${cat.icon}`}></i>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                {cat.group}
              </span>
            </div>

            <div className="mt-5">
              <h3 className="font-bold text-base text-slate-900 dark:text-white font-heading leading-snug group-hover:text-blue-600 transition">
                {cat.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                {cat.description}
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-mono truncate max-w-[140px]" title={cat.department}>
                🏛️ {cat.department.split(' ')[0]}
              </span>
              <span className="text-xs font-bold text-blue-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition flex items-center gap-1">
                <span>Report</span>
                <i className="bi bi-arrow-right"></i>
              </span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8">
          <i className="bi bi-search text-5xl text-slate-300"></i>
          <h3 className="text-lg font-bold mt-3 dark:text-white">No matching categories found</h3>
          <p className="text-sm text-slate-500 mt-1">Try searching for generic terms like "trash", "hole", or "water".</p>
          <button onClick={() => { setSearch(''); setSelectedGroup('ALL'); }} className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold">
            Reset Search Filters
          </button>
        </div>
      )}

    </div>
  );
};
