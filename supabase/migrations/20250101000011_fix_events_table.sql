-- Add missing is_active field to events table
ALTER TABLE events ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Update existing events to be active
UPDATE events SET is_active = true WHERE is_active IS NULL;

-- Fix RLS policies for events table
-- Drop existing policies
DROP POLICY IF EXISTS "Allow public read access to active events" ON events;
DROP POLICY IF EXISTS "Allow authenticated users to read all events" ON events;
DROP POLICY IF EXISTS "Allow authenticated users to insert events" ON events;
DROP POLICY IF EXISTS "Allow authenticated users to update events" ON events;
DROP POLICY IF EXISTS "Allow authenticated users to delete events" ON events;

-- Create updated policies
-- Allow public read access to active events
CREATE POLICY "Allow public read access to active events" ON events
  FOR SELECT USING (is_active = true AND status = 'active');

-- Allow authenticated users to read all events (for admin dashboard)
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

-- Create index for is_active field
CREATE INDEX IF NOT EXISTS idx_events_is_active ON events(is_active); 