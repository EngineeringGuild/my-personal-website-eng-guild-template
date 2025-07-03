-- Complete Supabase database setup script
-- Execute this script in your Supabase SQL editor

-- =============================================================================
-- CREATE TABLES
-- =============================================================================

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table
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

-- Biography content table
CREATE TABLE IF NOT EXISTS biography_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stage VARCHAR(50) NOT NULL CHECK (stage IN ('infancy', 'adolescence', 'youth', 'maturity', 'present')),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- CREATE INDEXES
-- =============================================================================

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(order_index);
CREATE INDEX IF NOT EXISTS idx_biography_stage ON biography_content(stage);
CREATE INDEX IF NOT EXISTS idx_biography_order ON biography_content(order_index);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE biography_content ENABLE ROW LEVEL SECURITY;

-- Allow read access to all users
CREATE POLICY IF NOT EXISTS "Allow read access to profiles" ON profiles
  FOR SELECT TO public USING (true);

CREATE POLICY IF NOT EXISTS "Allow read access to projects" ON projects
  FOR SELECT TO public USING (true);

CREATE POLICY IF NOT EXISTS "Allow read access to biography content" ON biography_content
  FOR SELECT TO public USING (true);

-- =============================================================================
-- TRIGGERS FOR UPDATED_AT
-- =============================================================================

-- Function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to all tables
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at 
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_biography_content_updated_at ON biography_content;
CREATE TRIGGER update_biography_content_updated_at 
  BEFORE UPDATE ON biography_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- SAMPLE DATA
-- =============================================================================

-- Insert sample profile
INSERT INTO profiles (name, title, bio, avatar_url) VALUES (
  'Caio Augusto Serra Castilho',
  'Mechatronic Engineer',
  'Project Management & Scalability Specialist with expertise in engineering solutions and system optimization.',
  '/caio-solana.png'
) ON CONFLICT DO NOTHING;

-- Insert sample projects
INSERT INTO projects (title, description, technologies, is_featured, order_index) VALUES
  (
    'Personal Website',
    'Modern personal website built with Next.js, TypeScript, and Supabase.',
    ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    true,
    1
  ),
  (
    'Engineering Project',
    'Advanced mechatronic engineering solution with embedded systems.',
    ARRAY['Embedded Systems', 'IoT', 'Python', 'C++'],
    true,
    2
  )
ON CONFLICT DO NOTHING;

-- Insert sample biography content
INSERT INTO biography_content (stage, title, content, order_index) VALUES
  ('infancy', 'Early Years', 'Born in Brazil, early exposure to technology and engineering concepts...', 1),
  ('adolescence', 'School Years', 'Developed passion for engineering during high school...', 1),
  ('youth', 'University & Career', 'Studied Mechatronic Engineering, gained experience...', 1),
  ('maturity', 'Professional Growth', 'Advanced to project management specialist...', 1),
  ('present', 'Current Phase', 'Leading engineering projects and mentoring teams...', 1)
ON CONFLICT DO NOTHING;

-- =============================================================================
-- VERIFICATION QUERIES
-- =============================================================================

-- Verify data was inserted correctly
SELECT 'Profiles' as table_name, COUNT(*) as record_count FROM profiles
UNION ALL
SELECT 'Projects' as table_name, COUNT(*) as record_count FROM projects
UNION ALL
SELECT 'Biography Content' as table_name, COUNT(*) as record_count FROM biography_content;

-- Display sample data
SELECT 'Profile Data:' as info;
SELECT name, title, bio FROM profiles LIMIT 1;

SELECT 'Featured Projects:' as info;
SELECT title, description, is_featured FROM projects WHERE is_featured = true;

SELECT 'Biography Stages:' as info;
SELECT stage, title FROM biography_content ORDER BY 
  CASE stage 
    WHEN 'infancy' THEN 1
    WHEN 'adolescence' THEN 2
    WHEN 'youth' THEN 3
    WHEN 'maturity' THEN 4
    WHEN 'present' THEN 5
  END; 