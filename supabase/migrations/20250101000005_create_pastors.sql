-- Create pastors table
CREATE TABLE IF NOT EXISTS pastors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  location VARCHAR(255),
  image_url TEXT,
  bio TEXT,
  email VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_pastors_updated_at 
  BEFORE UPDATE ON pastors 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE pastors ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow public read access to active pastors
CREATE POLICY "Allow public read access to active pastors" ON pastors
  FOR SELECT USING (is_active = true);

-- Allow authenticated users to read all pastors (for admin dashboard)
CREATE POLICY "Allow authenticated users to read all pastors" ON pastors
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to insert pastors
CREATE POLICY "Allow authenticated users to insert pastors" ON pastors
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update pastors
CREATE POLICY "Allow authenticated users to update pastors" ON pastors
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete pastors
CREATE POLICY "Allow authenticated users to delete pastors" ON pastors
  FOR DELETE USING (auth.role() = 'authenticated');

-- Insert sample pastors data
INSERT INTO pastors (name, role, phone, location, image_url, bio, email, sort_order) VALUES
  ('Pastor John Smith', 'Senior Pastor', '+1 (555) 123-4567', 'Main Campus', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face', 'Pastor John has been serving as our Senior Pastor for over 15 years. He is passionate about teaching Gods Word and leading our congregation with wisdom and grace.', 'pastor.john@pmc.com', 1),
  ('Pastor Sarah Johnson', 'Associate Pastor', '+1 (555) 234-5678', 'Main Campus', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=300&fit=crop&crop=face', 'Pastor Sarah leads our youth ministry and family programs. She has a heart for young people and families, helping them grow in their faith journey.', 'pastor.sarah@pmc.com', 2),
  ('Pastor Michael Davis', 'Worship Pastor', '+1 (555) 345-6789', 'Main Campus', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&crop=face', 'Pastor Michael leads our worship ministry and music programs. He is gifted in creating meaningful worship experiences that draw people closer to God.', 'pastor.michael@pmc.com', 3); 