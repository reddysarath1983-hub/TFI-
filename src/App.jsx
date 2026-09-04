import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import WeeklyHero from './components/WeeklyHero';
import StoryFeed from './components/StoryFeed';
import ScriptReader from './components/ScriptReader';
import RatingSystem from './components/RatingSystem';
import SubmitStoryModal from './components/SubmitStoryModal';
import { fetchStories, submitRating, createStory, isSupabaseConfigured } from './lib/supabase';
import { Film, Trophy, Bookmark, Sparkles, Plus, Star, ShieldCheck, Database, Info } from 'lucide-react';

export default function App() {
  const [stories, setStories] = useState([]);
  const [isLiveSupabase, setIsLiveSupabase] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Navigation & Search State
  const [activeTab, setActiveTab] = useState('feed'); // 'feed', 'weekly', 'bookmarks'
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [readingStory, setReadingStory] = useState(null);
  const [ratingStory, setRatingStory] = useState(null);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [showSyncNotification, setShowSyncNotification] = useState(false);

  // Saved Bookmarks (localStorage)
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const stored = localStorage.getItem('tfi_saved_story_ids');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  const isConfigured = isSupabaseConfigured();

  // Load Data function
  async function loadData(showSpinner = false) {
    if (showSpinner) setLoading(true);
    const res = await fetchStories();
    setStories(res.data);
    setIsLiveSupabase(res.isLive);
    if (showSpinner) setLoading(false);
  }

  // Initial Data Load & Auto-polling every 4 seconds for instant global updates
  useEffect(() => {
    loadData(true);

    const pollInterval = setInterval(() => {
      loadData(false);
    }, 4000);

    return () => clearInterval(pollInterval);
  }, []);

  // Save Bookmarks to localStorage
  const handleToggleBookmark = (storyId) => {
    let updated;
    if (savedIds.includes(storyId)) {
      updated = savedIds.filter(id => id !== storyId);
    } else {
      updated = [...savedIds, storyId];
    }
    setSavedIds(updated);
    try {
      localStorage.setItem('tfi_saved_story_ids', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
  };

  // Submit Rating Handler
  const handleRatingSubmit = async (storyId, ratingData) => {
    await submitRating(storyId, ratingData);
    await loadData(false);
  };

  // Create Story Handler
  const handleCreateStory = async (storyData) => {
    await createStory(storyData);
    await loadData(false);
    setShowSyncNotification(true);
    setTimeout(() => setShowSyncNotification(false), 5000);
  };

  // Find Top Weekly Story
  const weeklyTopStory = stories.find(s => s.is_weekly_top) || stories[0];

  // Filter Stories by Search Query
  const filteredStories = stories.filter(story => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      story.title?.toLowerCase().includes(q) ||
      story.logline?.toLowerCase().includes(q) ||
      story.genre?.toLowerCase().includes(q) ||
      story.dream_cast?.hero?.toLowerCase().includes(q) ||
      story.dream_cast?.director?.toLowerCase().includes(q)
    );
  });

  // Bookmarked Stories List
  const bookmarkedStories = stories.filter(s => savedIds.includes(s.id));

  return (
    <div className="min-h-screen bg-[#09090B] text-slate-100 font-sans selection:bg-[#E5A93C]/30 flex flex-col justify-between pb-16 md:pb-0">
      
      {/* Top Sticky Header */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSubmit={() => setIsSubmitOpen(true)}
        savedCount={savedIds.length}
        isLiveSupabase={isLiveSupabase}
      />

      {/* Cloud Sync Toast Notification */}
      {showSyncNotification && (
        <div className="fixed top-24 right-4 z-50 p-4 rounded-xl bg-[#E5A93C] text-slate-950 font-bold shadow-2xl flex items-center gap-3 animate-slideDown">
          <Sparkles className="w-5 h-5 flex-shrink-0" />
          <div className="text-xs">
            <p className="font-extrabold uppercase text-slate-900">Treatment Published!</p>
            <p className="font-medium text-slate-950/80">Your story is live and visible in the Explore feed.</p>
          </div>
        </div>
      )}

      {/* Info Banner when running in Cloud Shared Mode */}
      {!isLiveSupabase && (
        <div className="bg-amber-950/40 border-b border-amber-800/50 px-4 py-2 text-center text-xs text-amber-300 flex items-center justify-center gap-2">
          <Info className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
          <span>
            <strong>Cloud Shared Mode Active:</strong> Submissions and ratings update live in your feed. To connect your private Supabase database, set <code className="bg-amber-900/60 px-1 py-0.5 rounded text-white">VITE_SUPABASE_URL</code> in <code className="bg-amber-900/60 px-1 py-0.5 rounded text-white">.env</code>.
          </span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 w-full space-y-8 sm:space-y-10">
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="w-12 h-12 rounded-full border-2 border-[#E5A93C] border-t-transparent animate-spin" />
            <p className="font-cinzel text-slate-400 text-sm tracking-wider">Loading TFI Cinema Vault...</p>
          </div>
        ) : (
          <>
            {/* VIEW 1: WEEKLY FEATURED TAB */}
            {activeTab === 'weekly' && (
              <div className="space-y-8 animate-fadeIn">
                <WeeklyHero
                  story={weeklyTopStory}
                  onReadScript={(s) => setReadingStory(s)}
                  onOpenRate={(s) => setRatingStory(s)}
                />
              </div>
            )}

            {/* VIEW 2: EXPLORE FEED (HOME) */}
            {activeTab === 'feed' && (
              <div className="space-y-8 sm:space-y-10 animate-fadeIn">
                {/* Hero Banner for Top Story if no search query active */}
                {!searchQuery && weeklyTopStory && (
                  <WeeklyHero
                    story={weeklyTopStory}
                    onReadScript={(s) => setReadingStory(s)}
                    onOpenRate={(s) => setRatingStory(s)}
                  />
                )}

                {/* Main Story Feed Grid */}
                <StoryFeed
                  stories={filteredStories}
                  onReadScript={(s) => setReadingStory(s)}
                  onOpenRate={(s) => setRatingStory(s)}
                  savedIds={savedIds}
                  onToggleBookmark={handleToggleBookmark}
                />
              </div>
            )}

            {/* VIEW 3: SAVED BOOKMARKS TAB */}
            {activeTab === 'bookmarks' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-[#27272A] pb-4">
                  <h2 className="font-cinzel text-2xl font-bold text-white flex items-center gap-2">
                    <Bookmark className="w-6 h-6 text-[#E5A93C] fill-[#E5A93C]" />
                    SAVED TREATMENTS ({bookmarkedStories.length})
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">
                    Your personal vault of bookmarked TFI script concepts.
                  </p>
                </div>

                {bookmarkedStories.length === 0 ? (
                  <div className="text-center py-20 glass-panel rounded-2xl border border-[#27272A] space-y-4">
                    <Bookmark className="w-12 h-12 text-slate-600 mx-auto" />
                    <p className="text-slate-400 text-base font-medium">No saved stories yet.</p>
                    <button
                      onClick={() => setActiveTab('feed')}
                      className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-[#E5A93C]"
                    >
                      Browse Treatments
                    </button>
                  </div>
                ) : (
                  <StoryFeed
                    stories={bookmarkedStories}
                    onReadScript={(s) => setReadingStory(s)}
                    onOpenRate={(s) => setRatingStory(s)}
                    savedIds={savedIds}
                    onToggleBookmark={handleToggleBookmark}
                  />
                )}
              </div>
            )}
          </>
        )}

      </main>

      {/* Screenplay Reader Modal */}
      {readingStory && (
        <ScriptReader
          story={readingStory}
          onClose={() => setReadingStory(null)}
          onOpenRate={(s) => setRatingStory(s)}
          isBookmarked={savedIds.includes(readingStory.id)}
          onToggleBookmark={handleToggleBookmark}
        />
      )}

      {/* Fan Rating Modal */}
      {ratingStory && (
        <RatingSystem
          story={ratingStory}
          onClose={() => setRatingStory(null)}
          onSubmitRating={handleRatingSubmit}
        />
      )}

      {/* Submit Story Modal */}
      {isSubmitOpen && (
        <SubmitStoryModal
          onClose={() => setIsSubmitOpen(false)}
          onSubmitStory={handleCreateStory}
        />
      )}

      {/* Cinema Footer */}
      <footer className="w-full border-t border-[#27272A] bg-[#09090B] py-10 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Film className="w-5 h-5 text-[#E5A93C]" />
            <span className="font-cinzel text-lg font-black tracking-wider text-white">
              TFI WRITERSCLUB
            </span>
          </div>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
            Your Story. <span className="text-[#E5A93C]">Our Ratings.</span> • Built for Telugu Cinema Storytellers
          </p>
          <div className="flex justify-center gap-6 text-xs text-slate-400 font-medium">
            <span>Weekly Top Banner</span>
            <span>•</span>
            <span>3-Slider Rating Index</span>
            <span>•</span>
            <span>Screenplay Reader Controls</span>
          </div>
          <p className="text-[11px] text-slate-600">
            © {new Date().getFullYear()} TFI WritersClub. Connected to Supabase DB or Cloud Sync.
          </p>
        </div>
      </footer>

    </div>
  );
}
