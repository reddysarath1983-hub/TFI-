import React, { useState } from 'react';
import { Star, BookOpen, User, Clapperboard, Music, Bookmark, SlidersHorizontal, Flame, Award, ArrowUpDown, ChevronRight } from 'lucide-react';

const GENRES = ["All", "Action Mythological Epic", "Crime Action Thriller", "Period Adventure Thriller", "Raw Neo-Noir Drama"];

export default function StoryFeed({ stories, onReadScript, onOpenRate, savedIds, onToggleBookmark }) {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState("overall"); // overall, mass_value, newest

  // Filter stories by genre
  const filteredStories = stories.filter(story => {
    if (selectedGenre === "All") return true;
    return story.genre?.toLowerCase() === selectedGenre.toLowerCase();
  });

  // Sort stories
  const sortedStories = [...filteredStories].sort((a, b) => {
    if (sortBy === "overall") {
      return (b.scores?.overall || 0) - (a.scores?.overall || 0);
    }
    if (sortBy === "mass_value") {
      return (b.scores?.mass_value || 0) - (a.scores?.mass_value || 0);
    }
    if (sortBy === "newest") {
      return new Date(b.created_at || 0) - new Date(a.created_at || 0);
    }
    return 0;
  });

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#27272A] pb-4">
        <div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide">
            EXPLORE TREATMENTS
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Discover community-submitted Telugu script concepts with dream casting & fan score breakdown.
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <ArrowUpDown className="w-4 h-4 text-[#E5A93C]" />
          <span className="text-xs uppercase font-bold text-slate-400">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#121218] border border-[#27272A] rounded-lg text-xs font-semibold text-slate-200 px-3 py-2 focus:outline-none focus:border-[#E5A93C]"
          >
            <option value="overall">Highest Overall Score</option>
            <option value="mass_value">Mass Elevation Score</option>
            <option value="newest">Latest Submissions</option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {GENRES.map(genre => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedGenre === genre
                ? 'bg-[#E5A93C] text-slate-950 shadow-md shadow-[#E5A93C]/20 font-extrabold'
                : 'bg-[#121218] border border-[#27272A] text-slate-400 hover:text-white hover:border-slate-600'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Grid of Story Cards */}
      {sortedStories.length === 0 ? (
        <div className="text-center py-16 glass-panel rounded-2xl border border-[#27272A]">
          <p className="text-slate-400 text-base">No story treatments match the selected criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedStories.map(story => {
            const isBookmarked = savedIds.includes(story.id);

            return (
              <div
                key={story.id}
                className="group relative rounded-2xl glass-panel border border-[#27272A] hover:border-[#E5A93C]/50 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:shadow-2xl hover:shadow-[#E5A93C]/10"
              >
                {/* Header Graphic / Image Banner */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={story.poster_url || story.hero_image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121218] via-[#121218]/60 to-transparent" />
                  
                  {/* Genre Tag */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#09090B]/80 backdrop-blur-md border border-white/10 text-[11px] font-bold uppercase tracking-wider text-[#E5A93C]">
                    {story.genre}
                  </span>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => onToggleBookmark(story.id)}
                    className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-transform active:scale-90 ${
                      isBookmarked
                        ? 'bg-[#E5A93C] text-slate-950 shadow-lg'
                        : 'bg-[#09090B]/70 text-slate-300 hover:text-white border border-white/10'
                    }`}
                    title={isBookmarked ? 'Remove Bookmark' : 'Save Story'}
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>

                  {/* Overall Rating Pill */}
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-[#09090B]/90 backdrop-blur-md border border-[#E5A93C]/40 flex items-center gap-1.5 shadow-lg">
                    <Star className="w-4 h-4 text-[#E5A93C] fill-[#E5A93C]" />
                    <span className="font-cinzel font-bold text-white text-base">
                      {story.scores?.overall || 9.0}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">/ 10</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 space-y-4">
                  <div>
                    <h3 className="font-cinzel text-xl font-bold text-white group-hover:text-[#E5A93C] transition-colors leading-snug">
                      {story.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      By <span className="text-slate-300 font-medium">{story.author_name}</span>
                    </p>
                  </div>

                  <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed">
                    {story.logline}
                  </p>

                  {/* Dream Cast List */}
                  <div className="bg-[#09090B]/60 rounded-xl p-3 border border-[#27272A] space-y-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5A93C] block">
                      Dream Cast:
                    </span>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 block">Hero</span>
                        <strong className="text-slate-200 truncate block">{story.dream_cast?.hero}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">Director</span>
                        <strong className="text-slate-200 truncate block">{story.dream_cast?.director}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">Music</span>
                        <strong className="text-slate-200 truncate block">{story.dream_cast?.music}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {story.tags?.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#181820] text-slate-400 border border-[#27272A]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-5 pb-5 pt-2 flex items-center justify-between gap-3 border-t border-[#27272A]/50">
                  <button
                    onClick={() => onOpenRate(story)}
                    className="flex-1 py-2 rounded-lg text-xs font-bold text-slate-300 bg-[#181820] hover:bg-[#22222D] border border-[#27272A] hover:border-slate-500 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Star className="w-3.5 h-3.5 text-[#E5A93C]" />
                    <span>Rate ({story.ratings_count || 10})</span>
                  </button>

                  <button
                    onClick={() => onReadScript(story)}
                    className="flex-1 py-2 rounded-lg text-xs font-bold text-slate-950 bg-gradient-to-r from-[#F3C775] via-[#E5A93C] to-[#B87E1B] hover:opacity-90 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-[#E5A93C]/10"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read Treatment</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
