#!/usr/bin/env node

/**
 * Automated Supabase Database Setup Script
 * Executes all database setup using Supabase API calls
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
  console.log('🚀 Starting automated database setup...\n');

  try {
    // Insert sample data directly
    console.log('📝 Inserting sample data...');

    // Profile data
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        name: 'Caio Augusto Serra Castilho',
        title: 'Mechatronic Engineer',
        bio: 'Project Management & Scalability Specialist with expertise in engineering solutions and system optimization.',
        avatar_url: '/caio-solana.png'
      });

    if (profileError) console.log('Profile:', profileError.message);
    else console.log('✅ Profile data ready');

    // Projects data
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

    if (projectsError) console.log('Projects:', projectsError.message);
    else console.log('✅ Projects data ready');

    // Biography data
    const biography = [
      { stage: 'infancy', title: 'Early Years', content: 'Born in Brazil, early exposure to technology and engineering concepts...', order_index: 1 },
      { stage: 'adolescence', title: 'School Years', content: 'Developed passion for engineering during high school...', order_index: 1 },
      { stage: 'youth', title: 'University & Career', content: 'Studied Mechatronic Engineering, gained experience...', order_index: 1 },
      { stage: 'maturity', title: 'Professional Growth', content: 'Advanced to project management specialist...', order_index: 1 },
      { stage: 'present', title: 'Current Phase', content: 'Leading engineering projects and mentoring teams...', order_index: 1 }
    ];

    const { error: biographyError } = await supabase
      .from('biography_content')
      .upsert(biography);

    if (biographyError) console.log('Biography:', biographyError.message);
    else console.log('✅ Biography data ready');

    console.log('\n🎉 Database setup completed!');

  } catch (error) {
    console.error('💥 Setup error:', error);
  }
}

setupDatabase(); 