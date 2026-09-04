import { createClient } from '@supabase/supabase-js';
import { INITIAL_STORIES } from '../data/mockStories';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey);
};

const LOCAL_STORAGE_STORIES_KEY = 'tfi_writersclub_stories_v2';

// Helper to get local stored stories or fallback to INITIAL_STORIES
const getStoredStories = () => {
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_STORIES_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
  return INITIAL_STORIES;
};

// Save stories to local storage
const saveStoredStories = (stories) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_STORIES_KEY, JSON.stringify(stories));
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
};

/**
 * Fetch all stories (Supabase or Local Fallback)
 */
export async function fetchStories() {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return { data, isLive: true };
      }
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to local data:', err);
    }
  }

  // Fallback to local stored stories
  const localData = getStoredStories();
  return { data: localData, isLive: Boolean(supabase) };
}

/**
 * Submit a fan rating for a story
 */
export async function submitRating(storyId, ratingObj) {
  const overall = Number(((ratingObj.concept + ratingObj.screenplay + ratingObj.mass_value) / 3).toFixed(1));

  if (supabase) {
    try {
      const { error } = await supabase
        .from('ratings')
        .insert([
          {
            story_id: storyId,
            concept_score: ratingObj.concept,
            screenplay_score: ratingObj.screenplay,
            mass_score: ratingObj.mass_value,
            overall_score: overall,
            reaction_tags: ratingObj.tags,
            comment: ratingObj.comment,
            created_at: new Date().toISOString()
          }
        ]);

      if (!error) {
        return { success: true, isLive: true };
      }
    } catch (e) {
      console.warn('Supabase rating insert failed, applying locally:', e);
    }
  }

  // Local fallback update
  const stories = getStoredStories();
  const index = stories.findIndex(s => s.id === storyId);
  if (index !== -1) {
    const current = stories[index];
    const prevCount = current.ratings_count || 10;
    const newCount = prevCount + 1;

    // Recalculate rolling scores
    const newConcept = Number(((current.scores.concept * prevCount + ratingObj.concept) / newCount).toFixed(1));
    const newScreenplay = Number(((current.scores.screenplay * prevCount + ratingObj.screenplay) / newCount).toFixed(1));
    const newMass = Number(((current.scores.mass_value * prevCount + ratingObj.mass_value) / newCount).toFixed(1));
    const newOverall = Number(((newConcept + newScreenplay + newMass) / 3).toFixed(1));

    stories[index] = {
      ...current,
      ratings_count: newCount,
      scores: {
        concept: newConcept,
        screenplay: newScreenplay,
        mass_value: newMass,
        overall: newOverall
      }
    };
    saveStoredStories(stories);
  }

  return { success: true, isLive: false, overallScore: overall };
}

/**
 * Submit a new community story treatment
 */
export async function createStory(newStoryData) {
  const storyPayload = {
    id: `story-${Date.now()}`,
    title: newStoryData.title,
    tagline: newStoryData.tagline || 'A TFI Cinema Concept',
    logline: newStoryData.logline,
    genre: newStoryData.genre,
    is_weekly_top: false,
    author_name: newStoryData.author_name || 'Anonymous Writer',
    created_at: new Date().toISOString(),
    poster_url: newStoryData.poster_url || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop",
    hero_image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
    dream_cast: {
      hero: newStoryData.hero || 'Dream Hero',
      hero_role: newStoryData.hero_role || 'Lead Protagonist',
      director: newStoryData.director || 'Visionary Director',
      music: newStoryData.music || 'Music Maestro'
    },
    scores: {
      concept: 8.5,
      screenplay: 8.0,
      mass_value: 8.5,
      overall: 8.3
    },
    ratings_count: 1,
    tags: newStoryData.tags || ["⚡ Interval Bang", "🍿 Mass Value"],
    full_script: newStoryData.full_script
  };

  if (supabase) {
    try {
      const { data, error } = await supabase.from('stories').insert([storyPayload]).select();
      if (!error && data) {
        return { success: true, story: data[0], isLive: true };
      }
    } catch (e) {
      console.warn('Supabase create story error, falling back locally:', e);
    }
  }

  const stories = getStoredStories();
  stories.unshift(storyPayload);
  saveStoredStories(stories);
  return { success: true, story: storyPayload, isLive: false };
}

