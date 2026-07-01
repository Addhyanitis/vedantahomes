
ALTER TABLE public.company_info
  ADD COLUMN IF NOT EXISTS owner_name text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS owner_title text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS owner_bio text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS owner_image_url text NOT NULL DEFAULT '';
