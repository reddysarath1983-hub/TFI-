import React, { useState, useEffect, useRef } from 'react';
import { X, Type, Star, Bookmark, Share2, ArrowLeft, Zap, Sparkles } from 'lucide-react';

export default function ScriptReader({ story, onClose, onOpenRate, isBookmarked, onToggleBookmark }) {
  const [fontSize, setFontSize] = useState('M'); // 'S', 'M', 'L'
  const [themeMode, setThemeMode] = useState('obsidian'); // 'obsidian', 'sepia', 'dark'
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedToast, setCopiedToast] = useState(false);
  const containerRef = useRef(null);

  // Track scroll progress inside reader modal
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const total = scrollHeight - clientHeight;
    if (total > 0) {
      const progress = Math.min(100, Math.max(0, (scrollTop / total) * 100));
      setScrollProgress(progress);
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      return () => el.removeEventListener('scroll', handleScroll);
    }
  }, []);

  if (!story) return null;

  // Font size class mapping
  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'S': return 'text-xs sm:text-sm leading-relaxed';
      case 'L': return 'text-base sm:text-xl leading-loose';
      case 'M':
      default: return 'text-sm sm:text-lg leading-relaxed';
    }
  };

  // Theme paper class mapping
  const getThemeClass = () => {
    switch (themeMode) {
      case 'sepia': return 'screenplay-paper-sepia text-[#E6D8C6]';
      case 'dark': return 'screenplay-paper-dark text-slate-300';
      case 'obsidian':
      default: return 'screenplay-paper text-[#E4E4E8]';
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070709]/95 backdrop-blur-xl flex flex-col justify-between overflow-hidden animate-fadeIn">
      
      {/* Reading Progress Indicator */}
      <div className="w-full h-1 bg-[#16161E] relative z-50">
        <div 
          className="h-full bg-[#E5A93C] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Top Toolbar */}
      <header className="w-full cinema-nav px-4 sm:px-8 py-3.5 flex items-center justify-between gap-3 z-40">
        
        {/* Left: Back & Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#121218] border border-[#22222E] hover:border-[#E5A93C] text-slate-300 hover:text-white transition-colors cursor-pointer flex-shrink-0"
            title="Close Reader"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <div className="min-w-0">
            <h2 className="font-cinzel text-xs sm:text-base font-bold text-white truncate max-w-[160px] xs:max-w-[220px] sm:max-w-md">
              {story.title}
            </h2>
            <p className="text-[10px] sm:text-xs text-slate-400 truncate font-medium">
              {story.genre} • Dream Hero: <span className="text-[#E5A93C] font-semibold">{story.dream_cast?.hero}</span>
            </p>
          </div>
        </div>

        {/* Right: Reader Controls */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          
          {/* Font Size Selector */}
          <div className="flex items-center bg-[#121218] border border-[#22222E] rounded-lg p-1 text-[11px] font-bold">
            {['S', 'M', 'L'].map(size => (
              <button
                key={size}
                onClick={() => setFontSize(size)}
                className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded transition-colors cursor-pointer ${
                  fontSize === size
                    ? 'bg-[#E5A93C] text-[#070709] font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Theme Selector */}
          <div className="hidden sm:flex items-center bg-[#121218] border border-[#22222E] rounded-lg p-1 text-[11px]">
            <button
              onClick={() => setThemeMode('obsidian')}
              className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer ${
                themeMode === 'obsidian' ? 'bg-[#E5A93C]/20 text-[#E5A93C] border border-[#E5A93C]/40' : 'text-slate-400'
              }`}
            >
              Obsidian
            </button>
            <button
              onClick={() => setThemeMode('sepia')}
              className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer ${
                themeMode === 'sepia' ? 'bg-[#E6D8C6]/20 text-[#E6D8C6] border border-[#E6D8C6]/40' : 'text-slate-400'
              }`}
            >
              Sepia
            </button>
          </div>

          {/* Bookmark */}
          <button
            onClick={() => onToggleBookmark(story.id)}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-[#E5A93C] text-[#070709] border-[#E5A93C]'
                : 'bg-[#121218] border-[#22222E] text-slate-300 hover:text-white'
            }`}
            title="Bookmark Story"
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="p-2 rounded-lg bg-[#121218] border border-[#22222E] text-slate-300 hover:text-white transition-colors cursor-pointer relative"
            title="Share Link"
          >
            <Share2 className="w-4 h-4" />
            {copiedToast && (
              <span className="absolute -bottom-8 right-0 px-2 py-1 bg-[#E5A93C] text-[#070709] font-extrabold text-[10px] rounded shadow-lg whitespace-nowrap z-50 uppercase tracking-wider">
                Link Copied!
              </span>
            )}
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-red-950/40 border border-red-800/50 text-red-400 hover:bg-red-900/50 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

        </div>
      </header>

      {/* Main Screenplay Container */}
      <main 
        ref={containerRef}
        className={`flex-1 overflow-y-auto px-4 py-8 sm:p-12 lg:p-16 ${getThemeClass()}`}
      >
        <div className="max-w-3xl mx-auto space-y-8 pb-16">
          
          {/* Header Card */}
          <div className="text-center pb-8 border-b border-[#22222E] space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#E5A93C]/10 border border-[#E5A93C]/30 text-[#E5A93C] text-[10px] sm:text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              TFI Screenplay Format
            </div>

            <h1 className="font-cinzel text-3xl sm:text-5xl font-black tracking-wide text-white">
              {story.title}
            </h1>

            {story.tagline && (
              <p className="font-serif-title italic text-slate-400 text-base sm:text-xl">
                "{story.tagline}"
              </p>
            )}

            <div className="pt-2 flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-xs text-slate-400 font-medium">
              <span>Author: <strong className="text-white">{story.author_name}</strong></span>
              <span>•</span>
              <span>Genre: <strong className="text-[#E5A93C]">{story.genre}</strong></span>
              <span>•</span>
              <span>Rating: <strong className="text-white">{story.scores?.overall}/10</strong></span>
            </div>

            {/* Dream Cast Banner */}
            <div className="mt-4 p-4 rounded-xl bg-[#070709]/80 border border-[#22222E] grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest block">Dream Hero</span>
                <p className="text-xs sm:text-sm font-bold text-white mt-0.5">{story.dream_cast?.hero}</p>
                {story.dream_cast?.hero_role && (
                  <span className="text-[10px] text-[#E5A93C] block">{story.dream_cast.hero_role}</span>
                )}
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest block">Dream Director</span>
                <p className="text-xs sm:text-sm font-bold text-white mt-0.5">{story.dream_cast?.director}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest block">Dream Music</span>
                <p className="text-xs sm:text-sm font-bold text-white mt-0.5">{story.dream_cast?.music}</p>
              </div>
            </div>
          </div>

          {/* Formatted Script Body */}
          <div className={`font-script whitespace-pre-wrap ${getFontSizeClass()} space-y-5 pt-2`}>
            {story.full_script.split('\n').map((line, idx) => {
              if (line.includes('INTERVAL BANG') || line.includes('ACT 2:') || line.includes('TITLE CARD')) {
                return (
                  <div key={idx} className="my-6 p-4 rounded-lg bg-[#E5A93C]/10 border-l-4 border-[#E5A93C] font-sans">
                    <span className="font-bold text-[#E5A93C] uppercase text-xs sm:text-sm tracking-wider flex items-center gap-2">
                      <Zap className="w-4 h-4 flex-shrink-0" />
                      {line}
                    </span>
                  </div>
                );
              }
              if (line.startsWith('SCENE') || line.startsWith('EXT.') || line.startsWith('INT.')) {
                return (
                  <div key={idx} className="pt-4 font-bold text-[#E5A93C] uppercase tracking-wider text-xs sm:text-base border-b border-[#22222E]/60 pb-1">
                    {line}
                  </div>
                );
              }
              if (line.trim() === line.trim().toUpperCase() && line.trim().length > 3 && line.trim().length < 30 && !line.includes('===') && !line.includes('---')) {
                return (
                  <div key={idx} className="pt-2 font-bold text-white tracking-widest text-center">
                    {line}
                  </div>
                );
              }

              return <p key={idx} className="leading-relaxed opacity-90">{line}</p>;
            })}
          </div>

          {/* Bottom Floating Rating CTA */}
          <div className="mt-12 p-8 rounded-xl cinema-panel border border-[#E5A93C]/30 text-center space-y-4">
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
              Finished Reading {story.title}?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto">
              Cast your vote on Story Concept, Screenplay Pacing, and Mass Elevation Value!
            </p>
            <button
              onClick={() => {
                onClose();
                onOpenRate(story);
              }}
              className="px-6 py-3 rounded-lg font-extrabold uppercase tracking-wider text-[#070709] bg-[#E5A93C] hover:bg-[#F7D692] shadow-lg shadow-[#E5A93C]/15 transition-all inline-flex items-center gap-2 text-xs sm:text-sm cursor-pointer"
            >
              <Star className="w-4 h-4 fill-[#070709]" />
              <span>Submit Your Fan Rating</span>
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
