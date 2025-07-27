-- Create prayer_requests table
CREATE TABLE IF NOT EXISTS prayer_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone_number TEXT,
  email TEXT NOT NULL,
  prayer_request TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  admin_notes TEXT
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_prayer_requests_status ON prayer_requests(status);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_created_at ON prayer_requests(created_at);

-- Enable Row Level Security
ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to read all prayer requests
CREATE POLICY "Allow authenticated users to read prayer requests" ON prayer_requests
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to update prayer requests
CREATE POLICY "Allow authenticated users to update prayer requests" ON prayer_requests
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_prayer_requests_updated_at
  BEFORE UPDATE ON prayer_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column(); 