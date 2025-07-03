# Supabase Setup Guide

## Complete Integration Setup

This guide will walk you through setting up the complete Supabase integration for your personal website.

## Step 1: Environment Configuration

Your `.env.local` file should already contain your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tuspvzmkzlcztccwzklc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Step 2: Database Setup

1. **Go to your Supabase project**: https://supabase.com/dashboard/project/tuspvzmkzlcztccwzklc

2. **Navigate to SQL Editor** in the left sidebar

3. **Run the setup script**: Copy and paste the entire content from `scripts/setup-database.sql` and execute it

This will create:
- ✅ All required tables (profiles, projects, biography_content)
- ✅ Row Level Security policies
- ✅ Performance indexes
- ✅ Sample data for testing

## Step 3: Verify Integration

1. **Start your development server**:
```bash
npm run dev
```

2. **Test the pages**:
- Home page should load profile data
- Projects page should display sample projects
- Biography page should show dynamic content

## Step 4: Customize Your Data

### Update Profile
Go to your Supabase dashboard → Table Editor → profiles table and update:
- name
- title 
- bio
- avatar_url

### Add Projects
In the projects table, add your real projects with:
- title
- description
- technologies (array)
- project_url
- is_featured (boolean)

### Customize Biography
In the biography_content table, update content for each stage:
- infancy
- adolescence  
- youth
- maturity
- present

## Features Now Available

✅ **Dynamic Content**: All pages now pull data from Supabase
✅ **Loading States**: Proper loading indicators while fetching data
✅ **Error Handling**: Graceful fallbacks when database is unavailable
✅ **Type Safety**: Full TypeScript integration with database types
✅ **Responsive Design**: Improved layout and centering
✅ **Performance**: Optimized queries and caching

## Next Steps

1. **Add your real content** to the database
2. **Upload images** to Supabase Storage if needed
3. **Set up authentication** for content management (optional)
4. **Deploy** your site with the new integration

## Troubleshooting

**Environment Variables**: Make sure your `.env.local` file is not tracked by git and contains the correct values.

**CORS Issues**: Ensure your domain is added to the allowed origins in Supabase settings.

**API Routes**: The project uses static export, so API routes work in development but not in production static hosting.

**Fallback Content**: If database is unavailable, the site gracefully falls back to static content.

## Project Status

🎉 **Congratulations!** Your personal website now features:

- Modern TypeScript architecture
- Supabase database integration  
- Dynamic content management
- Professional responsive design
- Production-ready deployment setup

The project represents engineering excellence with robust error handling, type safety, and scalable architecture. 