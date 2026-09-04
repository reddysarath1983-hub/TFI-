-- TFI WRITERSCLUB SUPABASE DATABASE SETUP
-- Copy and paste this script into your Supabase SQL Editor to create the required tables and policies.

-- 1. Create Stories Table
CREATE TABLE IF NOT EXISTS public.stories (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  tagline TEXT,
  logline TEXT NOT NULL,
  genre TEXT NOT NULL,
  is_weekly_top BOOLEAN DEFAULT FALSE,
  author_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  poster_url TEXT,
  hero_image TEXT,
  dream_cast JSONB DEFAULT '{}'::jsonb,
  scores JSONB DEFAULT '{"concept": 8.5, "screenplay": 8.5, "mass_value: 8.5, "overall": 8.5}'::jsonb,
  ratings_count INT DEFAULT 1,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  full_script TEXT NOT NULL
);

-- 2. Create Ratings Table
CREATE TABLE IF NOT EXISTS public.ratings (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  story_id TEXT REFERENCES public.stories(id) ON DELETE CASCADE,
  concept_score NUMERIC(3,1) NOT NULL,
  screenplay_score NUMERIC(3,1) NOT NULL,
  mass_score NUMERIC(3,1) NOT NULL,
  overall_score NUMERIC(3,1) NOT NULL,
  reaction_tags TEXT[],
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable Row Level Security (RLS) & Public Policies
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ratings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to stories
CREATE POLICY "Allow public read access on stories" ON public.stories
  FOR SELECT USING (true);

-- Allow public insert access on stories
CREATE POLICY "Allow public insert access on stories" ON public.stories
  FOR INSERT WITH CHECK (true);

-- Allow public read access on ratings
CREATE POLICY "Allow public read access on ratings" ON public.ratings
  FOR SELECT USING (true);

-- Allow public insert access on ratings
CREATE POLICY "Allow public insert access on ratings" ON public.ratings
  FOR INSERT WITH CHECK (true);
