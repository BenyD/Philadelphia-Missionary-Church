-- Remove image_url column from events table
ALTER TABLE events DROP COLUMN IF EXISTS image_url; 