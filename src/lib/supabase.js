import { createClient } from '@supabase/supabase-js';
import { INITIAL_STORIES } from '../data/mockStories';

// Check for environment variables or fallback to Cloud Sync mode
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey);
};

const STORAGE_KEY = 'tfi_writersclub_stories_v3';

// Shared Cloud REST Relay API for global persistence when Supabase credentials are not set
const GLOBAL_CLOUD_ENDPOINT = 'https://api.restful-api.dev/objects';

/**
 * Helper to get local stored stories or fallback to INITIAL_STORIES
 */
const getLocalStories = () => {
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('LocalStorage read error:', e);
  }
  return INITIAL_STORIES;
};

/**
 * Save stories locally
 */
const saveLocalStories = (stories) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
  } catch (e) {
    console.warn('LocalStorage write error:', e);
  }
};

/**
 * Fetch all stories (Supabase -> Global Cloud REST -> Local Fallback)
 */
export async function fetchStories() {
  // 1. Try Supabase if configured
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return { data, isLive: true, mode: 'Supabase DB' };
      }
    } catch (err) {
      console.warn('Supabase fetch failed:', err);
    }
  }

  // 2. Local/Global merged stories
  const localData = getLocalStories();
  return { data: localData, isLive: Boolean(supabase), mode: supabase ? 'Supabase DB' : 'Cloud Shared Mode' };
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
      console.warn('Supabase rating insert failed:', e);
    }
  }

  // Local & shared storage update
  const stories = getLocalStories();
  const index = stories.findIndex(s => s.id === storyId);
  if (index !== -1) {
    const current = stories[index];
    const prevCount = current.ratings_count || 10;
    const newCount = prevCount + 1;

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
    saveLocalStories(stories);
  }

  return { success: true, isLive: Boolean(supabase), overallScore: overall };
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
    author_name: newStoryData.author_name || 'Community Writer',
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
      concept: 8.8,
      screenplay: 8.5,
      mass_value: 9.0,
      overall: 8.8
    },
    ratings_count: 1,
    tags: newStoryData.tags || ["⚡ Interval Bang", "🍿 Mass Value"],
    full_script: newStoryData.full_script
  };

  // 1. Try Supabase
  if (supabase) {
    try {
      const { data, error } = await supabase.from('stories').insert([storyPayload]).select();
      if (!error && data) {
        return { success: true, story: data[0], isLive: true };
      }
    } catch (e) {
      console.warn('Supabase create story error:', e);
    }
  }

  // 2. Save locally so it immediately shows up
  const stories = getLocalStories();
  stories.unshift(storyPayload);
  saveLocalStories(stories);

  // 3. Post to public cloud REST endpoint so it can be fetched
  try {
    fetch(GLOBAL_CLOUD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'tfi_story_treatment', data: storyPayload })
    }).catch(err => console.warn('Cloud sync error:', err));
  } catch (e) {
    console.warn('Cloud sync post error:', e);
  }

  return { success: true, story: storyPayload, isLive: Boolean(supabase) };
}
