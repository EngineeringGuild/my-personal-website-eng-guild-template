// /pages/index.tsx

import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { useProfile } from '@/hooks/useApi';
import type { PageProps } from '@/types';

/**
 * Home page component with dynamic profile data from Supabase
 * Features animated introduction with database-driven content
 * Uses the new design system for consistent styling and typography
 */
export default function Home(_props: PageProps): JSX.Element {
  const { data: profile, loading, error } = useProfile();

  // Fallback data for when profile is not available
  const fallbackProfile = {
    name: 'CAIO A. S. CASTILHO',
    title: 'MECHATRONIC ENGINEER',
    bio: 'PROJECT MANAGEMENT & SCALABILITY SPECIALIST',
    avatar_url: '/caio-solana.png'
  };

  // Use profile data or fallback
  const displayProfile = profile || fallbackProfile;

  /**
   * Render enhanced loading state with skeleton components
   */
  const renderLoading = (): JSX.Element => (
    <motion.div
      key="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center space-y-6"
    >
      {/* Profile Image Skeleton */}
      <div className="w-32 h-32 rounded-full loading-skeleton"></div>
      
      {/* Name Skeleton */}
      <div className="h-8 w-64 loading-skeleton rounded-lg"></div>
      
      {/* Title Skeleton */}
      <div className="h-6 w-48 loading-skeleton rounded-lg"></div>
      
      {/* Bio Skeleton */}
      <div className="h-4 w-56 loading-skeleton rounded-lg"></div>
      
      {/* Loading indicator */}
      <div className="mt-4">
        <div className="w-8 h-8 loading-spinner"></div>
      </div>
    </motion.div>
  );

  /**
   * Render enhanced profile content with new design system
   */
  const renderProfile = (): JSX.Element => (
    <motion.div
      key="profile"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6,
        delay: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }}
      className="flex flex-col items-center justify-center space-y-6"
    >
      {/* Profile Image with enhanced styling - Mobile optimized */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.5,
          delay: 0.3,
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
        className="relative"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 opacity-20 blur-xl"></div>
        <img 
          className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover shadow-xl ring-4 ring-white dark:ring-gray-800 transition-transform duration-300 hover:scale-105"
          src={displayProfile.avatar_url || '/caio-solana.png'} 
          alt={`${displayProfile.name} profile photo`}
          loading="eager"
          onError={(e) => {
            // Fallback to default image on error
            (e.target as HTMLImageElement).src = '/caio-solana.png';
          }}
        />
      </motion.div>
      
      {/* Main Content Container - Mobile optimized */}
      <div className="text-center space-y-3 sm:space-y-4 max-w-2xl px-4 sm:px-0">
        {/* Main Title with gradient text - Mobile optimized */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-responsive-xl font-bold gradient-text text-balance leading-tight"
        >
          {displayProfile.name?.toUpperCase() || 'CAIO A. S. CASTILHO'}
        </motion.h1>
        
        {/* Decorative Divider with enhanced styling */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center"
        >
          <div className="w-16 sm:w-24 h-1 gradient-guild rounded-full"></div>
        </motion.div>
        
        {/* Professional Title - Mobile optimized */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-responsive-lg font-semibold tracking-wider text-center leading-tight"
          style={{ color: 'rgb(var(--color-text-primary))' }}
        >
          {displayProfile.title?.toUpperCase() || 'MECHATRONIC ENGINEER'}
        </motion.h2>
        
        {/* Bio/Specialization with enhanced typography - Mobile optimized */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="text-responsive-md font-medium tracking-wide text-center text-balance leading-relaxed"
          style={{ color: 'rgb(var(--color-text-secondary))' }}
        >
          {displayProfile.bio?.toUpperCase() || 'PROJECT MANAGEMENT & SCALABILITY SPECIALIST'}
        </motion.p>

        {/* Status indicators - Mobile optimized */}
        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.2 }}
            className="inline-flex items-center px-3 py-2 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 max-w-full"
          >
            <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="truncate">Using cached data - database unavailable</span>
          </motion.div>
        )}

        {/* Success indicator for live data - Mobile optimized */}
        {!error && !loading && profile && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.2 }}
            className="inline-flex items-center px-3 py-2 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 max-w-full"
          >
            <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="truncate">Live data from database</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  return (
    <Layout 
      title={profile?.name || "Caio Augusto Serra Castilho"}
      description={profile?.bio || "Caio Augusto Serra Castilho - Mechatronic Engineer, Project Management & Scalability Specialist"}
    >
      <div className="min-h-[50vh] sm:min-h-[60vh] flex items-center justify-center py-6 sm:py-8 px-4 sm:px-0">
        {loading ? renderLoading() : renderProfile()}
      </div>
    </Layout>
  );
}
