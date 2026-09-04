import React from 'react';
import { Sparkles, PlusCircle, Search, Bookmark, Database, ShieldCheck, Flame, Home, BarChart2, User, PenTool } from 'lucide-react';

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
      {/* Floating Rounded Navbar Shell */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 sm:pt-5">
        <nav className="max-w-[1080px] mx-auto flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-[#0f0d0b]/70 backdrop-blur-xl border border-[rgba(244,238,227,0.12)] rounded-full transition-all duration-300 shadow-2xl">
          
          {/* Logo & Brand Mark */}
          <div 
            onClick={() => setActiveTab('feed')}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer pl-2 group"
          >
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#e14418] shadow-[0_0_12px_rgba(225,68,24,0.7)] rotate-45 group-hover:scale-125 transition-transform duration-200" />
            <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-[#f4efe4] group-hover:text-[#ff6a35] transition-colors">
              KATHA
            </span>
            <span className="hidden lg:inline-block font-telugu text-xs text-[#b8ac9a] ml-1">
              నీ కథ. మన తీర్పు.
            </span>
            {/* DB Status Badge */}
            <span className={`hidden xs:inline-flex items-center gap-1 text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full border ${
              isLiveSupabase 
                ? 'bg-emerald-950/70 text-emerald-400 border-emerald-800/80' 
                : 'bg-amber-950/50 text-amber-400 border-amber-800/60'
            }`}>
              {isLiveSupabase ? (
                <>
                  <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
                  <span>LIVE</span>
                </>
              ) : (
                <>
                  <Database className="w-2.5 h-2.5 text-amber-400" />
                  <span>DEMO</span>
                </>
              )}
            </span>
          </div>

          {/* Center Links (Desktop) */}
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <button
              onClick={() => setActiveTab('feed')}
              className={`transition-colors cursor-pointer ${
                activeTab === 'feed' ? 'text-[#f4efe4] font-bold' : 'text-[#b8ac9a] hover:text-[#f4efe4]'
              }`}
            >
              Stories
            </button>
            <button
              onClick={() => setActiveTab('weekly')}
              className={`transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'weekly' ? 'text-[#ff6a35] font-bold' : 'text-[#b8ac9a] hover:text-[#f4efe4]'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-[#ff6a35]" />
              <span>Trending</span>
            </button>
            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'bookmarks' ? 'text-[#f4efe4] font-bold' : 'text-[#b8ac9a] hover:text-[#f4efe4]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saved ({savedCount})</span>
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Input (Desktop) */}
            <div className="hidden sm:flex relative items-center">
              <Search className="w-3.5 h-3.5 absolute left-3 text-[#7d7364]" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#1e1a15] border border-[rgba(244,238,227,0.12)] rounded-full pl-8 pr-3 py-1.5 text-xs text-[#f4efe4] placeholder:text-[#7d7364] focus:outline-none focus:border-[#ff6a35] transition-all w-32 focus:w-48"
              />
            </div>

            {/* Write Story Button */}
            <button
              onClick={onOpenSubmit}
              className="flex items-center gap-2 bg-gradient-to-r from-[#ff6a35] to-[#e14418] text-[#fff5ee] font-semibold text-xs sm:text-sm px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full shadow-lg shadow-[#e14418]/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <PenTool className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Write your story</span>
            </button>

            {/* User Avatar Button */}
            <button 
              onClick={() => setActiveTab('bookmarks')}
              className="w-9 h-9 rounded-full bg-[#272119] border border-[rgba(244,238,227,0.14)] text-[#b8ac9a] font-bold text-xs flex items-center justify-center hover:text-white transition-colors cursor-pointer"
              title="Saved Stories"
            >
              S
            </button>
          </div>

        </nav>
      </div>


      {/* Fixed Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-3 left-3 right-3 z-50 bg-[#0f0d0b]/90 backdrop-blur-xl border border-[rgba(244,238,227,0.14)] rounded-full px-5 py-2.5 flex items-center justify-around shadow-2xl">
        <button
          onClick={() => setActiveTab('feed')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold tracking-wider ${
            activeTab === 'feed' ? 'text-[#ff6a35]' : 'text-[#7d7364]'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setActiveTab('weekly')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold tracking-wider ${
            activeTab === 'weekly' ? 'text-[#ff6a35]' : 'text-[#7d7364]'
          }`}
        >
          <Flame className="w-5 h-5 text-[#ff6a35]" />
          <span>Trending</span>
        </button>

        <button
          onClick={onOpenSubmit}
          className="flex flex-col items-center gap-0.5 text-[10px] font-bold tracking-wider text-[#ff6a35]"
        >
          <PenTool className="w-5 h-5" />
          <span>Write</span>
        </button>

        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold tracking-wider relative ${
            activeTab === 'bookmarks' ? 'text-[#ff6a35]' : 'text-[#7d7364]'
          }`}
        >
          <Bookmark className="w-5 h-5" />
          <span>Saved</span>
          {savedCount > 0 && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#ff6a35] text-[#0a0908] font-bold text-[9px] flex items-center justify-center">
              {savedCount}
            </span>
          )}
        </button>
      </nav>
    </>
  );
}
