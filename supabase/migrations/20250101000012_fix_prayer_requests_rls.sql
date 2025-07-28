-- Add missing DELETE policy for prayer requests table
CREATE POLICY "Allow authenticated users to delete prayer requests" ON prayer_requests
  FOR DELETE USING (auth.role() = 'authenticated');

-- Also add missing is_archived field if it doesn't exist
ALTER TABLE prayer_requests ADD COLUMN IF NOT EXISTS is_archived BOOLEAN DEFAULT false;

-- Update existing prayer requests to not be archived
UPDATE prayer_requests SET is_archived = false WHERE is_archived IS NULL; 