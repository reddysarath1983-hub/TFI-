import React from 'react';
import { Trophy, Star, BookOpen, User, Clapperboard, Music, Flame, Zap, PenTool, ArrowRight } from 'lucide-react';

export default function WeeklyHero({ story, onReadScript, onOpenRate }) {
  if (!story) return null;

  return (
    <section className="relative min-h-[85vh] flex items-center pt-32 pb-16 overflow-hidden bg-[radial-gradient(ellipse_60%_50%_at_82%_20%,rgba(225,68,24,0.16),transparent_60%),radial-gradient(ellipse_50%_60%_at_100%_100%,rgba(215,165,82,0.08),transparent_60%),linear-gradient(180deg,#0d0b09_0%,#0a0908_55%,#0d0a08_100%)] rounded-3xl border border-[rgba(244,238,227,0.08)] mb-12 sm:mb-16">
      <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
        
        {/* Left Column: Headline, Telugu Tag, Pitch & CTAs */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[rgba(244,238,227,0.14)] text-xs font-semibold text-[#b8ac9a]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e14418] shadow-[0_0_8px_#e14418]" />
            <span>2,140 stories and counting</span>
          </div>

          {/* Main Title & Telugu Tag */}
          <div>
            <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.92] bg-gradient-to-b from-[#fff8f0] to-[#d8cabb] bg-clip-text text-transparent">
              KATHA
            </h1>
            <span className="font-telugu font-semibold text-2xl sm:text-4xl text-[#f4efe4] block mt-3">
              నీ కథ. మన తీర్పు.
            </span>
          </div>

          {/* Featured Story Focus Box */}
          <div className="bg-[#161310] border border-[rgba(244,238,227,0.1)] rounded-2xl p-5 space-y-3 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#ff6a35] flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-[#d7a552]" />
                Top Weekly Featured Story
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-[#d7a552]">
                <Star className="w-3.5 h-3.5 fill-[#d7a552]" />
                <span>{story.scores?.overall || 9.5} / 10</span>
              </div>
            </div>

            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#f4efe4]">
              {story.title}
            </h2>

            <p className="text-xs sm:text-sm text-[#b8ac9a] line-clamp-2 italic">
              "{story.logline}"
            </p>

            {/* Dream Cast Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="px-2.5 py-1 rounded-md bg-[#1e1a15] border border-[rgba(244,238,227,0.08)] text-[#f4efe4]">
                Hero: <strong className="text-white">{story.dream_cast?.hero}</strong>
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#1e1a15] border border-[rgba(244,238,227,0.08)] text-[#f4efe4]">
                Director: <strong className="text-white">{story.dream_cast?.director}</strong>
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#1e1a15] border border-[rgba(244,238,227,0.08)] text-[#f4efe4]">
                Music: <strong className="text-white">{story.dream_cast?.music}</strong>
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onReadScript(story)}
              className="bg-gradient-to-r from-[#ff6a35] to-[#e14418] text-[#fff6ee] font-bold text-sm sm:text-base px-7 py-4 rounded-full shadow-xl shadow-[#e14418]/50 hover:-translate-y-1 transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-5 h-5" />
              <span>Read Full Script Treatment</span>
            </button>

            <button
              onClick={() => onOpenRate(story)}
              className="font-bold text-sm sm:text-base text-[#f4efe4] hover:text-[#ff6a35] flex items-center gap-2 border-b border-[rgba(244,238,227,0.2)] hover:border-[#ff6a35] pb-1 transition-all cursor-pointer"
            >
              <span>Rate & Vote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Right Column: Cinema Beam & Animated Floating Cards */}
        <div className="lg:col-span-5 relative h-[360px] sm:h-[480px]">
          
          {/* Cinema Projector Beam Box */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden bg-[conic-gradient(from_200deg_at_30%_20%,rgba(225,68,24,0.5),transparent_40%),radial-gradient(circle_at_70%_75%,rgba(215,165,82,0.25),transparent_55%),linear-gradient(155deg,#1c1712_0%,#0c0a08_70%)] border border-[rgba(244,238,227,0.14)] shadow-2xl">
            
            {/* Film Perforations on Left Edge */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-[repeating-linear-gradient(180deg,rgba(244,238,227,0.14)_0_10px,transparent_10px_26px)] opacity-50" />
            
            {/* Background Story Poster Preview */}
            <img
              src={story.hero_image || story.poster_url}
              alt={story.title}
              className="w-full h-full object-cover opacity-40 mix-blend-luminosity filter brightness-90 saturate-150"
            />
          </div>

          {/* Floating Cinema Card 1 */}
          <div className="absolute top-8 right-6 w-36 sm:w-44 h-52 sm:h-60 rounded-xl border border-[rgba(244,238,227,0.16)] p-3.5 flex flex-col justify-end bg-gradient-to-br from-[#8a2b1c] to-[#2c110b] shadow-2xl backdrop-blur-sm float-card-anim-1">
            <span className="text-[10px] font-bold tracking-widest text-[#fff5ee]/80 uppercase">
              {story.genre || 'Action Epic'}
            </span>
            <span className="font-display font-extrabold text-sm sm:text-base text-white mt-1 leading-tight line-clamp-2">
              {story.title}
            </span>
            <span className="text-[10px] text-[#d7a552] font-bold mt-2 flex items-center gap-1">
              <Star className="w-3 h-3 fill-[#d7a552]" />
              {story.scores?.overall}/10
            </span>
          </div>

          {/* Floating Cinema Card 2 */}
          <div className="absolute bottom-6 left-10 w-36 sm:w-44 h-52 sm:h-60 rounded-xl border border-[rgba(244,238,227,0.16)] p-3.5 flex flex-col justify-end bg-gradient-to-br from-[#9c3554] to-[#2a1119] shadow-2xl backdrop-blur-sm float-card-anim-2">
            <span className="text-[10px] font-bold tracking-widest text-[#fff5ee]/80 uppercase">
              {story.dream_cast?.hero ? `Hero: ${story.dream_cast.hero}` : 'TFI Cinema'}
            </span>
            <span className="font-display font-extrabold text-sm sm:text-base text-white mt-1 leading-tight line-clamp-2">
              GARUDA: ASCENT
            </span>
            <span className="text-[10px] text-[#ff6a35] font-bold mt-2">
              ⚡ Interval Bang
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
