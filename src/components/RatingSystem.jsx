import React, { useState } from 'react';
import { Star, X, Zap, Brain, Popcorn, HeartOff, Send, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';


const REACTION_TAGS = [
  { id: '⚡ Interval Bang', label: '⚡ Interval Bang', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
  { id: '🧠 Mind-Bending', label: '🧠 Mind-Bending', color: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
  { id: '🍿 Mass Value', label: '🍿 Mass Value', color: 'bg-red-500/20 text-red-300 border-red-500/40' },
  { id: '💔 Needs Rework', label: '💔 Needs Rework', color: 'bg-slate-800 text-slate-400 border-slate-700' },
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

      // Confetti burst for cinema rating celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E5A93C', '#F3C775', '#EF4444', '#FFFFFF']
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
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-lg glass-panel rounded-2xl border border-[#E5A93C]/40 gold-glow p-6 sm:p-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-[#121218] border border-[#27272A] text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5A93C]/10 border border-[#E5A93C]/30 text-[#E5A93C] text-xs font-bold uppercase tracking-widest">
            <Star className="w-3.5 h-3.5 fill-[#E5A93C]" />
            Fan Rating System
          </div>
          <h2 className="font-cinzel text-2xl font-bold text-white">
            Rate "{story.title}"
          </h2>
          <p className="text-xs text-slate-400">
            Evaluate the story treatment using our 3 cinema metric sliders.
          </p>
        </div>

        {/* Overall Score Badge Live Preview */}
        <div className="glass-panel-gold rounded-xl p-4 text-center border border-[#E5A93C]/30">
          <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">
            Calculated TFI Score
          </span>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="font-cinzel text-4xl font-black text-gradient-gold">
              {overallScore}
            </span>
            <span className="text-sm font-bold text-slate-500">/ 10</span>
          </div>
        </div>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-white">Rating Submitted!</h3>
            <p className="text-xs text-slate-400">Your score has been added to the TFI WritersClub database.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* 3 Rating Sliders */}
            <div className="space-y-5">
              
              {/* 1. Story Concept Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <label className="text-slate-200 font-bold flex items-center gap-1.5">
                    <span>1. Story Concept</span>
                  </label>
                  <span className="px-2.5 py-0.5 rounded bg-[#181820] text-[#E5A93C] font-bold text-sm border border-[#27272A]">
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
                  className="w-full"
                />
              </div>

              {/* 2. Screenplay & Pacing Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <label className="text-slate-200 font-bold flex items-center gap-1.5">
                    <span>2. Screenplay & Pacing</span>
                  </label>
                  <span className="px-2.5 py-0.5 rounded bg-[#181820] text-[#E5A93C] font-bold text-sm border border-[#27272A]">
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
                  className="w-full"
                />
              </div>

              {/* 3. Mass Value Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <label className="text-slate-200 font-bold flex items-center gap-1.5">
                    <span>3. Mass Value</span>
                  </label>
                  <span className="px-2.5 py-0.5 rounded bg-[#181820] text-red-400 font-bold text-sm border border-[#27272A]">
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
                  className="w-full"
                />
              </div>

            </div>

            {/* Quick-Tag Reaction Buttons */}
            <div className="space-y-2">
              <label className="text-xs uppercase font-bold text-slate-400 tracking-wider block">
                Quick Reactions:
              </label>
              <div className="flex flex-wrap gap-2">
                {REACTION_TAGS.map(tag => {
                  const isSelected = selectedTags.includes(tag.id);
                  return (
                    <button
                      type="button"
                      key={tag.id}
                      onClick={() => toggleTag(tag.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        isSelected
                          ? tag.color + ' ring-2 ring-amber-400/50'
                          : 'bg-[#121218] text-slate-500 border-[#27272A] hover:text-slate-300'
                      }`}
                    >
                      {tag.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional Comment */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Fan Feedback (Optional):
              </label>
              <textarea
                rows={3}
                placeholder="What did you think of the interval bang and dream casting?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-[#121218] border border-[#27272A] rounded-xl p-3 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-[#E5A93C]"
              />
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-[#F3C775] via-[#E5A93C] to-[#B87E1B] hover:opacity-95 transition-all shadow-lg shadow-[#E5A93C]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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
