import React from 'react';
import { Trophy, Star, Eye } from 'lucide-react';

export default function PodiumLeaderboard({ stories, onReadScript }) {
  if (!stories || stories.length < 3) return null;

  const rank1 = stories[0];
  const rank2 = stories[1];
  const rank3 = stories[2];

  return (
    <section className="py-16 my-8 border-t border-[rgba(244,238,227,0.08)]">
      <div className="max-w-[1240px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-2 mb-12">
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#f4efe4] tracking-tight">
            Story of the Week Podium
          </h2>
          <p className="text-sm sm:text-base text-[#7d7364] max-w-md mx-auto">
            Ranked by reads, ratings, and fan votes across Telugu cinema lovers.
          </p>
        </div>

        {/* Podium Grid */}
        <div className="flex flex-col md:flex-row items-end justify-center gap-6 max-w-4xl mx-auto">
          
          {/* Rank 2 Card */}
          <div 
            onClick={() => onReadScript(rank2)}
            className="w-full md:w-1/3 rounded-2xl overflow-hidden bg-[#161310] border border-[rgba(244,238,227,0.08)] hover:-translate-y-2 transition-transform duration-300 cursor-pointer shadow-xl group"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-[#1e1a15]">
              <img
                src={rank2.poster_url || rank2.hero_image}
                alt={rank2.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161310] via-transparent to-transparent" />
              <span className="absolute top-3 left-3 font-display font-black text-3xl text-[#f4efe4] drop-shadow-md">
                #2
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-display font-bold text-lg text-[#f4efe4] group-hover:text-[#ff6a35] transition-colors truncate">
                {rank2.title}
              </h3>
              <span className="text-xs text-[#7d7364] font-medium block mt-1">
                by {rank2.author_name}
              </span>
            </div>
          </div>

          {/* Rank 1 Card (Elevated center) */}
          <div 
            onClick={() => onReadScript(rank1)}
            className="w-full md:w-1/3 rounded-2xl overflow-hidden bg-[#1e1a15] border border-[#d7a552]/40 md:-translate-y-6 hover:-translate-y-8 transition-transform duration-300 cursor-pointer shadow-2xl group"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-[#272119]">
              <img
                src={rank1.poster_url || rank1.hero_image}
                alt={rank1.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e1a15] via-transparent to-transparent" />
              <span className="absolute top-3 left-3 font-display font-black text-4xl text-[#d7a552] drop-shadow-lg flex items-center gap-1">
                #1 <Trophy className="w-5 h-5 text-[#d7a552]" />
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-display font-bold text-xl text-[#f4efe4] group-hover:text-[#d7a552] transition-colors truncate">
                {rank1.title}
              </h3>
              <span className="text-xs text-[#b8ac9a] font-medium block mt-1">
                by {rank1.author_name}
              </span>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d7a552]/15 border border-[#d7a552]/30 text-[#d7a552] text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-[#d7a552]" />
                <span>{rank1.scores?.overall}/10 Rating</span>
              </div>
            </div>
          </div>

          {/* Rank 3 Card */}
          <div 
            onClick={() => onReadScript(rank3)}
            className="w-full md:w-1/3 rounded-2xl overflow-hidden bg-[#161310] border border-[rgba(244,238,227,0.08)] hover:-translate-y-2 transition-transform duration-300 cursor-pointer shadow-xl group"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-[#1e1a15]">
              <img
                src={rank3.poster_url || rank3.hero_image}
                alt={rank3.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161310] via-transparent to-transparent" />
              <span className="absolute top-3 left-3 font-display font-black text-3xl text-[#b8ac9a] drop-shadow-md">
                #3
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-display font-bold text-lg text-[#f4efe4] group-hover:text-[#ff6a35] transition-colors truncate">
                {rank3.title}
              </h3>
              <span className="text-xs text-[#7d7364] font-medium block mt-1">
                by {rank3.author_name}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
