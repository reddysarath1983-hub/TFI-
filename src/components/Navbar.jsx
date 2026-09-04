import React from 'react';
import { Film, Sparkles, PlusCircle, Search, Bookmark, Database, ShieldCheck, Flame, Command } from 'lucide-react';

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
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full cinema-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Editorial Title */}
          <div 
            onClick={() => setActiveTab('feed')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#E5A93C] flex items-center justify-center shadow-lg shadow-[#E5A93C]/15 group-hover:bg-[#F7D692] transition-colors duration-200 flex-shrink-0">
              <Film className="w-5 h-5 text-[#070709] font-bold group-hover:scale-110 transition-transform duration-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-base sm:text-xl font-black tracking-widest text-white group-hover:text-[#E5A93C] transition-colors">
                  TFI WRITERSCLUB
                </span>
                {/* Database Connection Badge */}
                <span className={`inline-flex items-center gap-1 text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded border ${
                  isLiveSupabase 
                    ? 'bg-emerald-950/70 text-emerald-400 border-emerald-800/80' 
                    : 'bg-amber-950/50 text-amber-400 border-amber-800/60'
                }`}>
                  {isLiveSupabase ? (
                    <>
                      <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
                      <span>LIVE DB</span>
                    </>
                  ) : (
                    <>
                      <Database className="w-2.5 h-2.5 text-amber-400" />
                      <span>DEMO</span>
                    </>
                  )}
                </span>
              </div>
              <p className="text-[10px] tracking-widest uppercase font-semibold text-slate-400">
                MOVIES • STORIES • <span className="text-[#E5A93C]">RATINGS</span>
              </p>
            </div>
          </div>

          {/* Desktop Search Input */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search treatments, heroes (e.g. Prabhas), directors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121218] border border-[#22222E] rounded-lg pl-10 pr-9 py-2 text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-[#E5A93C] focus:bg-[#161620] transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-500 border border-[#272736] px-1.5 py-0.5 rounded">
              /
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setActiveTab('feed')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'feed'
                  ? 'bg-[#E5A93C]/10 text-[#E5A93C] border border-[#E5A93C]/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40 border border-transparent'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore</span>
            </button>

            <button
              onClick={() => setActiveTab('weekly')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'weekly'
                  ? 'bg-[#DC2626]/10 text-[#EF4444] border border-[#DC2626]/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40 border border-transparent'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Top Story</span>
            </button>

            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all relative flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'bookmarks'
                  ? 'bg-[#E5A93C]/10 text-[#E5A93C] border border-[#E5A93C]/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40 border border-transparent'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saved</span>
              {savedCount > 0 && (
                <span className="w-4 h-4 rounded bg-[#E5A93C] text-[#070709] font-black text-[9px] flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Primary Action CTA */}
            <button
              onClick={onOpenSubmit}
              className="px-4 py-2 rounded-lg text-xs font-extrabold tracking-wider uppercase text-[#070709] bg-[#E5A93C] hover:bg-[#F7D692] transition-all duration-200 flex items-center gap-1.5 shadow-md shadow-[#E5A93C]/15 active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit Story</span>
            </button>
          </div>

        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 pb-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search treatments, heroes, directors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121218] border border-[#22222E] rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-[#E5A93C]"
            />
          </div>
        </div>
      </header>

      {/* Mobile Fixed Bottom App Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#070709]/95 backdrop-blur-xl border-t border-[#1C1C26] px-2 py-2 flex items-center justify-around">
        <button
          onClick={() => setActiveTab('feed')}
          className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
            activeTab === 'feed' ? 'text-[#E5A93C] font-bold' : 'text-slate-500'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-wider font-semibold">Explore</span>
        </button>

        <button
          onClick={() => setActiveTab('weekly')}
          className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
            activeTab === 'weekly' ? 'text-[#EF4444] font-bold' : 'text-slate-500'
          }`}
        >
          <Flame className="w-4 h-4 text-amber-500" />
          <span className="text-[10px] uppercase tracking-wider font-semibold">Top Story</span>
        </button>

        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg relative transition-colors ${
            activeTab === 'bookmarks' ? 'text-[#E5A93C] font-bold' : 'text-slate-500'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-wider font-semibold">Saved</span>
          {savedCount > 0 && (
            <span className="absolute top-0 right-2 w-3.5 h-3.5 rounded bg-[#E5A93C] text-[#070709] font-bold text-[9px] flex items-center justify-center">
              {savedCount}
            </span>
          )}
        </button>

        <button
          onClick={onOpenSubmit}
          className="flex flex-col items-center gap-1 px-3 py-1 rounded-lg text-[#F7D692] font-bold"
        >
          <PlusCircle className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-wider font-semibold">Submit</span>
        </button>
      </nav>
    </>
  );
}
