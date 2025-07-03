# Supabase Database Schema

## Overview
This document defines the database schema for the Personal Website project using Supabase as the backend database.

## Tables

### 1. profiles
User profile information.

```sql
CREATE TABLE profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. projects
Project portfolio data.

```sql
CREATE TABLE projects (
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
```

### 3. biography_content
Biography content organized by life stages.

```sql
CREATE TABLE biography_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stage VARCHAR(50) NOT NULL CHECK (stage IN ('infancy', 'adolescence', 'youth', 'maturity', 'present')),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Indexes

```sql
-- Performance indexes
CREATE INDEX idx_projects_featured ON projects(is_featured);
CREATE INDEX idx_projects_order ON projects(order_index);
CREATE INDEX idx_biography_stage ON biography_content(stage);
CREATE INDEX idx_biography_order ON biography_content(order_index);
```

## Row Level Security (RLS)

### profiles table
```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow read access to all users
CREATE POLICY "Allow read access to profiles" ON profiles
  FOR SELECT TO public
  USING (true);

-- Allow authenticated users to update their own profile
CREATE POLICY "Allow users to update own profile" ON profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = id);
```

### projects table
```sql
-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow read access to all users
CREATE POLICY "Allow read access to projects" ON projects
  FOR SELECT TO public
  USING (true);

-- Allow authenticated users to manage projects
CREATE POLICY "Allow authenticated users to manage projects" ON projects
  FOR ALL TO authenticated
  USING (true);
```

### biography_content table
```sql
-- Enable RLS
ALTER TABLE biography_content ENABLE ROW LEVEL SECURITY;

-- Allow read access to all users
CREATE POLICY "Allow read access to biography content" ON biography_content
  FOR SELECT TO public
  USING (true);

-- Allow authenticated users to manage biography content
CREATE POLICY "Allow authenticated users to manage biography content" ON biography_content
  FOR ALL TO authenticated
  USING (true);
```

## Triggers

### Updated_at triggers
```sql
-- Function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to all tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_biography_content_updated_at BEFORE UPDATE ON biography_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## Sample Data

### Sample profile
```sql
INSERT INTO profiles (name, title, bio) VALUES (
  'Caio Augusto Serra Castilho',
  'Mechatronic Engineer',
  'Project Management & Scalability Specialist with expertise in engineering solutions and system optimization.'
);
```

### Sample projects
```sql
INSERT INTO projects (title, description, technologies, is_featured, order_index) VALUES
  ('Personal Website', 'Modern personal website built with Next.js and TypeScript', ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'], true, 1),
  ('Engineering Project', 'Advanced mechatronic engineering solution', ARRAY['Embedded Systems', 'IoT', 'Python'], true, 2);
```

### Sample biography content
```sql
INSERT INTO biography_content (stage, title, content, order_index) VALUES
  ('infancy', 'Early Years', 'Born in Brazil, early exposure to technology and engineering concepts...', 1),
  ('adolescence', 'School Years', 'Developed passion for engineering and technology during high school...', 1),
  ('youth', 'University & Early Career', 'Studied Mechatronic Engineering, first professional experiences...', 1),
  ('maturity', 'Professional Growth', 'Advanced to project management and scalability specialist...', 1),
  ('present', 'Current Phase', 'Leading engineering projects and mentoring teams...', 1);
```

## Environment Variables Required

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## API Endpoints

The following API endpoints will be created:

- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile
- `GET /api/projects` - Get all projects
- `GET /api/projects?featured=true` - Get featured projects
- `POST /api/projects` - Create new project
- `GET /api/biography/:stage` - Get biography content for stage
- `PUT /api/biography/:stage` - Update biography content 