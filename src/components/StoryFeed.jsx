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
      
      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1C1C26] pb-4">
        <div>
          <h2 className="font-cinzel text-xl sm:text-3xl font-bold text-white tracking-wider uppercase">
            EXPLORE TREATMENTS
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            Community-submitted Indian cinema concepts, screenplay previews, and dream casting.
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#E5A93C]" />
          <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#121218] border border-[#22222E] rounded-lg text-xs font-semibold text-slate-200 px-3 py-1.5 focus:outline-none focus:border-[#E5A93C]"
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
            className={`px-3.5 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
              selectedGenre === genre
                ? 'bg-[#E5A93C] text-[#070709] font-black'
                : 'bg-[#121218] border border-[#22222E] text-slate-400 hover:text-white hover:border-slate-600'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Grid of Editorial Movie Cards */}
      {sortedStories.length === 0 ? (
        <div className="text-center py-16 cinema-panel rounded-xl">
          <p className="text-slate-400 text-sm">No story treatments match the selected criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedStories.map(story => {
            const isBookmarked = savedIds.includes(story.id);

            return (
              <div
                key={story.id}
                className="group relative rounded-xl cinema-panel cinema-panel-hover flex flex-col justify-between overflow-hidden"
              >
                {/* Poster / Artwork Header */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#070709]">
                  <img
                    src={story.poster_url || story.hero_image}
                    alt={story.title}
                    className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F14] via-[#0F0F14]/40 to-transparent" />
                  
                  {/* Genre Badge */}
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-[#070709]/80 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest text-[#E5A93C]">
                    {story.genre}
                  </span>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => onToggleBookmark(story.id)}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-md transition-all cursor-pointer ${
                      isBookmarked
                        ? 'bg-[#E5A93C] text-[#070709] shadow-md'
                        : 'bg-[#070709]/80 text-slate-300 hover:text-white border border-white/10'
                    }`}
                    title={isBookmarked ? 'Remove Bookmark' : 'Save Story'}
                  >
                    <Bookmark className="w-3.5 h-3.5 fill-current" />
                  </button>

                  {/* TFI Rating Pill */}
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-[#070709]/90 border border-[#E5A93C]/40 flex items-center gap-1.5 shadow-lg">
                    <Star className="w-3.5 h-3.5 text-[#E5A93C] fill-[#E5A93C]" />
                    <span className="font-cinzel font-bold text-white text-sm">
                      {story.scores?.overall || 9.0}
                    </span>
                    <span className="text-[9px] text-slate-400 font-semibold">/ 10</span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 flex-1 space-y-3.5">
                  <div>
                    <h3 className="font-cinzel text-lg font-bold text-white group-hover:text-[#E5A93C] transition-colors leading-snug">
                      {story.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                      Treatment by <span className="text-slate-200">{story.author_name}</span>
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                    {story.logline}
                  </p>

                  {/* Dream Cast Summary */}
                  <div className="bg-[#070709] rounded-lg p-3 border border-[#1C1C26] space-y-1.5">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-[#E5A93C] block">
                      Dream Cast Wishlist:
                    </span>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="text-[9px] text-slate-500 block uppercase font-bold">Hero</span>
                        <strong className="text-slate-200 text-xs truncate block">{story.dream_cast?.hero}</strong>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 block uppercase font-bold">Director</span>
                        <strong className="text-slate-200 text-xs truncate block">{story.dream_cast?.director}</strong>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 block uppercase font-bold">Music</span>
                        <strong className="text-slate-200 text-xs truncate block">{story.dream_cast?.music}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {story.tags?.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#16161E] text-slate-400 border border-[#22222E]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-5 pb-5 pt-1 flex items-center justify-between gap-3 border-t border-[#1C1C26]">
                  <button
                    onClick={() => onOpenRate(story)}
                    className="flex-1 py-2 rounded text-xs font-bold uppercase tracking-wider text-slate-300 bg-[#16161E] hover:bg-[#1E1E28] border border-[#22222E] hover:border-slate-500 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Star className="w-3.5 h-3.5 text-[#E5A93C]" />
                    <span>Rate ({story.ratings_count || 10})</span>
                  </button>

                  <button
                    onClick={() => onReadScript(story)}
                    className="flex-1 py-2 rounded text-xs font-extrabold uppercase tracking-wider text-[#070709] bg-[#E5A93C] hover:bg-[#F7D692] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-[#E5A93C]/10"
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
