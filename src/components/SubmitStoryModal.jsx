import React, { useState } from 'react';
import { X, PlusCircle, Sparkles, Send, Upload, Image as ImageIcon, Check } from 'lucide-react';

const COVER_PRESETS = [
  {
    name: 'Mythological Fire',
    url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1000&auto=format&fit=crop'
  },
  {
    name: 'Desert Falcon',
    url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1000&auto=format&fit=crop'
  },
  {
    name: 'Temple Ruins',
    url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1000&auto=format&fit=crop'
  },
  {
    name: 'Forest Neo-Noir',
    url: 'https://images.unsplash.com/photo-1511497584788-8767611136f6?q=80&w=1000&auto=format&fit=crop'
  }
];

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
    poster_url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1000&auto=format&fit=crop',
    full_script: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadFileName, setUploadFileName] = useState('');

  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  // Convert uploaded image file to Base64 data URL
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('poster_url', reader.result);
      };
      reader.readAsDataURL(file);
    }
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
            Share your story concept with the TFI WritersClub community with cover poster art & dream casting.
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

          {/* Story Cover Image Upload / Selection */}
          <div className="bg-[#070709] p-3.5 sm:p-4 rounded-lg border border-[#22222E] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-[#E5A93C] tracking-widest flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5" />
                Story Cover Poster Art:
              </span>
              {uploadFileName && (
                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  {uploadFileName}
                </span>
              )}
            </div>

            {/* Upload File or Image URL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
              {/* File Upload Button */}
              <label className="flex items-center justify-center gap-2 p-3 bg-[#121218] hover:bg-[#1A1A24] border border-[#22222E] hover:border-[#E5A93C] rounded-lg text-xs font-bold text-slate-200 cursor-pointer transition-colors">
                <Upload className="w-4 h-4 text-[#E5A93C]" />
                <span>Upload Cover Image File</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {/* Paste Image URL */}
              <input
                type="url"
                placeholder="Or paste cover image URL..."
                value={formData.poster_url}
                onChange={(e) => {
                  setUploadFileName('');
                  handleChange('poster_url', e.target.value);
                }}
                className="w-full bg-[#121218] border border-[#22222E] rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#E5A93C]"
              />
            </div>

            {/* Quick Cinema Presets */}
            <div className="space-y-1">
              <span className="text-[9px] uppercase font-bold text-slate-500 tracking-widest block">
                Or select cinematic cover preset:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {COVER_PRESETS.map((preset, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => {
                      setUploadFileName('');
                      handleChange('poster_url', preset.url);
                    }}
                    className={`relative rounded-md overflow-hidden h-14 border transition-all cursor-pointer ${
                      formData.poster_url === preset.url
                        ? 'border-[#E5A93C] ring-1 ring-[#E5A93C]'
                        : 'border-[#22222E] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-1">
                      <span className="text-[9px] font-bold text-white text-center leading-tight">
                        {preset.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Cover Preview */}
            {formData.poster_url && (
              <div className="pt-1 flex items-center gap-3 bg-[#121218] p-2 rounded-lg border border-[#22222E]">
                <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0 bg-slate-900">
                  <img
                    src={formData.poster_url}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-xs">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Live Cover Preview</span>
                  <span className="text-slate-300 font-semibold truncate block max-w-xs">{formData.title || 'Story Title'}</span>
                </div>
              </div>
            )}
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
