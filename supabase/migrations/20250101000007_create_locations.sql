-- Create locations table
CREATE TABLE IF NOT EXISTS locations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(255),
  postal_code VARCHAR(20),
  country VARCHAR(100) DEFAULT 'Switzerland',
  phone VARCHAR(50),
  email VARCHAR(255),
  website VARCHAR(255),
  image_url TEXT,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create services table for location services
CREATE TABLE IF NOT EXISTS location_services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
  day VARCHAR(50) NOT NULL,
  time VARCHAR(50) NOT NULL,
  type VARCHAR(100) NOT NULL,
  service_location VARCHAR(255),
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contacts table for location contacts
CREATE TABLE IF NOT EXISTS location_contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  email VARCHAR(255),
  role VARCHAR(100),
  is_primary BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_locations_updated_at 
  BEFORE UPDATE ON locations 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_location_services_updated_at 
  BEFORE UPDATE ON location_services 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_location_contacts_updated_at 
  BEFORE UPDATE ON location_contacts 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE location_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE location_contacts ENABLE ROW LEVEL SECURITY;

-- Create policies for locations table
-- Allow public read access to active locations
CREATE POLICY "Allow public read access to active locations" ON locations
  FOR SELECT USING (is_active = true);

-- Allow authenticated users to read all locations (for admin dashboard)
CREATE POLICY "Allow authenticated users to read all locations" ON locations
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to insert locations
CREATE POLICY "Allow authenticated users to insert locations" ON locations
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update locations
CREATE POLICY "Allow authenticated users to update locations" ON locations
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete locations
CREATE POLICY "Allow authenticated users to delete locations" ON locations
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for location_services table
-- Allow public read access to active services
CREATE POLICY "Allow public read access to active location services" ON location_services
  FOR SELECT USING (is_active = true);

-- Allow authenticated users to read all services
CREATE POLICY "Allow authenticated users to read all location services" ON location_services
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to insert services
CREATE POLICY "Allow authenticated users to insert location services" ON location_services
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update services
CREATE POLICY "Allow authenticated users to update location services" ON location_services
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete services
CREATE POLICY "Allow authenticated users to delete location services" ON location_services
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for location_contacts table
-- Allow public read access to active contacts
CREATE POLICY "Allow public read access to active location contacts" ON location_contacts
  FOR SELECT USING (is_active = true);

-- Allow authenticated users to read all contacts
CREATE POLICY "Allow authenticated users to read all location contacts" ON location_contacts
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to insert contacts
CREATE POLICY "Allow authenticated users to insert location contacts" ON location_contacts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update contacts
CREATE POLICY "Allow authenticated users to update location contacts" ON location_contacts
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete contacts
CREATE POLICY "Allow authenticated users to delete location contacts" ON location_contacts
  FOR DELETE USING (auth.role() = 'authenticated');

-- Insert sample locations data
INSERT INTO locations (name, address, city, postal_code, phone, email, description, sort_order) VALUES
  ('PMC Zurich', 'Bahnhofstrasse 123, 8001 Zurich', 'Zurich', '8001', '+41 44 123 4567', 'zurich@pmc.ch', 'Our main church location in the heart of Zurich. Join us for Sunday services, prayer meetings, and community events.', 1),
  ('PMC Geneva', 'Rue du Mont-Blanc 45, 1201 Geneva', 'Geneva', '1201', '+41 22 987 6543', 'geneva@pmc.ch', 'Located in the beautiful city of Geneva, our church serves the French-speaking community with regular services and activities.', 2),
  ('PMC Bern', 'Marktgasse 67, 3011 Bern', 'Bern', '3011', '+41 31 456 7890', 'bern@pmc.ch', 'Our Bern location offers a welcoming environment for worship and fellowship in the Swiss capital.', 3);

-- Insert sample services for Zurich
INSERT INTO location_services (location_id, day, time, type, service_location, description, sort_order) 
SELECT id, 'Sunday', '10:00 AM', 'Sunday Worship Service', 'Main Sanctuary', 'Our main Sunday worship service with praise, prayer, and preaching.', 1
FROM locations WHERE name = 'PMC Zurich';

INSERT INTO location_services (location_id, day, time, type, service_location, description, sort_order) 
SELECT id, 'Wednesday', '7:00 PM', 'Prayer Meeting', 'Prayer Room', 'Midweek prayer meeting for the church and community needs.', 2
FROM locations WHERE name = 'PMC Zurich';

INSERT INTO location_services (location_id, day, time, type, service_location, description, sort_order) 
SELECT id, 'Friday', '6:30 PM', 'Youth Group', 'Youth Hall', 'Weekly youth group meeting with activities, Bible study, and fellowship.', 3
FROM locations WHERE name = 'PMC Zurich';

-- Insert sample services for Geneva
INSERT INTO location_services (location_id, day, time, type, service_location, description, sort_order) 
SELECT id, 'Sunday', '11:00 AM', 'Sunday Worship Service', 'Main Hall', 'Sunday worship service in French and English.', 1
FROM locations WHERE name = 'PMC Geneva';

INSERT INTO location_services (location_id, day, time, type, service_location, description, sort_order) 
SELECT id, 'Tuesday', '7:30 PM', 'Bible Study', 'Conference Room', 'Weekly Bible study and discussion group.', 2
FROM locations WHERE name = 'PMC Geneva';

-- Insert sample services for Bern
INSERT INTO location_services (location_id, day, time, type, service_location, description, sort_order) 
SELECT id, 'Sunday', '9:30 AM', 'Sunday Worship Service', 'Main Auditorium', 'Sunday morning worship service with contemporary music and teaching.', 1
FROM locations WHERE name = 'PMC Bern';

INSERT INTO location_services (location_id, day, time, type, service_location, description, sort_order) 
SELECT id, 'Thursday', '8:00 PM', 'Prayer Meeting', 'Prayer Hall', 'Evening prayer meeting for the church and community.', 2
FROM locations WHERE name = 'PMC Bern';

-- Insert sample contacts for Zurich
INSERT INTO location_contacts (location_id, name, phone, email, role, is_primary, sort_order) 
SELECT id, 'Pastor Michael Schmidt', '+41 44 123 4567', 'pastor.michael@pmc.ch', 'Senior Pastor', true, 1
FROM locations WHERE name = 'PMC Zurich';

INSERT INTO location_contacts (location_id, name, phone, email, role, is_primary, sort_order) 
SELECT id, 'Sarah Johnson', '+41 44 123 4568', 'sarah.johnson@pmc.ch', 'Administrator', false, 2
FROM locations WHERE name = 'PMC Zurich';

-- Insert sample contacts for Geneva
INSERT INTO location_contacts (location_id, name, phone, email, role, is_primary, sort_order) 
SELECT id, 'Pastor Jean-Pierre Dubois', '+41 22 987 6543', 'pastor.jean@pmc.ch', 'Senior Pastor', true, 1
FROM locations WHERE name = 'PMC Geneva';

INSERT INTO location_contacts (location_id, name, phone, email, role, is_primary, sort_order) 
SELECT id, 'Marie Laurent', '+41 22 987 6544', 'marie.laurent@pmc.ch', 'Youth Coordinator', false, 2
FROM locations WHERE name = 'PMC Geneva';

-- Insert sample contacts for Bern
INSERT INTO location_contacts (location_id, name, phone, email, role, is_primary, sort_order) 
SELECT id, 'Pastor Hans Mueller', '+41 31 456 7890', 'pastor.hans@pmc.ch', 'Senior Pastor', true, 1
FROM locations WHERE name = 'PMC Bern';

INSERT INTO location_contacts (location_id, name, phone, email, role, is_primary, sort_order) 
SELECT id, 'Anna Weber', '+41 31 456 7891', 'anna.weber@pmc.ch', 'Children Ministry', false, 2
FROM locations WHERE name = 'PMC Bern'; 