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
    <>
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('feed')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#E5A93C] to-[#996D17] p-[1px] shadow-lg shadow-[#E5A93C]/20 group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
              <div className="w-full h-full bg-[#09090B] rounded-[11px] flex items-center justify-center">
                <Film className="w-4 h-4 sm:w-5 sm:h-5 text-[#E5A93C] group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-cinzel text-base sm:text-xl font-black tracking-wider text-white group-hover:text-[#E5A93C] transition-colors">
                  TFI WRITERSCLUB
                </span>
                {/* Supabase Status Badge */}
                <span className={`inline-flex items-center gap-1 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full border ${
                  isLiveSupabase 
                    ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800' 
                    : 'bg-amber-950/60 text-amber-400 border-amber-800/80'
                }`}>
                  {isLiveSupabase ? (
                    <>
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span className="hidden xs:inline">Supabase Live</span>
                      <span className="xs:hidden">Live</span>
                    </>
                  ) : (
                    <>
                      <Database className="w-3 h-3 text-amber-400" />
                      <span className="hidden xs:inline">Demo Mode</span>
                      <span className="xs:hidden">Demo</span>
                    </>
                  )}
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] tracking-widest uppercase font-medium text-slate-400 leading-tight">
                Your Story. <span className="text-[#E5A93C]">Our Ratings.</span>
              </p>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search titles, heroes (e.g. Prabhas), directors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121218] border border-[#27272A] rounded-full pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-[#E5A93C] transition-all"
            />
          </div>

          {/* Desktop Nav Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setActiveTab('feed')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
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
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'weekly'
                  ? 'bg-[#DC2626]/10 text-[#EF4444] border border-[#DC2626]/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Top Story</span>
            </button>

            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all relative flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'bookmarks'
                  ? 'bg-[#E5A93C]/10 text-[#E5A93C] border border-[#E5A93C]/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Saved</span>
              {savedCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#E5A93C] text-slate-950 font-black text-[9px] flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenSubmit}
              className="px-4 py-2 rounded-lg text-xs font-extrabold text-slate-950 bg-gradient-to-r from-[#F3C775] via-[#E5A93C] to-[#B87E1B] hover:opacity-95 transition-all flex items-center gap-1.5 shadow-lg shadow-[#E5A93C]/20 active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit Treatment</span>
            </button>
          </div>

        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 pb-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search titles, heroes, directors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121218] border border-[#27272A] rounded-full pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-[#E5A93C]"
            />
          </div>
        </div>
      </header>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#09090B]/95 backdrop-blur-xl border-t border-[#27272A] px-2 py-2 flex items-center justify-around shadow-2xl">
        <button
          onClick={() => setActiveTab('feed')}
          className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
            activeTab === 'feed' ? 'text-[#E5A93C] font-bold' : 'text-slate-400'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px]">Explore</span>
        </button>

        <button
          onClick={() => setActiveTab('weekly')}
          className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
            activeTab === 'weekly' ? 'text-[#EF4444] font-bold' : 'text-slate-400'
          }`}
        >
          <Flame className="w-5 h-5 text-amber-500" />
          <span className="text-[10px]">Top Story</span>
        </button>

        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl relative transition-all ${
            activeTab === 'bookmarks' ? 'text-[#E5A93C] font-bold' : 'text-slate-400'
          }`}
        >
          <Bookmark className="w-5 h-5" />
          <span className="text-[10px]">Saved</span>
          {savedCount > 0 && (
            <span className="absolute top-1 right-2 w-4 h-4 rounded-full bg-[#E5A93C] text-slate-950 font-bold text-[9px] flex items-center justify-center">
              {savedCount}
            </span>
          )}
        </button>

        <button
          onClick={onOpenSubmit}
          className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-[#F3C775] font-bold"
        >
          <PlusCircle className="w-5 h-5" />
          <span className="text-[10px]">Submit</span>
        </button>
      </nav>
    </>
  );
}
