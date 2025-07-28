-- Create gallery table
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category VARCHAR(100) NOT NULL DEFAULT 'General',
  is_featured BOOLEAN DEFAULT false,
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

CREATE TRIGGER update_gallery_images_updated_at 
  BEFORE UPDATE ON gallery_images 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Public can read active images
CREATE POLICY "Public can view active gallery images" ON gallery_images
  FOR SELECT USING (is_active = true);

-- Authenticated users can perform CRUD operations
CREATE POLICY "Authenticated users can manage gallery images" ON gallery_images
  FOR ALL USING (auth.role() = 'authenticated');

-- Create storage bucket for gallery images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'gallery-images',
  'gallery-images',
  true,
  3145728, -- 3MB in bytes
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- RLS policies for storage
CREATE POLICY "Public can view gallery images" ON storage.objects
  FOR SELECT USING (bucket_id = 'gallery-images');

CREATE POLICY "Authenticated users can upload gallery images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'gallery-images' 
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Authenticated users can update gallery images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'gallery-images' 
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Authenticated users can delete gallery images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'gallery-images' 
    AND auth.role() = 'authenticated'
  );

-- Insert sample gallery images
INSERT INTO gallery_images (title, description, image_url, category, is_featured, sort_order) VALUES
  ('Sunday Service', 'Our weekly Sunday service with the congregation gathered in worship', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop', 'Services', true, 1),
  ('Prayer Meeting', 'Community prayer meeting where we come together to lift our voices', 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=600&fit=crop', 'Prayer', true, 2),
  ('Youth Ministry', 'Our vibrant youth ministry activities and fellowship', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop', 'Youth', false, 3),
  ('Community Outreach', 'Serving our local community through various outreach programs', 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop', 'Outreach', true, 4),
  ('Bible Study', 'In-depth Bible study sessions with our congregation', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop', 'Education', false, 5),
  ('Worship Team', 'Our dedicated worship team leading praise and worship', 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=600&fit=crop', 'Worship', true, 6); 