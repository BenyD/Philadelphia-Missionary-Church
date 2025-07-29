-- Add Google Maps URL field to locations table
ALTER TABLE locations ADD COLUMN google_maps_url TEXT;

-- Add comment to explain the field
COMMENT ON COLUMN locations.google_maps_url IS 'Google Maps URL for directions to this location';

-- Update existing locations with sample Google Maps URLs
UPDATE locations SET google_maps_url = 'https://maps.google.com/?q=Bahnhofstrasse+123,+8001+Zurich,+Switzerland' WHERE name = 'PMC Zurich';
UPDATE locations SET google_maps_url = 'https://maps.google.com/?q=Rue+du+Mont-Blanc+45,+1201+Geneva,+Switzerland' WHERE name = 'PMC Geneva';
UPDATE locations SET google_maps_url = 'https://maps.google.com/?q=Marktgasse+67,+3011+Bern,+Switzerland' WHERE name = 'PMC Bern'; 