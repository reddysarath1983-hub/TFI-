import React from 'react';
import { Trophy, Star, BookOpen, User, Clapperboard, Music, Flame, Zap, Award } from 'lucide-react';

export default function WeeklyHero({ story, onReadScript, onOpenRate }) {
  if (!story) return null;

  return (
    <section className="relative w-full rounded-2xl overflow-hidden cinema-panel border border-[#22222E] mb-10 sm:mb-14">
      
      {/* Background Cinematic Artwork with Spotlight & Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={story.hero_image || story.poster_url}
          alt={story.title}
          className="w-full h-full object-cover object-center opacity-25 filter brightness-90 saturate-110 transform scale-105"
        />
        {/* Layered Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070709] via-[#070709]/90 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(229,169,60,0.12),transparent_60%)]" />
      </div>

      <div className="relative z-10 p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row gap-8 lg:items-center justify-between">
        
        {/* Left Editorial Section */}
        <div className="max-w-2xl space-y-5">
          
          {/* Magazine Cover Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#E5A93C]/10 border border-[#E5A93C]/30 text-[#E5A93C] text-[11px] font-bold uppercase tracking-widest">
            <Trophy className="w-3.5 h-3.5 text-[#E5A93C]" />
            <span>Weekly Top Story Treatment</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C] animate-pulse" />
          </div>

          {/* Title & Tagline */}
          <div>
            <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-wide leading-tight">
              {story.title}
            </h1>
            {story.tagline && (
              <p className="font-serif-title italic text-slate-300 text-base sm:text-xl mt-1.5">
                "{story.tagline}"
              </p>
            )}
          </div>

          {/* Logline */}
          <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed font-normal">
            {story.logline}
          </p>

          {/* Dream Cast Badges */}
          <div className="pt-2">
            <p className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-slate-400 mb-2.5 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#E5A93C]" />
              Fan Dream Cast:
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#121218] border border-[#22222E] text-xs font-medium text-slate-200">
                <User className="w-3.5 h-3.5 text-[#E5A93C]" />
                <span className="text-slate-500">Hero:</span>
                <strong className="text-white">{story.dream_cast?.hero}</strong>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#121218] border border-[#22222E] text-xs font-medium text-slate-200">
                <Clapperboard className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-slate-500">Director:</span>
                <strong className="text-white">{story.dream_cast?.director}</strong>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#121218] border border-[#22222E] text-xs font-medium text-slate-200">
                <Music className="w-3.5 h-3.5 text-red-400" />
                <span className="text-slate-500">Music:</span>
                <strong className="text-white">{story.dream_cast?.music}</strong>
              </span>
            </div>
          </div>

          {/* Primary & Secondary Actions */}
          <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <button
              onClick={() => onReadScript(story)}
              className="px-6 py-3.5 rounded-lg font-extrabold tracking-wider uppercase text-[#070709] bg-[#E5A93C] hover:bg-[#F7D692] transition-all duration-200 shadow-lg shadow-[#E5A93C]/15 flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read Treatment</span>
            </button>

            <button
              onClick={() => onOpenRate(story)}
              className="px-6 py-3.5 rounded-lg font-bold tracking-wider uppercase text-white bg-[#121218] hover:bg-[#1A1A22] border border-[#22222E] hover:border-[#E5A93C]/50 transition-all duration-200 flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
            >
              <Star className="w-4 h-4 text-[#E5A93C] fill-[#E5A93C]" />
              <span>Rate Story</span>
            </button>
          </div>

        </div>

        {/* Right Column: Score Breakdown Box */}
        <div className="w-full lg:w-80 rating-badge-gold rounded-xl p-5 sm:p-6 space-y-4 flex-shrink-0">
          <div className="flex items-center justify-between border-b border-[#22222E] pb-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">TFI Rating Score</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-3xl font-black font-cinzel text-gradient-gold">
                  {story.scores?.overall || 9.5}
                </span>
                <span className="text-xs text-slate-500 font-bold">/ 10</span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-lg bg-[#E5A93C]/10 border border-[#E5A93C]/30 flex items-center justify-center">
              <Flame className="w-6 h-6 text-[#E5A93C]" />
            </div>
          </div>

          {/* Rating Sliders Preview */}
          <div className="space-y-3 pt-1">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Story Concept</span>
                <span className="text-[#E5A93C] font-bold">{story.scores?.concept || 9.5}/10</span>
              </div>
              <div className="w-full h-1.5 bg-[#16161E] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#E5A93C] rounded-full"
                  style={{ width: `${(story.scores?.concept || 9.5) * 10}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Screenplay & Pacing</span>
                <span className="text-[#E5A93C] font-bold">{story.scores?.screenplay || 9.2}/10</span>
              </div>
              <div className="w-full h-1.5 bg-[#16161E] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#E5A93C] rounded-full"
                  style={{ width: `${(story.scores?.screenplay || 9.2) * 10}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Mass Elevation Value</span>
                <span className="text-[#C92A2A] font-bold">{story.scores?.mass_value || 9.8}/10</span>
              </div>
              <div className="w-full h-1.5 bg-[#16161E] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#C92A2A] rounded-full"
                  style={{ width: `${(story.scores?.mass_value || 9.8) * 10}%` }}
                />
              </div>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 text-center font-semibold uppercase tracking-wider pt-1">
            {story.ratings_count || 1420} Fan Reviews Verified
          </p>
        </div>

      </div>
    </section>
  );
}
