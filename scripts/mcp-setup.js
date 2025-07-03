/**
 * MCP Automation Script for Supabase Database Setup
 * Automates the creation of tables, policies, and data using MCP tools
 */

// MCP Automation Script for Supabase
// Project: Personal Website Database Setup
// Supabase Project ID: tuspvzmkzlcztccwzklc

const mcpSupabaseSetup = {
  projectId: 'tuspvzmkzlcztccwzklc',
  
  // SQL commands to be executed via MCP
  createTables: [
    `-- Create profiles table
    CREATE TABLE IF NOT EXISTS profiles (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      bio TEXT,
      avatar_url TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );`,
    
    `-- Create projects table
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
    );`,
    
    `-- Create biography_content table
    CREATE TABLE IF NOT EXISTS biography_content (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      stage VARCHAR(50) NOT NULL CHECK (stage IN ('infancy', 'adolescence', 'youth', 'maturity', 'present')),
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      order_index INTEGER DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );`
  ],
  
  // Security policies via MCP
  enableSecurity: [
    `ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;`,
    `CREATE POLICY IF NOT EXISTS "Allow read access to profiles" ON profiles FOR SELECT TO public USING (true);`,
    `ALTER TABLE projects ENABLE ROW LEVEL SECURITY;`,
    `CREATE POLICY IF NOT EXISTS "Allow read access to projects" ON projects FOR SELECT TO public USING (true);`,
    `ALTER TABLE biography_content ENABLE ROW LEVEL SECURITY;`,
    `CREATE POLICY IF NOT EXISTS "Allow read access to biography content" ON biography_content FOR SELECT TO public USING (true);`
  ],
  
  // Sample data insertion
  insertData: {
    profile: `INSERT INTO profiles (name, title, bio, avatar_url) VALUES (
      'Caio Augusto Serra Castilho',
      'Mechatronic Engineer',
      'Project Management & Scalability Specialist with expertise in engineering solutions and system optimization.',
      '/caio-solana.png'
    ) ON CONFLICT DO NOTHING;`,
    
    projects: `INSERT INTO projects (title, description, technologies, is_featured, order_index) VALUES
      ('Personal Website', 'Modern personal website built with Next.js, TypeScript, and Supabase.', ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'], true, 1),
      ('Engineering Project', 'Advanced mechatronic engineering solution with embedded systems.', ARRAY['Embedded Systems', 'IoT', 'Python', 'C++'], true, 2)
    ON CONFLICT DO NOTHING;`,
    
    biography: `INSERT INTO biography_content (stage, title, content, order_index) VALUES
      ('infancy', 'Early Years', 'Born in Brazil, early exposure to technology and engineering concepts...', 1),
      ('youth', 'University & Career', 'Studied Mechatronic Engineering, gained experience...', 1),
      ('present', 'Current Phase', 'Leading engineering projects and mentoring teams...', 1)
    ON CONFLICT DO NOTHING;`
  }
};

// Export for MCP usage
module.exports = mcpSupabaseSetup; 