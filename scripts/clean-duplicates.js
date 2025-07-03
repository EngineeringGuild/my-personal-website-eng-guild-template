#!/usr/bin/env node

/**
 * Clean duplicate records from Supabase database
 * Removes duplicates while keeping the first occurrence of each record
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function cleanDatabase() {
  console.log('🧹 Starting database cleanup...\n');
  
  try {
    // Clean profiles duplicates
    console.log('📊 Cleaning profiles...');
    const { data: profiles } = await supabase.from('profiles').select('*');
    
    if (profiles && profiles.length > 1) {
      console.log(`Found ${profiles.length} profiles, keeping only 1...`);
      const keepProfile = profiles[0];
      const toDelete = profiles.slice(1);
      
      for (const profile of toDelete) {
        await supabase.from('profiles').delete().eq('id', profile.id);
      }
      console.log('✅ Profiles cleaned');
    } else {
      console.log('✅ Profiles already clean');
    }

    // Clean projects duplicates
    console.log('📊 Cleaning projects...');
    const { data: projects } = await supabase.from('projects').select('*');
    const uniqueProjects = [];
    const seenTitles = new Set();
    
    for (const project of projects || []) {
      if (!seenTitles.has(project.title)) {
        seenTitles.add(project.title);
        uniqueProjects.push(project);
      } else {
        await supabase.from('projects').delete().eq('id', project.id);
        console.log(`  Removed duplicate: ${project.title}`);
      }
    }
    console.log(`✅ Projects cleaned - ${uniqueProjects.length} unique projects kept`);

    // Clean biography duplicates
    console.log('📊 Cleaning biography content...');
    const { data: biography } = await supabase.from('biography_content').select('*');
    const uniqueBio = [];
    const seenStages = new Set();
    
    for (const bio of biography || []) {
      if (!seenStages.has(bio.stage)) {
        seenStages.add(bio.stage);
        uniqueBio.push(bio);
      } else {
        await supabase.from('biography_content').delete().eq('id', bio.id);
        console.log(`  Removed duplicate stage: ${bio.stage}`);
      }
    }
    console.log(`✅ Biography cleaned - ${uniqueBio.length} unique stages kept`);

    // Verify final state
    console.log('\n📈 Final database state:');
    const { data: finalProfiles } = await supabase.from('profiles').select('*', { count: 'exact' });
    const { data: finalProjects } = await supabase.from('projects').select('*', { count: 'exact' });
    const { data: finalBio } = await supabase.from('biography_content').select('*', { count: 'exact' });
    
    console.log(`   Profiles: ${finalProfiles?.length || 0} records`);
    console.log(`   Projects: ${finalProjects?.length || 0} records`);
    console.log(`   Biography: ${finalBio?.length || 0} records`);
    
    console.log('\n🎉 Database cleanup completed successfully!');

  } catch (error) {
    console.error('❌ Cleanup failed:', error);
  }
}

cleanDatabase(); 