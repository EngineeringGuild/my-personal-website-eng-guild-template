// /pages/index.tsx

import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { useProfile } from '@/hooks/useApi';
import type { PageProps } from '@/types';

/**
 * Home page component with dynamic profile data from Supabase
 * Features animated introduction with database-driven content
 * Displays profile image, name, title, and specialization
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
   * Render loading state
   */
  const renderLoading = (): JSX.Element => (
    <motion.div
      key="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center"
    >
      <div className="w-32 h-32 mb-8 rounded-full bg-gray-200 dark:bg-blueGray-700 animate-pulse"></div>
      <div className="h-8 w-64 bg-gray-200 dark:bg-blueGray-700 rounded animate-pulse mb-4"></div>
      <div className="h-6 w-48 bg-gray-200 dark:bg-blueGray-700 rounded animate-pulse mb-2"></div>
      <div className="h-4 w-56 bg-gray-200 dark:bg-blueGray-700 rounded animate-pulse"></div>
    </motion.div>
  );

  /**
   * Render profile content
   */
  const renderProfile = (): JSX.Element => (
    <motion.div
      key="profile"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-col items-center justify-center"
    >
      <div className="flex flex-col items-center justify-center">
        {/* Profile Image */}
        <img 
          className="w-32 h-32 mb-8 rounded-full object-cover shadow-lg"
          src={displayProfile.avatar_url || '/caio-solana.png'} 
          alt={`${displayProfile.name} profile photo`}
          loading="eager"
          onError={(e) => {
            // Fallback to default image on error
            (e.target as HTMLImageElement).src = '/caio-solana.png';
          }}
        />
        
        {/* Main Title */}
        <h1 className="mx-auto text-2xl font-semibold tracking-widest text-center sm:text-3xl">
          {displayProfile.name?.toUpperCase() || 'CAIO A. S. CASTILHO'}
        </h1>
        
        {/* Decorative Divider */}
        <hr className="w-16 my-8 border-gray-300" />
        
        {/* Professional Title */}
        <h2 className="text-lg tracking-widest text-center">
          {displayProfile.title?.toUpperCase() || 'MECHATRONIC ENGINEER'}
        </h2>
        
        {/* Bio/Specialization */}
        <h3 className="text-sm tracking-wider text-center text-gray-500 dark:text-gray-400 mt-2">
          {displayProfile.bio?.toUpperCase() || 'PROJECT MANAGEMENT & SCALABILITY SPECIALIST'}
        </h3>

        {/* Error indicator (if data failed to load but fallback is shown) */}
        {error && (
          <div className="mt-4 text-xs text-yellow-600 dark:text-yellow-400 text-center">
            <p>Using cached data - database connection unavailable</p>
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <Layout 
      title={profile?.name || "Caio Augusto Serra Castilho"}
      description={profile?.bio || "Caio Augusto Serra Castilho - Mechatronic Engineer, Project Management & Scalability Specialist"}
    >
      {loading ? renderLoading() : renderProfile()}
    </Layout>
  );
}
