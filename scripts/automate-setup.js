#!/usr/bin/env node

/**
 * Automated Supabase Database Setup Script
 * This script automatically creates all tables, policies, and sample data
 * using the configured Supabase credentials from .env file
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

// Create Supabase admin client
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function setupDatabase() {
  console.log('🚀 Starting automated Supabase database setup...\n');

  // Step 1: Create tables
  console.log('📋 Creating tables...');
  
  const createTablesSQL = `
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
  `;

  const { error: tablesError } = await supabase.rpc('exec_sql', { sql: createTablesSQL });
  if (tablesError) {
    console.error('❌ Error creating tables:', tablesError);
    process.exit(1);
  }
  console.log('✅ Tables created successfully');

  // Step 2: Create indexes
  console.log('📊 Creating indexes...');
  
  const createIndexesSQL = `
    CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(is_featured);
    CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(order_index);
    CREATE INDEX IF NOT EXISTS idx_biography_stage ON biography_content(stage);
    CREATE INDEX IF NOT EXISTS idx_biography_order ON biography_content(order_index);
  `;

  const { error: indexesError } = await supabase.rpc('exec_sql', { sql: createIndexesSQL });
  if (indexesError) {
    console.error('❌ Error creating indexes:', indexesError);
  } else {
    console.log('✅ Indexes created successfully');
  }

  // Step 3: Set up RLS
  console.log('🔒 Setting up Row Level Security...');
  
  const rlsSQL = `
    ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
    ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
    ALTER TABLE biography_content ENABLE ROW LEVEL SECURITY;

    CREATE POLICY IF NOT EXISTS "Allow read access to profiles" ON profiles FOR SELECT TO public USING (true);
    CREATE POLICY IF NOT EXISTS "Allow read access to projects" ON projects FOR SELECT TO public USING (true);
    CREATE POLICY IF NOT EXISTS "Allow read access to biography content" ON biography_content FOR SELECT TO public USING (true);
  `;

  const { error: rlsError } = await supabase.rpc('exec_sql', { sql: rlsSQL });
  if (rlsError) {
    console.error('❌ Error setting up RLS:', rlsError);
  } else {
    console.log('✅ Row Level Security configured');
  }

  // Step 4: Insert sample data using direct inserts
  console.log('📝 Inserting sample data...');

  // Insert profile
  const { error: profileError } = await supabase
    .from('profiles')
    .upsert({
      name: 'Caio Augusto Serra Castilho',
      title: 'Mechatronic Engineer',
      bio: 'Project Management & Scalability Specialist with expertise in engineering solutions and system optimization.',
      avatar_url: '/caio-solana.png'
    });

  if (profileError) {
    console.error('❌ Error inserting profile:', profileError);
  } else {
    console.log('✅ Profile data inserted');
  }

  // Insert projects
  const projects = [
    {
      title: 'Personal Website',
      description: 'Modern personal website built with Next.js, TypeScript, and Supabase.',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
      is_featured: true,
      order_index: 1
    },
    {
      title: 'Engineering Project',
      description: 'Advanced mechatronic engineering solution with embedded systems.',
      technologies: ['Embedded Systems', 'IoT', 'Python', 'C++'],
      is_featured: true,
      order_index: 2
    }
  ];

  const { error: projectsError } = await supabase
    .from('projects')
    .upsert(projects);

  if (projectsError) {
    console.error('❌ Error inserting projects:', projectsError);
  } else {
    console.log('✅ Projects data inserted');
  }

  // Insert biography content
  const biographyContent = [
    { stage: 'infancy', title: 'Early Years', content: 'Born in Brazil, early exposure to technology and engineering concepts...', order_index: 1 },
    { stage: 'adolescence', title: 'School Years', content: 'Developed passion for engineering during high school...', order_index: 1 },
    { stage: 'youth', title: 'University & Career', content: 'Studied Mechatronic Engineering, gained experience...', order_index: 1 },
    { stage: 'maturity', title: 'Professional Growth', content: 'Advanced to project management specialist...', order_index: 1 },
    { stage: 'present', title: 'Current Phase', content: 'Leading engineering projects and mentoring teams...', order_index: 1 }
  ];

  const { error: biographyError } = await supabase
    .from('biography_content')
    .upsert(biographyContent);

  if (biographyError) {
    console.error('❌ Error inserting biography content:', biographyError);
  } else {
    console.log('✅ Biography content inserted');
  }

  // Step 5: Verify setup
  console.log('\n🔍 Verifying database setup...');

  const { data: profileCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
  const { data: projectsCount } = await supabase.from('projects').select('*', { count: 'exact', head: true });
  const { data: biographyCount } = await supabase.from('biography_content').select('*', { count: 'exact', head: true });

  console.log(`📊 Database Statistics:`);
  console.log(`   Profiles: ${profileCount?.length || 0} records`);
  console.log(`   Projects: ${projectsCount?.length || 0} records`);
  console.log(`   Biography Content: ${biographyCount?.length || 0} records`);

  console.log('\n🎉 Database setup completed successfully!');
  console.log('📡 Your API endpoints are now ready to use at http://localhost:3000/api/');
}

// Execute setup
setupDatabase().catch(error => {
  console.error('💥 Setup failed:', error);
  process.exit(1);
}); 