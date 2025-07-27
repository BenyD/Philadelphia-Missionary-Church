-- Update existing events with future dates
UPDATE events SET 
  date = '2025-01-26',
  time = '10:00:00'
WHERE title = 'Sunday Worship Service';

UPDATE events SET 
  date = '2025-01-27',
  time = '18:00:00'
WHERE title = 'Youth Group Meeting';

UPDATE events SET 
  date = '2025-07-29',
  time = '19:00:00'
WHERE title = 'Prayer Meeting';

UPDATE events SET 
  date = '2025-08-30',
  time = '20:00:00'
WHERE title = 'Bible Study';

-- Add new events if they don't exist
INSERT INTO events (title, description, date, time, location, is_featured) 
SELECT 'Community Outreach', 'Join us for our monthly community outreach program. We will be serving meals and providing support to those in need.', '2025-02-02', '14:00:00', 'Community Center', true
WHERE NOT EXISTS (SELECT 1 FROM events WHERE title = 'Community Outreach');

INSERT INTO events (title, description, date, time, location, is_featured) 
SELECT 'Choir Practice', 'Weekly choir practice for our church choir. All voices welcome, no experience necessary.', '2025-02-03', '19:30:00', 'Choir Room', false
WHERE NOT EXISTS (SELECT 1 FROM events WHERE title = 'Choir Practice'); 