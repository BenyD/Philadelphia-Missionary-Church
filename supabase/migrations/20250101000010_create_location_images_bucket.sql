-- Create storage bucket for location images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'location-images',
  'location-images',
  true,
  3145728, -- 3MB in bytes
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- RLS policies for location images storage
CREATE POLICY "Public can view location images" ON storage.objects
  FOR SELECT USING (bucket_id = 'location-images');

CREATE POLICY "Authenticated users can upload location images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'location-images' 
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Authenticated users can update location images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'location-images' 
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Authenticated users can delete location images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'location-images' 
    AND auth.role() = 'authenticated'
  ); 