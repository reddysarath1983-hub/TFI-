import React, { useState } from 'react';
import { X, PlusCircle, Sparkles, Send } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 bg-[#070709]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl cinema-panel rounded-xl border border-[#22222E] p-6 sm:p-8 space-y-5 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-[#121218] border border-[#22222E] text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#E5A93C]/10 border border-[#E5A93C]/30 text-[#E5A93C] text-[10px] sm:text-xs font-bold uppercase tracking-widest">
            <PlusCircle className="w-3.5 h-3.5" />
            Writer Submission Portal
          </div>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
            Submit Your Cinema Treatment
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-400">
            Share your story concept with the TFI WritersClub community and get real fan ratings.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Title & Author */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Story Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. RAKTA KSHETRAM"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full bg-[#121218] border border-[#22222E] rounded-lg p-2.5 sm:p-3 text-xs text-slate-200 focus:outline-none focus:border-[#E5A93C]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Author Name</label>
              <input
                type="text"
                placeholder="e.g. Vijay Kumar"
                value={formData.author_name}
                onChange={(e) => handleChange('author_name', e.target.value)}
                className="w-full bg-[#121218] border border-[#22222E] rounded-lg p-2.5 sm:p-3 text-xs text-slate-200 focus:outline-none focus:border-[#E5A93C]"
              />
            </div>
          </div>

          {/* Tagline & Genre */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Tagline</label>
              <input
                type="text"
                placeholder="e.g. Blood will bleed fire."
                value={formData.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full bg-[#121218] border border-[#22222E] rounded-lg p-2.5 sm:p-3 text-xs text-slate-200 focus:outline-none focus:border-[#E5A93C]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Genre</label>
              <select
                value={formData.genre}
                onChange={(e) => handleChange('genre', e.target.value)}
                className="w-full bg-[#121218] border border-[#22222E] rounded-lg p-2.5 sm:p-3 text-xs text-slate-200 focus:outline-none focus:border-[#E5A93C]"
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
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Logline / Hook *</label>
            <textarea
              rows={2}
              required
              placeholder="A 2-sentence hook describing the protagonist, core conflict, and stakes."
              value={formData.logline}
              onChange={(e) => handleChange('logline', e.target.value)}
              className="w-full bg-[#121218] border border-[#22222E] rounded-lg p-2.5 sm:p-3 text-xs text-slate-200 focus:outline-none focus:border-[#E5A93C]"
            />
          </div>

          {/* Dream Cast Setup */}
          <div className="bg-[#070709] p-3.5 sm:p-4 rounded-lg border border-[#22222E] space-y-2">
            <span className="text-[10px] uppercase font-bold text-[#E5A93C] tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Dream Cast Wishlist:
            </span>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="text-[9px] text-slate-400 block mb-1 uppercase font-bold">Hero</label>
                <input
                  type="text"
                  placeholder="e.g. Prabhas"
                  value={formData.hero}
                  onChange={(e) => handleChange('hero', e.target.value)}
                  className="w-full bg-[#121218] border border-[#22222E] rounded p-2 text-xs text-slate-200 focus:outline-none focus:border-[#E5A93C]"
                />
              </div>

              <div>
                <label className="text-[9px] text-slate-400 block mb-1 uppercase font-bold">Director</label>
                <input
                  type="text"
                  placeholder="e.g. S.S. Rajamouli"
                  value={formData.director}
                  onChange={(e) => handleChange('director', e.target.value)}
                  className="w-full bg-[#121218] border border-[#22222E] rounded p-2 text-xs text-slate-200 focus:outline-none focus:border-[#E5A93C]"
                />
              </div>

              <div>
                <label className="text-[9px] text-slate-400 block mb-1 uppercase font-bold">Music Composer</label>
                <input
                  type="text"
                  placeholder="e.g. Anirudh"
                  value={formData.music}
                  onChange={(e) => handleChange('music', e.target.value)}
                  className="w-full bg-[#121218] border border-[#22222E] rounded p-2 text-xs text-slate-200 focus:outline-none focus:border-[#E5A93C]"
                />
              </div>
            </div>
          </div>

          {/* Full Script Treatment */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Full Script Treatment *</label>
            <textarea
              rows={5}
              required
              placeholder="SCENE 1: EXT. HYDERABAD - NIGHT&#10;Describe scene headings, interval bang moment, and climax mass elevation..."
              value={formData.full_script}
              onChange={(e) => handleChange('full_script', e.target.value)}
              className="w-full bg-[#121218] border border-[#22222E] rounded-lg p-2.5 text-xs font-script text-slate-200 focus:outline-none focus:border-[#E5A93C]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-lg font-extrabold tracking-wider uppercase text-[#070709] bg-[#E5A93C] hover:bg-[#F7D692] transition-all shadow-md shadow-[#E5A93C]/15 flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? 'Publishing Treatment...' : 'Publish Story Treatment'}</span>
          </button>

        </form>

      </div>
    </div>
  );
}
