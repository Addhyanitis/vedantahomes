ALTER TABLE public.company_info
  ADD COLUMN IF NOT EXISTS hero_video_url text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS hero_poster_url text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS hero_video_enabled boolean NOT NULL DEFAULT true;