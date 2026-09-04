import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import WeeklyHero from './components/WeeklyHero';
import StoryFeed from './components/StoryFeed';
import HotTakePoll from './components/HotTakePoll';
import PodiumLeaderboard from './components/PodiumLeaderboard';
import ScriptReader from './components/ScriptReader';
import RatingSystem from './components/RatingSystem';
import SubmitStoryModal from './components/SubmitStoryModal';
import { fetchStories, submitRating, createStory, isSupabaseConfigured } from './lib/supabase';
import { Film, Bookmark, Sparkles, PenTool, Flame } from 'lucide-react';

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
    <div className="min-h-screen bg-[#0a0908] text-[#f4efe4] font-sans selection:bg-[#e14418]/30 relative pb-16 md:pb-0">
      
      {/* Film Grain Texture Fixed Overlay */}
      <div className="grain" aria-hidden="true" />

      {/* Floating Navbar */}
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
        <div className="fixed top-24 right-4 z-50 p-4 rounded-2xl bg-gradient-to-r from-[#ff6a35] to-[#e14418] text-[#fff6ee] font-bold shadow-2xl flex items-center gap-3 animate-slideDown">
          <Sparkles className="w-5 h-5 flex-shrink-0" />
          <div className="text-xs">
            <p className="font-extrabold uppercase tracking-wider">Treatment Published!</p>
            <p className="font-medium text-[#fff6ee]/90">Your story is live and visible on KATHA.</p>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-12">
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-28 space-y-4">
            <div className="w-10 h-10 rounded-full border-2 border-[#e14418] border-t-transparent animate-spin" />
            <p className="font-display text-[#7d7364] text-xs tracking-widest uppercase">Opening KATHA Vault...</p>
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
                <PodiumLeaderboard
                  stories={stories}
                  onReadScript={(s) => setReadingStory(s)}
                />
              </div>
            )}

            {/* VIEW 2: EXPLORE FEED (HOME) */}
            {activeTab === 'feed' && (
              <div className="space-y-12 animate-fadeIn">
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

                {/* Interactive TFI Hot Take Poll */}
                <HotTakePoll />

                {/* Story of the Week Podium Leaderboard */}
                <PodiumLeaderboard
                  stories={stories}
                  onReadScript={(s) => setReadingStory(s)}
                />
              </div>
            )}

            {/* VIEW 3: SAVED BOOKMARKS TAB */}
            {activeTab === 'bookmarks' && (
              <div className="space-y-6 animate-fadeIn pt-20">
                <div className="border-b border-[rgba(244,238,227,0.08)] pb-4">
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#f4efe4] flex items-center gap-2 tracking-tight">
                    <Bookmark className="w-6 h-6 text-[#ff6a35] fill-[#ff6a35]" />
                    SAVED TREATMENTS ({bookmarkedStories.length})
                  </h2>
                  <p className="text-[#7d7364] text-sm mt-1">
                    Your personal vault of bookmarked TFI script concepts.
                  </p>
                </div>

                {bookmarkedStories.length === 0 ? (
                  <div className="text-center py-20 bg-[#161310] border border-[rgba(244,238,227,0.08)] rounded-2xl space-y-4">
                    <Bookmark className="w-10 h-10 text-[#7d7364] mx-auto" />
                    <p className="text-[#b8ac9a] text-sm font-medium">No saved stories yet.</p>
                    <button
                      onClick={() => setActiveTab('feed')}
                      className="px-6 py-2.5 rounded-full text-xs font-bold text-[#fff5ee] bg-[#e14418]"
                    >
                      Browse Stories
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

        {/* WRITE CTA BANNER */}
        <div className="my-16 rounded-3xl p-10 sm:p-16 bg-[radial-gradient(ellipse_60%_100%_at_20%_0%,rgba(225,68,24,0.25),transparent_60%),linear-gradient(155deg,#1e1a15,#100d0a)] border border-[rgba(244,238,227,0.14)] text-center relative overflow-hidden space-y-4">
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#f4efe4] tracking-tight">
            Every blockbuster starts as an idea.
          </h2>
          <p className="text-[#b8ac9a] text-base sm:text-lg max-w-md mx-auto">
            You've got a story TFI needs to hear. Publish it, and let the fans decide if it's worth the big screen.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setIsSubmitOpen(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ff6a35] to-[#e14418] text-[#fff6ee] font-bold text-sm sm:text-base px-8 py-4 rounded-full shadow-xl shadow-[#e14418]/50 hover:-translate-y-1 transition-transform cursor-pointer"
            >
              <PenTool className="w-5 h-5" />
              <span>Publish to KATHA</span>
            </button>
          </div>
        </div>

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

      {/* KATHA Footer */}
      <footer className="w-full border-t border-[rgba(244,238,227,0.08)] bg-[#0a0908] py-12">
        <div className="max-w-[1240px] mx-auto px-6 space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
            <div>
              <a href="#" className="font-display font-extrabold text-xl tracking-tight text-[#f4efe4] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-[2px] bg-[#e14418] rotate-45" />
                KATHA
              </a>
              <p className="font-telugu text-base text-[#b8ac9a] mt-2">
                నీ కథ. మన తీర్పు.
              </p>
            </div>
            <div className="flex gap-10 text-xs font-semibold text-[#b8ac9a]">
              <div>
                <h4 className="text-[10px] text-[#7d7364] uppercase tracking-widest font-bold mb-3">Explore</h4>
                <a href="#feed" onClick={() => setActiveTab('feed')} className="block hover:text-[#f4efe4] mb-2">Trending</a>
                <a href="#weekly" onClick={() => setActiveTab('weekly')} className="block hover:text-[#f4efe4]">Rankings</a>
              </div>
              <div>
                <h4 className="text-[10px] text-[#7d7364] uppercase tracking-widest font-bold mb-3">Community</h4>
                <button onClick={() => setIsSubmitOpen(true)} className="block hover:text-[#f4efe4] mb-2 cursor-pointer">Write a story</button>
                <a href="#leaderboard" onClick={() => setActiveTab('weekly')} className="block hover:text-[#f4efe4]">Story Podium</a>
              </div>
            </div>
          </div>
          <div className="text-xs text-[#7d7364] border-t border-[rgba(244,238,227,0.08)] pt-6">
            © {new Date().getFullYear()} KATHA. Fan casting and hot takes are community opinions and do not imply actual industry involvement.
          </div>
        </div>
      </footer>

    </div>
  );
}
