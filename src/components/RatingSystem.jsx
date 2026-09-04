import React, { useState } from 'react';
import { Star, X, Zap, Brain, Popcorn, HeartOff, Send, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

const REACTION_TAGS = [
  { id: '⚡ Interval Bang', label: '⚡ Interval Bang', color: 'bg-amber-950/60 text-amber-300 border-amber-800/80' },
  { id: '🧠 Mind-Bending', label: '🧠 Mind-Bending', color: 'bg-purple-950/60 text-purple-300 border-purple-800/80' },
  { id: '🍿 Mass Value', label: '🍿 Mass Value', color: 'bg-red-950/60 text-red-300 border-red-800/80' },
  { id: '💔 Needs Rework', label: '💔 Needs Rework', color: 'bg-slate-900 text-slate-400 border-slate-700' },
];

export default function RatingSystem({ story, onClose, onSubmitRating }) {
  const [conceptScore, setConceptScore] = useState(9.0);
  const [screenplayScore, setScreenplayScore] = useState(8.5);
  const [massScore, setMassScore] = useState(9.5);
  const [selectedTags, setSelectedTags] = useState(['⚡ Interval Bang', '🍿 Mass Value']);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!story) return null;

  const overallScore = Number(((conceptScore + screenplayScore + massScore) / 3).toFixed(1));

  const toggleTag = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(t => t !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmitRating(story.id, {
        concept: Number(conceptScore),
        screenplay: Number(screenplayScore),
        mass_value: Number(massScore),
        tags: selectedTags,
        comment
      });

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E5A93C', '#F7D692', '#C92A2A', '#FFFFFF']
      });

      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 1800);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070709]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-lg cinema-panel rounded-xl border border-[#22222E] p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-[#121218] border border-[#22222E] text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded bg-[#E5A93C]/10 border border-[#E5A93C]/30 text-[#E5A93C] text-[10px] sm:text-xs font-bold uppercase tracking-widest">
            <Star className="w-3.5 h-3.5 fill-[#E5A93C]" />
            Fan Rating Scorecard
          </div>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
            Rate "{story.title}"
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-400">
            Evaluate the story treatment using our 3 cinema metric sliders.
          </p>
        </div>

        {/* Calculated TFI Score Box */}
        <div className="rating-badge-gold rounded-xl p-4 text-center border border-[#E5A93C]/30">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest block">
            Calculated TFI Rating
          </span>
          <div className="flex items-center justify-center gap-2 mt-0.5">
            <span className="font-cinzel text-3xl sm:text-4xl font-black text-gradient-gold">
              {overallScore}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-500">/ 10</span>
          </div>
        </div>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-800/80 flex items-center justify-center mx-auto text-emerald-400">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-cinzel text-lg font-bold text-white uppercase tracking-wider">Rating Submitted!</h3>
            <p className="text-xs text-slate-400">Your review score has been saved into the database.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* 3 Rating Sliders */}
            <div className="space-y-4">
              
              {/* 1. Concept */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <label className="text-slate-200 font-bold text-xs uppercase tracking-wider">
                    1. Story Concept
                  </label>
                  <span className="px-2 py-0.5 rounded bg-[#16161E] text-[#E5A93C] font-bold text-xs border border-[#22222E]">
                    {conceptScore} / 10
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.1"
                  value={conceptScore}
                  onChange={(e) => setConceptScore(parseFloat(e.target.value))}
                  className="w-full h-2 cursor-pointer"
                />
              </div>

              {/* 2. Screenplay */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <label className="text-slate-200 font-bold text-xs uppercase tracking-wider">
                    2. Screenplay & Pacing
                  </label>
                  <span className="px-2 py-0.5 rounded bg-[#16161E] text-[#E5A93C] font-bold text-xs border border-[#22222E]">
                    {screenplayScore} / 10
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.1"
                  value={screenplayScore}
                  onChange={(e) => setScreenplayScore(parseFloat(e.target.value))}
                  className="w-full h-2 cursor-pointer"
                />
              </div>

              {/* 3. Mass Value */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <label className="text-slate-200 font-bold text-xs uppercase tracking-wider">
                    3. Mass Elevation Value
                  </label>
                  <span className="px-2 py-0.5 rounded bg-[#16161E] text-[#C92A2A] font-bold text-xs border border-[#22222E]">
                    {massScore} / 10
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.1"
                  value={massScore}
                  onChange={(e) => setMassScore(parseFloat(e.target.value))}
                  className="w-full h-2 cursor-pointer"
                />
              </div>

            </div>

            {/* Quick-Tag Reaction Buttons */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest block">
                Quick Tags:
              </label>
              <div className="flex flex-wrap gap-2">
                {REACTION_TAGS.map(tag => {
                  const isSelected = selectedTags.includes(tag.id);
                  return (
                    <button
                      type="button"
                      key={tag.id}
                      onClick={() => toggleTag(tag.id)}
                      className={`px-3 py-1.5 rounded text-xs font-bold border transition-all cursor-pointer ${
                        isSelected
                          ? tag.color + ' ring-1 ring-amber-400/50'
                          : 'bg-[#121218] text-slate-500 border-[#22222E] hover:text-slate-300'
                      }`}
                    >
                      {tag.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Feedback */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                Fan Feedback (Optional):
              </label>
              <textarea
                rows={2}
                placeholder="What did you think of the interval bang and dream casting?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-[#121218] border border-[#22222E] rounded-lg p-2.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-[#E5A93C]"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-lg font-extrabold tracking-wider uppercase text-[#070709] bg-[#E5A93C] hover:bg-[#F7D692] transition-all shadow-md shadow-[#E5A93C]/15 flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Submitting Score...' : 'Submit TFI Rating'}</span>
            </button>

          </form>
        )}

      </div>
    </div>
  );
}
