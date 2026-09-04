import React from 'react';
import { Trophy, Star, BookOpen, User, Clapperboard, Music, Flame, Zap, CheckCircle2 } from 'lucide-react';

export default function WeeklyHero({ story, onReadScript, onOpenRate }) {
  if (!story) return null;

  return (
    <section className="relative w-full rounded-2xl overflow-hidden glass-panel border border-[#E5A93C]/40 gold-glow mb-12">
      {/* Background Hero Banner Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={story.hero_image || story.poster_url}
          alt={story.title}
          className="w-full h-full object-cover object-center opacity-30 filter brightness-90 saturate-125 hover:scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090B] via-[#09090B]/90 to-transparent" />
      </div>

      <div className="relative z-10 p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row gap-8 lg:items-center justify-between">
        {/* Left Column: Details */}
        <div className="max-w-2xl space-y-5">
          
          {/* Featured Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5A93C]/15 border border-[#E5A93C]/40 text-[#E5A93C] text-xs font-bold uppercase tracking-widest">
            <Trophy className="w-4 h-4 text-[#E5A93C]" />
            <span>Top Story of the Week</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C] animate-ping" />
          </div>

          {/* Title */}
          <div>
            <h1 className="font-cinzel text-3xl sm:text-5xl font-black text-white tracking-wide leading-tight drop-shadow-md">
              {story.title}
            </h1>
            {story.tagline && (
              <p className="font-serif-title italic text-slate-300 text-lg mt-1">
                "{story.tagline}"
              </p>
            )}
          </div>

          {/* Logline */}
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
            {story.logline}
          </p>

          {/* Dream Cast Pills */}
          <div className="pt-2">
            <p className="text-xs uppercase font-bold tracking-widest text-slate-400 mb-2 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#E5A93C]" />
              Fan Dream Cast:
            </p>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#121218]/90 border border-[#27272A] text-xs font-medium text-slate-200">
                <User className="w-3.5 h-3.5 text-[#E5A93C]" />
                <span className="text-slate-400">Hero:</span>
                <strong className="text-white">{story.dream_cast?.hero}</strong>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#121218]/90 border border-[#27272A] text-xs font-medium text-slate-200">
                <Clapperboard className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-slate-400">Director:</span>
                <strong className="text-white">{story.dream_cast?.director}</strong>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#121218]/90 border border-[#27272A] text-xs font-medium text-slate-200">
                <Music className="w-3.5 h-3.5 text-red-400" />
                <span className="text-slate-400">Music:</span>
                <strong className="text-white">{story.dream_cast?.music}</strong>
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onReadScript(story)}
              className="px-6 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-[#F3C775] via-[#E5A93C] to-[#B87E1B] hover:scale-105 transition-all duration-200 shadow-xl shadow-[#E5A93C]/25 flex items-center gap-2 text-sm sm:text-base cursor-pointer"
            >
              <BookOpen className="w-5 h-5" />
              <span>Read Full Script Treatment</span>
            </button>

            <button
              onClick={() => onOpenRate(story)}
              className="px-6 py-3.5 rounded-xl font-bold text-white bg-[#121218] hover:bg-[#1A1A22] border border-[#E5A93C]/40 hover:border-[#E5A93C] transition-all duration-200 flex items-center gap-2 text-sm sm:text-base cursor-pointer"
            >
              <Star className="w-5 h-5 text-[#E5A93C] fill-[#E5A93C]" />
              <span>Rate Story</span>
            </button>
          </div>

        </div>

        {/* Right Column: Score Breakdown Box */}
        <div className="w-full lg:w-80 glass-panel-gold rounded-xl p-6 space-y-4 border border-[#E5A93C]/30 flex-shrink-0">
          <div className="flex items-center justify-between border-b border-[#E5A93C]/20 pb-3">
            <div>
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">TFI Score Index</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-3xl font-black font-cinzel text-gradient-gold">
                  {story.scores?.overall || 9.5}
                </span>
                <span className="text-xs text-slate-500 font-bold">/ 10</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#E5A93C]/10 border border-[#E5A93C]/40 flex items-center justify-center">
              <Flame className="w-6 h-6 text-[#E5A93C] animate-bounce" />
            </div>
          </div>

          {/* Rating Sliders Preview */}
          <div className="space-y-3 pt-1">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Story Concept</span>
                <span className="text-[#E5A93C] font-bold">{story.scores?.concept || 9.5}/10</span>
              </div>
              <div className="w-full h-1.5 bg-[#181820] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-[#E5A93C] rounded-full"
                  style={{ width: `${(story.scores?.concept || 9.5) * 10}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Screenplay & Pacing</span>
                <span className="text-[#E5A93C] font-bold">{story.scores?.screenplay || 9.2}/10</span>
              </div>
              <div className="w-full h-1.5 bg-[#181820] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-[#E5A93C] rounded-full"
                  style={{ width: `${(story.scores?.screenplay || 9.2) * 10}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Mass Elevation Value</span>
                <span className="text-[#EF4444] font-bold">{story.scores?.mass_value || 9.8}/10</span>
              </div>
              <div className="w-full h-1.5 bg-[#181820] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-red-600 to-[#EF4444] rounded-full"
                  style={{ width: `${(story.scores?.mass_value || 9.8) * 10}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Tags */}
          <div className="pt-2 flex flex-wrap gap-1.5">
            {story.tags?.map((tag, idx) => (
              <span key={idx} className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-[#121218] border border-[#27272A] text-slate-300">
                {tag}
              </span>
            ))}
          </div>

          <p className="text-[11px] text-slate-400 text-center font-medium pt-1">
            Based on {story.ratings_count || 1420} verified TFI fan ratings
          </p>
        </div>
      </div>
    </section>
  );
}
