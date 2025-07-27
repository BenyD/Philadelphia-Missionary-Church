-- Fix RLS policies for prayer_requests table to allow public submissions

-- Drop existing policies
DROP POLICY IF EXISTS "Allow authenticated users to read prayer requests" ON prayer_requests;
DROP POLICY IF EXISTS "Allow authenticated users to update prayer requests" ON prayer_requests;

-- Create policy to allow public users to insert prayer requests (for form submissions)
CREATE POLICY "Allow public users to insert prayer requests" ON prayer_requests
  FOR INSERT WITH CHECK (true);

-- Create policy to allow authenticated users to read all prayer requests (for admin dashboard)
CREATE POLICY "Allow authenticated users to read prayer requests" ON prayer_requests
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to update prayer requests (for admin dashboard)
CREATE POLICY "Allow authenticated users to update prayer requests" ON prayer_requests
  FOR UPDATE USING (auth.role() = 'authenticated'); 