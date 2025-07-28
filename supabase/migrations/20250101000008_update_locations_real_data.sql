-- Clear existing sample data
DELETE FROM location_contacts;
DELETE FROM location_services;
DELETE FROM locations;

-- Insert real PMC locations
INSERT INTO locations (name, address, city, postal_code, country, description, sort_order) VALUES
  ('PMC Bern', 'Sulgeneckstrasse 58, 3005 Bern', 'Bern', '3005', 'Switzerland', 'Our Bern location offers a welcoming environment for worship and fellowship in the Swiss capital.', 1),
  ('PMC Zürich', 'Neeracherstrasse 20, 8157 Dielsdorf', 'Dielsdorf', '8157', 'Switzerland', 'Our main church location serving the Zurich area with regular services and community activities.', 2),
  ('PMC Basel', 'Missionsstrasse 37, 4055 Basel', 'Basel', '4055', 'Switzerland', 'Located in the beautiful city of Basel, our church serves the community with regular Sunday services.', 3),
  ('PMC Schaffhausen', 'Address will come', 'Schaffhausen', '', 'Switzerland', 'Our Schaffhausen location - address details coming soon.', 4),
  ('PMC Luzern', 'Industriestrasse 13, 6010 Kriens', 'Kriens', '6010', 'Switzerland', 'Our Luzern location serving the central Switzerland region with Sunday services.', 5),
  ('PMC Solothurn', 'Bielstrasse 26, 4500 Solothurn', 'Solothurn', '4500', 'Switzerland', 'Our Solothurn location providing spiritual guidance and community fellowship.', 6),
  ('PMC Yverdon', 'Rue Pestalozzi 9, 1400 Yverdon-les-Bains', 'Yverdon-les-Bains', '1400', 'Switzerland', 'Our Yverdon location serving the French-speaking community in western Switzerland.', 7),
  ('PMC Fribourg', 'Rte de Moncor 2A, 1752 Villars-sur-Glane', 'Villars-sur-Glane', '1752', 'Switzerland', 'Our Fribourg location providing spiritual services to the Fribourg region.', 8),
  ('PMC Lausanne', 'Avenue des Boveresses 58, 1010 Lausanne', 'Lausanne', '1010', 'Switzerland', 'Our Lausanne location serving the French-speaking community with Sunday services.', 9),
  ('PMC Geneva', 'Rue Elisabeth-Baulacre 14, 1202 Genève', 'Genève', '1202', 'Switzerland', 'Our Geneva location serving the international community in Geneva.', 10);

-- Insert services for PMC Bern
INSERT INTO location_services (location_id, day, time, type, service_location, description, sort_order) 
SELECT id, 'Tuesday', '10:00 - 15:00', 'Women''s Prayer', 'Zoom', 'Weekly women''s prayer meeting via Zoom', 1
FROM locations WHERE name = 'PMC Bern';

INSERT INTO location_services (location_id, day, time, type, service_location, description, sort_order) 
SELECT id, 'Wednesday', '19:00 - 20:30', 'Prayer', 'PMC Bern', 'Midweek prayer meeting at PMC Bern', 2
FROM locations WHERE name = 'PMC Bern';

INSERT INTO location_services (location_id, day, time, type, service_location, description, sort_order) 
SELECT id, 'Sunday', '09:30 - 12:30', 'Sunday Service', 'PMC Bern', 'Main Sunday worship service', 3
FROM locations WHERE name = 'PMC Bern';

-- Insert services for PMC Zürich
INSERT INTO location_services (location_id, day, time, type, service_location, description, sort_order) 
SELECT id, 'Tuesday', '19:00 - 20:00', 'Women''s Prayer', 'Zoom', 'Weekly women''s prayer meeting via Zoom', 1
FROM locations WHERE name = 'PMC Zürich';

INSERT INTO location_services (location_id, day, time, type, service_location, description, sort_order) 
SELECT id, 'Wednesday', '19:00 - 20:30', 'Prayer', 'PMC Zürich', 'Midweek prayer meeting at PMC Zürich', 2
FROM locations WHERE name = 'PMC Zürich';

INSERT INTO location_services (location_id, day, time, type, service_location, description, sort_order) 
SELECT id, 'Sunday', '09:30 - 12:30', 'Sunday Service', 'PMC Zürich', 'Main Sunday worship service', 3
FROM locations WHERE name = 'PMC Zürich';

-- Insert services for PMC Basel
INSERT INTO location_services (location_id, day, time, type, service_location, description, sort_order) 
SELECT id, 'Sunday', '14:00 - 16:30', 'Sunday Service', 'PMC Basel', 'Main Sunday worship service', 1
FROM locations WHERE name = 'PMC Basel';

-- Insert services for PMC Schaffhausen
INSERT INTO location_services (location_id, day, time, type, service_location, description, sort_order) 
SELECT id, 'Sunday', '14:00 - 16:30', 'Sunday Service', 'PMC Schaffhausen', 'Main Sunday worship service', 1
FROM locations WHERE name = 'PMC Schaffhausen';

-- Insert services for PMC Luzern
INSERT INTO location_services (location_id, day, time, type, service_location, description, sort_order) 
SELECT id, 'Sunday', '14:00 - 16:30', 'Sunday Service', 'PMC Luzern', 'Main Sunday worship service', 1
FROM locations WHERE name = 'PMC Luzern';

-- Insert services for PMC Solothurn
INSERT INTO location_services (location_id, day, time, type, service_location, description, sort_order) 
SELECT id, 'Sunday', '14:00 - 17:00', 'Sunday Service', 'PMC Solothurn', 'Main Sunday worship service', 1
FROM locations WHERE name = 'PMC Solothurn';

-- Insert services for PMC Yverdon
INSERT INTO location_services (location_id, day, time, type, service_location, description, sort_order) 
SELECT id, 'Sunday', '15:30 - 17:30', 'Sunday Service', 'PMC Yverdon', 'Main Sunday worship service', 1
FROM locations WHERE name = 'PMC Yverdon';

-- Insert services for PMC Fribourg
INSERT INTO location_services (location_id, day, time, type, service_location, description, sort_order) 
SELECT id, 'Sunday', '17:30 - 20:00', 'Sunday Service', 'PMC Fribourg', 'Main Sunday worship service', 1
FROM locations WHERE name = 'PMC Fribourg';

-- Insert services for PMC Lausanne
INSERT INTO location_services (location_id, day, time, type, service_location, description, sort_order) 
SELECT id, 'Sunday', '14:30 - 16:00', 'Sunday Service', 'PMC Lausanne', 'Main Sunday worship service', 1
FROM locations WHERE name = 'PMC Lausanne';

-- Insert services for PMC Geneva
INSERT INTO location_services (location_id, day, time, type, service_location, description, sort_order) 
SELECT id, 'Sunday', '14:30 - 16:00', 'Sunday Service', 'PMC Geneva', 'Main Sunday worship service', 1
FROM locations WHERE name = 'PMC Geneva';

-- Insert contacts for PMC Bern
INSERT INTO location_contacts (location_id, name, phone, role, is_primary, sort_order) 
SELECT id, 'Pastor Joshua', '079 375 68 32', 'Senior Pastor', true, 1
FROM locations WHERE name = 'PMC Bern';

-- Insert contacts for PMC Zürich
INSERT INTO location_contacts (location_id, name, phone, role, is_primary, sort_order) 
SELECT id, 'Pastor Joshua', '079 375 68 32', 'Senior Pastor', true, 1
FROM locations WHERE name = 'PMC Zürich';

INSERT INTO location_contacts (location_id, name, phone, role, is_primary, sort_order) 
SELECT id, 'Bro. Logan', '076 451 58 82', 'Assistant Pastor', false, 2
FROM locations WHERE name = 'PMC Zürich';

-- Insert contacts for PMC Basel
INSERT INTO location_contacts (location_id, name, phone, role, is_primary, sort_order) 
SELECT id, 'Pastor Joseph', '079 512 73 18', 'Senior Pastor', true, 1
FROM locations WHERE name = 'PMC Basel';

INSERT INTO location_contacts (location_id, name, phone, role, is_primary, sort_order) 
SELECT id, 'Bro. Boaz', '077 966 16 44', 'Assistant Pastor', false, 2
FROM locations WHERE name = 'PMC Basel';

-- Insert contacts for PMC Schaffhausen
INSERT INTO location_contacts (location_id, name, phone, role, is_primary, sort_order) 
SELECT id, 'Bro. Boaz', '076 451 58 82', 'Pastor', true, 1
FROM locations WHERE name = 'PMC Schaffhausen';

-- Insert contacts for PMC Luzern
INSERT INTO location_contacts (location_id, name, phone, role, is_primary, sort_order) 
SELECT id, 'Bro. Sri', '076 414 65 69', 'Pastor', true, 1
FROM locations WHERE name = 'PMC Luzern';

INSERT INTO location_contacts (location_id, name, phone, role, is_primary, sort_order) 
SELECT id, 'Bro. Pushparajah', '076 414 65 69', 'Assistant Pastor', false, 2
FROM locations WHERE name = 'PMC Luzern';

-- Insert contacts for PMC Solothurn
INSERT INTO location_contacts (location_id, name, phone, role, is_primary, sort_order) 
SELECT id, 'Bro. Devananth', '079 517 51 96', 'Pastor', true, 1
FROM locations WHERE name = 'PMC Solothurn';

INSERT INTO location_contacts (location_id, name, phone, role, is_primary, sort_order) 
SELECT id, 'Bro. Denesh', '079 605 89 60', 'Assistant Pastor', false, 2
FROM locations WHERE name = 'PMC Solothurn';

-- Insert contacts for PMC Yverdon
INSERT INTO location_contacts (location_id, name, phone, role, is_primary, sort_order) 
SELECT id, 'Pastor Anton', '079 598 36 17', 'Senior Pastor', true, 1
FROM locations WHERE name = 'PMC Yverdon';

-- Insert contacts for PMC Fribourg
INSERT INTO location_contacts (location_id, name, phone, role, is_primary, sort_order) 
SELECT id, 'Pastor Anton', '079 598 36 17', 'Senior Pastor', true, 1
FROM locations WHERE name = 'PMC Fribourg';

-- Insert contacts for PMC Lausanne
INSERT INTO location_contacts (location_id, name, phone, role, is_primary, sort_order) 
SELECT id, 'Pastor Caleb', '078 176 17 36', 'Senior Pastor', true, 1
FROM locations WHERE name = 'PMC Lausanne';

-- Insert contacts for PMC Geneva
INSERT INTO location_contacts (location_id, name, phone, role, is_primary, sort_order) 
SELECT id, 'Pastor Balendra', '+33 6 23 35 23 35', 'Senior Pastor', true, 1
FROM locations WHERE name = 'PMC Geneva'; 