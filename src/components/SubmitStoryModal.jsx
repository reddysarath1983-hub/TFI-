import React, { useState } from 'react';
import { X, Film, PlusCircle, User, Clapperboard, Music, BookOpen, Send, Sparkles } from 'lucide-react';

export default function SubmitStoryModal({ onClose, onSubmitStory }) {
  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    logline: '',
    genre: 'Action Mythological Epic',
    hero: '',
    hero_role: '',
    director: '',
    music: '',
    author_name: '',
    full_script: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.logline || !formData.full_script) {
      alert('Please fill in Title, Logline, and Script Content.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmitStory(formData);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl glass-panel rounded-2xl border border-[#E5A93C]/40 gold-glow p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        
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
            <PlusCircle className="w-3.5 h-3.5" />
            Writer Submission Portal
          </div>
          <h2 className="font-cinzel text-2xl font-bold text-white">
            Submit Your Cinema Treatment
          </h2>
          <p className="text-xs text-slate-400">
            Share your story concept with the TFI WritersClub community and get real fan ratings.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Title & Author */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Story Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. RAKTA KSHETRAM"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full bg-[#121218] border border-[#27272A] rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-[#E5A93C]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Author Name</label>
              <input
                type="text"
                placeholder="e.g. Vijay Kumar"
                value={formData.author_name}
                onChange={(e) => handleChange('author_name', e.target.value)}
                className="w-full bg-[#121218] border border-[#27272A] rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-[#E5A93C]"
              />
            </div>
          </div>

          {/* Tagline & Genre */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Tagline</label>
              <input
                type="text"
                placeholder="e.g. Blood will bleed fire."
                value={formData.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full bg-[#121218] border border-[#27272A] rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-[#E5A93C]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Genre</label>
              <select
                value={formData.genre}
                onChange={(e) => handleChange('genre', e.target.value)}
                className="w-full bg-[#121218] border border-[#27272A] rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-[#E5A93C]"
              >
                <option value="Action Mythological Epic">Action Mythological Epic</option>
                <option value="Crime Action Thriller">Crime Action Thriller</option>
                <option value="Period Adventure Thriller">Period Adventure Thriller</option>
                <option value="Raw Neo-Noir Drama">Raw Neo-Noir Drama</option>
                <option value="Sci-Fi Fantasy">Sci-Fi Fantasy</option>
              </select>
            </div>
          </div>

          {/* Logline */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Logline / Hook *</label>
            <textarea
              rows={2}
              required
              placeholder="A 2-sentence hook describing the protagonist, core conflict, and stakes."
              value={formData.logline}
              onChange={(e) => handleChange('logline', e.target.value)}
              className="w-full bg-[#121218] border border-[#27272A] rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-[#E5A93C]"
            />
          </div>

          {/* Dream Cast Setup */}
          <div className="bg-[#09090B]/60 p-4 rounded-xl border border-[#27272A] space-y-3">
            <span className="text-xs uppercase font-bold text-[#E5A93C] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Dream Cast Wishlist:
            </span>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Hero</label>
                <input
                  type="text"
                  placeholder="e.g. Prabhas"
                  value={formData.hero}
                  onChange={(e) => handleChange('hero', e.target.value)}
                  className="w-full bg-[#121218] border border-[#27272A] rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-[#E5A93C]"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Director</label>
                <input
                  type="text"
                  placeholder="e.g. S.S. Rajamouli"
                  value={formData.director}
                  onChange={(e) => handleChange('director', e.target.value)}
                  className="w-full bg-[#121218] border border-[#27272A] rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-[#E5A93C]"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Music Composer</label>
                <input
                  type="text"
                  placeholder="e.g. Anirudh"
                  value={formData.music}
                  onChange={(e) => handleChange('music', e.target.value)}
                  className="w-full bg-[#121218] border border-[#27272A] rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-[#E5A93C]"
                />
              </div>
            </div>
          </div>

          {/* Full Script Treatment */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Full Script Treatment (Screenplay Preview) *</label>
            <textarea
              rows={6}
              required
              placeholder="SCENE 1: EXT. HYDERABAD - NIGHT&#10;Describe scene headings, interval bang moment, and climax mass elevation..."
              value={formData.full_script}
              onChange={(e) => handleChange('full_script', e.target.value)}
              className="w-full bg-[#121218] border border-[#27272A] rounded-xl p-3 text-xs font-script text-slate-200 focus:outline-none focus:border-[#E5A93C]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-[#F3C775] via-[#E5A93C] to-[#B87E1B] hover:opacity-95 transition-all shadow-lg shadow-[#E5A93C]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? 'Publishing Treatment...' : 'Publish Story Treatment'}</span>
          </button>

        </form>

      </div>
    </div>
  );
}
