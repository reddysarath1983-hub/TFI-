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
      case 'sepia': return 'screenplay-paper-sepia text-[#E6D7C3]';
      case 'dark': return 'screenplay-paper-dark text-slate-300';
      case 'obsidian':
      default: return 'screenplay-paper text-slate-200';
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex flex-col justify-between overflow-hidden animate-fadeIn">
      
      {/* Top Reading Progress Bar */}
      <div className="w-full h-1 bg-[#181820] relative z-50">
        <div 
          className="h-full bg-gradient-to-r from-amber-500 via-[#E5A93C] to-red-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Top Toolbar */}
      <header className="w-full glass-nav px-3 sm:px-8 py-3 flex items-center justify-between gap-2 sm:gap-4 z-40 border-b border-[#27272A]">
        
        {/* Left: Back button & Title */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#121218] border border-[#27272A] hover:border-[#E5A93C] text-slate-300 hover:text-white transition-colors cursor-pointer flex-shrink-0"
            title="Close Reader"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <div className="min-w-0">
            <h2 className="font-cinzel text-xs sm:text-base font-bold text-white truncate max-w-[140px] xs:max-w-[200px] sm:max-w-md">
              {story.title}
            </h2>
            <p className="text-[10px] sm:text-xs text-slate-400 truncate">
              {story.genre} • <span className="text-[#E5A93C] font-semibold">{story.dream_cast?.hero}</span>
            </p>
          </div>
        </div>

        {/* Right: Controls (Font Sizing, Theme, Actions) */}
        <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
          
          {/* Font Size Toggle */}
          <div className="flex items-center bg-[#121218] border border-[#27272A] rounded-lg p-0.5 sm:p-1 text-[11px] font-bold">
            {['S', 'M', 'L'].map(size => (
              <button
                key={size}
                onClick={() => setFontSize(size)}
                className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded transition-colors cursor-pointer ${
                  fontSize === size
                    ? 'bg-[#E5A93C] text-slate-950 font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Theme Selector */}
          <div className="hidden xs:flex items-center bg-[#121218] border border-[#27272A] rounded-lg p-0.5 sm:p-1 text-[11px]">
            <button
              onClick={() => setThemeMode('obsidian')}
              className={`px-2 py-0.5 sm:py-1 rounded font-medium transition-colors cursor-pointer ${
                themeMode === 'obsidian' ? 'bg-[#E5A93C]/20 text-[#E5A93C] border border-[#E5A93C]/40' : 'text-slate-400'
              }`}
            >
              Obsidian
            </button>
            <button
              onClick={() => setThemeMode('sepia')}
              className={`px-2 py-0.5 sm:py-1 rounded font-medium transition-colors cursor-pointer ${
                themeMode === 'sepia' ? 'bg-[#E6D7C3]/20 text-[#E6D7C3] border border-[#E6D7C3]/40' : 'text-slate-400'
              }`}
            >
              Sepia
            </button>
          </div>

          {/* Bookmark Toggle */}
          <button
            onClick={() => onToggleBookmark(story.id)}
            className={`p-1.5 sm:p-2 rounded-xl border transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-[#E5A93C] text-slate-950 border-[#E5A93C]'
                : 'bg-[#121218] border-[#27272A] text-slate-300 hover:text-white'
            }`}
            title="Bookmark Story"
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>

          {/* Share Link */}
          <button
            onClick={handleShare}
            className="p-1.5 sm:p-2 rounded-xl bg-[#121218] border border-[#27272A] text-slate-300 hover:text-white transition-colors cursor-pointer relative"
            title="Share Script Link"
          >
            <Share2 className="w-4 h-4" />
            {copiedToast && (
              <span className="absolute -bottom-8 right-0 px-2 py-1 bg-[#E5A93C] text-slate-950 font-bold text-[10px] rounded shadow-lg whitespace-nowrap z-50">
                Link Copied!
              </span>
            )}
          </button>

          {/* Close Reader */}
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl bg-[#DC2626]/20 border border-[#DC2626]/40 text-red-400 hover:bg-[#DC2626]/40 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

        </div>
      </header>

      {/* Main Reader Scroll Container */}
      <main 
        ref={containerRef}
        className={`flex-1 overflow-y-auto px-4 py-6 sm:p-10 lg:p-16 ${getThemeClass()}`}
      >
        <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 pb-16">
          
          {/* Header Card */}
          <div className="text-center pb-6 border-b border-[#27272A] space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5A93C]/10 border border-[#E5A93C]/30 text-[#E5A93C] text-[10px] sm:text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              TFI Official Screenplay Format
            </div>

            <h1 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-black tracking-wide text-white">
              {story.title}
            </h1>

            {story.tagline && (
              <p className="font-serif-title italic text-slate-400 text-sm sm:text-lg">
                "{story.tagline}"
              </p>
            )}

            <div className="pt-2 flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-xs text-slate-400 font-medium">
              <span>Author: <strong className="text-white">{story.author_name}</strong></span>
              <span>•</span>
              <span>Genre: <strong className="text-[#E5A93C]">{story.genre}</strong></span>
              <span>•</span>
              <span>Score: <strong className="text-white">{story.scores?.overall}/10</strong></span>
            </div>

            {/* Dream Cast Banner */}
            <div className="mt-4 p-3.5 sm:p-4 rounded-xl bg-[#09090B]/60 border border-[#27272A] grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Dream Hero</span>
                <p className="text-xs sm:text-sm font-bold text-white">{story.dream_cast?.hero}</p>
                {story.dream_cast?.hero_role && (
                  <span className="text-[10px] text-[#E5A93C]">{story.dream_cast.hero_role}</span>
                )}
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Dream Director</span>
                <p className="text-xs sm:text-sm font-bold text-white">{story.dream_cast?.director}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Dream Music</span>
                <p className="text-xs sm:text-sm font-bold text-white">{story.dream_cast?.music}</p>
              </div>
            </div>
          </div>

          {/* Formatted Script Body */}
          <div className={`font-script whitespace-pre-wrap ${getFontSizeClass()} space-y-5 pt-2`}>
            {story.full_script.split('\n').map((line, idx) => {
              if (line.includes('INTERVAL BANG') || line.includes('ACT 2:') || line.includes('TITLE CARD')) {
                return (
                  <div key={idx} className="my-5 p-3.5 sm:p-4 rounded-xl bg-[#E5A93C]/10 border-l-4 border-[#E5A93C] font-sans">
                    <span className="font-bold text-[#E5A93C] uppercase text-xs sm:text-sm tracking-wider flex items-center gap-2">
                      <Zap className="w-4 h-4 flex-shrink-0" />
                      {line}
                    </span>
                  </div>
                );
              }
              if (line.startsWith('SCENE') || line.startsWith('EXT.') || line.startsWith('INT.')) {
                return (
                  <div key={idx} className="pt-3 font-bold text-[#E5A93C] uppercase tracking-wider text-xs sm:text-base border-b border-[#27272A]/50 pb-1">
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

          {/* Bottom Floating Rating Callout */}
          <div className="mt-8 sm:mt-12 p-6 sm:p-8 rounded-2xl glass-panel-gold border border-[#E5A93C]/40 text-center space-y-3">
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
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-[#F3C775] via-[#E5A93C] to-[#B87E1B] shadow-xl shadow-[#E5A93C]/20 hover:scale-105 transition-all inline-flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
            >
              <Star className="w-4 h-4 fill-slate-950" />
              <span>Submit Your Fan Rating</span>
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
