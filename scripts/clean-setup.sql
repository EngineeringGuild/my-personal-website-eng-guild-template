-- EXECUTE THIS COMPLETE SCRIPT IN SUPABASE SQL EDITOR (FIXED VERSION):

CREATE TABLE IF NOT EXISTS profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  project_url TEXT,
  technologies TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS biography_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stage VARCHAR(50) NOT NULL CHECK (stage IN ('infancy', 'adolescence', 'youth', 'maturity', 'present')),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE biography_content ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, then create new ones
DROP POLICY IF EXISTS "profiles_read" ON profiles;
DROP POLICY IF EXISTS "projects_read" ON projects;
DROP POLICY IF EXISTS "biography_read" ON biography_content;

-- Create policies (without IF NOT EXISTS)
CREATE POLICY "profiles_read" ON profiles FOR SELECT TO public USING (true);
CREATE POLICY "projects_read" ON projects FOR SELECT TO public USING (true);
CREATE POLICY "biography_read" ON biography_content FOR SELECT TO public USING (true);

-- Insert sample data (using ON CONFLICT DO NOTHING for safety)
INSERT INTO profiles (name, title, bio, avatar_url) VALUES (
  'Caio Augusto Serra Castilho',
  'Mechatronic Engineer',
  'Project Management & Scalability Specialist',
  '/caio-solana.png'
) ON CONFLICT DO NOTHING;

INSERT INTO projects (title, description, technologies, is_featured, order_index) VALUES
  ('Personal Website', 'Modern website with Next.js and Supabase', ARRAY['Next.js', 'TypeScript', 'Supabase'], true, 1),
  ('Engineering Project', 'Mechatronic engineering solution', ARRAY['IoT', 'Python', 'C++'], true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO biography_content (stage, title, content, order_index) VALUES
  ('infancy', 'Early Years', 'Born in Brazil, early tech exposure...', 1),
  ('youth', 'University', 'Studied Mechatronic Engineering...', 1),
  ('present', 'Current', 'Leading engineering projects...', 1)
ON CONFLICT DO NOTHING;

