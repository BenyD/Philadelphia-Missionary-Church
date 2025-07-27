-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'postponed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create policies for events
-- Allow all users to read active events
CREATE POLICY "Allow public read access to active events" ON events
  FOR SELECT USING (status = 'active');

-- Allow authenticated users to read all events (for admin)
CREATE POLICY "Allow authenticated users to read all events" ON events
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to insert events (for admin)
CREATE POLICY "Allow authenticated users to insert events" ON events
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update events (for admin)
CREATE POLICY "Allow authenticated users to update events" ON events
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete events (for admin)
CREATE POLICY "Allow authenticated users to delete events" ON events
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_featured ON events(is_featured);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample events
INSERT INTO events (title, description, date, time, location, is_featured) VALUES
(
  'Sunday Worship Service',
  'Join us for our weekly Sunday worship service. All are welcome to experience the love of Christ through music, prayer, and fellowship.',
  '2025-01-26',
  '10:00:00',
  'Main Sanctuary',
  true
),
(
  'Youth Group Meeting',
  'Weekly youth group meeting for teenagers. Fun activities, Bible study, and fellowship in a safe and welcoming environment.',
  '2025-01-27',
  '18:00:00',
  'Youth Hall',
  false
),
(
  'Prayer Meeting',
  'Community prayer meeting. Come together to pray for our church, community, and world. All prayer requests welcome.',
  '2025-01-29',
  '19:00:00',
  'Prayer Room',
  false
),
(
  'Bible Study',
  'Weekly Bible study session. Deep dive into scripture with discussion and fellowship. Open to all ages and experience levels.',
  '2025-01-30',
  '20:00:00',
  'Fellowship Hall',
  true
),
(
  'Community Outreach',
  'Join us for our monthly community outreach program. We will be serving meals and providing support to those in need.',
  '2025-02-02',
  '14:00:00',
  'Community Center',
  true
),
(
  'Choir Practice',
  'Weekly choir practice for our church choir. All voices welcome, no experience necessary.',
  '2025-02-03',
  '19:30:00',
  'Choir Room',
  false
); 