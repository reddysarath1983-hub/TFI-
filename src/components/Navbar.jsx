import React from 'react';
import { Film, Sparkles, PlusCircle, Search, Bookmark, Database, ShieldCheck, Flame } from 'lucide-react';

export default function Navbar({ 
  searchQuery, 
  setSearchQuery, 
  activeTab, 
  setActiveTab, 
  onOpenSubmit, 
  savedCount,
  isLiveSupabase 
}) {
  return (
    <header className="sticky top-0 z-40 w-full glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('feed')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#E5A93C] to-[#996D17] p-[1px] shadow-lg shadow-[#E5A93C]/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#09090B] rounded-[11px] flex items-center justify-center">
              <Film className="w-5 h-5 text-[#E5A93C] group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-xl font-black tracking-wider text-white group-hover:text-[#E5A93C] transition-colors">
                TFI WRITERSCLUB
              </span>
              {/* Supabase Status Badge */}
              <span className={`inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${
                isLiveSupabase 
                  ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800' 
                  : 'bg-amber-950/60 text-amber-400 border-amber-800/80'
              }`}>
                {isLiveSupabase ? (
                  <>
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    Supabase Live
                  </>
                ) : (
                  <>
                    <Database className="w-3 h-3 text-amber-400" />
                    Demo Mode
                  </>
                )}
              </span>
            </div>
            <p className="text-[11px] tracking-widest uppercase font-medium text-slate-400">
              Your Story. <span className="text-[#E5A93C]">Our Ratings.</span>
            </p>
          </div>
        </div>

        {/* Center Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search titles, heroes (e.g. Prabhas), directors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#121218] border border-[#27272A] rounded-full pl-10 pr-4 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-[#E5A93C] focus:ring-1 focus:ring-[#E5A93C] transition-all"
          />
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Feed Filter Buttons */}
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'feed'
                ? 'bg-[#E5A93C]/10 text-[#E5A93C] border border-[#E5A93C]/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Explore</span>
          </button>

          <button
            onClick={() => setActiveTab('weekly')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'weekly'
                ? 'bg-[#DC2626]/10 text-[#EF4444] border border-[#DC2626]/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-500" />
            <span className="hidden sm:inline">Top Story</span>
          </button>

          {/* Bookmarks */}
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all relative flex items-center gap-1.5 ${
              activeTab === 'bookmarks'
                ? 'bg-[#E5A93C]/10 text-[#E5A93C] border border-[#E5A93C]/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span className="hidden sm:inline">Saved</span>
            {savedCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#E5A93C] text-slate-950 font-bold text-[10px] flex items-center justify-center shadow-md">
                {savedCount}
              </span>
            )}
          </button>

          {/* Submit Story CTA */}
          <button
            onClick={onOpenSubmit}
            className="px-4 py-2 rounded-lg text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-[#F3C775] via-[#E5A93C] to-[#B87E1B] hover:opacity-95 transition-all flex items-center gap-2 shadow-lg shadow-[#E5A93C]/20 hover:scale-[1.02] active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Submit Treatment</span>
          </button>
        </div>

      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search titles, heroes, directors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#121218] border border-[#27272A] rounded-full pl-10 pr-4 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-[#E5A93C]"
          />
        </div>
      </div>
    </header>
  );
}
