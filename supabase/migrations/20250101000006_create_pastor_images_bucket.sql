-- Create storage bucket for pastor images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'pastor-images',
  'pastor-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- Policy to allow public read access to pastor images
CREATE POLICY "Public read access for pastor images" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'pastor-images'
  );

-- Policy to allow authenticated users to upload pastor images
CREATE POLICY "Authenticated users can upload pastor images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'pastor-images' 
    AND auth.role() = 'authenticated'
  );

-- Policy to allow authenticated users to update pastor images
CREATE POLICY "Authenticated users can update pastor images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'pastor-images' 
    AND auth.role() = 'authenticated'
  );

-- Policy to allow authenticated users to delete pastor images
CREATE POLICY "Authenticated users can delete pastor images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'pastor-images' 
    AND auth.role() = 'authenticated'
  ); 